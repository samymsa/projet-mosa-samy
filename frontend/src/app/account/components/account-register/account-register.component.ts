import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ApiService } from '../../../services/api.service';
import { SetAccount } from '../../account.actions';
import { passwordMatchValidator } from '../../validators/password-match.validator';

@Component({
  selector: 'account-register',
  templateUrl: './account-register.component.html',
  providers: [ApiService],
})
export class AccountRegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private store: Store,
  ) {}

  loading = false;

  registerForm = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required]],
    },
    {
      validators: passwordMatchValidator,
    },
  );

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.apiService.register(this.registerForm.value).subscribe((response) => {
      this.store.dispatch(new SetAccount(response.user));
      this.router.navigate(['/']);
    });
  }
}
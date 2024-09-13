import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.error = '';
        const body = {
          email: this.loginForm.get('email')?.value,
          password: this.loginForm.get('password')?.value,
        }
        this.authService.login(body).subscribe({
          next: (response) => {
            this.router.navigate(['/dashboard']); // Navigate to dashboard
          },
          error: (error) => {
            console.error('Login failed', error);
          },
          complete: () => {
            this.isLoading = false; // Stop loading
          },
        }
        );
    }
  }
}
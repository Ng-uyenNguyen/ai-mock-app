import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  showPassword = false;
  passwordStrength = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form submitted', this.registrationForm.value);
      const body = {};
      this.authService.register(body).subscribe({
        next : (res) => {
          this.router.navigate(['/login']);
        },
        error : (err) => {
          console.error('Registration failed', err);
        }
      })
    }
  }

  getPasswordStrength() {
    const password = this.registrationForm.get('password')?.value;
    if (!password) return '';
    if (password.length < 6) return 'Weak';
    if (password.length < 10) return 'Medium';
    return 'Strong';
  }

  getStrengthColor() {
    switch (this.getPasswordStrength()) {
      case 'Weak': return 'warn';
      case 'Medium': return 'accent';
      case 'Strong': return 'primary';
      default: return '';
    }
  }
}
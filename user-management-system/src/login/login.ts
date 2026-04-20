import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  hidePassword = signal(true);
  loading = signal(false);
  forgotPasswordLoading = signal(false);
  showForgotPasswordForm = signal(false);
  oauthLoading = signal(false);

  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');
    const error = this.route.snapshot.queryParamMap.get('error');
    if (error) {
      this.snackBar.open('Dang nhap Google that bai. Vui long thu lai.', 'Dong', { duration: 5000 });
      return;
    }

    if (code && typeof window !== 'undefined') {
      const redirectUri = `${window.location.origin}/login`;
      this.oauthLoading.set(true);
      this.authService.exchangeKeycloakCode(code, redirectUri).subscribe({
        next: (res) => {
          this.oauthLoading.set(false);
          if (res.result?.access_token) {
            this.authService.setAccessToken(res.result.access_token);
            this.snackBar.open('Dang nhap Google thanh cong!', 'Dong', { duration: 3000 });
            this.router.navigate(['/home']);
          } else {
            this.snackBar.open('Khong nhan duoc token. Vui long kiem tra backend exchange.', 'Dong', { duration: 5000 });
          }
        },
        error: (err: unknown) => {
          this.oauthLoading.set(false);
          const fallback = 'Khong the dang nhap Google luc nay. Vui long thu lai sau.';
          const msg =
            typeof err === 'object' && err !== null && 'error' in err
              ? (err as { error?: { message?: string } }).error?.message || fallback
              : fallback;
          this.snackBar.open(msg, 'Dong', { duration: 5000 });
        }
      });
    }
  }

  onForgotPassword() {
    this.showForgotPasswordForm.set(!this.showForgotPasswordForm());
  }

  onLoginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  onForgotPasswordSubmit() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    const email = this.forgotPasswordForm.value.email;
    if (!email) {
      return;
    }

    this.forgotPasswordLoading.set(true);
    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.forgotPasswordLoading.set(false);
        this.showForgotPasswordForm.set(false);
        this.forgotPasswordForm.reset();
        this.snackBar.open(
          'Neu email ton tai, he thong da gui huong dan dat lai mat khau.',
          'Dong',
          { duration: 5000 }
        );
      },
      error: (err: unknown) => {
        this.forgotPasswordLoading.set(false);
        const fallbackMessage = 'Khong the xu ly yeu cau luc nay. Vui long thu lai sau.';
        const errorMessage =
          typeof err === 'object' && err !== null && 'error' in err
            ? (err as { error?: { message?: string } }).error?.message || fallbackMessage
            : fallbackMessage;
        this.snackBar.open(errorMessage, 'Dong', { duration: 5000 });
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      const { username, password } = this.loginForm.value;
      
      this.authService.login(username!, password!).subscribe({
        next: () => {
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loading.set(false);
          this.snackBar.open(err.error?.message || 'Login failed. Please check your credentials.', 'Close', { duration: 5000 });
        }
      });
    }
  }
}

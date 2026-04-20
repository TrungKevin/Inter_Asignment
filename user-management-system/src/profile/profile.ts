import { Component, inject, signal, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { UserResponse } from '../model/models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  user = signal<UserResponse | null>(null);
  loading = signal(false);
  errorMessage = signal('');

  ngOnInit() {
    const username = this.authService.currentUser()?.preferred_username;
    if (username) {
      this.loading.set(true);
      this.errorMessage.set('');
      this.authService.getUserProfile(username).subscribe({
        next: (res) => {
          this.user.set(res);
          this.loading.set(false);
          this.snackBar.open('Tai thong tin profile thanh cong.', 'Dong', { duration: 2500 });
        },
        error: (err: unknown) => {
          const fallbackMessage = 'Khong the tai thong tin profile. Vui long thu lai.';
          const message =
            typeof err === 'object' && err !== null && 'error' in err
              ? (err as { error?: { message?: string } }).error?.message || fallbackMessage
              : fallbackMessage;
          this.errorMessage.set(message);
          this.loading.set(false);
          this.snackBar.open(message, 'Dong', { duration: 5000 });
        }
      });
    }
  }

}

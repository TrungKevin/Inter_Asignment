import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { AccessRequestSubmitPayload } from '../../model/models';

@Component({
  selector: 'app-create-access-request',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './create-request.html',
  styleUrl: './create-request.css'
})
export class CreateAccessRequest {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  readonly departmentOptions = ['IT', 'SALES', 'HR', 'FINANCE'];
  readonly roleOptions = ['user', 'admin'];
  readonly loading = signal(false);

  readonly requestForm = this.fb.nonNullable.group({
    departmentCode: ['IT', [Validators.required]],
    reason: ['', [Validators.required, Validators.maxLength(1000)]],
    roles: this.fb.nonNullable.control<string[]>(['user'], [Validators.required])
  });

  onSubmit() {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    const username = this.authService.currentUser()?.preferred_username;
    if (!username) {
      this.snackBar.open('Khong xac dinh duoc user hien tai, vui long dang nhap lai.', 'Dong', {
        duration: 4000
      });
      return;
    }

    const formValue = this.requestForm.getRawValue();
    const payload: AccessRequestSubmitPayload = {
      requesterUsername: username,
      reason: formValue.reason.trim(),
      departmentCode: formValue.departmentCode,
      roles: formValue.roles,
      payload: {
        reason: formValue.reason.trim(),
        department: formValue.departmentCode,
        roles: formValue.roles
      }
    };

    this.loading.set(true);
    this.authService.createAccessRequest(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.snackBar.open('Tao yeu cau thanh cong.', 'Dong', { duration: 3000 });
        this.requestForm.patchValue({
          reason: '',
          roles: ['user']
        });
      },
      error: (error: unknown) => {
        this.loading.set(false);
        const fallback = 'Tao yeu cau that bai. Vui long thu lai.';
        const message =
          typeof error === 'object' && error !== null && 'error' in error
            ? (error as { error?: { message?: string } }).error?.message || fallback
            : fallback;
        this.snackBar.open(message, 'Dong', { duration: 5000 });
      }
    });
  }
}

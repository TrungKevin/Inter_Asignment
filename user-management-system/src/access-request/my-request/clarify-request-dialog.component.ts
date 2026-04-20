import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { AccessRequestTaskItem } from '../../model/models';

export interface ClarifyRequestDialogData {
  requestId: number;
  /** Tu bang access_requests (rejection_reason) khi NEED_MORE_INFO */
  adminFeedback?: string | null;
}

@Component({
  selector: 'app-clarify-request-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title class="!text-lg">Bo sung thong tin — Request #{{ data.requestId }}</h2>
    <mat-dialog-content class="!pt-2">
      @if (loading()) {
        <div class="flex justify-center py-6">
          <mat-spinner diameter="40" />
        </div>
      } @else if (loadError()) {
        <p class="text-sm text-red-700">{{ loadError() }}</p>
      } @else {
        @if (feedbackText()) {
          <div class="mb-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800">
            <div class="mb-1 font-semibold text-slate-700">Yeu cau tu admin</div>
            <div class="whitespace-pre-wrap">{{ feedbackText() }}</div>
          </div>
        }
        <p class="mb-3 text-sm text-slate-600">
          Nhap noi dung bo sung. Sau khi gui, phieu se tro lai cho admin xac nhan hoac tu choi.
        </p>
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Noi dung bo sung</mat-label>
          <textarea
            matInput
            rows="5"
            [(ngModel)]="comment"
            [disabled]="sending()"
            placeholder="Vi du: da cap nhat ly do, dinh kem thong tin bo sung..."
          ></textarea>
        </mat-form-field>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="!pb-4 !pt-2">
      <button mat-button type="button" (click)="cancel()" [disabled]="sending()">Huy</button>
      <button
        mat-flat-button
        color="primary"
        type="button"
        (click)="submit()"
        [disabled]="loading() || !!loadError() || !task() || sending()"
      >
        Gui cho admin
      </button>
    </mat-dialog-actions>
  `
})
export class ClarifyRequestDialogComponent implements OnInit {
  private readonly userClarifyTaskKeys = ['user_clarify_task', 'Activity_UserClarify'];

  private authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef<ClarifyRequestDialogComponent, boolean>);
  private snackBar = inject(MatSnackBar);
  readonly data = inject<ClarifyRequestDialogData>(MAT_DIALOG_DATA);

  readonly loading = signal(false);
  readonly sending = signal(false);
  readonly loadError = signal<string | null>(null);
  readonly task = signal<AccessRequestTaskItem | null>(null);
  comment = '';

  readonly feedbackText = computed(() => {
    const t = this.task();
    const fromTask = t?.adminComment?.trim();
    if (fromTask) {
      return fromTask;
    }
    const fromRow = this.data.adminFeedback?.trim();
    return fromRow || '';
  });

  ngOnInit(): void {
    this.loading.set(true);
    if (!this.authService.currentUser()?.preferred_username?.trim()) {
      this.loading.set(false);
      this.loadError.set('Khong xac dinh duoc nguoi dung. Vui long dang nhap lai.');
      return;
    }

    /** Khong truyen assignee: backend lay assignee tu JWT — trung voi bien process `requester`.
     *  Truyen preferred_username luc truoc co the khac `requester` (email vs username) nen khong tim thay task.
     */
    this.authService
      .getPendingCamundaTasks(undefined, undefined, this.data.requestId, 'Activity_UserClarify')
      .subscribe({
        next: (response) => {
          this.loading.set(false);
          const list = response.result || [];
          const first =
            list.find((item) => this.userClarifyTaskKeys.includes(item.taskDefinitionKey ?? '')) ??
            list[0] ??
            null;
          if (!first || !this.userClarifyTaskKeys.includes(first.taskDefinitionKey ?? '')) {
            this.loadError.set(
              'Khong tim thay task bo sung thong tin cho phieu nay. Hay thu lai sau hoac mo trang Task can xu ly.'
            );
            return;
          }
          this.task.set(first);
        },
        error: (error: unknown) => {
          this.loading.set(false);
          const fallback = 'Khong the tai task.';
          const message =
            typeof error === 'object' && error !== null && 'error' in error
              ? (error as { error?: { message?: string } }).error?.message || fallback
              : fallback;
          this.loadError.set(message);
        }
      });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  submit(): void {
    const t = this.task();
    if (!t) {
      return;
    }
    const text = this.comment.trim();
    if (!text) {
      this.snackBar.open('Vui long nhap noi dung bo sung.', 'Dong', { duration: 4000 });
      return;
    }

    this.sending.set(true);
    this.authService.completeCamundaTask(t.taskId, { comment: text }).subscribe({
      next: () => {
        this.sending.set(false);
        this.snackBar.open('Da gui thong tin. Admin se tiep tuc xu ly phieu.', 'Dong', { duration: 4000 });
        this.dialogRef.close(true);
      },
      error: (error: unknown) => {
        this.sending.set(false);
        const fallback = 'Gui that bai.';
        const message =
          typeof error === 'object' && error !== null && 'error' in error
            ? (error as { error?: { message?: string } }).error?.message || fallback
            : fallback;
        this.snackBar.open(message, 'Dong', { duration: 5000 });
      }
    });
  }
}

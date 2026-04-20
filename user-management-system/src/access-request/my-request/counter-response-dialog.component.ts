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

export interface CounterResponseDialogData {
  requestId: number;
  /** Tu bang access_requests khi COUNTER_PROPOSED */
  adminFeedback?: string | null;
}

@Component({
  selector: 'app-counter-response-dialog',
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
    <h2 mat-dialog-title class="!text-lg">De xuat dieu chinh quyen — Request #{{ data.requestId }}</h2>
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
            <div class="mb-1 font-semibold text-slate-700">De xuat dieu chinh tu admin</div>
            <div class="whitespace-pre-wrap">{{ feedbackText() }}</div>
          </div>
        }
        <p class="mb-3 text-sm text-slate-600">
          Chap nhan: gui ghi chu ve cho admin — phieu tro lai cho admin duyet lan cuoi,
          chi khi admin bam Approve thi moi cap quyen.
          Tu choi: tu choi de xuat va ket thuc phieu (tu choi).
          Ghi chu la tuy chon.
        </p>
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Ghi chu (tuy chon)</mat-label>
          <textarea
            matInput
            rows="3"
            [(ngModel)]="comment"
            [disabled]="sending()"
            placeholder="Vi du: dong y voi de xuat dieu chinh quyen..."
          ></textarea>
        </mat-form-field>
      }
    </mat-dialog-content>
    <mat-dialog-actions
      align="end"
      class="!flex !flex-col gap-2 !pb-4 !pt-2 sm:!flex-row sm:!justify-end"
    >
      <button mat-button type="button" (click)="cancel()" [disabled]="sending()">Huy</button>
      <div class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <button
          mat-stroked-button
          color="warn"
          type="button"
          (click)="submit(false)"
          [disabled]="loading() || !!loadError() || !task() || sending()"
        >
          Tu choi de xuat
        </button>
        <button
          mat-flat-button
          color="primary"
          type="button"
          (click)="submit(true)"
          [disabled]="loading() || !!loadError() || !task() || sending()"
        >
          Chap nhan de xuat
        </button>
      </div>
    </mat-dialog-actions>
  `
})
export class CounterResponseDialogComponent implements OnInit {
  private readonly userCounterTaskKeys = ['user_counter_response_task', 'Activity_UserCounterResponse'];

  private authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef<CounterResponseDialogComponent, boolean>);
  private snackBar = inject(MatSnackBar);
  readonly data = inject<CounterResponseDialogData>(MAT_DIALOG_DATA);

  readonly loading = signal(false);
  readonly sending = signal(false);
  readonly loadError = signal<string | null>(null);
  readonly task = signal<AccessRequestTaskItem | null>(null);
  comment = '';

  readonly feedbackText = computed(() => {
    const t = this.task();
    const fromTask = t?.counterProposal?.trim();
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

    this.authService
      .getPendingCamundaTasks(undefined, undefined, this.data.requestId, 'Activity_UserCounterResponse')
      .subscribe({
        next: (response) => {
          this.loading.set(false);
          const list = response.result || [];
          const first =
            list.find((item) => this.userCounterTaskKeys.includes(item.taskDefinitionKey ?? '')) ??
            list[0] ??
            null;
          if (!first || !this.userCounterTaskKeys.includes(first.taskDefinitionKey ?? '')) {
            this.loadError.set(
              'Khong tim thay task xac nhan de xuat cho phieu nay. Hay thu lai sau hoac mo trang Task can xu ly.'
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

  submit(acceptCounter: boolean): void {
    const t = this.task();
    if (!t) {
      return;
    }

    this.sending.set(true);
    const text = this.comment.trim();
    this.authService
      .completeCamundaTask(t.taskId, {
        acceptCounter,
        comment: text
      })
      .subscribe({
        next: () => {
          this.sending.set(false);
          const msg = acceptCounter
            ? 'Ban da chap nhan de xuat. Luong se tiep tuc.'
            : 'Ban da tu choi de xuat.';
          this.snackBar.open(msg, 'Dong', { duration: 5000 });
          this.dialogRef.close(true);
        },
        error: (error: unknown) => {
          this.sending.set(false);
          const fallback = 'Gui phan hoi that bai.';
          const message =
            typeof error === 'object' && error !== null && 'error' in error
              ? (error as { error?: { message?: string } }).error?.message || fallback
              : fallback;
          this.snackBar.open(message, 'Dong', { duration: 5000 });
        }
      });
  }
}

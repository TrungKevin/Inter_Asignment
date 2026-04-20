import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AccessRequestMineItem } from '../../model/models';
import { WebSocketNotificationService } from '../../notifications/webSocket-notification.service';
import { ClarifyRequestDialogComponent } from './clarify-request-dialog.component';
import { CounterResponseDialogComponent } from './counter-response-dialog.component';

@Component({
  selector: 'app-my-access-requests',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule
  ],
  templateUrl: './my-requests.html',
  styleUrl: './my-requests.css'
})
export class MyAccessRequests {
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private webSocketNotificationService = inject(WebSocketNotificationService);
  private destroyRef = inject(DestroyRef);

  readonly loading = signal(false);
  readonly items = signal<AccessRequestMineItem[]>([]);
  readonly displayedColumns = ['requestId', 'departmentCode', 'status', 'message', 'updatedAt'];
  readonly needInfoCount = signal(0);
  readonly counterProposalCount = signal(0);

  constructor() {
    this.loadData();
    this.webSocketNotificationService.camundaTasksRefresh$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadData();
        window.setTimeout(() => this.loadData(), 550);
      });
  }

  loadData() {
    this.loading.set(true);
    this.authService.getMyAccessRequests().subscribe({
      next: (response) => {
        this.loading.set(false);
        const rows = response.result || [];
        this.items.set(rows);
        this.refreshUserNotifications(rows);
      },
      error: (error: unknown) => {
        this.loading.set(false);
        const fallback = 'Khong the tai danh sach yeu cau cua ban.';
        const message =
          typeof error === 'object' && error !== null && 'error' in error
            ? (error as { error?: { message?: string } }).error?.message || fallback
            : fallback;
        this.snackBar.open(message, 'Dong', { duration: 5000 });
      }
    });
  }

  formatDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleString('vi-VN');
  }

  goToPendingTasks() {
    this.router.navigate(['/camunda/tasks']);
  }

  openClarifyDialog(item: AccessRequestMineItem, event: Event): void {
    event.stopPropagation();
    if (item.status !== 'NEED_MORE_INFO') {
      return;
    }
    this.dialog
      .open(ClarifyRequestDialogComponent, {
        width: 'min(520px, 100vw)',
        data: { requestId: item.requestId, adminFeedback: item.adminFeedback ?? null }
      })
      .afterClosed()
      .subscribe((sent) => {
        if (sent) {
          this.loadData();
        }
      });
  }

  openCounterDialog(item: AccessRequestMineItem, event: Event): void {
    event.stopPropagation();
    if (item.status !== 'COUNTER_PROPOSED') {
      return;
    }
    this.dialog
      .open(CounterResponseDialogComponent, {
        width: 'min(520px, 100vw)',
        data: { requestId: item.requestId, adminFeedback: item.adminFeedback ?? null }
      })
      .afterClosed()
      .subscribe((sent) => {
        if (sent) {
          this.loadData();
        }
      });
  }

  private refreshUserNotifications(rows: AccessRequestMineItem[]) {
    const needInfo = rows.filter((item) => item.status === 'NEED_MORE_INFO').length;
    const counter = rows.filter((item) => item.status === 'COUNTER_PROPOSED').length;
    this.needInfoCount.set(needInfo);
    this.counterProposalCount.set(counter);

    if (needInfo > 0 || counter > 0) {
      const summary = [
        needInfo > 0 ? `${needInfo} yeu cau can bo sung thong tin` : '',
        counter > 0 ? `${counter} yeu cau can xac nhan de xuat` : ''
      ]
        .filter(Boolean)
        .join(' | ');
      this.snackBar.open(`Thong bao moi: ${summary}.`, 'Xem task', { duration: 6000 })
        .onAction()
        .subscribe(() => this.goToPendingTasks());
    }
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'PENDING_APPROVAL':
        return 'CHO DUYET';
      case 'NEED_MORE_INFO':
        return 'CAN BO SUNG THONG TIN';
      case 'COUNTER_PROPOSED':
        return 'DE XUAT DIEU CHINH';
      case 'PROVISIONING':
        return 'DANG CAP QUYEN';
      case 'PROVISIONED':
        return 'DA CAP QUYEN';
      case 'PROVISION_FAILED':
        return 'CAP QUYEN THAT BAI';
      case 'REJECTED':
        return 'TU CHOI';
      default:
        return status;
    }
  }

  messageLabel(item: AccessRequestMineItem): string {
    if (item.status === 'NEED_MORE_INFO') {
      return 'Yeu cau bo sung tu admin';
    }
    if (item.status === 'COUNTER_PROPOSED') {
      return 'De xuat dieu chinh tu admin';
    }
    return 'Message';
  }

  messageText(item: AccessRequestMineItem): string {
    const text = item.adminFeedback?.trim() || '';
    return text || '-';
  }

  hasMessage(item: AccessRequestMineItem): boolean {
    return this.messageText(item) !== '-';
  }

  isMessageActionable(item: AccessRequestMineItem): boolean {
    return item.status === 'NEED_MORE_INFO' || item.status === 'COUNTER_PROPOSED';
  }

  openMessageAction(item: AccessRequestMineItem, event: Event): void {
    if (item.status === 'NEED_MORE_INFO') {
      this.openClarifyDialog(item, event);
      return;
    }
    if (item.status === 'COUNTER_PROPOSED') {
      this.openCounterDialog(item, event);
    }
  }
}

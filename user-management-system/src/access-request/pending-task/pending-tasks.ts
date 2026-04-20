import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../../auth/auth.service';
import { AccessRequestTaskCompletePayload, AccessRequestTaskItem } from '../../model/models';
import { WebSocketNotificationService } from '../../notifications/webSocket-notification.service';

@Component({
  selector: 'app-pending-access-tasks',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule
  ],
  templateUrl: './pending-tasks.html',
  styleUrl: './pending-tasks.css'
})
export class PendingAccessTasks {
  private readonly adminTaskKeys = ['director_approve_task', 'manager_approve_task'];
  private readonly userClarifyTaskKeys = ['user_clarify_task', 'Activity_UserClarify'];
  private readonly userCounterTaskKeys = ['user_counter_response_task', 'Activity_UserCounterResponse'];

  private authService = inject(AuthService);
  private webSocketNotificationService = inject(WebSocketNotificationService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  readonly loading = signal(false);
  readonly completingTaskId = signal<string | null>(null);
  readonly tasks = signal<AccessRequestTaskItem[]>([]);
  readonly displayedColumns = [
    'taskId',
    'name',
    'taskType',
    'assignee',
    'businessKey',
    'created',
    'message',
    'actions'
  ];
  readonly candidateGroupOptions = ['admin', 'user'];
  readonly filterForm = this.fb.nonNullable.group({
    candidateGroup: [''],
    assignee: ['']
  });

  constructor() {
    const username = this.authService.currentUser()?.preferred_username || '';
    const isAdmin = this.authService.hasRole('admin');
    this.filterForm.patchValue({ assignee: isAdmin ? '' : username, candidateGroup: '' });
    this.loadTasks();
    this.webSocketNotificationService.camundaTasksRefresh$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadTasks();
        // Tin backend/ Camunda có thể tới trước khi complete commit xong — reload lần 2 sau cỡ nửa giây.
        window.setTimeout(() => this.loadTasks(), 550);
      });
  }

  loadTasks() {
    const filters = this.filterForm.getRawValue();
    const assignee = filters.candidateGroup ? '' : filters.assignee;
    this.loading.set(true);
    this.authService
      .getPendingCamundaTasks(assignee, filters.candidateGroup)
      .subscribe({
        next: (response) => {
          this.loading.set(false);
          this.tasks.set(response.result || []);
        },
        error: (error: unknown) => {
          this.loading.set(false);
          const fallback = 'Khong the tai danh sach task.';
          const message =
            typeof error === 'object' && error !== null && 'error' in error
              ? (error as { error?: { message?: string } }).error?.message || fallback
              : fallback;
          this.snackBar.open(message, 'Dong', { duration: 5000 });
        }
      });
  }

  completeTask(task: AccessRequestTaskItem, payload: AccessRequestTaskCompletePayload, retriedAfterRefresh = false) {
    this.completingTaskId.set(task.taskId);
    this.authService.completeCamundaTask(task.taskId, payload).subscribe({
      next: () => {
        this.completingTaskId.set(null);
        this.emitRealtimeAction(task, payload);
        this.snackBar.open('Complete task thanh cong.', 'Dong', { duration: 2500 });
        this.loadTasks();
      },
      error: (error: unknown) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 404 &&
          !retriedAfterRefresh
        ) {
          this.attemptRecover404Complete(task, payload);
          return;
        }
        this.completingTaskId.set(null);
        const fallback = 'Complete task that bai.';
        const httpErr = error instanceof HttpErrorResponse ? error : null;
        const msgFromApi =
          httpErr?.error &&
          typeof httpErr.error === 'object' &&
          httpErr.error !== null &&
          'message' in httpErr.error &&
          typeof (httpErr.error as { message?: string }).message === 'string'
            ? (httpErr.error as { message: string }).message
            : null;
        const message = msgFromApi || fallback;
        this.snackBar.open(message, 'Dong', { duration: 5000 });
      }
    });
  }

  /**
   * Camunda tra 404 neu task da bien mat (da complete, dong bo sai taskId sau reload).
   * Lay lai danh sach — neu con dung hang (businessKey + taskDefinitionKey hoac taskId moi) thi complete mot lan nua.
   */
  private attemptRecover404Complete(
    original: AccessRequestTaskItem,
    payload: AccessRequestTaskCompletePayload
  ) {
    const filters = this.filterForm.getRawValue();
    const assignee = filters.candidateGroup ? '' : filters.assignee;
    this.authService.getPendingCamundaTasks(assignee, filters.candidateGroup).subscribe({
      next: (response) => {
        const list = response.result || [];
        this.tasks.set(list);

        const matchByKeys =
          original.businessKey &&
          original.taskDefinitionKey &&
          list.find(
            (t) =>
              t.businessKey === original.businessKey &&
              t.taskDefinitionKey === original.taskDefinitionKey
          );

        const matchByOldId = list.find((t) => t.taskId === original.taskId);

        const fresh = matchByKeys ?? matchByOldId ?? null;

        if (fresh && fresh.taskId !== original.taskId) {
          this.completeTask(fresh, payload, true);
          return;
        }

        if (fresh && fresh.taskId === original.taskId) {
          this.completingTaskId.set(null);
          this.snackBar.open(
            'Van thay task tren danh sach nhung server khong chap nhan (404). Hay bam nut Tai task roi thu lai.',
            'Dong',
            { duration: 7000 }
          );
          return;
        }

        this.completingTaskId.set(null);
        this.snackBar.open(
          'Task khong con treo tren Camunda (co the da duoc xu ly). Da cap nhat danh sach.',
          'Dong',
          { duration: 7000 }
        );
      },
      error: () => {
        this.completingTaskId.set(null);
        this.snackBar.open('Khong tai lai danh sach task.', 'Dong', { duration: 5000 });
      }
    });
  }

  runAdminAction(task: AccessRequestTaskItem, action: 'APPROVE' | 'REJECT' | 'NEED_INFO' | 'COUNTER_PROPOSAL') {
    const comment = this.askComment(action);
    if (comment === null) {
      return;
    }
    this.completeTask(task, { action, comment });
  }

  submitClarification(task: AccessRequestTaskItem) {
    const comment = this.askComment('CLARIFIED');
    if (comment === null) {
      return;
    }
    this.completeTask(task, { comment });
  }

  respondCounter(task: AccessRequestTaskItem, acceptCounter: boolean) {
    const action = acceptCounter ? 'ACCEPT_COUNTER' : 'DECLINE_COUNTER';
    const comment = this.askComment(action);
    if (comment === null) {
      return;
    }
    this.completeTask(task, { acceptCounter, comment });
  }

  isAdminApproveTask(task: AccessRequestTaskItem): boolean {
    return this.adminTaskKeys.includes(task.taskDefinitionKey);
  }

  isUserClarifyTask(task: AccessRequestTaskItem): boolean {
    return this.userClarifyTaskKeys.includes(task.taskDefinitionKey);
  }

  isUserCounterTask(task: AccessRequestTaskItem): boolean {
    return this.userCounterTaskKeys.includes(task.taskDefinitionKey);
  }

  taskTypeLabel(task: AccessRequestTaskItem): string {
    if (this.isAdminApproveTask(task)) {
      return 'ADMIN_APPROVE';
    }
    if (this.isUserClarifyTask(task)) {
      return 'USER_CLARIFY';
    }
    if (this.isUserCounterTask(task)) {
      return 'USER_COUNTER_RESPONSE';
    }
    return task.taskDefinitionKey || 'UNKNOWN';
  }

  taskHint(task: AccessRequestTaskItem): string {
    if (this.isAdminApproveTask(task)) {
      return 'Admin chon 1 trong 4 action: Approve, Reject, Need info, Counter proposal.';
    }
    if (this.isUserClarifyTask(task)) {
      return 'User bo sung thong tin theo noi dung admin yeu cau.';
    }
    if (this.isUserCounterTask(task)) {
      return 'User gui phan hoi va chap nhan/tu choi — neu chap nhan, admin se duyet lan cuoi roi moi cap quyen.';
    }
    return 'Task khong co mo ta tuong tac bo sung.';
  }

  actionStateLabel(task: AccessRequestTaskItem): string {
    if (this.isAdminApproveTask(task)) {
      return 'CHO ADMIN XU LY';
    }
    if (this.isUserClarifyTask(task) || this.isUserCounterTask(task)) {
      return 'CHO USER CAP NHAT';
    }
    return 'KHONG XAC DINH';
  }

  actionStateClass(task: AccessRequestTaskItem): string {
    if (this.isAdminApproveTask(task)) {
      return 'bg-indigo-100 text-indigo-700';
    }
    if (this.isUserClarifyTask(task) || this.isUserCounterTask(task)) {
      return 'bg-amber-100 text-amber-700';
    }
    return 'bg-slate-100 text-slate-600';
  }

  hasMessage(task: AccessRequestTaskItem): boolean {
    return !!this.getMessageText(task);
  }

  messageLabel(task: AccessRequestTaskItem): string {
    if (this.isAdminApproveTask(task) && task.userClarification?.trim()) {
      return 'Thong tin user bo sung';
    }
    if (this.isAdminApproveTask(task) && task.userCounterComment?.trim()) {
      return 'Phan hoi user ve de xuat';
    }
    if (this.isAdminApproveTask(task) && task.requestReason?.trim()) {
      return 'Ly do user dang ky';
    }
    if (this.isUserClarifyTask(task) && task.adminComment?.trim()) {
      return 'Yeu cau tu admin';
    }
    if (this.isUserCounterTask(task) && task.counterProposal?.trim()) {
      return 'De xuat dieu chinh tu admin';
    }
    return 'Message';
  }

  getMessageText(task: AccessRequestTaskItem): string {
    if (this.isAdminApproveTask(task)) {
      const clarify = task.userClarification?.trim();
      if (clarify) {
        return clarify;
      }
      const counter = task.userCounterComment?.trim();
      if (counter) {
        return counter;
      }
      const initialReason = task.requestReason?.trim();
      if (initialReason) {
        return initialReason;
      }
      return '';
    }
    if (this.isUserClarifyTask(task)) {
      return task.adminComment?.trim() || '';
    }
    if (this.isUserCounterTask(task)) {
      return task.counterProposal?.trim() || '';
    }
    return '';
  }

  getMessageTime(task: AccessRequestTaskItem): string {
    if (this.isAdminApproveTask(task)) {
      if (task.userClarification?.trim()) {
        return task.userClarificationAt || '';
      }
      if (task.userCounterComment?.trim()) {
        return task.userCounterCommentAt || '';
      }
    }
    return '';
  }

  private askComment(action: string): string | null {
    return window.prompt(`Nhap noi dung cho action ${action}:`) ?? null;
  }

  private emitRealtimeAction(task: AccessRequestTaskItem, payload: AccessRequestTaskCompletePayload) {
    const requestId = this.parseRequestId(task.businessKey);
    if (this.isAdminApproveTask(task)) {
      const targetUsername = task.requesterUsername?.trim();
      if (!targetUsername) {
        return;
      }
      const action = payload.action || 'UPDATE';
      const message =
        action === 'APPROVE'
          ? 'Admin da duyet yeu cau cua ban.'
          : action === 'REJECT'
            ? 'Admin da tu choi yeu cau cua ban.'
            : action === 'NEED_INFO'
              ? 'Admin yeu cau ban bo sung them thong tin.'
              : 'Admin da gui de xuat dieu chinh quyen.';
      this.webSocketNotificationService.sendToUser(targetUsername, message, requestId, `ADMIN_${action}`);
      return;
    }
    const who = task.assignee?.trim() || 'user';
    const detail = payload.acceptCounter == null
      ? 'da gui bo sung thong tin'
      : payload.acceptCounter
        ? 'da chap nhan de xuat dieu chinh'
        : 'da tu choi de xuat dieu chinh';
    this.webSocketNotificationService.sendToAdmin(
      `${who} ${detail}.`,
      requestId,
      payload.acceptCounter == null ? 'USER_CLARIFIED' : 'USER_COUNTER_RESPONSE'
    );
  }

  private parseRequestId(businessKey: string | null): number | undefined {
    if (!businessKey) {
      return undefined;
    }
    const match = /^REQ-(\d+)$/.exec(businessKey.trim());
    if (!match) {
      return undefined;
    }
    const id = Number(match[1]);
    return Number.isFinite(id) ? id : undefined;
  }

  formatDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleString('vi-VN');
  }

}

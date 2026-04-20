import { Component, inject, signal, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../auth/auth.service';
import { LoginLogResponse, ProfileResponse } from '../model/models';

type ExportTableKey = 'users' | 'loginLogs';
type UserExportColumnKey = 'username' | 'email' | 'first_name' | 'last_name' | 'dob';
type LoginExportColumnKey = 'login_id' | 'username' | 'email' | 'login_time' | 'status';

interface UserExportColumnOption {
  key: UserExportColumnKey;
  label: string;
}

interface LoginExportColumnOption {
  key: LoginExportColumnKey;
  label: string;
}

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanel implements OnInit {
  authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  profiles = signal<ProfileResponse[]>([]);
  userPageIndex = signal(0);
  readonly userPageSize = 10;
  userTotalPages = signal(0);
  userTotalElements = signal(0);
  loginLogs = signal<LoginLogResponse[]>([]);
  loading = signal(false);
  loginLogsLoading = signal(false);
  errorMessage = signal('');
  loginLogsErrorMessage = signal('');
  reportLoading = signal(false);
  loginLogsPage = signal(1);
  readonly loginLogsPageSize = 10;
  displayedColumns = ['username', 'email', 'fullName', 'dob', 'actions'];
  loginLogDisplayedColumns = ['loginId', 'username', 'email', 'loginTime', 'status'];

  exportUserColumns: UserExportColumnOption[] = [
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'first_name', label: 'Ho' },
    { key: 'last_name', label: 'Ten' },
    { key: 'dob', label: 'Ngay sinh' }
  ];

  exportLoginColumns: LoginExportColumnOption[] = [
    { key: 'login_id', label: 'Login ID' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'login_time', label: 'Login Time' },
    { key: 'status', label: 'Status' }
  ];

  selectedTables = signal<Record<ExportTableKey, boolean>>({
    users: true,
    loginLogs: false
  });

  selectedUserColumns = signal<Record<UserExportColumnKey, boolean>>({
    username: true,
    email: true,
    first_name: true,
    last_name: true,
    dob: true
  });

  selectedLoginColumns = signal<Record<LoginExportColumnKey, boolean>>({
    login_id: true,
    username: true,
    email: true,
    login_time: true,
    status: true
  });

  ngOnInit() {
    this.loadProfiles();
    this.loadLoginLogs();
  }

  loadProfiles(showFeedback = false) {
    this.loading.set(true);
    this.errorMessage.set('');
    this.authService.getProfilesPage(this.userPageIndex(), this.userPageSize).subscribe({
      next: (res) => {
        const page = res.result;
        this.profiles.set(page?.content ?? []);
        this.userTotalPages.set(page?.totalPages ?? 0);
        this.userTotalElements.set(page?.totalElements ?? 0);
        this.loading.set(false);
        if (showFeedback) {
          this.snackBar.open('Tai danh sach nguoi dung thanh cong.', 'Dong', { duration: 2500 });
        }
      },
      error: (err: unknown) => {
        const fallbackMessage = 'Khong the tai danh sach nguoi dung. Vui long thu lai.';
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

  getUserDisplayPageOneBased(): number {
    return this.userPageIndex() + 1;
  }

  getUserPageNumberButtons(): number[] {
    const total = this.userTotalPages();
    if (total <= 0) {
      return [];
    }
    const currentPage = this.getUserDisplayPageOneBased();
    const groupStart = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const groupEnd = Math.min(groupStart + 9, total);
    return Array.from({ length: groupEnd - groupStart + 1 }, (_, index) => groupStart + index);
  }

  showUserManyPagesHint(): boolean {
    const total = this.userTotalPages();
    const currentPage = this.getUserDisplayPageOneBased();
    const currentGroupEnd = Math.floor((currentPage - 1) / 10) * 10 + 10;
    return total > currentGroupEnd;
  }

  goToUserPageOneBased(pageOneBased: number) {
    const total = this.userTotalPages();
    if (pageOneBased < 1 || pageOneBased > total) {
      return;
    }
    this.userPageIndex.set(pageOneBased - 1);
    this.loadProfiles();
  }

  goToUserNextPage() {
    this.goToUserPageOneBased(this.getUserDisplayPageOneBased() + 1);
  }

  goToUserPreviousPage() {
    this.goToUserPageOneBased(this.getUserDisplayPageOneBased() - 1);
  }

  goToNextUserPageBlock() {
    const currentPage = this.getUserDisplayPageOneBased();
    const nextGroupFirstPage = Math.floor((currentPage - 1) / 10) * 10 + 11;
    this.goToUserPageOneBased(nextGroupFirstPage);
  }

  getUserNextPageBlockLabel(): string {
    const currentPage = this.getUserDisplayPageOneBased();
    const nextGroupFirstPage = Math.floor((currentPage - 1) / 10) * 10 + 11;
    return `${nextGroupFirstPage}+`;
  }

  loadLoginLogs(showFeedback = false) {
    this.loginLogsLoading.set(true);
    this.loginLogsErrorMessage.set('');
    this.authService.getAdminLoginLogs().subscribe({
      next: (res) => {
        this.loginLogs.set(res.result || []);
        this.loginLogsPage.set(1);
        this.loginLogsLoading.set(false);
        if (showFeedback) {
          this.snackBar.open('Tai login logs thanh cong.', 'Dong', { duration: 2500 });
        }
      },
      error: (err: unknown) => {
        const fallbackMessage = 'Khong the tai login logs. Vui long thu lai.';
        const message =
          typeof err === 'object' && err !== null && 'error' in err
            ? (err as { error?: { message?: string } }).error?.message || fallbackMessage
            : fallbackMessage;
        this.loginLogsErrorMessage.set(message);
        this.loginLogsLoading.set(false);
        this.snackBar.open(message, 'Dong', { duration: 5000 });
      }
    });
  }

  onRefreshData() {
    this.loadProfiles(true);
    this.loadLoginLogs(true);
  }

  getTotalLoginLogPages(): number {
    const total = this.loginLogs().length;
    return Math.max(1, Math.ceil(total / this.loginLogsPageSize));
  }

  getPagedLoginLogs(): LoginLogResponse[] {
    const page = this.loginLogsPage();
    const start = (page - 1) * this.loginLogsPageSize;
    return this.loginLogs().slice(start, start + this.loginLogsPageSize);
  }

  getLoginLogPageNumbers(): number[] {
    const totalPages = this.getTotalLoginLogPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  goToLoginLogPage(page: number) {
    const totalPages = this.getTotalLoginLogPages();
    if (page < 1 || page > totalPages) {
      return;
    }
    this.loginLogsPage.set(page);
  }

  goToNextLoginLogPage() {
    this.goToLoginLogPage(this.loginLogsPage() + 1);
  }

  goToPreviousLoginLogPage() {
    this.goToLoginLogPage(this.loginLogsPage() - 1);
  }

  getSelectedTableKeys(): ExportTableKey[] {
    const selected = this.selectedTables();
    return (Object.keys(selected) as ExportTableKey[]).filter((key) => !!selected[key]);
  }

  isTableSelected(table: ExportTableKey): boolean {
    return this.selectedTables()[table];
  }

  onToggleTable(table: ExportTableKey, checked: boolean) {
    this.selectedTables.update((prev) => ({ ...prev, [table]: checked }));
  }

  getSelectedUserColumnKeys(): UserExportColumnKey[] {
    const selected = this.selectedUserColumns();
    return this.exportUserColumns.map((c) => c.key).filter((k) => !!selected[k]);
  }

  getSelectedLoginColumnKeys(): LoginExportColumnKey[] {
    const selected = this.selectedLoginColumns();
    return this.exportLoginColumns.map((c) => c.key).filter((k) => !!selected[k]);
  }

  onToggleUserColumn(key: UserExportColumnKey, checked: boolean) {
    this.selectedUserColumns.update((prev) => ({ ...prev, [key]: checked }));
  }

  onToggleLoginColumn(key: LoginExportColumnKey, checked: boolean) {
    this.selectedLoginColumns.update((prev) => ({ ...prev, [key]: checked }));
  }

  onSelectAllUserColumns() {
    this.selectedUserColumns.set({
      username: true,
      email: true,
      first_name: true,
      last_name: true,
      dob: true
    });
  }

  onClearAllUserColumns() {
    this.selectedUserColumns.set({
      username: false,
      email: false,
      first_name: false,
      last_name: false,
      dob: false
    });
  }

  onSelectAllLoginColumns() {
    this.selectedLoginColumns.set({
      login_id: true,
      username: true,
      email: true,
      login_time: true,
      status: true
    });
  }

  onClearAllLoginColumns() {
    this.selectedLoginColumns.set({
      login_id: false,
      username: false,
      email: false,
      login_time: false,
      status: false
    });
  }

  onDownloadReport(format: 'pdf' | 'xlsx') {
    const selectedTables = this.getSelectedTableKeys();
    if (selectedTables.length === 0) {
      this.snackBar.open('Vui long chon it nhat 1 bang de xuat.', 'Dong', { duration: 3000 });
      return;
    }

    const userColumns = this.getSelectedUserColumnKeys();
    const loginColumns = this.getSelectedLoginColumnKeys();

    if (this.isTableSelected('users') && userColumns.length === 0) {
      this.snackBar.open('Bang User chua chon cot nao.', 'Dong', { duration: 3000 });
      return;
    }

    if (this.isTableSelected('loginLogs') && loginColumns.length === 0) {
      this.snackBar.open('Bang Login Status chua chon cot nao.', 'Dong', { duration: 3000 });
      return;
    }

    this.reportLoading.set(true);
    this.authService.downloadCombinedAdminReport(format, selectedTables, userColumns, loginColumns).subscribe({
      next: (response) => {
        const contentDisposition = response.headers.get('content-disposition');
        const fallbackFileName = `Combined_Admin_Report.${format}`;
        const fileName = this.extractFileName(contentDisposition, fallbackFileName);
        const blob = response.body;

        if (!blob) {
          this.reportLoading.set(false);
          this.snackBar.open('Khong co du lieu file de tai.', 'Dong', { duration: 4000 });
          return;
        }

        this.triggerBrowserDownload(blob, fileName);
        this.reportLoading.set(false);
        this.snackBar.open(`Da tai ${fileName} thanh cong.`, 'Dong', { duration: 3000 });
      },
      error: (err: unknown) => {
        this.reportLoading.set(false);
        const fallbackMessage = 'Khong the xuat bao cao luc nay. Vui long thu lai sau.';
        const message =
          typeof err === 'object' && err !== null && 'error' in err
            ? (err as { error?: { message?: string } }).error?.message || fallbackMessage
            : fallbackMessage;
        this.snackBar.open(message, 'Dong', { duration: 5000 });
      }
    });
  }

  private extractFileName(contentDisposition: string | null, fallback: string): string {
    if (!contentDisposition) {
      return fallback;
    }

    const match = /filename="?([^"]+)"?/i.exec(contentDisposition);
    return match?.[1] ?? fallback;
  }

  private triggerBrowserDownload(blob: Blob, fileName: string) {
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(downloadUrl);
  }

  formatLoginTime(value: string | null | undefined): string {
    if (!value) {
      return 'N/A';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString('vi-VN');
  }
}

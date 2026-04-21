import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, of, switchMap, takeWhile, catchError } from 'rxjs';
import * as XLSX from 'xlsx';
import { AuthService } from '../auth/auth.service';
import { ReportExportService } from '../reports/report-export.service';
import { WebSocketNotificationService } from '../notifications/webSocket-notification.service';
import { ExportJobStatusResponse, LoginLogResponse, ProfileResponse, ReportExportProgressEvent } from '../model/models';

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
    MatProgressBarModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanel implements OnInit {
  authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private sanitizer = inject(DomSanitizer);
  private reportExport = inject(ReportExportService);
  private webSocketNotification = inject(WebSocketNotificationService);
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
  currentExportJobId = signal<string | null>(null);
  currentExportFormat = signal<'pdf' | 'xlsx'>('pdf');
  reportProgress = signal(0);
  reportStatus = signal<'IDLE' | 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'>('IDLE');
  reportDownloadPath = signal<string | null>(null);
  previewVisible = signal(false);
  previewKind = signal<'none' | 'pdf' | 'xlsx'>('none');
  previewPdfUrl = signal<SafeResourceUrl | null>(null);
  previewPdfObjectUrl = signal<string | null>(null);
  previewExcelColumns = signal<string[]>([]);
  previewExcelRows = signal<Record<string, unknown>[]>([]);
  previewExcelPage = signal(1);
  readonly previewExcelPageSize = 10;
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
    this.subscribeReportExportEvents();
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

    if (!this.reportExport.isAsyncExportEnabled()) {
      this.startLegacySyncExport(format, selectedTables, userColumns, loginColumns);
      return;
    }

    this.reportLoading.set(true);
    this.reportStatus.set('PENDING');
    this.currentExportFormat.set(format);
    this.reportProgress.set(0);
    this.reportDownloadPath.set(null);
    this.currentExportJobId.set(null);
    this.reportExport.createExportJob(format, selectedTables, userColumns, loginColumns).subscribe({
      next: (res) => {
        const job = res.result;
        this.currentExportJobId.set(job.jobId);
        this.reportStatus.set(job.status ?? 'PENDING');
        this.reportProgress.set(job.percent ?? 0);
        if (job.format === 'pdf' || job.format === 'xlsx') {
          this.currentExportFormat.set(job.format);
        }
        this.reportDownloadPath.set(job.downloadPath ?? null);
        this.snackBar.open(`Dang xu ly #${job.jobId}`, 'Dong', { duration: 2500 });
        this.startJobPolling(job.jobId);
      },
      error: (err: unknown) => {
        this.reportLoading.set(false);
        this.reportStatus.set('FAILED');
        const fallbackMessage = 'Khong the tao export job luc nay. Vui long thu lai sau.';
        const message =
          typeof err === 'object' && err !== null && 'error' in err
            ? (err as { error?: { message?: string } }).error?.message || fallbackMessage
            : fallbackMessage;
        this.snackBar.open(message, 'Dong', { duration: 5000 });
      }
    });
  }

  onDownloadCompletedReport() {
    const jobId = this.currentExportJobId();
    if (!jobId) {
      return;
    }
    this.reportExport.downloadExportJob(jobId).subscribe({
      next: (response) => {
        const contentDisposition = response.headers.get('content-disposition');
        const fallbackFileName = `Combined_Admin_Report.${this.currentExportFormat()}`;
        const fileName = this.extractFileName(contentDisposition, fallbackFileName);
        const blob = response.body;

        if (!blob) {
          this.snackBar.open('Khong co du lieu file de tai.', 'Dong', { duration: 4000 });
          return;
        }

        this.triggerBrowserDownload(blob, fileName);
        this.snackBar.open(`Da tai ${fileName} thanh cong.`, 'Dong', { duration: 3000 });
      },
      error: (err: unknown) => {
        const fallbackMessage = 'Khong the tai file bao cao luc nay. Vui long thu lai sau.';
        const message =
          typeof err === 'object' && err !== null && 'error' in err
            ? (err as { error?: { message?: string } }).error?.message || fallbackMessage
            : fallbackMessage;
        this.snackBar.open(message, 'Dong', { duration: 5000 });
      }
    });
  }

  onPreviewCompletedReport() {
    const jobId = this.currentExportJobId();
    if (!jobId) {
      return;
    }
    this.reportExport.downloadExportJob(jobId).subscribe({
      next: (response) => {
        const blob = response.body;
        if (!blob) {
          this.snackBar.open('Khong co du lieu file de xem truoc.', 'Dong', { duration: 4000 });
          return;
        }
        const contentDisposition = response.headers.get('content-disposition');
        const fileName = this.extractFileName(contentDisposition, `Combined_Admin_Report_${jobId}`);
        const extension = this.resolveFileExtension(fileName, blob.type, this.currentExportFormat());

        if (extension === 'pdf') {
          this.openPdfPreview(blob);
          return;
        }
        this.openExcelPreview(blob);
      },
      error: (err: unknown) => {
        const fallbackMessage = 'Khong the xem truoc bao cao luc nay. Vui long thu lai sau.';
        const message =
          typeof err === 'object' && err !== null && 'error' in err
            ? (err as { error?: { message?: string } }).error?.message || fallbackMessage
            : fallbackMessage;
        this.snackBar.open(message, 'Dong', { duration: 5000 });
      }
    });
  }

  closePreview() {
    this.previewVisible.set(false);
    this.previewKind.set('none');
    this.previewExcelColumns.set([]);
    this.previewExcelRows.set([]);
    this.previewExcelPage.set(1);
    const url = this.previewPdfUrl();
    const objectUrl = this.previewPdfObjectUrl();
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
    if (url) {
      this.previewPdfUrl.set(null);
    }
    this.previewPdfObjectUrl.set(null);
  }

  private startLegacySyncExport(
    format: 'pdf' | 'xlsx',
    selectedTables: ExportTableKey[],
    userColumns: UserExportColumnKey[],
    loginColumns: LoginExportColumnKey[]
  ) {
    this.reportLoading.set(true);
    this.reportExport.downloadCombinedAdminReport(format, selectedTables, userColumns, loginColumns).subscribe({
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

  private subscribeReportExportEvents() {
    this.webSocketNotification.reportExportEvents$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event.jobId !== this.currentExportJobId()) {
          return;
        }
        this.applyReportEvent(event);
      });
  }

  private startJobPolling(jobId: string) {
    interval(2000)
      .pipe(
        switchMap(() =>
          this.reportExport.getExportJob(jobId).pipe(
            catchError(() => of(null))
          )
        ),
        takeWhile((res) => {
          if (!res?.result) {
            return true;
          }
          const status = res.result.status;
          this.applyStatusResponse(res.result);
          return status !== 'COMPLETED' && status !== 'FAILED';
        }, true),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private applyStatusResponse(job: ExportJobStatusResponse) {
    if (job.format === 'pdf' || job.format === 'xlsx') {
      this.currentExportFormat.set(job.format);
    }
    this.reportStatus.set(job.status);
    this.reportProgress.set(job.percent ?? this.reportProgress());
    this.reportDownloadPath.set(job.downloadPath ?? this.reportDownloadPath());
    if (job.status === 'COMPLETED' || job.status === 'FAILED') {
      this.reportLoading.set(false);
      if (job.status === 'FAILED' && job.errorMessage) {
        this.snackBar.open(job.errorMessage, 'Dong', { duration: 5000 });
      }
    }
  }

  private applyReportEvent(event: ReportExportProgressEvent) {
    if (event.percent !== undefined) {
      this.reportProgress.set(event.percent);
    }
    this.reportStatus.set(event.status);
    if (event.downloadUrl) {
      this.reportDownloadPath.set(event.downloadUrl);
    }
    if (event.status === 'COMPLETED' || event.status === 'FAILED') {
      this.reportLoading.set(false);
    }
  }

  private resolveFileExtension(
    fileName: string,
    mimeType: string,
    preferred: 'pdf' | 'xlsx'
  ): 'pdf' | 'xlsx' {
    const lowerName = fileName.toLowerCase();
    if (lowerName.endsWith('.pdf') || mimeType.includes('pdf')) {
      return 'pdf';
    }
    if (lowerName.endsWith('.xlsx') || mimeType.includes('spreadsheetml')) {
      return 'xlsx';
    }
    return preferred;
  }

  private openPdfPreview(blob: Blob) {
    const oldObjectUrl = this.previewPdfObjectUrl();
    if (oldObjectUrl) {
      URL.revokeObjectURL(oldObjectUrl);
    }
    const previewUrl = URL.createObjectURL(blob);
    this.previewPdfObjectUrl.set(previewUrl);
    this.previewPdfUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(previewUrl));
    this.previewKind.set('pdf');
    this.previewVisible.set(true);
  }

  private openExcelPreview(blob: Blob) {
    blob.arrayBuffer().then((buffer) => {
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetNames = workbook.SheetNames;
      const firstSheetName = sheetNames[0];
      if (!firstSheetName) {
        this.snackBar.open('File Excel khong co sheet de xem truoc.', 'Dong', { duration: 4000 });
        return;
      }
      const businessSheets = this.extractBusinessSheetNames(sheetNames);
      this.previewExcelPage.set(1);
      this.loadExcelPreviewRows(workbook, businessSheets);
      this.previewKind.set('xlsx');
      this.previewVisible.set(true);
      if (businessSheets.length > 1) {
        this.snackBar.open('Preview da gom ca User va Admin Login Status.', 'Dong', { duration: 3500 });
      }
    }).catch(() => {
      this.snackBar.open('Khong the doc noi dung Excel de xem truoc.', 'Dong', { duration: 5000 });
    });
  }

  getPreviewExcelTotalPages(): number {
    const total = this.previewExcelRows().length;
    return Math.max(1, Math.ceil(total / this.previewExcelPageSize));
  }

  getPreviewExcelPageRows(): Record<string, unknown>[] {
    const page = this.previewExcelPage();
    const start = (page - 1) * this.previewExcelPageSize;
    return this.previewExcelRows().slice(start, start + this.previewExcelPageSize);
  }

  getPreviewExcelPageNumbers(): number[] {
    const total = this.getPreviewExcelTotalPages();
    if (total <= 0) {
      return [];
    }
    const currentPage = this.previewExcelPage();
    const groupStart = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const groupEnd = Math.min(groupStart + 9, total);
    return Array.from({ length: groupEnd - groupStart + 1 }, (_, index) => groupStart + index);
  }

  goToPreviewExcelPage(page: number) {
    const total = this.getPreviewExcelTotalPages();
    if (page < 1 || page > total) {
      return;
    }
    this.previewExcelPage.set(page);
  }

  goToPreviewExcelPreviousPage() {
    this.goToPreviewExcelPage(this.previewExcelPage() - 1);
  }

  goToPreviewExcelNextPage() {
    this.goToPreviewExcelPage(this.previewExcelPage() + 1);
  }

  showPreviewExcelManyPagesHint(): boolean {
    const total = this.getPreviewExcelTotalPages();
    const currentPage = this.previewExcelPage();
    const currentGroupEnd = Math.floor((currentPage - 1) / 10) * 10 + 10;
    return total > currentGroupEnd;
  }

  goToPreviewExcelNextPageBlock() {
    const currentPage = this.previewExcelPage();
    const nextGroupFirstPage = Math.floor((currentPage - 1) / 10) * 10 + 11;
    this.goToPreviewExcelPage(nextGroupFirstPage);
  }

  getPreviewExcelNextPageBlockLabel(): string {
    const currentPage = this.previewExcelPage();
    const nextGroupFirstPage = Math.floor((currentPage - 1) / 10) * 10 + 11;
    return `${nextGroupFirstPage}+`;
  }

  private loadExcelPreviewRows(workbook: XLSX.WorkBook, sheetNames: string[]) {
    const combinedRows: Record<string, unknown>[] = [];
    const allColumns = new Set<string>();

    sheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      if (!sheet) {
        return;
      }
      const matrix = XLSX.utils.sheet_to_json<(string | number | boolean | null)[]>(sheet, {
        header: 1,
        defval: ''
      });
      const rowsAsStrings = matrix.map((row) => row.map((cell) => String(cell ?? '').trim()));
      const headerIndex = this.detectHeaderRowIndex(rowsAsStrings);
      const headers = rowsAsStrings[headerIndex] ?? [];
      const normalizedHeaders = headers.map((h, i) => h || `Column ${i + 1}`);
      const dataRows = rowsAsStrings.slice(headerIndex + 1).filter((r) => r.some((c) => c !== ''));
      normalizedHeaders.forEach((col) => allColumns.add(col));
      dataRows.forEach((r) => {
        const item: Record<string, unknown> = { Bang: sheetName };
        normalizedHeaders.forEach((h, i) => {
          item[h] = r[i] ?? '';
        });
        combinedRows.push(item);
      });
    });

    const finalColumns = ['Bang', ...Array.from(allColumns)];
    this.previewExcelColumns.set(finalColumns);
    this.previewExcelRows.set(combinedRows);
  }

  private detectHeaderRowIndex(rows: string[][]): number {
    let bestIndex = 0;
    let bestScore = 0;
    rows.forEach((row, index) => {
      const filled = row.filter((cell) => cell !== '').length;
      if (filled > bestScore) {
        bestScore = filled;
        bestIndex = index;
      }
    });
    return bestIndex;
  }

  private extractBusinessSheetNames(sheetNames: string[]): string[] {
    const filtered = sheetNames.filter((name) => !/^page\s+\d+$/i.test(name.trim()));
    return filtered.length > 0 ? filtered : sheetNames;
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

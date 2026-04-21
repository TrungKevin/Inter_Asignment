import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { appFeatures } from '../app/app-features';
import { ApiResponse, ExportJobStatusResponse } from '../model/models';

/**
 * Tập trung logic xuất báo cáo admin để dễ chuyển sang async (queue + WS) khi backend xong.
 *
 * Hiện trạng: backend chỉ có GET đồng bộ — luôn gọi {@link AuthService.downloadCombinedAdminReport}.
 * Tương lai: bật `appFeatures.asyncAdminReportExport` và nối POST job + poll/WS theo plan.md.
 */
@Injectable({
  providedIn: 'root'
})
export class ReportExportService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:8080';

  isAsyncExportEnabled(): boolean {
    return appFeatures.asyncAdminReportExport;
  }

  downloadCombinedAdminReport(
    format: 'pdf' | 'xlsx',
    tables: string[],
    usersColumns?: string[],
    loginColumns?: string[]
  ): Observable<HttpResponse<Blob>> {
    if (appFeatures.asyncAdminReportExport) {
      return throwError(
        () =>
          new Error(
            'Async report export chua duoc noi voi backend. Dat asyncAdminReportExport = false trong app-features.ts, hoac trien khai POST /api/reports/jobs.'
          )
      );
    }
    return this.authService.downloadCombinedAdminReport(format, tables, usersColumns, loginColumns);
  }

  createExportJob(
    format: 'pdf' | 'xlsx',
    tables: string[],
    usersColumns?: string[],
    loginColumns?: string[]
  ): Observable<ApiResponse<ExportJobStatusResponse>> {
    return this.http.post<ApiResponse<ExportJobStatusResponse>>(`${this.apiUrl}/api/reports/jobs`, {
      reportType: 'ADMIN_COMBINED',
      format,
      tables,
      usersColumns,
      loginColumns
    });
  }

  getExportJob(jobId: string): Observable<ApiResponse<ExportJobStatusResponse>> {
    return this.http.get<ApiResponse<ExportJobStatusResponse>>(`${this.apiUrl}/api/reports/jobs/${jobId}`);
  }

  downloadExportJob(jobId: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.apiUrl}/api/reports/jobs/${jobId}/download`, {
      responseType: 'blob',
      observe: 'response'
    });
  }
}

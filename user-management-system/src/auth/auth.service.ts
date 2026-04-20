import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import {
  ApiResponse,
  AccessRequestMineItem,
  AccessRequestSubmitPayload,
  AccessRequestTaskCompletePayload,
  AccessRequestTaskItem,
  LoginLogResponse,
  TokenExchangeResponse,
  ProfileResponse,
  PagedProfilesResponse,
  UserResponse,
  UserClaims
} from '../model/models';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:8080'; // Based on the user's spring config
  private keycloakBaseUrl = 'http://localhost:8180';
  private keycloakRealm = 'master';
  /** Must match Keycloak client ID (Clients list). */
  private keycloakClientId = 'asignment-client';

  private token = signal<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  );

  constructor() {
    const existingToken = this.token();
    if (existingToken) {
      this.logRealmRoles('token-restored');
    }
  }
  
  currentUser = computed(() => {
    const t = this.token();
    if (!t) return null;
    try {
      return jwtDecode<UserClaims>(t);
    } catch {
      return null;
    }
  });

  isAuthenticated = computed(() => !!this.token());
  
  isAdmin = computed(() => {
    return this.hasRole('admin');
  });

  hasRole(role: string): boolean {
    const normalizedRole = this.normalizeRole(role);
    return this.getAllRoleNames().includes(normalizedRole);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some((role) => this.hasRole(role));
  }

  private getAllRoleNames(): string[] {
    const user = this.currentUser();
    if (!user) {
      return [];
    }

    const realmRoles = (user.realm_access?.roles ?? []).map((role) =>
      this.normalizeRole(role)
    );
    const clientRoles = Object.values(user.resource_access ?? {})
      .flatMap((resource) => resource?.roles ?? [])
      .map((role) => this.normalizeRole(role));

    return Array.from(new Set([...realmRoles, ...clientRoles]));
  }

  private normalizeRole(role: string): string {
    return role.trim().toLowerCase().replace(/^role_/, '');
  }

  login(username: string, password: string): Observable<ApiResponse<TokenExchangeResponse>> {
    return this.http.post<ApiResponse<TokenExchangeResponse>>(`${this.apiUrl}/api/auth/validate`, {
      username,
      password
    }).pipe(
      tap(response => {
        if (response.result?.access_token) {
          this.setToken(response.result.access_token);
        }
      })
    );
  }

  register(data: unknown): Observable<ApiResponse<ProfileResponse>> {
    return this.http.post<ApiResponse<ProfileResponse>>(`${this.apiUrl}/register`, data);
  }

  forgotPassword(email: string): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.apiUrl}/api/auth/forgot-password`, { email });
  }

  loginWithGoogle() {
    if (typeof window === 'undefined') {
      return;
    }

    const redirectUri = `${window.location.origin}/login`;
    const authEndpoint = `${this.keycloakBaseUrl}/realms/${this.keycloakRealm}/protocol/openid-connect/auth`;
    const params = new URLSearchParams({
      client_id: this.keycloakClientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid',
      kc_idp_hint: 'google'
    });

    window.location.href = `${authEndpoint}?${params.toString()}`;
  }

  exchangeKeycloakCode(code: string, redirectUri: string): Observable<ApiResponse<TokenExchangeResponse>> {
    return this.http.post<ApiResponse<TokenExchangeResponse>>(`${this.apiUrl}/api/auth/oauth2/exchange`, {
      code,
      redirectUri
    });
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
    this.token.set(null);
    this.router.navigate(['/login']);
  }

  getUserProfile(username: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/api/users/${username}`);
  }

  getProfilesPage(page: number, size: number): Observable<ApiResponse<PagedProfilesResponse>> {
    const params = new HttpParams().set('page', String(page)).set('size', String(size));
    return this.http.get<ApiResponse<PagedProfilesResponse>>(`${this.apiUrl}/profiles`, { params });
  }

  getAdminLoginLogs(): Observable<ApiResponse<LoginLogResponse[]>> {
    return this.http.get<ApiResponse<LoginLogResponse[]>>(`${this.apiUrl}/api/admin/login-logs`);
  }

  createAccessRequest(payload: AccessRequestSubmitPayload): Observable<ApiResponse<unknown>> {
    return this.http.post<ApiResponse<unknown>>(`${this.apiUrl}/api/access-requests`, payload);
  }

  getMyAccessRequests(): Observable<ApiResponse<AccessRequestMineItem[]>> {
    return this.http.get<ApiResponse<AccessRequestMineItem[]>>(`${this.apiUrl}/api/access-requests/mine`);
  }

  getPendingCamundaTasks(
    assignee?: string,
    candidateGroup?: string,
    requestId?: number,
    taskDefinitionKey?: string
  ): Observable<ApiResponse<AccessRequestTaskItem[]>> {
    let params = new HttpParams();
    if (assignee && assignee.trim()) {
      params = params.set('assignee', assignee.trim());
    }
    if (candidateGroup && candidateGroup.trim()) {
      params = params.set('candidateGroup', candidateGroup.trim());
    }
    if (requestId != null) {
      params = params.set('requestId', String(requestId));
    }
    if (taskDefinitionKey && taskDefinitionKey.trim()) {
      params = params.set('taskDefinitionKey', taskDefinitionKey.trim());
    }
    return this.http.get<ApiResponse<AccessRequestTaskItem[]>>(`${this.apiUrl}/api/camunda/tasks`, { params });
  }

  completeCamundaTask(taskId: string, payload: AccessRequestTaskCompletePayload): Observable<ApiResponse<unknown>> {
    return this.http.post<ApiResponse<unknown>>(`${this.apiUrl}/api/camunda/tasks/${taskId}/complete`, payload);
  }

  downloadAllUsersDbReport(
    format: 'pdf' | 'xlsx',
    columns?: string[]
  ): Observable<HttpResponse<Blob>> {
    const params =
      columns && columns.length > 0
        ? new HttpParams().set('columns', columns.join(','))
        : undefined;

    return this.http.get(`${this.apiUrl}/api/reports/users-db/all/${format}`, {
      responseType: 'blob',
      observe: 'response',
      params
    });
  }

  downloadCombinedAdminReport(
    format: 'pdf' | 'xlsx',
    tables: string[],
    usersColumns?: string[],
    loginColumns?: string[]
  ): Observable<HttpResponse<Blob>> {
    let params = new HttpParams();

    if (tables.length > 0) {
      params = params.set('tables', tables.join(','));
    }
    if (usersColumns && usersColumns.length > 0) {
      params = params.set('usersColumns', usersColumns.join(','));
    }
    if (loginColumns && loginColumns.length > 0) {
      params = params.set('loginColumns', loginColumns.join(','));
    }

    return this.http.get(`${this.apiUrl}/api/reports/admin/combined/${format}`, {
      responseType: 'blob',
      observe: 'response',
      params
    });
  }

  private setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
    this.token.set(token);
    this.logRealmRoles('token-updated');
  }

  getToken(): string | null {
    return this.token();
  }

  /** Use after OAuth code exchange so token + signal stay in sync (SSR-safe). */
  setAccessToken(token: string) {
    this.setToken(token);
  }

  private logRealmRoles(source: 'token-restored' | 'token-updated') {
    try {
      const claims = this.currentUser();
      const realmRoles = claims?.realm_access?.roles ?? [];
      const username = claims?.preferred_username ?? 'unknown';
      console.info(`[AuthService] ${source}: user=${username}, realm_access.roles=`, realmRoles);
    } catch {
      console.warn(`[AuthService] ${source}: cannot decode token roles`);
    }
  }
}

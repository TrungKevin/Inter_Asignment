import { Injectable, NgZone, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { jwtDecode } from 'jwt-decode';
import { Subject } from 'rxjs';
import { ReportExportProgressEvent } from '../model/models';

type WebSocketNotificationEvent = {
  type?: string;
  message?: string;
  requestId?: number;
  status?: string;
  createdAt?: string;
  sender?: string;
};

@Injectable({
  providedIn: 'root'
})
export class WebSocketNotificationService {
  private snackBar = inject(MatSnackBar);
  private zone = inject(NgZone);

  /** Bắn khi có sự kiện workflow làm thay đổi hàng chờ Camunda — trang task có thể subscribe để reload. */
  private readonly camundaTasksRefresh = new Subject<void>();
  readonly camundaTasksRefresh$ = this.camundaTasksRefresh.asObservable();
  private readonly reportExportEvents = new Subject<ReportExportProgressEvent>();
  readonly reportExportEvents$ = this.reportExportEvents.asObservable();

  private readonly apiUrl = 'http://localhost:8080';
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private stompClient: Client | null = null;
  private running = false;
  private token: string | null = null;
  private reconnectAttempt = 0;

  start(token: string) {
    if (this.running && this.token === token) {
      return;
    }
    this.stop();
    this.token = token;
    this.running = true;
    this.connect();
  }

  stop() {
    this.running = false;
    this.token = null;
    this.reconnectAttempt = 0;
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.stompClient = null;
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private connect() {
    if (!this.running || !this.token) {
      return;
    }
    const token = this.token;
    const client = new Client({
      webSocketFactory: () =>
        new SockJS(`${this.apiUrl}/ws/notifications`, undefined, {
          // SockJS defaults to credentialed XHR; backend CORS cannot use '*' then.
          noCredentials: true
        } as SockJS.Options & { noCredentials?: boolean }),
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      debug: () => {},
      reconnectDelay: 0
    });

    client.onConnect = () => {
      this.reconnectAttempt = 0;
      client.subscribe('/user/queue/notifications', (frame) => this.handleStompFrame(frame));
      client.subscribe('/user/queue/report-jobs', (frame) => this.handleReportExportFrame(frame));
      if (this.isAdminToken(token)) {
        client.subscribe('/topic/admin-notifications', (frame) => this.handleStompFrame(frame));
      }
      console.info('[WS] STOMP connected');
    };

    client.onStompError = (frame) => {
      console.warn('[WS] STOMP broker error:', frame.headers['message'], frame.body);
    };

    client.onWebSocketClose = () => {
      if (this.running) {
        console.warn('[WS] socket closed, scheduling reconnect');
        this.scheduleReconnect();
      }
    };

    client.onWebSocketError = (event) => {
      console.warn('[WS] socket error', event);
    };

    this.stompClient = client;
    client.activate();
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    this.reconnectAttempt += 1;
    const delayMs = Math.min(3000 * 2 ** (this.reconnectAttempt - 1), 30000);
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, delayMs);
  }

  sendToAdmin(message: string, requestId?: number, type = 'USER_TO_ADMIN') {
    this.publish('/app/notifications/user-to-admin', {
      type,
      message,
      requestId
    });
  }

  sendToUser(targetUsername: string, message: string, requestId?: number, type = 'ADMIN_TO_USER') {
    this.publish('/app/notifications/admin-to-user', {
      type,
      message,
      requestId,
      targetUsername
    });
  }

  private publish(destination: string, body: Record<string, unknown>) {
    if (!this.stompClient || !this.stompClient.connected) {
      console.warn('[WS] publish skipped because STOMP is not connected');
      return;
    }
    this.stompClient.publish({
      destination,
      body: JSON.stringify(body)
    });
  }

  private handleStompFrame(frame: IMessage) {
    try {
      const payload = JSON.parse(frame.body) as WebSocketNotificationEvent;
      const message = payload.message || 'Ban co thong bao moi tu he thong.';
      if (this.shouldReloadCamundaTasks(payload)) {
        this.zone.run(() => this.camundaTasksRefresh.next());
      }
      this.zone.run(() => {
        this.snackBar.open(message, 'Dong', { duration: 5000 });
      });
    } catch {
      // Ignore malformed payloads and continue consuming stream.
    }
  }

  private handleReportExportFrame(frame: IMessage) {
    try {
      const payload = JSON.parse(frame.body) as {
        type?: string;
        status?: string;
        message?: string;
        jobId?: string;
        percent?: number;
        downloadUrl?: string;
      };
      if (!payload.jobId) {
        return;
      }
      const status = (payload.status as ReportExportProgressEvent['status']) ?? 'PROCESSING';
      const event: ReportExportProgressEvent = {
        jobId: payload.jobId,
        percent: payload.percent ?? 0,
        status,
        downloadUrl: payload.downloadUrl,
        message: payload.message
      };
      this.zone.run(() => this.reportExportEvents.next(event));
    } catch {
      // Ignore malformed payload and continue.
    }
  }

  /**
   * Backend: NEED_MORE_INFO, pushToUser sau delegate…
   * Frontend admin: emitRealtimeAction gửi user type ADMIN_* (ADMIN_NEED_INFO, …).
   */
  private shouldReloadCamundaTasks(payload: WebSocketNotificationEvent): boolean {
    const t = payload.type?.trim();
    if (!t) {
      return false;
    }
    if (t.startsWith('ADMIN_')) {
      return true;
    }
    const refreshTypes = new Set([
      'NEW_ACCESS_REQUEST',
      'USER_CLARIFIED',
      'USER_COUNTER_RESPONSE',
      'USER_ACCEPTED_COUNTER_PENDING_ADMIN',
      'NEED_MORE_INFO',
      'PENDING_APPROVAL',
      'COUNTER_PROPOSED',
      'REJECTED',
      'PROVISIONED',
      'PROVISION_FAILED'
    ]);
    return refreshTypes.has(t);
  }

  private isAdminToken(token: string): boolean {
    try {
      const claims = jwtDecode<{ realm_access?: { roles?: string[] } }>(token);
      const roles = claims.realm_access?.roles ?? [];
      return roles.some((role) => role.toLowerCase() === 'admin');
    } catch {
      return false;
    }
  }
}

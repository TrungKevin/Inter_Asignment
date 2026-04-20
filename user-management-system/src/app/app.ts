import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, PLATFORM_ID } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from '../nav/navbar';
import { AuthService } from '../auth/auth.service';
import { WebSocketNotificationService } from '../notifications/webSocket-notification.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private authService = inject(AuthService);
  private webSocketNotificationService = inject(WebSocketNotificationService);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }
      if (this.authService.isAuthenticated()) {
        const token = this.authService.getToken();
        if (token) {
          this.webSocketNotificationService.start(token);
          return;
        }
      }
      this.webSocketNotificationService.stop();
    });
  }
}

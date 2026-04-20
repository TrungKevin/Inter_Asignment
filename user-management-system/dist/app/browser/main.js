import {
  WebSocketNotificationService
} from "./chunk-WZGRLCQQ.js";
import "./chunk-RDVODPG7.js";
import {
  AuthService,
  BidiModule,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DOCUMENT,
  Directive,
  ElementRef,
  Input,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule,
  NgModule,
  Platform,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  ViewEncapsulation,
  __spreadValues,
  bootstrapApplication,
  catchError,
  effect,
  inject,
  provideBrowserGlobalErrorListeners,
  provideHttpClient,
  provideRouter,
  setClassMetadata,
  throwError,
  withInterceptors,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-S37H2F6X.js";

// src/polyfills.ts
var g = globalThis;
if (typeof g.global === "undefined") {
  g.global = globalThis;
}

// node_modules/@angular/material/fesm2022/toolbar.mjs
var _c0 = ["*", [["mat-toolbar-row"]]];
var _c1 = ["*", "mat-toolbar-row"];
var MatToolbarRow = class _MatToolbarRow {
  static \u0275fac = function MatToolbarRow_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatToolbarRow)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatToolbarRow,
    selectors: [["mat-toolbar-row"]],
    hostAttrs: [1, "mat-toolbar-row"],
    exportAs: ["matToolbarRow"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbarRow, [{
    type: Directive,
    args: [{
      selector: "mat-toolbar-row",
      exportAs: "matToolbarRow",
      host: {
        "class": "mat-toolbar-row"
      }
    }]
  }], null, null);
})();
var MatToolbar = class _MatToolbar {
  _elementRef = inject(ElementRef);
  _platform = inject(Platform);
  _document = inject(DOCUMENT);
  color;
  _toolbarRows;
  constructor() {
  }
  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      this._checkToolbarMixedModes();
      this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes());
    }
  }
  _checkToolbarMixedModes() {
    if (this._toolbarRows.length && (typeof ngDevMode === "undefined" || ngDevMode)) {
      const isCombinedUsage = Array.from(this._elementRef.nativeElement.childNodes).filter((node) => !(node.classList && node.classList.contains("mat-toolbar-row"))).filter((node) => node.nodeType !== (this._document ? this._document.COMMENT_NODE : 8)).some((node) => !!(node.textContent && node.textContent.trim()));
      if (isCombinedUsage) {
        throwToolbarMixedModesError();
      }
    }
  }
  static \u0275fac = function MatToolbar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatToolbar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatToolbar,
    selectors: [["mat-toolbar"]],
    contentQueries: function MatToolbar_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatToolbarRow, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._toolbarRows = _t);
      }
    },
    hostAttrs: [1, "mat-toolbar"],
    hostVars: 6,
    hostBindings: function MatToolbar_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classMap(ctx.color ? "mat-" + ctx.color : "");
        \u0275\u0275classProp("mat-toolbar-multiple-rows", ctx._toolbarRows.length > 0)("mat-toolbar-single-row", ctx._toolbarRows.length === 0);
      }
    },
    inputs: {
      color: "color"
    },
    exportAs: ["matToolbar"],
    ngContentSelectors: _c1,
    decls: 2,
    vars: 0,
    template: function MatToolbar_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c0);
        \u0275\u0275projection(0);
        \u0275\u0275projection(1, 1);
      }
    },
    styles: [".mat-toolbar {\n  background: var(--mat-toolbar-container-background-color, var(--mat-sys-surface));\n  color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));\n}\n.mat-toolbar, .mat-toolbar h1, .mat-toolbar h2, .mat-toolbar h3, .mat-toolbar h4, .mat-toolbar h5, .mat-toolbar h6 {\n  font-family: var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));\n  font-size: var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));\n  line-height: var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));\n  font-weight: var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));\n  letter-spacing: var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));\n  margin: 0;\n}\n@media (forced-colors: active) {\n  .mat-toolbar {\n    outline: solid 1px;\n  }\n}\n.mat-toolbar .mat-form-field-underline,\n.mat-toolbar .mat-form-field-ripple,\n.mat-toolbar .mat-focused .mat-form-field-ripple {\n  background-color: currentColor;\n}\n.mat-toolbar .mat-form-field-label,\n.mat-toolbar .mat-focused .mat-form-field-label,\n.mat-toolbar .mat-select-value,\n.mat-toolbar .mat-select-arrow,\n.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {\n  color: inherit;\n}\n.mat-toolbar .mat-input-element {\n  caret-color: currentColor;\n}\n.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed {\n  --mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));\n  --mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));\n}\n\n.mat-toolbar-row, .mat-toolbar-single-row {\n  display: flex;\n  box-sizing: border-box;\n  padding: 0 16px;\n  width: 100%;\n  flex-direction: row;\n  align-items: center;\n  white-space: nowrap;\n  height: var(--mat-toolbar-standard-height, 64px);\n}\n@media (max-width: 599px) {\n  .mat-toolbar-row, .mat-toolbar-single-row {\n    height: var(--mat-toolbar-mobile-height, 56px);\n  }\n}\n\n.mat-toolbar-multiple-rows {\n  display: flex;\n  box-sizing: border-box;\n  flex-direction: column;\n  width: 100%;\n  min-height: var(--mat-toolbar-standard-height, 64px);\n}\n@media (max-width: 599px) {\n  .mat-toolbar-multiple-rows {\n    min-height: var(--mat-toolbar-mobile-height, 56px);\n  }\n}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbar, [{
    type: Component,
    args: [{
      selector: "mat-toolbar",
      exportAs: "matToolbar",
      host: {
        "class": "mat-toolbar",
        "[class]": 'color ? "mat-" + color : ""',
        "[class.mat-toolbar-multiple-rows]": "_toolbarRows.length > 0",
        "[class.mat-toolbar-single-row]": "_toolbarRows.length === 0"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: '<ng-content></ng-content>\n<ng-content select="mat-toolbar-row"></ng-content>\n',
      styles: [".mat-toolbar {\n  background: var(--mat-toolbar-container-background-color, var(--mat-sys-surface));\n  color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));\n}\n.mat-toolbar, .mat-toolbar h1, .mat-toolbar h2, .mat-toolbar h3, .mat-toolbar h4, .mat-toolbar h5, .mat-toolbar h6 {\n  font-family: var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));\n  font-size: var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));\n  line-height: var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));\n  font-weight: var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));\n  letter-spacing: var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));\n  margin: 0;\n}\n@media (forced-colors: active) {\n  .mat-toolbar {\n    outline: solid 1px;\n  }\n}\n.mat-toolbar .mat-form-field-underline,\n.mat-toolbar .mat-form-field-ripple,\n.mat-toolbar .mat-focused .mat-form-field-ripple {\n  background-color: currentColor;\n}\n.mat-toolbar .mat-form-field-label,\n.mat-toolbar .mat-focused .mat-form-field-label,\n.mat-toolbar .mat-select-value,\n.mat-toolbar .mat-select-arrow,\n.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {\n  color: inherit;\n}\n.mat-toolbar .mat-input-element {\n  caret-color: currentColor;\n}\n.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed {\n  --mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));\n  --mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));\n}\n\n.mat-toolbar-row, .mat-toolbar-single-row {\n  display: flex;\n  box-sizing: border-box;\n  padding: 0 16px;\n  width: 100%;\n  flex-direction: row;\n  align-items: center;\n  white-space: nowrap;\n  height: var(--mat-toolbar-standard-height, 64px);\n}\n@media (max-width: 599px) {\n  .mat-toolbar-row, .mat-toolbar-single-row {\n    height: var(--mat-toolbar-mobile-height, 56px);\n  }\n}\n\n.mat-toolbar-multiple-rows {\n  display: flex;\n  box-sizing: border-box;\n  flex-direction: column;\n  width: 100%;\n  min-height: var(--mat-toolbar-standard-height, 64px);\n}\n@media (max-width: 599px) {\n  .mat-toolbar-multiple-rows {\n    min-height: var(--mat-toolbar-mobile-height, 56px);\n  }\n}\n"]
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    _toolbarRows: [{
      type: ContentChildren,
      args: [MatToolbarRow, {
        descendants: true
      }]
    }]
  });
})();
function throwToolbarMixedModesError() {
  throw Error("MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row.");
}
var MatToolbarModule = class _MatToolbarModule {
  static \u0275fac = function MatToolbarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatToolbarModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatToolbarModule,
    imports: [MatToolbar, MatToolbarRow],
    exports: [MatToolbar, MatToolbarRow, BidiModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbarModule, [{
    type: NgModule,
    args: [{
      imports: [MatToolbar, MatToolbarRow],
      exports: [MatToolbar, MatToolbarRow, BidiModule]
    }]
  }], null, null);
})();

// src/nav/navbar.ts
var _c02 = () => ["admin", "manager"];
function Navbar_Conditional_4_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 10)(1, "mat-icon", 6);
    \u0275\u0275text(2, "post_add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Tao yeu cau ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 11)(5, "mat-icon", 6);
    \u0275\u0275text(6, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Yeu cau cua toi ");
    \u0275\u0275elementEnd();
  }
}
function Navbar_Conditional_4_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 8)(1, "mat-icon", 6);
    \u0275\u0275text(2, "admin_panel_settings");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Admin ");
    \u0275\u0275elementEnd();
  }
}
function Navbar_Conditional_4_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 9)(1, "mat-icon", 6);
    \u0275\u0275text(2, "task_alt");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Task cho xu ly ");
    \u0275\u0275elementEnd();
  }
}
function Navbar_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 3)(1, "a", 5)(2, "mat-icon", 6);
    \u0275\u0275text(3, "home");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Home ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 7)(6, "mat-icon", 6);
    \u0275\u0275text(7, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Profile ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, Navbar_Conditional_4_Conditional_9_Template, 8, 0);
    \u0275\u0275conditionalCreate(10, Navbar_Conditional_4_Conditional_10_Template, 4, 0, "a", 8);
    \u0275\u0275conditionalCreate(11, Navbar_Conditional_4_Conditional_11_Template, 4, 0, "a", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275conditional(!ctx_r0.authService.isAdmin() ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.authService.isAdmin() ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.authService.hasAnyRole(\u0275\u0275pureFunction0(3, _c02)) ? 11 : -1);
  }
}
function Navbar_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 13);
    \u0275\u0275listener("click", function Navbar_Conditional_6_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.authService.logout());
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "logout");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Logout ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Hi, ", (tmp_1_0 = ctx_r0.authService.currentUser()) == null ? null : tmp_1_0.preferred_username, " ");
  }
}
function Navbar_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 14);
    \u0275\u0275text(1, "Login");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 15);
    \u0275\u0275text(3, "Register");
    \u0275\u0275elementEnd();
  }
}
var Navbar = class _Navbar {
  authService = inject(AuthService);
  static \u0275fac = function Navbar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Navbar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Navbar, selectors: [["app-navbar"]], decls: 8, vars: 2, consts: [["color", "primary", 1, "h-auto", "min-h-16", "flex-wrap", "gap-3", "px-3", "py-2", "sm:px-4", "sticky", "top-0", "z-50", "shadow-md"], [1, "flex", "min-w-0", "flex-1", "items-center", "gap-2", "sm:gap-4"], [1, "truncate", "text-lg", "font-bold", "tracking-tight", "sm:text-xl"], [1, "flex", "flex-wrap", "items-center", "gap-1", "sm:gap-2"], [1, "ml-auto", "flex", "flex-wrap", "items-center", "justify-end", "gap-2"], ["mat-button", "", "routerLink", "/home", "routerLinkActive", "bg-white/20", 1, "!min-w-0"], [1, "mr-1"], ["mat-button", "", "routerLink", "/profile", "routerLinkActive", "bg-white/20", 1, "!min-w-0"], ["mat-button", "", "routerLink", "/admin", "routerLinkActive", "bg-white/20", 1, "!min-w-0"], ["mat-button", "", "routerLink", "/camunda/tasks", "routerLinkActive", "bg-white/20", 1, "!min-w-0"], ["mat-button", "", "routerLink", "/access-requests/create", "routerLinkActive", "bg-white/20", 1, "!min-w-0"], ["mat-button", "", "routerLink", "/access-requests/mine", "routerLinkActive", "bg-white/20", 1, "!min-w-0"], [1, "mr-1", "hidden", "text-sm", "sm:inline"], ["mat-stroked-button", "", "color", "warn", 3, "click"], ["mat-stroked-button", "", "routerLink", "/login"], ["mat-raised-button", "", "color", "accent", "routerLink", "/register"]], template: function Navbar_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-toolbar", 0)(1, "div", 1)(2, "span", 2);
      \u0275\u0275text(3, "UserSystem");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(4, Navbar_Conditional_4_Template, 12, 4, "nav", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 4);
      \u0275\u0275conditionalCreate(6, Navbar_Conditional_6_Template, 6, 1)(7, Navbar_Conditional_7_Template, 4, 0);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.authService.isAuthenticated() ? 4 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.authService.isAuthenticated() ? 6 : 7);
    }
  }, dependencies: [RouterLink, RouterLinkActive, MatToolbarModule, MatToolbar, MatButtonModule, MatButton, MatIconModule, MatIcon], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=navbar.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Navbar, [{
    type: Component,
    args: [{ selector: "app-navbar", standalone: true, imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule], template: `<mat-toolbar
  color="primary"
  class="h-auto min-h-16 flex-wrap gap-3 px-3 py-2 sm:px-4 sticky top-0 z-50 shadow-md"
>
  <div class="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
    <span class="truncate text-lg font-bold tracking-tight sm:text-xl">UserSystem</span>
    @if (authService.isAuthenticated()) {
      <nav class="flex flex-wrap items-center gap-1 sm:gap-2">
        <a mat-button routerLink="/home" routerLinkActive="bg-white/20" class="!min-w-0">
          <mat-icon class="mr-1">home</mat-icon> Home
        </a>
        <a mat-button routerLink="/profile" routerLinkActive="bg-white/20" class="!min-w-0">
          <mat-icon class="mr-1">person</mat-icon> Profile
        </a>
        @if (!authService.isAdmin()) {
          <a mat-button routerLink="/access-requests/create" routerLinkActive="bg-white/20" class="!min-w-0">
            <mat-icon class="mr-1">post_add</mat-icon> Tao yeu cau
          </a>
          <a mat-button routerLink="/access-requests/mine" routerLinkActive="bg-white/20" class="!min-w-0">
            <mat-icon class="mr-1">receipt_long</mat-icon> Yeu cau cua toi
          </a>
        }
        @if (authService.isAdmin()) {
          <a mat-button routerLink="/admin" routerLinkActive="bg-white/20" class="!min-w-0">
            <mat-icon class="mr-1">admin_panel_settings</mat-icon> Admin
          </a>
        }
        @if (authService.hasAnyRole(['admin', 'manager'])) {
          <a mat-button routerLink="/camunda/tasks" routerLinkActive="bg-white/20" class="!min-w-0">
            <mat-icon class="mr-1">task_alt</mat-icon> Task cho xu ly
          </a>
        }
      </nav>
    }
  </div>

  <div class="ml-auto flex flex-wrap items-center justify-end gap-2">
    @if (authService.isAuthenticated()) {
      <span class="mr-1 hidden text-sm sm:inline">
        Hi, {{ authService.currentUser()?.preferred_username }}
      </span>
      <button mat-stroked-button color="warn" (click)="authService.logout()">
        <mat-icon>logout</mat-icon> Logout
      </button>
    } @else {
      <a mat-stroked-button routerLink="/login">Login</a>
      <a mat-raised-button color="accent" routerLink="/register">Register</a>
    }
  </div>
</mat-toolbar>
`, styles: ["/* src/nav/navbar.css */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=navbar.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Navbar, { className: "Navbar", filePath: "src/nav/navbar.ts", lineNumber: 15 });
})();

// src/app/app.ts
var App = class _App {
  authService = inject(AuthService);
  webSocketNotificationService = inject(WebSocketNotificationService);
  constructor() {
    effect(() => {
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
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 4, vars: 0, consts: [[1, "min-h-screen", "bg-slate-50"], [1, "mx-auto", "w-full", "max-w-7xl", "px-3", "py-4", "sm:px-4", "sm:py-6"]], template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar");
      \u0275\u0275elementStart(1, "main", 0)(2, "div", 1);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd()();
    }
  }, dependencies: [RouterOutlet, Navbar], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: "app-root", imports: [RouterOutlet, Navbar], template: '<app-navbar></app-navbar>\n<main class="min-h-screen bg-slate-50">\n  <div class="mx-auto w-full max-w-7xl px-3 py-4 sm:px-4 sm:py-6">\n    <router-outlet></router-outlet>\n  </div>\n</main>\n' }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 14 });
})();

// src/auth/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req).pipe(catchError((error) => {
    if (error.status === 401) {
      authService.logout();
    }
    return throwError(() => error);
  }));
};

// src/auth/auth.guard.ts
var authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    return true;
  }
  router.navigate(["/login"]);
  return false;
};
var adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAdmin()) {
    return true;
  }
  router.navigate(["/home"]);
  return false;
};
var adminOrUserGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.hasAnyRole(["admin", "user"])) {
    return true;
  }
  router.navigate(["/home"]);
  return false;
};

// src/app/app.routes.ts
var routes = [
  __spreadValues({
    path: "login",
    loadComponent: () => import("./chunk-RE3MZMMJ.js").then((m) => m.Login)
  }, false ? { \u0275entryName: "src/login/login.ts" } : {}),
  __spreadValues({
    path: "register",
    loadComponent: () => import("./chunk-4LJLNTXS.js").then((m) => m.Register)
  }, false ? { \u0275entryName: "src/register/register.ts" } : {}),
  // (removed) reset-password route
  __spreadValues({
    path: "home",
    loadComponent: () => import("./chunk-NFLEYFUG.js").then((m) => m.Home),
    canActivate: [authGuard]
  }, false ? { \u0275entryName: "src/home/home.ts" } : {}),
  __spreadValues({
    path: "profile",
    loadComponent: () => import("./chunk-KQBS3XUY.js").then((m) => m.Profile),
    canActivate: [authGuard]
  }, false ? { \u0275entryName: "src/profile/profile.ts" } : {}),
  __spreadValues({
    path: "admin",
    loadComponent: () => import("./chunk-H5BKDLZH.js").then((m) => m.AdminPanel),
    canActivate: [authGuard, adminGuard]
  }, false ? { \u0275entryName: "src/admin/admin-panel.ts" } : {}),
  __spreadValues({
    path: "access-requests/create",
    loadComponent: () => import("./chunk-S3JNVKZH.js").then((m) => m.CreateAccessRequest),
    canActivate: [authGuard]
  }, false ? { \u0275entryName: "src/access-request/create-request/create-request.ts" } : {}),
  __spreadValues({
    path: "access-requests/mine",
    loadComponent: () => import("./chunk-JJV654IJ.js").then((m) => m.MyAccessRequests),
    canActivate: [authGuard]
  }, false ? { \u0275entryName: "src/access-request/my-request/my-requests.ts" } : {}),
  __spreadValues({
    path: "camunda/tasks",
    loadComponent: () => import("./chunk-CGSRPGCY.js").then((m) => m.PendingAccessTasks),
    canActivate: [authGuard, adminOrUserGuard]
  }, false ? { \u0275entryName: "src/access-request/pending-task/pending-tasks.ts" } : {}),
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "home"
  }
];

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map

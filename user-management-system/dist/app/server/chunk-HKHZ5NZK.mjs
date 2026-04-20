import './polyfills.server.mjs';
import {
  MatCard,
  MatCardModule
} from "./chunk-P5PMDT6H.mjs";
import {
  AuthService,
  Component,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule,
  RouterLink,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpureFunction0,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-6QMG6ZEG.mjs";
import "./chunk-ML5XS5HX.mjs";

// src/home/home.ts
var _c0 = () => ["admin", "manager"];
function Home_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 22)(1, "mat-icon", 7);
    \u0275\u0275text(2, "post_add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Tao yeu cau ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 23)(5, "mat-icon", 7);
    \u0275\u0275text(6, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Yeu cau cua toi ");
    \u0275\u0275elementEnd();
  }
}
function Home_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 8)(1, "mat-icon", 7);
    \u0275\u0275text(2, "admin_panel_settings");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Admin Panel ");
    \u0275\u0275elementEnd();
  }
}
function Home_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 9)(1, "mat-icon", 7);
    \u0275\u0275text(2, "task_alt");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Task cho xu ly ");
    \u0275\u0275elementEnd();
  }
}
var Home = class _Home {
  authService = inject(AuthService);
  static \u0275fac = function Home_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Home)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Home, selectors: [["app-home"]], decls: 42, vars: 5, consts: [[1, "mx-auto", "max-w-5xl", "px-1", "py-2", "sm:px-2"], [1, "relative", "mb-8", "overflow-hidden", "rounded-3xl", "bg-gradient-to-r", "from-primary", "to-indigo-600", "p-6", "text-white", "shadow-2xl", "sm:mb-10", "sm:p-10"], [1, "relative", "z-10"], [1, "mb-3", "text-3xl", "font-extrabold", "tracking-tight", "sm:mb-4", "sm:text-4xl", "lg:text-5xl"], [1, "mb-6", "max-w-2xl", "text-base", "opacity-90", "sm:mb-8", "sm:text-lg", "lg:text-xl"], [1, "flex", "flex-col", "gap-3", "sm:flex-row", "sm:gap-4"], ["mat-raised-button", "", "color", "accent", "routerLink", "/profile", 1, "!m-0", "rounded-xl", "px-6", "py-3", "text-base", "sm:px-8", "sm:py-6", "sm:text-lg"], [1, "mr-2"], ["mat-stroked-button", "", "routerLink", "/admin", 1, "!m-0", "rounded-xl", "border-white", "px-6", "py-3", "text-base", "text-white", "hover:bg-white/10", "sm:px-8", "sm:py-6", "sm:text-lg"], ["mat-stroked-button", "", "routerLink", "/camunda/tasks", 1, "!m-0", "rounded-xl", "border-white", "px-6", "py-3", "text-base", "text-white", "hover:bg-white/10", "sm:px-8", "sm:py-6", "sm:text-lg"], [1, "absolute", "-right-20", "-top-20", "w-64", "h-64", "bg-white/10", "rounded-full", "blur-3xl"], [1, "absolute", "-left-20", "-bottom-20", "w-64", "h-64", "bg-accent/20", "rounded-full", "blur-3xl"], [1, "grid", "grid-cols-1", "gap-4", "sm:gap-6", "md:grid-cols-3"], [1, "p-6", "rounded-2xl", "border-none", "shadow-md", "hover:shadow-lg", "transition-shadow"], [1, "bg-blue-100", "p-3", "rounded-xl", "w-fit", "mb-4"], ["color", "primary"], [1, "text-lg", "font-bold", "mb-2"], [1, "text-slate-600", "text-sm"], [1, "bg-emerald-100", "p-3", "rounded-xl", "w-fit", "mb-4"], [1, "text-emerald-600"], [1, "bg-amber-100", "p-3", "rounded-xl", "w-fit", "mb-4"], [1, "text-amber-600"], ["mat-stroked-button", "", "routerLink", "/access-requests/create", 1, "!m-0", "rounded-xl", "px-6", "py-3", "text-base", "sm:px-8", "sm:py-6", "sm:text-lg"], ["mat-stroked-button", "", "routerLink", "/access-requests/mine", 1, "!m-0", "rounded-xl", "px-6", "py-3", "text-base", "sm:px-8", "sm:py-6", "sm:text-lg"]], template: function Home_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, " Welcome to your personalized dashboard. Manage your profile, explore features, and stay connected. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 5)(8, "a", 6)(9, "mat-icon", 7);
      \u0275\u0275text(10, "person");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, " View Profile ");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(12, Home_Conditional_12_Template, 8, 0);
      \u0275\u0275conditionalCreate(13, Home_Conditional_13_Template, 4, 0, "a", 8);
      \u0275\u0275conditionalCreate(14, Home_Conditional_14_Template, 4, 0, "a", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(15, "div", 10)(16, "div", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 12)(18, "mat-card", 13)(19, "div", 14)(20, "mat-icon", 15);
      \u0275\u0275text(21, "security");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "h3", 16);
      \u0275\u0275text(23, "Secure Access");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "p", 17);
      \u0275\u0275text(25, "Your data is protected with industry-standard encryption and Keycloak security.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "mat-card", 13)(27, "div", 18)(28, "mat-icon", 19);
      \u0275\u0275text(29, "speed");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "h3", 16);
      \u0275\u0275text(31, "Fast Performance");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "p", 17);
      \u0275\u0275text(33, "Experience lightning-fast interactions powered by Angular's latest features.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "mat-card", 13)(35, "div", 20)(36, "mat-icon", 21);
      \u0275\u0275text(37, "devices");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "h3", 16);
      \u0275\u0275text(39, "Responsive UI");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "p", 17);
      \u0275\u0275text(41, "Access your account seamlessly from any device, anywhere in the world.");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" Xin ch\xE0o, ", (tmp_0_0 = ctx.authService.currentUser()) == null ? null : tmp_0_0.preferred_username, "! ");
      \u0275\u0275advance(8);
      \u0275\u0275conditional(!ctx.authService.isAdmin() ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.authService.isAdmin() ? 13 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.authService.hasAnyRole(\u0275\u0275pureFunction0(4, _c0)) ? 14 : -1);
    }
  }, dependencies: [MatCardModule, MatCard, MatButtonModule, MatButton, MatIconModule, MatIcon, RouterLink], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=home.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Home, [{
    type: Component,
    args: [{ selector: "app-home", standalone: true, imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink], template: `<div class="mx-auto max-w-5xl px-1 py-2 sm:px-2">
  <div class="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-indigo-600 p-6 text-white shadow-2xl sm:mb-10 sm:p-10">
    <div class="relative z-10">
      <h1 class="mb-3 text-3xl font-extrabold tracking-tight sm:mb-4 sm:text-4xl lg:text-5xl">
        Xin ch\xE0o, {{ authService.currentUser()?.preferred_username }}!
      </h1>
      <p class="mb-6 max-w-2xl text-base opacity-90 sm:mb-8 sm:text-lg lg:text-xl">
        Welcome to your personalized dashboard. Manage your profile, explore features, and stay connected.
      </p>
      <div class="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <a mat-raised-button color="accent" routerLink="/profile" class="!m-0 rounded-xl px-6 py-3 text-base sm:px-8 sm:py-6 sm:text-lg">
          <mat-icon class="mr-2">person</mat-icon> View Profile
        </a>
        @if (!authService.isAdmin()) {
          <a mat-stroked-button routerLink="/access-requests/create" class="!m-0 rounded-xl px-6 py-3 text-base sm:px-8 sm:py-6 sm:text-lg">
            <mat-icon class="mr-2">post_add</mat-icon> Tao yeu cau
          </a>
          <a mat-stroked-button routerLink="/access-requests/mine" class="!m-0 rounded-xl px-6 py-3 text-base sm:px-8 sm:py-6 sm:text-lg">
            <mat-icon class="mr-2">receipt_long</mat-icon> Yeu cau cua toi
          </a>
        }
        @if (authService.isAdmin()) {
          <a
            mat-stroked-button
            class="!m-0 rounded-xl border-white px-6 py-3 text-base text-white hover:bg-white/10 sm:px-8 sm:py-6 sm:text-lg"
            routerLink="/admin"
          >
            <mat-icon class="mr-2">admin_panel_settings</mat-icon> Admin Panel
          </a>
        }
        @if (authService.hasAnyRole(['admin', 'manager'])) {
          <a mat-stroked-button class="!m-0 rounded-xl border-white px-6 py-3 text-base text-white hover:bg-white/10 sm:px-8 sm:py-6 sm:text-lg" routerLink="/camunda/tasks">
            <mat-icon class="mr-2">task_alt</mat-icon> Task cho xu ly
          </a>
        }
      </div>
    </div>
    
    <!-- Decorative elements -->
    <div class="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
    <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
  </div>

  <div class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
    <mat-card class="p-6 rounded-2xl border-none shadow-md hover:shadow-lg transition-shadow">
      <div class="bg-blue-100 p-3 rounded-xl w-fit mb-4">
        <mat-icon color="primary">security</mat-icon>
      </div>
      <h3 class="text-lg font-bold mb-2">Secure Access</h3>
      <p class="text-slate-600 text-sm">Your data is protected with industry-standard encryption and Keycloak security.</p>
    </mat-card>

    <mat-card class="p-6 rounded-2xl border-none shadow-md hover:shadow-lg transition-shadow">
      <div class="bg-emerald-100 p-3 rounded-xl w-fit mb-4">
        <mat-icon class="text-emerald-600">speed</mat-icon>
      </div>
      <h3 class="text-lg font-bold mb-2">Fast Performance</h3>
      <p class="text-slate-600 text-sm">Experience lightning-fast interactions powered by Angular's latest features.</p>
    </mat-card>

    <mat-card class="p-6 rounded-2xl border-none shadow-md hover:shadow-lg transition-shadow">
      <div class="bg-amber-100 p-3 rounded-xl w-fit mb-4">
        <mat-icon class="text-amber-600">devices</mat-icon>
      </div>
      <h3 class="text-lg font-bold mb-2">Responsive UI</h3>
      <p class="text-slate-600 text-sm">Access your account seamlessly from any device, anywhere in the world.</p>
    </mat-card>
  </div>
</div>
`, styles: ["/* src/home/home.css */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=home.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Home, { className: "Home", filePath: "src/home/home.ts", lineNumber: 15 });
})();
export {
  Home
};
//# sourceMappingURL=chunk-HKHZ5NZK.mjs.map

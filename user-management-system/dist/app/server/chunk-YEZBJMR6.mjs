import './polyfills.server.mjs';
import {
  MatFormFieldModule,
  MatInput,
  MatInputModule
} from "./chunk-I4RETCVM.mjs";
import {
  MatError,
  MatFormField,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "./chunk-WYKAF53W.mjs";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-YNQSOLVU.mjs";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-FHMMHGIL.mjs";
import {
  MatCard,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-P5PMDT6H.mjs";
import {
  ActivatedRoute,
  AuthService,
  Component,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  Router,
  RouterLink,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-6QMG6ZEG.mjs";
import "./chunk-ML5XS5HX.mjs";

// src/login/login.ts
function Login_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Username is required");
    \u0275\u0275elementEnd();
  }
}
function Login_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Password is required");
    \u0275\u0275elementEnd();
  }
}
function Login_Conditional_45_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Email is required");
    \u0275\u0275elementEnd();
  }
}
function Login_Conditional_45_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Invalid email format");
    \u0275\u0275elementEnd();
  }
}
function Login_Conditional_45_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Dang gui email... ");
  }
}
function Login_Conditional_45_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Gui email dat lai mat khau ");
  }
}
function Login_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "p", 29);
    \u0275\u0275text(2, " Nhap email da dang ky. He thong se gui huong dan dat lai mat khau. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 30);
    \u0275\u0275listener("ngSubmit", function Login_Conditional_45_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onForgotPasswordSubmit());
    });
    \u0275\u0275elementStart(4, "mat-form-field", 31)(5, "mat-label");
    \u0275\u0275text(6, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "input", 32);
    \u0275\u0275elementStart(8, "mat-icon", 20);
    \u0275\u0275text(9, "email");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, Login_Conditional_45_Conditional_10_Template, 2, 0, "mat-error")(11, Login_Conditional_45_Conditional_11_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 33);
    \u0275\u0275conditionalCreate(13, Login_Conditional_45_Conditional_13_Template, 1, 0)(14, Login_Conditional_45_Conditional_14_Template, 1, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx_r1.forgotPasswordForm);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(((tmp_2_0 = ctx_r1.forgotPasswordForm.get("email")) == null ? null : tmp_2_0.hasError("required")) ? 10 : ((tmp_2_0 = ctx_r1.forgotPasswordForm.get("email")) == null ? null : tmp_2_0.hasError("email")) ? 11 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.forgotPasswordForm.invalid || ctx_r1.forgotPasswordLoading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.forgotPasswordLoading() ? 13 : 14);
  }
}
function Login_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Logging in... ");
  }
}
function Login_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Sign In ");
  }
}
var Login = class _Login {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });
  forgotPasswordForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]]
  });
  hidePassword = signal(true, ...ngDevMode ? [{ debugName: "hidePassword" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  forgotPasswordLoading = signal(false, ...ngDevMode ? [{ debugName: "forgotPasswordLoading" }] : (
    /* istanbul ignore next */
    []
  ));
  showForgotPasswordForm = signal(false, ...ngDevMode ? [{ debugName: "showForgotPasswordForm" }] : (
    /* istanbul ignore next */
    []
  ));
  oauthLoading = signal(false, ...ngDevMode ? [{ debugName: "oauthLoading" }] : (
    /* istanbul ignore next */
    []
  ));
  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get("code");
    const error = this.route.snapshot.queryParamMap.get("error");
    if (error) {
      this.snackBar.open("Dang nhap Google that bai. Vui long thu lai.", "Dong", { duration: 5e3 });
      return;
    }
    if (code && typeof window !== "undefined") {
      const redirectUri = `${window.location.origin}/login`;
      this.oauthLoading.set(true);
      this.authService.exchangeKeycloakCode(code, redirectUri).subscribe({
        next: (res) => {
          this.oauthLoading.set(false);
          if (res.result?.access_token) {
            this.authService.setAccessToken(res.result.access_token);
            this.snackBar.open("Dang nhap Google thanh cong!", "Dong", { duration: 3e3 });
            this.router.navigate(["/home"]);
          } else {
            this.snackBar.open("Khong nhan duoc token. Vui long kiem tra backend exchange.", "Dong", { duration: 5e3 });
          }
        },
        error: (err) => {
          this.oauthLoading.set(false);
          const fallback = "Khong the dang nhap Google luc nay. Vui long thu lai sau.";
          const msg = typeof err === "object" && err !== null && "error" in err ? err.error?.message || fallback : fallback;
          this.snackBar.open(msg, "Dong", { duration: 5e3 });
        }
      });
    }
  }
  onForgotPassword() {
    this.showForgotPasswordForm.set(!this.showForgotPasswordForm());
  }
  onLoginWithGoogle() {
    this.authService.loginWithGoogle();
  }
  onForgotPasswordSubmit() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }
    const email = this.forgotPasswordForm.value.email;
    if (!email) {
      return;
    }
    this.forgotPasswordLoading.set(true);
    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.forgotPasswordLoading.set(false);
        this.showForgotPasswordForm.set(false);
        this.forgotPasswordForm.reset();
        this.snackBar.open("Neu email ton tai, he thong da gui huong dan dat lai mat khau.", "Dong", { duration: 5e3 });
      },
      error: (err) => {
        this.forgotPasswordLoading.set(false);
        const fallbackMessage = "Khong the xu ly yeu cau luc nay. Vui long thu lai sau.";
        const errorMessage = typeof err === "object" && err !== null && "error" in err ? err.error?.message || fallbackMessage : fallbackMessage;
        this.snackBar.open(errorMessage, "Dong", { duration: 5e3 });
      }
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: () => {
          this.snackBar.open("Login successful!", "Close", { duration: 3e3 });
          this.router.navigate(["/home"]);
        },
        error: (err) => {
          this.loading.set(false);
          this.snackBar.open(err.error?.message || "Login failed. Please check your credentials.", "Close", { duration: 5e3 });
        }
      });
    }
  }
  static \u0275fac = function Login_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Login)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Login, selectors: [["app-login"]], decls: 53, vars: 11, consts: [[1, "flex", "min-h-[calc(100vh-120px)]", "items-center", "justify-center", "p-2", "sm:p-4"], [1, "w-full", "max-w-md", "rounded-3xl", "border", "border-slate-200/80", "bg-white/95", "p-5", "shadow-2xl", "sm:p-8"], [1, "flex", "flex-col", "items-center", "mb-6"], [1, "bg-primary/10", "p-4", "rounded-full", "mb-4"], ["color", "primary", 1, "scale-150"], [1, "text-2xl", "font-bold", "text-slate-800"], [1, "text-slate-500"], [1, "flex", "flex-col", "gap-4", 3, "ngSubmit", "formGroup"], ["mat-stroked-button", "", "type", "button", 1, "w-full", "rounded-xl", "border", "border-slate-200", "bg-white", "py-3", "text-base", "font-semibold", "text-slate-700", "shadow-sm", "transition", "hover:bg-slate-50", "disabled:opacity-60", 3, "click", "disabled"], [1, "flex", "items-center", "justify-center", "gap-3"], ["width", "18", "height", "18", "viewBox", "0 0 48 48", "aria-hidden", "true"], ["fill", "#FFC107", "d", "M43.611 20.083H42V20H24v8h11.303C33.64 32.658 29.278 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.006 6.053 29.243 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"], ["fill", "#FF3D00", "d", "M6.306 14.691l6.571 4.819C14.655 16.108 19.001 12 24 12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.006 6.053 29.243 4 24 4c-7.682 0-14.35 4.339-17.694 10.691z"], ["fill", "#4CAF50", "d", "M24 44c5.164 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.257 0-9.605-3.314-11.29-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"], ["fill", "#1976D2", "d", "M43.611 20.083H42V20H24v8h11.303c-.803 2.27-2.36 4.198-4.407 5.565l.003-.002 6.19 5.238C36.651 39.24 44 34 44 24c0-1.341-.138-2.651-.389-3.917z"], [1, "flex", "items-center", "gap-3", "py-1"], [1, "h-px", "flex-1", "bg-slate-200"], [1, "text-xs", "font-medium", "text-slate-400"], ["appearance", "outline", "floatLabel", "always", 1, "w-full"], ["matInput", "", "formControlName", "username", "autocomplete", "username", "placeholder", "Enter your username"], ["matPrefix", "", 1, "mr-2", "text-slate-400"], ["matInput", "", "formControlName", "password", "autocomplete", "current-password", "placeholder", "Enter your password", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], [1, "-mt-1", "text-right"], ["type", "button", 1, "text-sm", "font-medium", "text-indigo-600", "transition", "hover:text-indigo-700", "hover:underline", 3, "click"], [1, "rounded-xl", "border", "border-indigo-100", "bg-indigo-50/60", "p-4"], ["mat-flat-button", "", "color", "primary", 1, "mt-4", "w-full", "rounded-xl", "!bg-indigo-600", "py-4", "text-base", "font-semibold", "!text-white", "shadow-md", "transition", "hover:!bg-indigo-700", "disabled:!bg-slate-300", "disabled:!text-slate-500", 3, "disabled"], [1, "text-center", "mt-6", "text-slate-600"], ["routerLink", "/register", 1, "text-primary", "font-semibold", "hover:underline"], [1, "mb-3", "text-sm", "text-slate-700"], [1, "space-y-3", 3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "w-full"], ["matInput", "", "formControlName", "email", "type", "email", "placeholder", "example@email.com"], ["mat-flat-button", "", "color", "primary", "type", "submit", 1, "w-full", "rounded-lg", "!bg-indigo-600", "py-3", "font-semibold", "!text-white", "hover:!bg-indigo-700", "disabled:!bg-slate-300", "disabled:!text-slate-500", 3, "disabled"]], template: function Login_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-card", 1)(2, "mat-card-header", 2)(3, "div", 3)(4, "mat-icon", 4);
      \u0275\u0275text(5, "lock");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "mat-card-title", 5);
      \u0275\u0275text(7, "Sign In");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "mat-card-subtitle", 6);
      \u0275\u0275text(9, "Welcome back! Please enter your details.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "form", 7);
      \u0275\u0275listener("ngSubmit", function Login_Template_form_ngSubmit_10_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(11, "button", 8);
      \u0275\u0275listener("click", function Login_Template_button_click_11_listener() {
        return ctx.onLoginWithGoogle();
      });
      \u0275\u0275elementStart(12, "span", 9);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(13, "svg", 10);
      \u0275\u0275element(14, "path", 11)(15, "path", 12)(16, "path", 13)(17, "path", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(18, "span");
      \u0275\u0275text(19, "\u0110\u0103ng nh\u1EADp v\u1EDBi Google");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "div", 15);
      \u0275\u0275element(21, "div", 16);
      \u0275\u0275elementStart(22, "span", 17);
      \u0275\u0275text(23, "HO\u1EB6C");
      \u0275\u0275elementEnd();
      \u0275\u0275element(24, "div", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "mat-form-field", 18)(26, "mat-label");
      \u0275\u0275text(27, "Username");
      \u0275\u0275elementEnd();
      \u0275\u0275element(28, "input", 19);
      \u0275\u0275elementStart(29, "mat-icon", 20);
      \u0275\u0275text(30, "person");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(31, Login_Conditional_31_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "mat-form-field", 18)(33, "mat-label");
      \u0275\u0275text(34, "Password");
      \u0275\u0275elementEnd();
      \u0275\u0275element(35, "input", 21);
      \u0275\u0275elementStart(36, "mat-icon", 20);
      \u0275\u0275text(37, "key");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "button", 22);
      \u0275\u0275listener("click", function Login_Template_button_click_38_listener() {
        return ctx.hidePassword.set(!ctx.hidePassword());
      });
      \u0275\u0275elementStart(39, "mat-icon");
      \u0275\u0275text(40);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(41, Login_Conditional_41_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "div", 23)(43, "button", 24);
      \u0275\u0275listener("click", function Login_Template_button_click_43_listener() {
        return ctx.onForgotPassword();
      });
      \u0275\u0275text(44, " Qu\xEAn m\u1EADt kh\u1EA9u? ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(45, Login_Conditional_45_Template, 15, 4, "div", 25);
      \u0275\u0275elementStart(46, "button", 26);
      \u0275\u0275conditionalCreate(47, Login_Conditional_47_Template, 1, 0)(48, Login_Conditional_48_Template, 1, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "div", 27);
      \u0275\u0275text(50, " Don't have an account? ");
      \u0275\u0275elementStart(51, "a", 28);
      \u0275\u0275text(52, "Register now");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_7_0;
      \u0275\u0275advance(10);
      \u0275\u0275property("formGroup", ctx.loginForm);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.oauthLoading());
      \u0275\u0275advance(20);
      \u0275\u0275conditional(((tmp_2_0 = ctx.loginForm.get("username")) == null ? null : tmp_2_0.hasError("required")) ? 31 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("type", ctx.hidePassword() ? "password" : "text");
      \u0275\u0275advance(3);
      \u0275\u0275attribute("aria-label", "Hide password")("aria-pressed", ctx.hidePassword());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.hidePassword() ? "visibility_off" : "visibility");
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_7_0 = ctx.loginForm.get("password")) == null ? null : tmp_7_0.hasError("required")) ? 41 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.showForgotPasswordForm() ? 45 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loginForm.invalid || ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 47 : 48);
    }
  }, dependencies: [
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    RouterLink,
    MatCardModule,
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatError,
    MatPrefix,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatSnackBarModule
  ], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=login.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Login, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [
      ReactiveFormsModule,
      RouterLink,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatSnackBarModule
    ], template: `<div class="flex min-h-[calc(100vh-120px)] items-center justify-center p-2 sm:p-4">
  <mat-card class="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-2xl sm:p-8">
    <mat-card-header class="flex flex-col items-center mb-6">
      <div class="bg-primary/10 p-4 rounded-full mb-4">
        <mat-icon color="primary" class="scale-150">lock</mat-icon>
      </div>
      <mat-card-title class="text-2xl font-bold text-slate-800">Sign In</mat-card-title>
      <mat-card-subtitle class="text-slate-500">Welcome back! Please enter your details.</mat-card-subtitle>
    </mat-card-header>
    
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
      <button
        mat-stroked-button
        type="button"
        class="w-full rounded-xl border border-slate-200 bg-white py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
        [disabled]="oauthLoading()"
        (click)="onLoginWithGoogle()"
      >
        <span class="flex items-center justify-center gap-3">
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.64 32.658 29.278 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.006 6.053 29.243 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/>
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 16.108 19.001 12 24 12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.006 6.053 29.243 4 24 4c-7.682 0-14.35 4.339-17.694 10.691z"/>
            <path fill="#4CAF50" d="M24 44c5.164 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.257 0-9.605-3.314-11.29-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.803 2.27-2.36 4.198-4.407 5.565l.003-.002 6.19 5.238C36.651 39.24 44 34 44 24c0-1.341-.138-2.651-.389-3.917z"/>
          </svg>
          <span>\u0110\u0103ng nh\u1EADp v\u1EDBi Google</span>
        </span>
      </button>

      <div class="flex items-center gap-3 py-1">
        <div class="h-px flex-1 bg-slate-200"></div>
        <span class="text-xs font-medium text-slate-400">HO\u1EB6C</span>
        <div class="h-px flex-1 bg-slate-200"></div>
      </div>

      <mat-form-field appearance="outline" floatLabel="always" class="w-full">
        <mat-label>Username</mat-label>
        <input
          matInput
          formControlName="username"
          autocomplete="username"
          placeholder="Enter your username"
        >
        <mat-icon matPrefix class="mr-2 text-slate-400">person</mat-icon>
        @if (loginForm.get('username')?.hasError('required')) {
          <mat-error>Username is required</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" floatLabel="always" class="w-full">
        <mat-label>Password</mat-label>
        <input
          matInput
          [type]="hidePassword() ? 'password' : 'text'"
          formControlName="password"
          autocomplete="current-password"
          placeholder="Enter your password"
        >
        <mat-icon matPrefix class="mr-2 text-slate-400">key</mat-icon>
        <button mat-icon-button matSuffix (click)="hidePassword.set(!hidePassword())" type="button" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hidePassword()">
          <mat-icon>{{hidePassword() ? 'visibility_off' : 'visibility'}}</mat-icon>
        </button>
        @if (loginForm.get('password')?.hasError('required')) {
          <mat-error>Password is required</mat-error>
        }
      </mat-form-field>

      <div class="-mt-1 text-right">
        <button
          type="button"
          (click)="onForgotPassword()"
          class="text-sm font-medium text-indigo-600 transition hover:text-indigo-700 hover:underline"
        >
          Qu\xEAn m\u1EADt kh\u1EA9u?
        </button>
      </div>

      @if (showForgotPasswordForm()) {
        <div class="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
          <p class="mb-3 text-sm text-slate-700">
            Nhap email da dang ky. He thong se gui huong dan dat lai mat khau.
          </p>
          <form [formGroup]="forgotPasswordForm" (ngSubmit)="onForgotPasswordSubmit()" class="space-y-3">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="example@email.com">
              <mat-icon matPrefix class="mr-2 text-slate-400">email</mat-icon>
              @if (forgotPasswordForm.get('email')?.hasError('required')) {
                <mat-error>Email is required</mat-error>
              } @else if (forgotPasswordForm.get('email')?.hasError('email')) {
                <mat-error>Invalid email format</mat-error>
              }
            </mat-form-field>

            <button
              mat-flat-button
              color="primary"
              type="submit"
              class="w-full rounded-lg !bg-indigo-600 py-3 font-semibold !text-white hover:!bg-indigo-700 disabled:!bg-slate-300 disabled:!text-slate-500"
              [disabled]="forgotPasswordForm.invalid || forgotPasswordLoading()"
            >
              @if (forgotPasswordLoading()) {
                Dang gui email...
              } @else {
                Gui email dat lai mat khau
              }
            </button>
          </form>
        </div>
      }

      <button
        mat-flat-button
        color="primary"
        class="mt-4 w-full rounded-xl !bg-indigo-600 py-4 text-base font-semibold !text-white shadow-md transition hover:!bg-indigo-700 disabled:!bg-slate-300 disabled:!text-slate-500"
        [disabled]="loginForm.invalid || loading()"
      >
        @if (loading()) {
          Logging in...
        } @else {
          Sign In
        }
      </button>
      
      <div class="text-center mt-6 text-slate-600">
        Don't have an account? 
        <a routerLink="/register" class="text-primary font-semibold hover:underline">Register now</a>
      </div>
    </form>
  </mat-card>
</div>
`, styles: ["/* src/login/login.css */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=login.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Login, { className: "Login", filePath: "src/login/login.ts", lineNumber: 28 });
})();
export {
  Login
};
//# sourceMappingURL=chunk-YEZBJMR6.mjs.map

import './polyfills.server.mjs';
import {
  MatChip,
  MatChipSet,
  MatChipsModule
} from "./chunk-O7IVYP36.mjs";
import "./chunk-WYKAF53W.mjs";
import "./chunk-YNQSOLVU.mjs";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-FHMMHGIL.mjs";
import {
  MatCard,
  MatCardModule
} from "./chunk-P5PMDT6H.mjs";
import {
  AuthService,
  BidiModule,
  ChangeDetectionStrategy,
  Component,
  Input,
  MatIcon,
  MatIconModule,
  NgModule,
  ViewEncapsulation,
  coerceBooleanProperty,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-6QMG6ZEG.mjs";
import "./chunk-ML5XS5HX.mjs";

// node_modules/@angular/material/fesm2022/divider.mjs
var MatDivider = class _MatDivider {
  get vertical() {
    return this._vertical;
  }
  set vertical(value) {
    this._vertical = coerceBooleanProperty(value);
  }
  _vertical = false;
  get inset() {
    return this._inset;
  }
  set inset(value) {
    this._inset = coerceBooleanProperty(value);
  }
  _inset = false;
  static \u0275fac = function MatDivider_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDivider)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatDivider,
    selectors: [["mat-divider"]],
    hostAttrs: ["role", "separator", 1, "mat-divider"],
    hostVars: 7,
    hostBindings: function MatDivider_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-orientation", ctx.vertical ? "vertical" : "horizontal");
        \u0275\u0275classProp("mat-divider-vertical", ctx.vertical)("mat-divider-horizontal", !ctx.vertical)("mat-divider-inset", ctx.inset);
      }
    },
    inputs: {
      vertical: "vertical",
      inset: "inset"
    },
    decls: 0,
    vars: 0,
    template: function MatDivider_Template(rf, ctx) {
    },
    styles: [".mat-divider {\n  display: block;\n  margin: 0;\n  border-top-style: solid;\n  border-top-color: var(--mat-divider-color, var(--mat-sys-outline-variant));\n  border-top-width: var(--mat-divider-width, 1px);\n}\n.mat-divider.mat-divider-vertical {\n  border-top: 0;\n  border-right-style: solid;\n  border-right-color: var(--mat-divider-color, var(--mat-sys-outline-variant));\n  border-right-width: var(--mat-divider-width, 1px);\n}\n.mat-divider.mat-divider-inset {\n  margin-left: 80px;\n}\n[dir=rtl] .mat-divider.mat-divider-inset {\n  margin-left: auto;\n  margin-right: 80px;\n}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDivider, [{
    type: Component,
    args: [{
      selector: "mat-divider",
      host: {
        "role": "separator",
        "[attr.aria-orientation]": 'vertical ? "vertical" : "horizontal"',
        "[class.mat-divider-vertical]": "vertical",
        "[class.mat-divider-horizontal]": "!vertical",
        "[class.mat-divider-inset]": "inset",
        "class": "mat-divider"
      },
      template: "",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [".mat-divider {\n  display: block;\n  margin: 0;\n  border-top-style: solid;\n  border-top-color: var(--mat-divider-color, var(--mat-sys-outline-variant));\n  border-top-width: var(--mat-divider-width, 1px);\n}\n.mat-divider.mat-divider-vertical {\n  border-top: 0;\n  border-right-style: solid;\n  border-right-color: var(--mat-divider-color, var(--mat-sys-outline-variant));\n  border-right-width: var(--mat-divider-width, 1px);\n}\n.mat-divider.mat-divider-inset {\n  margin-left: 80px;\n}\n[dir=rtl] .mat-divider.mat-divider-inset {\n  margin-left: auto;\n  margin-right: 80px;\n}\n"]
    }]
  }], null, {
    vertical: [{
      type: Input
    }],
    inset: [{
      type: Input
    }]
  });
})();
var MatDividerModule = class _MatDividerModule {
  static \u0275fac = function MatDividerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDividerModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatDividerModule,
    imports: [MatDivider],
    exports: [MatDivider, BidiModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDividerModule, [{
    type: NgModule,
    args: [{
      imports: [MatDivider],
      exports: [MatDivider, BidiModule]
    }]
  }], null, null);
})();

// src/profile/profile.ts
function Profile_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage(), " ");
  }
}
function Profile_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(role_r2);
  }
}
var Profile = class _Profile {
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  user = signal(null, ...ngDevMode ? [{ debugName: "user" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  errorMessage = signal("", ...ngDevMode ? [{ debugName: "errorMessage" }] : (
    /* istanbul ignore next */
    []
  ));
  ngOnInit() {
    const username = this.authService.currentUser()?.preferred_username;
    if (username) {
      this.loading.set(true);
      this.errorMessage.set("");
      this.authService.getUserProfile(username).subscribe({
        next: (res) => {
          this.user.set(res);
          this.loading.set(false);
          this.snackBar.open("Tai thong tin profile thanh cong.", "Dong", { duration: 2500 });
        },
        error: (err) => {
          const fallbackMessage = "Khong the tai thong tin profile. Vui long thu lai.";
          const message = typeof err === "object" && err !== null && "error" in err ? err.error?.message || fallbackMessage : fallbackMessage;
          this.errorMessage.set(message);
          this.loading.set(false);
          this.snackBar.open(message, "Dong", { duration: 5e3 });
        }
      });
    }
  }
  static \u0275fac = function Profile_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Profile)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Profile, selectors: [["app-profile"]], decls: 61, vars: 9, consts: [[1, "mx-auto", "max-w-4xl", "px-1", "py-2", "sm:px-2"], [1, "mb-4", "rounded-xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-700"], [1, "overflow-hidden", "rounded-3xl", "shadow-xl", "border-none"], [1, "h-32", "bg-gradient-to-r", "from-indigo-500", "to-purple-600"], [1, "relative", "-mt-12", "px-4", "pb-6", "sm:px-8", "sm:pb-8"], [1, "mb-6", "flex", "flex-col", "items-start", "gap-4", "sm:flex-row", "sm:items-end"], [1, "w-32", "h-32", "rounded-2xl", "bg-white", "p-1", "shadow-lg"], [1, "w-full", "h-full", "rounded-xl", "bg-slate-100", "flex", "items-center", "justify-center"], [1, "scale-[3]", "text-slate-300"], [1, "flex-1", "pb-2"], [1, "text-3xl", "font-bold", "text-slate-800", "leading-tight"], [1, "text-slate-500", "flex", "items-center", "gap-1"], [1, "text-sm", "w-4", "h-4"], [1, "pb-2"], [1, "bg-primary/10", "text-primary", "border-none"], [1, "mb-8"], [1, "grid", "grid-cols-1", "gap-6", "md:grid-cols-2", "md:gap-8"], [1, "text-sm", "font-semibold", "text-slate-400", "uppercase", "tracking-wider", "mb-4"], [1, "space-y-4"], [1, "flex", "flex-col"], [1, "text-xs", "text-slate-500"], [1, "font-mono", "text-sm", "text-slate-700"], [1, "text-slate-700"]], template: function Profile_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, Profile_Conditional_1_Template, 2, 1, "div", 1);
      \u0275\u0275elementStart(2, "mat-card", 2);
      \u0275\u0275element(3, "div", 3);
      \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "div", 7)(8, "mat-icon", 8);
      \u0275\u0275text(9, "person");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 9)(11, "h1", 10);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "p", 11)(14, "mat-icon", 12);
      \u0275\u0275text(15, "email");
      \u0275\u0275elementEnd();
      \u0275\u0275text(16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 13)(18, "mat-chip-set");
      \u0275\u0275repeaterCreate(19, Profile_For_20_Template, 2, 1, "mat-chip", 14, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(21, "mat-divider", 15);
      \u0275\u0275elementStart(22, "div", 16)(23, "div")(24, "h3", 17);
      \u0275\u0275text(25, "Account Details");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "div", 18)(27, "div", 19)(28, "span", 20);
      \u0275\u0275text(29, "User ID");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "span", 21);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 19)(33, "span", 20);
      \u0275\u0275text(34, "Username");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "span", 22);
      \u0275\u0275text(36);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "div", 19)(38, "span", 20);
      \u0275\u0275text(39, "Email Address");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "span", 22);
      \u0275\u0275text(41);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(42, "div")(43, "h3", 17);
      \u0275\u0275text(44, "Identity Info");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "div", 18)(46, "div", 19)(47, "span", 20);
      \u0275\u0275text(48, "Full Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "span", 22);
      \u0275\u0275text(50);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(51, "div", 19)(52, "span", 20);
      \u0275\u0275text(53, "Given Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "span", 22);
      \u0275\u0275text(55);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "div", 19)(57, "span", 20);
      \u0275\u0275text(58, "Family Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "span", 22);
      \u0275\u0275text(60);
      \u0275\u0275elementEnd()()()()()()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_7_0;
      let tmp_8_0;
      let tmp_9_0;
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 1 : -1);
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate1(" ", ((tmp_1_0 = ctx.user()) == null ? null : tmp_1_0.username) || ((tmp_1_0 = ctx.authService.currentUser()) == null ? null : tmp_1_0.preferred_username), " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ((tmp_2_0 = ctx.user()) == null ? null : tmp_2_0.email) || ((tmp_2_0 = ctx.authService.currentUser()) == null ? null : tmp_2_0.email), " ");
      \u0275\u0275advance(3);
      \u0275\u0275repeater((tmp_3_0 = ctx.authService.currentUser()) == null ? null : tmp_3_0.realm_access == null ? null : tmp_3_0.realm_access.roles);
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(((tmp_4_0 = ctx.user()) == null ? null : tmp_4_0.userId) || ((tmp_4_0 = ctx.authService.currentUser()) == null ? null : tmp_4_0.sub));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_5_0 = ctx.user()) == null ? null : tmp_5_0.username) || ((tmp_5_0 = ctx.authService.currentUser()) == null ? null : tmp_5_0.preferred_username));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_6_0 = ctx.user()) == null ? null : tmp_6_0.email) || ((tmp_6_0 = ctx.authService.currentUser()) == null ? null : tmp_6_0.email));
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(((tmp_7_0 = ctx.authService.currentUser()) == null ? null : tmp_7_0.name) || "N/A");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_8_0 = ctx.authService.currentUser()) == null ? null : tmp_8_0.given_name) || "N/A");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_9_0 = ctx.authService.currentUser()) == null ? null : tmp_9_0.family_name) || "N/A");
    }
  }, dependencies: [MatCardModule, MatCard, MatDividerModule, MatDivider, MatIconModule, MatIcon, MatChipsModule, MatChip, MatChipSet, MatSnackBarModule], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=profile.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Profile, [{
    type: Component,
    args: [{ selector: "app-profile", standalone: true, imports: [
      MatCardModule,
      MatDividerModule,
      MatIconModule,
      MatChipsModule,
      MatSnackBarModule
    ], template: `<div class="mx-auto max-w-4xl px-1 py-2 sm:px-2">
  @if (errorMessage()) {
    <div class="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {{ errorMessage() }}
    </div>
  }

  <mat-card class="overflow-hidden rounded-3xl shadow-xl border-none">
    <div class="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
    
    <div class="relative -mt-12 px-4 pb-6 sm:px-8 sm:pb-8">
      <div class="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-end">
        <div class="w-32 h-32 rounded-2xl bg-white p-1 shadow-lg">
          <div class="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center">
            <mat-icon class="scale-[3] text-slate-300">person</mat-icon>
          </div>
        </div>
        <div class="flex-1 pb-2">
          <h1 class="text-3xl font-bold text-slate-800 leading-tight">
            {{ user()?.username || authService.currentUser()?.preferred_username }}
          </h1>
          <p class="text-slate-500 flex items-center gap-1">
            <mat-icon class="text-sm w-4 h-4">email</mat-icon>
            {{ user()?.email || authService.currentUser()?.email }}
          </p>
        </div>
        <div class="pb-2">
          <mat-chip-set>
            @for (role of authService.currentUser()?.realm_access?.roles; track role) {
              <mat-chip class="bg-primary/10 text-primary border-none">{{ role }}</mat-chip>
            }
          </mat-chip-set>
        </div>
      </div>

      <mat-divider class="mb-8"></mat-divider>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <div>
          <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Account Details</h3>
          <div class="space-y-4">
            <div class="flex flex-col">
              <span class="text-xs text-slate-500">User ID</span>
              <span class="font-mono text-sm text-slate-700">{{ user()?.userId || authService.currentUser()?.sub }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-xs text-slate-500">Username</span>
              <span class="text-slate-700">{{ user()?.username || authService.currentUser()?.preferred_username }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-xs text-slate-500">Email Address</span>
              <span class="text-slate-700">{{ user()?.email || authService.currentUser()?.email }}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Identity Info</h3>
          <div class="space-y-4">
            <div class="flex flex-col">
              <span class="text-xs text-slate-500">Full Name</span>
              <span class="text-slate-700">{{ authService.currentUser()?.name || 'N/A' }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-xs text-slate-500">Given Name</span>
              <span class="text-slate-700">{{ authService.currentUser()?.given_name || 'N/A' }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-xs text-slate-500">Family Name</span>
              <span class="text-slate-700">{{ authService.currentUser()?.family_name || 'N/A' }}</span>
            </div>
          </div>
        </div>
      </div>
      
<!--      @if (authService.isAdmin()) {-->
<!--        <div class="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-4">-->
<!--          <div class="bg-amber-100 p-3 rounded-xl">-->
<!--            <mat-icon class="text-amber-600">admin_panel_settings</mat-icon>-->
<!--          </div>-->
<!--          <div>-->
<!--            <h4 class="font-bold text-amber-900">Administrator Privileges</h4>-->
<!--            <p class="text-amber-700 text-sm">You have full access to the user management system and system settings.</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      }-->
    </div>
  </mat-card>
</div>
`, styles: ["/* src/profile/profile.css */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=profile.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Profile, { className: "Profile", filePath: "src/profile/profile.ts", lineNumber: 23 });
})();
export {
  Profile
};
//# sourceMappingURL=chunk-UJAMQ7P2.mjs.map

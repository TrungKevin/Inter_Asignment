import './polyfills.server.mjs';
import {
  MatSelect,
  MatSelectModule
} from "./chunk-TVEII6L5.mjs";
import {
  MatOption
} from "./chunk-YMXW5W4M.mjs";
import {
  MatFormFieldModule,
  MatInput,
  MatInputModule
} from "./chunk-I4RETCVM.mjs";
import {
  MatChip,
  MatChipsModule
} from "./chunk-O7IVYP36.mjs";
import {
  MatFormField,
  MatLabel
} from "./chunk-WYKAF53W.mjs";
import "./chunk-VLFDYGMK.mjs";
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
  MatCardModule
} from "./chunk-P5PMDT6H.mjs";
import {
  AuthService,
  Component,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-6QMG6ZEG.mjs";
import "./chunk-ML5XS5HX.mjs";

// src/access-request/create-request/create-request.ts
function CreateAccessRequest_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const department_r1 = ctx.$implicit;
    \u0275\u0275property("value", department_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(department_r1);
  }
}
function CreateAccessRequest_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r2 = ctx.$implicit;
    \u0275\u0275property("value", role_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(role_r2);
  }
}
function CreateAccessRequest_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(role_r3);
  }
}
var CreateAccessRequest = class _CreateAccessRequest {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  departmentOptions = ["IT", "SALES", "HR", "FINANCE"];
  roleOptions = ["user", "admin"];
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  requestForm = this.fb.nonNullable.group({
    departmentCode: ["IT", [Validators.required]],
    reason: ["", [Validators.required, Validators.maxLength(1e3)]],
    roles: this.fb.nonNullable.control(["user"], [Validators.required])
  });
  onSubmit() {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }
    const username = this.authService.currentUser()?.preferred_username;
    if (!username) {
      this.snackBar.open("Khong xac dinh duoc user hien tai, vui long dang nhap lai.", "Dong", {
        duration: 4e3
      });
      return;
    }
    const formValue = this.requestForm.getRawValue();
    const payload = {
      requesterUsername: username,
      reason: formValue.reason.trim(),
      departmentCode: formValue.departmentCode,
      roles: formValue.roles,
      payload: {
        reason: formValue.reason.trim(),
        department: formValue.departmentCode,
        roles: formValue.roles
      }
    };
    this.loading.set(true);
    this.authService.createAccessRequest(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.snackBar.open("Tao yeu cau thanh cong.", "Dong", { duration: 3e3 });
        this.requestForm.patchValue({
          reason: "",
          roles: ["user"]
        });
      },
      error: (error) => {
        this.loading.set(false);
        const fallback = "Tao yeu cau that bai. Vui long thu lai.";
        const message = typeof error === "object" && error !== null && "error" in error ? error.error?.message || fallback : fallback;
        this.snackBar.open(message, "Dong", { duration: 5e3 });
      }
    });
  }
  static \u0275fac = function CreateAccessRequest_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CreateAccessRequest)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateAccessRequest, selectors: [["app-create-access-request"]], decls: 35, vars: 2, consts: [[1, "mx-auto", "max-w-4xl"], [1, "rounded-3xl", "border-none", "shadow-xl"], [1, "border-b", "border-slate-100", "px-5", "py-4", "sm:px-6"], [1, "text-2xl", "font-bold", "text-slate-800"], [1, "mt-1", "text-sm", "text-slate-500"], [1, "space-y-4", "p-5", "sm:p-6", 3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "w-full"], ["formControlName", "departmentCode"], [3, "value"], ["formControlName", "roles", "multiple", ""], [1, "rounded-xl", "border", "border-slate-200", "bg-slate-50", "px-3", "py-2"], [1, "text-xs", "font-semibold", "uppercase", "tracking-wide", "text-slate-500"], [1, "mt-2", "flex", "flex-wrap", "gap-2"], ["matInput", "", "rows", "4", "formControlName", "reason"], [1, "flex", "justify-end"], ["mat-flat-button", "", "color", "primary", "type", "submit", 3, "disabled"], [1, "mr-1"]], template: function CreateAccessRequest_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-card", 1)(2, "div", 2)(3, "h1", 3);
      \u0275\u0275text(4, "Tao yeu cau cap quyen");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Chon phong ban, quyen va ly do de gui phieu.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "form", 5);
      \u0275\u0275listener("ngSubmit", function CreateAccessRequest_Template_form_ngSubmit_7_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(8, "mat-form-field", 6)(9, "mat-label");
      \u0275\u0275text(10, "Phong ban");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "mat-select", 7);
      \u0275\u0275repeaterCreate(12, CreateAccessRequest_For_13_Template, 2, 2, "mat-option", 8, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "mat-form-field", 6)(15, "mat-label");
      \u0275\u0275text(16, "Danh sach quyen");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "mat-select", 9);
      \u0275\u0275repeaterCreate(18, CreateAccessRequest_For_19_Template, 2, 2, "mat-option", 8, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 10)(21, "p", 11);
      \u0275\u0275text(22, "Quyen da chon");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 12);
      \u0275\u0275repeaterCreate(24, CreateAccessRequest_For_25_Template, 2, 1, "mat-chip", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "mat-form-field", 6)(27, "mat-label");
      \u0275\u0275text(28, "Ly do");
      \u0275\u0275elementEnd();
      \u0275\u0275element(29, "textarea", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 14)(31, "button", 15)(32, "mat-icon", 16);
      \u0275\u0275text(33, "send");
      \u0275\u0275elementEnd();
      \u0275\u0275text(34, " Gui yeu cau ");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("formGroup", ctx.requestForm);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.departmentOptions);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.roleOptions);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.requestForm.getRawValue().roles);
      \u0275\u0275advance(7);
      \u0275\u0275property("disabled", ctx.loading());
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatButtonModule, MatButton, MatCardModule, MatCard, MatChipsModule, MatChip, MatFormFieldModule, MatFormField, MatLabel, MatIconModule, MatIcon, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatSnackBarModule], styles: ["\n.mat-mdc-form-field[_ngcontent-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=create-request.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateAccessRequest, [{
    type: Component,
    args: [{ selector: "app-create-access-request", standalone: true, imports: [
      ReactiveFormsModule,
      MatButtonModule,
      MatCardModule,
      MatChipsModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatSelectModule,
      MatSnackBarModule
    ], template: '<div class="mx-auto max-w-4xl">\r\n  <mat-card class="rounded-3xl border-none shadow-xl">\r\n    <div class="border-b border-slate-100 px-5 py-4 sm:px-6">\r\n      <h1 class="text-2xl font-bold text-slate-800">Tao yeu cau cap quyen</h1>\r\n      <p class="mt-1 text-sm text-slate-500">Chon phong ban, quyen va ly do de gui phieu.</p>\r\n    </div>\r\n\r\n    <form class="space-y-4 p-5 sm:p-6" [formGroup]="requestForm" (ngSubmit)="onSubmit()">\r\n      <mat-form-field appearance="outline" class="w-full">\r\n        <mat-label>Phong ban</mat-label>\r\n        <mat-select formControlName="departmentCode">\r\n          @for (department of departmentOptions; track department) {\r\n            <mat-option [value]="department">{{ department }}</mat-option>\r\n          }\r\n        </mat-select>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field appearance="outline" class="w-full">\r\n        <mat-label>Danh sach quyen</mat-label>\r\n        <mat-select formControlName="roles" multiple>\r\n          @for (role of roleOptions; track role) {\r\n            <mat-option [value]="role">{{ role }}</mat-option>\r\n          }\r\n        </mat-select>\r\n      </mat-form-field>\r\n\r\n      <div class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">\r\n        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Quyen da chon</p>\r\n        <div class="mt-2 flex flex-wrap gap-2">\r\n          @for (role of requestForm.getRawValue().roles; track role) {\r\n            <mat-chip>{{ role }}</mat-chip>\r\n          }\r\n        </div>\r\n      </div>\r\n\r\n      <mat-form-field appearance="outline" class="w-full">\r\n        <mat-label>Ly do</mat-label>\r\n        <textarea matInput rows="4" formControlName="reason"></textarea>\r\n      </mat-form-field>\r\n\r\n      <div class="flex justify-end">\r\n        <button mat-flat-button color="primary" type="submit" [disabled]="loading()">\r\n          <mat-icon class="mr-1">send</mat-icon>\r\n          Gui yeu cau\r\n        </button>\r\n      </div>\r\n    </form>\r\n  </mat-card>\r\n</div>\r\n', styles: ["/* src/access-request/create-request/create-request.css */\n.mat-mdc-form-field {\n  display: block;\n}\n/*# sourceMappingURL=create-request.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateAccessRequest, { className: "CreateAccessRequest", filePath: "src/access-request/create-request/create-request.ts", lineNumber: 31 });
})();
export {
  CreateAccessRequest
};
//# sourceMappingURL=chunk-4DZ3HNYX.mjs.map

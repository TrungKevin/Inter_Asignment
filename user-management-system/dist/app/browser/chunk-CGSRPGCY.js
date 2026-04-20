import {
  MatSelect,
  MatSelectModule
} from "./chunk-H52HRFOU.js";
import {
  MatOption
} from "./chunk-ZXGZLTPF.js";
import {
  takeUntilDestroyed
} from "./chunk-3CV6T2DV.js";
import {
  WebSocketNotificationService
} from "./chunk-WZGRLCQQ.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from "./chunk-R2BTQPMO.js";
import {
  MatFormFieldModule,
  MatInput,
  MatInputModule
} from "./chunk-4AY747T2.js";
import {
  MatFormField,
  MatLabel
} from "./chunk-BE6M4QSQ.js";
import "./chunk-HFODSLVQ.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  ɵNgNoValidate
} from "./chunk-QW2GHLSC.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-RDVODPG7.js";
import {
  MatCard,
  MatCardModule
} from "./chunk-LK7BO2ET.js";
import {
  AuthService,
  Component,
  DestroyRef,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-S37H2F6X.js";

// src/access-request/pending-task/pending-tasks.ts
function PendingAccessTasks_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r1 = ctx.$implicit;
    \u0275\u0275property("value", group_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(group_r1);
  }
}
function PendingAccessTasks_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1, "Dang tai task...");
    \u0275\u0275elementEnd();
  }
}
function PendingAccessTasks_Conditional_27_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Task ID");
    \u0275\u0275elementEnd();
  }
}
function PendingAccessTasks_Conditional_27_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(task_r2.taskId);
  }
}
function PendingAccessTasks_Conditional_27_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Name");
    \u0275\u0275elementEnd();
  }
}
function PendingAccessTasks_Conditional_27_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(task_r3.taskName);
  }
}
function PendingAccessTasks_Conditional_27_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Task type");
    \u0275\u0275elementEnd();
  }
}
function PendingAccessTasks_Conditional_27_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33)(1, "div", 34)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 35);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const task_r4 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r4.taskTypeLabel(task_r4));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r4.taskHint(task_r4));
  }
}
function PendingAccessTasks_Conditional_27_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Assignee");
    \u0275\u0275elementEnd();
  }
}
function PendingAccessTasks_Conditional_27_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(task_r6.assignee || "-");
  }
}
function PendingAccessTasks_Conditional_27_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Business key");
    \u0275\u0275elementEnd();
  }
}
function PendingAccessTasks_Conditional_27_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(task_r7.businessKey || "-");
  }
}
function PendingAccessTasks_Conditional_27_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Created");
    \u0275\u0275elementEnd();
  }
}
function PendingAccessTasks_Conditional_27_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r8 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.formatDate(task_r8.createdAt));
  }
}
function PendingAccessTasks_Conditional_27_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Message");
    \u0275\u0275elementEnd();
  }
}
function PendingAccessTasks_Conditional_27_td_22_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r9 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Cap nhat luc: ", ctx_r4.formatDate(ctx_r4.getMessageTime(task_r9)), " ");
  }
}
function PendingAccessTasks_Conditional_27_td_22_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 39);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, PendingAccessTasks_Conditional_27_td_22_Conditional_1_Conditional_3_Template, 2, 1, "div", 40);
    \u0275\u0275elementStart(4, "div", 41);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const task_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r4.messageLabel(task_r9));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r4.getMessageTime(task_r9) ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r4.getMessageText(task_r9));
  }
}
function PendingAccessTasks_Conditional_27_td_22_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function PendingAccessTasks_Conditional_27_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 36);
    \u0275\u0275conditionalCreate(1, PendingAccessTasks_Conditional_27_td_22_Conditional_1_Template, 6, 3, "div", 37)(2, PendingAccessTasks_Conditional_27_td_22_Conditional_2_Template, 2, 0, "span", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r9 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r4.hasMessage(task_r9) ? 1 : 2);
  }
}
function PendingAccessTasks_Conditional_27_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function PendingAccessTasks_Conditional_27_td_25_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45)(1, "button", 48);
    \u0275\u0275listener("click", function PendingAccessTasks_Conditional_27_td_25_Conditional_4_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r10);
      const task_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.runAdminAction(task_r11, "APPROVE"));
    });
    \u0275\u0275text(2, " Approve ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 49);
    \u0275\u0275listener("click", function PendingAccessTasks_Conditional_27_td_25_Conditional_4_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r10);
      const task_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.runAdminAction(task_r11, "REJECT"));
    });
    \u0275\u0275text(4, " Reject ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 50);
    \u0275\u0275listener("click", function PendingAccessTasks_Conditional_27_td_25_Conditional_4_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r10);
      const task_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.runAdminAction(task_r11, "NEED_INFO"));
    });
    \u0275\u0275text(6, " Need info ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 51);
    \u0275\u0275listener("click", function PendingAccessTasks_Conditional_27_td_25_Conditional_4_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r10);
      const task_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.runAdminAction(task_r11, "COUNTER_PROPOSAL"));
    });
    \u0275\u0275text(8, " Counter proposal ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const task_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r4.completingTaskId() === task_r11.taskId);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r4.completingTaskId() === task_r11.taskId);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r4.completingTaskId() === task_r11.taskId);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r4.completingTaskId() === task_r11.taskId);
  }
}
function PendingAccessTasks_Conditional_27_td_25_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function PendingAccessTasks_Conditional_27_td_25_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const task_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.submitClarification(task_r11));
    });
    \u0275\u0275text(1, " Submit clarification ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r4.completingTaskId() === task_r11.taskId);
  }
}
function PendingAccessTasks_Conditional_27_td_25_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45)(1, "button", 48);
    \u0275\u0275listener("click", function PendingAccessTasks_Conditional_27_td_25_Conditional_6_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r13);
      const task_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.respondCounter(task_r11, true));
    });
    \u0275\u0275text(2, " Accept counter ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 49);
    \u0275\u0275listener("click", function PendingAccessTasks_Conditional_27_td_25_Conditional_6_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r13);
      const task_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.respondCounter(task_r11, false));
    });
    \u0275\u0275text(4, " Decline counter ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const task_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r4.completingTaskId() === task_r11.taskId);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r4.completingTaskId() === task_r11.taskId);
  }
}
function PendingAccessTasks_Conditional_27_td_25_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 47);
    \u0275\u0275text(1, "Khong co hanh dong.");
    \u0275\u0275elementEnd();
  }
}
function PendingAccessTasks_Conditional_27_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 42)(1, "div", 43)(2, "span", 44);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(4, PendingAccessTasks_Conditional_27_td_25_Conditional_4_Template, 9, 4, "div", 45)(5, PendingAccessTasks_Conditional_27_td_25_Conditional_5_Template, 2, 1, "button", 46)(6, PendingAccessTasks_Conditional_27_td_25_Conditional_6_Template, 5, 2, "div", 45)(7, PendingAccessTasks_Conditional_27_td_25_Conditional_7_Template, 2, 0, "span", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r11 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r4.actionStateClass(task_r11));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.actionStateLabel(task_r11), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r4.isAdminApproveTask(task_r11) ? 4 : ctx_r4.isUserClarifyTask(task_r11) ? 5 : ctx_r4.isUserCounterTask(task_r11) ? 6 : 7);
  }
}
function PendingAccessTasks_Conditional_27_tr_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 52);
  }
}
function PendingAccessTasks_Conditional_27_tr_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 53);
  }
}
function PendingAccessTasks_Conditional_27_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1, "Khong co task nao phu hop bo loc.");
    \u0275\u0275elementEnd();
  }
}
function PendingAccessTasks_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "table", 17);
    \u0275\u0275elementContainerStart(2, 18);
    \u0275\u0275template(3, PendingAccessTasks_Conditional_27_th_3_Template, 2, 0, "th", 19)(4, PendingAccessTasks_Conditional_27_td_4_Template, 2, 1, "td", 20);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 21);
    \u0275\u0275template(6, PendingAccessTasks_Conditional_27_th_6_Template, 2, 0, "th", 19)(7, PendingAccessTasks_Conditional_27_td_7_Template, 2, 1, "td", 20);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 22);
    \u0275\u0275template(9, PendingAccessTasks_Conditional_27_th_9_Template, 2, 0, "th", 19)(10, PendingAccessTasks_Conditional_27_td_10_Template, 6, 2, "td", 20);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 23);
    \u0275\u0275template(12, PendingAccessTasks_Conditional_27_th_12_Template, 2, 0, "th", 19)(13, PendingAccessTasks_Conditional_27_td_13_Template, 2, 1, "td", 20);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 24);
    \u0275\u0275template(15, PendingAccessTasks_Conditional_27_th_15_Template, 2, 0, "th", 19)(16, PendingAccessTasks_Conditional_27_td_16_Template, 2, 1, "td", 20);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 25);
    \u0275\u0275template(18, PendingAccessTasks_Conditional_27_th_18_Template, 2, 0, "th", 19)(19, PendingAccessTasks_Conditional_27_td_19_Template, 2, 1, "td", 20);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(20, 26);
    \u0275\u0275template(21, PendingAccessTasks_Conditional_27_th_21_Template, 2, 0, "th", 19)(22, PendingAccessTasks_Conditional_27_td_22_Template, 3, 1, "td", 27);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(23, 28);
    \u0275\u0275template(24, PendingAccessTasks_Conditional_27_th_24_Template, 2, 0, "th", 19)(25, PendingAccessTasks_Conditional_27_td_25_Template, 8, 4, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(26, PendingAccessTasks_Conditional_27_tr_26_Template, 1, 0, "tr", 30)(27, PendingAccessTasks_Conditional_27_tr_27_Template, 1, 0, "tr", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(28, PendingAccessTasks_Conditional_27_Conditional_28_Template, 2, 0, "div", 15);
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r4.tasks());
    \u0275\u0275advance(25);
    \u0275\u0275property("matHeaderRowDef", ctx_r4.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r4.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r4.tasks().length === 0 ? 28 : -1);
  }
}
var PendingAccessTasks = class _PendingAccessTasks {
  adminTaskKeys = ["director_approve_task", "manager_approve_task"];
  userClarifyTaskKeys = ["user_clarify_task", "Activity_UserClarify"];
  userCounterTaskKeys = ["user_counter_response_task", "Activity_UserCounterResponse"];
  authService = inject(AuthService);
  webSocketNotificationService = inject(WebSocketNotificationService);
  snackBar = inject(MatSnackBar);
  fb = inject(FormBuilder);
  destroyRef = inject(DestroyRef);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  completingTaskId = signal(null, ...ngDevMode ? [{ debugName: "completingTaskId" }] : (
    /* istanbul ignore next */
    []
  ));
  tasks = signal([], ...ngDevMode ? [{ debugName: "tasks" }] : (
    /* istanbul ignore next */
    []
  ));
  displayedColumns = [
    "taskId",
    "name",
    "taskType",
    "assignee",
    "businessKey",
    "created",
    "message",
    "actions"
  ];
  candidateGroupOptions = ["admin", "user"];
  filterForm = this.fb.nonNullable.group({
    candidateGroup: [""],
    assignee: [""]
  });
  constructor() {
    const username = this.authService.currentUser()?.preferred_username || "";
    const isAdmin = this.authService.hasRole("admin");
    this.filterForm.patchValue({ assignee: isAdmin ? "" : username, candidateGroup: "" });
    this.loadTasks();
    this.webSocketNotificationService.camundaTasksRefresh$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.loadTasks();
      window.setTimeout(() => this.loadTasks(), 550);
    });
  }
  loadTasks() {
    const filters = this.filterForm.getRawValue();
    const assignee = filters.candidateGroup ? "" : filters.assignee;
    this.loading.set(true);
    this.authService.getPendingCamundaTasks(assignee, filters.candidateGroup).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.tasks.set(response.result || []);
      },
      error: (error) => {
        this.loading.set(false);
        const fallback = "Khong the tai danh sach task.";
        const message = typeof error === "object" && error !== null && "error" in error ? error.error?.message || fallback : fallback;
        this.snackBar.open(message, "Dong", { duration: 5e3 });
      }
    });
  }
  completeTask(task, payload) {
    this.completingTaskId.set(task.taskId);
    this.authService.completeCamundaTask(task.taskId, payload).subscribe({
      next: () => {
        this.completingTaskId.set(null);
        this.emitRealtimeAction(task, payload);
        this.snackBar.open("Complete task thanh cong.", "Dong", { duration: 2500 });
        this.loadTasks();
      },
      error: (error) => {
        this.completingTaskId.set(null);
        const fallback = "Complete task that bai.";
        const message = typeof error === "object" && error !== null && "error" in error ? error.error?.message || fallback : fallback;
        this.snackBar.open(message, "Dong", { duration: 5e3 });
      }
    });
  }
  runAdminAction(task, action) {
    const comment = this.askComment(action);
    if (comment === null) {
      return;
    }
    this.completeTask(task, { action, comment });
  }
  submitClarification(task) {
    const comment = this.askComment("CLARIFIED");
    if (comment === null) {
      return;
    }
    this.completeTask(task, { comment });
  }
  respondCounter(task, acceptCounter) {
    const action = acceptCounter ? "ACCEPT_COUNTER" : "DECLINE_COUNTER";
    const comment = this.askComment(action);
    if (comment === null) {
      return;
    }
    this.completeTask(task, { acceptCounter, comment });
  }
  isAdminApproveTask(task) {
    return this.adminTaskKeys.includes(task.taskDefinitionKey);
  }
  isUserClarifyTask(task) {
    return this.userClarifyTaskKeys.includes(task.taskDefinitionKey);
  }
  isUserCounterTask(task) {
    return this.userCounterTaskKeys.includes(task.taskDefinitionKey);
  }
  taskTypeLabel(task) {
    if (this.isAdminApproveTask(task)) {
      return "ADMIN_APPROVE";
    }
    if (this.isUserClarifyTask(task)) {
      return "USER_CLARIFY";
    }
    if (this.isUserCounterTask(task)) {
      return "USER_COUNTER_RESPONSE";
    }
    return task.taskDefinitionKey || "UNKNOWN";
  }
  taskHint(task) {
    if (this.isAdminApproveTask(task)) {
      return "Admin chon 1 trong 4 action: Approve, Reject, Need info, Counter proposal.";
    }
    if (this.isUserClarifyTask(task)) {
      return "User bo sung thong tin theo noi dung admin yeu cau.";
    }
    if (this.isUserCounterTask(task)) {
      return "User chap nhan hoac tu choi de xuat dieu chinh quyen cua admin.";
    }
    return "Task khong co mo ta tuong tac bo sung.";
  }
  actionStateLabel(task) {
    if (this.isAdminApproveTask(task)) {
      return "CHO ADMIN XU LY";
    }
    if (this.isUserClarifyTask(task) || this.isUserCounterTask(task)) {
      return "CHO USER CAP NHAT";
    }
    return "KHONG XAC DINH";
  }
  actionStateClass(task) {
    if (this.isAdminApproveTask(task)) {
      return "bg-indigo-100 text-indigo-700";
    }
    if (this.isUserClarifyTask(task) || this.isUserCounterTask(task)) {
      return "bg-amber-100 text-amber-700";
    }
    return "bg-slate-100 text-slate-600";
  }
  hasMessage(task) {
    return !!this.getMessageText(task);
  }
  messageLabel(task) {
    if (this.isAdminApproveTask(task) && task.userClarification?.trim()) {
      return "Thong tin user bo sung";
    }
    if (this.isAdminApproveTask(task) && task.userCounterComment?.trim()) {
      return "Phan hoi user ve de xuat";
    }
    if (this.isAdminApproveTask(task) && task.requestReason?.trim()) {
      return "Ly do user dang ky";
    }
    if (this.isUserClarifyTask(task) && task.adminComment?.trim()) {
      return "Yeu cau tu admin";
    }
    if (this.isUserCounterTask(task) && task.counterProposal?.trim()) {
      return "De xuat dieu chinh tu admin";
    }
    return "Message";
  }
  getMessageText(task) {
    if (this.isAdminApproveTask(task)) {
      const clarify = task.userClarification?.trim();
      if (clarify) {
        return clarify;
      }
      const counter = task.userCounterComment?.trim();
      if (counter) {
        return counter;
      }
      const initialReason = task.requestReason?.trim();
      if (initialReason) {
        return initialReason;
      }
      return "";
    }
    if (this.isUserClarifyTask(task)) {
      return task.adminComment?.trim() || "";
    }
    if (this.isUserCounterTask(task)) {
      return task.counterProposal?.trim() || "";
    }
    return "";
  }
  getMessageTime(task) {
    if (this.isAdminApproveTask(task)) {
      if (task.userClarification?.trim()) {
        return task.userClarificationAt || "";
      }
      if (task.userCounterComment?.trim()) {
        return task.userCounterCommentAt || "";
      }
    }
    return "";
  }
  askComment(action) {
    return window.prompt(`Nhap noi dung cho action ${action}:`) ?? null;
  }
  emitRealtimeAction(task, payload) {
    const requestId = this.parseRequestId(task.businessKey);
    if (this.isAdminApproveTask(task)) {
      const targetUsername = task.requesterUsername?.trim();
      if (!targetUsername) {
        return;
      }
      const action = payload.action || "UPDATE";
      const message = action === "APPROVE" ? "Admin da duyet yeu cau cua ban." : action === "REJECT" ? "Admin da tu choi yeu cau cua ban." : action === "NEED_INFO" ? "Admin yeu cau ban bo sung them thong tin." : "Admin da gui de xuat dieu chinh quyen.";
      this.webSocketNotificationService.sendToUser(targetUsername, message, requestId, `ADMIN_${action}`);
      return;
    }
    const who = task.assignee?.trim() || "user";
    const detail = payload.acceptCounter == null ? "da gui bo sung thong tin" : payload.acceptCounter ? "da chap nhan de xuat dieu chinh" : "da tu choi de xuat dieu chinh";
    this.webSocketNotificationService.sendToAdmin(`${who} ${detail}.`, requestId, payload.acceptCounter == null ? "USER_CLARIFIED" : "USER_COUNTER_RESPONSE");
  }
  parseRequestId(businessKey) {
    if (!businessKey) {
      return void 0;
    }
    const match = /^REQ-(\d+)$/.exec(businessKey.trim());
    if (!match) {
      return void 0;
    }
    const id = Number(match[1]);
    return Number.isFinite(id) ? id : void 0;
  }
  formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleString("vi-VN");
  }
  static \u0275fac = function PendingAccessTasks_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PendingAccessTasks)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PendingAccessTasks, selectors: [["app-pending-access-tasks"]], decls: 28, vars: 2, consts: [[1, "mx-auto", "max-w-7xl"], [1, "mb-4", "rounded-3xl", "border-none", "shadow-xl"], [1, "border-b", "border-slate-100", "px-5", "py-4", "sm:px-6"], [1, "text-2xl", "font-bold", "text-slate-800"], [1, "mt-1", "text-sm", "text-slate-500"], [1, "grid", "grid-cols-1", "gap-3", "p-5", "sm:grid-cols-3", "sm:p-6", 3, "formGroup"], ["appearance", "outline"], ["formControlName", "candidateGroup"], ["value", ""], [3, "value"], ["matInput", "", "formControlName", "assignee", "placeholder", "manager_it"], [1, "flex", "items-center", "justify-end", "gap-2"], ["mat-stroked-button", "", "type", "button", "color", "primary", 3, "click"], [1, "mr-1"], [1, "overflow-hidden", "rounded-3xl", "border-none", "shadow-xl"], [1, "px-6", "py-10", "text-center", "text-slate-500"], [1, "overflow-x-auto"], ["mat-table", "", 1, "min-w-[1280px]", "w-full", 3, "dataSource"], ["matColumnDef", "taskId"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["matColumnDef", "taskType"], ["matColumnDef", "assignee"], ["matColumnDef", "businessKey"], ["matColumnDef", "created"], ["matColumnDef", "message"], ["mat-cell", "", "class", "max-w-[360px] py-3 align-top", 4, "matCellDef"], ["matColumnDef", "actions"], ["mat-cell", "", "class", "min-w-[220px] py-3 align-top", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "flex", "flex-col", "gap-1"], [1, "text-xs", "text-slate-500"], ["mat-cell", "", 1, "max-w-[360px]", "py-3", "align-top"], [1, "rounded-lg", "border", "border-slate-200", "bg-slate-50", "p-2.5", "text-xs"], [1, "text-xs", "text-slate-400"], [1, "mb-1", "font-semibold", "text-slate-800"], [1, "mb-1", "text-[11px]", "text-slate-500"], [1, "whitespace-pre-wrap", "break-words", "text-slate-700"], ["mat-cell", "", 1, "min-w-[220px]", "py-3", "align-top"], [1, "mb-2"], [1, "inline-flex", "rounded-full", "px-2.5", "py-1", "text-xs", "font-semibold"], [1, "grid", "grid-cols-1", "gap-2"], ["mat-flat-button", "", "color", "primary", 1, "w-full", "!justify-center", 3, "disabled"], [1, "text-slate-500"], ["mat-flat-button", "", "color", "primary", 1, "w-full", "!justify-center", 3, "click", "disabled"], ["mat-stroked-button", "", "color", "warn", 1, "w-full", "!justify-center", 3, "click", "disabled"], ["mat-stroked-button", "", "color", "primary", 1, "w-full", "!justify-center", 3, "click", "disabled"], ["mat-stroked-button", "", "color", "accent", 1, "w-full", "!justify-center", 3, "click", "disabled"], ["mat-header-row", ""], ["mat-row", ""]], template: function PendingAccessTasks_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-card", 1)(2, "div", 2)(3, "h1", 3);
      \u0275\u0275text(4, "Task cho xu ly");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Danh sach task Camunda cho admin/user.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "form", 5)(8, "mat-form-field", 6)(9, "mat-label");
      \u0275\u0275text(10, "Candidate group");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "mat-select", 7)(12, "mat-option", 8);
      \u0275\u0275text(13, "Tat ca");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(14, PendingAccessTasks_For_15_Template, 2, 2, "mat-option", 9, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "mat-form-field", 6)(17, "mat-label");
      \u0275\u0275text(18, "Assignee");
      \u0275\u0275elementEnd();
      \u0275\u0275element(19, "input", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 11)(21, "button", 12);
      \u0275\u0275listener("click", function PendingAccessTasks_Template_button_click_21_listener() {
        return ctx.loadTasks();
      });
      \u0275\u0275elementStart(22, "mat-icon", 13);
      \u0275\u0275text(23, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(24, " Tai task ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(25, "mat-card", 14);
      \u0275\u0275conditionalCreate(26, PendingAccessTasks_Conditional_26_Template, 2, 0, "div", 15)(27, PendingAccessTasks_Conditional_27_Template, 29, 4);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("formGroup", ctx.filterForm);
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.candidateGroupOptions);
      \u0275\u0275advance(12);
      \u0275\u0275conditional(ctx.loading() ? 26 : 27);
    }
  }, dependencies: [
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    MatButtonModule,
    MatButton,
    MatCardModule,
    MatCard,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatIconModule,
    MatIcon,
    MatInputModule,
    MatInput,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatSnackBarModule,
    MatTableModule,
    MatTable,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow
  ], styles: ["\ntable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \ntable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n/*# sourceMappingURL=pending-tasks.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PendingAccessTasks, [{
    type: Component,
    args: [{ selector: "app-pending-access-tasks", standalone: true, imports: [
      ReactiveFormsModule,
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatSelectModule,
      MatSnackBarModule,
      MatTableModule
    ], template: `<div class="mx-auto max-w-7xl">\r
  <mat-card class="mb-4 rounded-3xl border-none shadow-xl">\r
    <div class="border-b border-slate-100 px-5 py-4 sm:px-6">\r
      <h1 class="text-2xl font-bold text-slate-800">Task cho xu ly</h1>\r
      <p class="mt-1 text-sm text-slate-500">Danh sach task Camunda cho admin/user.</p>\r
    </div>\r
\r
    <form class="grid grid-cols-1 gap-3 p-5 sm:grid-cols-3 sm:p-6" [formGroup]="filterForm">\r
      <mat-form-field appearance="outline">\r
        <mat-label>Candidate group</mat-label>\r
        <mat-select formControlName="candidateGroup">\r
          <mat-option value="">Tat ca</mat-option>\r
          @for (group of candidateGroupOptions; track group) {\r
            <mat-option [value]="group">{{ group }}</mat-option>\r
          }\r
        </mat-select>\r
      </mat-form-field>\r
\r
      <mat-form-field appearance="outline">\r
        <mat-label>Assignee</mat-label>\r
        <input matInput formControlName="assignee" placeholder="manager_it" />\r
      </mat-form-field>\r
\r
      <div class="flex items-center justify-end gap-2">\r
        <button mat-stroked-button type="button" color="primary" (click)="loadTasks()">\r
          <mat-icon class="mr-1">refresh</mat-icon>\r
          Tai task\r
        </button>\r
      </div>\r
    </form>\r
  </mat-card>\r
\r
  <mat-card class="overflow-hidden rounded-3xl border-none shadow-xl">\r
    @if (loading()) {\r
      <div class="px-6 py-10 text-center text-slate-500">Dang tai task...</div>\r
    } @else {\r
      <div class="overflow-x-auto">\r
        <table mat-table [dataSource]="tasks()" class="min-w-[1280px] w-full">\r
          <ng-container matColumnDef="taskId">\r
            <th mat-header-cell *matHeaderCellDef>Task ID</th>\r
            <td mat-cell *matCellDef="let task">{{ task.taskId }}</td>\r
          </ng-container>\r
\r
          <ng-container matColumnDef="name">\r
            <th mat-header-cell *matHeaderCellDef>Name</th>\r
            <td mat-cell *matCellDef="let task">{{ task.taskName }}</td>\r
          </ng-container>\r
\r
          <ng-container matColumnDef="taskType">\r
            <th mat-header-cell *matHeaderCellDef>Task type</th>\r
            <td mat-cell *matCellDef="let task">\r
              <div class="flex flex-col gap-1">\r
                <span>{{ taskTypeLabel(task) }}</span>\r
                <span class="text-xs text-slate-500">{{ taskHint(task) }}</span>\r
              </div>\r
            </td>\r
          </ng-container>\r
\r
          <ng-container matColumnDef="assignee">\r
            <th mat-header-cell *matHeaderCellDef>Assignee</th>\r
            <td mat-cell *matCellDef="let task">{{ task.assignee || '-' }}</td>\r
          </ng-container>\r
\r
          <ng-container matColumnDef="businessKey">\r
            <th mat-header-cell *matHeaderCellDef>Business key</th>\r
            <td mat-cell *matCellDef="let task">{{ task.businessKey || '-' }}</td>\r
          </ng-container>\r
\r
          <ng-container matColumnDef="created">\r
            <th mat-header-cell *matHeaderCellDef>Created</th>\r
            <td mat-cell *matCellDef="let task">{{ formatDate(task.createdAt) }}</td>\r
          </ng-container>\r
\r
          <ng-container matColumnDef="message">\r
            <th mat-header-cell *matHeaderCellDef>Message</th>\r
            <td mat-cell *matCellDef="let task" class="max-w-[360px] py-3 align-top">\r
              @if (hasMessage(task)) {\r
                <div class="rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs">\r
                  <div class="mb-1 font-semibold text-slate-800">{{ messageLabel(task) }}</div>\r
                  @if (getMessageTime(task)) {\r
                    <div class="mb-1 text-[11px] text-slate-500">\r
                      Cap nhat luc: {{ formatDate(getMessageTime(task)) }}\r
                    </div>\r
                  }\r
                  <div class="whitespace-pre-wrap break-words text-slate-700">{{ getMessageText(task) }}</div>\r
                </div>\r
              } @else {\r
                <span class="text-xs text-slate-400">-</span>\r
              }\r
            </td>\r
          </ng-container>\r
\r
          <ng-container matColumnDef="actions">\r
            <th mat-header-cell *matHeaderCellDef>Actions</th>\r
            <td mat-cell *matCellDef="let task" class="min-w-[220px] py-3 align-top">\r
              <div class="mb-2">\r
                <span\r
                  class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"\r
                  [class]="actionStateClass(task)"\r
                >\r
                  {{ actionStateLabel(task) }}\r
                </span>\r
              </div>\r
              @if (isAdminApproveTask(task)) {\r
                <div class="grid grid-cols-1 gap-2">\r
                  <button\r
                    mat-flat-button\r
                    color="primary"\r
                    class="w-full !justify-center"\r
                    [disabled]="completingTaskId() === task.taskId"\r
                    (click)="runAdminAction(task, 'APPROVE')"\r
                  >\r
                    Approve\r
                  </button>\r
                  <button\r
                    mat-stroked-button\r
                    color="warn"\r
                    class="w-full !justify-center"\r
                    [disabled]="completingTaskId() === task.taskId"\r
                    (click)="runAdminAction(task, 'REJECT')"\r
                  >\r
                    Reject\r
                  </button>\r
                  <button\r
                    mat-stroked-button\r
                    color="primary"\r
                    class="w-full !justify-center"\r
                    [disabled]="completingTaskId() === task.taskId"\r
                    (click)="runAdminAction(task, 'NEED_INFO')"\r
                  >\r
                    Need info\r
                  </button>\r
                  <button\r
                    mat-stroked-button\r
                    color="accent"\r
                    class="w-full !justify-center"\r
                    [disabled]="completingTaskId() === task.taskId"\r
                    (click)="runAdminAction(task, 'COUNTER_PROPOSAL')"\r
                  >\r
                    Counter proposal\r
                  </button>\r
                </div>\r
              } @else if (isUserClarifyTask(task)) {\r
                <button\r
                  mat-flat-button\r
                  color="primary"\r
                  class="w-full !justify-center"\r
                  [disabled]="completingTaskId() === task.taskId"\r
                  (click)="submitClarification(task)"\r
                >\r
                  Submit clarification\r
                </button>\r
              } @else if (isUserCounterTask(task)) {\r
                <div class="grid grid-cols-1 gap-2">\r
                  <button\r
                    mat-flat-button\r
                    color="primary"\r
                    class="w-full !justify-center"\r
                    [disabled]="completingTaskId() === task.taskId"\r
                    (click)="respondCounter(task, true)"\r
                  >\r
                    Accept counter\r
                  </button>\r
                  <button\r
                    mat-stroked-button\r
                    color="warn"\r
                    class="w-full !justify-center"\r
                    [disabled]="completingTaskId() === task.taskId"\r
                    (click)="respondCounter(task, false)"\r
                  >\r
                    Decline counter\r
                  </button>\r
                </div>\r
              } @else {\r
                <span class="text-slate-500">Khong co hanh dong.</span>\r
              }\r
            </td>\r
          </ng-container>\r
\r
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>\r
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>\r
        </table>\r
      </div>\r
      @if (tasks().length === 0) {\r
        <div class="px-6 py-10 text-center text-slate-500">Khong co task nao phu hop bo loc.</div>\r
      }\r
    }\r
  </mat-card>\r
</div>\r
`, styles: ["/* src/access-request/pending-task/pending-tasks.css */\ntable th,\ntable td {\n  white-space: nowrap;\n}\n/*# sourceMappingURL=pending-tasks.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PendingAccessTasks, { className: "PendingAccessTasks", filePath: "src/access-request/pending-task/pending-tasks.ts", lineNumber: 33 });
})();
export {
  PendingAccessTasks
};
//# sourceMappingURL=chunk-CGSRPGCY.js.map

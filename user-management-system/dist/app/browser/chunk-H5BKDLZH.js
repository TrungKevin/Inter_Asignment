import {
  _MatInternalFormField
} from "./chunk-2W46CUNI.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
  MatTooltipModule
} from "./chunk-SXDFAGXD.js";
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
  MatTooltip
} from "./chunk-WTLH6CNG.js";
import "./chunk-HFODSLVQ.js";
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
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
  BidiModule,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostAttributeToken,
  InjectionToken,
  Input,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatRipple,
  NgModule,
  NgZone,
  Output,
  ViewChild,
  ViewEncapsulation,
  _CdkPrivateStyleLoader,
  _IdGenerator,
  _StructuralStylesLoader,
  __spreadProps,
  __spreadValues,
  _animationsDisabled,
  booleanAttribute,
  forwardRef,
  inject,
  numberAttribute,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-S37H2F6X.js";

// node_modules/@angular/material/fesm2022/checkbox.mjs
var _c0 = ["input"];
var _c1 = ["label"];
var _c2 = ["*"];
var checkboxDefaults = {
  color: "accent",
  clickAction: "check-indeterminate",
  disabledInteractive: false
};
var MAT_CHECKBOX_DEFAULT_OPTIONS = new InjectionToken("mat-checkbox-default-options", {
  providedIn: "root",
  factory: () => checkboxDefaults
});
var TransitionCheckState;
(function(TransitionCheckState2) {
  TransitionCheckState2[TransitionCheckState2["Init"] = 0] = "Init";
  TransitionCheckState2[TransitionCheckState2["Checked"] = 1] = "Checked";
  TransitionCheckState2[TransitionCheckState2["Unchecked"] = 2] = "Unchecked";
  TransitionCheckState2[TransitionCheckState2["Indeterminate"] = 3] = "Indeterminate";
})(TransitionCheckState || (TransitionCheckState = {}));
var MatCheckboxChange = class {
  source;
  checked;
};
var MatCheckbox = class _MatCheckbox {
  _elementRef = inject(ElementRef);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _ngZone = inject(NgZone);
  _animationsDisabled = _animationsDisabled();
  _options = inject(MAT_CHECKBOX_DEFAULT_OPTIONS, {
    optional: true
  });
  focus() {
    this._inputElement.nativeElement.focus();
  }
  _createChangeEvent(isChecked) {
    const event = new MatCheckboxChange();
    event.source = this;
    event.checked = isChecked;
    return event;
  }
  _getAnimationTargetElement() {
    return this._inputElement?.nativeElement;
  }
  _animationClasses = {
    uncheckedToChecked: "mdc-checkbox--anim-unchecked-checked",
    uncheckedToIndeterminate: "mdc-checkbox--anim-unchecked-indeterminate",
    checkedToUnchecked: "mdc-checkbox--anim-checked-unchecked",
    checkedToIndeterminate: "mdc-checkbox--anim-checked-indeterminate",
    indeterminateToChecked: "mdc-checkbox--anim-indeterminate-checked",
    indeterminateToUnchecked: "mdc-checkbox--anim-indeterminate-unchecked"
  };
  ariaLabel = "";
  ariaLabelledby = null;
  ariaDescribedby;
  ariaExpanded;
  ariaControls;
  ariaOwns;
  _uniqueId;
  id;
  get inputId() {
    return `${this.id || this._uniqueId}-input`;
  }
  required = false;
  labelPosition = "after";
  name = null;
  change = new EventEmitter();
  indeterminateChange = new EventEmitter();
  value;
  disableRipple = false;
  _inputElement;
  _labelElement;
  tabIndex;
  color;
  disabledInteractive;
  _onTouched = () => {
  };
  _currentAnimationClass = "";
  _currentCheckState = TransitionCheckState.Init;
  _controlValueAccessorChangeFn = () => {
  };
  _validatorChangeFn = () => {
  };
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
    const tabIndex = inject(new HostAttributeToken("tabindex"), {
      optional: true
    });
    this._options = this._options || checkboxDefaults;
    this.color = this._options.color || checkboxDefaults.color;
    this.tabIndex = tabIndex == null ? 0 : parseInt(tabIndex) || 0;
    this.id = this._uniqueId = inject(_IdGenerator).getId("mat-mdc-checkbox-");
    this.disabledInteractive = this._options?.disabledInteractive ?? false;
  }
  ngOnChanges(changes) {
    if (changes["required"]) {
      this._validatorChangeFn();
    }
  }
  ngAfterViewInit() {
    this._syncIndeterminate(this.indeterminate);
  }
  get checked() {
    return this._checked;
  }
  set checked(value) {
    if (value != this.checked) {
      this._checked = value;
      this._changeDetectorRef.markForCheck();
    }
  }
  _checked = false;
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    if (value !== this.disabled) {
      this._disabled = value;
      this._changeDetectorRef.markForCheck();
    }
  }
  _disabled = false;
  get indeterminate() {
    return this._indeterminate();
  }
  set indeterminate(value) {
    const changed = value != this._indeterminate();
    this._indeterminate.set(value);
    if (changed) {
      if (value) {
        this._transitionCheckState(TransitionCheckState.Indeterminate);
      } else {
        this._transitionCheckState(this.checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
      }
      this.indeterminateChange.emit(value);
    }
    this._syncIndeterminate(value);
  }
  _indeterminate = signal(false, ...ngDevMode ? [{
    debugName: "_indeterminate"
  }] : []);
  _isRippleDisabled() {
    return this.disableRipple || this.disabled;
  }
  _onLabelTextChange() {
    this._changeDetectorRef.detectChanges();
  }
  writeValue(value) {
    this.checked = !!value;
  }
  registerOnChange(fn) {
    this._controlValueAccessorChangeFn = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  validate(control) {
    return this.required && control.value !== true ? {
      "required": true
    } : null;
  }
  registerOnValidatorChange(fn) {
    this._validatorChangeFn = fn;
  }
  _transitionCheckState(newState) {
    let oldState = this._currentCheckState;
    let element = this._getAnimationTargetElement();
    if (oldState === newState || !element) {
      return;
    }
    if (this._currentAnimationClass) {
      element.classList.remove(this._currentAnimationClass);
    }
    this._currentAnimationClass = this._getAnimationClassForCheckStateTransition(oldState, newState);
    this._currentCheckState = newState;
    if (this._currentAnimationClass.length > 0) {
      element.classList.add(this._currentAnimationClass);
      const animationClass = this._currentAnimationClass;
      this._ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          element.classList.remove(animationClass);
        }, 1e3);
      });
    }
  }
  _emitChangeEvent() {
    this._controlValueAccessorChangeFn(this.checked);
    this.change.emit(this._createChangeEvent(this.checked));
    if (this._inputElement) {
      this._inputElement.nativeElement.checked = this.checked;
    }
  }
  toggle() {
    this.checked = !this.checked;
    this._controlValueAccessorChangeFn(this.checked);
  }
  _handleInputClick() {
    const clickAction = this._options?.clickAction;
    if (!this.disabled && clickAction !== "noop") {
      if (this.indeterminate && clickAction !== "check") {
        Promise.resolve().then(() => {
          this._indeterminate.set(false);
          this.indeterminateChange.emit(false);
        });
      }
      this._checked = !this._checked;
      this._transitionCheckState(this._checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
      this._emitChangeEvent();
    } else if (this.disabled && this.disabledInteractive || !this.disabled && clickAction === "noop") {
      this._inputElement.nativeElement.checked = this.checked;
      this._inputElement.nativeElement.indeterminate = this.indeterminate;
    }
  }
  _onInteractionEvent(event) {
    event.stopPropagation();
  }
  _onBlur() {
    Promise.resolve().then(() => {
      this._onTouched();
      this._changeDetectorRef.markForCheck();
    });
  }
  _getAnimationClassForCheckStateTransition(oldState, newState) {
    if (this._animationsDisabled) {
      return "";
    }
    switch (oldState) {
      case TransitionCheckState.Init:
        if (newState === TransitionCheckState.Checked) {
          return this._animationClasses.uncheckedToChecked;
        } else if (newState == TransitionCheckState.Indeterminate) {
          return this._checked ? this._animationClasses.checkedToIndeterminate : this._animationClasses.uncheckedToIndeterminate;
        }
        break;
      case TransitionCheckState.Unchecked:
        return newState === TransitionCheckState.Checked ? this._animationClasses.uncheckedToChecked : this._animationClasses.uncheckedToIndeterminate;
      case TransitionCheckState.Checked:
        return newState === TransitionCheckState.Unchecked ? this._animationClasses.checkedToUnchecked : this._animationClasses.checkedToIndeterminate;
      case TransitionCheckState.Indeterminate:
        return newState === TransitionCheckState.Checked ? this._animationClasses.indeterminateToChecked : this._animationClasses.indeterminateToUnchecked;
    }
    return "";
  }
  _syncIndeterminate(value) {
    const nativeCheckbox = this._inputElement;
    if (nativeCheckbox) {
      nativeCheckbox.nativeElement.indeterminate = value;
    }
  }
  _onInputClick() {
    this._handleInputClick();
  }
  _onTouchTargetClick() {
    this._handleInputClick();
    if (!this.disabled) {
      this._inputElement.nativeElement.focus();
    }
  }
  _preventBubblingFromLabel(event) {
    if (!!event.target && this._labelElement.nativeElement.contains(event.target)) {
      event.stopPropagation();
    }
  }
  static \u0275fac = function MatCheckbox_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCheckbox)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatCheckbox,
    selectors: [["mat-checkbox"]],
    viewQuery: function MatCheckbox_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5)(_c1, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._inputElement = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._labelElement = _t.first);
      }
    },
    hostAttrs: [1, "mat-mdc-checkbox"],
    hostVars: 16,
    hostBindings: function MatCheckbox_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275domProperty("id", ctx.id);
        \u0275\u0275attribute("tabindex", null)("aria-label", null)("aria-labelledby", null);
        \u0275\u0275classMap(ctx.color ? "mat-" + ctx.color : "mat-accent");
        \u0275\u0275classProp("_mat-animation-noopable", ctx._animationsDisabled)("mdc-checkbox--disabled", ctx.disabled)("mat-mdc-checkbox-disabled", ctx.disabled)("mat-mdc-checkbox-checked", ctx.checked)("mat-mdc-checkbox-disabled-interactive", ctx.disabledInteractive);
      }
    },
    inputs: {
      ariaLabel: [0, "aria-label", "ariaLabel"],
      ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
      ariaDescribedby: [0, "aria-describedby", "ariaDescribedby"],
      ariaExpanded: [2, "aria-expanded", "ariaExpanded", booleanAttribute],
      ariaControls: [0, "aria-controls", "ariaControls"],
      ariaOwns: [0, "aria-owns", "ariaOwns"],
      id: "id",
      required: [2, "required", "required", booleanAttribute],
      labelPosition: "labelPosition",
      name: "name",
      value: "value",
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
      tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? void 0 : numberAttribute(value)],
      color: "color",
      disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute],
      checked: [2, "checked", "checked", booleanAttribute],
      disabled: [2, "disabled", "disabled", booleanAttribute],
      indeterminate: [2, "indeterminate", "indeterminate", booleanAttribute]
    },
    outputs: {
      change: "change",
      indeterminateChange: "indeterminateChange"
    },
    exportAs: ["matCheckbox"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _MatCheckbox),
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: _MatCheckbox,
      multi: true
    }]), \u0275\u0275NgOnChangesFeature],
    ngContentSelectors: _c2,
    decls: 15,
    vars: 23,
    consts: [["checkbox", ""], ["input", ""], ["label", ""], ["mat-internal-form-field", "", 3, "click", "labelPosition"], [1, "mdc-checkbox"], ["aria-hidden", "true", 1, "mat-mdc-checkbox-touch-target", 3, "click"], ["type", "checkbox", 1, "mdc-checkbox__native-control", 3, "blur", "click", "change", "checked", "indeterminate", "disabled", "id", "required", "tabIndex"], ["aria-hidden", "true", 1, "mdc-checkbox__ripple"], ["aria-hidden", "true", 1, "mdc-checkbox__background"], ["focusable", "false", "viewBox", "0 0 24 24", 1, "mdc-checkbox__checkmark"], ["fill", "none", "d", "M1.73,12.91 8.1,19.28 22.79,4.59", 1, "mdc-checkbox__checkmark-path"], [1, "mdc-checkbox__mixedmark"], ["mat-ripple", "", "aria-hidden", "true", 1, "mat-mdc-checkbox-ripple", "mat-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled", "matRippleCentered"], [1, "mdc-label", 3, "for"]],
    template: function MatCheckbox_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275elementStart(0, "div", 3);
        \u0275\u0275listener("click", function MatCheckbox_Template_div_click_0_listener($event) {
          return ctx._preventBubblingFromLabel($event);
        });
        \u0275\u0275elementStart(1, "div", 4, 0)(3, "div", 5);
        \u0275\u0275listener("click", function MatCheckbox_Template_div_click_3_listener() {
          return ctx._onTouchTargetClick();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "input", 6, 1);
        \u0275\u0275listener("blur", function MatCheckbox_Template_input_blur_4_listener() {
          return ctx._onBlur();
        })("click", function MatCheckbox_Template_input_click_4_listener() {
          return ctx._onInputClick();
        })("change", function MatCheckbox_Template_input_change_4_listener($event) {
          return ctx._onInteractionEvent($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275element(6, "div", 7);
        \u0275\u0275elementStart(7, "div", 8);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(8, "svg", 9);
        \u0275\u0275element(9, "path", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275element(10, "div", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275element(11, "div", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "label", 13, 2);
        \u0275\u0275projection(14);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        const checkbox_r1 = \u0275\u0275reference(2);
        \u0275\u0275property("labelPosition", ctx.labelPosition);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("mdc-checkbox--selected", ctx.checked);
        \u0275\u0275property("checked", ctx.checked)("indeterminate", ctx.indeterminate)("disabled", ctx.disabled && !ctx.disabledInteractive)("id", ctx.inputId)("required", ctx.required)("tabIndex", ctx.disabled && !ctx.disabledInteractive ? -1 : ctx.tabIndex);
        \u0275\u0275attribute("aria-label", ctx.ariaLabel || null)("aria-labelledby", ctx.ariaLabelledby)("aria-describedby", ctx.ariaDescribedby)("aria-checked", ctx.indeterminate ? "mixed" : null)("aria-controls", ctx.ariaControls)("aria-disabled", ctx.disabled && ctx.disabledInteractive ? true : null)("aria-expanded", ctx.ariaExpanded)("aria-owns", ctx.ariaOwns)("name", ctx.name)("value", ctx.value);
        \u0275\u0275advance(7);
        \u0275\u0275property("matRippleTrigger", checkbox_r1)("matRippleDisabled", ctx.disableRipple || ctx.disabled)("matRippleCentered", true);
        \u0275\u0275advance();
        \u0275\u0275property("for", ctx.inputId);
      }
    },
    dependencies: [MatRipple, _MatInternalFormField],
    styles: ['.mdc-checkbox {\n  display: inline-block;\n  position: relative;\n  flex: 0 0 18px;\n  box-sizing: content-box;\n  width: 18px;\n  height: 18px;\n  line-height: 0;\n  white-space: nowrap;\n  cursor: pointer;\n  vertical-align: bottom;\n  padding: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);\n  margin: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);\n}\n.mdc-checkbox:hover > .mdc-checkbox__ripple {\n  opacity: var(--mat-checkbox-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));\n}\n.mdc-checkbox:hover > .mat-mdc-checkbox-ripple > .mat-ripple-element {\n  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));\n}\n.mdc-checkbox .mdc-checkbox__native-control:focus + .mdc-checkbox__ripple {\n  opacity: var(--mat-checkbox-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));\n}\n.mdc-checkbox .mdc-checkbox__native-control:focus ~ .mat-mdc-checkbox-ripple .mat-ripple-element {\n  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));\n}\n.mdc-checkbox:active > .mdc-checkbox__native-control + .mdc-checkbox__ripple {\n  opacity: var(--mat-checkbox-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));\n}\n.mdc-checkbox:active > .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element {\n  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));\n}\n.mdc-checkbox:hover > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {\n  opacity: var(--mat-checkbox-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));\n}\n.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {\n  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));\n}\n.mdc-checkbox .mdc-checkbox__native-control:focus:checked + .mdc-checkbox__ripple {\n  opacity: var(--mat-checkbox-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));\n}\n.mdc-checkbox .mdc-checkbox__native-control:focus:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {\n  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));\n}\n.mdc-checkbox:active > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {\n  opacity: var(--mat-checkbox-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));\n}\n.mdc-checkbox:active > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {\n  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));\n}\n.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element,\n.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control + .mdc-checkbox__ripple {\n  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));\n}\n.mdc-checkbox .mdc-checkbox__native-control {\n  position: absolute;\n  margin: 0;\n  padding: 0;\n  opacity: 0;\n  cursor: inherit;\n  z-index: 1;\n  width: var(--mat-checkbox-state-layer-size, 40px);\n  height: var(--mat-checkbox-state-layer-size, 40px);\n  top: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);\n  right: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);\n  left: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);\n}\n\n.mdc-checkbox--disabled {\n  cursor: default;\n  pointer-events: none;\n}\n\n.mdc-checkbox__background {\n  display: inline-flex;\n  position: absolute;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 18px;\n  height: 18px;\n  border: 2px solid currentColor;\n  border-radius: 2px;\n  background-color: transparent;\n  pointer-events: none;\n  will-change: background-color, border-color;\n  transition: background-color 90ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);\n  -webkit-print-color-adjust: exact;\n  color-adjust: exact;\n  border-color: var(--mat-checkbox-unselected-icon-color, var(--mat-sys-on-surface-variant));\n  top: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);\n  left: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);\n}\n\n.mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,\n.mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {\n  border-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));\n  background-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));\n}\n\n.mdc-checkbox--disabled .mdc-checkbox__background {\n  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n@media (forced-colors: active) {\n  .mdc-checkbox--disabled .mdc-checkbox__background {\n    border-color: GrayText;\n  }\n}\n\n.mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,\n.mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {\n  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  border-color: transparent;\n}\n@media (forced-colors: active) {\n  .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,\n  .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {\n    border-color: GrayText;\n  }\n}\n\n.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:checked) ~ .mdc-checkbox__background,\n.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:indeterminate) ~ .mdc-checkbox__background {\n  border-color: var(--mat-checkbox-unselected-hover-icon-color, var(--mat-sys-on-surface));\n  background-color: transparent;\n}\n\n.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,\n.mdc-checkbox:hover > .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {\n  border-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));\n  background-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));\n}\n\n.mdc-checkbox__native-control:focus:focus:not(:checked) ~ .mdc-checkbox__background,\n.mdc-checkbox__native-control:focus:focus:not(:indeterminate) ~ .mdc-checkbox__background {\n  border-color: var(--mat-checkbox-unselected-focus-icon-color, var(--mat-sys-on-surface));\n}\n\n.mdc-checkbox__native-control:focus:focus:checked ~ .mdc-checkbox__background,\n.mdc-checkbox__native-control:focus:focus:indeterminate ~ .mdc-checkbox__background {\n  border-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));\n  background-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));\n}\n\n.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,\n.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,\n.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {\n  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n@media (forced-colors: active) {\n  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,\n  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,\n  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {\n    border-color: GrayText;\n  }\n}\n.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,\n.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {\n  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  border-color: transparent;\n}\n\n.mdc-checkbox__checkmark {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  opacity: 0;\n  transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);\n  color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));\n}\n@media (forced-colors: active) {\n  .mdc-checkbox__checkmark {\n    color: CanvasText;\n  }\n}\n\n.mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {\n  color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));\n}\n@media (forced-colors: active) {\n  .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {\n    color: GrayText;\n  }\n}\n\n.mdc-checkbox__checkmark-path {\n  transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);\n  stroke: currentColor;\n  stroke-width: 3.12px;\n  stroke-dashoffset: 29.7833385;\n  stroke-dasharray: 29.7833385;\n}\n\n.mdc-checkbox__mixedmark {\n  width: 100%;\n  height: 0;\n  transform: scaleX(0) rotate(0deg);\n  border-width: 1px;\n  border-style: solid;\n  opacity: 0;\n  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);\n  border-color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));\n}\n@media (forced-colors: active) {\n  .mdc-checkbox__mixedmark {\n    margin: 0 1px;\n  }\n}\n\n.mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {\n  border-color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));\n}\n@media (forced-colors: active) {\n  .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {\n    border-color: GrayText;\n  }\n}\n\n.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,\n.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,\n.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,\n.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {\n  animation-duration: 180ms;\n  animation-timing-function: linear;\n}\n\n.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {\n  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;\n  transition: none;\n}\n\n.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {\n  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;\n  transition: none;\n}\n\n.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {\n  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;\n  transition: none;\n}\n\n.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {\n  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear;\n  transition: none;\n}\n.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {\n  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;\n  transition: none;\n}\n\n.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {\n  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear;\n  transition: none;\n}\n.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {\n  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;\n  transition: none;\n}\n\n.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {\n  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;\n  transition: none;\n}\n\n.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,\n.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {\n  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);\n}\n.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,\n.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path {\n  stroke-dashoffset: 0;\n}\n\n.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {\n  transition: opacity 180ms cubic-bezier(0, 0, 0.2, 1), transform 180ms cubic-bezier(0, 0, 0.2, 1);\n  opacity: 1;\n}\n.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {\n  transform: scaleX(1) rotate(-45deg);\n}\n\n.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {\n  transform: rotate(45deg);\n  opacity: 0;\n  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);\n}\n.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {\n  transform: scaleX(1) rotate(0deg);\n  opacity: 1;\n}\n\n@keyframes mdc-checkbox-unchecked-checked-checkmark-path {\n  0%, 50% {\n    stroke-dashoffset: 29.7833385;\n  }\n  50% {\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  100% {\n    stroke-dashoffset: 0;\n  }\n}\n@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {\n  0%, 68.2% {\n    transform: scaleX(0);\n  }\n  68.2% {\n    animation-timing-function: cubic-bezier(0, 0, 0, 1);\n  }\n  100% {\n    transform: scaleX(1);\n  }\n}\n@keyframes mdc-checkbox-checked-unchecked-checkmark-path {\n  from {\n    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);\n    opacity: 1;\n    stroke-dashoffset: 0;\n  }\n  to {\n    opacity: 0;\n    stroke-dashoffset: -29.7833385;\n  }\n}\n@keyframes mdc-checkbox-checked-indeterminate-checkmark {\n  from {\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n    transform: rotate(0deg);\n    opacity: 1;\n  }\n  to {\n    transform: rotate(45deg);\n    opacity: 0;\n  }\n}\n@keyframes mdc-checkbox-indeterminate-checked-checkmark {\n  from {\n    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);\n    transform: rotate(45deg);\n    opacity: 0;\n  }\n  to {\n    transform: rotate(360deg);\n    opacity: 1;\n  }\n}\n@keyframes mdc-checkbox-checked-indeterminate-mixedmark {\n  from {\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n    transform: rotate(-45deg);\n    opacity: 0;\n  }\n  to {\n    transform: rotate(0deg);\n    opacity: 1;\n  }\n}\n@keyframes mdc-checkbox-indeterminate-checked-mixedmark {\n  from {\n    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);\n    transform: rotate(0deg);\n    opacity: 1;\n  }\n  to {\n    transform: rotate(315deg);\n    opacity: 0;\n  }\n}\n@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {\n  0% {\n    animation-timing-function: linear;\n    transform: scaleX(1);\n    opacity: 1;\n  }\n  32.8%, 100% {\n    transform: scaleX(0);\n    opacity: 0;\n  }\n}\n.mat-mdc-checkbox {\n  display: inline-block;\n  position: relative;\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-touch-target,\n.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__native-control,\n.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__ripple,\n.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,\n.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background,\n.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,\n.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,\n.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-checkbox label {\n  cursor: pointer;\n}\n.mat-mdc-checkbox .mat-internal-form-field {\n  color: var(--mat-checkbox-label-text-color, var(--mat-sys-on-surface));\n  font-family: var(--mat-checkbox-label-text-font, var(--mat-sys-body-medium-font));\n  line-height: var(--mat-checkbox-label-text-line-height, var(--mat-sys-body-medium-line-height));\n  font-size: var(--mat-checkbox-label-text-size, var(--mat-sys-body-medium-size));\n  letter-spacing: var(--mat-checkbox-label-text-tracking, var(--mat-sys-body-medium-tracking));\n  font-weight: var(--mat-checkbox-label-text-weight, var(--mat-sys-body-medium-weight));\n}\n.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input {\n  cursor: default;\n}\n.mat-mdc-checkbox.mat-mdc-checkbox-disabled label {\n  cursor: default;\n  color: var(--mat-checkbox-disabled-label-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n@media (forced-colors: active) {\n  .mat-mdc-checkbox.mat-mdc-checkbox-disabled label {\n    color: GrayText;\n  }\n}\n.mat-mdc-checkbox label:empty {\n  display: none;\n}\n.mat-mdc-checkbox .mdc-checkbox__ripple {\n  opacity: 0;\n}\n\n.mat-mdc-checkbox .mat-mdc-checkbox-ripple,\n.mdc-checkbox__ripple {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  border-radius: 50%;\n  pointer-events: none;\n}\n.mat-mdc-checkbox .mat-mdc-checkbox-ripple:not(:empty),\n.mdc-checkbox__ripple:not(:empty) {\n  transform: translateZ(0);\n}\n\n.mat-mdc-checkbox-ripple .mat-ripple-element {\n  opacity: 0.1;\n}\n\n.mat-mdc-checkbox-touch-target {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  height: var(--mat-checkbox-touch-target-size, 48px);\n  width: var(--mat-checkbox-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n  display: var(--mat-checkbox-touch-target-display, block);\n}\n\n.mat-mdc-checkbox .mat-mdc-checkbox-ripple::before {\n  border-radius: 50%;\n}\n\n.mdc-checkbox__native-control:focus-visible ~ .mat-focus-indicator::before {\n  content: "";\n}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCheckbox, [{
    type: Component,
    args: [{
      selector: "mat-checkbox",
      host: {
        "class": "mat-mdc-checkbox",
        "[attr.tabindex]": "null",
        "[attr.aria-label]": "null",
        "[attr.aria-labelledby]": "null",
        "[class._mat-animation-noopable]": "_animationsDisabled",
        "[class.mdc-checkbox--disabled]": "disabled",
        "[id]": "id",
        "[class.mat-mdc-checkbox-disabled]": "disabled",
        "[class.mat-mdc-checkbox-checked]": "checked",
        "[class.mat-mdc-checkbox-disabled-interactive]": "disabledInteractive",
        "[class]": 'color ? "mat-" + color : "mat-accent"'
      },
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MatCheckbox),
        multi: true
      }, {
        provide: NG_VALIDATORS,
        useExisting: MatCheckbox,
        multi: true
      }],
      exportAs: "matCheckbox",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [MatRipple, _MatInternalFormField],
      template: `<div mat-internal-form-field [labelPosition]="labelPosition" (click)="_preventBubblingFromLabel($event)">
  <div #checkbox class="mdc-checkbox">
    <!-- Render this element first so the input is on top. -->
    <div
      class="mat-mdc-checkbox-touch-target"
      (click)="_onTouchTargetClick()"
      aria-hidden="true"></div>
    <input #input
           type="checkbox"
           class="mdc-checkbox__native-control"
           [class.mdc-checkbox--selected]="checked"
           [attr.aria-label]="ariaLabel || null"
           [attr.aria-labelledby]="ariaLabelledby"
           [attr.aria-describedby]="ariaDescribedby"
           [attr.aria-checked]="indeterminate ? 'mixed' : null"
           [attr.aria-controls]="ariaControls"
           [attr.aria-disabled]="disabled && disabledInteractive ? true : null"
           [attr.aria-expanded]="ariaExpanded"
           [attr.aria-owns]="ariaOwns"
           [attr.name]="name"
           [attr.value]="value"
           [checked]="checked"
           [indeterminate]="indeterminate"
           [disabled]="disabled && !disabledInteractive"
           [id]="inputId"
           [required]="required"
           [tabIndex]="disabled && !disabledInteractive ? -1 : tabIndex"
           (blur)="_onBlur()"
           (click)="_onInputClick()"
           (change)="_onInteractionEvent($event)"/>
    <div class="mdc-checkbox__ripple" aria-hidden="true"></div>
    <div class="mdc-checkbox__background" aria-hidden="true">
      <svg class="mdc-checkbox__checkmark"
           focusable="false"
           viewBox="0 0 24 24">
        <path class="mdc-checkbox__checkmark-path"
              fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
      </svg>
      <div class="mdc-checkbox__mixedmark"></div>
    </div>
    <div class="mat-mdc-checkbox-ripple mat-focus-indicator"
      mat-ripple
      aria-hidden="true"
      [matRippleTrigger]="checkbox"
      [matRippleDisabled]="disableRipple || disabled"
      [matRippleCentered]="true"></div>
  </div>
  <!--
    Avoid putting a click handler on the <label/> to fix duplicate navigation stop on Talk Back
    (#14385). Putting a click handler on the <label/> caused this bug because the browser produced
    an unnecessary accessibility tree node.
  -->
  <label class="mdc-label" #label [for]="inputId">
    <ng-content></ng-content>
  </label>
</div>
`,
      styles: ['.mdc-checkbox {\n  display: inline-block;\n  position: relative;\n  flex: 0 0 18px;\n  box-sizing: content-box;\n  width: 18px;\n  height: 18px;\n  line-height: 0;\n  white-space: nowrap;\n  cursor: pointer;\n  vertical-align: bottom;\n  padding: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);\n  margin: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);\n}\n.mdc-checkbox:hover > .mdc-checkbox__ripple {\n  opacity: var(--mat-checkbox-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));\n}\n.mdc-checkbox:hover > .mat-mdc-checkbox-ripple > .mat-ripple-element {\n  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));\n}\n.mdc-checkbox .mdc-checkbox__native-control:focus + .mdc-checkbox__ripple {\n  opacity: var(--mat-checkbox-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));\n}\n.mdc-checkbox .mdc-checkbox__native-control:focus ~ .mat-mdc-checkbox-ripple .mat-ripple-element {\n  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));\n}\n.mdc-checkbox:active > .mdc-checkbox__native-control + .mdc-checkbox__ripple {\n  opacity: var(--mat-checkbox-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));\n}\n.mdc-checkbox:active > .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element {\n  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));\n}\n.mdc-checkbox:hover > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {\n  opacity: var(--mat-checkbox-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));\n}\n.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {\n  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));\n}\n.mdc-checkbox .mdc-checkbox__native-control:focus:checked + .mdc-checkbox__ripple {\n  opacity: var(--mat-checkbox-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));\n}\n.mdc-checkbox .mdc-checkbox__native-control:focus:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {\n  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));\n}\n.mdc-checkbox:active > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {\n  opacity: var(--mat-checkbox-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));\n}\n.mdc-checkbox:active > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {\n  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));\n}\n.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element,\n.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control + .mdc-checkbox__ripple {\n  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));\n}\n.mdc-checkbox .mdc-checkbox__native-control {\n  position: absolute;\n  margin: 0;\n  padding: 0;\n  opacity: 0;\n  cursor: inherit;\n  z-index: 1;\n  width: var(--mat-checkbox-state-layer-size, 40px);\n  height: var(--mat-checkbox-state-layer-size, 40px);\n  top: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);\n  right: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);\n  left: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);\n}\n\n.mdc-checkbox--disabled {\n  cursor: default;\n  pointer-events: none;\n}\n\n.mdc-checkbox__background {\n  display: inline-flex;\n  position: absolute;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 18px;\n  height: 18px;\n  border: 2px solid currentColor;\n  border-radius: 2px;\n  background-color: transparent;\n  pointer-events: none;\n  will-change: background-color, border-color;\n  transition: background-color 90ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);\n  -webkit-print-color-adjust: exact;\n  color-adjust: exact;\n  border-color: var(--mat-checkbox-unselected-icon-color, var(--mat-sys-on-surface-variant));\n  top: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);\n  left: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);\n}\n\n.mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,\n.mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {\n  border-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));\n  background-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));\n}\n\n.mdc-checkbox--disabled .mdc-checkbox__background {\n  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n@media (forced-colors: active) {\n  .mdc-checkbox--disabled .mdc-checkbox__background {\n    border-color: GrayText;\n  }\n}\n\n.mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,\n.mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {\n  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  border-color: transparent;\n}\n@media (forced-colors: active) {\n  .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,\n  .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {\n    border-color: GrayText;\n  }\n}\n\n.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:checked) ~ .mdc-checkbox__background,\n.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:indeterminate) ~ .mdc-checkbox__background {\n  border-color: var(--mat-checkbox-unselected-hover-icon-color, var(--mat-sys-on-surface));\n  background-color: transparent;\n}\n\n.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,\n.mdc-checkbox:hover > .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {\n  border-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));\n  background-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));\n}\n\n.mdc-checkbox__native-control:focus:focus:not(:checked) ~ .mdc-checkbox__background,\n.mdc-checkbox__native-control:focus:focus:not(:indeterminate) ~ .mdc-checkbox__background {\n  border-color: var(--mat-checkbox-unselected-focus-icon-color, var(--mat-sys-on-surface));\n}\n\n.mdc-checkbox__native-control:focus:focus:checked ~ .mdc-checkbox__background,\n.mdc-checkbox__native-control:focus:focus:indeterminate ~ .mdc-checkbox__background {\n  border-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));\n  background-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));\n}\n\n.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,\n.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,\n.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {\n  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n@media (forced-colors: active) {\n  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,\n  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,\n  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {\n    border-color: GrayText;\n  }\n}\n.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,\n.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {\n  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  border-color: transparent;\n}\n\n.mdc-checkbox__checkmark {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  opacity: 0;\n  transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);\n  color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));\n}\n@media (forced-colors: active) {\n  .mdc-checkbox__checkmark {\n    color: CanvasText;\n  }\n}\n\n.mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {\n  color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));\n}\n@media (forced-colors: active) {\n  .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {\n    color: GrayText;\n  }\n}\n\n.mdc-checkbox__checkmark-path {\n  transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);\n  stroke: currentColor;\n  stroke-width: 3.12px;\n  stroke-dashoffset: 29.7833385;\n  stroke-dasharray: 29.7833385;\n}\n\n.mdc-checkbox__mixedmark {\n  width: 100%;\n  height: 0;\n  transform: scaleX(0) rotate(0deg);\n  border-width: 1px;\n  border-style: solid;\n  opacity: 0;\n  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);\n  border-color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));\n}\n@media (forced-colors: active) {\n  .mdc-checkbox__mixedmark {\n    margin: 0 1px;\n  }\n}\n\n.mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {\n  border-color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));\n}\n@media (forced-colors: active) {\n  .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {\n    border-color: GrayText;\n  }\n}\n\n.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,\n.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,\n.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,\n.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {\n  animation-duration: 180ms;\n  animation-timing-function: linear;\n}\n\n.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {\n  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;\n  transition: none;\n}\n\n.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {\n  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;\n  transition: none;\n}\n\n.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {\n  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;\n  transition: none;\n}\n\n.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {\n  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear;\n  transition: none;\n}\n.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {\n  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;\n  transition: none;\n}\n\n.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {\n  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear;\n  transition: none;\n}\n.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {\n  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;\n  transition: none;\n}\n\n.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {\n  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;\n  transition: none;\n}\n\n.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,\n.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {\n  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);\n}\n.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,\n.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path {\n  stroke-dashoffset: 0;\n}\n\n.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {\n  transition: opacity 180ms cubic-bezier(0, 0, 0.2, 1), transform 180ms cubic-bezier(0, 0, 0.2, 1);\n  opacity: 1;\n}\n.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {\n  transform: scaleX(1) rotate(-45deg);\n}\n\n.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {\n  transform: rotate(45deg);\n  opacity: 0;\n  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);\n}\n.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {\n  transform: scaleX(1) rotate(0deg);\n  opacity: 1;\n}\n\n@keyframes mdc-checkbox-unchecked-checked-checkmark-path {\n  0%, 50% {\n    stroke-dashoffset: 29.7833385;\n  }\n  50% {\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  100% {\n    stroke-dashoffset: 0;\n  }\n}\n@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {\n  0%, 68.2% {\n    transform: scaleX(0);\n  }\n  68.2% {\n    animation-timing-function: cubic-bezier(0, 0, 0, 1);\n  }\n  100% {\n    transform: scaleX(1);\n  }\n}\n@keyframes mdc-checkbox-checked-unchecked-checkmark-path {\n  from {\n    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);\n    opacity: 1;\n    stroke-dashoffset: 0;\n  }\n  to {\n    opacity: 0;\n    stroke-dashoffset: -29.7833385;\n  }\n}\n@keyframes mdc-checkbox-checked-indeterminate-checkmark {\n  from {\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n    transform: rotate(0deg);\n    opacity: 1;\n  }\n  to {\n    transform: rotate(45deg);\n    opacity: 0;\n  }\n}\n@keyframes mdc-checkbox-indeterminate-checked-checkmark {\n  from {\n    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);\n    transform: rotate(45deg);\n    opacity: 0;\n  }\n  to {\n    transform: rotate(360deg);\n    opacity: 1;\n  }\n}\n@keyframes mdc-checkbox-checked-indeterminate-mixedmark {\n  from {\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n    transform: rotate(-45deg);\n    opacity: 0;\n  }\n  to {\n    transform: rotate(0deg);\n    opacity: 1;\n  }\n}\n@keyframes mdc-checkbox-indeterminate-checked-mixedmark {\n  from {\n    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);\n    transform: rotate(0deg);\n    opacity: 1;\n  }\n  to {\n    transform: rotate(315deg);\n    opacity: 0;\n  }\n}\n@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {\n  0% {\n    animation-timing-function: linear;\n    transform: scaleX(1);\n    opacity: 1;\n  }\n  32.8%, 100% {\n    transform: scaleX(0);\n    opacity: 0;\n  }\n}\n.mat-mdc-checkbox {\n  display: inline-block;\n  position: relative;\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-touch-target,\n.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__native-control,\n.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__ripple,\n.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,\n.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background,\n.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,\n.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,\n.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-checkbox label {\n  cursor: pointer;\n}\n.mat-mdc-checkbox .mat-internal-form-field {\n  color: var(--mat-checkbox-label-text-color, var(--mat-sys-on-surface));\n  font-family: var(--mat-checkbox-label-text-font, var(--mat-sys-body-medium-font));\n  line-height: var(--mat-checkbox-label-text-line-height, var(--mat-sys-body-medium-line-height));\n  font-size: var(--mat-checkbox-label-text-size, var(--mat-sys-body-medium-size));\n  letter-spacing: var(--mat-checkbox-label-text-tracking, var(--mat-sys-body-medium-tracking));\n  font-weight: var(--mat-checkbox-label-text-weight, var(--mat-sys-body-medium-weight));\n}\n.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input {\n  cursor: default;\n}\n.mat-mdc-checkbox.mat-mdc-checkbox-disabled label {\n  cursor: default;\n  color: var(--mat-checkbox-disabled-label-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n@media (forced-colors: active) {\n  .mat-mdc-checkbox.mat-mdc-checkbox-disabled label {\n    color: GrayText;\n  }\n}\n.mat-mdc-checkbox label:empty {\n  display: none;\n}\n.mat-mdc-checkbox .mdc-checkbox__ripple {\n  opacity: 0;\n}\n\n.mat-mdc-checkbox .mat-mdc-checkbox-ripple,\n.mdc-checkbox__ripple {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  border-radius: 50%;\n  pointer-events: none;\n}\n.mat-mdc-checkbox .mat-mdc-checkbox-ripple:not(:empty),\n.mdc-checkbox__ripple:not(:empty) {\n  transform: translateZ(0);\n}\n\n.mat-mdc-checkbox-ripple .mat-ripple-element {\n  opacity: 0.1;\n}\n\n.mat-mdc-checkbox-touch-target {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  height: var(--mat-checkbox-touch-target-size, 48px);\n  width: var(--mat-checkbox-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n  display: var(--mat-checkbox-touch-target-display, block);\n}\n\n.mat-mdc-checkbox .mat-mdc-checkbox-ripple::before {\n  border-radius: 50%;\n}\n\n.mdc-checkbox__native-control:focus-visible ~ .mat-focus-indicator::before {\n  content: "";\n}\n']
    }]
  }], () => [], {
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    ariaDescribedby: [{
      type: Input,
      args: ["aria-describedby"]
    }],
    ariaExpanded: [{
      type: Input,
      args: [{
        alias: "aria-expanded",
        transform: booleanAttribute
      }]
    }],
    ariaControls: [{
      type: Input,
      args: ["aria-controls"]
    }],
    ariaOwns: [{
      type: Input,
      args: ["aria-owns"]
    }],
    id: [{
      type: Input
    }],
    required: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    labelPosition: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    change: [{
      type: Output
    }],
    indeterminateChange: [{
      type: Output
    }],
    value: [{
      type: Input
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    _inputElement: [{
      type: ViewChild,
      args: ["input"]
    }],
    _labelElement: [{
      type: ViewChild,
      args: ["label"]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? void 0 : numberAttribute(value)
      }]
    }],
    color: [{
      type: Input
    }],
    disabledInteractive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    checked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    indeterminate: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatCheckboxModule = class _MatCheckboxModule {
  static \u0275fac = function MatCheckboxModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCheckboxModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatCheckboxModule,
    imports: [MatCheckbox],
    exports: [MatCheckbox, BidiModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCheckbox, BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCheckboxModule, [{
    type: NgModule,
    args: [{
      imports: [MatCheckbox],
      exports: [MatCheckbox, BidiModule]
    }]
  }], null, null);
})();

// src/admin/admin-panel.ts
var _forTrack0 = ($index, $item) => $item.key;
function AdminPanel_Conditional_36_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-checkbox", 17);
    \u0275\u0275listener("change", function AdminPanel_Conditional_36_For_15_Template_mat_checkbox_change_0_listener($event) {
      const col_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onToggleUserColumn(col_r4.key, $event.checked));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const col_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("checked", ctx_r1.selectedUserColumns()[col_r4.key]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", col_r4.label, " ");
  }
}
function AdminPanel_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 26)(2, "h4", 27);
    \u0275\u0275text(3, "Cot bang User");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 4)(5, "button", 28);
    \u0275\u0275listener("click", function AdminPanel_Conditional_36_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSelectAllUserColumns());
    });
    \u0275\u0275elementStart(6, "mat-icon", 6);
    \u0275\u0275text(7, "done_all");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Chon tat ca ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 28);
    \u0275\u0275listener("click", function AdminPanel_Conditional_36_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClearAllUserColumns());
    });
    \u0275\u0275elementStart(10, "mat-icon", 6);
    \u0275\u0275text(11, "remove_done");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " Bo chon tat ca ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 29);
    \u0275\u0275repeaterCreate(14, AdminPanel_Conditional_36_For_15_Template, 2, 2, "mat-checkbox", 30, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r1.exportUserColumns);
  }
}
function AdminPanel_Conditional_37_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-checkbox", 17);
    \u0275\u0275listener("change", function AdminPanel_Conditional_37_For_15_Template_mat_checkbox_change_0_listener($event) {
      const col_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onToggleLoginColumn(col_r7.key, $event.checked));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const col_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("checked", ctx_r1.selectedLoginColumns()[col_r7.key]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", col_r7.label, " ");
  }
}
function AdminPanel_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 26)(2, "h4", 27);
    \u0275\u0275text(3, " Cot bang Login Status ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 4)(5, "button", 28);
    \u0275\u0275listener("click", function AdminPanel_Conditional_37_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSelectAllLoginColumns());
    });
    \u0275\u0275elementStart(6, "mat-icon", 6);
    \u0275\u0275text(7, "done_all");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Chon tat ca ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 28);
    \u0275\u0275listener("click", function AdminPanel_Conditional_37_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClearAllLoginColumns());
    });
    \u0275\u0275elementStart(10, "mat-icon", 6);
    \u0275\u0275text(11, "remove_done");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " Bo chon tat ca ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 29);
    \u0275\u0275repeaterCreate(14, AdminPanel_Conditional_37_For_15_Template, 2, 2, "mat-checkbox", 30, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r1.exportLoginColumns);
  }
}
function AdminPanel_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.errorMessage(), " ");
  }
}
function AdminPanel_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loginLogsErrorMessage(), " ");
  }
}
function AdminPanel_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275element(1, "mat-spinner", 31);
    \u0275\u0275elementEnd();
  }
}
function AdminPanel_Conditional_41_th_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "Username");
    \u0275\u0275elementEnd();
  }
}
function AdminPanel_Conditional_41_td_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49)(1, "div", 50)(2, "div", 51);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 52);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const profile_r8 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (profile_r8.username == null ? null : (tmp_3_0 = profile_r8.username.charAt(0)) == null ? null : tmp_3_0.toUpperCase()) ?? "?", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(profile_r8.username);
  }
}
function AdminPanel_Conditional_41_th_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "Email");
    \u0275\u0275elementEnd();
  }
}
function AdminPanel_Conditional_41_td_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const profile_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(profile_r9.email);
  }
}
function AdminPanel_Conditional_41_th_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "Full Name");
    \u0275\u0275elementEnd();
  }
}
function AdminPanel_Conditional_41_td_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const profile_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", profile_r10.firstName, " ", profile_r10.lastName);
  }
}
function AdminPanel_Conditional_41_th_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "Date of Birth");
    \u0275\u0275elementEnd();
  }
}
function AdminPanel_Conditional_41_td_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const profile_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(profile_r11.dob);
  }
}
function AdminPanel_Conditional_41_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function AdminPanel_Conditional_41_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49)(1, "button", 56)(2, "mat-icon");
    \u0275\u0275text(3, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 57)(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function AdminPanel_Conditional_41_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 58);
  }
}
function AdminPanel_Conditional_41_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 59);
  }
}
function AdminPanel_Conditional_41_Conditional_20_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function AdminPanel_Conditional_41_Conditional_20_For_9_Template_button_click_0_listener() {
      const page_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.goToUserPageOneBased(page_r14));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const page_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", page_r14 === ctx_r1.getUserDisplayPageOneBased());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", page_r14, " ");
  }
}
function AdminPanel_Conditional_41_Conditional_20_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 65);
    \u0275\u0275listener("click", function AdminPanel_Conditional_41_Conditional_20_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.goToNextUserPageBlock());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("matTooltip", "Sang cum trang tiep theo bat dau tu trang " + ctx_r1.getUserNextPageBlockLabel());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getUserNextPageBlockLabel(), " ");
  }
}
function AdminPanel_Conditional_41_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "p", 60);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 61);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 62)(6, "button", 8);
    \u0275\u0275listener("click", function AdminPanel_Conditional_41_Conditional_20_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToUserPreviousPage());
    });
    \u0275\u0275text(7, " Truoc ");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, AdminPanel_Conditional_41_Conditional_20_For_9_Template, 2, 2, "button", 63, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275conditionalCreate(10, AdminPanel_Conditional_41_Conditional_20_Conditional_10_Template, 2, 2, "button", 64);
    \u0275\u0275elementStart(11, "button", 8);
    \u0275\u0275listener("click", function AdminPanel_Conditional_41_Conditional_20_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToUserNextPage());
    });
    \u0275\u0275text(12, " Sau ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" Trang ", ctx_r1.getUserDisplayPageOneBased(), " / ", ctx_r1.userTotalPages(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r1.userTotalElements(), " user)");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.userPageIndex() <= 0);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.getUserPageNumberButtons());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showUserManyPagesHint() ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.userPageIndex() + 1 >= ctx_r1.userTotalPages());
  }
}
function AdminPanel_Conditional_41_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "mat-icon", 66);
    \u0275\u0275text(2, "group_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 61);
    \u0275\u0275text(4, "No users found in the system.");
    \u0275\u0275elementEnd()();
  }
}
function AdminPanel_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 20)(1, "div", 32)(2, "table", 33);
    \u0275\u0275elementContainerStart(3, 34);
    \u0275\u0275template(4, AdminPanel_Conditional_41_th_4_Template, 2, 0, "th", 35)(5, AdminPanel_Conditional_41_td_5_Template, 6, 2, "td", 36);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(6, 37);
    \u0275\u0275template(7, AdminPanel_Conditional_41_th_7_Template, 2, 0, "th", 35)(8, AdminPanel_Conditional_41_td_8_Template, 2, 1, "td", 38);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(9, 39);
    \u0275\u0275template(10, AdminPanel_Conditional_41_th_10_Template, 2, 0, "th", 35)(11, AdminPanel_Conditional_41_td_11_Template, 2, 2, "td", 40);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(12, 41);
    \u0275\u0275template(13, AdminPanel_Conditional_41_th_13_Template, 2, 0, "th", 35)(14, AdminPanel_Conditional_41_td_14_Template, 2, 1, "td", 42);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(15, 43);
    \u0275\u0275template(16, AdminPanel_Conditional_41_th_16_Template, 2, 0, "th", 35)(17, AdminPanel_Conditional_41_td_17_Template, 7, 0, "td", 36);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(18, AdminPanel_Conditional_41_tr_18_Template, 1, 0, "tr", 44)(19, AdminPanel_Conditional_41_tr_19_Template, 1, 0, "tr", 45);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(20, AdminPanel_Conditional_41_Conditional_20_Template, 13, 6, "div", 46);
    \u0275\u0275conditionalCreate(21, AdminPanel_Conditional_41_Conditional_21_Template, 5, 0, "div", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("dataSource", ctx_r1.profiles());
    \u0275\u0275advance(16);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.userTotalElements() > 0 ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.userTotalElements() === 0 ? 21 : -1);
  }
}
function AdminPanel_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275element(1, "mat-spinner", 67);
    \u0275\u0275elementEnd();
  }
}
function AdminPanel_Conditional_49_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, " Login ID ");
    \u0275\u0275elementEnd();
  }
}
function AdminPanel_Conditional_49_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r16 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", log_r16.loginId, " ");
  }
}
function AdminPanel_Conditional_49_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, " Username ");
    \u0275\u0275elementEnd();
  }
}
function AdminPanel_Conditional_49_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r17 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", log_r17.username || "N/A", " ");
  }
}
function AdminPanel_Conditional_49_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, " Email ");
    \u0275\u0275elementEnd();
  }
}
function AdminPanel_Conditional_49_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r18 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", log_r18.email || "N/A", " ");
  }
}
function AdminPanel_Conditional_49_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, " Login Time ");
    \u0275\u0275elementEnd();
  }
}
function AdminPanel_Conditional_49_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r19 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatLoginTime(log_r19.loginTime), " ");
  }
}
function AdminPanel_Conditional_49_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 48);
    \u0275\u0275text(1, " Status ");
    \u0275\u0275elementEnd();
  }
}
function AdminPanel_Conditional_49_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 49)(1, "span", 73);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const log_r20 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-emerald-100", log_r20.status === "SUCCESS")("text-emerald-700", log_r20.status === "SUCCESS")("bg-rose-100", log_r20.status === "FAILED")("text-rose-700", log_r20.status === "FAILED");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", log_r20.status, " ");
  }
}
function AdminPanel_Conditional_49_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 58);
  }
}
function AdminPanel_Conditional_49_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 59);
  }
}
function AdminPanel_Conditional_49_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71)(1, "p", 24);
    \u0275\u0275text(2, "Chua co login log nao.");
    \u0275\u0275elementEnd()();
  }
}
function AdminPanel_Conditional_49_Conditional_20_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function AdminPanel_Conditional_49_Conditional_20_For_7_Template_button_click_0_listener() {
      const page_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.goToLoginLogPage(page_r23));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const page_r23 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", page_r23 === ctx_r1.loginLogsPage());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", page_r23, " ");
  }
}
function AdminPanel_Conditional_49_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 72)(1, "p", 60);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 4)(4, "button", 8);
    \u0275\u0275listener("click", function AdminPanel_Conditional_49_Conditional_20_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToPreviousLoginLogPage());
    });
    \u0275\u0275text(5, " Truoc ");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, AdminPanel_Conditional_49_Conditional_20_For_7_Template, 2, 2, "button", 63, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(8, "button", 8);
    \u0275\u0275listener("click", function AdminPanel_Conditional_49_Conditional_20_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToNextLoginLogPage());
    });
    \u0275\u0275text(9, " Sau ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" Trang ", ctx_r1.loginLogsPage(), " / ", ctx_r1.getTotalLoginLogPages(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.loginLogsPage() <= 1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.getLoginLogPageNumbers());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.loginLogsPage() >= ctx_r1.getTotalLoginLogPages());
  }
}
function AdminPanel_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "table", 33);
    \u0275\u0275elementContainerStart(2, 68);
    \u0275\u0275template(3, AdminPanel_Conditional_49_th_3_Template, 2, 0, "th", 35)(4, AdminPanel_Conditional_49_td_4_Template, 2, 1, "td", 40);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 34);
    \u0275\u0275template(6, AdminPanel_Conditional_49_th_6_Template, 2, 0, "th", 35)(7, AdminPanel_Conditional_49_td_7_Template, 2, 1, "td", 40);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 37);
    \u0275\u0275template(9, AdminPanel_Conditional_49_th_9_Template, 2, 0, "th", 35)(10, AdminPanel_Conditional_49_td_10_Template, 2, 1, "td", 38);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 69);
    \u0275\u0275template(12, AdminPanel_Conditional_49_th_12_Template, 2, 0, "th", 35)(13, AdminPanel_Conditional_49_td_13_Template, 2, 1, "td", 38);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 70);
    \u0275\u0275template(15, AdminPanel_Conditional_49_th_15_Template, 2, 0, "th", 35)(16, AdminPanel_Conditional_49_td_16_Template, 3, 9, "td", 36);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(17, AdminPanel_Conditional_49_tr_17_Template, 1, 0, "tr", 44)(18, AdminPanel_Conditional_49_tr_18_Template, 1, 0, "tr", 45);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(19, AdminPanel_Conditional_49_Conditional_19_Template, 3, 0, "div", 71)(20, AdminPanel_Conditional_49_Conditional_20_Template, 10, 4, "div", 72);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.getPagedLoginLogs());
    \u0275\u0275advance(16);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.loginLogDisplayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.loginLogDisplayedColumns);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.loginLogs().length === 0 ? 19 : 20);
  }
}
var AdminPanel = class _AdminPanel {
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  profiles = signal([], ...ngDevMode ? [{ debugName: "profiles" }] : (
    /* istanbul ignore next */
    []
  ));
  userPageIndex = signal(0, ...ngDevMode ? [{ debugName: "userPageIndex" }] : (
    /* istanbul ignore next */
    []
  ));
  userPageSize = 10;
  userTotalPages = signal(0, ...ngDevMode ? [{ debugName: "userTotalPages" }] : (
    /* istanbul ignore next */
    []
  ));
  userTotalElements = signal(0, ...ngDevMode ? [{ debugName: "userTotalElements" }] : (
    /* istanbul ignore next */
    []
  ));
  loginLogs = signal([], ...ngDevMode ? [{ debugName: "loginLogs" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  loginLogsLoading = signal(false, ...ngDevMode ? [{ debugName: "loginLogsLoading" }] : (
    /* istanbul ignore next */
    []
  ));
  errorMessage = signal("", ...ngDevMode ? [{ debugName: "errorMessage" }] : (
    /* istanbul ignore next */
    []
  ));
  loginLogsErrorMessage = signal("", ...ngDevMode ? [{ debugName: "loginLogsErrorMessage" }] : (
    /* istanbul ignore next */
    []
  ));
  reportLoading = signal(false, ...ngDevMode ? [{ debugName: "reportLoading" }] : (
    /* istanbul ignore next */
    []
  ));
  loginLogsPage = signal(1, ...ngDevMode ? [{ debugName: "loginLogsPage" }] : (
    /* istanbul ignore next */
    []
  ));
  loginLogsPageSize = 10;
  displayedColumns = ["username", "email", "fullName", "dob", "actions"];
  loginLogDisplayedColumns = ["loginId", "username", "email", "loginTime", "status"];
  exportUserColumns = [
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "first_name", label: "Ho" },
    { key: "last_name", label: "Ten" },
    { key: "dob", label: "Ngay sinh" }
  ];
  exportLoginColumns = [
    { key: "login_id", label: "Login ID" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "login_time", label: "Login Time" },
    { key: "status", label: "Status" }
  ];
  selectedTables = signal({
    users: true,
    loginLogs: false
  }, ...ngDevMode ? [{ debugName: "selectedTables" }] : (
    /* istanbul ignore next */
    []
  ));
  selectedUserColumns = signal({
    username: true,
    email: true,
    first_name: true,
    last_name: true,
    dob: true
  }, ...ngDevMode ? [{ debugName: "selectedUserColumns" }] : (
    /* istanbul ignore next */
    []
  ));
  selectedLoginColumns = signal({
    login_id: true,
    username: true,
    email: true,
    login_time: true,
    status: true
  }, ...ngDevMode ? [{ debugName: "selectedLoginColumns" }] : (
    /* istanbul ignore next */
    []
  ));
  ngOnInit() {
    this.loadProfiles();
    this.loadLoginLogs();
  }
  loadProfiles(showFeedback = false) {
    this.loading.set(true);
    this.errorMessage.set("");
    this.authService.getProfilesPage(this.userPageIndex(), this.userPageSize).subscribe({
      next: (res) => {
        const page = res.result;
        this.profiles.set(page?.content ?? []);
        this.userTotalPages.set(page?.totalPages ?? 0);
        this.userTotalElements.set(page?.totalElements ?? 0);
        this.loading.set(false);
        if (showFeedback) {
          this.snackBar.open("Tai danh sach nguoi dung thanh cong.", "Dong", { duration: 2500 });
        }
      },
      error: (err) => {
        const fallbackMessage = "Khong the tai danh sach nguoi dung. Vui long thu lai.";
        const message = typeof err === "object" && err !== null && "error" in err ? err.error?.message || fallbackMessage : fallbackMessage;
        this.errorMessage.set(message);
        this.loading.set(false);
        this.snackBar.open(message, "Dong", { duration: 5e3 });
      }
    });
  }
  getUserDisplayPageOneBased() {
    return this.userPageIndex() + 1;
  }
  getUserPageNumberButtons() {
    const total = this.userTotalPages();
    if (total <= 0) {
      return [];
    }
    const currentPage = this.getUserDisplayPageOneBased();
    const groupStart = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const groupEnd = Math.min(groupStart + 9, total);
    return Array.from({ length: groupEnd - groupStart + 1 }, (_, index) => groupStart + index);
  }
  showUserManyPagesHint() {
    const total = this.userTotalPages();
    const currentPage = this.getUserDisplayPageOneBased();
    const currentGroupEnd = Math.floor((currentPage - 1) / 10) * 10 + 10;
    return total > currentGroupEnd;
  }
  goToUserPageOneBased(pageOneBased) {
    const total = this.userTotalPages();
    if (pageOneBased < 1 || pageOneBased > total) {
      return;
    }
    this.userPageIndex.set(pageOneBased - 1);
    this.loadProfiles();
  }
  goToUserNextPage() {
    this.goToUserPageOneBased(this.getUserDisplayPageOneBased() + 1);
  }
  goToUserPreviousPage() {
    this.goToUserPageOneBased(this.getUserDisplayPageOneBased() - 1);
  }
  goToNextUserPageBlock() {
    const currentPage = this.getUserDisplayPageOneBased();
    const nextGroupFirstPage = Math.floor((currentPage - 1) / 10) * 10 + 11;
    this.goToUserPageOneBased(nextGroupFirstPage);
  }
  getUserNextPageBlockLabel() {
    const currentPage = this.getUserDisplayPageOneBased();
    const nextGroupFirstPage = Math.floor((currentPage - 1) / 10) * 10 + 11;
    return `${nextGroupFirstPage}+`;
  }
  loadLoginLogs(showFeedback = false) {
    this.loginLogsLoading.set(true);
    this.loginLogsErrorMessage.set("");
    this.authService.getAdminLoginLogs().subscribe({
      next: (res) => {
        this.loginLogs.set(res.result || []);
        this.loginLogsPage.set(1);
        this.loginLogsLoading.set(false);
        if (showFeedback) {
          this.snackBar.open("Tai login logs thanh cong.", "Dong", { duration: 2500 });
        }
      },
      error: (err) => {
        const fallbackMessage = "Khong the tai login logs. Vui long thu lai.";
        const message = typeof err === "object" && err !== null && "error" in err ? err.error?.message || fallbackMessage : fallbackMessage;
        this.loginLogsErrorMessage.set(message);
        this.loginLogsLoading.set(false);
        this.snackBar.open(message, "Dong", { duration: 5e3 });
      }
    });
  }
  onRefreshData() {
    this.loadProfiles(true);
    this.loadLoginLogs(true);
  }
  getTotalLoginLogPages() {
    const total = this.loginLogs().length;
    return Math.max(1, Math.ceil(total / this.loginLogsPageSize));
  }
  getPagedLoginLogs() {
    const page = this.loginLogsPage();
    const start = (page - 1) * this.loginLogsPageSize;
    return this.loginLogs().slice(start, start + this.loginLogsPageSize);
  }
  getLoginLogPageNumbers() {
    const totalPages = this.getTotalLoginLogPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  goToLoginLogPage(page) {
    const totalPages = this.getTotalLoginLogPages();
    if (page < 1 || page > totalPages) {
      return;
    }
    this.loginLogsPage.set(page);
  }
  goToNextLoginLogPage() {
    this.goToLoginLogPage(this.loginLogsPage() + 1);
  }
  goToPreviousLoginLogPage() {
    this.goToLoginLogPage(this.loginLogsPage() - 1);
  }
  getSelectedTableKeys() {
    const selected = this.selectedTables();
    return Object.keys(selected).filter((key) => !!selected[key]);
  }
  isTableSelected(table) {
    return this.selectedTables()[table];
  }
  onToggleTable(table, checked) {
    this.selectedTables.update((prev) => __spreadProps(__spreadValues({}, prev), { [table]: checked }));
  }
  getSelectedUserColumnKeys() {
    const selected = this.selectedUserColumns();
    return this.exportUserColumns.map((c) => c.key).filter((k) => !!selected[k]);
  }
  getSelectedLoginColumnKeys() {
    const selected = this.selectedLoginColumns();
    return this.exportLoginColumns.map((c) => c.key).filter((k) => !!selected[k]);
  }
  onToggleUserColumn(key, checked) {
    this.selectedUserColumns.update((prev) => __spreadProps(__spreadValues({}, prev), { [key]: checked }));
  }
  onToggleLoginColumn(key, checked) {
    this.selectedLoginColumns.update((prev) => __spreadProps(__spreadValues({}, prev), { [key]: checked }));
  }
  onSelectAllUserColumns() {
    this.selectedUserColumns.set({
      username: true,
      email: true,
      first_name: true,
      last_name: true,
      dob: true
    });
  }
  onClearAllUserColumns() {
    this.selectedUserColumns.set({
      username: false,
      email: false,
      first_name: false,
      last_name: false,
      dob: false
    });
  }
  onSelectAllLoginColumns() {
    this.selectedLoginColumns.set({
      login_id: true,
      username: true,
      email: true,
      login_time: true,
      status: true
    });
  }
  onClearAllLoginColumns() {
    this.selectedLoginColumns.set({
      login_id: false,
      username: false,
      email: false,
      login_time: false,
      status: false
    });
  }
  onDownloadReport(format) {
    const selectedTables = this.getSelectedTableKeys();
    if (selectedTables.length === 0) {
      this.snackBar.open("Vui long chon it nhat 1 bang de xuat.", "Dong", { duration: 3e3 });
      return;
    }
    const userColumns = this.getSelectedUserColumnKeys();
    const loginColumns = this.getSelectedLoginColumnKeys();
    if (this.isTableSelected("users") && userColumns.length === 0) {
      this.snackBar.open("Bang User chua chon cot nao.", "Dong", { duration: 3e3 });
      return;
    }
    if (this.isTableSelected("loginLogs") && loginColumns.length === 0) {
      this.snackBar.open("Bang Login Status chua chon cot nao.", "Dong", { duration: 3e3 });
      return;
    }
    this.reportLoading.set(true);
    this.authService.downloadCombinedAdminReport(format, selectedTables, userColumns, loginColumns).subscribe({
      next: (response) => {
        const contentDisposition = response.headers.get("content-disposition");
        const fallbackFileName = `Combined_Admin_Report.${format}`;
        const fileName = this.extractFileName(contentDisposition, fallbackFileName);
        const blob = response.body;
        if (!blob) {
          this.reportLoading.set(false);
          this.snackBar.open("Khong co du lieu file de tai.", "Dong", { duration: 4e3 });
          return;
        }
        this.triggerBrowserDownload(blob, fileName);
        this.reportLoading.set(false);
        this.snackBar.open(`Da tai ${fileName} thanh cong.`, "Dong", { duration: 3e3 });
      },
      error: (err) => {
        this.reportLoading.set(false);
        const fallbackMessage = "Khong the xuat bao cao luc nay. Vui long thu lai sau.";
        const message = typeof err === "object" && err !== null && "error" in err ? err.error?.message || fallbackMessage : fallbackMessage;
        this.snackBar.open(message, "Dong", { duration: 5e3 });
      }
    });
  }
  extractFileName(contentDisposition, fallback) {
    if (!contentDisposition) {
      return fallback;
    }
    const match = /filename="?([^"]+)"?/i.exec(contentDisposition);
    return match?.[1] ?? fallback;
  }
  triggerBrowserDownload(blob, fileName) {
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(downloadUrl);
  }
  formatLoginTime(value) {
    if (!value) {
      return "N/A";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleString("vi-VN");
  }
  static \u0275fac = function AdminPanel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminPanel)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminPanel, selectors: [["app-admin-panel"]], decls: 50, vars: 10, consts: [[1, "mx-auto", "max-w-6xl", "px-1", "py-2", "sm:px-2"], [1, "mb-6", "flex", "flex-col", "gap-3", "sm:mb-8", "sm:flex-row", "sm:items-center", "sm:justify-between"], [1, "text-3xl", "font-extrabold", "text-slate-800", "tracking-tight"], [1, "text-slate-500"], [1, "flex", "flex-wrap", "gap-2"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "mr-2"], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"], ["mat-stroked-button", "", "color", "primary", 3, "click", "disabled"], [1, "mb-4", "rounded-3xl", "border-none", "shadow-xl"], [1, "p-4", "sm:p-6"], [1, "flex", "flex-col", "gap-3", "sm:flex-row", "sm:items-center", "sm:justify-between"], [1, "text-sm", "font-semibold", "uppercase", "tracking-wider", "text-slate-500"], [1, "text-xs", "text-slate-400"], [1, "mt-4", "rounded-xl", "border", "border-slate-200", "p-4"], [1, "mb-2", "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-slate-500"], [1, "flex", "flex-wrap", "gap-6"], [3, "change", "checked"], [1, "mb-4", "rounded-xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-700"], [1, "flex", "justify-center", "items-center", "py-20"], [1, "overflow-hidden", "rounded-3xl", "border-none", "shadow-xl"], [1, "mt-8", "mb-4", "overflow-hidden", "rounded-3xl", "border-none", "shadow-xl"], [1, "border-b", "border-slate-100", "px-4", "py-3", "sm:px-6"], [1, "text-lg", "font-semibold", "text-slate-700"], [1, "text-sm", "text-slate-400"], [1, "flex", "items-center", "justify-center", "py-10"], [1, "mb-2", "flex", "flex-wrap", "items-center", "justify-between", "gap-2"], [1, "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-slate-500"], ["mat-stroked-button", "", "color", "primary", 3, "click"], [1, "flex", "flex-wrap", "gap-x-6", "gap-y-2"], [3, "checked"], ["diameter", "50"], [1, "overflow-x-auto"], ["mat-table", "", 1, "min-w-[760px]", "w-full", 3, "dataSource"], ["matColumnDef", "username"], ["mat-header-cell", "", "class", "bg-slate-50 text-slate-600 font-bold py-4", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "py-4", 4, "matCellDef"], ["matColumnDef", "email"], ["mat-cell", "", "class", "py-4 text-slate-600", 4, "matCellDef"], ["matColumnDef", "fullName"], ["mat-cell", "", "class", "py-4 text-slate-700", 4, "matCellDef"], ["matColumnDef", "dob"], ["mat-cell", "", "class", "py-4 text-slate-500", 4, "matCellDef"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", "class", "hover:bg-slate-50 transition-colors", 4, "matRowDef", "matRowDefColumns"], [1, "flex", "flex-col", "gap-3", "border-t", "border-slate-100", "px-4", "py-3", "sm:flex-row", "sm:items-center", "sm:justify-between", "sm:px-6"], [1, "text-center", "py-12", "bg-white"], ["mat-header-cell", "", 1, "bg-slate-50", "text-slate-600", "font-bold", "py-4"], ["mat-cell", "", 1, "py-4"], [1, "flex", "items-center", "gap-3"], [1, "w-8", "h-8", "rounded-full", "bg-primary/10", "flex", "items-center", "justify-center", "text-primary", "font-bold", "text-xs"], [1, "font-medium", "text-slate-700"], ["mat-cell", "", 1, "py-4", "text-slate-600"], ["mat-cell", "", 1, "py-4", "text-slate-700"], ["mat-cell", "", 1, "py-4", "text-slate-500"], ["mat-icon-button", "", "color", "primary", "matTooltip", "View Details"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Delete User"], ["mat-header-row", ""], ["mat-row", "", 1, "hover:bg-slate-50", "transition-colors"], [1, "text-sm", "text-slate-500"], [1, "text-slate-400"], [1, "flex", "max-w-full", "flex-wrap", "gap-2"], ["mat-stroked-button", "", "color", "primary", 3, "disabled"], ["mat-stroked-button", "", "color", "primary", 3, "matTooltip"], ["mat-stroked-button", "", "color", "primary", 3, "click", "matTooltip"], [1, "scale-[2]", "text-slate-200", "mb-4"], ["diameter", "40"], ["matColumnDef", "loginId"], ["matColumnDef", "loginTime"], ["matColumnDef", "status"], [1, "py-8", "text-center"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "px-4", "py-3", "sm:px-6"], [1, "rounded-full", "px-3", "py-1", "text-xs", "font-semibold"]], template: function AdminPanel_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275text(4, "User Management");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "View and manage all registered users in the system.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 4)(8, "button", 5);
      \u0275\u0275listener("click", function AdminPanel_Template_button_click_8_listener() {
        return ctx.onRefreshData();
      });
      \u0275\u0275elementStart(9, "mat-icon", 6);
      \u0275\u0275text(10, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, " Refresh Data ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "button", 7);
      \u0275\u0275listener("click", function AdminPanel_Template_button_click_12_listener() {
        return ctx.onDownloadReport("pdf");
      });
      \u0275\u0275elementStart(13, "mat-icon", 6);
      \u0275\u0275text(14, "picture_as_pdf");
      \u0275\u0275elementEnd();
      \u0275\u0275text(15, " Xuat PDF ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "button", 8);
      \u0275\u0275listener("click", function AdminPanel_Template_button_click_16_listener() {
        return ctx.onDownloadReport("xlsx");
      });
      \u0275\u0275elementStart(17, "mat-icon", 6);
      \u0275\u0275text(18, "table_view");
      \u0275\u0275elementEnd();
      \u0275\u0275text(19, " Xuat Excel ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "mat-card", 9)(21, "div", 10)(22, "div", 11)(23, "div")(24, "h3", 12);
      \u0275\u0275text(25, "Chon bang va cot de xuat");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "p", 13);
      \u0275\u0275text(27, " Co the chon 1 bang hoac ca 2 bang, moi bang chon cot rieng. ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "div", 14)(29, "h4", 15);
      \u0275\u0275text(30, "Bang can xuat");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div", 16)(32, "mat-checkbox", 17);
      \u0275\u0275listener("change", function AdminPanel_Template_mat_checkbox_change_32_listener($event) {
        return ctx.onToggleTable("users", $event.checked);
      });
      \u0275\u0275text(33, " User Management ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "mat-checkbox", 17);
      \u0275\u0275listener("change", function AdminPanel_Template_mat_checkbox_change_34_listener($event) {
        return ctx.onToggleTable("loginLogs", $event.checked);
      });
      \u0275\u0275text(35, " Admin Login Status ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(36, AdminPanel_Conditional_36_Template, 16, 0, "div", 14);
      \u0275\u0275conditionalCreate(37, AdminPanel_Conditional_37_Template, 16, 0, "div", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(38, AdminPanel_Conditional_38_Template, 2, 1, "div", 18);
      \u0275\u0275conditionalCreate(39, AdminPanel_Conditional_39_Template, 2, 1, "div", 18);
      \u0275\u0275conditionalCreate(40, AdminPanel_Conditional_40_Template, 2, 0, "div", 19)(41, AdminPanel_Conditional_41_Template, 22, 5, "mat-card", 20);
      \u0275\u0275elementStart(42, "mat-card", 21)(43, "div", 22)(44, "h2", 23);
      \u0275\u0275text(45, "Admin Login Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "p", 24);
      \u0275\u0275text(47, "Bang rieng theo doi trang thai dang nhap (5 cot).");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(48, AdminPanel_Conditional_48_Template, 2, 0, "div", 25)(49, AdminPanel_Conditional_49_Template, 21, 4);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275property("disabled", ctx.reportLoading());
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.reportLoading());
      \u0275\u0275advance(16);
      \u0275\u0275property("checked", ctx.selectedTables().users);
      \u0275\u0275advance(2);
      \u0275\u0275property("checked", ctx.selectedTables().loginLogs);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isTableSelected("users") ? 36 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isTableSelected("loginLogs") ? 37 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 38 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loginLogsErrorMessage() ? 39 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 40 : 41);
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.loginLogsLoading() ? 48 : 49);
    }
  }, dependencies: [
    MatCardModule,
    MatCard,
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
    MatRow,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatCheckboxModule,
    MatCheckbox,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatSnackBarModule,
    MatTooltipModule,
    MatTooltip
  ], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=admin-panel.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminPanel, [{
    type: Component,
    args: [{ selector: "app-admin-panel", standalone: true, imports: [
      MatCardModule,
      MatTableModule,
      MatIconModule,
      MatButtonModule,
      MatCheckboxModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      MatTooltipModule
    ], template: `<div class="mx-auto max-w-6xl px-1 py-2 sm:px-2">
  <div class="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">User Management</h1>
      <p class="text-slate-500">View and manage all registered users in the system.</p>
    </div>
    <div class="flex flex-wrap gap-2">
      <button mat-flat-button color="primary" (click)="onRefreshData()">
        <mat-icon class="mr-2">refresh</mat-icon> Refresh Data
      </button>
      <button
        mat-flat-button
        color="primary"
        [disabled]="reportLoading()"
        (click)="onDownloadReport('pdf')"
      >
        <mat-icon class="mr-2">picture_as_pdf</mat-icon> Xuat PDF
      </button>
      <button
        mat-stroked-button
        color="primary"
        [disabled]="reportLoading()"
        (click)="onDownloadReport('xlsx')"
      >
        <mat-icon class="mr-2">table_view</mat-icon> Xuat Excel
      </button>
    </div>
  </div>

  <mat-card class="mb-4 rounded-3xl border-none shadow-xl">
    <div class="p-4 sm:p-6">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500">Chon bang va cot de xuat</h3>
          <p class="text-xs text-slate-400">
            Co the chon 1 bang hoac ca 2 bang, moi bang chon cot rieng.
          </p>
        </div>
      </div>

      <div class="mt-4 rounded-xl border border-slate-200 p-4">
        <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Bang can xuat</h4>
        <div class="flex flex-wrap gap-6">
          <mat-checkbox
            [checked]="selectedTables().users"
            (change)="onToggleTable('users', $event.checked)"
          >
            User Management
          </mat-checkbox>
          <mat-checkbox
            [checked]="selectedTables().loginLogs"
            (change)="onToggleTable('loginLogs', $event.checked)"
          >
            Admin Login Status
          </mat-checkbox>
        </div>
      </div>

      @if (isTableSelected('users')) {
        <div class="mt-4 rounded-xl border border-slate-200 p-4">
          <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-500">Cot bang User</h4>
            <div class="flex flex-wrap gap-2">
              <button mat-stroked-button color="primary" (click)="onSelectAllUserColumns()">
                <mat-icon class="mr-2">done_all</mat-icon> Chon tat ca
              </button>
              <button mat-stroked-button color="primary" (click)="onClearAllUserColumns()">
                <mat-icon class="mr-2">remove_done</mat-icon> Bo chon tat ca
              </button>
            </div>
          </div>
          <div class="flex flex-wrap gap-x-6 gap-y-2">
            @for (col of exportUserColumns; track col.key) {
              <mat-checkbox
                [checked]="selectedUserColumns()[col.key]"
                (change)="onToggleUserColumn(col.key, $event.checked)"
              >
                {{ col.label }}
              </mat-checkbox>
            }
          </div>
        </div>
      }

      @if (isTableSelected('loginLogs')) {
        <div class="mt-4 rounded-xl border border-slate-200 p-4">
          <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Cot bang Login Status
            </h4>
            <div class="flex flex-wrap gap-2">
              <button mat-stroked-button color="primary" (click)="onSelectAllLoginColumns()">
                <mat-icon class="mr-2">done_all</mat-icon> Chon tat ca
              </button>
              <button mat-stroked-button color="primary" (click)="onClearAllLoginColumns()">
                <mat-icon class="mr-2">remove_done</mat-icon> Bo chon tat ca
              </button>
            </div>
          </div>
          <div class="flex flex-wrap gap-x-6 gap-y-2">
            @for (col of exportLoginColumns; track col.key) {
              <mat-checkbox
                [checked]="selectedLoginColumns()[col.key]"
                (change)="onToggleLoginColumn(col.key, $event.checked)"
              >
                {{ col.label }}
              </mat-checkbox>
            }
          </div>
        </div>
      }
    </div>
  </mat-card>

  @if (errorMessage()) {
    <div class="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {{ errorMessage() }}
    </div>
  }

  @if (loginLogsErrorMessage()) {
    <div class="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {{ loginLogsErrorMessage() }}
    </div>
  }

  @if (loading()) {
    <div class="flex justify-center items-center py-20">
      <mat-spinner diameter="50"></mat-spinner>
    </div>
  } @else {
    <mat-card class="overflow-hidden rounded-3xl border-none shadow-xl">
      <div class="overflow-x-auto">
        <table mat-table [dataSource]="profiles()" class="min-w-[760px] w-full">
        
        <ng-container matColumnDef="username">
          <th mat-header-cell *matHeaderCellDef class="bg-slate-50 text-slate-600 font-bold py-4">Username</th>
          <td mat-cell *matCellDef="let profile" class="py-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                {{ profile.username?.charAt(0)?.toUpperCase() ?? '?' }}
              </div>
              <span class="font-medium text-slate-700">{{ profile.username }}</span>
            </div>
          </td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef class="bg-slate-50 text-slate-600 font-bold py-4">Email</th>
          <td mat-cell *matCellDef="let profile" class="py-4 text-slate-600">{{ profile.email }}</td>
        </ng-container>

        <ng-container matColumnDef="fullName">
          <th mat-header-cell *matHeaderCellDef class="bg-slate-50 text-slate-600 font-bold py-4">Full Name</th>
          <td mat-cell *matCellDef="let profile" class="py-4 text-slate-700">{{ profile.firstName }} {{ profile.lastName }}</td>
        </ng-container>

        <ng-container matColumnDef="dob">
          <th mat-header-cell *matHeaderCellDef class="bg-slate-50 text-slate-600 font-bold py-4">Date of Birth</th>
          <td mat-cell *matCellDef="let profile" class="py-4 text-slate-500">{{ profile.dob }}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef class="bg-slate-50 text-slate-600 font-bold py-4">Actions</th>
          <td mat-cell *matCellDef="let profile" class="py-4">
            <button mat-icon-button color="primary" matTooltip="View Details">
              <mat-icon>visibility</mat-icon>
            </button>
            <button mat-icon-button color="warn" matTooltip="Delete User">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-slate-50 transition-colors"></tr>
        </table>
      </div>

      @if (userTotalElements() > 0) {
        <div
          class="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <p class="text-sm text-slate-500">
            Trang {{ getUserDisplayPageOneBased() }} / {{ userTotalPages() }}
            <span class="text-slate-400">({{ userTotalElements() }} user)</span>
          </p>
          <div class="flex max-w-full flex-wrap gap-2">
            <button
              mat-stroked-button
              color="primary"
              [disabled]="userPageIndex() <= 0"
              (click)="goToUserPreviousPage()"
            >
              Truoc
            </button>

            @for (page of getUserPageNumberButtons(); track page) {
              <button
                mat-stroked-button
                color="primary"
                [disabled]="page === getUserDisplayPageOneBased()"
                (click)="goToUserPageOneBased(page)"
              >
                {{ page }}
              </button>
            }

            @if (showUserManyPagesHint()) {
              <button
                mat-stroked-button
                color="primary"
                [matTooltip]="'Sang cum trang tiep theo bat dau tu trang ' + getUserNextPageBlockLabel()"
                (click)="goToNextUserPageBlock()"
              >
                {{ getUserNextPageBlockLabel() }}
              </button>
            }

            <button
              mat-stroked-button
              color="primary"
              [disabled]="userPageIndex() + 1 >= userTotalPages()"
              (click)="goToUserNextPage()"
            >
              Sau
            </button>
          </div>
        </div>
      }

      @if (userTotalElements() === 0) {
        <div class="text-center py-12 bg-white">
          <mat-icon class="scale-[2] text-slate-200 mb-4">group_off</mat-icon>
          <p class="text-slate-400">No users found in the system.</p>
        </div>
      }
    </mat-card>
  }

  <mat-card class="mt-8 mb-4 overflow-hidden rounded-3xl border-none shadow-xl">
    <div class="border-b border-slate-100 px-4 py-3 sm:px-6">
      <h2 class="text-lg font-semibold text-slate-700">Admin Login Status</h2>
      <p class="text-sm text-slate-400">Bang rieng theo doi trang thai dang nhap (5 cot).</p>
    </div>

    @if (loginLogsLoading()) {
      <div class="flex items-center justify-center py-10">
        <mat-spinner diameter="40"></mat-spinner>
      </div>
    } @else {
      <div class="overflow-x-auto">
        <table mat-table [dataSource]="getPagedLoginLogs()" class="min-w-[760px] w-full">
          <ng-container matColumnDef="loginId">
            <th mat-header-cell *matHeaderCellDef class="bg-slate-50 text-slate-600 font-bold py-4">
              Login ID
            </th>
            <td mat-cell *matCellDef="let log" class="py-4 text-slate-700">
              {{ log.loginId }}
            </td>
          </ng-container>

          <ng-container matColumnDef="username">
            <th mat-header-cell *matHeaderCellDef class="bg-slate-50 text-slate-600 font-bold py-4">
              Username
            </th>
            <td mat-cell *matCellDef="let log" class="py-4 text-slate-700">
              {{ log.username || 'N/A' }}
            </td>
          </ng-container>

          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef class="bg-slate-50 text-slate-600 font-bold py-4">
              Email
            </th>
            <td mat-cell *matCellDef="let log" class="py-4 text-slate-600">
              {{ log.email || 'N/A' }}
            </td>
          </ng-container>

          <ng-container matColumnDef="loginTime">
            <th mat-header-cell *matHeaderCellDef class="bg-slate-50 text-slate-600 font-bold py-4">
              Login Time
            </th>
            <td mat-cell *matCellDef="let log" class="py-4 text-slate-600">
              {{ formatLoginTime(log.loginTime) }}
            </td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef class="bg-slate-50 text-slate-600 font-bold py-4">
              Status
            </th>
            <td mat-cell *matCellDef="let log" class="py-4">
              <span
                class="rounded-full px-3 py-1 text-xs font-semibold"
                [class.bg-emerald-100]="log.status === 'SUCCESS'"
                [class.text-emerald-700]="log.status === 'SUCCESS'"
                [class.bg-rose-100]="log.status === 'FAILED'"
                [class.text-rose-700]="log.status === 'FAILED'"
              >
                {{ log.status }}
              </span>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="loginLogDisplayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: loginLogDisplayedColumns;" class="hover:bg-slate-50 transition-colors"></tr>
        </table>
      </div>

      @if (loginLogs().length === 0) {
        <div class="py-8 text-center">
          <p class="text-sm text-slate-400">Chua co login log nao.</p>
        </div>
      } @else {
        <div class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 sm:px-6">
          <p class="text-sm text-slate-500">
            Trang {{ loginLogsPage() }} / {{ getTotalLoginLogPages() }}
          </p>
          <div class="flex flex-wrap gap-2">
            <button
              mat-stroked-button
              color="primary"
              [disabled]="loginLogsPage() <= 1"
              (click)="goToPreviousLoginLogPage()"
            >
              Truoc
            </button>

            @for (page of getLoginLogPageNumbers(); track page) {
              <button
                mat-stroked-button
                color="primary"
                [disabled]="page === loginLogsPage()"
                (click)="goToLoginLogPage(page)"
              >
                {{ page }}
              </button>
            }

            <button
              mat-stroked-button
              color="primary"
              [disabled]="loginLogsPage() >= getTotalLoginLogPages()"
              (click)="goToNextLoginLogPage()"
            >
              Sau
            </button>
          </div>
        </div>
      }
    }
  </mat-card>
</div>
`, styles: ["/* src/admin/admin-panel.css */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=admin-panel.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminPanel, { className: "AdminPanel", filePath: "src/admin/admin-panel.ts", lineNumber: 43 });
})();
export {
  AdminPanel
};
//# sourceMappingURL=chunk-H5BKDLZH.js.map

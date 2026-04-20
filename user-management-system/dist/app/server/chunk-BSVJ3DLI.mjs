import './polyfills.server.mjs';
import {
  takeUntilDestroyed
} from "./chunk-Y7KOXAQG.mjs";
import {
  WebSocketNotificationService
} from "./chunk-WYZV3VRF.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
  MatTooltipModule
} from "./chunk-S3UY3SE7.mjs";
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
} from "./chunk-UB43ZL2Z.mjs";
import {
  MatTooltip
} from "./chunk-JRH5C5AM.mjs";
import {
  MatFormFieldModule,
  MatInput,
  MatInputModule
} from "./chunk-I4RETCVM.mjs";
import {
  MatFormField,
  MatLabel
} from "./chunk-WYKAF53W.mjs";
import "./chunk-VLFDYGMK.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-YNQSOLVU.mjs";
import {
  BasePortalOutlet,
  CdkPortalOutlet,
  CdkScrollable,
  ComponentPortal,
  MatSnackBar,
  MatSnackBarModule,
  OverlayConfig,
  OverlayContainer,
  OverlayModule,
  OverlayRef,
  PortalModule,
  TemplatePortal,
  createBlockScrollStrategy,
  createGlobalPositionStrategy,
  createOverlayRef
} from "./chunk-FHMMHGIL.mjs";
import {
  MatCard,
  MatCardModule
} from "./chunk-P5PMDT6H.mjs";
import {
  A11yModule,
  AuthService,
  BidiModule,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DOCUMENT,
  DestroyRef,
  Directionality,
  Directive,
  ESCAPE,
  ElementRef,
  EventEmitter,
  FocusMonitor,
  FocusTrapFactory,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  InteractivityChecker,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule,
  NgModule,
  NgZone,
  Platform,
  Renderer2,
  ReplaySubject,
  Router,
  Subject,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  _IdGenerator,
  _animationsDisabled,
  _getFocusedElementPierceShadowDom,
  afterNextRender,
  coerceNumberProperty,
  computed,
  defer,
  filter,
  hasModifierKey,
  inject,
  merge,
  setClassMetadata,
  signal,
  startWith,
  take,
  ɵsetClassDebugInfo,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-6QMG6ZEG.mjs";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-ML5XS5HX.mjs";

// node_modules/@angular/cdk/fesm2022/dialog.mjs
function CdkDialogContainer_ng_template_0_Template(rf, ctx) {
}
var DialogConfig = class {
  viewContainerRef;
  injector;
  id;
  role = "dialog";
  panelClass = "";
  hasBackdrop = true;
  backdropClass = "";
  disableClose = false;
  closePredicate;
  width = "";
  height = "";
  minWidth;
  minHeight;
  maxWidth;
  maxHeight;
  positionStrategy;
  data = null;
  direction;
  ariaDescribedBy = null;
  ariaLabelledBy = null;
  ariaLabel = null;
  ariaModal = false;
  autoFocus = "first-tabbable";
  restoreFocus = true;
  scrollStrategy;
  closeOnNavigation = true;
  closeOnDestroy = true;
  closeOnOverlayDetachments = true;
  disableAnimations = false;
  providers;
  container;
  templateContext;
};
function throwDialogContentAlreadyAttachedError() {
  throw Error("Attempting to attach dialog content after content is already attached");
}
var CdkDialogContainer = class _CdkDialogContainer extends BasePortalOutlet {
  _elementRef = inject(ElementRef);
  _focusTrapFactory = inject(FocusTrapFactory);
  _config;
  _interactivityChecker = inject(InteractivityChecker);
  _ngZone = inject(NgZone);
  _focusMonitor = inject(FocusMonitor);
  _renderer = inject(Renderer2);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _injector = inject(Injector);
  _platform = inject(Platform);
  _document = inject(DOCUMENT);
  _portalOutlet;
  _focusTrapped = new Subject();
  _focusTrap = null;
  _elementFocusedBeforeDialogWasOpened = null;
  _closeInteractionType = null;
  _ariaLabelledByQueue = [];
  _isDestroyed = false;
  constructor() {
    super();
    this._config = inject(DialogConfig, {
      optional: true
    }) || new DialogConfig();
    if (this._config.ariaLabelledBy) {
      this._ariaLabelledByQueue.push(this._config.ariaLabelledBy);
    }
  }
  _addAriaLabelledBy(id) {
    this._ariaLabelledByQueue.push(id);
    this._changeDetectorRef.markForCheck();
  }
  _removeAriaLabelledBy(id) {
    const index = this._ariaLabelledByQueue.indexOf(id);
    if (index > -1) {
      this._ariaLabelledByQueue.splice(index, 1);
      this._changeDetectorRef.markForCheck();
    }
  }
  _contentAttached() {
    this._initializeFocusTrap();
    this._captureInitialFocus();
  }
  _captureInitialFocus() {
    this._trapFocus();
  }
  ngOnDestroy() {
    this._focusTrapped.complete();
    this._isDestroyed = true;
    this._restoreFocus();
  }
  attachComponentPortal(portal) {
    if (this._portalOutlet.hasAttached() && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throwDialogContentAlreadyAttachedError();
    }
    const result = this._portalOutlet.attachComponentPortal(portal);
    this._contentAttached();
    return result;
  }
  attachTemplatePortal(portal) {
    if (this._portalOutlet.hasAttached() && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throwDialogContentAlreadyAttachedError();
    }
    const result = this._portalOutlet.attachTemplatePortal(portal);
    this._contentAttached();
    return result;
  }
  attachDomPortal = (portal) => {
    if (this._portalOutlet.hasAttached() && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throwDialogContentAlreadyAttachedError();
    }
    const result = this._portalOutlet.attachDomPortal(portal);
    this._contentAttached();
    return result;
  };
  _recaptureFocus() {
    if (!this._containsFocus()) {
      this._trapFocus();
    }
  }
  _forceFocus(element, options) {
    if (!this._interactivityChecker.isFocusable(element)) {
      element.tabIndex = -1;
      this._ngZone.runOutsideAngular(() => {
        const callback = () => {
          deregisterBlur();
          deregisterMousedown();
          element.removeAttribute("tabindex");
        };
        const deregisterBlur = this._renderer.listen(element, "blur", callback);
        const deregisterMousedown = this._renderer.listen(element, "mousedown", callback);
      });
    }
    element.focus(options);
  }
  _focusByCssSelector(selector, options) {
    let elementToFocus = this._elementRef.nativeElement.querySelector(selector);
    if (elementToFocus) {
      this._forceFocus(elementToFocus, options);
    }
  }
  _trapFocus(options) {
    if (this._isDestroyed) {
      return;
    }
    afterNextRender(() => {
      const element = this._elementRef.nativeElement;
      switch (this._config.autoFocus) {
        case false:
        case "dialog":
          if (!this._containsFocus()) {
            element.focus(options);
          }
          break;
        case true:
        case "first-tabbable":
          const focusedSuccessfully = this._focusTrap?.focusInitialElement(options);
          if (!focusedSuccessfully) {
            this._focusDialogContainer(options);
          }
          break;
        case "first-heading":
          this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]', options);
          break;
        default:
          this._focusByCssSelector(this._config.autoFocus, options);
          break;
      }
      this._focusTrapped.next();
    }, {
      injector: this._injector
    });
  }
  _restoreFocus() {
    const focusConfig = this._config.restoreFocus;
    let focusTargetElement = null;
    if (typeof focusConfig === "string") {
      focusTargetElement = this._document.querySelector(focusConfig);
    } else if (typeof focusConfig === "boolean") {
      focusTargetElement = focusConfig ? this._elementFocusedBeforeDialogWasOpened : null;
    } else if (focusConfig) {
      focusTargetElement = focusConfig;
    }
    if (this._config.restoreFocus && focusTargetElement && typeof focusTargetElement.focus === "function") {
      const activeElement = _getFocusedElementPierceShadowDom();
      const element = this._elementRef.nativeElement;
      if (!activeElement || activeElement === this._document.body || activeElement === element || element.contains(activeElement)) {
        if (this._focusMonitor) {
          this._focusMonitor.focusVia(focusTargetElement, this._closeInteractionType);
          this._closeInteractionType = null;
        } else {
          focusTargetElement.focus();
        }
      }
    }
    if (this._focusTrap) {
      this._focusTrap.destroy();
    }
  }
  _focusDialogContainer(options) {
    this._elementRef.nativeElement.focus?.(options);
  }
  _containsFocus() {
    const element = this._elementRef.nativeElement;
    const activeElement = _getFocusedElementPierceShadowDom();
    return element === activeElement || element.contains(activeElement);
  }
  _initializeFocusTrap() {
    if (this._platform.isBrowser) {
      this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
      if (this._document) {
        this._elementFocusedBeforeDialogWasOpened = _getFocusedElementPierceShadowDom();
      }
    }
  }
  static \u0275fac = function CdkDialogContainer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkDialogContainer)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _CdkDialogContainer,
    selectors: [["cdk-dialog-container"]],
    viewQuery: function CdkDialogContainer_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(CdkPortalOutlet, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._portalOutlet = _t.first);
      }
    },
    hostAttrs: ["tabindex", "-1", 1, "cdk-dialog-container"],
    hostVars: 6,
    hostBindings: function CdkDialogContainer_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("id", ctx._config.id || null)("role", ctx._config.role)("aria-modal", ctx._config.ariaModal)("aria-labelledby", ctx._config.ariaLabel ? null : ctx._ariaLabelledByQueue[0])("aria-label", ctx._config.ariaLabel)("aria-describedby", ctx._config.ariaDescribedBy || null);
      }
    },
    features: [\u0275\u0275InheritDefinitionFeature],
    decls: 1,
    vars: 0,
    consts: [["cdkPortalOutlet", ""]],
    template: function CdkDialogContainer_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, CdkDialogContainer_ng_template_0_Template, 0, 0, "ng-template", 0);
      }
    },
    dependencies: [CdkPortalOutlet],
    styles: [".cdk-dialog-container {\n  display: block;\n  width: 100%;\n  height: 100%;\n  min-height: inherit;\n  max-height: inherit;\n}\n"],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDialogContainer, [{
    type: Component,
    args: [{
      selector: "cdk-dialog-container",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.Default,
      imports: [CdkPortalOutlet],
      host: {
        "class": "cdk-dialog-container",
        "tabindex": "-1",
        "[attr.id]": "_config.id || null",
        "[attr.role]": "_config.role",
        "[attr.aria-modal]": "_config.ariaModal",
        "[attr.aria-labelledby]": "_config.ariaLabel ? null : _ariaLabelledByQueue[0]",
        "[attr.aria-label]": "_config.ariaLabel",
        "[attr.aria-describedby]": "_config.ariaDescribedBy || null"
      },
      template: "<ng-template cdkPortalOutlet />\n",
      styles: [".cdk-dialog-container {\n  display: block;\n  width: 100%;\n  height: 100%;\n  min-height: inherit;\n  max-height: inherit;\n}\n"]
    }]
  }], () => [], {
    _portalOutlet: [{
      type: ViewChild,
      args: [CdkPortalOutlet, {
        static: true
      }]
    }]
  });
})();
var DialogRef = class {
  overlayRef;
  config;
  componentInstance = null;
  componentRef = null;
  containerInstance;
  disableClose;
  closed = new Subject();
  backdropClick;
  keydownEvents;
  outsidePointerEvents;
  id;
  _detachSubscription;
  constructor(overlayRef, config) {
    this.overlayRef = overlayRef;
    this.config = config;
    this.disableClose = config.disableClose;
    this.backdropClick = overlayRef.backdropClick();
    this.keydownEvents = overlayRef.keydownEvents();
    this.outsidePointerEvents = overlayRef.outsidePointerEvents();
    this.id = config.id;
    this.keydownEvents.subscribe((event) => {
      if (event.keyCode === ESCAPE && !this.disableClose && !hasModifierKey(event)) {
        event.preventDefault();
        this.close(void 0, {
          focusOrigin: "keyboard"
        });
      }
    });
    this.backdropClick.subscribe(() => {
      if (!this.disableClose && this._canClose()) {
        this.close(void 0, {
          focusOrigin: "mouse"
        });
      } else {
        this.containerInstance._recaptureFocus?.();
      }
    });
    this._detachSubscription = overlayRef.detachments().subscribe(() => {
      if (config.closeOnOverlayDetachments !== false) {
        this.close();
      }
    });
  }
  close(result, options) {
    if (this._canClose(result)) {
      const closedSubject = this.closed;
      this.containerInstance._closeInteractionType = options?.focusOrigin || "program";
      this._detachSubscription.unsubscribe();
      this.overlayRef.dispose();
      closedSubject.next(result);
      closedSubject.complete();
      this.componentInstance = this.containerInstance = null;
    }
  }
  updatePosition() {
    this.overlayRef.updatePosition();
    return this;
  }
  updateSize(width = "", height = "") {
    this.overlayRef.updateSize({
      width,
      height
    });
    return this;
  }
  addPanelClass(classes) {
    this.overlayRef.addPanelClass(classes);
    return this;
  }
  removePanelClass(classes) {
    this.overlayRef.removePanelClass(classes);
    return this;
  }
  _canClose(result) {
    const config = this.config;
    return !!this.containerInstance && (!config.closePredicate || config.closePredicate(result, config, this.componentInstance));
  }
};
var DIALOG_SCROLL_STRATEGY = new InjectionToken("DialogScrollStrategy", {
  providedIn: "root",
  factory: () => {
    const injector = inject(Injector);
    return () => createBlockScrollStrategy(injector);
  }
});
var DIALOG_DATA = new InjectionToken("DialogData");
var DEFAULT_DIALOG_CONFIG = new InjectionToken("DefaultDialogConfig");
function getDirectionality(value) {
  const valueSignal = signal(value, ...ngDevMode ? [{
    debugName: "valueSignal"
  }] : []);
  const change = new EventEmitter();
  return {
    valueSignal,
    get value() {
      return valueSignal();
    },
    change,
    ngOnDestroy() {
      change.complete();
    }
  };
}
var Dialog = class _Dialog {
  _injector = inject(Injector);
  _defaultOptions = inject(DEFAULT_DIALOG_CONFIG, {
    optional: true
  });
  _parentDialog = inject(_Dialog, {
    optional: true,
    skipSelf: true
  });
  _overlayContainer = inject(OverlayContainer);
  _idGenerator = inject(_IdGenerator);
  _openDialogsAtThisLevel = [];
  _afterAllClosedAtThisLevel = new Subject();
  _afterOpenedAtThisLevel = new Subject();
  _ariaHiddenElements = /* @__PURE__ */ new Map();
  _scrollStrategy = inject(DIALOG_SCROLL_STRATEGY);
  get openDialogs() {
    return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
  }
  get afterOpened() {
    return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpenedAtThisLevel;
  }
  afterAllClosed = defer(() => this.openDialogs.length ? this._getAfterAllClosed() : this._getAfterAllClosed().pipe(startWith(void 0)));
  constructor() {
  }
  open(componentOrTemplateRef, config) {
    const defaults = this._defaultOptions || new DialogConfig();
    config = __spreadValues(__spreadValues({}, defaults), config);
    config.id = config.id || this._idGenerator.getId("cdk-dialog-");
    if (config.id && this.getDialogById(config.id) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
    }
    const overlayConfig = this._getOverlayConfig(config);
    const overlayRef = createOverlayRef(this._injector, overlayConfig);
    const dialogRef = new DialogRef(overlayRef, config);
    const dialogContainer = this._attachContainer(overlayRef, dialogRef, config);
    dialogRef.containerInstance = dialogContainer;
    if (!this.openDialogs.length) {
      const overlayContainer = this._overlayContainer.getContainerElement();
      if (dialogContainer._focusTrapped) {
        dialogContainer._focusTrapped.pipe(take(1)).subscribe(() => {
          this._hideNonDialogContentFromAssistiveTechnology(overlayContainer);
        });
      } else {
        this._hideNonDialogContentFromAssistiveTechnology(overlayContainer);
      }
    }
    this._attachDialogContent(componentOrTemplateRef, dialogRef, dialogContainer, config);
    this.openDialogs.push(dialogRef);
    dialogRef.closed.subscribe(() => this._removeOpenDialog(dialogRef, true));
    this.afterOpened.next(dialogRef);
    return dialogRef;
  }
  closeAll() {
    reverseForEach(this.openDialogs, (dialog) => dialog.close());
  }
  getDialogById(id) {
    return this.openDialogs.find((dialog) => dialog.id === id);
  }
  ngOnDestroy() {
    reverseForEach(this._openDialogsAtThisLevel, (dialog) => {
      if (dialog.config.closeOnDestroy === false) {
        this._removeOpenDialog(dialog, false);
      }
    });
    reverseForEach(this._openDialogsAtThisLevel, (dialog) => dialog.close());
    this._afterAllClosedAtThisLevel.complete();
    this._afterOpenedAtThisLevel.complete();
    this._openDialogsAtThisLevel = [];
  }
  _getOverlayConfig(config) {
    const state = new OverlayConfig({
      positionStrategy: config.positionStrategy || createGlobalPositionStrategy().centerHorizontally().centerVertically(),
      scrollStrategy: config.scrollStrategy || this._scrollStrategy(),
      panelClass: config.panelClass,
      hasBackdrop: config.hasBackdrop,
      direction: config.direction,
      minWidth: config.minWidth,
      minHeight: config.minHeight,
      maxWidth: config.maxWidth,
      maxHeight: config.maxHeight,
      width: config.width,
      height: config.height,
      disposeOnNavigation: config.closeOnNavigation,
      disableAnimations: config.disableAnimations
    });
    if (config.backdropClass) {
      state.backdropClass = config.backdropClass;
    }
    return state;
  }
  _attachContainer(overlay, dialogRef, config) {
    const userInjector = config.injector || config.viewContainerRef?.injector;
    const providers = [{
      provide: DialogConfig,
      useValue: config
    }, {
      provide: DialogRef,
      useValue: dialogRef
    }, {
      provide: OverlayRef,
      useValue: overlay
    }];
    let containerType;
    if (config.container) {
      if (typeof config.container === "function") {
        containerType = config.container;
      } else {
        containerType = config.container.type;
        providers.push(...config.container.providers(config));
      }
    } else {
      containerType = CdkDialogContainer;
    }
    const containerPortal = new ComponentPortal(containerType, config.viewContainerRef, Injector.create({
      parent: userInjector || this._injector,
      providers
    }));
    const containerRef = overlay.attach(containerPortal);
    return containerRef.instance;
  }
  _attachDialogContent(componentOrTemplateRef, dialogRef, dialogContainer, config) {
    if (componentOrTemplateRef instanceof TemplateRef) {
      const injector = this._createInjector(config, dialogRef, dialogContainer, void 0);
      let context = {
        $implicit: config.data,
        dialogRef
      };
      if (config.templateContext) {
        context = __spreadValues(__spreadValues({}, context), typeof config.templateContext === "function" ? config.templateContext() : config.templateContext);
      }
      dialogContainer.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, null, context, injector));
    } else {
      const injector = this._createInjector(config, dialogRef, dialogContainer, this._injector);
      const contentRef = dialogContainer.attachComponentPortal(new ComponentPortal(componentOrTemplateRef, config.viewContainerRef, injector));
      dialogRef.componentRef = contentRef;
      dialogRef.componentInstance = contentRef.instance;
    }
  }
  _createInjector(config, dialogRef, dialogContainer, fallbackInjector) {
    const userInjector = config.injector || config.viewContainerRef?.injector;
    const providers = [{
      provide: DIALOG_DATA,
      useValue: config.data
    }, {
      provide: DialogRef,
      useValue: dialogRef
    }];
    if (config.providers) {
      if (typeof config.providers === "function") {
        providers.push(...config.providers(dialogRef, config, dialogContainer));
      } else {
        providers.push(...config.providers);
      }
    }
    if (config.direction && (!userInjector || !userInjector.get(Directionality, null, {
      optional: true
    }))) {
      providers.push({
        provide: Directionality,
        useValue: getDirectionality(config.direction)
      });
    }
    return Injector.create({
      parent: userInjector || fallbackInjector,
      providers
    });
  }
  _removeOpenDialog(dialogRef, emitEvent) {
    const index = this.openDialogs.indexOf(dialogRef);
    if (index > -1) {
      this.openDialogs.splice(index, 1);
      if (!this.openDialogs.length) {
        this._ariaHiddenElements.forEach((previousValue, element) => {
          if (previousValue) {
            element.setAttribute("aria-hidden", previousValue);
          } else {
            element.removeAttribute("aria-hidden");
          }
        });
        this._ariaHiddenElements.clear();
        if (emitEvent) {
          this._getAfterAllClosed().next();
        }
      }
    }
  }
  _hideNonDialogContentFromAssistiveTechnology(overlayContainer) {
    if (overlayContainer.parentElement) {
      const siblings = overlayContainer.parentElement.children;
      for (let i = siblings.length - 1; i > -1; i--) {
        const sibling = siblings[i];
        if (sibling !== overlayContainer && sibling.nodeName !== "SCRIPT" && sibling.nodeName !== "STYLE" && !sibling.hasAttribute("aria-live") && !sibling.hasAttribute("popover")) {
          this._ariaHiddenElements.set(sibling, sibling.getAttribute("aria-hidden"));
          sibling.setAttribute("aria-hidden", "true");
        }
      }
    }
  }
  _getAfterAllClosed() {
    const parent = this._parentDialog;
    return parent ? parent._getAfterAllClosed() : this._afterAllClosedAtThisLevel;
  }
  static \u0275fac = function Dialog_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Dialog)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _Dialog,
    factory: _Dialog.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Dialog, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function reverseForEach(items, callback) {
  let i = items.length;
  while (i--) {
    callback(items[i]);
  }
}
var DialogModule = class _DialogModule {
  static \u0275fac = function DialogModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DialogModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _DialogModule,
    imports: [OverlayModule, PortalModule, A11yModule, CdkDialogContainer],
    exports: [PortalModule, CdkDialogContainer]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [Dialog],
    imports: [OverlayModule, PortalModule, A11yModule, PortalModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DialogModule, [{
    type: NgModule,
    args: [{
      imports: [OverlayModule, PortalModule, A11yModule, CdkDialogContainer],
      exports: [PortalModule, CdkDialogContainer],
      providers: [Dialog]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/dialog.mjs
function MatDialogContainer_ng_template_2_Template(rf, ctx) {
}
var MatDialogConfig = class {
  viewContainerRef;
  injector;
  id;
  role = "dialog";
  panelClass = "";
  hasBackdrop = true;
  backdropClass = "";
  disableClose = false;
  closePredicate;
  width = "";
  height = "";
  minWidth;
  minHeight;
  maxWidth;
  maxHeight;
  position;
  data = null;
  direction;
  ariaDescribedBy = null;
  ariaLabelledBy = null;
  ariaLabel = null;
  ariaModal = false;
  autoFocus = "first-tabbable";
  restoreFocus = true;
  delayFocusTrap = true;
  scrollStrategy;
  closeOnNavigation = true;
  enterAnimationDuration;
  exitAnimationDuration;
};
var OPEN_CLASS = "mdc-dialog--open";
var OPENING_CLASS = "mdc-dialog--opening";
var CLOSING_CLASS = "mdc-dialog--closing";
var OPEN_ANIMATION_DURATION = 150;
var CLOSE_ANIMATION_DURATION = 75;
var MatDialogContainer = class _MatDialogContainer extends CdkDialogContainer {
  _animationStateChanged = new EventEmitter();
  _animationsEnabled = !_animationsDisabled();
  _actionSectionCount = 0;
  _hostElement = this._elementRef.nativeElement;
  _enterAnimationDuration = this._animationsEnabled ? parseCssTime(this._config.enterAnimationDuration) ?? OPEN_ANIMATION_DURATION : 0;
  _exitAnimationDuration = this._animationsEnabled ? parseCssTime(this._config.exitAnimationDuration) ?? CLOSE_ANIMATION_DURATION : 0;
  _animationTimer = null;
  _contentAttached() {
    super._contentAttached();
    this._startOpenAnimation();
  }
  _startOpenAnimation() {
    this._animationStateChanged.emit({
      state: "opening",
      totalTime: this._enterAnimationDuration
    });
    if (this._animationsEnabled) {
      this._hostElement.style.setProperty(TRANSITION_DURATION_PROPERTY, `${this._enterAnimationDuration}ms`);
      this._requestAnimationFrame(() => this._hostElement.classList.add(OPENING_CLASS, OPEN_CLASS));
      this._waitForAnimationToComplete(this._enterAnimationDuration, this._finishDialogOpen);
    } else {
      this._hostElement.classList.add(OPEN_CLASS);
      Promise.resolve().then(() => this._finishDialogOpen());
    }
  }
  _startExitAnimation() {
    this._animationStateChanged.emit({
      state: "closing",
      totalTime: this._exitAnimationDuration
    });
    this._hostElement.classList.remove(OPEN_CLASS);
    if (this._animationsEnabled) {
      this._hostElement.style.setProperty(TRANSITION_DURATION_PROPERTY, `${this._exitAnimationDuration}ms`);
      this._requestAnimationFrame(() => this._hostElement.classList.add(CLOSING_CLASS));
      this._waitForAnimationToComplete(this._exitAnimationDuration, this._finishDialogClose);
    } else {
      Promise.resolve().then(() => this._finishDialogClose());
    }
  }
  _updateActionSectionCount(delta) {
    this._actionSectionCount += delta;
    this._changeDetectorRef.markForCheck();
  }
  _finishDialogOpen = () => {
    this._clearAnimationClasses();
    this._openAnimationDone(this._enterAnimationDuration);
  };
  _finishDialogClose = () => {
    this._clearAnimationClasses();
    this._animationStateChanged.emit({
      state: "closed",
      totalTime: this._exitAnimationDuration
    });
  };
  _clearAnimationClasses() {
    this._hostElement.classList.remove(OPENING_CLASS, CLOSING_CLASS);
  }
  _waitForAnimationToComplete(duration, callback) {
    if (this._animationTimer !== null) {
      clearTimeout(this._animationTimer);
    }
    this._animationTimer = setTimeout(callback, duration);
  }
  _requestAnimationFrame(callback) {
    this._ngZone.runOutsideAngular(() => {
      if (typeof requestAnimationFrame === "function") {
        requestAnimationFrame(callback);
      } else {
        callback();
      }
    });
  }
  _captureInitialFocus() {
    if (!this._config.delayFocusTrap) {
      this._trapFocus();
    }
  }
  _openAnimationDone(totalTime) {
    if (this._config.delayFocusTrap) {
      this._trapFocus();
    }
    this._animationStateChanged.next({
      state: "opened",
      totalTime
    });
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    if (this._animationTimer !== null) {
      clearTimeout(this._animationTimer);
    }
  }
  attachComponentPortal(portal) {
    const ref = super.attachComponentPortal(portal);
    ref.location.nativeElement.classList.add("mat-mdc-dialog-component-host");
    return ref;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatDialogContainer_BaseFactory;
    return function MatDialogContainer_Factory(__ngFactoryType__) {
      return (\u0275MatDialogContainer_BaseFactory || (\u0275MatDialogContainer_BaseFactory = \u0275\u0275getInheritedFactory(_MatDialogContainer)))(__ngFactoryType__ || _MatDialogContainer);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatDialogContainer,
    selectors: [["mat-dialog-container"]],
    hostAttrs: ["tabindex", "-1", 1, "mat-mdc-dialog-container", "mdc-dialog"],
    hostVars: 10,
    hostBindings: function MatDialogContainer_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275domProperty("id", ctx._config.id);
        \u0275\u0275attribute("aria-modal", ctx._config.ariaModal)("role", ctx._config.role)("aria-labelledby", ctx._config.ariaLabel ? null : ctx._ariaLabelledByQueue[0])("aria-label", ctx._config.ariaLabel)("aria-describedby", ctx._config.ariaDescribedBy || null);
        \u0275\u0275classProp("_mat-animation-noopable", !ctx._animationsEnabled)("mat-mdc-dialog-container-with-actions", ctx._actionSectionCount > 0);
      }
    },
    features: [\u0275\u0275InheritDefinitionFeature],
    decls: 3,
    vars: 0,
    consts: [[1, "mat-mdc-dialog-inner-container", "mdc-dialog__container"], [1, "mat-mdc-dialog-surface", "mdc-dialog__surface"], ["cdkPortalOutlet", ""]],
    template: function MatDialogContainer_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275template(2, MatDialogContainer_ng_template_2_Template, 0, 0, "ng-template", 2);
        \u0275\u0275elementEnd()();
      }
    },
    dependencies: [CdkPortalOutlet],
    styles: ['.mat-mdc-dialog-container {\n  width: 100%;\n  height: 100%;\n  display: block;\n  box-sizing: border-box;\n  max-height: inherit;\n  min-height: inherit;\n  min-width: inherit;\n  max-width: inherit;\n  outline: 0;\n}\n\n.cdk-overlay-pane.mat-mdc-dialog-panel {\n  max-width: var(--mat-dialog-container-max-width, 560px);\n  min-width: var(--mat-dialog-container-min-width, 280px);\n}\n@media (max-width: 599px) {\n  .cdk-overlay-pane.mat-mdc-dialog-panel {\n    max-width: var(--mat-dialog-container-small-max-width, calc(100vw - 32px));\n  }\n}\n\n.mat-mdc-dialog-inner-container {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-around;\n  box-sizing: border-box;\n  height: 100%;\n  opacity: 0;\n  transition: opacity linear var(--mat-dialog-transition-duration, 0ms);\n  max-height: inherit;\n  min-height: inherit;\n  min-width: inherit;\n  max-width: inherit;\n}\n.mdc-dialog--closing .mat-mdc-dialog-inner-container {\n  transition: opacity 75ms linear;\n  transform: none;\n}\n.mdc-dialog--open .mat-mdc-dialog-inner-container {\n  opacity: 1;\n}\n._mat-animation-noopable .mat-mdc-dialog-inner-container {\n  transition: none;\n}\n\n.mat-mdc-dialog-surface {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 0;\n  flex-shrink: 0;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow-y: auto;\n  outline: 0;\n  transform: scale(0.8);\n  transition: transform var(--mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);\n  max-height: inherit;\n  min-height: inherit;\n  min-width: inherit;\n  max-width: inherit;\n  box-shadow: var(--mat-dialog-container-elevation-shadow, none);\n  border-radius: var(--mat-dialog-container-shape, var(--mat-sys-corner-extra-large, 4px));\n  background-color: var(--mat-dialog-container-color, var(--mat-sys-surface, white));\n}\n[dir=rtl] .mat-mdc-dialog-surface {\n  text-align: right;\n}\n.mdc-dialog--open .mat-mdc-dialog-surface, .mdc-dialog--closing .mat-mdc-dialog-surface {\n  transform: none;\n}\n._mat-animation-noopable .mat-mdc-dialog-surface {\n  transition: none;\n}\n.mat-mdc-dialog-surface::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 2px solid transparent;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n}\n\n.mat-mdc-dialog-title {\n  display: block;\n  position: relative;\n  flex-shrink: 0;\n  box-sizing: border-box;\n  margin: 0 0 1px;\n  padding: var(--mat-dialog-headline-padding, 6px 24px 13px);\n}\n.mat-mdc-dialog-title::before {\n  display: inline-block;\n  width: 0;\n  height: 40px;\n  content: "";\n  vertical-align: 0;\n}\n[dir=rtl] .mat-mdc-dialog-title {\n  text-align: right;\n}\n.mat-mdc-dialog-container .mat-mdc-dialog-title {\n  color: var(--mat-dialog-subhead-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));\n  font-family: var(--mat-dialog-subhead-font, var(--mat-sys-headline-small-font, inherit));\n  line-height: var(--mat-dialog-subhead-line-height, var(--mat-sys-headline-small-line-height, 1.5rem));\n  font-size: var(--mat-dialog-subhead-size, var(--mat-sys-headline-small-size, 1rem));\n  font-weight: var(--mat-dialog-subhead-weight, var(--mat-sys-headline-small-weight, 400));\n  letter-spacing: var(--mat-dialog-subhead-tracking, var(--mat-sys-headline-small-tracking, 0.03125em));\n}\n\n.mat-mdc-dialog-content {\n  display: block;\n  flex-grow: 1;\n  box-sizing: border-box;\n  margin: 0;\n  overflow: auto;\n  max-height: 65vh;\n}\n.mat-mdc-dialog-content > :first-child {\n  margin-top: 0;\n}\n.mat-mdc-dialog-content > :last-child {\n  margin-bottom: 0;\n}\n.mat-mdc-dialog-container .mat-mdc-dialog-content {\n  color: var(--mat-dialog-supporting-text-color, var(--mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));\n  font-family: var(--mat-dialog-supporting-text-font, var(--mat-sys-body-medium-font, inherit));\n  line-height: var(--mat-dialog-supporting-text-line-height, var(--mat-sys-body-medium-line-height, 1.5rem));\n  font-size: var(--mat-dialog-supporting-text-size, var(--mat-sys-body-medium-size, 1rem));\n  font-weight: var(--mat-dialog-supporting-text-weight, var(--mat-sys-body-medium-weight, 400));\n  letter-spacing: var(--mat-dialog-supporting-text-tracking, var(--mat-sys-body-medium-tracking, 0.03125em));\n}\n.mat-mdc-dialog-container .mat-mdc-dialog-content {\n  padding: var(--mat-dialog-content-padding, 20px 24px);\n}\n.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content {\n  padding: var(--mat-dialog-with-actions-content-padding, 20px 24px 0);\n}\n.mat-mdc-dialog-container .mat-mdc-dialog-title + .mat-mdc-dialog-content {\n  padding-top: 0;\n}\n\n.mat-mdc-dialog-actions {\n  display: flex;\n  position: relative;\n  flex-shrink: 0;\n  flex-wrap: wrap;\n  align-items: center;\n  box-sizing: border-box;\n  min-height: 52px;\n  margin: 0;\n  border-top: 1px solid transparent;\n  padding: var(--mat-dialog-actions-padding, 16px 24px);\n  justify-content: var(--mat-dialog-actions-alignment, flex-end);\n}\n@media (forced-colors: active) {\n  .mat-mdc-dialog-actions {\n    border-top-color: CanvasText;\n  }\n}\n.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start, .mat-mdc-dialog-actions[align=start] {\n  justify-content: start;\n}\n.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center, .mat-mdc-dialog-actions[align=center] {\n  justify-content: center;\n}\n.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end, .mat-mdc-dialog-actions[align=end] {\n  justify-content: flex-end;\n}\n.mat-mdc-dialog-actions .mat-button-base + .mat-button-base,\n.mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {\n  margin-left: 8px;\n}\n[dir=rtl] .mat-mdc-dialog-actions .mat-button-base + .mat-button-base,\n[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {\n  margin-left: 0;\n  margin-right: 8px;\n}\n\n.mat-mdc-dialog-component-host {\n  display: contents;\n}\n'],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDialogContainer, [{
    type: Component,
    args: [{
      selector: "mat-dialog-container",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.Default,
      imports: [CdkPortalOutlet],
      host: {
        "class": "mat-mdc-dialog-container mdc-dialog",
        "tabindex": "-1",
        "[attr.aria-modal]": "_config.ariaModal",
        "[id]": "_config.id",
        "[attr.role]": "_config.role",
        "[attr.aria-labelledby]": "_config.ariaLabel ? null : _ariaLabelledByQueue[0]",
        "[attr.aria-label]": "_config.ariaLabel",
        "[attr.aria-describedby]": "_config.ariaDescribedBy || null",
        "[class._mat-animation-noopable]": "!_animationsEnabled",
        "[class.mat-mdc-dialog-container-with-actions]": "_actionSectionCount > 0"
      },
      template: '<div class="mat-mdc-dialog-inner-container mdc-dialog__container">\n  <div class="mat-mdc-dialog-surface mdc-dialog__surface">\n    <ng-template cdkPortalOutlet />\n  </div>\n</div>\n',
      styles: ['.mat-mdc-dialog-container {\n  width: 100%;\n  height: 100%;\n  display: block;\n  box-sizing: border-box;\n  max-height: inherit;\n  min-height: inherit;\n  min-width: inherit;\n  max-width: inherit;\n  outline: 0;\n}\n\n.cdk-overlay-pane.mat-mdc-dialog-panel {\n  max-width: var(--mat-dialog-container-max-width, 560px);\n  min-width: var(--mat-dialog-container-min-width, 280px);\n}\n@media (max-width: 599px) {\n  .cdk-overlay-pane.mat-mdc-dialog-panel {\n    max-width: var(--mat-dialog-container-small-max-width, calc(100vw - 32px));\n  }\n}\n\n.mat-mdc-dialog-inner-container {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-around;\n  box-sizing: border-box;\n  height: 100%;\n  opacity: 0;\n  transition: opacity linear var(--mat-dialog-transition-duration, 0ms);\n  max-height: inherit;\n  min-height: inherit;\n  min-width: inherit;\n  max-width: inherit;\n}\n.mdc-dialog--closing .mat-mdc-dialog-inner-container {\n  transition: opacity 75ms linear;\n  transform: none;\n}\n.mdc-dialog--open .mat-mdc-dialog-inner-container {\n  opacity: 1;\n}\n._mat-animation-noopable .mat-mdc-dialog-inner-container {\n  transition: none;\n}\n\n.mat-mdc-dialog-surface {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 0;\n  flex-shrink: 0;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow-y: auto;\n  outline: 0;\n  transform: scale(0.8);\n  transition: transform var(--mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);\n  max-height: inherit;\n  min-height: inherit;\n  min-width: inherit;\n  max-width: inherit;\n  box-shadow: var(--mat-dialog-container-elevation-shadow, none);\n  border-radius: var(--mat-dialog-container-shape, var(--mat-sys-corner-extra-large, 4px));\n  background-color: var(--mat-dialog-container-color, var(--mat-sys-surface, white));\n}\n[dir=rtl] .mat-mdc-dialog-surface {\n  text-align: right;\n}\n.mdc-dialog--open .mat-mdc-dialog-surface, .mdc-dialog--closing .mat-mdc-dialog-surface {\n  transform: none;\n}\n._mat-animation-noopable .mat-mdc-dialog-surface {\n  transition: none;\n}\n.mat-mdc-dialog-surface::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 2px solid transparent;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n}\n\n.mat-mdc-dialog-title {\n  display: block;\n  position: relative;\n  flex-shrink: 0;\n  box-sizing: border-box;\n  margin: 0 0 1px;\n  padding: var(--mat-dialog-headline-padding, 6px 24px 13px);\n}\n.mat-mdc-dialog-title::before {\n  display: inline-block;\n  width: 0;\n  height: 40px;\n  content: "";\n  vertical-align: 0;\n}\n[dir=rtl] .mat-mdc-dialog-title {\n  text-align: right;\n}\n.mat-mdc-dialog-container .mat-mdc-dialog-title {\n  color: var(--mat-dialog-subhead-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));\n  font-family: var(--mat-dialog-subhead-font, var(--mat-sys-headline-small-font, inherit));\n  line-height: var(--mat-dialog-subhead-line-height, var(--mat-sys-headline-small-line-height, 1.5rem));\n  font-size: var(--mat-dialog-subhead-size, var(--mat-sys-headline-small-size, 1rem));\n  font-weight: var(--mat-dialog-subhead-weight, var(--mat-sys-headline-small-weight, 400));\n  letter-spacing: var(--mat-dialog-subhead-tracking, var(--mat-sys-headline-small-tracking, 0.03125em));\n}\n\n.mat-mdc-dialog-content {\n  display: block;\n  flex-grow: 1;\n  box-sizing: border-box;\n  margin: 0;\n  overflow: auto;\n  max-height: 65vh;\n}\n.mat-mdc-dialog-content > :first-child {\n  margin-top: 0;\n}\n.mat-mdc-dialog-content > :last-child {\n  margin-bottom: 0;\n}\n.mat-mdc-dialog-container .mat-mdc-dialog-content {\n  color: var(--mat-dialog-supporting-text-color, var(--mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));\n  font-family: var(--mat-dialog-supporting-text-font, var(--mat-sys-body-medium-font, inherit));\n  line-height: var(--mat-dialog-supporting-text-line-height, var(--mat-sys-body-medium-line-height, 1.5rem));\n  font-size: var(--mat-dialog-supporting-text-size, var(--mat-sys-body-medium-size, 1rem));\n  font-weight: var(--mat-dialog-supporting-text-weight, var(--mat-sys-body-medium-weight, 400));\n  letter-spacing: var(--mat-dialog-supporting-text-tracking, var(--mat-sys-body-medium-tracking, 0.03125em));\n}\n.mat-mdc-dialog-container .mat-mdc-dialog-content {\n  padding: var(--mat-dialog-content-padding, 20px 24px);\n}\n.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content {\n  padding: var(--mat-dialog-with-actions-content-padding, 20px 24px 0);\n}\n.mat-mdc-dialog-container .mat-mdc-dialog-title + .mat-mdc-dialog-content {\n  padding-top: 0;\n}\n\n.mat-mdc-dialog-actions {\n  display: flex;\n  position: relative;\n  flex-shrink: 0;\n  flex-wrap: wrap;\n  align-items: center;\n  box-sizing: border-box;\n  min-height: 52px;\n  margin: 0;\n  border-top: 1px solid transparent;\n  padding: var(--mat-dialog-actions-padding, 16px 24px);\n  justify-content: var(--mat-dialog-actions-alignment, flex-end);\n}\n@media (forced-colors: active) {\n  .mat-mdc-dialog-actions {\n    border-top-color: CanvasText;\n  }\n}\n.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start, .mat-mdc-dialog-actions[align=start] {\n  justify-content: start;\n}\n.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center, .mat-mdc-dialog-actions[align=center] {\n  justify-content: center;\n}\n.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end, .mat-mdc-dialog-actions[align=end] {\n  justify-content: flex-end;\n}\n.mat-mdc-dialog-actions .mat-button-base + .mat-button-base,\n.mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {\n  margin-left: 8px;\n}\n[dir=rtl] .mat-mdc-dialog-actions .mat-button-base + .mat-button-base,\n[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {\n  margin-left: 0;\n  margin-right: 8px;\n}\n\n.mat-mdc-dialog-component-host {\n  display: contents;\n}\n']
    }]
  }], null, null);
})();
var TRANSITION_DURATION_PROPERTY = "--mat-dialog-transition-duration";
function parseCssTime(time) {
  if (time == null) {
    return null;
  }
  if (typeof time === "number") {
    return time;
  }
  if (time.endsWith("ms")) {
    return coerceNumberProperty(time.substring(0, time.length - 2));
  }
  if (time.endsWith("s")) {
    return coerceNumberProperty(time.substring(0, time.length - 1)) * 1e3;
  }
  if (time === "0") {
    return 0;
  }
  return null;
}
var MatDialogState;
(function(MatDialogState2) {
  MatDialogState2[MatDialogState2["OPEN"] = 0] = "OPEN";
  MatDialogState2[MatDialogState2["CLOSING"] = 1] = "CLOSING";
  MatDialogState2[MatDialogState2["CLOSED"] = 2] = "CLOSED";
})(MatDialogState || (MatDialogState = {}));
var MatDialogRef = class {
  _ref;
  _config;
  _containerInstance;
  componentInstance;
  componentRef = null;
  disableClose;
  id;
  _afterOpened = new ReplaySubject(1);
  _beforeClosed = new ReplaySubject(1);
  _result;
  _closeFallbackTimeout;
  _state = MatDialogState.OPEN;
  _closeInteractionType;
  constructor(_ref, _config, _containerInstance) {
    this._ref = _ref;
    this._config = _config;
    this._containerInstance = _containerInstance;
    this.disableClose = _config.disableClose;
    this.id = _ref.id;
    _ref.addPanelClass("mat-mdc-dialog-panel");
    _containerInstance._animationStateChanged.pipe(filter((event) => event.state === "opened"), take(1)).subscribe(() => {
      this._afterOpened.next();
      this._afterOpened.complete();
    });
    _containerInstance._animationStateChanged.pipe(filter((event) => event.state === "closed"), take(1)).subscribe(() => {
      clearTimeout(this._closeFallbackTimeout);
      this._finishDialogClose();
    });
    _ref.overlayRef.detachments().subscribe(() => {
      this._beforeClosed.next(this._result);
      this._beforeClosed.complete();
      this._finishDialogClose();
    });
    merge(this.backdropClick(), this.keydownEvents().pipe(filter((event) => event.keyCode === ESCAPE && !this.disableClose && !hasModifierKey(event)))).subscribe((event) => {
      if (!this.disableClose) {
        event.preventDefault();
        _closeDialogVia(this, event.type === "keydown" ? "keyboard" : "mouse");
      }
    });
  }
  close(dialogResult) {
    const closePredicate = this._config.closePredicate;
    if (closePredicate && !closePredicate(dialogResult, this._config, this.componentInstance)) {
      return;
    }
    this._result = dialogResult;
    this._containerInstance._animationStateChanged.pipe(filter((event) => event.state === "closing"), take(1)).subscribe((event) => {
      this._beforeClosed.next(dialogResult);
      this._beforeClosed.complete();
      this._ref.overlayRef.detachBackdrop();
      this._closeFallbackTimeout = setTimeout(() => this._finishDialogClose(), event.totalTime + 100);
    });
    this._state = MatDialogState.CLOSING;
    this._containerInstance._startExitAnimation();
  }
  afterOpened() {
    return this._afterOpened;
  }
  afterClosed() {
    return this._ref.closed;
  }
  beforeClosed() {
    return this._beforeClosed;
  }
  backdropClick() {
    return this._ref.backdropClick;
  }
  keydownEvents() {
    return this._ref.keydownEvents;
  }
  updatePosition(position) {
    let strategy = this._ref.config.positionStrategy;
    if (position && (position.left || position.right)) {
      position.left ? strategy.left(position.left) : strategy.right(position.right);
    } else {
      strategy.centerHorizontally();
    }
    if (position && (position.top || position.bottom)) {
      position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
    } else {
      strategy.centerVertically();
    }
    this._ref.updatePosition();
    return this;
  }
  updateSize(width = "", height = "") {
    this._ref.updateSize(width, height);
    return this;
  }
  addPanelClass(classes) {
    this._ref.addPanelClass(classes);
    return this;
  }
  removePanelClass(classes) {
    this._ref.removePanelClass(classes);
    return this;
  }
  getState() {
    return this._state;
  }
  _finishDialogClose() {
    this._state = MatDialogState.CLOSED;
    this._ref.close(this._result, {
      focusOrigin: this._closeInteractionType
    });
    this.componentInstance = null;
  }
};
function _closeDialogVia(ref, interactionType, result) {
  ref._closeInteractionType = interactionType;
  return ref.close(result);
}
var MAT_DIALOG_DATA = new InjectionToken("MatMdcDialogData");
var MAT_DIALOG_DEFAULT_OPTIONS = new InjectionToken("mat-mdc-dialog-default-options");
var MAT_DIALOG_SCROLL_STRATEGY = new InjectionToken("mat-mdc-dialog-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const injector = inject(Injector);
    return () => createBlockScrollStrategy(injector);
  }
});
var MatDialog = class _MatDialog {
  _defaultOptions = inject(MAT_DIALOG_DEFAULT_OPTIONS, {
    optional: true
  });
  _scrollStrategy = inject(MAT_DIALOG_SCROLL_STRATEGY);
  _parentDialog = inject(_MatDialog, {
    optional: true,
    skipSelf: true
  });
  _idGenerator = inject(_IdGenerator);
  _injector = inject(Injector);
  _dialog = inject(Dialog);
  _animationsDisabled = _animationsDisabled();
  _openDialogsAtThisLevel = [];
  _afterAllClosedAtThisLevel = new Subject();
  _afterOpenedAtThisLevel = new Subject();
  dialogConfigClass = MatDialogConfig;
  _dialogRefConstructor;
  _dialogContainerType;
  _dialogDataToken;
  get openDialogs() {
    return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
  }
  get afterOpened() {
    return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpenedAtThisLevel;
  }
  _getAfterAllClosed() {
    const parent = this._parentDialog;
    return parent ? parent._getAfterAllClosed() : this._afterAllClosedAtThisLevel;
  }
  afterAllClosed = defer(() => this.openDialogs.length ? this._getAfterAllClosed() : this._getAfterAllClosed().pipe(startWith(void 0)));
  constructor() {
    this._dialogRefConstructor = MatDialogRef;
    this._dialogContainerType = MatDialogContainer;
    this._dialogDataToken = MAT_DIALOG_DATA;
  }
  open(componentOrTemplateRef, config) {
    let dialogRef;
    config = __spreadValues(__spreadValues({}, this._defaultOptions || new MatDialogConfig()), config);
    config.id = config.id || this._idGenerator.getId("mat-mdc-dialog-");
    config.scrollStrategy = config.scrollStrategy || this._scrollStrategy();
    const cdkRef = this._dialog.open(componentOrTemplateRef, __spreadProps(__spreadValues({}, config), {
      positionStrategy: createGlobalPositionStrategy(this._injector).centerHorizontally().centerVertically(),
      disableClose: true,
      closePredicate: void 0,
      closeOnDestroy: false,
      closeOnOverlayDetachments: false,
      disableAnimations: this._animationsDisabled || config.enterAnimationDuration?.toLocaleString() === "0" || config.exitAnimationDuration?.toString() === "0",
      container: {
        type: this._dialogContainerType,
        providers: () => [{
          provide: this.dialogConfigClass,
          useValue: config
        }, {
          provide: DialogConfig,
          useValue: config
        }]
      },
      templateContext: () => ({
        dialogRef
      }),
      providers: (ref, cdkConfig, dialogContainer) => {
        dialogRef = new this._dialogRefConstructor(ref, config, dialogContainer);
        dialogRef.updatePosition(config?.position);
        return [{
          provide: this._dialogContainerType,
          useValue: dialogContainer
        }, {
          provide: this._dialogDataToken,
          useValue: cdkConfig.data
        }, {
          provide: this._dialogRefConstructor,
          useValue: dialogRef
        }];
      }
    }));
    dialogRef.componentRef = cdkRef.componentRef;
    dialogRef.componentInstance = cdkRef.componentInstance;
    this.openDialogs.push(dialogRef);
    this.afterOpened.next(dialogRef);
    dialogRef.afterClosed().subscribe(() => {
      const index = this.openDialogs.indexOf(dialogRef);
      if (index > -1) {
        this.openDialogs.splice(index, 1);
        if (!this.openDialogs.length) {
          this._getAfterAllClosed().next();
        }
      }
    });
    return dialogRef;
  }
  closeAll() {
    this._closeDialogs(this.openDialogs);
  }
  getDialogById(id) {
    return this.openDialogs.find((dialog) => dialog.id === id);
  }
  ngOnDestroy() {
    this._closeDialogs(this._openDialogsAtThisLevel);
    this._afterAllClosedAtThisLevel.complete();
    this._afterOpenedAtThisLevel.complete();
  }
  _closeDialogs(dialogs) {
    let i = dialogs.length;
    while (i--) {
      dialogs[i].close();
    }
  }
  static \u0275fac = function MatDialog_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDialog)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MatDialog,
    factory: _MatDialog.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDialog, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var MatDialogClose = class _MatDialogClose {
  dialogRef = inject(MatDialogRef, {
    optional: true
  });
  _elementRef = inject(ElementRef);
  _dialog = inject(MatDialog);
  ariaLabel;
  type = "button";
  dialogResult;
  _matDialogClose;
  constructor() {
  }
  ngOnInit() {
    if (!this.dialogRef) {
      this.dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs);
    }
  }
  ngOnChanges(changes) {
    const proxiedChange = changes["_matDialogClose"] || changes["_matDialogCloseResult"];
    if (proxiedChange) {
      this.dialogResult = proxiedChange.currentValue;
    }
  }
  _onButtonClick(event) {
    _closeDialogVia(this.dialogRef, event.screenX === 0 && event.screenY === 0 ? "keyboard" : "mouse", this.dialogResult);
  }
  static \u0275fac = function MatDialogClose_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDialogClose)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatDialogClose,
    selectors: [["", "mat-dialog-close", ""], ["", "matDialogClose", ""]],
    hostVars: 2,
    hostBindings: function MatDialogClose_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function MatDialogClose_click_HostBindingHandler($event) {
          return ctx._onButtonClick($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275attribute("aria-label", ctx.ariaLabel || null)("type", ctx.type);
      }
    },
    inputs: {
      ariaLabel: [0, "aria-label", "ariaLabel"],
      type: "type",
      dialogResult: [0, "mat-dialog-close", "dialogResult"],
      _matDialogClose: [0, "matDialogClose", "_matDialogClose"]
    },
    exportAs: ["matDialogClose"],
    features: [\u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDialogClose, [{
    type: Directive,
    args: [{
      selector: "[mat-dialog-close], [matDialogClose]",
      exportAs: "matDialogClose",
      host: {
        "(click)": "_onButtonClick($event)",
        "[attr.aria-label]": "ariaLabel || null",
        "[attr.type]": "type"
      }
    }]
  }], () => [], {
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    type: [{
      type: Input
    }],
    dialogResult: [{
      type: Input,
      args: ["mat-dialog-close"]
    }],
    _matDialogClose: [{
      type: Input,
      args: ["matDialogClose"]
    }]
  });
})();
var MatDialogLayoutSection = class _MatDialogLayoutSection {
  _dialogRef = inject(MatDialogRef, {
    optional: true
  });
  _elementRef = inject(ElementRef);
  _dialog = inject(MatDialog);
  constructor() {
  }
  ngOnInit() {
    if (!this._dialogRef) {
      this._dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs);
    }
    if (this._dialogRef) {
      Promise.resolve().then(() => {
        this._onAdd();
      });
    }
  }
  ngOnDestroy() {
    const instance = this._dialogRef?._containerInstance;
    if (instance) {
      Promise.resolve().then(() => {
        this._onRemove();
      });
    }
  }
  static \u0275fac = function MatDialogLayoutSection_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDialogLayoutSection)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatDialogLayoutSection
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDialogLayoutSection, [{
    type: Directive
  }], () => [], null);
})();
var MatDialogTitle = class _MatDialogTitle extends MatDialogLayoutSection {
  id = inject(_IdGenerator).getId("mat-mdc-dialog-title-");
  _onAdd() {
    this._dialogRef._containerInstance?._addAriaLabelledBy?.(this.id);
  }
  _onRemove() {
    this._dialogRef?._containerInstance?._removeAriaLabelledBy?.(this.id);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatDialogTitle_BaseFactory;
    return function MatDialogTitle_Factory(__ngFactoryType__) {
      return (\u0275MatDialogTitle_BaseFactory || (\u0275MatDialogTitle_BaseFactory = \u0275\u0275getInheritedFactory(_MatDialogTitle)))(__ngFactoryType__ || _MatDialogTitle);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatDialogTitle,
    selectors: [["", "mat-dialog-title", ""], ["", "matDialogTitle", ""]],
    hostAttrs: [1, "mat-mdc-dialog-title", "mdc-dialog__title"],
    hostVars: 1,
    hostBindings: function MatDialogTitle_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275domProperty("id", ctx.id);
      }
    },
    inputs: {
      id: "id"
    },
    exportAs: ["matDialogTitle"],
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDialogTitle, [{
    type: Directive,
    args: [{
      selector: "[mat-dialog-title], [matDialogTitle]",
      exportAs: "matDialogTitle",
      host: {
        "class": "mat-mdc-dialog-title mdc-dialog__title",
        "[id]": "id"
      }
    }]
  }], null, {
    id: [{
      type: Input
    }]
  });
})();
var MatDialogContent = class _MatDialogContent {
  static \u0275fac = function MatDialogContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDialogContent)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatDialogContent,
    selectors: [["", "mat-dialog-content", ""], ["mat-dialog-content"], ["", "matDialogContent", ""]],
    hostAttrs: [1, "mat-mdc-dialog-content", "mdc-dialog__content"],
    features: [\u0275\u0275HostDirectivesFeature([CdkScrollable])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDialogContent, [{
    type: Directive,
    args: [{
      selector: `[mat-dialog-content], mat-dialog-content, [matDialogContent]`,
      host: {
        "class": "mat-mdc-dialog-content mdc-dialog__content"
      },
      hostDirectives: [CdkScrollable]
    }]
  }], null, null);
})();
var MatDialogActions = class _MatDialogActions extends MatDialogLayoutSection {
  align;
  _onAdd() {
    this._dialogRef._containerInstance?._updateActionSectionCount?.(1);
  }
  _onRemove() {
    this._dialogRef._containerInstance?._updateActionSectionCount?.(-1);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatDialogActions_BaseFactory;
    return function MatDialogActions_Factory(__ngFactoryType__) {
      return (\u0275MatDialogActions_BaseFactory || (\u0275MatDialogActions_BaseFactory = \u0275\u0275getInheritedFactory(_MatDialogActions)))(__ngFactoryType__ || _MatDialogActions);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatDialogActions,
    selectors: [["", "mat-dialog-actions", ""], ["mat-dialog-actions"], ["", "matDialogActions", ""]],
    hostAttrs: [1, "mat-mdc-dialog-actions", "mdc-dialog__actions"],
    hostVars: 6,
    hostBindings: function MatDialogActions_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-mdc-dialog-actions-align-start", ctx.align === "start")("mat-mdc-dialog-actions-align-center", ctx.align === "center")("mat-mdc-dialog-actions-align-end", ctx.align === "end");
      }
    },
    inputs: {
      align: "align"
    },
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDialogActions, [{
    type: Directive,
    args: [{
      selector: `[mat-dialog-actions], mat-dialog-actions, [matDialogActions]`,
      host: {
        "class": "mat-mdc-dialog-actions mdc-dialog__actions",
        "[class.mat-mdc-dialog-actions-align-start]": 'align === "start"',
        "[class.mat-mdc-dialog-actions-align-center]": 'align === "center"',
        "[class.mat-mdc-dialog-actions-align-end]": 'align === "end"'
      }
    }]
  }], null, {
    align: [{
      type: Input
    }]
  });
})();
function getClosestDialog(element, openDialogs) {
  let parent = element.nativeElement.parentElement;
  while (parent && !parent.classList.contains("mat-mdc-dialog-container")) {
    parent = parent.parentElement;
  }
  return parent ? openDialogs.find((dialog) => dialog.id === parent.id) : null;
}
var DIRECTIVES = [MatDialogContainer, MatDialogClose, MatDialogTitle, MatDialogActions, MatDialogContent];
var MatDialogModule = class _MatDialogModule {
  static \u0275fac = function MatDialogModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDialogModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatDialogModule,
    imports: [DialogModule, OverlayModule, PortalModule, MatDialogContainer, MatDialogClose, MatDialogTitle, MatDialogActions, MatDialogContent],
    exports: [BidiModule, MatDialogContainer, MatDialogClose, MatDialogTitle, MatDialogActions, MatDialogContent]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [MatDialog],
    imports: [DialogModule, OverlayModule, PortalModule, BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDialogModule, [{
    type: NgModule,
    args: [{
      imports: [DialogModule, OverlayModule, PortalModule, ...DIRECTIVES],
      exports: [BidiModule, ...DIRECTIVES],
      providers: [MatDialog]
    }]
  }], null, null);
})();

// src/access-request/my-request/clarify-request-dialog.component.ts
function ClarifyRequestDialogComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "mat-spinner", 7);
    \u0275\u0275elementEnd();
  }
}
function ClarifyRequestDialogComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.loadError());
  }
}
function ClarifyRequestDialogComponent_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 12);
    \u0275\u0275text(2, "Yeu cau tu admin");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.feedbackText());
  }
}
function ClarifyRequestDialogComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, ClarifyRequestDialogComponent_Conditional_5_Conditional_0_Template, 5, 1, "div", 8);
    \u0275\u0275elementStart(1, "p", 9);
    \u0275\u0275text(2, " Nhap noi dung bo sung. Sau khi gui, phieu se tro lai cho admin xac nhan hoac tu choi. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-form-field", 10)(4, "mat-label");
    \u0275\u0275text(5, "Noi dung bo sung");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "textarea", 11);
    \u0275\u0275twoWayListener("ngModelChange", function ClarifyRequestDialogComponent_Conditional_5_Template_textarea_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.comment, $event) || (ctx_r0.comment = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.feedbackText() ? 0 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.comment);
    \u0275\u0275property("disabled", ctx_r0.sending());
  }
}
var ClarifyRequestDialogComponent = class _ClarifyRequestDialogComponent {
  userClarifyTaskKeys = ["user_clarify_task", "Activity_UserClarify"];
  authService = inject(AuthService);
  dialogRef = inject(MatDialogRef);
  snackBar = inject(MatSnackBar);
  data = inject(MAT_DIALOG_DATA);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  sending = signal(false, ...ngDevMode ? [{ debugName: "sending" }] : (
    /* istanbul ignore next */
    []
  ));
  loadError = signal(null, ...ngDevMode ? [{ debugName: "loadError" }] : (
    /* istanbul ignore next */
    []
  ));
  task = signal(null, ...ngDevMode ? [{ debugName: "task" }] : (
    /* istanbul ignore next */
    []
  ));
  comment = "";
  feedbackText = computed(() => {
    const t = this.task();
    const fromTask = t?.adminComment?.trim();
    if (fromTask) {
      return fromTask;
    }
    const fromRow = this.data.adminFeedback?.trim();
    return fromRow || "";
  }, ...ngDevMode ? [{ debugName: "feedbackText" }] : (
    /* istanbul ignore next */
    []
  ));
  ngOnInit() {
    this.loading.set(true);
    if (!this.authService.currentUser()?.preferred_username?.trim()) {
      this.loading.set(false);
      this.loadError.set("Khong xac dinh duoc nguoi dung. Vui long dang nhap lai.");
      return;
    }
    this.authService.getPendingCamundaTasks(void 0, void 0, this.data.requestId, "Activity_UserClarify").subscribe({
      next: (response) => {
        this.loading.set(false);
        const list = response.result || [];
        const first = list.find((item) => this.userClarifyTaskKeys.includes(item.taskDefinitionKey ?? "")) ?? list[0] ?? null;
        if (!first || !this.userClarifyTaskKeys.includes(first.taskDefinitionKey ?? "")) {
          this.loadError.set("Khong tim thay task bo sung thong tin cho phieu nay. Hay thu lai sau hoac mo trang Task can xu ly.");
          return;
        }
        this.task.set(first);
      },
      error: (error) => {
        this.loading.set(false);
        const fallback = "Khong the tai task.";
        const message = typeof error === "object" && error !== null && "error" in error ? error.error?.message || fallback : fallback;
        this.loadError.set(message);
      }
    });
  }
  cancel() {
    this.dialogRef.close(false);
  }
  submit() {
    const t = this.task();
    if (!t) {
      return;
    }
    const text = this.comment.trim();
    if (!text) {
      this.snackBar.open("Vui long nhap noi dung bo sung.", "Dong", { duration: 4e3 });
      return;
    }
    this.sending.set(true);
    this.authService.completeCamundaTask(t.taskId, { comment: text }).subscribe({
      next: () => {
        this.sending.set(false);
        this.snackBar.open("Da gui thong tin. Admin se tiep tuc xu ly phieu.", "Dong", { duration: 4e3 });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.sending.set(false);
        const fallback = "Gui that bai.";
        const message = typeof error === "object" && error !== null && "error" in error ? error.error?.message || fallback : fallback;
        this.snackBar.open(message, "Dong", { duration: 5e3 });
      }
    });
  }
  static \u0275fac = function ClarifyRequestDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClarifyRequestDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClarifyRequestDialogComponent, selectors: [["app-clarify-request-dialog"]], decls: 11, vars: 4, consts: [["mat-dialog-title", "", 1, "!text-lg"], [1, "!pt-2"], [1, "flex", "justify-center", "py-6"], [1, "text-sm", "text-red-700"], ["align", "end", 1, "!pb-4", "!pt-2"], ["mat-button", "", "type", "button", 3, "click", "disabled"], ["mat-flat-button", "", "color", "primary", "type", "button", 3, "click", "disabled"], ["diameter", "40"], [1, "mb-3", "rounded-lg", "border", "border-slate-200", "bg-slate-50", "p-3", "text-sm", "text-slate-800"], [1, "mb-3", "text-sm", "text-slate-600"], ["appearance", "outline", 1, "w-full"], ["matInput", "", "rows", "5", "placeholder", "Vi du: da cap nhat ly do, dinh kem thong tin bo sung...", 3, "ngModelChange", "ngModel", "disabled"], [1, "mb-1", "font-semibold", "text-slate-700"], [1, "whitespace-pre-wrap"]], template: function ClarifyRequestDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content", 1);
      \u0275\u0275conditionalCreate(3, ClarifyRequestDialogComponent_Conditional_3_Template, 2, 0, "div", 2)(4, ClarifyRequestDialogComponent_Conditional_4_Template, 2, 1, "p", 3)(5, ClarifyRequestDialogComponent_Conditional_5_Template, 7, 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "mat-dialog-actions", 4)(7, "button", 5);
      \u0275\u0275listener("click", function ClarifyRequestDialogComponent_Template_button_click_7_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(8, "Huy");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 6);
      \u0275\u0275listener("click", function ClarifyRequestDialogComponent_Template_button_click_9_listener() {
        return ctx.submit();
      });
      \u0275\u0275text(10, " Gui cho admin ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("Bo sung thong tin \u2014 Request #", ctx.data.requestId);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 3 : ctx.loadError() ? 4 : 5);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.sending());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.loading() || !!ctx.loadError() || !ctx.task() || ctx.sending());
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, MatButtonModule, MatButton, MatDialogModule, MatDialogTitle, MatDialogActions, MatDialogContent, MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatProgressSpinnerModule, MatProgressSpinner, MatSnackBarModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClarifyRequestDialogComponent, [{
    type: Component,
    args: [{
      selector: "app-clarify-request-dialog",
      standalone: true,
      imports: [
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
      ],
      template: `
    <h2 mat-dialog-title class="!text-lg">Bo sung thong tin \u2014 Request #{{ data.requestId }}</h2>
    <mat-dialog-content class="!pt-2">
      @if (loading()) {
        <div class="flex justify-center py-6">
          <mat-spinner diameter="40" />
        </div>
      } @else if (loadError()) {
        <p class="text-sm text-red-700">{{ loadError() }}</p>
      } @else {
        @if (feedbackText()) {
          <div class="mb-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800">
            <div class="mb-1 font-semibold text-slate-700">Yeu cau tu admin</div>
            <div class="whitespace-pre-wrap">{{ feedbackText() }}</div>
          </div>
        }
        <p class="mb-3 text-sm text-slate-600">
          Nhap noi dung bo sung. Sau khi gui, phieu se tro lai cho admin xac nhan hoac tu choi.
        </p>
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Noi dung bo sung</mat-label>
          <textarea
            matInput
            rows="5"
            [(ngModel)]="comment"
            [disabled]="sending()"
            placeholder="Vi du: da cap nhat ly do, dinh kem thong tin bo sung..."
          ></textarea>
        </mat-form-field>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="!pb-4 !pt-2">
      <button mat-button type="button" (click)="cancel()" [disabled]="sending()">Huy</button>
      <button
        mat-flat-button
        color="primary"
        type="button"
        (click)="submit()"
        [disabled]="loading() || !!loadError() || !task() || sending()"
      >
        Gui cho admin
      </button>
    </mat-dialog-actions>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClarifyRequestDialogComponent, { className: "ClarifyRequestDialogComponent", filePath: "src/access-request/my-request/clarify-request-dialog.component.ts", lineNumber: 75 });
})();

// src/access-request/my-request/counter-response-dialog.component.ts
function CounterResponseDialogComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "mat-spinner", 9);
    \u0275\u0275elementEnd();
  }
}
function CounterResponseDialogComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.loadError());
  }
}
function CounterResponseDialogComponent_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 14);
    \u0275\u0275text(2, "De xuat dieu chinh tu admin");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 15);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.feedbackText());
  }
}
function CounterResponseDialogComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, CounterResponseDialogComponent_Conditional_5_Conditional_0_Template, 5, 1, "div", 10);
    \u0275\u0275elementStart(1, "p", 11);
    \u0275\u0275text(2, " Chap nhan: luong tiep tuc theo de xuat cua admin. Tu choi: phieu bi tu choi theo quy trinh. Co the them ghi chu (tuy chon). ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-form-field", 12)(4, "mat-label");
    \u0275\u0275text(5, "Ghi chu (tuy chon)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "textarea", 13);
    \u0275\u0275twoWayListener("ngModelChange", function CounterResponseDialogComponent_Conditional_5_Template_textarea_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.comment, $event) || (ctx_r0.comment = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.feedbackText() ? 0 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.comment);
    \u0275\u0275property("disabled", ctx_r0.sending());
  }
}
var CounterResponseDialogComponent = class _CounterResponseDialogComponent {
  userCounterTaskKeys = ["user_counter_response_task", "Activity_UserCounterResponse"];
  authService = inject(AuthService);
  dialogRef = inject(MatDialogRef);
  snackBar = inject(MatSnackBar);
  data = inject(MAT_DIALOG_DATA);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  sending = signal(false, ...ngDevMode ? [{ debugName: "sending" }] : (
    /* istanbul ignore next */
    []
  ));
  loadError = signal(null, ...ngDevMode ? [{ debugName: "loadError" }] : (
    /* istanbul ignore next */
    []
  ));
  task = signal(null, ...ngDevMode ? [{ debugName: "task" }] : (
    /* istanbul ignore next */
    []
  ));
  comment = "";
  feedbackText = computed(() => {
    const t = this.task();
    const fromTask = t?.counterProposal?.trim();
    if (fromTask) {
      return fromTask;
    }
    const fromRow = this.data.adminFeedback?.trim();
    return fromRow || "";
  }, ...ngDevMode ? [{ debugName: "feedbackText" }] : (
    /* istanbul ignore next */
    []
  ));
  ngOnInit() {
    this.loading.set(true);
    if (!this.authService.currentUser()?.preferred_username?.trim()) {
      this.loading.set(false);
      this.loadError.set("Khong xac dinh duoc nguoi dung. Vui long dang nhap lai.");
      return;
    }
    this.authService.getPendingCamundaTasks(void 0, void 0, this.data.requestId, "Activity_UserCounterResponse").subscribe({
      next: (response) => {
        this.loading.set(false);
        const list = response.result || [];
        const first = list.find((item) => this.userCounterTaskKeys.includes(item.taskDefinitionKey ?? "")) ?? list[0] ?? null;
        if (!first || !this.userCounterTaskKeys.includes(first.taskDefinitionKey ?? "")) {
          this.loadError.set("Khong tim thay task xac nhan de xuat cho phieu nay. Hay thu lai sau hoac mo trang Task can xu ly.");
          return;
        }
        this.task.set(first);
      },
      error: (error) => {
        this.loading.set(false);
        const fallback = "Khong the tai task.";
        const message = typeof error === "object" && error !== null && "error" in error ? error.error?.message || fallback : fallback;
        this.loadError.set(message);
      }
    });
  }
  cancel() {
    this.dialogRef.close(false);
  }
  submit(acceptCounter) {
    const t = this.task();
    if (!t) {
      return;
    }
    this.sending.set(true);
    const text = this.comment.trim();
    this.authService.completeCamundaTask(t.taskId, {
      acceptCounter,
      comment: text
    }).subscribe({
      next: () => {
        this.sending.set(false);
        const msg = acceptCounter ? "Ban da chap nhan de xuat. Luong se tiep tuc." : "Ban da tu choi de xuat.";
        this.snackBar.open(msg, "Dong", { duration: 5e3 });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.sending.set(false);
        const fallback = "Gui phan hoi that bai.";
        const message = typeof error === "object" && error !== null && "error" in error ? error.error?.message || fallback : fallback;
        this.snackBar.open(message, "Dong", { duration: 5e3 });
      }
    });
  }
  static \u0275fac = function CounterResponseDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CounterResponseDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CounterResponseDialogComponent, selectors: [["app-counter-response-dialog"]], decls: 14, vars: 5, consts: [["mat-dialog-title", "", 1, "!text-lg"], [1, "!pt-2"], [1, "flex", "justify-center", "py-6"], [1, "text-sm", "text-red-700"], ["align", "end", 1, "!flex", "!flex-col", "gap-2", "!pb-4", "!pt-2", "sm:!flex-row", "sm:!justify-end"], ["mat-button", "", "type", "button", 3, "click", "disabled"], [1, "flex", "w-full", "flex-col", "gap-2", "sm:w-auto", "sm:flex-row"], ["mat-stroked-button", "", "color", "warn", "type", "button", 3, "click", "disabled"], ["mat-flat-button", "", "color", "primary", "type", "button", 3, "click", "disabled"], ["diameter", "40"], [1, "mb-3", "rounded-lg", "border", "border-slate-200", "bg-slate-50", "p-3", "text-sm", "text-slate-800"], [1, "mb-3", "text-sm", "text-slate-600"], ["appearance", "outline", 1, "w-full"], ["matInput", "", "rows", "3", "placeholder", "Vi du: dong y voi de xuat dieu chinh quyen...", 3, "ngModelChange", "ngModel", "disabled"], [1, "mb-1", "font-semibold", "text-slate-700"], [1, "whitespace-pre-wrap"]], template: function CounterResponseDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content", 1);
      \u0275\u0275conditionalCreate(3, CounterResponseDialogComponent_Conditional_3_Template, 2, 0, "div", 2)(4, CounterResponseDialogComponent_Conditional_4_Template, 2, 1, "p", 3)(5, CounterResponseDialogComponent_Conditional_5_Template, 7, 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "mat-dialog-actions", 4)(7, "button", 5);
      \u0275\u0275listener("click", function CounterResponseDialogComponent_Template_button_click_7_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(8, "Huy");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 6)(10, "button", 7);
      \u0275\u0275listener("click", function CounterResponseDialogComponent_Template_button_click_10_listener() {
        return ctx.submit(false);
      });
      \u0275\u0275text(11, " Tu choi de xuat ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "button", 8);
      \u0275\u0275listener("click", function CounterResponseDialogComponent_Template_button_click_12_listener() {
        return ctx.submit(true);
      });
      \u0275\u0275text(13, " Chap nhan de xuat ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("De xuat dieu chinh quyen \u2014 Request #", ctx.data.requestId);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 3 : ctx.loadError() ? 4 : 5);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.sending());
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.loading() || !!ctx.loadError() || !ctx.task() || ctx.sending());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.loading() || !!ctx.loadError() || !ctx.task() || ctx.sending());
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, MatButtonModule, MatButton, MatDialogModule, MatDialogTitle, MatDialogActions, MatDialogContent, MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatProgressSpinnerModule, MatProgressSpinner, MatSnackBarModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CounterResponseDialogComponent, [{
    type: Component,
    args: [{
      selector: "app-counter-response-dialog",
      standalone: true,
      imports: [
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
      ],
      template: `
    <h2 mat-dialog-title class="!text-lg">De xuat dieu chinh quyen \u2014 Request #{{ data.requestId }}</h2>
    <mat-dialog-content class="!pt-2">
      @if (loading()) {
        <div class="flex justify-center py-6">
          <mat-spinner diameter="40" />
        </div>
      } @else if (loadError()) {
        <p class="text-sm text-red-700">{{ loadError() }}</p>
      } @else {
        @if (feedbackText()) {
          <div class="mb-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800">
            <div class="mb-1 font-semibold text-slate-700">De xuat dieu chinh tu admin</div>
            <div class="whitespace-pre-wrap">{{ feedbackText() }}</div>
          </div>
        }
        <p class="mb-3 text-sm text-slate-600">
          Chap nhan: luong tiep tuc theo de xuat cua admin. Tu choi: phieu bi tu choi theo quy trinh.
          Co the them ghi chu (tuy chon).
        </p>
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Ghi chu (tuy chon)</mat-label>
          <textarea
            matInput
            rows="3"
            [(ngModel)]="comment"
            [disabled]="sending()"
            placeholder="Vi du: dong y voi de xuat dieu chinh quyen..."
          ></textarea>
        </mat-form-field>
      }
    </mat-dialog-content>
    <mat-dialog-actions
      align="end"
      class="!flex !flex-col gap-2 !pb-4 !pt-2 sm:!flex-row sm:!justify-end"
    >
      <button mat-button type="button" (click)="cancel()" [disabled]="sending()">Huy</button>
      <div class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <button
          mat-stroked-button
          color="warn"
          type="button"
          (click)="submit(false)"
          [disabled]="loading() || !!loadError() || !task() || sending()"
        >
          Tu choi de xuat
        </button>
        <button
          mat-flat-button
          color="primary"
          type="button"
          (click)="submit(true)"
          [disabled]="loading() || !!loadError() || !task() || sending()"
        >
          Chap nhan de xuat
        </button>
      </div>
    </mat-dialog-actions>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CounterResponseDialogComponent, { className: "CounterResponseDialogComponent", filePath: "src/access-request/my-request/counter-response-dialog.component.ts", lineNumber: 90 });
})();

// src/access-request/my-request/my-requests.ts
function MyAccessRequests_Conditional_11_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, " Ban co ");
    \u0275\u0275elementStart(2, "b");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " yeu cau can bo sung thong tin tu admin. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.needInfoCount());
  }
}
function MyAccessRequests_Conditional_11_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, " Ban co ");
    \u0275\u0275elementStart(2, "b");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " de xuat dieu chinh quyen can xac nhan. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.counterProposalCount());
  }
}
function MyAccessRequests_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 6)(1, "div", 9)(2, "div", 10);
    \u0275\u0275conditionalCreate(3, MyAccessRequests_Conditional_11_Conditional_3_Template, 5, 1, "div");
    \u0275\u0275conditionalCreate(4, MyAccessRequests_Conditional_11_Conditional_4_Template, 5, 1, "div");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 11);
    \u0275\u0275listener("click", function MyAccessRequests_Conditional_11_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPendingTasks());
    });
    \u0275\u0275elementStart(6, "mat-icon", 5);
    \u0275\u0275text(7, "assignment");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Mo task can xu ly ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.needInfoCount() > 0 ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.counterProposalCount() > 0 ? 4 : -1);
  }
}
function MyAccessRequests_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1, "Dang tai du lieu...");
    \u0275\u0275elementEnd();
  }
}
function MyAccessRequests_Conditional_14_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "Request ID");
    \u0275\u0275elementEnd();
  }
}
function MyAccessRequests_Conditional_14_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("#", item_r3.requestId);
  }
}
function MyAccessRequests_Conditional_14_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "Department");
    \u0275\u0275elementEnd();
  }
}
function MyAccessRequests_Conditional_14_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r4.departmentCode);
  }
}
function MyAccessRequests_Conditional_14_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "Status");
    \u0275\u0275elementEnd();
  }
}
function MyAccessRequests_Conditional_14_td_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275listener("click", function MyAccessRequests_Conditional_14_td_10_Conditional_1_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openClarifyDialog(item_r6, $event));
    })("keydown.enter", function MyAccessRequests_Conditional_14_td_10_Conditional_1_Template_span_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openClarifyDialog(item_r6, $event));
    })("keydown.space", function MyAccessRequests_Conditional_14_td_10_Conditional_1_Template_span_keydown_space_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.openClarifyDialog(item_r6, $event));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "mat-icon", 30);
    \u0275\u0275text(3, "info");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.statusLabel(item_r6.status), " ");
  }
}
function MyAccessRequests_Conditional_14_td_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275listener("click", function MyAccessRequests_Conditional_14_td_10_Conditional_2_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openCounterDialog(item_r6, $event));
    })("keydown.enter", function MyAccessRequests_Conditional_14_td_10_Conditional_2_Template_span_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openCounterDialog(item_r6, $event));
    })("keydown.space", function MyAccessRequests_Conditional_14_td_10_Conditional_2_Template_span_keydown_space_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.openCounterDialog(item_r6, $event));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "mat-icon", 30);
    \u0275\u0275text(3, "published_with_changes");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.statusLabel(item_r6.status), " ");
  }
}
function MyAccessRequests_Conditional_14_td_10_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 32);
    \u0275\u0275text(1, "mail");
    \u0275\u0275elementEnd();
  }
}
function MyAccessRequests_Conditional_14_td_10_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, MyAccessRequests_Conditional_14_td_10_Conditional_3_Conditional_2_Template, 2, 0, "mat-icon", 32);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.statusLabel(item_r6.status), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r6.status === "PROVISIONED" || item_r6.status === "REJECTED" ? 2 : -1);
  }
}
function MyAccessRequests_Conditional_14_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275conditionalCreate(1, MyAccessRequests_Conditional_14_td_10_Conditional_1_Template, 4, 1, "span", 26)(2, MyAccessRequests_Conditional_14_td_10_Conditional_2_Template, 4, 1, "span", 27)(3, MyAccessRequests_Conditional_14_td_10_Conditional_3_Template, 3, 2, "span", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r6.status === "NEED_MORE_INFO" ? 1 : item_r6.status === "COUNTER_PROPOSED" ? 2 : 3);
  }
}
function MyAccessRequests_Conditional_14_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "Updated");
    \u0275\u0275elementEnd();
  }
}
function MyAccessRequests_Conditional_14_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formatDate(item_r8.updatedAt));
  }
}
function MyAccessRequests_Conditional_14_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "Message");
    \u0275\u0275elementEnd();
  }
}
function MyAccessRequests_Conditional_14_td_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275listener("click", function MyAccessRequests_Conditional_14_td_16_Conditional_1_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const item_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.isMessageActionable(item_r10) && ctx_r1.openMessageAction(item_r10, $event));
    })("keydown.enter", function MyAccessRequests_Conditional_14_td_16_Conditional_1_Template_div_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const item_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.isMessageActionable(item_r10) && ctx_r1.openMessageAction(item_r10, $event));
    })("keydown.space", function MyAccessRequests_Conditional_14_td_16_Conditional_1_Template_div_keydown_space_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const item_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.isMessageActionable(item_r10) && ctx_r1.openMessageAction(item_r10, $event));
    });
    \u0275\u0275elementStart(1, "div", 37);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 38);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("cursor-pointer", ctx_r1.isMessageActionable(item_r10))("hover:bg-slate-100", ctx_r1.isMessageActionable(item_r10))("ring-offset-2", ctx_r1.isMessageActionable(item_r10))("focus-visible:ring-2", ctx_r1.isMessageActionable(item_r10))("focus-visible:ring-slate-400", ctx_r1.isMessageActionable(item_r10));
    \u0275\u0275property("matTooltip", ctx_r1.isMessageActionable(item_r10) ? "Click de xu ly task nay" : "");
    \u0275\u0275attribute("role", ctx_r1.isMessageActionable(item_r10) ? "button" : null)("tabindex", ctx_r1.isMessageActionable(item_r10) ? 0 : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.messageLabel(item_r10));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.messageText(item_r10));
  }
}
function MyAccessRequests_Conditional_14_td_16_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function MyAccessRequests_Conditional_14_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275conditionalCreate(1, MyAccessRequests_Conditional_14_td_16_Conditional_1_Template, 5, 15, "div", 34)(2, MyAccessRequests_Conditional_14_td_16_Conditional_2_Template, 2, 0, "span", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.hasMessage(item_r10) ? 1 : 2);
  }
}
function MyAccessRequests_Conditional_14_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 39);
  }
}
function MyAccessRequests_Conditional_14_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 40);
  }
}
function MyAccessRequests_Conditional_14_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1, "Ban chua co yeu cau nao.");
    \u0275\u0275elementEnd();
  }
}
function MyAccessRequests_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "table", 13);
    \u0275\u0275elementContainerStart(2, 14);
    \u0275\u0275template(3, MyAccessRequests_Conditional_14_th_3_Template, 2, 0, "th", 15)(4, MyAccessRequests_Conditional_14_td_4_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 17);
    \u0275\u0275template(6, MyAccessRequests_Conditional_14_th_6_Template, 2, 0, "th", 15)(7, MyAccessRequests_Conditional_14_td_7_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 18);
    \u0275\u0275template(9, MyAccessRequests_Conditional_14_th_9_Template, 2, 0, "th", 15)(10, MyAccessRequests_Conditional_14_td_10_Template, 4, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 19);
    \u0275\u0275template(12, MyAccessRequests_Conditional_14_th_12_Template, 2, 0, "th", 15)(13, MyAccessRequests_Conditional_14_td_13_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 20);
    \u0275\u0275template(15, MyAccessRequests_Conditional_14_th_15_Template, 2, 0, "th", 15)(16, MyAccessRequests_Conditional_14_td_16_Template, 3, 1, "td", 21);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(17, MyAccessRequests_Conditional_14_tr_17_Template, 1, 0, "tr", 22)(18, MyAccessRequests_Conditional_14_tr_18_Template, 1, 0, "tr", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(19, MyAccessRequests_Conditional_14_Conditional_19_Template, 2, 0, "div", 8);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.items());
    \u0275\u0275advance(16);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.items().length === 0 ? 19 : -1);
  }
}
var MyAccessRequests = class _MyAccessRequests {
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  dialog = inject(MatDialog);
  webSocketNotificationService = inject(WebSocketNotificationService);
  destroyRef = inject(DestroyRef);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : (
    /* istanbul ignore next */
    []
  ));
  displayedColumns = ["requestId", "departmentCode", "status", "message", "updatedAt"];
  needInfoCount = signal(0, ...ngDevMode ? [{ debugName: "needInfoCount" }] : (
    /* istanbul ignore next */
    []
  ));
  counterProposalCount = signal(0, ...ngDevMode ? [{ debugName: "counterProposalCount" }] : (
    /* istanbul ignore next */
    []
  ));
  constructor() {
    this.loadData();
    this.webSocketNotificationService.camundaTasksRefresh$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.loadData();
      window.setTimeout(() => this.loadData(), 550);
    });
  }
  loadData() {
    this.loading.set(true);
    this.authService.getMyAccessRequests().subscribe({
      next: (response) => {
        this.loading.set(false);
        const rows = response.result || [];
        this.items.set(rows);
        this.refreshUserNotifications(rows);
      },
      error: (error) => {
        this.loading.set(false);
        const fallback = "Khong the tai danh sach yeu cau cua ban.";
        const message = typeof error === "object" && error !== null && "error" in error ? error.error?.message || fallback : fallback;
        this.snackBar.open(message, "Dong", { duration: 5e3 });
      }
    });
  }
  formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleString("vi-VN");
  }
  goToPendingTasks() {
    this.router.navigate(["/camunda/tasks"]);
  }
  openClarifyDialog(item, event) {
    event.stopPropagation();
    if (item.status !== "NEED_MORE_INFO") {
      return;
    }
    this.dialog.open(ClarifyRequestDialogComponent, {
      width: "min(520px, 100vw)",
      data: { requestId: item.requestId, adminFeedback: item.adminFeedback ?? null }
    }).afterClosed().subscribe((sent) => {
      if (sent) {
        this.loadData();
      }
    });
  }
  openCounterDialog(item, event) {
    event.stopPropagation();
    if (item.status !== "COUNTER_PROPOSED") {
      return;
    }
    this.dialog.open(CounterResponseDialogComponent, {
      width: "min(520px, 100vw)",
      data: { requestId: item.requestId, adminFeedback: item.adminFeedback ?? null }
    }).afterClosed().subscribe((sent) => {
      if (sent) {
        this.loadData();
      }
    });
  }
  refreshUserNotifications(rows) {
    const needInfo = rows.filter((item) => item.status === "NEED_MORE_INFO").length;
    const counter = rows.filter((item) => item.status === "COUNTER_PROPOSED").length;
    this.needInfoCount.set(needInfo);
    this.counterProposalCount.set(counter);
    if (needInfo > 0 || counter > 0) {
      const summary = [
        needInfo > 0 ? `${needInfo} yeu cau can bo sung thong tin` : "",
        counter > 0 ? `${counter} yeu cau can xac nhan de xuat` : ""
      ].filter(Boolean).join(" | ");
      this.snackBar.open(`Thong bao moi: ${summary}.`, "Xem task", { duration: 6e3 }).onAction().subscribe(() => this.goToPendingTasks());
    }
  }
  statusLabel(status) {
    switch (status) {
      case "PENDING_APPROVAL":
        return "CHO DUYET";
      case "NEED_MORE_INFO":
        return "CAN BO SUNG THONG TIN";
      case "COUNTER_PROPOSED":
        return "DE XUAT DIEU CHINH";
      case "PROVISIONING":
        return "DANG CAP QUYEN";
      case "PROVISIONED":
        return "DA CAP QUYEN";
      case "PROVISION_FAILED":
        return "CAP QUYEN THAT BAI";
      case "REJECTED":
        return "TU CHOI";
      default:
        return status;
    }
  }
  messageLabel(item) {
    if (item.status === "NEED_MORE_INFO") {
      return "Yeu cau bo sung tu admin";
    }
    if (item.status === "COUNTER_PROPOSED") {
      return "De xuat dieu chinh tu admin";
    }
    return "Message";
  }
  messageText(item) {
    const text = item.adminFeedback?.trim() || "";
    return text || "-";
  }
  hasMessage(item) {
    return this.messageText(item) !== "-";
  }
  isMessageActionable(item) {
    return item.status === "NEED_MORE_INFO" || item.status === "COUNTER_PROPOSED";
  }
  openMessageAction(item, event) {
    if (item.status === "NEED_MORE_INFO") {
      this.openClarifyDialog(item, event);
      return;
    }
    if (item.status === "COUNTER_PROPOSED") {
      this.openCounterDialog(item, event);
    }
  }
  static \u0275fac = function MyAccessRequests_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MyAccessRequests)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MyAccessRequests, selectors: [["app-my-access-requests"]], decls: 15, vars: 2, consts: [[1, "mx-auto", "max-w-6xl"], [1, "mb-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-2"], [1, "text-2xl", "font-bold", "text-slate-800"], [1, "text-sm", "text-slate-500"], ["mat-stroked-button", "", "color", "primary", 3, "click"], [1, "mr-1"], [1, "mb-4", "rounded-2xl", "border", "border-amber-200", "bg-amber-50", "shadow-sm"], [1, "overflow-hidden", "rounded-3xl", "border-none", "shadow-xl"], [1, "px-6", "py-10", "text-center", "text-slate-500"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "px-4", "py-3", "sm:px-6"], [1, "text-sm", "text-amber-900"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "overflow-x-auto"], ["mat-table", "", 1, "min-w-[1020px]", "w-full", 3, "dataSource"], ["matColumnDef", "requestId"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "departmentCode"], ["matColumnDef", "status"], ["matColumnDef", "updatedAt"], ["matColumnDef", "message"], ["mat-cell", "", "class", "max-w-[360px] py-3 align-top", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["role", "button", "tabindex", "0", "matTooltip", "Admin yeu cau bo sung \u2014 click de nhap va gui lai cho admin", 1, "inline-flex", "cursor-pointer", "items-center", "gap-1", "rounded-full", "bg-slate-100", "px-3", "py-1", "text-xs", "font-semibold", "outline-none", "ring-offset-2", "hover:bg-slate-200", "focus-visible:ring-2", "focus-visible:ring-slate-400"], ["role", "button", "tabindex", "0", "matTooltip", "Click de chap nhan hoac tu choi de xuat dieu chinh cua admin", 1, "inline-flex", "cursor-pointer", "items-center", "gap-1", "rounded-full", "bg-slate-100", "px-3", "py-1", "text-xs", "font-semibold", "outline-none", "ring-offset-2", "hover:bg-slate-200", "focus-visible:ring-2", "focus-visible:ring-slate-400"], [1, "rounded-full", "bg-slate-100", "px-3", "py-1", "text-xs", "font-semibold"], ["role", "button", "tabindex", "0", "matTooltip", "Admin yeu cau bo sung \u2014 click de nhap va gui lai cho admin", 1, "inline-flex", "cursor-pointer", "items-center", "gap-1", "rounded-full", "bg-slate-100", "px-3", "py-1", "text-xs", "font-semibold", "outline-none", "ring-offset-2", "hover:bg-slate-200", "focus-visible:ring-2", "focus-visible:ring-slate-400", 3, "click", "keydown.enter", "keydown.space"], ["color", "accent", 1, "!text-base"], ["role", "button", "tabindex", "0", "matTooltip", "Click de chap nhan hoac tu choi de xuat dieu chinh cua admin", 1, "inline-flex", "cursor-pointer", "items-center", "gap-1", "rounded-full", "bg-slate-100", "px-3", "py-1", "text-xs", "font-semibold", "outline-none", "ring-offset-2", "hover:bg-slate-200", "focus-visible:ring-2", "focus-visible:ring-slate-400", 3, "click", "keydown.enter", "keydown.space"], ["color", "primary", "matTooltip", "\u0110\xE3 g\u1EEDi email th\xF4ng b\xE1o"], ["mat-cell", "", 1, "max-w-[360px]", "py-3", "align-top"], [1, "rounded-lg", "border", "border-slate-200", "bg-slate-50", "p-2.5", "text-xs", 3, "cursor-pointer", "hover:bg-slate-100", "ring-offset-2", "focus-visible:ring-2", "focus-visible:ring-slate-400", "matTooltip"], [1, "text-xs", "text-slate-400"], [1, "rounded-lg", "border", "border-slate-200", "bg-slate-50", "p-2.5", "text-xs", 3, "click", "keydown.enter", "keydown.space", "matTooltip"], [1, "mb-1", "font-semibold", "text-slate-700"], [1, "whitespace-pre-wrap", "break-words", "text-slate-600"], ["mat-header-row", ""], ["mat-row", ""]], template: function MyAccessRequests_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275text(4, "Yeu cau cua toi");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Theo doi trang thai cac phieu cap quyen da gui.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 4);
      \u0275\u0275listener("click", function MyAccessRequests_Template_button_click_7_listener() {
        return ctx.loadData();
      });
      \u0275\u0275elementStart(8, "mat-icon", 5);
      \u0275\u0275text(9, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(10, " Tai lai ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(11, MyAccessRequests_Conditional_11_Template, 9, 2, "mat-card", 6);
      \u0275\u0275elementStart(12, "mat-card", 7);
      \u0275\u0275conditionalCreate(13, MyAccessRequests_Conditional_13_Template, 2, 0, "div", 8)(14, MyAccessRequests_Conditional_14_Template, 20, 4);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275conditional(ctx.needInfoCount() > 0 || ctx.counterProposalCount() > 0 ? 11 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 13 : 14);
    }
  }, dependencies: [
    MatButtonModule,
    MatButton,
    MatCardModule,
    MatCard,
    MatDialogModule,
    MatIconModule,
    MatIcon,
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
    MatRow,
    MatTooltipModule,
    MatTooltip
  ], styles: ["\ntable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \ntable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n/*# sourceMappingURL=my-requests.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MyAccessRequests, [{
    type: Component,
    args: [{ selector: "app-my-access-requests", standalone: true, imports: [
      MatButtonModule,
      MatCardModule,
      MatDialogModule,
      MatIconModule,
      MatSnackBarModule,
      MatTableModule,
      MatTooltipModule
    ], template: `<div class="mx-auto max-w-6xl">\r
  <div class="mb-4 flex flex-wrap items-center justify-between gap-2">\r
    <div>\r
      <h1 class="text-2xl font-bold text-slate-800">Yeu cau cua toi</h1>\r
      <p class="text-sm text-slate-500">Theo doi trang thai cac phieu cap quyen da gui.</p>\r
    </div>\r
    <button mat-stroked-button color="primary" (click)="loadData()">\r
      <mat-icon class="mr-1">refresh</mat-icon>\r
      Tai lai\r
    </button>\r
  </div>\r
\r
  @if (needInfoCount() > 0 || counterProposalCount() > 0) {\r
    <mat-card class="mb-4 rounded-2xl border border-amber-200 bg-amber-50 shadow-sm">\r
      <div class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">\r
        <div class="text-sm text-amber-900">\r
          @if (needInfoCount() > 0) {\r
            <div>\r
              Ban co <b>{{ needInfoCount() }}</b> yeu cau can bo sung thong tin tu admin.\r
            </div>\r
          }\r
          @if (counterProposalCount() > 0) {\r
            <div>\r
              Ban co <b>{{ counterProposalCount() }}</b> de xuat dieu chinh quyen can xac nhan.\r
            </div>\r
          }\r
        </div>\r
        <button mat-flat-button color="primary" (click)="goToPendingTasks()">\r
          <mat-icon class="mr-1">assignment</mat-icon>\r
          Mo task can xu ly\r
        </button>\r
      </div>\r
    </mat-card>\r
  }\r
\r
  <mat-card class="overflow-hidden rounded-3xl border-none shadow-xl">\r
    @if (loading()) {\r
      <div class="px-6 py-10 text-center text-slate-500">Dang tai du lieu...</div>\r
    } @else {\r
      <div class="overflow-x-auto">\r
        <table mat-table [dataSource]="items()" class="min-w-[1020px] w-full">\r
          <ng-container matColumnDef="requestId">\r
            <th mat-header-cell *matHeaderCellDef>Request ID</th>\r
            <td mat-cell *matCellDef="let item">#{{ item.requestId }}</td>\r
          </ng-container>\r
\r
          <ng-container matColumnDef="departmentCode">\r
            <th mat-header-cell *matHeaderCellDef>Department</th>\r
            <td mat-cell *matCellDef="let item">{{ item.departmentCode }}</td>\r
          </ng-container>\r
\r
          <ng-container matColumnDef="status">\r
            <th mat-header-cell *matHeaderCellDef>Status</th>\r
            <td mat-cell *matCellDef="let item">\r
              @if (item.status === 'NEED_MORE_INFO') {\r
                <span\r
                  role="button"\r
                  tabindex="0"\r
                  class="inline-flex cursor-pointer items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold outline-none ring-offset-2 hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-400"\r
                  (click)="openClarifyDialog(item, $event)"\r
                  (keydown.enter)="openClarifyDialog(item, $event)"\r
                  (keydown.space)="$event.preventDefault(); openClarifyDialog(item, $event)"\r
                  matTooltip="Admin yeu cau bo sung \u2014 click de nhap va gui lai cho admin"\r
                >\r
                  {{ statusLabel(item.status) }}\r
                  <mat-icon color="accent" class="!text-base">info</mat-icon>\r
                </span>\r
              } @else if (item.status === 'COUNTER_PROPOSED') {\r
                <span\r
                  role="button"\r
                  tabindex="0"\r
                  class="inline-flex cursor-pointer items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold outline-none ring-offset-2 hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-400"\r
                  (click)="openCounterDialog(item, $event)"\r
                  (keydown.enter)="openCounterDialog(item, $event)"\r
                  (keydown.space)="$event.preventDefault(); openCounterDialog(item, $event)"\r
                  matTooltip="Click de chap nhan hoac tu choi de xuat dieu chinh cua admin"\r
                >\r
                  {{ statusLabel(item.status) }}\r
                  <mat-icon color="accent" class="!text-base">published_with_changes</mat-icon>\r
                </span>\r
              } @else {\r
                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">\r
                  {{ statusLabel(item.status) }}\r
                  @if (item.status === 'PROVISIONED' || item.status === 'REJECTED') {\r
                    <mat-icon color="primary" matTooltip="\u0110\xE3 g\u1EEDi email th\xF4ng b\xE1o">mail</mat-icon>\r
                  }\r
                </span>\r
              }\r
            </td>\r
          </ng-container>\r
\r
          <ng-container matColumnDef="updatedAt">\r
            <th mat-header-cell *matHeaderCellDef>Updated</th>\r
            <td mat-cell *matCellDef="let item">{{ formatDate(item.updatedAt) }}</td>\r
          </ng-container>\r
\r
          <ng-container matColumnDef="message">\r
            <th mat-header-cell *matHeaderCellDef>Message</th>\r
            <td mat-cell *matCellDef="let item" class="max-w-[360px] py-3 align-top">\r
              @if (hasMessage(item)) {\r
                <div\r
                  class="rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs"\r
                  [class.cursor-pointer]="isMessageActionable(item)"\r
                  [class.hover:bg-slate-100]="isMessageActionable(item)"\r
                  [class.ring-offset-2]="isMessageActionable(item)"\r
                  [class.focus-visible:ring-2]="isMessageActionable(item)"\r
                  [class.focus-visible:ring-slate-400]="isMessageActionable(item)"\r
                  [attr.role]="isMessageActionable(item) ? 'button' : null"\r
                  [attr.tabindex]="isMessageActionable(item) ? 0 : null"\r
                  (click)="isMessageActionable(item) && openMessageAction(item, $event)"\r
                  (keydown.enter)="isMessageActionable(item) && openMessageAction(item, $event)"\r
                  (keydown.space)="$event.preventDefault(); isMessageActionable(item) && openMessageAction(item, $event)"\r
                  [matTooltip]="isMessageActionable(item) ? 'Click de xu ly task nay' : ''"\r
                >\r
                  <div class="mb-1 font-semibold text-slate-700">{{ messageLabel(item) }}</div>\r
                  <div class="whitespace-pre-wrap break-words text-slate-600">{{ messageText(item) }}</div>\r
                </div>\r
              } @else {\r
                <span class="text-xs text-slate-400">-</span>\r
              }\r
            </td>\r
          </ng-container>\r
\r
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>\r
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>\r
        </table>\r
      </div>\r
      @if (items().length === 0) {\r
        <div class="px-6 py-10 text-center text-slate-500">Ban chua co yeu cau nao.</div>\r
      }\r
    }\r
  </mat-card>\r
</div>\r
`, styles: ["/* src/access-request/my-request/my-requests.css */\ntable th,\ntable td {\n  white-space: nowrap;\n}\n/*# sourceMappingURL=my-requests.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MyAccessRequests, { className: "MyAccessRequests", filePath: "src/access-request/my-request/my-requests.ts", lineNumber: 32 });
})();
export {
  MyAccessRequests
};
//# sourceMappingURL=chunk-BSVJ3DLI.mjs.map

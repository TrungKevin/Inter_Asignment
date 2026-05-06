import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MatTooltip,
  SCROLL_THROTTLE_MS,
  TOOLTIP_PANEL_CLASS,
  TooltipComponent,
  getMatTooltipInvalidPositionError
} from "./chunk-T4N5HK7I.js";
import {
  OverlayModule
} from "./chunk-FL6CIPEW.js";
import "./chunk-BJOPSJXP.js";
import {
  A11yModule
} from "./chunk-DSDMZQSS.js";
import "./chunk-FRDSCNXS.js";
import "./chunk-FK5EGZH3.js";
import "./chunk-XCMRARAC.js";
import "./chunk-5HTDQW7L.js";
import "./chunk-2DZ6QDHV.js";
import "./chunk-J4KEUL6E.js";
import "./chunk-PFQNFCDI.js";
import "./chunk-4K4LWLKB.js";
import {
  CdkScrollableModule
} from "./chunk-JORKZBCN.js";
import "./chunk-K3EHEM7D.js";
import "./chunk-FDCSL6M2.js";
import "./chunk-K7ZJFBAM.js";
import "./chunk-FOY6ZVXQ.js";
import "./chunk-CNLWKH7C.js";
import {
  BidiModule
} from "./chunk-FEVVYGHM.js";
import {
  NgModule,
  setClassMetadata,
  ɵɵdefineNgModule
} from "./chunk-KIPV6MCY.js";
import {
  ɵɵdefineInjector
} from "./chunk-M5K2PDKS.js";
import "./chunk-53B2AV33.js";
import "./chunk-D5HPMNDN.js";
import "./chunk-W3LQWAEF.js";
import "./chunk-H2SRQSE4.js";

// node_modules/@angular/material/fesm2022/tooltip.mjs
var MatTooltipModule = class _MatTooltipModule {
  static ɵfac = function MatTooltipModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTooltipModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatTooltipModule,
    imports: [A11yModule, OverlayModule, MatTooltip, TooltipComponent],
    exports: [MatTooltip, TooltipComponent, BidiModule, CdkScrollableModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [A11yModule, OverlayModule, BidiModule, CdkScrollableModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltipModule, [{
    type: NgModule,
    args: [{
      imports: [A11yModule, OverlayModule, MatTooltip, TooltipComponent],
      exports: [MatTooltip, TooltipComponent, BidiModule, CdkScrollableModule]
    }]
  }], null, null);
})();
export {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MatTooltip,
  MatTooltipModule,
  SCROLL_THROTTLE_MS,
  TOOLTIP_PANEL_CLASS,
  TooltipComponent,
  getMatTooltipInvalidPositionError
};
//# sourceMappingURL=@angular_material_tooltip.js.map

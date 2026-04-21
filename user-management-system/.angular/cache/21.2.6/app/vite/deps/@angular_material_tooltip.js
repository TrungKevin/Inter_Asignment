import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MatTooltip,
  SCROLL_THROTTLE_MS,
  TOOLTIP_PANEL_CLASS,
  TooltipComponent,
  getMatTooltipInvalidPositionError
} from "./chunk-A7NFHGSY.js";
import {
  OverlayModule
} from "./chunk-HGYWNUD7.js";
import {
  CdkScrollableModule
} from "./chunk-IUSUTWOK.js";
import "./chunk-JMTQHBU6.js";
import {
  A11yModule
} from "./chunk-SIIDI753.js";
import "./chunk-43O7LXO7.js";
import "./chunk-GWBU7KI5.js";
import "./chunk-PLJ2QXBA.js";
import "./chunk-N4DOILP3.js";
import "./chunk-3O3ASX4L.js";
import "./chunk-4XEUSGMO.js";
import "./chunk-3E5AE7N5.js";
import "./chunk-HUTXKASU.js";
import "./chunk-GUGIMSVJ.js";
import "./chunk-H56RCX76.js";
import "./chunk-EHUULUR6.js";
import {
  BidiModule
} from "./chunk-UEHF76BZ.js";
import "./chunk-MV2XZFJL.js";
import "./chunk-ASAWKQNC.js";
import {
  NgModule,
  setClassMetadata,
  ɵɵdefineNgModule
} from "./chunk-G6S5EMIQ.js";
import {
  ɵɵdefineInjector
} from "./chunk-HGQZ4Q3T.js";
import "./chunk-JRFR6BLO.js";
import "./chunk-HWYXSU2G.js";
import "./chunk-MARUHEWW.js";
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

import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MatTooltip,
  SCROLL_THROTTLE_MS,
  TOOLTIP_PANEL_CLASS,
  TooltipComponent,
  getMatTooltipInvalidPositionError
} from "./chunk-EHLHC3RG.js";
import "./chunk-JMTQHBU6.js";
import {
  OverlayModule
} from "./chunk-LSRKAWEO.js";
import {
  A11yModule
} from "./chunk-R6NLQWAG.js";
import "./chunk-4QHWMH6K.js";
import "./chunk-GWBU7KI5.js";
import "./chunk-PLJ2QXBA.js";
import "./chunk-N4DOILP3.js";
import "./chunk-3O3ASX4L.js";
import "./chunk-I5A7O4WC.js";
import "./chunk-OLTVLP4I.js";
import "./chunk-3E5AE7N5.js";
import {
  CdkScrollableModule
} from "./chunk-PFFDPCGZ.js";
import "./chunk-GUGIMSVJ.js";
import "./chunk-M6AYRN3F.js";
import "./chunk-EHUULUR6.js";
import "./chunk-QZTC6BCY.js";
import "./chunk-7D7JBIRV.js";
import {
  BidiModule
} from "./chunk-UEHF76BZ.js";
import {
  NgModule,
  setClassMetadata,
  ɵɵdefineNgModule
} from "./chunk-G6S5EMIQ.js";
import {
  ɵɵdefineInjector
} from "./chunk-HGQZ4Q3T.js";
import "./chunk-HWYXSU2G.js";
import "./chunk-JRFR6BLO.js";
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

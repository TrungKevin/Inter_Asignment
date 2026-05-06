import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MatTooltip,
  SCROLL_THROTTLE_MS,
  TOOLTIP_PANEL_CLASS,
  TooltipComponent,
  getMatTooltipInvalidPositionError
} from "./chunk-QJRXTN4N.js";
import {
  OverlayModule
} from "./chunk-3F4PHQN7.js";
import {
  A11yModule
} from "./chunk-SGPASZKA.js";
import "./chunk-ZJVDVSOP.js";
import "./chunk-JURDHBKJ.js";
import "./chunk-L3CYT4SN.js";
import "./chunk-727Z23DA.js";
import "./chunk-OIKWG4H4.js";
import "./chunk-MHAXTPPT.js";
import "./chunk-JWLQVZD5.js";
import "./chunk-WX7GVM73.js";
import {
  CdkScrollableModule
} from "./chunk-XBSL47F7.js";
import "./chunk-ACJJXWGN.js";
import "./chunk-PWPLGKUC.js";
import "./chunk-S3ABDIVS.js";
import "./chunk-6PE7DZS7.js";
import "./chunk-NGETJG7O.js";
import "./chunk-S5ZIMU26.js";
import {
  BidiModule
} from "./chunk-X353GSRW.js";
import {
  NgModule,
  setClassMetadata,
  ɵɵdefineNgModule
} from "./chunk-WTBOSQT2.js";
import {
  ɵɵdefineInjector
} from "./chunk-IDRFOCLW.js";
import {
  require_operators
} from "./chunk-3ZX642I5.js";
import {
  require_cjs
} from "./chunk-ONP5LV6Q.js";
import "./chunk-AQT54UAN.js";
import {
  __toESM
} from "./chunk-6DU2HRTW.js";

// node_modules/@angular/material/fesm2022/tooltip.mjs
var import_operators = __toESM(require_operators(), 1);
var import_rxjs = __toESM(require_cjs(), 1);
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

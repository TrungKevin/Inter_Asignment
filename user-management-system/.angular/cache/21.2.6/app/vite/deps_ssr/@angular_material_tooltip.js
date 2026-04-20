import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MatTooltip,
  SCROLL_THROTTLE_MS,
  TOOLTIP_PANEL_CLASS,
  TooltipComponent,
  getMatTooltipInvalidPositionError
} from "./chunk-76BDXJ6B.js";
import {
  OverlayModule
} from "./chunk-LGBXN7VA.js";
import "./chunk-DR5RAOGN.js";
import {
  A11yModule
} from "./chunk-2OXLG5M2.js";
import "./chunk-MAKURNMG.js";
import "./chunk-NXDSQKND.js";
import "./chunk-JS5ASQ4R.js";
import "./chunk-HAZYOZPT.js";
import "./chunk-QXMQG3W5.js";
import "./chunk-LYXPMLBT.js";
import "./chunk-7SEVWCZH.js";
import {
  CdkScrollableModule
} from "./chunk-KMVK3UPE.js";
import "./chunk-KQYFGZWB.js";
import "./chunk-5NU4SDSO.js";
import "./chunk-DMT444PS.js";
import "./chunk-5WKUXZFF.js";
import "./chunk-NKONTKEM.js";
import "./chunk-S7M6Q7R3.js";
import {
  BidiModule
} from "./chunk-XNLKJG6P.js";
import {
  NgModule,
  setClassMetadata,
  ɵɵdefineNgModule
} from "./chunk-3J7M63DO.js";
import {
  ɵɵdefineInjector
} from "./chunk-S2TUEVEQ.js";
import {
  require_cjs
} from "./chunk-C27DBZK2.js";
import {
  require_operators
} from "./chunk-2UVUUPPC.js";
import "./chunk-K54IFBYX.js";
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

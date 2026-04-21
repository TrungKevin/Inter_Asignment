export default `<!DOCTYPE html><html lang="en" data-beasties-container><head>
    <meta charset="utf-8">
    <title>Google AI Studio Angular App</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
  <style>@font-face{font-family:Inter;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2) format("woff2");unicode-range:U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Inter;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2) format("woff2");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Inter;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2) format("woff2");unicode-range:U+1F00-1FFF}@font-face{font-family:Inter;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2) format("woff2");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:Inter;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2pL7SUc.woff2) format("woff2");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Inter;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2) format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Inter;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Inter;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2) format("woff2");unicode-range:U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Inter;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2) format("woff2");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Inter;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2) format("woff2");unicode-range:U+1F00-1FFF}@font-face{font-family:Inter;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2) format("woff2");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:Inter;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2pL7SUc.woff2) format("woff2");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Inter;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2) format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Inter;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Inter;font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2) format("woff2");unicode-range:U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Inter;font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2) format("woff2");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Inter;font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2) format("woff2");unicode-range:U+1F00-1FFF}@font-face{font-family:Inter;font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2) format("woff2");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:Inter;font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2pL7SUc.woff2) format("woff2");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Inter;font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2) format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Inter;font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Inter;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2) format("woff2");unicode-range:U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Inter;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2) format("woff2");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Inter;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2) format("woff2");unicode-range:U+1F00-1FFF}@font-face{font-family:Inter;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2) format("woff2");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:Inter;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2pL7SUc.woff2) format("woff2");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Inter;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2) format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Inter;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:JetBrains Mono;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx3cwhsk.woff2) format("woff2");unicode-range:U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:JetBrains Mono;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxTcwhsk.woff2) format("woff2");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:JetBrains Mono;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxPcwhsk.woff2) format("woff2");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:JetBrains Mono;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx_cwhsk.woff2) format("woff2");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:JetBrains Mono;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx7cwhsk.woff2) format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:JetBrains Mono;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:JetBrains Mono;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx3cwhsk.woff2) format("woff2");unicode-range:U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:JetBrains Mono;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxTcwhsk.woff2) format("woff2");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:JetBrains Mono;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxPcwhsk.woff2) format("woff2");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:JetBrains Mono;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx_cwhsk.woff2) format("woff2");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:JetBrains Mono;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx7cwhsk.woff2) format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:JetBrains Mono;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Material Icons;font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/materialicons/v145/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format("woff2")}.material-icons{font-family:Material Icons;font-weight:400;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}@layer properties;html{--mat-sys-on-surface: initial}html{--mat-app-background-color: #fafafa;--mat-app-text-color: rgba(0, 0, 0, .87);--mat-app-elevation-shadow-level-0: 0px 0px 0px 0px rgba(0, 0, 0, .2), 0px 0px 0px 0px rgba(0, 0, 0, .14), 0px 0px 0px 0px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-1: 0px 2px 1px -1px rgba(0, 0, 0, .2), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-2: 0px 3px 1px -2px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 1px 5px 0px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-3: 0px 3px 3px -2px rgba(0, 0, 0, .2), 0px 3px 4px 0px rgba(0, 0, 0, .14), 0px 1px 8px 0px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-4: 0px 2px 4px -1px rgba(0, 0, 0, .2), 0px 4px 5px 0px rgba(0, 0, 0, .14), 0px 1px 10px 0px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-5: 0px 3px 5px -1px rgba(0, 0, 0, .2), 0px 5px 8px 0px rgba(0, 0, 0, .14), 0px 1px 14px 0px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-6: 0px 3px 5px -1px rgba(0, 0, 0, .2), 0px 6px 10px 0px rgba(0, 0, 0, .14), 0px 1px 18px 0px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-7: 0px 4px 5px -2px rgba(0, 0, 0, .2), 0px 7px 10px 1px rgba(0, 0, 0, .14), 0px 2px 16px 1px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-8: 0px 5px 5px -3px rgba(0, 0, 0, .2), 0px 8px 10px 1px rgba(0, 0, 0, .14), 0px 3px 14px 2px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-9: 0px 5px 6px -3px rgba(0, 0, 0, .2), 0px 9px 12px 1px rgba(0, 0, 0, .14), 0px 3px 16px 2px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-10: 0px 6px 6px -3px rgba(0, 0, 0, .2), 0px 10px 14px 1px rgba(0, 0, 0, .14), 0px 4px 18px 3px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-11: 0px 6px 7px -4px rgba(0, 0, 0, .2), 0px 11px 15px 1px rgba(0, 0, 0, .14), 0px 4px 20px 3px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-12: 0px 7px 8px -4px rgba(0, 0, 0, .2), 0px 12px 17px 2px rgba(0, 0, 0, .14), 0px 5px 22px 4px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-13: 0px 7px 8px -4px rgba(0, 0, 0, .2), 0px 13px 19px 2px rgba(0, 0, 0, .14), 0px 5px 24px 4px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-14: 0px 7px 9px -4px rgba(0, 0, 0, .2), 0px 14px 21px 2px rgba(0, 0, 0, .14), 0px 5px 26px 4px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-15: 0px 8px 9px -5px rgba(0, 0, 0, .2), 0px 15px 22px 2px rgba(0, 0, 0, .14), 0px 6px 28px 5px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-16: 0px 8px 10px -5px rgba(0, 0, 0, .2), 0px 16px 24px 2px rgba(0, 0, 0, .14), 0px 6px 30px 5px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-17: 0px 8px 11px -5px rgba(0, 0, 0, .2), 0px 17px 26px 2px rgba(0, 0, 0, .14), 0px 6px 32px 5px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-18: 0px 9px 11px -5px rgba(0, 0, 0, .2), 0px 18px 28px 2px rgba(0, 0, 0, .14), 0px 7px 34px 6px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-19: 0px 9px 12px -6px rgba(0, 0, 0, .2), 0px 19px 29px 2px rgba(0, 0, 0, .14), 0px 7px 36px 6px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-20: 0px 10px 13px -6px rgba(0, 0, 0, .2), 0px 20px 31px 3px rgba(0, 0, 0, .14), 0px 8px 38px 7px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-21: 0px 10px 13px -6px rgba(0, 0, 0, .2), 0px 21px 33px 3px rgba(0, 0, 0, .14), 0px 8px 40px 7px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-22: 0px 10px 14px -6px rgba(0, 0, 0, .2), 0px 22px 35px 3px rgba(0, 0, 0, .14), 0px 8px 42px 7px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-23: 0px 11px 14px -7px rgba(0, 0, 0, .2), 0px 23px 36px 3px rgba(0, 0, 0, .14), 0px 9px 44px 8px rgba(0, 0, 0, .12);--mat-app-elevation-shadow-level-24: 0px 11px 15px -7px rgba(0, 0, 0, .2), 0px 24px 38px 3px rgba(0, 0, 0, .14), 0px 9px 46px 8px rgba(0, 0, 0, .12)}html{--mat-ripple-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent)}html{--mat-option-selected-state-label-text-color: #3f51b5;--mat-option-label-text-color: rgba(0, 0, 0, .87);--mat-option-hover-state-layer-color: color-mix(in srgb, rgba(0, 0, 0, .87) 4%, transparent);--mat-option-focus-state-layer-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-option-selected-state-layer-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent)}.mat-accent{--mat-option-selected-state-label-text-color: #ff4081;--mat-option-label-text-color: rgba(0, 0, 0, .87);--mat-option-hover-state-layer-color: color-mix(in srgb, rgba(0, 0, 0, .87) 4%, transparent);--mat-option-focus-state-layer-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-option-selected-state-layer-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent)}html{--mat-optgroup-label-text-color: rgba(0, 0, 0, .87)}html{--mat-pseudo-checkbox-full-selected-icon-color: #ff4081;--mat-pseudo-checkbox-full-selected-checkmark-color: #fafafa;--mat-pseudo-checkbox-full-unselected-icon-color: rgba(0, 0, 0, .54);--mat-pseudo-checkbox-full-disabled-selected-checkmark-color: #fafafa;--mat-pseudo-checkbox-full-disabled-unselected-icon-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-pseudo-checkbox-full-disabled-selected-icon-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-pseudo-checkbox-minimal-selected-checkmark-color: #ff4081;--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent)}.mat-primary{--mat-pseudo-checkbox-full-selected-icon-color: #3f51b5;--mat-pseudo-checkbox-full-selected-checkmark-color: #fafafa;--mat-pseudo-checkbox-full-unselected-icon-color: rgba(0, 0, 0, .54);--mat-pseudo-checkbox-full-disabled-selected-checkmark-color: #fafafa;--mat-pseudo-checkbox-full-disabled-unselected-icon-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-pseudo-checkbox-full-disabled-selected-icon-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-pseudo-checkbox-minimal-selected-checkmark-color: #3f51b5;--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent)}.mat-accent{--mat-pseudo-checkbox-full-selected-icon-color: #ff4081;--mat-pseudo-checkbox-full-selected-checkmark-color: #fafafa;--mat-pseudo-checkbox-full-unselected-icon-color: rgba(0, 0, 0, .54);--mat-pseudo-checkbox-full-disabled-selected-checkmark-color: #fafafa;--mat-pseudo-checkbox-full-disabled-unselected-icon-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-pseudo-checkbox-full-disabled-selected-icon-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-pseudo-checkbox-minimal-selected-checkmark-color: #ff4081;--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent)}html{--mat-option-label-text-font: Roboto, sans-serif;--mat-option-label-text-line-height: 24px;--mat-option-label-text-size: 16px;--mat-option-label-text-tracking: .03125em;--mat-option-label-text-weight: 400}html{--mat-optgroup-label-text-font: Roboto, sans-serif;--mat-optgroup-label-text-line-height: 24px;--mat-optgroup-label-text-size: 16px;--mat-optgroup-label-text-tracking: .03125em;--mat-optgroup-label-text-weight: 400}html{--mat-card-elevated-container-shape: 4px;--mat-card-outlined-container-shape: 4px;--mat-card-filled-container-shape: 4px;--mat-card-outlined-outline-width: 1px}html{--mat-card-elevated-container-color: white;--mat-card-elevated-container-elevation: 0px 2px 1px -1px rgba(0, 0, 0, .2), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .12);--mat-card-outlined-container-color: white;--mat-card-outlined-container-elevation: 0px 0px 0px 0px rgba(0, 0, 0, .2), 0px 0px 0px 0px rgba(0, 0, 0, .14), 0px 0px 0px 0px rgba(0, 0, 0, .12);--mat-card-outlined-outline-color: rgba(0, 0, 0, .12);--mat-card-subtitle-text-color: rgba(0, 0, 0, .54);--mat-card-filled-container-color: white;--mat-card-filled-container-elevation: 0px 0px 0px 0px rgba(0, 0, 0, .2), 0px 0px 0px 0px rgba(0, 0, 0, .14), 0px 0px 0px 0px rgba(0, 0, 0, .12)}html{--mat-card-title-text-font: Roboto, sans-serif;--mat-card-title-text-line-height: 32px;--mat-card-title-text-size: 20px;--mat-card-title-text-tracking: .0125em;--mat-card-title-text-weight: 500;--mat-card-subtitle-text-font: Roboto, sans-serif;--mat-card-subtitle-text-line-height: 22px;--mat-card-subtitle-text-size: 14px;--mat-card-subtitle-text-tracking: .0071428571em;--mat-card-subtitle-text-weight: 500}html{--mat-progress-bar-active-indicator-height: 4px;--mat-progress-bar-track-height: 4px;--mat-progress-bar-track-shape: 0}html{--mat-tooltip-container-shape: 4px;--mat-tooltip-supporting-text-line-height: 16px}html{--mat-tooltip-container-color: #424242;--mat-tooltip-supporting-text-color: white}html{--mat-tooltip-supporting-text-font: Roboto, sans-serif;--mat-tooltip-supporting-text-size: 12px;--mat-tooltip-supporting-text-weight: 400;--mat-tooltip-supporting-text-tracking: .0333333333em}html{--mat-form-field-filled-active-indicator-height: 1px;--mat-form-field-filled-focus-active-indicator-height: 2px;--mat-form-field-filled-container-shape: 4px;--mat-form-field-outlined-outline-width: 1px;--mat-form-field-outlined-focus-outline-width: 2px;--mat-form-field-outlined-container-shape: 4px}html{--mat-form-field-focus-select-arrow-color: color-mix(in srgb, #3f51b5 87%, transparent);--mat-form-field-filled-caret-color: #3f51b5;--mat-form-field-filled-focus-active-indicator-color: #3f51b5;--mat-form-field-filled-focus-label-text-color: color-mix(in srgb, #3f51b5 87%, transparent);--mat-form-field-outlined-caret-color: #3f51b5;--mat-form-field-outlined-focus-outline-color: #3f51b5;--mat-form-field-outlined-focus-label-text-color: color-mix(in srgb, #3f51b5 87%, transparent);--mat-form-field-disabled-input-text-placeholder-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-form-field-state-layer-color: rgba(0, 0, 0, .87);--mat-form-field-error-text-color: #f44336;--mat-form-field-select-option-text-color: inherit;--mat-form-field-select-disabled-option-text-color: GrayText;--mat-form-field-leading-icon-color: unset;--mat-form-field-disabled-leading-icon-color: unset;--mat-form-field-trailing-icon-color: unset;--mat-form-field-disabled-trailing-icon-color: unset;--mat-form-field-error-focus-trailing-icon-color: unset;--mat-form-field-error-hover-trailing-icon-color: unset;--mat-form-field-error-trailing-icon-color: unset;--mat-form-field-enabled-select-arrow-color: rgba(0, 0, 0, .54);--mat-form-field-disabled-select-arrow-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-form-field-hover-state-layer-opacity: .04;--mat-form-field-focus-state-layer-opacity: .12;--mat-form-field-filled-container-color: #f6f6f6;--mat-form-field-filled-disabled-container-color: color-mix(in srgb, rgba(0, 0, 0, .87) 4%, transparent);--mat-form-field-filled-label-text-color: rgba(0, 0, 0, .54);--mat-form-field-filled-hover-label-text-color: rgba(0, 0, 0, .54);--mat-form-field-filled-disabled-label-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-form-field-filled-input-text-color: rgba(0, 0, 0, .87);--mat-form-field-filled-disabled-input-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-form-field-filled-input-text-placeholder-color: rgba(0, 0, 0, .54);--mat-form-field-filled-error-hover-label-text-color: #f44336;--mat-form-field-filled-error-focus-label-text-color: #f44336;--mat-form-field-filled-error-label-text-color: #f44336;--mat-form-field-filled-error-caret-color: #f44336;--mat-form-field-filled-active-indicator-color: rgba(0, 0, 0, .54);--mat-form-field-filled-disabled-active-indicator-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-form-field-filled-hover-active-indicator-color: rgba(0, 0, 0, .87);--mat-form-field-filled-error-active-indicator-color: #f44336;--mat-form-field-filled-error-focus-active-indicator-color: #f44336;--mat-form-field-filled-error-hover-active-indicator-color: #f44336;--mat-form-field-outlined-label-text-color: rgba(0, 0, 0, .54);--mat-form-field-outlined-hover-label-text-color: rgba(0, 0, 0, .87);--mat-form-field-outlined-disabled-label-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-form-field-outlined-input-text-color: rgba(0, 0, 0, .87);--mat-form-field-outlined-disabled-input-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-form-field-outlined-input-text-placeholder-color: rgba(0, 0, 0, .54);--mat-form-field-outlined-error-caret-color: #f44336;--mat-form-field-outlined-error-focus-label-text-color: #f44336;--mat-form-field-outlined-error-label-text-color: #f44336;--mat-form-field-outlined-error-hover-label-text-color: #f44336;--mat-form-field-outlined-outline-color: rgba(0, 0, 0, .38);--mat-form-field-outlined-disabled-outline-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-form-field-outlined-hover-outline-color: rgba(0, 0, 0, .87);--mat-form-field-outlined-error-focus-outline-color: #f44336;--mat-form-field-outlined-error-hover-outline-color: #f44336;--mat-form-field-outlined-error-outline-color: #f44336}html{--mat-form-field-container-height: 56px;--mat-form-field-filled-label-display: block;--mat-form-field-container-vertical-padding: 16px;--mat-form-field-filled-with-label-container-padding-top: 24px;--mat-form-field-filled-with-label-container-padding-bottom: 8px}html{--mat-form-field-container-text-font: Roboto, sans-serif;--mat-form-field-container-text-line-height: 24px;--mat-form-field-container-text-size: 16px;--mat-form-field-container-text-tracking: .03125em;--mat-form-field-container-text-weight: 400;--mat-form-field-outlined-label-text-populated-size: 16px;--mat-form-field-subscript-text-font: Roboto, sans-serif;--mat-form-field-subscript-text-line-height: 20px;--mat-form-field-subscript-text-size: 12px;--mat-form-field-subscript-text-tracking: .0333333333em;--mat-form-field-subscript-text-weight: 400;--mat-form-field-filled-label-text-font: Roboto, sans-serif;--mat-form-field-filled-label-text-size: 16px;--mat-form-field-filled-label-text-tracking: .03125em;--mat-form-field-filled-label-text-weight: 400;--mat-form-field-outlined-label-text-font: Roboto, sans-serif;--mat-form-field-outlined-label-text-size: 16px;--mat-form-field-outlined-label-text-tracking: .03125em;--mat-form-field-outlined-label-text-weight: 400}html{--mat-select-container-elevation-shadow: 0px 5px 5px -3px rgba(0, 0, 0, .2), 0px 8px 10px 1px rgba(0, 0, 0, .14), 0px 3px 14px 2px rgba(0, 0, 0, .12)}html{--mat-select-panel-background-color: white;--mat-select-enabled-trigger-text-color: rgba(0, 0, 0, .87);--mat-select-disabled-trigger-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-select-placeholder-text-color: rgba(0, 0, 0, .54);--mat-select-enabled-arrow-color: rgba(0, 0, 0, .54);--mat-select-disabled-arrow-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-select-focused-arrow-color: #3f51b5;--mat-select-invalid-arrow-color: #f44336}html{--mat-select-arrow-transform: translateY(-8px)}html{--mat-select-trigger-text-font: Roboto, sans-serif;--mat-select-trigger-text-line-height: 24px;--mat-select-trigger-text-size: 16px;--mat-select-trigger-text-tracking: .03125em;--mat-select-trigger-text-weight: 400}html{--mat-autocomplete-container-shape: 4px;--mat-autocomplete-container-elevation-shadow: 0px 5px 5px -3px rgba(0, 0, 0, .2), 0px 8px 10px 1px rgba(0, 0, 0, .14), 0px 3px 14px 2px rgba(0, 0, 0, .12)}html{--mat-autocomplete-background-color: white}html{--mat-dialog-container-shape: 4px;--mat-dialog-container-elevation-shadow: 0px 11px 15px -7px rgba(0, 0, 0, .2), 0px 24px 38px 3px rgba(0, 0, 0, .14), 0px 9px 46px 8px rgba(0, 0, 0, .12);--mat-dialog-container-max-width: 80vw;--mat-dialog-container-small-max-width: 80vw;--mat-dialog-container-min-width: 0;--mat-dialog-actions-alignment: start;--mat-dialog-actions-padding: 8px;--mat-dialog-content-padding: 20px 24px;--mat-dialog-with-actions-content-padding: 20px 24px;--mat-dialog-headline-padding: 0 24px 9px}html{--mat-dialog-container-color: white;--mat-dialog-subhead-color: rgba(0, 0, 0, .87);--mat-dialog-supporting-text-color: rgba(0, 0, 0, .54)}html{--mat-dialog-subhead-font: Roboto, sans-serif;--mat-dialog-subhead-line-height: 32px;--mat-dialog-subhead-size: 20px;--mat-dialog-subhead-weight: 500;--mat-dialog-subhead-tracking: .0125em;--mat-dialog-supporting-text-font: Roboto, sans-serif;--mat-dialog-supporting-text-line-height: 24px;--mat-dialog-supporting-text-size: 16px;--mat-dialog-supporting-text-weight: 400;--mat-dialog-supporting-text-tracking: .03125em}html{--mat-slide-toggle-disabled-handle-opacity: .38;--mat-slide-toggle-disabled-selected-handle-opacity: .38;--mat-slide-toggle-disabled-selected-icon-opacity: .38;--mat-slide-toggle-disabled-track-opacity: .12;--mat-slide-toggle-disabled-unselected-handle-opacity: .38;--mat-slide-toggle-disabled-unselected-icon-opacity: .38;--mat-slide-toggle-disabled-unselected-track-outline-color: transparent;--mat-slide-toggle-disabled-unselected-track-outline-width: 1px;--mat-slide-toggle-handle-height: 20px;--mat-slide-toggle-handle-shape: 10px;--mat-slide-toggle-handle-width: 20px;--mat-slide-toggle-hidden-track-opacity: 1;--mat-slide-toggle-hidden-track-transition: transform 75ms 0ms cubic-bezier(.4, 0, .6, 1);--mat-slide-toggle-pressed-handle-size: 20px;--mat-slide-toggle-selected-focus-state-layer-opacity: .12;--mat-slide-toggle-selected-handle-horizontal-margin: 0;--mat-slide-toggle-selected-handle-size: 20px;--mat-slide-toggle-selected-hover-state-layer-opacity: .04;--mat-slide-toggle-selected-icon-size: 18px;--mat-slide-toggle-selected-pressed-handle-horizontal-margin: 0;--mat-slide-toggle-selected-pressed-state-layer-opacity: .12;--mat-slide-toggle-selected-track-outline-color: transparent;--mat-slide-toggle-selected-track-outline-width: 1px;--mat-slide-toggle-selected-with-icon-handle-horizontal-margin: 0;--mat-slide-toggle-track-height: 14px;--mat-slide-toggle-track-outline-color: transparent;--mat-slide-toggle-track-outline-width: 1px;--mat-slide-toggle-track-shape: 7px;--mat-slide-toggle-track-width: 36px;--mat-slide-toggle-unselected-focus-state-layer-opacity: .12;--mat-slide-toggle-unselected-handle-horizontal-margin: 0;--mat-slide-toggle-unselected-handle-size: 20px;--mat-slide-toggle-unselected-hover-state-layer-opacity: .12;--mat-slide-toggle-unselected-icon-size: 18px;--mat-slide-toggle-unselected-pressed-handle-horizontal-margin: 0;--mat-slide-toggle-unselected-pressed-state-layer-opacity: .1;--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin: 0;--mat-slide-toggle-visible-track-opacity: 1;--mat-slide-toggle-visible-track-transition: transform 75ms 0ms cubic-bezier(0, 0, .2, 1);--mat-slide-toggle-with-icon-handle-size: 20px;--mat-slide-toggle-touch-target-size: 48px}html{--mat-slide-toggle-selected-icon-color: white;--mat-slide-toggle-disabled-selected-icon-color: white;--mat-slide-toggle-selected-focus-state-layer-color: #3f51b5;--mat-slide-toggle-selected-handle-color: #3f51b5;--mat-slide-toggle-selected-hover-state-layer-color: #3f51b5;--mat-slide-toggle-selected-pressed-state-layer-color: #3f51b5;--mat-slide-toggle-selected-focus-handle-color: #3f51b5;--mat-slide-toggle-selected-hover-handle-color: #3f51b5;--mat-slide-toggle-selected-pressed-handle-color: #3f51b5;--mat-slide-toggle-selected-focus-track-color: #7986cb;--mat-slide-toggle-selected-hover-track-color: #7986cb;--mat-slide-toggle-selected-pressed-track-color: #7986cb;--mat-slide-toggle-selected-track-color: #7986cb;--mat-slide-toggle-disabled-label-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-slide-toggle-disabled-handle-elevation-shadow: 0px 0px 0px 0px rgba(0, 0, 0, .2), 0px 0px 0px 0px rgba(0, 0, 0, .14), 0px 0px 0px 0px rgba(0, 0, 0, .12);--mat-slide-toggle-disabled-selected-handle-color: rgba(0, 0, 0, .87);--mat-slide-toggle-disabled-selected-track-color: rgba(0, 0, 0, .87);--mat-slide-toggle-disabled-unselected-handle-color: rgba(0, 0, 0, .87);--mat-slide-toggle-disabled-unselected-icon-color: #f6f6f6;--mat-slide-toggle-disabled-unselected-track-color: rgba(0, 0, 0, .87);--mat-slide-toggle-handle-elevation-shadow: 0px 2px 1px -1px rgba(0, 0, 0, .2), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .12);--mat-slide-toggle-handle-surface-color: white;--mat-slide-toggle-label-text-color: rgba(0, 0, 0, .87);--mat-slide-toggle-unselected-hover-handle-color: #424242;--mat-slide-toggle-unselected-focus-handle-color: #424242;--mat-slide-toggle-unselected-focus-state-layer-color: rgba(0, 0, 0, .87);--mat-slide-toggle-unselected-focus-track-color: rgba(0, 0, 0, .12);--mat-slide-toggle-unselected-icon-color: #f6f6f6;--mat-slide-toggle-unselected-handle-color: rgba(0, 0, 0, .54);--mat-slide-toggle-unselected-hover-state-layer-color: rgba(0, 0, 0, .87);--mat-slide-toggle-unselected-hover-track-color: rgba(0, 0, 0, .12);--mat-slide-toggle-unselected-pressed-handle-color: #424242;--mat-slide-toggle-unselected-pressed-track-color: rgba(0, 0, 0, .12);--mat-slide-toggle-unselected-pressed-state-layer-color: rgba(0, 0, 0, .87);--mat-slide-toggle-unselected-track-color: rgba(0, 0, 0, .12)}html{--mat-slide-toggle-state-layer-size: 40px;--mat-slide-toggle-touch-target-display: block}html{--mat-slide-toggle-label-text-font: Roboto, sans-serif;--mat-slide-toggle-label-text-line-height: 20px;--mat-slide-toggle-label-text-size: 14px;--mat-slide-toggle-label-text-tracking: .0178571429em;--mat-slide-toggle-label-text-weight: 400}html{--mat-radio-disabled-selected-icon-opacity: .38;--mat-radio-disabled-unselected-icon-opacity: .38;--mat-radio-state-layer-size: 40px;--mat-radio-touch-target-size: 48px}html{--mat-radio-state-layer-size: 40px;--mat-radio-touch-target-display: block}html{--mat-radio-label-text-font: Roboto, sans-serif;--mat-radio-label-text-line-height: 20px;--mat-radio-label-text-size: 14px;--mat-radio-label-text-tracking: .0178571429em;--mat-radio-label-text-weight: 400}html{--mat-slider-active-track-height: 6px;--mat-slider-active-track-shape: 9999px;--mat-slider-handle-elevation: 0px 2px 1px -1px rgba(0, 0, 0, .2), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .12);--mat-slider-handle-height: 20px;--mat-slider-handle-shape: 50%;--mat-slider-handle-width: 20px;--mat-slider-inactive-track-height: 4px;--mat-slider-inactive-track-shape: 9999px;--mat-slider-value-indicator-border-radius: 4px;--mat-slider-value-indicator-caret-display: block;--mat-slider-value-indicator-container-transform: translateX(-50%);--mat-slider-value-indicator-height: 32px;--mat-slider-value-indicator-padding: 0 12px;--mat-slider-value-indicator-text-transform: none;--mat-slider-value-indicator-width: auto;--mat-slider-with-overlap-handle-outline-width: 1px;--mat-slider-with-tick-marks-active-container-opacity: .6;--mat-slider-with-tick-marks-container-shape: 50%;--mat-slider-with-tick-marks-container-size: 2px;--mat-slider-with-tick-marks-inactive-container-opacity: .6;--mat-slider-value-indicator-transform-origin: bottom}html{--mat-slider-active-track-color: #3f51b5;--mat-slider-focus-handle-color: #3f51b5;--mat-slider-handle-color: #3f51b5;--mat-slider-hover-handle-color: #3f51b5;--mat-slider-focus-state-layer-color: color-mix(in srgb, #3f51b5 12%, transparent);--mat-slider-hover-state-layer-color: color-mix(in srgb, #3f51b5 4%, transparent);--mat-slider-inactive-track-color: #3f51b5;--mat-slider-ripple-color: #3f51b5;--mat-slider-with-tick-marks-active-container-color: white;--mat-slider-with-tick-marks-inactive-container-color: #3f51b5;--mat-slider-disabled-active-track-color: rgba(0, 0, 0, .87);--mat-slider-disabled-handle-color: rgba(0, 0, 0, .87);--mat-slider-disabled-inactive-track-color: rgba(0, 0, 0, .87);--mat-slider-label-container-color: #424242;--mat-slider-label-label-text-color: white;--mat-slider-value-indicator-opacity: 1;--mat-slider-with-overlap-handle-outline-color: rgba(0, 0, 0, .87);--mat-slider-with-tick-marks-disabled-container-color: rgba(0, 0, 0, .87)}.mat-accent{--mat-slider-active-track-color: #ff4081;--mat-slider-focus-handle-color: #ff4081;--mat-slider-handle-color: #ff4081;--mat-slider-hover-handle-color: #ff4081;--mat-slider-focus-state-layer-color: color-mix(in srgb, #ff4081 12%, transparent);--mat-slider-hover-state-layer-color: color-mix(in srgb, #ff4081 4%, transparent);--mat-slider-inactive-track-color: #ff4081;--mat-slider-ripple-color: #ff4081;--mat-slider-with-tick-marks-active-container-color: white;--mat-slider-with-tick-marks-inactive-container-color: #ff4081}html{--mat-slider-label-label-text-font: Roboto, sans-serif;--mat-slider-label-label-text-size: 14px;--mat-slider-label-label-text-line-height: 22px;--mat-slider-label-label-text-tracking: .0071428571em;--mat-slider-label-label-text-weight: 500}html{--mat-menu-container-shape: 4px;--mat-menu-divider-bottom-spacing: 0;--mat-menu-divider-top-spacing: 0;--mat-menu-item-spacing: 16px;--mat-menu-item-icon-size: 24px;--mat-menu-item-leading-spacing: 16px;--mat-menu-item-trailing-spacing: 16px;--mat-menu-item-with-icon-leading-spacing: 16px;--mat-menu-item-with-icon-trailing-spacing: 16px;--mat-menu-container-elevation-shadow: 0px 5px 5px -3px rgba(0, 0, 0, .2), 0px 8px 10px 1px rgba(0, 0, 0, .14), 0px 3px 14px 2px rgba(0, 0, 0, .12)}html{--mat-menu-item-label-text-color: rgba(0, 0, 0, .87);--mat-menu-item-icon-color: rgba(0, 0, 0, .87);--mat-menu-item-hover-state-layer-color: color-mix(in srgb, rgba(0, 0, 0, .87) 4%, transparent);--mat-menu-item-focus-state-layer-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-menu-container-color: white;--mat-menu-divider-color: rgba(0, 0, 0, .12)}html{--mat-menu-item-label-text-font: Roboto, sans-serif;--mat-menu-item-label-text-size: 16px;--mat-menu-item-label-text-tracking: .03125em;--mat-menu-item-label-text-line-height: 24px;--mat-menu-item-label-text-weight: 400}html{--mat-list-active-indicator-color: transparent;--mat-list-active-indicator-shape: 4px;--mat-list-list-item-container-shape: 0;--mat-list-list-item-leading-avatar-shape: 50%;--mat-list-list-item-container-color: transparent;--mat-list-list-item-selected-container-color: transparent;--mat-list-list-item-leading-avatar-color: transparent;--mat-list-list-item-leading-icon-size: 24px;--mat-list-list-item-leading-avatar-size: 40px;--mat-list-list-item-trailing-icon-size: 24px;--mat-list-list-item-disabled-state-layer-color: transparent;--mat-list-list-item-disabled-state-layer-opacity: 0;--mat-list-list-item-disabled-label-text-opacity: .38;--mat-list-list-item-disabled-leading-icon-opacity: .38;--mat-list-list-item-disabled-trailing-icon-opacity: .38}html{--mat-list-list-item-label-text-color: rgba(0, 0, 0, .87);--mat-list-list-item-supporting-text-color: rgba(0, 0, 0, .54);--mat-list-list-item-leading-icon-color: rgba(0, 0, 0, .54);--mat-list-list-item-trailing-supporting-text-color: rgba(0, 0, 0, .54);--mat-list-list-item-trailing-icon-color: rgba(0, 0, 0, .54);--mat-list-list-item-selected-trailing-icon-color: rgba(0, 0, 0, .54);--mat-list-list-item-disabled-label-text-color: rgba(0, 0, 0, .87);--mat-list-list-item-disabled-leading-icon-color: rgba(0, 0, 0, .87);--mat-list-list-item-disabled-trailing-icon-color: rgba(0, 0, 0, .87);--mat-list-list-item-hover-label-text-color: rgba(0, 0, 0, .87);--mat-list-list-item-hover-leading-icon-color: rgba(0, 0, 0, .54);--mat-list-list-item-hover-state-layer-color: rgba(0, 0, 0, .87);--mat-list-list-item-hover-state-layer-opacity: .04;--mat-list-list-item-hover-trailing-icon-color: rgba(0, 0, 0, .54);--mat-list-list-item-focus-label-text-color: rgba(0, 0, 0, .87);--mat-list-list-item-focus-state-layer-color: rgba(0, 0, 0, .87);--mat-list-list-item-focus-state-layer-opacity: .12}html{--mat-list-list-item-leading-icon-start-space: 16px;--mat-list-list-item-leading-icon-end-space: 32px;--mat-list-list-item-one-line-container-height: 48px;--mat-list-list-item-two-line-container-height: 64px;--mat-list-list-item-three-line-container-height: 88px}html{--mat-list-list-item-label-text-font: Roboto, sans-serif;--mat-list-list-item-label-text-line-height: 24px;--mat-list-list-item-label-text-size: 16px;--mat-list-list-item-label-text-tracking: .03125em;--mat-list-list-item-label-text-weight: 400;--mat-list-list-item-supporting-text-font: Roboto, sans-serif;--mat-list-list-item-supporting-text-line-height: 20px;--mat-list-list-item-supporting-text-size: 14px;--mat-list-list-item-supporting-text-tracking: .0178571429em;--mat-list-list-item-supporting-text-weight: 400;--mat-list-list-item-trailing-supporting-text-font: Roboto, sans-serif;--mat-list-list-item-trailing-supporting-text-line-height: 20px;--mat-list-list-item-trailing-supporting-text-size: 12px;--mat-list-list-item-trailing-supporting-text-tracking: .0333333333em;--mat-list-list-item-trailing-supporting-text-weight: 400}html{--mat-paginator-page-size-select-width: 84px;--mat-paginator-page-size-select-touch-target-height: 48px}html{--mat-paginator-container-text-color: rgba(0, 0, 0, .87);--mat-paginator-container-background-color: white;--mat-paginator-enabled-icon-color: rgba(0, 0, 0, .54);--mat-paginator-disabled-icon-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent)}html{--mat-paginator-container-size: 56px;--mat-paginator-form-field-container-height: 40px;--mat-paginator-form-field-container-vertical-padding: 8px;--mat-paginator-touch-target-display: block}html{--mat-paginator-container-text-font: Roboto, sans-serif;--mat-paginator-container-text-line-height: 20px;--mat-paginator-container-text-size: 12px;--mat-paginator-container-text-tracking: .0333333333em;--mat-paginator-container-text-weight: 400;--mat-paginator-select-trigger-text-size: 12px}html{--mat-tab-container-height: 48px;--mat-tab-divider-color: transparent;--mat-tab-divider-height: 0;--mat-tab-active-indicator-height: 2px;--mat-tab-active-indicator-shape: 0}html{--mat-checkbox-disabled-selected-checkmark-color: white;--mat-checkbox-selected-focus-state-layer-opacity: .12;--mat-checkbox-selected-hover-state-layer-opacity: .04;--mat-checkbox-selected-pressed-state-layer-opacity: .12;--mat-checkbox-unselected-focus-state-layer-opacity: .12;--mat-checkbox-unselected-hover-state-layer-opacity: .04;--mat-checkbox-unselected-pressed-state-layer-opacity: .12;--mat-checkbox-touch-target-size: 48px}html{--mat-checkbox-disabled-label-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-checkbox-label-text-color: rgba(0, 0, 0, .87);--mat-checkbox-disabled-selected-icon-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-checkbox-disabled-unselected-icon-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-checkbox-selected-checkmark-color: white;--mat-checkbox-selected-focus-icon-color: #ff4081;--mat-checkbox-selected-hover-icon-color: #ff4081;--mat-checkbox-selected-icon-color: #ff4081;--mat-checkbox-selected-pressed-icon-color: #ff4081;--mat-checkbox-unselected-focus-icon-color: rgba(0, 0, 0, .87);--mat-checkbox-unselected-hover-icon-color: rgba(0, 0, 0, .87);--mat-checkbox-unselected-icon-color: rgba(0, 0, 0, .54);--mat-checkbox-selected-focus-state-layer-color: #ff4081;--mat-checkbox-selected-hover-state-layer-color: #ff4081;--mat-checkbox-selected-pressed-state-layer-color: #ff4081;--mat-checkbox-unselected-focus-state-layer-color: rgba(0, 0, 0, .87);--mat-checkbox-unselected-hover-state-layer-color: rgba(0, 0, 0, .87);--mat-checkbox-unselected-pressed-state-layer-color: rgba(0, 0, 0, .87)}html{--mat-checkbox-touch-target-display: block;--mat-checkbox-state-layer-size: 40px}html{--mat-checkbox-label-text-font: Roboto, sans-serif;--mat-checkbox-label-text-line-height: 20px;--mat-checkbox-label-text-size: 14px;--mat-checkbox-label-text-tracking: .0178571429em;--mat-checkbox-label-text-weight: 400}html{--mat-button-filled-container-shape: 4px;--mat-button-filled-horizontal-padding: 16px;--mat-button-filled-icon-offset: -4px;--mat-button-filled-icon-spacing: 8px;--mat-button-filled-touch-target-size: 48px;--mat-button-outlined-container-shape: 4px;--mat-button-outlined-horizontal-padding: 15px;--mat-button-outlined-icon-offset: -4px;--mat-button-outlined-icon-spacing: 8px;--mat-button-outlined-keep-touch-target: false;--mat-button-outlined-outline-width: 1px;--mat-button-outlined-touch-target-size: 48px;--mat-button-protected-container-elevation-shadow: 0px 3px 1px -2px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 1px 5px 0px rgba(0, 0, 0, .12);--mat-button-protected-container-shape: 4px;--mat-button-protected-disabled-container-elevation-shadow: 0px 0px 0px 0px rgba(0, 0, 0, .2), 0px 0px 0px 0px rgba(0, 0, 0, .14), 0px 0px 0px 0px rgba(0, 0, 0, .12);--mat-button-protected-focus-container-elevation-shadow: 0px 2px 4px -1px rgba(0, 0, 0, .2), 0px 4px 5px 0px rgba(0, 0, 0, .14), 0px 1px 10px 0px rgba(0, 0, 0, .12);--mat-button-protected-horizontal-padding: 16px;--mat-button-protected-hover-container-elevation-shadow: 0px 2px 4px -1px rgba(0, 0, 0, .2), 0px 4px 5px 0px rgba(0, 0, 0, .14), 0px 1px 10px 0px rgba(0, 0, 0, .12);--mat-button-protected-icon-offset: -4px;--mat-button-protected-icon-spacing: 8px;--mat-button-protected-pressed-container-elevation-shadow: 0px 5px 5px -3px rgba(0, 0, 0, .2), 0px 8px 10px 1px rgba(0, 0, 0, .14), 0px 3px 14px 2px rgba(0, 0, 0, .12);--mat-button-protected-touch-target-size: 48px;--mat-button-text-container-shape: 4px;--mat-button-text-horizontal-padding: 8px;--mat-button-text-icon-offset: 0;--mat-button-text-icon-spacing: 8px;--mat-button-text-with-icon-horizontal-padding: 8px;--mat-button-text-touch-target-size: 48px;--mat-button-tonal-container-shape: 4px;--mat-button-tonal-horizontal-padding: 16px;--mat-button-tonal-icon-offset: -4px;--mat-button-tonal-icon-spacing: 8px;--mat-button-tonal-touch-target-size: 48px}html{--mat-button-filled-container-color: white;--mat-button-filled-disabled-container-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-button-filled-disabled-label-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-button-filled-disabled-state-layer-color: rgba(0, 0, 0, .54);--mat-button-filled-focus-state-layer-opacity: .12;--mat-button-filled-hover-state-layer-opacity: .04;--mat-button-filled-label-text-color: rgba(0, 0, 0, .87);--mat-button-filled-pressed-state-layer-opacity: .12;--mat-button-filled-ripple-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-button-filled-state-layer-color: rgba(0, 0, 0, .87);--mat-button-outlined-disabled-label-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-button-outlined-disabled-outline-color: rgba(0, 0, 0, .12);--mat-button-outlined-disabled-state-layer-color: rgba(0, 0, 0, .54);--mat-button-outlined-focus-state-layer-opacity: .12;--mat-button-outlined-hover-state-layer-opacity: .04;--mat-button-outlined-label-text-color: rgba(0, 0, 0, .87);--mat-button-outlined-outline-color: rgba(0, 0, 0, .12);--mat-button-outlined-pressed-state-layer-opacity: .12;--mat-button-outlined-ripple-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-button-outlined-state-layer-color: rgba(0, 0, 0, .87);--mat-button-protected-container-color: white;--mat-button-protected-disabled-container-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-button-protected-disabled-label-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-button-protected-disabled-state-layer-color: rgba(0, 0, 0, .54);--mat-button-protected-focus-state-layer-opacity: .12;--mat-button-protected-hover-state-layer-opacity: .04;--mat-button-protected-label-text-color: rgba(0, 0, 0, .87);--mat-button-protected-pressed-state-layer-opacity: .12;--mat-button-protected-ripple-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-button-protected-state-layer-color: rgba(0, 0, 0, .87);--mat-button-text-disabled-label-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-button-text-disabled-state-layer-color: rgba(0, 0, 0, .54);--mat-button-text-focus-state-layer-opacity: .12;--mat-button-text-hover-state-layer-opacity: .04;--mat-button-text-label-text-color: rgba(0, 0, 0, .87);--mat-button-text-pressed-state-layer-opacity: .12;--mat-button-text-ripple-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-button-text-state-layer-color: rgba(0, 0, 0, .87);--mat-button-tonal-container-color: white;--mat-button-tonal-disabled-container-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-button-tonal-disabled-label-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-button-tonal-disabled-state-layer-color: rgba(0, 0, 0, .54);--mat-button-tonal-focus-state-layer-opacity: .12;--mat-button-tonal-hover-state-layer-opacity: .04;--mat-button-tonal-label-text-color: rgba(0, 0, 0, .87);--mat-button-tonal-pressed-state-layer-opacity: .12;--mat-button-tonal-ripple-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-button-tonal-state-layer-color: rgba(0, 0, 0, .87)}.mat-mdc-unelevated-button.mat-primary{--mat-button-filled-container-color: #3f51b5;--mat-button-filled-label-text-color: white;--mat-button-filled-ripple-color: color-mix(in srgb, white 12%, transparent);--mat-button-filled-state-layer-color: white;--mat-button-outlined-label-text-color: #3f51b5;--mat-button-outlined-outline-color: rgba(0, 0, 0, .12);--mat-button-outlined-ripple-color: color-mix(in srgb, #3f51b5 12%, transparent);--mat-button-outlined-state-layer-color: #3f51b5;--mat-button-protected-container-color: #3f51b5;--mat-button-protected-label-text-color: white;--mat-button-protected-ripple-color: color-mix(in srgb, white 12%, transparent);--mat-button-protected-state-layer-color: white;--mat-button-text-label-text-color: #3f51b5;--mat-button-text-ripple-color: color-mix(in srgb, #3f51b5 12%, transparent);--mat-button-text-state-layer-color: #3f51b5;--mat-button-tonal-container-color: #3f51b5;--mat-button-tonal-label-text-color: white;--mat-button-tonal-ripple-color: color-mix(in srgb, white 12%, transparent);--mat-button-tonal-state-layer-color: white}.mat-mdc-raised-button.mat-accent{--mat-button-filled-container-color: #ff4081;--mat-button-filled-label-text-color: white;--mat-button-filled-ripple-color: color-mix(in srgb, white 12%, transparent);--mat-button-filled-state-layer-color: white;--mat-button-outlined-label-text-color: #ff4081;--mat-button-outlined-outline-color: rgba(0, 0, 0, .12);--mat-button-outlined-ripple-color: color-mix(in srgb, #ff4081 12%, transparent);--mat-button-outlined-state-layer-color: #ff4081;--mat-button-protected-container-color: #ff4081;--mat-button-protected-label-text-color: white;--mat-button-protected-ripple-color: color-mix(in srgb, white 12%, transparent);--mat-button-protected-state-layer-color: white;--mat-button-text-label-text-color: #ff4081;--mat-button-text-ripple-color: color-mix(in srgb, #ff4081 12%, transparent);--mat-button-text-state-layer-color: #ff4081;--mat-button-tonal-container-color: #ff4081;--mat-button-tonal-label-text-color: white;--mat-button-tonal-ripple-color: color-mix(in srgb, white 12%, transparent);--mat-button-tonal-state-layer-color: white}html{--mat-button-filled-container-height: 36px;--mat-button-filled-touch-target-display: block;--mat-button-outlined-container-height: 36px;--mat-button-outlined-touch-target-display: block;--mat-button-protected-container-height: 36px;--mat-button-protected-touch-target-display: block;--mat-button-text-container-height: 36px;--mat-button-text-touch-target-display: block;--mat-button-tonal-container-height: 36px;--mat-button-tonal-touch-target-display: block}html{--mat-button-filled-label-text-font: Roboto, sans-serif;--mat-button-filled-label-text-size: 14px;--mat-button-filled-label-text-tracking: .0892857143em;--mat-button-filled-label-text-transform: none;--mat-button-filled-label-text-weight: 500;--mat-button-outlined-label-text-font: Roboto, sans-serif;--mat-button-outlined-label-text-size: 14px;--mat-button-outlined-label-text-tracking: .0892857143em;--mat-button-outlined-label-text-transform: none;--mat-button-outlined-label-text-weight: 500;--mat-button-protected-label-text-font: Roboto, sans-serif;--mat-button-protected-label-text-size: 14px;--mat-button-protected-label-text-tracking: .0892857143em;--mat-button-protected-label-text-transform: none;--mat-button-protected-label-text-weight: 500;--mat-button-text-label-text-font: Roboto, sans-serif;--mat-button-text-label-text-size: 14px;--mat-button-text-label-text-tracking: .0892857143em;--mat-button-text-label-text-transform: none;--mat-button-text-label-text-weight: 500;--mat-button-tonal-label-text-font: Roboto, sans-serif;--mat-button-tonal-label-text-size: 14px;--mat-button-tonal-label-text-tracking: .0892857143em;--mat-button-tonal-label-text-transform: none;--mat-button-tonal-label-text-weight: 500}html{--mat-icon-button-icon-size: 24px;--mat-icon-button-container-shape: 50%;--mat-icon-button-touch-target-size: 48px}html{--mat-icon-button-disabled-icon-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-icon-button-disabled-state-layer-color: rgba(0, 0, 0, .54);--mat-icon-button-focus-state-layer-opacity: .12;--mat-icon-button-hover-state-layer-opacity: .04;--mat-icon-button-icon-color: inherit;--mat-icon-button-pressed-state-layer-opacity: .12;--mat-icon-button-ripple-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-icon-button-state-layer-color: rgba(0, 0, 0, .87)}html{--mat-icon-button-touch-target-display: block}.mat-mdc-icon-button.mat-mdc-button-base{--mdc-icon-button-state-layer-size: 48px;--mat-icon-button-state-layer-size: 48px;width:var(--mat-icon-button-state-layer-size);height:var(--mat-icon-button-state-layer-size);padding:12px}html{--mat-fab-container-elevation-shadow: 0px 3px 5px -1px rgba(0, 0, 0, .2), 0px 6px 10px 0px rgba(0, 0, 0, .14), 0px 1px 18px 0px rgba(0, 0, 0, .12);--mat-fab-container-shape: 50%;--mat-fab-touch-target-size: 48px;--mat-fab-extended-container-elevation-shadow: 0px 3px 5px -1px rgba(0, 0, 0, .2), 0px 6px 10px 0px rgba(0, 0, 0, .14), 0px 1px 18px 0px rgba(0, 0, 0, .12);--mat-fab-extended-container-height: 48px;--mat-fab-extended-container-shape: 24px;--mat-fab-extended-focus-container-elevation-shadow: 0px 5px 5px -3px rgba(0, 0, 0, .2), 0px 8px 10px 1px rgba(0, 0, 0, .14), 0px 3px 14px 2px rgba(0, 0, 0, .12);--mat-fab-extended-hover-container-elevation-shadow: 0px 5px 5px -3px rgba(0, 0, 0, .2), 0px 8px 10px 1px rgba(0, 0, 0, .14), 0px 3px 14px 2px rgba(0, 0, 0, .12);--mat-fab-extended-pressed-container-elevation-shadow: 0px 7px 8px -4px rgba(0, 0, 0, .2), 0px 12px 17px 2px rgba(0, 0, 0, .14), 0px 5px 22px 4px rgba(0, 0, 0, .12);--mat-fab-focus-container-elevation-shadow: 0px 5px 5px -3px rgba(0, 0, 0, .2), 0px 8px 10px 1px rgba(0, 0, 0, .14), 0px 3px 14px 2px rgba(0, 0, 0, .12);--mat-fab-hover-container-elevation-shadow: 0px 5px 5px -3px rgba(0, 0, 0, .2), 0px 8px 10px 1px rgba(0, 0, 0, .14), 0px 3px 14px 2px rgba(0, 0, 0, .12);--mat-fab-pressed-container-elevation-shadow: 0px 7px 8px -4px rgba(0, 0, 0, .2), 0px 12px 17px 2px rgba(0, 0, 0, .14), 0px 5px 22px 4px rgba(0, 0, 0, .12);--mat-fab-small-container-elevation-shadow: 0px 3px 5px -1px rgba(0, 0, 0, .2), 0px 6px 10px 0px rgba(0, 0, 0, .14), 0px 1px 18px 0px rgba(0, 0, 0, .12);--mat-fab-small-container-shape: 50%;--mat-fab-small-touch-target-size: 48px;--mat-fab-small-focus-container-elevation-shadow: 0px 5px 5px -3px rgba(0, 0, 0, .2), 0px 8px 10px 1px rgba(0, 0, 0, .14), 0px 3px 14px 2px rgba(0, 0, 0, .12);--mat-fab-small-hover-container-elevation-shadow: 0px 5px 5px -3px rgba(0, 0, 0, .2), 0px 8px 10px 1px rgba(0, 0, 0, .14), 0px 3px 14px 2px rgba(0, 0, 0, .12);--mat-fab-small-pressed-container-elevation-shadow: 0px 7px 8px -4px rgba(0, 0, 0, .2), 0px 12px 17px 2px rgba(0, 0, 0, .14), 0px 5px 22px 4px rgba(0, 0, 0, .12)}html{--mat-fab-container-color: white;--mat-fab-disabled-state-container-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-fab-disabled-state-foreground-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-fab-disabled-state-layer-color: rgba(0, 0, 0, .54);--mat-fab-focus-state-layer-opacity: .12;--mat-fab-foreground-color: rgba(0, 0, 0, .87);--mat-fab-hover-state-layer-opacity: .04;--mat-fab-pressed-state-layer-opacity: .12;--mat-fab-ripple-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-fab-small-container-color: white;--mat-fab-small-disabled-state-container-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-fab-small-disabled-state-foreground-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-fab-small-disabled-state-layer-color: rgba(0, 0, 0, .54);--mat-fab-small-focus-state-layer-opacity: .12;--mat-fab-small-foreground-color: rgba(0, 0, 0, .87);--mat-fab-small-hover-state-layer-opacity: .04;--mat-fab-small-pressed-state-layer-opacity: .12;--mat-fab-small-ripple-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-fab-small-state-layer-color: rgba(0, 0, 0, .87);--mat-fab-state-layer-color: rgba(0, 0, 0, .87)}html{--mat-fab-small-touch-target-display: block;--mat-fab-touch-target-display: block}html{--mat-fab-extended-label-text-font: Roboto, sans-serif;--mat-fab-extended-label-text-size: 14px;--mat-fab-extended-label-text-tracking: .0892857143em;--mat-fab-extended-label-text-weight: 500}html{--mat-snack-bar-container-shape: 4px}html{--mat-snack-bar-container-color: #424242;--mat-snack-bar-supporting-text-color: white;--mat-snack-bar-button-color: #7986cb}html{--mat-snack-bar-supporting-text-font: Roboto, sans-serif;--mat-snack-bar-supporting-text-line-height: 20px;--mat-snack-bar-supporting-text-size: 14px;--mat-snack-bar-supporting-text-weight: 400}html{--mat-table-row-item-outline-width: 1px}html{--mat-table-background-color: white;--mat-table-header-headline-color: rgba(0, 0, 0, .87);--mat-table-row-item-label-text-color: rgba(0, 0, 0, .87);--mat-table-row-item-outline-color: rgba(0, 0, 0, .12)}html{--mat-table-header-container-height: 56px;--mat-table-footer-container-height: 52px;--mat-table-row-item-container-height: 52px}html{--mat-table-header-headline-font: Roboto, sans-serif;--mat-table-header-headline-line-height: 22px;--mat-table-header-headline-size: 14px;--mat-table-header-headline-weight: 500;--mat-table-header-headline-tracking: .0071428571em;--mat-table-row-item-label-text-font: Roboto, sans-serif;--mat-table-row-item-label-text-line-height: 20px;--mat-table-row-item-label-text-size: 14px;--mat-table-row-item-label-text-weight: 400;--mat-table-row-item-label-text-tracking: .0178571429em;--mat-table-footer-supporting-text-font: Roboto, sans-serif;--mat-table-footer-supporting-text-line-height: 20px;--mat-table-footer-supporting-text-size: 14px;--mat-table-footer-supporting-text-weight: 400;--mat-table-footer-supporting-text-tracking: .0178571429em}html{--mat-progress-spinner-active-indicator-width: 4px;--mat-progress-spinner-size: 48px}html{--mat-progress-spinner-active-indicator-color: #3f51b5}.mat-accent{--mat-progress-spinner-active-indicator-color: #ff4081}html{--mat-badge-container-shape: 50%;--mat-badge-container-size: unset;--mat-badge-small-size-container-size: unset;--mat-badge-large-size-container-size: unset;--mat-badge-legacy-container-size: 22px;--mat-badge-legacy-small-size-container-size: 16px;--mat-badge-legacy-large-size-container-size: 28px;--mat-badge-container-offset: -11px 0;--mat-badge-small-size-container-offset: -8px 0;--mat-badge-large-size-container-offset: -14px 0;--mat-badge-container-overlap-offset: -11px;--mat-badge-small-size-container-overlap-offset: -8px;--mat-badge-large-size-container-overlap-offset: -14px;--mat-badge-container-padding: 0;--mat-badge-small-size-container-padding: 0;--mat-badge-large-size-container-padding: 0}html{--mat-badge-background-color: #3f51b5;--mat-badge-text-color: white;--mat-badge-disabled-state-background-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-badge-disabled-state-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent)}html{--mat-badge-text-font: Roboto, sans-serif;--mat-badge-line-height: 22px;--mat-badge-text-size: 12px;--mat-badge-text-weight: 600;--mat-badge-small-size-text-size: 9px;--mat-badge-small-size-line-height: 16px;--mat-badge-large-size-text-size: 24px;--mat-badge-large-size-line-height: 28px}html{--mat-bottom-sheet-container-shape: 4px}html{--mat-bottom-sheet-container-text-color: rgba(0, 0, 0, .87);--mat-bottom-sheet-container-background-color: white}html{--mat-bottom-sheet-container-text-font: Roboto, sans-serif;--mat-bottom-sheet-container-text-line-height: 20px;--mat-bottom-sheet-container-text-size: 14px;--mat-bottom-sheet-container-text-tracking: .0178571429em;--mat-bottom-sheet-container-text-weight: 400}html{--mat-button-toggle-focus-state-layer-opacity: .12;--mat-button-toggle-hover-state-layer-opacity: .04;--mat-button-toggle-legacy-focus-state-layer-opacity: 1;--mat-button-toggle-legacy-height: 36px;--mat-button-toggle-legacy-shape: 2px;--mat-button-toggle-shape: 4px}html{--mat-button-toggle-background-color: white;--mat-button-toggle-disabled-selected-state-background-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-button-toggle-disabled-selected-state-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-button-toggle-disabled-state-background-color: white;--mat-button-toggle-disabled-state-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-button-toggle-divider-color: rgba(0, 0, 0, .12);--mat-button-toggle-legacy-disabled-selected-state-background-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-button-toggle-legacy-disabled-state-background-color: white;--mat-button-toggle-legacy-disabled-state-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-button-toggle-legacy-selected-state-background-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-button-toggle-legacy-selected-state-text-color: rgba(0, 0, 0, .87);--mat-button-toggle-legacy-state-layer-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-button-toggle-legacy-text-color: rgba(0, 0, 0, .87);--mat-button-toggle-selected-state-background-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-button-toggle-selected-state-text-color: rgba(0, 0, 0, .87);--mat-button-toggle-state-layer-color: rgba(0, 0, 0, .87);--mat-button-toggle-text-color: rgba(0, 0, 0, .87)}html{--mat-button-toggle-height: 48px}html{--mat-button-toggle-label-text-font: Roboto, sans-serif;--mat-button-toggle-label-text-line-height: 24px;--mat-button-toggle-label-text-size: 16px;--mat-button-toggle-label-text-tracking: .03125em;--mat-button-toggle-label-text-weight: 400;--mat-button-toggle-legacy-label-text-font: Roboto, sans-serif;--mat-button-toggle-legacy-label-text-line-height: 24px;--mat-button-toggle-legacy-label-text-size: 16px;--mat-button-toggle-legacy-label-text-tracking: .03125em;--mat-button-toggle-legacy-label-text-weight: 400}html{--mat-datepicker-calendar-container-shape: 4px;--mat-datepicker-calendar-container-touch-shape: 4px;--mat-datepicker-calendar-container-elevation-shadow: 0px 2px 4px -1px rgba(0, 0, 0, .2), 0px 4px 5px 0px rgba(0, 0, 0, .14), 0px 1px 10px 0px rgba(0, 0, 0, .12);--mat-datepicker-calendar-container-touch-elevation-shadow: 0px 11px 15px -7px rgba(0, 0, 0, .2), 0px 24px 38px 3px rgba(0, 0, 0, .14), 0px 9px 46px 8px rgba(0, 0, 0, .12)}html{--mat-datepicker-calendar-date-in-range-state-background-color: color-mix(in srgb, #3f51b5 20%, transparent);--mat-datepicker-calendar-date-in-comparison-range-state-background-color: color-mix(in srgb, #ff4081 20%, transparent);--mat-datepicker-calendar-date-in-overlap-range-state-background-color: #a8dab5;--mat-datepicker-calendar-date-in-overlap-range-selected-state-background-color: rgb(69.5241935484, 163.4758064516, 93.9516129032);--mat-datepicker-calendar-date-selected-state-text-color: white;--mat-datepicker-calendar-date-selected-state-background-color: #3f51b5;--mat-datepicker-calendar-date-selected-disabled-state-background-color: color-mix(in srgb, #3f51b5 38%, transparent);--mat-datepicker-calendar-date-today-selected-state-outline-color: white;--mat-datepicker-calendar-date-focus-state-background-color: color-mix(in srgb, #3f51b5 12%, transparent);--mat-datepicker-calendar-date-hover-state-background-color: color-mix(in srgb, #3f51b5 4%, transparent);--mat-datepicker-toggle-active-state-icon-color: #3f51b5;--mat-datepicker-toggle-icon-color: rgba(0, 0, 0, .54);--mat-datepicker-calendar-body-label-text-color: rgba(0, 0, 0, .54);--mat-datepicker-calendar-period-button-text-color: rgba(0, 0, 0, .87);--mat-datepicker-calendar-period-button-icon-color: rgba(0, 0, 0, .54);--mat-datepicker-calendar-navigation-button-icon-color: rgba(0, 0, 0, .54);--mat-datepicker-calendar-header-divider-color: rgba(0, 0, 0, .12);--mat-datepicker-calendar-header-text-color: rgba(0, 0, 0, .54);--mat-datepicker-calendar-date-today-outline-color: rgba(0, 0, 0, .54);--mat-datepicker-calendar-date-today-disabled-state-outline-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-datepicker-calendar-date-text-color: rgba(0, 0, 0, .87);--mat-datepicker-calendar-date-outline-color: transparent;--mat-datepicker-calendar-date-disabled-state-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-datepicker-calendar-date-preview-state-outline-color: rgba(0, 0, 0, .54);--mat-datepicker-range-input-separator-color: rgba(0, 0, 0, .87);--mat-datepicker-range-input-disabled-state-separator-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-datepicker-range-input-disabled-state-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-datepicker-calendar-container-background-color: white;--mat-datepicker-calendar-container-text-color: rgba(0, 0, 0, .87)}html{--mat-datepicker-calendar-text-font: Roboto, sans-serif;--mat-datepicker-calendar-text-size: 13px;--mat-datepicker-calendar-body-label-text-size: 14px;--mat-datepicker-calendar-body-label-text-weight: 500;--mat-datepicker-calendar-period-button-text-size: 14px;--mat-datepicker-calendar-period-button-text-weight: 500;--mat-datepicker-calendar-header-text-size: 11px;--mat-datepicker-calendar-header-text-weight: 400}html{--mat-divider-width: 1px}html{--mat-divider-color: rgba(0, 0, 0, .12)}html{--mat-expansion-container-shape: 4px;--mat-expansion-container-elevation-shadow: 0px 3px 1px -2px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 1px 5px 0px rgba(0, 0, 0, .12);--mat-expansion-legacy-header-indicator-display: inline-block;--mat-expansion-header-indicator-display: none}html{--mat-expansion-container-background-color: white;--mat-expansion-container-text-color: rgba(0, 0, 0, .87);--mat-expansion-actions-divider-color: rgba(0, 0, 0, .12);--mat-expansion-header-hover-state-layer-color: color-mix(in srgb, rgba(0, 0, 0, .87) 4%, transparent);--mat-expansion-header-focus-state-layer-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-expansion-header-disabled-state-text-color: color-mix(in srgb, rgba(0, 0, 0, .87) 38%, transparent);--mat-expansion-header-text-color: rgba(0, 0, 0, .87);--mat-expansion-header-description-color: rgba(0, 0, 0, .54);--mat-expansion-header-indicator-color: rgba(0, 0, 0, .54)}html{--mat-expansion-header-collapsed-state-height: 48px;--mat-expansion-header-expanded-state-height: 64px}html{--mat-expansion-header-text-font: Roboto, sans-serif;--mat-expansion-header-text-size: 14px;--mat-expansion-header-text-weight: 500;--mat-expansion-header-text-line-height: inherit;--mat-expansion-header-text-tracking: inherit;--mat-expansion-container-text-font: Roboto, sans-serif;--mat-expansion-container-text-line-height: 20px;--mat-expansion-container-text-size: 14px;--mat-expansion-container-text-tracking: .0178571429em;--mat-expansion-container-text-weight: 400}html{--mat-grid-list-tile-header-primary-text-size: 14px;--mat-grid-list-tile-header-secondary-text-size: 12px;--mat-grid-list-tile-footer-primary-text-size: 14px;--mat-grid-list-tile-footer-secondary-text-size: 12px}html{--mat-icon-color: inherit}.mat-icon.mat-primary{--mat-icon-color: #3f51b5}html{--mat-sidenav-container-shape: 0;--mat-sidenav-container-elevation-shadow: 0px 8px 10px -5px rgba(0, 0, 0, .2), 0px 16px 24px 2px rgba(0, 0, 0, .14), 0px 6px 30px 5px rgba(0, 0, 0, .12);--mat-sidenav-container-width: auto}html{--mat-sidenav-container-divider-color: rgba(0, 0, 0, .12);--mat-sidenav-container-background-color: white;--mat-sidenav-container-text-color: rgba(0, 0, 0, .87);--mat-sidenav-content-background-color: #fafafa;--mat-sidenav-content-text-color: rgba(0, 0, 0, .87);--mat-sidenav-scrim-color: rgba(0, 0, 0, .6)}html{--mat-stepper-header-focus-state-layer-shape: 0;--mat-stepper-header-hover-state-layer-shape: 0}html{--mat-stepper-header-icon-foreground-color: white;--mat-stepper-header-selected-state-icon-background-color: #3f51b5;--mat-stepper-header-selected-state-icon-foreground-color: white;--mat-stepper-header-done-state-icon-background-color: #3f51b5;--mat-stepper-header-done-state-icon-foreground-color: white;--mat-stepper-header-edit-state-icon-background-color: #3f51b5;--mat-stepper-header-edit-state-icon-foreground-color: white;--mat-stepper-container-color: white;--mat-stepper-line-color: rgba(0, 0, 0, .12);--mat-stepper-header-hover-state-layer-color: color-mix(in srgb, rgba(0, 0, 0, .87) 4%, transparent);--mat-stepper-header-focus-state-layer-color: color-mix(in srgb, rgba(0, 0, 0, .87) 12%, transparent);--mat-stepper-header-label-text-color: rgba(0, 0, 0, .54);--mat-stepper-header-optional-label-text-color: rgba(0, 0, 0, .54);--mat-stepper-header-selected-state-label-text-color: rgba(0, 0, 0, .87);--mat-stepper-header-error-state-label-text-color: #f44336;--mat-stepper-header-icon-background-color: rgba(0, 0, 0, .54);--mat-stepper-header-error-state-icon-foreground-color: #f44336;--mat-stepper-header-error-state-icon-background-color: transparent}html{--mat-stepper-header-height: 72px}html{--mat-stepper-container-text-font: Roboto, sans-serif;--mat-stepper-header-label-text-font: Roboto, sans-serif;--mat-stepper-header-label-text-size: 14px;--mat-stepper-header-label-text-weight: 400;--mat-stepper-header-error-state-label-text-size: 16px;--mat-stepper-header-selected-state-label-text-size: 16px;--mat-stepper-header-selected-state-label-text-weight: 400}html{--mat-sort-arrow-color: rgba(0, 0, 0, .87)}html{--mat-toolbar-container-background-color: white;--mat-toolbar-container-text-color: rgba(0, 0, 0, .87)}.mat-toolbar.mat-primary{--mat-toolbar-container-background-color: #3f51b5;--mat-toolbar-container-text-color: white}html{--mat-toolbar-standard-height: 64px;--mat-toolbar-mobile-height: 56px}html{--mat-toolbar-title-text-font: Roboto, sans-serif;--mat-toolbar-title-text-line-height: 32px;--mat-toolbar-title-text-size: 20px;--mat-toolbar-title-text-tracking: .0125em;--mat-toolbar-title-text-weight: 500}html{--mat-tree-container-background-color: white;--mat-tree-node-text-color: rgba(0, 0, 0, .87)}html{--mat-tree-node-min-height: 48px}html{--mat-tree-node-text-font: Roboto, sans-serif;--mat-tree-node-text-size: 14px;--mat-tree-node-text-weight: 400}html{--mat-timepicker-container-shape: 4px;--mat-timepicker-container-elevation-shadow: 0px 5px 5px -3px rgba(0, 0, 0, .2), 0px 8px 10px 1px rgba(0, 0, 0, .14), 0px 3px 14px 2px rgba(0, 0, 0, .12)}html{--mat-timepicker-container-background-color: white}@layer theme,base,components,utilities;@layer theme{:root{--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;--font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;--font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;--color-red-50: oklch(97.1% .013 17.38);--color-red-100: oklch(93.6% .032 17.717);--color-red-200: oklch(88.5% .062 18.334);--color-red-300: oklch(80.8% .114 19.571);--color-red-400: oklch(70.4% .191 22.216);--color-red-500: oklch(63.7% .237 25.331);--color-red-600: oklch(57.7% .245 27.325);--color-red-700: oklch(50.5% .213 27.518);--color-red-800: oklch(44.4% .177 26.899);--color-red-900: oklch(39.6% .141 25.723);--color-red-950: oklch(25.8% .092 26.042);--color-orange-50: oklch(98% .016 73.684);--color-orange-100: oklch(95.4% .038 75.164);--color-orange-200: oklch(90.1% .076 70.697);--color-orange-300: oklch(83.7% .128 66.29);--color-orange-400: oklch(75% .183 55.934);--color-orange-500: oklch(70.5% .213 47.604);--color-orange-600: oklch(64.6% .222 41.116);--color-orange-700: oklch(55.3% .195 38.402);--color-orange-800: oklch(47% .157 37.304);--color-orange-900: oklch(40.8% .123 38.172);--color-orange-950: oklch(26.6% .079 36.259);--color-amber-50: oklch(98.7% .022 95.277);--color-amber-100: oklch(96.2% .059 95.617);--color-amber-200: oklch(92.4% .12 95.746);--color-amber-300: oklch(87.9% .169 91.605);--color-amber-400: oklch(82.8% .189 84.429);--color-amber-500: oklch(76.9% .188 70.08);--color-amber-600: oklch(66.6% .179 58.318);--color-amber-700: oklch(55.5% .163 48.998);--color-amber-800: oklch(47.3% .137 46.201);--color-amber-900: oklch(41.4% .112 45.904);--color-amber-950: oklch(27.9% .077 45.635);--color-yellow-50: oklch(98.7% .026 102.212);--color-yellow-100: oklch(97.3% .071 103.193);--color-yellow-200: oklch(94.5% .129 101.54);--color-yellow-300: oklch(90.5% .182 98.111);--color-yellow-400: oklch(85.2% .199 91.936);--color-yellow-500: oklch(79.5% .184 86.047);--color-yellow-600: oklch(68.1% .162 75.834);--color-yellow-700: oklch(55.4% .135 66.442);--color-yellow-800: oklch(47.6% .114 61.907);--color-yellow-900: oklch(42.1% .095 57.708);--color-yellow-950: oklch(28.6% .066 53.813);--color-lime-50: oklch(98.6% .031 120.757);--color-lime-100: oklch(96.7% .067 122.328);--color-lime-200: oklch(93.8% .127 124.321);--color-lime-300: oklch(89.7% .196 126.665);--color-lime-400: oklch(84.1% .238 128.85);--color-lime-500: oklch(76.8% .233 130.85);--color-lime-600: oklch(64.8% .2 131.684);--color-lime-700: oklch(53.2% .157 131.589);--color-lime-800: oklch(45.3% .124 130.933);--color-lime-900: oklch(40.5% .101 131.063);--color-lime-950: oklch(27.4% .072 132.109);--color-green-50: oklch(98.2% .018 155.826);--color-green-100: oklch(96.2% .044 156.743);--color-green-200: oklch(92.5% .084 155.995);--color-green-300: oklch(87.1% .15 154.449);--color-green-400: oklch(79.2% .209 151.711);--color-green-500: oklch(72.3% .219 149.579);--color-green-600: oklch(62.7% .194 149.214);--color-green-700: oklch(52.7% .154 150.069);--color-green-800: oklch(44.8% .119 151.328);--color-green-900: oklch(39.3% .095 152.535);--color-green-950: oklch(26.6% .065 152.934);--color-emerald-50: oklch(97.9% .021 166.113);--color-emerald-100: oklch(95% .052 163.051);--color-emerald-200: oklch(90.5% .093 164.15);--color-emerald-300: oklch(84.5% .143 164.978);--color-emerald-400: oklch(76.5% .177 163.223);--color-emerald-500: oklch(69.6% .17 162.48);--color-emerald-600: oklch(59.6% .145 163.225);--color-emerald-700: oklch(50.8% .118 165.612);--color-emerald-800: oklch(43.2% .095 166.913);--color-emerald-900: oklch(37.8% .077 168.94);--color-emerald-950: oklch(26.2% .051 172.552);--color-teal-50: oklch(98.4% .014 180.72);--color-teal-100: oklch(95.3% .051 180.801);--color-teal-200: oklch(91% .096 180.426);--color-teal-300: oklch(85.5% .138 181.071);--color-teal-400: oklch(77.7% .152 181.912);--color-teal-500: oklch(70.4% .14 182.503);--color-teal-600: oklch(60% .118 184.704);--color-teal-700: oklch(51.1% .096 186.391);--color-teal-800: oklch(43.7% .078 188.216);--color-teal-900: oklch(38.6% .063 188.416);--color-teal-950: oklch(27.7% .046 192.524);--color-cyan-50: oklch(98.4% .019 200.873);--color-cyan-100: oklch(95.6% .045 203.388);--color-cyan-200: oklch(91.7% .08 205.041);--color-cyan-300: oklch(86.5% .127 207.078);--color-cyan-400: oklch(78.9% .154 211.53);--color-cyan-500: oklch(71.5% .143 215.221);--color-cyan-600: oklch(60.9% .126 221.723);--color-cyan-700: oklch(52% .105 223.128);--color-cyan-800: oklch(45% .085 224.283);--color-cyan-900: oklch(39.8% .07 227.392);--color-cyan-950: oklch(30.2% .056 229.695);--color-sky-50: oklch(97.7% .013 236.62);--color-sky-100: oklch(95.1% .026 236.824);--color-sky-200: oklch(90.1% .058 230.902);--color-sky-300: oklch(82.8% .111 230.318);--color-sky-400: oklch(74.6% .16 232.661);--color-sky-500: oklch(68.5% .169 237.323);--color-sky-600: oklch(58.8% .158 241.966);--color-sky-700: oklch(50% .134 242.749);--color-sky-800: oklch(44.3% .11 240.79);--color-sky-900: oklch(39.1% .09 240.876);--color-sky-950: oklch(29.3% .066 243.157);--color-blue-50: oklch(97% .014 254.604);--color-blue-100: oklch(93.2% .032 255.585);--color-blue-200: oklch(88.2% .059 254.128);--color-blue-300: oklch(80.9% .105 251.813);--color-blue-400: oklch(70.7% .165 254.624);--color-blue-500: oklch(62.3% .214 259.815);--color-blue-600: oklch(54.6% .245 262.881);--color-blue-700: oklch(48.8% .243 264.376);--color-blue-800: oklch(42.4% .199 265.638);--color-blue-900: oklch(37.9% .146 265.522);--color-blue-950: oklch(28.2% .091 267.935);--color-indigo-50: oklch(96.2% .018 272.314);--color-indigo-100: oklch(93% .034 272.788);--color-indigo-200: oklch(87% .065 274.039);--color-indigo-300: oklch(78.5% .115 274.713);--color-indigo-400: oklch(67.3% .182 276.935);--color-indigo-500: oklch(58.5% .233 277.117);--color-indigo-600: oklch(51.1% .262 276.966);--color-indigo-700: oklch(45.7% .24 277.023);--color-indigo-800: oklch(39.8% .195 277.366);--color-indigo-900: oklch(35.9% .144 278.697);--color-indigo-950: oklch(25.7% .09 281.288);--color-violet-50: oklch(96.9% .016 293.756);--color-violet-100: oklch(94.3% .029 294.588);--color-violet-200: oklch(89.4% .057 293.283);--color-violet-300: oklch(81.1% .111 293.571);--color-violet-400: oklch(70.2% .183 293.541);--color-violet-500: oklch(60.6% .25 292.717);--color-violet-600: oklch(54.1% .281 293.009);--color-violet-700: oklch(49.1% .27 292.581);--color-violet-800: oklch(43.2% .232 292.759);--color-violet-900: oklch(38% .189 293.745);--color-violet-950: oklch(28.3% .141 291.089);--color-purple-50: oklch(97.7% .014 308.299);--color-purple-100: oklch(94.6% .033 307.174);--color-purple-200: oklch(90.2% .063 306.703);--color-purple-300: oklch(82.7% .119 306.383);--color-purple-400: oklch(71.4% .203 305.504);--color-purple-500: oklch(62.7% .265 303.9);--color-purple-600: oklch(55.8% .288 302.321);--color-purple-700: oklch(49.6% .265 301.924);--color-purple-800: oklch(43.8% .218 303.724);--color-purple-900: oklch(38.1% .176 304.987);--color-purple-950: oklch(29.1% .149 302.717);--color-fuchsia-50: oklch(97.7% .017 320.058);--color-fuchsia-100: oklch(95.2% .037 318.852);--color-fuchsia-200: oklch(90.3% .076 319.62);--color-fuchsia-300: oklch(83.3% .145 321.434);--color-fuchsia-400: oklch(74% .238 322.16);--color-fuchsia-500: oklch(66.7% .295 322.15);--color-fuchsia-600: oklch(59.1% .293 322.896);--color-fuchsia-700: oklch(51.8% .253 323.949);--color-fuchsia-800: oklch(45.2% .211 324.591);--color-fuchsia-900: oklch(40.1% .17 325.612);--color-fuchsia-950: oklch(29.3% .136 325.661);--color-pink-50: oklch(97.1% .014 343.198);--color-pink-100: oklch(94.8% .028 342.258);--color-pink-200: oklch(89.9% .061 343.231);--color-pink-300: oklch(82.3% .12 346.018);--color-pink-400: oklch(71.8% .202 349.761);--color-pink-500: oklch(65.6% .241 354.308);--color-pink-600: oklch(59.2% .249 .584);--color-pink-700: oklch(52.5% .223 3.958);--color-pink-800: oklch(45.9% .187 3.815);--color-pink-900: oklch(40.8% .153 2.432);--color-pink-950: oklch(28.4% .109 3.907);--color-rose-50: oklch(96.9% .015 12.422);--color-rose-100: oklch(94.1% .03 12.58);--color-rose-200: oklch(89.2% .058 10.001);--color-rose-300: oklch(81% .117 11.638);--color-rose-400: oklch(71.2% .194 13.428);--color-rose-500: oklch(64.5% .246 16.439);--color-rose-600: oklch(58.6% .253 17.585);--color-rose-700: oklch(51.4% .222 16.935);--color-rose-800: oklch(45.5% .188 13.697);--color-rose-900: oklch(41% .159 10.272);--color-rose-950: oklch(27.1% .105 12.094);--color-slate-50: oklch(98.4% .003 247.858);--color-slate-100: oklch(96.8% .007 247.896);--color-slate-200: oklch(92.9% .013 255.508);--color-slate-300: oklch(86.9% .022 252.894);--color-slate-400: oklch(70.4% .04 256.788);--color-slate-500: oklch(55.4% .046 257.417);--color-slate-600: oklch(44.6% .043 257.281);--color-slate-700: oklch(37.2% .044 257.287);--color-slate-800: oklch(27.9% .041 260.031);--color-slate-900: oklch(20.8% .042 265.755);--color-slate-950: oklch(12.9% .042 264.695);--color-gray-50: oklch(98.5% .002 247.839);--color-gray-100: oklch(96.7% .003 264.542);--color-gray-200: oklch(92.8% .006 264.531);--color-gray-300: oklch(87.2% .01 258.338);--color-gray-400: oklch(70.7% .022 261.325);--color-gray-500: oklch(55.1% .027 264.364);--color-gray-600: oklch(44.6% .03 256.802);--color-gray-700: oklch(37.3% .034 259.733);--color-gray-800: oklch(27.8% .033 256.848);--color-gray-900: oklch(21% .034 264.665);--color-gray-950: oklch(13% .028 261.692);--color-zinc-50: oklch(98.5% 0 0);--color-zinc-100: oklch(96.7% .001 286.375);--color-zinc-200: oklch(92% .004 286.32);--color-zinc-300: oklch(87.1% .006 286.286);--color-zinc-400: oklch(70.5% .015 286.067);--color-zinc-500: oklch(55.2% .016 285.938);--color-zinc-600: oklch(44.2% .017 285.786);--color-zinc-700: oklch(37% .013 285.805);--color-zinc-800: oklch(27.4% .006 286.033);--color-zinc-900: oklch(21% .006 285.885);--color-zinc-950: oklch(14.1% .005 285.823);--color-neutral-50: oklch(98.5% 0 0);--color-neutral-100: oklch(97% 0 0);--color-neutral-200: oklch(92.2% 0 0);--color-neutral-300: oklch(87% 0 0);--color-neutral-400: oklch(70.8% 0 0);--color-neutral-500: oklch(55.6% 0 0);--color-neutral-600: oklch(43.9% 0 0);--color-neutral-700: oklch(37.1% 0 0);--color-neutral-800: oklch(26.9% 0 0);--color-neutral-900: oklch(20.5% 0 0);--color-neutral-950: oklch(14.5% 0 0);--color-stone-50: oklch(98.5% .001 106.423);--color-stone-100: oklch(97% .001 106.424);--color-stone-200: oklch(92.3% .003 48.717);--color-stone-300: oklch(86.9% .005 56.366);--color-stone-400: oklch(70.9% .01 56.259);--color-stone-500: oklch(55.3% .013 58.071);--color-stone-600: oklch(44.4% .011 73.639);--color-stone-700: oklch(37.4% .01 67.558);--color-stone-800: oklch(26.8% .007 34.298);--color-stone-900: oklch(21.6% .006 56.043);--color-stone-950: oklch(14.7% .004 49.25);--color-mauve-50: oklch(98.5% 0 0);--color-mauve-100: oklch(96% .003 325.6);--color-mauve-200: oklch(92.2% .005 325.62);--color-mauve-300: oklch(86.5% .012 325.68);--color-mauve-400: oklch(71.1% .019 323.02);--color-mauve-500: oklch(54.2% .034 322.5);--color-mauve-600: oklch(43.5% .029 321.78);--color-mauve-700: oklch(36.4% .029 323.89);--color-mauve-800: oklch(26.3% .024 320.12);--color-mauve-900: oklch(21.2% .019 322.12);--color-mauve-950: oklch(14.5% .008 326);--color-olive-50: oklch(98.8% .003 106.5);--color-olive-100: oklch(96.6% .005 106.5);--color-olive-200: oklch(93% .007 106.5);--color-olive-300: oklch(88% .011 106.6);--color-olive-400: oklch(73.7% .021 106.9);--color-olive-500: oklch(58% .031 107.3);--color-olive-600: oklch(46.6% .025 107.3);--color-olive-700: oklch(39.4% .023 107.4);--color-olive-800: oklch(28.6% .016 107.4);--color-olive-900: oklch(22.8% .013 107.4);--color-olive-950: oklch(15.3% .006 107.1);--color-mist-50: oklch(98.7% .002 197.1);--color-mist-100: oklch(96.3% .002 197.1);--color-mist-200: oklch(92.5% .005 214.3);--color-mist-300: oklch(87.2% .007 219.6);--color-mist-400: oklch(72.3% .014 214.4);--color-mist-500: oklch(56% .021 213.5);--color-mist-600: oklch(45% .017 213.2);--color-mist-700: oklch(37.8% .015 216);--color-mist-800: oklch(27.5% .011 216.9);--color-mist-900: oklch(21.8% .008 223.9);--color-mist-950: oklch(14.8% .004 228.8);--color-taupe-50: oklch(98.6% .002 67.8);--color-taupe-100: oklch(96% .002 17.2);--color-taupe-200: oklch(92.2% .005 34.3);--color-taupe-300: oklch(86.8% .007 39.5);--color-taupe-400: oklch(71.4% .014 41.2);--color-taupe-500: oklch(54.7% .021 43.1);--color-taupe-600: oklch(43.8% .017 39.3);--color-taupe-700: oklch(36.7% .016 35.7);--color-taupe-800: oklch(26.8% .011 36.5);--color-taupe-900: oklch(21.4% .009 43.1);--color-taupe-950: oklch(14.7% .004 49.3);--color-black: #000;--color-white: #fff;--spacing: .25rem;--breakpoint-sm: 40rem;--breakpoint-md: 48rem;--breakpoint-lg: 64rem;--breakpoint-xl: 80rem;--breakpoint-2xl: 96rem;--container-3xs: 16rem;--container-2xs: 18rem;--container-xs: 20rem;--container-sm: 24rem;--container-md: 28rem;--container-lg: 32rem;--container-xl: 36rem;--container-2xl: 42rem;--container-3xl: 48rem;--container-4xl: 56rem;--container-5xl: 64rem;--container-6xl: 72rem;--container-7xl: 80rem;--text-xs: .75rem;--text-xs--line-height: calc(1 / .75);--text-sm: .875rem;--text-sm--line-height: calc(1.25 / .875);--text-base: 1rem;--text-base--line-height: 1.5 ;--text-lg: 1.125rem;--text-lg--line-height: calc(1.75 / 1.125);--text-xl: 1.25rem;--text-xl--line-height: calc(1.75 / 1.25);--text-2xl: 1.5rem;--text-2xl--line-height: calc(2 / 1.5);--text-3xl: 1.875rem;--text-3xl--line-height: 1.2 ;--text-4xl: 2.25rem;--text-4xl--line-height: calc(2.5 / 2.25);--text-5xl: 3rem;--text-5xl--line-height: 1;--text-6xl: 3.75rem;--text-6xl--line-height: 1;--text-7xl: 4.5rem;--text-7xl--line-height: 1;--text-8xl: 6rem;--text-8xl--line-height: 1;--text-9xl: 8rem;--text-9xl--line-height: 1;--font-weight-thin: 100;--font-weight-extralight: 200;--font-weight-light: 300;--font-weight-normal: 400;--font-weight-medium: 500;--font-weight-semibold: 600;--font-weight-bold: 700;--font-weight-extrabold: 800;--font-weight-black: 900;--tracking-tighter: -.05em;--tracking-tight: -.025em;--tracking-normal: 0em;--tracking-wide: .025em;--tracking-wider: .05em;--tracking-widest: .1em;--leading-tight: 1.25;--leading-snug: 1.375;--leading-normal: 1.5;--leading-relaxed: 1.625;--leading-loose: 2;--radius-xs: .125rem;--radius-sm: .25rem;--radius-md: .375rem;--radius-lg: .5rem;--radius-xl: .75rem;--radius-2xl: 1rem;--radius-3xl: 1.5rem;--radius-4xl: 2rem;--shadow-2xs: 0 1px rgb(0 0 0 / .05);--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / .05);--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--shadow-md: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / .25);--inset-shadow-2xs: inset 0 1px rgb(0 0 0 / .05);--inset-shadow-xs: inset 0 1px 1px rgb(0 0 0 / .05);--inset-shadow-sm: inset 0 2px 4px rgb(0 0 0 / .05);--drop-shadow-xs: 0 1px 1px rgb(0 0 0 / .05);--drop-shadow-sm: 0 1px 2px rgb(0 0 0 / .15);--drop-shadow-md: 0 3px 3px rgb(0 0 0 / .12);--drop-shadow-lg: 0 4px 4px rgb(0 0 0 / .15);--drop-shadow-xl: 0 9px 7px rgb(0 0 0 / .1);--drop-shadow-2xl: 0 25px 25px rgb(0 0 0 / .15);--text-shadow-2xs: 0px 1px 0px rgb(0 0 0 / .15);--text-shadow-xs: 0px 1px 1px rgb(0 0 0 / .2);--text-shadow-sm: 0px 1px 0px rgb(0 0 0 / .075), 0px 1px 1px rgb(0 0 0 / .075), 0px 2px 2px rgb(0 0 0 / .075);--text-shadow-md: 0px 1px 1px rgb(0 0 0 / .1), 0px 1px 2px rgb(0 0 0 / .1), 0px 2px 4px rgb(0 0 0 / .1);--text-shadow-lg: 0px 1px 2px rgb(0 0 0 / .1), 0px 3px 2px rgb(0 0 0 / .1), 0px 4px 8px rgb(0 0 0 / .1);--ease-in: cubic-bezier(.4, 0, 1, 1);--ease-out: cubic-bezier(0, 0, .2, 1);--ease-in-out: cubic-bezier(.4, 0, .2, 1);--animate-spin: spin 1s linear infinite;--animate-ping: ping 1s cubic-bezier(0, 0, .2, 1) infinite;--animate-pulse: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--animate-bounce: bounce 1s infinite;--blur-xs: 4px;--blur-sm: 8px;--blur-md: 12px;--blur-lg: 16px;--blur-xl: 24px;--blur-2xl: 40px;--blur-3xl: 64px;--perspective-dramatic: 100px;--perspective-near: 300px;--perspective-normal: 500px;--perspective-midrange: 800px;--perspective-distant: 1200px;--aspect-video: 16 / 9;--default-transition-duration: .15s;--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);--default-font-family: var(--font-sans);--default-mono-font-family: var(--font-mono);--color-primary: #6366f1;--color-accent: #10b981}}@layer base{*,:after,:before{box-sizing:border-box;margin:0;padding:0;border:0 solid}html{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings, normal);font-variation-settings:var(--default-font-variation-settings, normal);-webkit-tap-highlight-color:transparent}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}svg{display:block;vertical-align:middle}button,input{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;border-radius:0;background-color:transparent;opacity:1}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}}@layer utilities{.sticky{position:sticky}.top-0{top:calc(var(--spacing) * 0)}.z-50{z-index:50}.mx-auto{margin-inline:auto}.-mt-1{margin-top:calc(var(--spacing) * -1)}.mt-4{margin-top:calc(var(--spacing) * 4)}.mt-6{margin-top:calc(var(--spacing) * 6)}.mr-2{margin-right:calc(var(--spacing) * 2)}.mb-4{margin-bottom:calc(var(--spacing) * 4)}.mb-6{margin-bottom:calc(var(--spacing) * 6)}.ml-auto{margin-left:auto}.flex{display:flex}.h-auto{height:auto}.h-px{height:1px}.min-h-16{min-height:calc(var(--spacing) * 16)}.min-h-\\[calc\\(100vh-120px\\)\\]{min-height:calc(100vh - 120px)}.min-h-screen{min-height:100vh}.w-full{width:100%}.max-w-7xl{max-width:var(--container-7xl)}.max-w-md{max-width:var(--container-md)}.min-w-0{min-width:calc(var(--spacing) * 0)}.flex-1{flex:1}.scale-150{--tw-scale-x: 150%;--tw-scale-y: 150%;--tw-scale-z: 150%;scale:var(--tw-scale-x) var(--tw-scale-y)}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-center{justify-content:center}.justify-end{justify-content:flex-end}.gap-2{gap:calc(var(--spacing) * 2)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-4{gap:calc(var(--spacing) * 4)}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rounded-3xl{border-radius:var(--radius-3xl)}.rounded-full{border-radius:calc(infinity * 1px)}.rounded-xl{border-radius:var(--radius-xl)}.border{border-style:var(--tw-border-style);border-width:1px}.border-slate-200{border-color:var(--color-slate-200)}.border-slate-200\\/80{border-color:color-mix(in srgb,oklch(92.9% .013 255.508) 80%,transparent)}@supports (color: color-mix(in lab,red,red)){.border-slate-200\\/80{border-color:color-mix(in oklab,var(--color-slate-200) 80%,transparent)}}.\\!bg-indigo-600{background-color:var(--color-indigo-600)!important}.bg-primary\\/10{background-color:color-mix(in srgb,#6366f1 10%,transparent)}@supports (color: color-mix(in lab,red,red)){.bg-primary\\/10{background-color:color-mix(in oklab,var(--color-primary) 10%,transparent)}}.bg-slate-50{background-color:var(--color-slate-50)}.bg-slate-200{background-color:var(--color-slate-200)}.bg-white{background-color:var(--color-white)}.bg-white\\/95{background-color:color-mix(in srgb,#fff 95%,transparent)}@supports (color: color-mix(in lab,red,red)){.bg-white\\/95{background-color:color-mix(in oklab,var(--color-white) 95%,transparent)}}.p-2{padding:calc(var(--spacing) * 2)}.p-4{padding:calc(var(--spacing) * 4)}.p-5{padding:calc(var(--spacing) * 5)}.px-3{padding-inline:calc(var(--spacing) * 3)}.py-1{padding-block:calc(var(--spacing) * 1)}.py-2{padding-block:calc(var(--spacing) * 2)}.py-3{padding-block:calc(var(--spacing) * 3)}.py-4{padding-block:calc(var(--spacing) * 4)}.text-center{text-align:center}.text-right{text-align:right}.text-2xl{font-size:var(--text-2xl);line-height:var(--tw-leading, var(--text-2xl--line-height))}.text-base{font-size:var(--text-base);line-height:var(--tw-leading, var(--text-base--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading, var(--text-sm--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading, var(--text-xs--line-height))}.font-bold{--tw-font-weight: var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-medium{--tw-font-weight: var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-semibold{--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-tight{--tw-tracking: var(--tracking-tight);letter-spacing:var(--tracking-tight)}.\\!text-white{color:var(--color-white)!important}.text-indigo-600{color:var(--color-indigo-600)}.text-primary{color:var(--color-primary)}.text-slate-400{color:var(--color-slate-400)}.text-slate-500{color:var(--color-slate-500)}.text-slate-600{color:var(--color-slate-600)}.text-slate-700{color:var(--color-slate-700)}.text-slate-800{color:var(--color-slate-800)}.shadow-2xl{--tw-shadow: 0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / .25));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md{--tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-sm{--tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease, var(--default-transition-timing-function));transition-duration:var(--tw-duration, var(--default-transition-duration))}@media(hover:hover){.hover\\:\\!bg-indigo-700:hover{background-color:var(--color-indigo-700)!important}}@media(hover:hover){.hover\\:bg-slate-50:hover{background-color:var(--color-slate-50)}}@media(hover:hover){.hover\\:text-indigo-700:hover{color:var(--color-indigo-700)}}@media(hover:hover){.hover\\:underline:hover{text-decoration-line:underline}}.disabled\\:\\!bg-slate-300:disabled{background-color:var(--color-slate-300)!important}.disabled\\:\\!text-slate-500:disabled{color:var(--color-slate-500)!important}.disabled\\:opacity-60:disabled{opacity:60%}@media(width>=40rem){.sm\\:gap-4{gap:calc(var(--spacing) * 4)}}@media(width>=40rem){.sm\\:p-4{padding:calc(var(--spacing) * 4)}}@media(width>=40rem){.sm\\:p-8{padding:calc(var(--spacing) * 8)}}@media(width>=40rem){.sm\\:px-4{padding-inline:calc(var(--spacing) * 4)}}@media(width>=40rem){.sm\\:py-6{padding-block:calc(var(--spacing) * 6)}}@media(width>=40rem){.sm\\:text-xl{font-size:var(--text-xl);line-height:var(--tw-leading, var(--text-xl--line-height))}}}html,body{height:100%;margin:0}body{font-family:var(--font-sans)}@property --tw-scale-x{syntax: "*"; inherits: false; initial-value: 1;}@property --tw-scale-y{syntax: "*"; inherits: false; initial-value: 1;}@property --tw-scale-z{syntax: "*"; inherits: false; initial-value: 1;}@property --tw-rotate-x{syntax: "*"; inherits: false;}@property --tw-rotate-y{syntax: "*"; inherits: false;}@property --tw-rotate-z{syntax: "*"; inherits: false;}@property --tw-skew-x{syntax: "*"; inherits: false;}@property --tw-skew-y{syntax: "*"; inherits: false;}@property --tw-space-y-reverse{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-border-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-gradient-position{syntax: "*"; inherits: false;}@property --tw-gradient-from{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-via{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-to{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-stops{syntax: "*"; inherits: false;}@property --tw-gradient-via-stops{syntax: "*"; inherits: false;}@property --tw-gradient-from-position{syntax: "<length-percentage>"; inherits: false; initial-value: 0%;}@property --tw-gradient-via-position{syntax: "<length-percentage>"; inherits: false; initial-value: 50%;}@property --tw-gradient-to-position{syntax: "<length-percentage>"; inherits: false; initial-value: 100%;}@property --tw-leading{syntax: "*"; inherits: false;}@property --tw-font-weight{syntax: "*"; inherits: false;}@property --tw-tracking{syntax: "*"; inherits: false;}@property --tw-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-shadow-color{syntax: "*"; inherits: false;}@property --tw-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-inset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-shadow-color{syntax: "*"; inherits: false;}@property --tw-inset-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-ring-color{syntax: "*"; inherits: false;}@property --tw-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-ring-color{syntax: "*"; inherits: false;}@property --tw-inset-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-ring-inset{syntax: "*"; inherits: false;}@property --tw-ring-offset-width{syntax: "<length>"; inherits: false; initial-value: 0px;}@property --tw-ring-offset-color{syntax: "*"; inherits: false; initial-value: #fff;}@property --tw-ring-offset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-outline-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-blur{syntax: "*"; inherits: false;}@property --tw-brightness{syntax: "*"; inherits: false;}@property --tw-contrast{syntax: "*"; inherits: false;}@property --tw-grayscale{syntax: "*"; inherits: false;}@property --tw-hue-rotate{syntax: "*"; inherits: false;}@property --tw-invert{syntax: "*"; inherits: false;}@property --tw-opacity{syntax: "*"; inherits: false;}@property --tw-saturate{syntax: "*"; inherits: false;}@property --tw-sepia{syntax: "*"; inherits: false;}@property --tw-drop-shadow{syntax: "*"; inherits: false;}@property --tw-drop-shadow-color{syntax: "*"; inherits: false;}@property --tw-drop-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-drop-shadow-size{syntax: "*"; inherits: false;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*,:before,:after{--tw-scale-x: 1;--tw-scale-y: 1;--tw-scale-z: 1;--tw-rotate-x: initial;--tw-rotate-y: initial;--tw-rotate-z: initial;--tw-skew-x: initial;--tw-skew-y: initial;--tw-space-y-reverse: 0;--tw-border-style: solid;--tw-gradient-position: initial;--tw-gradient-from: #0000;--tw-gradient-via: #0000;--tw-gradient-to: #0000;--tw-gradient-stops: initial;--tw-gradient-via-stops: initial;--tw-gradient-from-position: 0%;--tw-gradient-via-position: 50%;--tw-gradient-to-position: 100%;--tw-leading: initial;--tw-font-weight: initial;--tw-tracking: initial;--tw-shadow: 0 0 #0000;--tw-shadow-color: initial;--tw-shadow-alpha: 100%;--tw-inset-shadow: 0 0 #0000;--tw-inset-shadow-color: initial;--tw-inset-shadow-alpha: 100%;--tw-ring-color: initial;--tw-ring-shadow: 0 0 #0000;--tw-inset-ring-color: initial;--tw-inset-ring-shadow: 0 0 #0000;--tw-ring-inset: initial;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-offset-shadow: 0 0 #0000;--tw-outline-style: solid;--tw-blur: initial;--tw-brightness: initial;--tw-contrast: initial;--tw-grayscale: initial;--tw-hue-rotate: initial;--tw-invert: initial;--tw-opacity: initial;--tw-saturate: initial;--tw-sepia: initial;--tw-drop-shadow: initial;--tw-drop-shadow-color: initial;--tw-drop-shadow-alpha: 100%;--tw-drop-shadow-size: initial}}}
</style><link rel="stylesheet" href="styles-2VXTPZO3.css" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="styles-2VXTPZO3.css"></noscript><style ng-app-id="ng">[_nghost-ng-c3162732060]{display:block}</style><style ng-app-id="ng">.mat-toolbar {
  background: var(--mat-toolbar-container-background-color, var(--mat-sys-surface));
  color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}
.mat-toolbar, .mat-toolbar h1, .mat-toolbar h2, .mat-toolbar h3, .mat-toolbar h4, .mat-toolbar h5, .mat-toolbar h6 {
  font-family: var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));
  font-size: var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));
  line-height: var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-weight: var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));
  letter-spacing: var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));
  margin: 0;
}
@media (forced-colors: active) {
  .mat-toolbar {
    outline: solid 1px;
  }
}
.mat-toolbar .mat-form-field-underline,
.mat-toolbar .mat-form-field-ripple,
.mat-toolbar .mat-focused .mat-form-field-ripple {
  background-color: currentColor;
}
.mat-toolbar .mat-form-field-label,
.mat-toolbar .mat-focused .mat-form-field-label,
.mat-toolbar .mat-select-value,
.mat-toolbar .mat-select-arrow,
.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {
  color: inherit;
}
.mat-toolbar .mat-input-element {
  caret-color: currentColor;
}
.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed {
  --mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
  --mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}

.mat-toolbar-row, .mat-toolbar-single-row {
  display: flex;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-row, .mat-toolbar-single-row {
    height: var(--mat-toolbar-mobile-height, 56px);
  }
}

.mat-toolbar-multiple-rows {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-multiple-rows {
    min-height: var(--mat-toolbar-mobile-height, 56px);
  }
}
</style><style ng-app-id="ng">.mat-mdc-button-base {
  text-decoration: none;
}
.mat-mdc-button-base .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
@media (hover: none) {
  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {
    opacity: 0;
  }
}

.mdc-button {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: none;
  line-height: inherit;
  -webkit-appearance: none;
  overflow: visible;
  vertical-align: middle;
  background: transparent;
  padding: 0 8px;
}
.mdc-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mdc-button:active {
  outline: none;
}
.mdc-button:hover {
  cursor: pointer;
}
.mdc-button:disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-button[hidden] {
  display: none;
}
.mdc-button .mdc-button__label {
  position: relative;
}

.mat-mdc-button {
  padding: 0 var(--mat-button-text-horizontal-padding, 12px);
  height: var(--mat-button-text-container-height, 40px);
  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-text-label-text-transform);
  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-text-touch-target-size, 48px);
  display: var(--mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-filled-container-height, 40px);
  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-filled-label-text-transform);
  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-filled-touch-target-size, 48px);
  display: var(--mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));
  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));
  height: var(--mat-button-protected-container-height, 40px);
  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-protected-label-text-transform);
  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-protected-touch-target-size, 48px);
  display: var(--mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));
  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-outlined-container-height, 40px);
  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-outlined-label-text-transform);
  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));
  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));
  border-width: var(--mat-button-outlined-outline-width, 1px);
  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-outlined-touch-target-size, 48px);
  display: var(--mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));
  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-tonal-container-height, 40px);
  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-tonal-label-text-transform);
  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-tonal-touch-target-size, 48px);
  display: var(--mat-button-tonal-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-button,
.mat-mdc-unelevated-button,
.mat-mdc-raised-button,
.mat-mdc-outlined-button,
.mat-tonal-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-button .mdc-button__label,
.mat-mdc-button .mat-icon,
.mat-mdc-unelevated-button .mdc-button__label,
.mat-mdc-unelevated-button .mat-icon,
.mat-mdc-raised-button .mdc-button__label,
.mat-mdc-raised-button .mat-icon,
.mat-mdc-outlined-button .mdc-button__label,
.mat-mdc-outlined-button .mat-icon,
.mat-tonal-button .mdc-button__label,
.mat-tonal-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-button .mat-focus-indicator,
.mat-mdc-unelevated-button .mat-focus-indicator,
.mat-mdc-raised-button .mat-focus-indicator,
.mat-mdc-outlined-button .mat-focus-indicator,
.mat-tonal-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,
.mat-tonal-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-button._mat-animation-noopable,
.mat-mdc-unelevated-button._mat-animation-noopable,
.mat-mdc-raised-button._mat-animation-noopable,
.mat-mdc-outlined-button._mat-animation-noopable,
.mat-tonal-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-button > .mat-icon,
.mat-mdc-unelevated-button > .mat-icon,
.mat-mdc-raised-button > .mat-icon,
.mat-mdc-outlined-button > .mat-icon,
.mat-tonal-button > .mat-icon {
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: 1.125rem;
  height: 1.125rem;
  width: 1.125rem;
}

.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mdc-button__ripple {
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
}

.mat-mdc-unelevated-button .mat-focus-indicator::before,
.mat-tonal-button .mat-focus-indicator::before,
.mat-mdc-raised-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
}
</style><style ng-app-id="ng">@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
</style><style ng-app-id="ng">.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--mat-focus-indicator-display, none);
  border-width: var(--mat-focus-indicator-border-width, 3px);
  border-style: var(--mat-focus-indicator-border-style, solid);
  border-color: var(--mat-focus-indicator-border-color, transparent);
  border-radius: var(--mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --mat-focus-indicator-display: block;
  }
}
</style><style ng-app-id="ng">[_nghost-ng-c2573312701]{display:block}</style><style ng-app-id="ng">.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-elevated-container-elevation, var(--mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--mat-card-outlined-container-color, var(--mat-sys-surface));
  border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
  border-width: var(--mat-card-outlined-outline-width, 1px);
  border-color: var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));
  box-shadow: var(--mat-card-outlined-container-elevation, var(--mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));
  border-radius: var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-filled-container-elevation, var(--mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--mat-card-title-text-font, var(--mat-sys-title-large-font));
  line-height: var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-size: var(--mat-card-title-text-size, var(--mat-sys-title-large-size));
  letter-spacing: var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));
  font-weight: var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));
  line-height: var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));
  font-size: var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));
  letter-spacing: var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));
  font-weight: var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
</style><style ng-app-id="ng">mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--mat-icon-color, inherit);
}

.mat-icon {
  -webkit-user-select: none;
  user-select: none;
  background-repeat: no-repeat;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  width: 24px;
  overflow: hidden;
}
.mat-icon.mat-icon-inline {
  font-size: inherit;
  height: inherit;
  line-height: inherit;
  width: inherit;
}
.mat-icon.mat-ligature-font[fontIcon]::before {
  content: attr(fontIcon);
}

[dir=rtl] .mat-icon-rtl-mirror {
  transform: scale(-1, 1);
}

.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {
  display: block;
}
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {
  margin: auto;
}
</style><style ng-app-id="ng">.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) {
  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));
  border-width: var(--mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));
}

.mdc-line-ripple--active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--mat-form-field-container-height, 56px);
  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));
  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));
  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));
  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
</style><style ng-app-id="ng">.mat-mdc-icon-button {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;
  overflow: visible;
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
  flex-shrink: 0;
  text-align: center;
  width: var(--mat-icon-button-state-layer-size, 40px);
  height: var(--mat-icon-button-state-layer-size, 40px);
  padding: calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);
  font-size: var(--mat-icon-button-icon-size, 24px);
  color: var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-icon-button .mat-mdc-button-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-icon-button .mdc-button__label,
.mat-mdc-icon-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-icon-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-ripple-element {
  background-color: var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-icon-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-icon-button-touch-target-size, 48px);
  display: var(--mat-icon-button-touch-target-display, block);
  left: 50%;
  width: var(--mat-icon-button-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-icon-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-icon-button img,
.mat-mdc-icon-button svg {
  width: var(--mat-icon-button-icon-size, 24px);
  height: var(--mat-icon-button-icon-size, 24px);
  vertical-align: baseline;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
}
.mat-mdc-icon-button[hidden] {
  display: none;
}
.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {
  background: transparent;
  opacity: 1;
}
</style></head>
  <body>
    <app-root ng-version="21.2.7" ng-server-context="ssg"><app-navbar _nghost-ng-c3162732060><mat-toolbar _ngcontent-ng-c3162732060 color="primary" class="mat-toolbar h-auto min-h-16 flex-wrap gap-3 px-3 py-2 sm:px-4 sticky top-0 z-50 shadow-md mat-primary mat-toolbar-single-row"><div _ngcontent-ng-c3162732060 class="flex min-w-0 flex-1 items-center gap-2 sm:gap-4"><span _ngcontent-ng-c3162732060 class="truncate text-lg font-bold tracking-tight sm:text-xl">UserSystem</span><!----></div><div _ngcontent-ng-c3162732060 class="ml-auto flex flex-wrap items-center justify-end gap-2"><!----><a _ngcontent-ng-c3162732060 mat-stroked-button routerlink="/login" class="mdc-button mat-mdc-button-base mdc-button--outlined mat-mdc-outlined-button mat-unthemed" mat-ripple-loader-uninitialized mat-ripple-loader-class-name="mat-mdc-button-ripple" href="/login"><span class="mat-mdc-button-persistent-ripple mdc-button__ripple"></span><span class="mdc-button__label">Login</span><span class="mat-focus-indicator"></span><span class="mat-mdc-button-touch-target"></span></a><a _ngcontent-ng-c3162732060 mat-raised-button color="accent" routerlink="/register" class="mdc-button mat-mdc-button-base mdc-button--raised mat-mdc-raised-button mat-accent" mat-ripple-loader-uninitialized mat-ripple-loader-class-name="mat-mdc-button-ripple" href="/register"><span class="mat-mdc-button-persistent-ripple mdc-button__ripple"></span><span class="mdc-button__label">Register</span><span class="mat-focus-indicator"></span><span class="mat-mdc-button-touch-target"></span></a><!----></div></mat-toolbar></app-navbar><main class="min-h-screen bg-slate-50"><div class="mx-auto w-full max-w-7xl px-3 py-4 sm:px-4 sm:py-6"><router-outlet></router-outlet><app-login _nghost-ng-c2573312701><div _ngcontent-ng-c2573312701 class="flex min-h-[calc(100vh-120px)] items-center justify-center p-2 sm:p-4"><mat-card _ngcontent-ng-c2573312701 class="mat-mdc-card mdc-card w-full max-w-md rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-2xl sm:p-8"><mat-card-header _ngcontent-ng-c2573312701 class="mat-mdc-card-header flex flex-col items-center mb-6"><div class="mat-mdc-card-header-text"><mat-card-title _ngcontent-ng-c2573312701 class="mat-mdc-card-title text-2xl font-bold text-slate-800">Sign In</mat-card-title><mat-card-subtitle _ngcontent-ng-c2573312701 class="mat-mdc-card-subtitle text-slate-500">Welcome back! Please enter your details.</mat-card-subtitle></div><div _ngcontent-ng-c2573312701 class="bg-primary/10 p-4 rounded-full mb-4"><mat-icon _ngcontent-ng-c2573312701 role="img" color="primary" class="mat-icon notranslate scale-150 material-icons mat-ligature-font mat-primary" aria-hidden="true" data-mat-icon-type="font">lock</mat-icon></div></mat-card-header><form _ngcontent-ng-c2573312701 novalidate class="flex flex-col gap-4 ng-untouched ng-pristine ng-invalid"><button _ngcontent-ng-c2573312701 mat-stroked-button type="button" class="mdc-button mat-mdc-button-base w-full rounded-xl border border-slate-200 bg-white py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60 mdc-button--outlined mat-mdc-outlined-button mat-unthemed" mat-ripple-loader-uninitialized mat-ripple-loader-class-name="mat-mdc-button-ripple"><span class="mat-mdc-button-persistent-ripple mdc-button__ripple"></span><span class="mdc-button__label"><span _ngcontent-ng-c2573312701 class="flex items-center justify-center gap-3"><svg _ngcontent-ng-c2573312701="" width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path _ngcontent-ng-c2573312701="" fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.64 32.658 29.278 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.006 6.053 29.243 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/><path _ngcontent-ng-c2573312701="" fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 16.108 19.001 12 24 12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.006 6.053 29.243 4 24 4c-7.682 0-14.35 4.339-17.694 10.691z"/><path _ngcontent-ng-c2573312701="" fill="#4CAF50" d="M24 44c5.164 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.257 0-9.605-3.314-11.29-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path _ngcontent-ng-c2573312701="" fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.803 2.27-2.36 4.198-4.407 5.565l.003-.002 6.19 5.238C36.651 39.24 44 34 44 24c0-1.341-.138-2.651-.389-3.917z"/></svg><span _ngcontent-ng-c2573312701>Đăng nhập với Google</span></span></span><span class="mat-focus-indicator"></span><span class="mat-mdc-button-touch-target"></span></button><div _ngcontent-ng-c2573312701 class="flex items-center gap-3 py-1"><div _ngcontent-ng-c2573312701 class="h-px flex-1 bg-slate-200"></div><span _ngcontent-ng-c2573312701 class="text-xs font-medium text-slate-400">HOẶC</span><div _ngcontent-ng-c2573312701 class="h-px flex-1 bg-slate-200"></div></div><mat-form-field _ngcontent-ng-c2573312701 appearance="outline" floatlabel="always" class="mat-mdc-form-field w-full mat-mdc-form-field-type-mat-input mat-mdc-form-field-label-always-float mat-mdc-form-field-has-icon-prefix mat-form-field-appearance-outline mat-primary ng-untouched ng-pristine ng-invalid"><!----><div class="mat-mdc-text-field-wrapper mdc-text-field mdc-text-field--outlined"><!----><div class="mat-mdc-form-field-flex"><div matformfieldnotchedoutline class="mdc-notched-outline mdc-notched-outline--notched mdc-notched-outline--upgraded"><div class="mat-mdc-notch-piece mdc-notched-outline__leading"></div><div class="mat-mdc-notch-piece mdc-notched-outline__notch"><label matformfieldfloatinglabel class="mdc-floating-label mat-mdc-floating-label mdc-floating-label--float-above" id="mat-mdc-form-field-label-0" for="mat-input-0"><mat-label _ngcontent-ng-c2573312701>Username</mat-label><span aria-hidden="true" class="mat-mdc-form-field-required-marker mdc-floating-label--required"></span><!----></label><!----><!----><!----></div><div class="mat-mdc-notch-piece mdc-notched-outline__trailing"></div></div><!----><div class="mat-mdc-form-field-icon-prefix"><mat-icon _ngcontent-ng-c2573312701 role="img" matprefix class="mat-icon notranslate mr-2 text-slate-400 material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">person</mat-icon></div><!----><!----><div class="mat-mdc-form-field-infix"><!----><input _ngcontent-ng-c2573312701 matinput formcontrolname="username" autocomplete="username" placeholder="Enter your username" class="mat-mdc-input-element ng-untouched ng-pristine ng-invalid mat-input-server mat-mdc-form-field-input-control mdc-text-field__input" value id="mat-input-0" required aria-required="true"></div><!----><!----></div><!----></div><div aria-atomic="true" aria-live="polite" class="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align"><!----><div class="mat-mdc-form-field-hint-wrapper"><!----><div class="mat-mdc-form-field-hint-spacer"></div></div><!----></div></mat-form-field><mat-form-field _ngcontent-ng-c2573312701 appearance="outline" floatlabel="always" class="mat-mdc-form-field w-full mat-mdc-form-field-type-mat-input mat-mdc-form-field-label-always-float mat-mdc-form-field-has-icon-prefix mat-mdc-form-field-has-icon-suffix mat-form-field-appearance-outline mat-primary ng-untouched ng-pristine ng-invalid"><!----><div class="mat-mdc-text-field-wrapper mdc-text-field mdc-text-field--outlined"><!----><div class="mat-mdc-form-field-flex"><div matformfieldnotchedoutline class="mdc-notched-outline mdc-notched-outline--notched mdc-notched-outline--upgraded"><div class="mat-mdc-notch-piece mdc-notched-outline__leading"></div><div class="mat-mdc-notch-piece mdc-notched-outline__notch"><label matformfieldfloatinglabel class="mdc-floating-label mat-mdc-floating-label mdc-floating-label--float-above" id="mat-mdc-form-field-label-1" for="mat-input-1"><mat-label _ngcontent-ng-c2573312701>Password</mat-label><span aria-hidden="true" class="mat-mdc-form-field-required-marker mdc-floating-label--required"></span><!----></label><!----><!----><!----></div><div class="mat-mdc-notch-piece mdc-notched-outline__trailing"></div></div><!----><div class="mat-mdc-form-field-icon-prefix"><mat-icon _ngcontent-ng-c2573312701 role="img" matprefix class="mat-icon notranslate mr-2 text-slate-400 material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">key</mat-icon></div><!----><!----><div class="mat-mdc-form-field-infix"><!----><input _ngcontent-ng-c2573312701 matinput formcontrolname="password" autocomplete="current-password" placeholder="Enter your password" class="mat-mdc-input-element ng-untouched ng-pristine ng-invalid mat-input-server mat-mdc-form-field-input-control mdc-text-field__input" type="password" value id="mat-input-1" required aria-required="true"></div><!----><div class="mat-mdc-form-field-icon-suffix"><button _ngcontent-ng-c2573312701 mat-icon-button matsuffix type="button" class="mdc-icon-button mat-mdc-icon-button mat-mdc-button-base mat-unthemed" mat-ripple-loader-uninitialized mat-ripple-loader-class-name="mat-mdc-button-ripple" mat-ripple-loader-centered aria-label="Hide password" aria-pressed="true"><span class="mat-mdc-button-persistent-ripple mdc-icon-button__ripple"></span><mat-icon _ngcontent-ng-c2573312701 role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">visibility_off</mat-icon><span class="mat-focus-indicator"></span><span class="mat-mdc-button-touch-target"></span></button></div><!----></div><!----></div><div aria-atomic="true" aria-live="polite" class="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align"><!----><div class="mat-mdc-form-field-hint-wrapper"><!----><div class="mat-mdc-form-field-hint-spacer"></div></div><!----></div></mat-form-field><div _ngcontent-ng-c2573312701 class="-mt-1 text-right"><button _ngcontent-ng-c2573312701 type="button" class="text-sm font-medium text-indigo-600 transition hover:text-indigo-700 hover:underline"> Quên mật khẩu? </button></div><!----><button _ngcontent-ng-c2573312701 mat-flat-button color="primary" class="mdc-button mat-mdc-button-base mt-4 w-full rounded-xl !bg-indigo-600 py-4 text-base font-semibold !text-white shadow-md transition hover:!bg-indigo-700 disabled:!bg-slate-300 disabled:!text-slate-500 mdc-button--unelevated mat-mdc-unelevated-button mat-primary mat-mdc-button-disabled" mat-ripple-loader-uninitialized mat-ripple-loader-class-name="mat-mdc-button-ripple" mat-ripple-loader-disabled disabled="true"><span class="mat-mdc-button-persistent-ripple mdc-button__ripple"></span><span class="mdc-button__label"><!----> Sign In <!----></span><span class="mat-focus-indicator"></span><span class="mat-mdc-button-touch-target"></span></button><div _ngcontent-ng-c2573312701 class="text-center mt-6 text-slate-600"> Don't have an account? <a _ngcontent-ng-c2573312701 routerlink="/register" class="text-primary font-semibold hover:underline" href="/register">Register now</a></div></form></mat-card></div></app-login><!----></div></main></app-root>
  <link rel="modulepreload" href="chunk-YRUXEU3J.js"><link rel="modulepreload" href="chunk-Y3I7EWZX.js"><link rel="modulepreload" href="chunk-W6Z7JFJY.js"><script src="main-NBCKSKWZ.js" type="module"></script>
<link rel="modulepreload" href="chunk-TO3WONE3.js">
<link rel="modulepreload" href="chunk-WV53U6AG.js">
<link rel="modulepreload" href="chunk-3U6PPPS4.js">
<link rel="modulepreload" href="chunk-JIDTVWC6.js">
<link rel="modulepreload" href="chunk-6VO2IPTV.js">


<div class="cdk-live-announcer-element cdk-visually-hidden" aria-atomic="true" aria-live="polite" id="cdk-live-announcer-0"></div></body></html>`;
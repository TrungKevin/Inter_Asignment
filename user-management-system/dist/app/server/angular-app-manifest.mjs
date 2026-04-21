
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TO3WONE3.js",
      "chunk-WV53U6AG.js",
      "chunk-3U6PPPS4.js",
      "chunk-JIDTVWC6.js",
      "chunk-6VO2IPTV.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-PYQV5QXI.js",
      "chunk-BNFRCA2H.js",
      "chunk-5OFCD43Q.js",
      "chunk-FWPGBPCM.js",
      "chunk-WV53U6AG.js",
      "chunk-3U6PPPS4.js",
      "chunk-JIDTVWC6.js",
      "chunk-6VO2IPTV.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-HTVYYLHJ.js",
      "chunk-6VO2IPTV.js"
    ],
    "route": "/home"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-QZWZE5HL.js",
      "chunk-767TPATM.js",
      "chunk-3U6PPPS4.js",
      "chunk-JIDTVWC6.js",
      "chunk-6VO2IPTV.js"
    ],
    "route": "/profile"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-PK44P7QF.js",
      "chunk-BNFRCA2H.js",
      "chunk-JFOFTNX6.js",
      "chunk-PM7K3S2Z.js",
      "chunk-FWPGBPCM.js",
      "chunk-3TZ7CDQI.js",
      "chunk-JIDTVWC6.js",
      "chunk-6VO2IPTV.js"
    ],
    "route": "/admin"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-RAFLYHGM.js",
      "chunk-3FTKME33.js",
      "chunk-5OFCD43Q.js",
      "chunk-767TPATM.js",
      "chunk-WV53U6AG.js",
      "chunk-3U6PPPS4.js",
      "chunk-3TZ7CDQI.js",
      "chunk-JIDTVWC6.js",
      "chunk-6VO2IPTV.js"
    ],
    "route": "/access-requests/create"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-WEFVP6TC.js",
      "chunk-JFOFTNX6.js",
      "chunk-PM7K3S2Z.js",
      "chunk-FWPGBPCM.js",
      "chunk-WV53U6AG.js",
      "chunk-3U6PPPS4.js",
      "chunk-3TZ7CDQI.js",
      "chunk-JIDTVWC6.js",
      "chunk-6VO2IPTV.js"
    ],
    "route": "/access-requests/mine"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-GN45J7C6.js",
      "chunk-3FTKME33.js",
      "chunk-5OFCD43Q.js",
      "chunk-PM7K3S2Z.js",
      "chunk-WV53U6AG.js",
      "chunk-3U6PPPS4.js",
      "chunk-3TZ7CDQI.js",
      "chunk-JIDTVWC6.js",
      "chunk-6VO2IPTV.js"
    ],
    "route": "/camunda/tasks"
  },
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 88758, hash: '9a6acaad31b1b3035f32cec98008ef37344733b1cfe36e05e66db6356eecca0e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1143, hash: '7b5afe7a26cb070c84ada6c2bd3ef78f16b6b33f181c42fc9cca4771d1b8f403', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'access-requests/mine/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/access-requests_mine_index_html.mjs').then(m => m.default)},
    'access-requests/create/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/access-requests_create_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'camunda/tasks/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/camunda_tasks_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 189114, hash: '8693fffcf4fa0b75d0a9fb0e43e4a48867c21714c13948fb653ac2ad2e6fa6be', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 192374, hash: '7bc6875a68da6dff01c786f02b71abf721a974666ed223a706ced12fc31df2bf', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'styles-2VXTPZO3.css': {size: 164216, hash: '8L+xXWheKKA', text: () => import('./assets-chunks/styles-2VXTPZO3_css.mjs').then(m => m.default)}
  },
};

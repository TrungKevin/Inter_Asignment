
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
      "chunk-N4KYTC2R.js",
      "chunk-TNEGIHD5.js",
      "chunk-SNR6EHA2.js",
      "chunk-QANSRRDW.js",
      "chunk-7HWWP57W.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ELT2U2BK.js",
      "chunk-TRNIRFKX.js",
      "chunk-LIZQCSFU.js",
      "chunk-MEV7CCM6.js",
      "chunk-TNEGIHD5.js",
      "chunk-SNR6EHA2.js",
      "chunk-QANSRRDW.js",
      "chunk-7HWWP57W.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6TSM4USX.js",
      "chunk-7HWWP57W.js"
    ],
    "route": "/home"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-PG2KYYTU.js",
      "chunk-OLULOXSP.js",
      "chunk-SNR6EHA2.js",
      "chunk-QANSRRDW.js",
      "chunk-7HWWP57W.js"
    ],
    "route": "/profile"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-MMR57SKM.js",
      "chunk-TRNIRFKX.js",
      "chunk-CWAMX62H.js",
      "chunk-ERGID6ZX.js",
      "chunk-MEV7CCM6.js",
      "chunk-6IUBTEGQ.js",
      "chunk-QANSRRDW.js",
      "chunk-7HWWP57W.js"
    ],
    "route": "/admin"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4UTRW6LG.js",
      "chunk-BBUHAGCT.js",
      "chunk-LIZQCSFU.js",
      "chunk-OLULOXSP.js",
      "chunk-TNEGIHD5.js",
      "chunk-SNR6EHA2.js",
      "chunk-6IUBTEGQ.js",
      "chunk-QANSRRDW.js",
      "chunk-7HWWP57W.js"
    ],
    "route": "/access-requests/create"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4RPOW5OY.js",
      "chunk-CWAMX62H.js",
      "chunk-ERGID6ZX.js",
      "chunk-MEV7CCM6.js",
      "chunk-TNEGIHD5.js",
      "chunk-SNR6EHA2.js",
      "chunk-6IUBTEGQ.js",
      "chunk-QANSRRDW.js",
      "chunk-7HWWP57W.js"
    ],
    "route": "/access-requests/mine"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZTGD365A.js",
      "chunk-BBUHAGCT.js",
      "chunk-LIZQCSFU.js",
      "chunk-ERGID6ZX.js",
      "chunk-TNEGIHD5.js",
      "chunk-SNR6EHA2.js",
      "chunk-6IUBTEGQ.js",
      "chunk-QANSRRDW.js",
      "chunk-7HWWP57W.js"
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
    'index.csr.html': {size: 88758, hash: '4d386545df711283f09d233464613d173977a6ce4060d33d2db7f74701e75722', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1143, hash: '61f9a274b2a9363e2787118471a80bcc98f0150e6daa2bd9c06a3e7213b93d1f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'access-requests/create/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/access-requests_create_index_html.mjs').then(m => m.default)},
    'access-requests/mine/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/access-requests_mine_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'camunda/tasks/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/camunda_tasks_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 189114, hash: '8caae537202d432cca4ebaa046e1736bb4a0323770c87bade5dc5f718f0d77da', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 192374, hash: '8417d500c26ada196f012703a792db4e4260023bb1304cf24e22981480957bb8', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'styles-7JSBLIXD.css': {size: 164279, hash: 'CAHSwjaRbDY', text: () => import('./assets-chunks/styles-7JSBLIXD_css.mjs').then(m => m.default)}
  },
};


export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
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
      "chunk-RE3MZMMJ.js",
      "chunk-4AY747T2.js",
      "chunk-BE6M4QSQ.js",
      "chunk-QW2GHLSC.js",
      "chunk-LK7BO2ET.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4LJLNTXS.js",
      "chunk-2W46CUNI.js",
      "chunk-ZXGZLTPF.js",
      "chunk-WTLH6CNG.js",
      "chunk-4AY747T2.js",
      "chunk-BE6M4QSQ.js",
      "chunk-QW2GHLSC.js",
      "chunk-LK7BO2ET.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-NFLEYFUG.js",
      "chunk-LK7BO2ET.js"
    ],
    "route": "/home"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KQBS3XUY.js",
      "chunk-J5UUDBA6.js",
      "chunk-BE6M4QSQ.js",
      "chunk-QW2GHLSC.js",
      "chunk-LK7BO2ET.js"
    ],
    "route": "/profile"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-H5BKDLZH.js",
      "chunk-2W46CUNI.js",
      "chunk-SXDFAGXD.js",
      "chunk-R2BTQPMO.js",
      "chunk-WTLH6CNG.js",
      "chunk-HFODSLVQ.js",
      "chunk-QW2GHLSC.js",
      "chunk-LK7BO2ET.js"
    ],
    "route": "/admin"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-S3JNVKZH.js",
      "chunk-H52HRFOU.js",
      "chunk-ZXGZLTPF.js",
      "chunk-J5UUDBA6.js",
      "chunk-4AY747T2.js",
      "chunk-BE6M4QSQ.js",
      "chunk-HFODSLVQ.js",
      "chunk-QW2GHLSC.js",
      "chunk-LK7BO2ET.js"
    ],
    "route": "/access-requests/create"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JJV654IJ.js",
      "chunk-3CV6T2DV.js",
      "chunk-SXDFAGXD.js",
      "chunk-R2BTQPMO.js",
      "chunk-WTLH6CNG.js",
      "chunk-4AY747T2.js",
      "chunk-BE6M4QSQ.js",
      "chunk-HFODSLVQ.js",
      "chunk-QW2GHLSC.js",
      "chunk-LK7BO2ET.js"
    ],
    "route": "/access-requests/mine"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CGSRPGCY.js",
      "chunk-H52HRFOU.js",
      "chunk-ZXGZLTPF.js",
      "chunk-3CV6T2DV.js",
      "chunk-R2BTQPMO.js",
      "chunk-4AY747T2.js",
      "chunk-BE6M4QSQ.js",
      "chunk-HFODSLVQ.js",
      "chunk-QW2GHLSC.js",
      "chunk-LK7BO2ET.js"
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
    'index.csr.html': {size: 841, hash: '962021dd0892d6457b1155d1c5e044077c82021bdf66a7378e03b47685cba283', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1381, hash: 'ccdccae43f8f3455ff737d653205717b8ae8aa26d643d74e13f6511e9bfd4b02', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'access-requests/mine/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/access-requests_mine_index_html.mjs').then(m => m.default)},
    'access-requests/create/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/access-requests_create_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 88405, hash: 'dee304dba8ad3f71fc128657ef6665e3df91a7f883f1e790ba42ffac3b99a5b8', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'camunda/tasks/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/camunda_tasks_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 94390, hash: 'e9207078b1fc0dde010ddff1502593a8a1e888b5cfdaa513e461a2bc1dc237d1', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 240, hash: 'db096474d521163c4f5fb7d700305222bcea1012b38583442ad232da75e59192', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)}
  },
};

/**
 * Một số dependency (sockjs-client) gọi `global` như biến tự do; trình duyệt
 * không có binding đó — `angular.json` `define: { global: globalThis }` xử lý
 * lúc build. Dòng dưới chỉ hỗ trợ runtime nếu code gọi `globalThis.global`.
 */
const g = globalThis as typeof globalThis & { global?: typeof globalThis };
if (typeof g.global === 'undefined') {
  g.global = globalThis;
}

"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/remote-storage";
exports.ids = ["vendor-chunks/remote-storage"];
exports.modules = {

/***/ "(ssr)/./node_modules/remote-storage/dist/index.js":
/*!***************************************************!*\
  !*** ./node_modules/remote-storage/dist/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HEADER_REMOTE_STORAGE_INSTANCE_ID: () => (/* binding */ x),\n/* harmony export */   HEADER_REMOTE_STORAGE_USER_ID: () => (/* binding */ u),\n/* harmony export */   RemoteStorage: () => (/* binding */ i)\n/* harmony export */ });\n/* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cross-fetch */ \"(ssr)/./node_modules/cross-fetch/dist/node-ponyfill.js\");\nfunction d(){let n=new Date().getTime(),e=typeof performance<\"u\"&&performance.now&&performance.now()*1e3||0;return\"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx\".replace(/[xy]/g,r=>{let t=Math.random()*16;return n>0?(t=(n+t)%16|0,n=Math.floor(n/16)):(t=(e+t)%16|0,e=Math.floor(e/16)),(r==\"x\"?t:t&7|8).toString(16)})}function a(){return typeof window<\"u\"}var x=\"x-remote-storage-instance-id\",u=\"x-remote-storage-user-id\";var o=\"/entities/\",i=class{constructor(e){let{serverAddress:r,instanceId:t,userId:s}=e??{};this.serverAddress=r??\"https://api.remote.storage\",this.instanceId=t??\"default\",this.userId=s??this.getUserId()}async getItem(e,r){let t=await this.call(\"GET\",`${o}${e}`,r,null);if(t.status===404)return null;let s=await t.text();return!s.startsWith(\"{\")&&!s.startsWith(\"[\")?s===\"true\"?!0:s===\"false\"?!1:isNaN(Number(s))?s:Number(s):JSON.parse(s)}async setItem(e,r,t){await this.call(\"PUT\",`${o}${e}`,t,r)}async removeItem(e,r){await this.call(\"DELETE\",`${o}${e}`,r,null)}async call(e,r,t,s){return cross_fetch__WEBPACK_IMPORTED_MODULE_0__(new URL(r,this.serverAddress).toString(),{method:e,headers:{\"Content-Type\":\"application/json\",[x]:this.instanceId,[u]:this.userId,...t==null?void 0:t.headers},body:s?JSON.stringify(s):void 0})}getUserId(){let e=\"rs-user-id\";if(a()&&window.localStorage.getItem(e))return window.localStorage.getItem(e);let r=d();return a()&&window.localStorage.setItem(e,r),r}};globalThis.RemoteStorage=i;\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVtb3RlLXN0b3JhZ2UvZGlzdC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTJCLGFBQWEsK0ZBQStGLGlFQUFpRSx1QkFBdUIsNkdBQTZHLEVBQUUsYUFBYSx5QkFBeUIsa0VBQWtFLDJCQUEyQixlQUFlLElBQUksc0NBQXNDLE9BQU8sZ0hBQWdILG1CQUFtQiwrQkFBK0IsRUFBRSxFQUFFLEVBQUUsVUFBVSw4QkFBOEIscUJBQXFCLHNCQUFzQiwrRkFBK0YscUJBQXFCLHlCQUF5QixFQUFFLEVBQUUsRUFBRSxPQUFPLHNCQUFzQiw0QkFBNEIsRUFBRSxFQUFFLEVBQUUsVUFBVSxvQkFBb0IsT0FBTyx3Q0FBQywyQ0FBMkMsa0JBQWtCLGtHQUFrRyxpQ0FBaUMsRUFBRSxZQUFZLG1CQUFtQiw2RUFBNkUsVUFBVSxpREFBaUQsMkJBQWdJO0FBQzcrQyIsInNvdXJjZXMiOlsiL2hvbWUvcHJvamVjdC9ub2RlX21vZHVsZXMvcmVtb3RlLXN0b3JhZ2UvZGlzdC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbCBmcm9tXCJjcm9zcy1mZXRjaFwiO2Z1bmN0aW9uIGQoKXtsZXQgbj1uZXcgRGF0ZSgpLmdldFRpbWUoKSxlPXR5cGVvZiBwZXJmb3JtYW5jZTxcInVcIiYmcGVyZm9ybWFuY2Uubm93JiZwZXJmb3JtYW5jZS5ub3coKSoxZTN8fDA7cmV0dXJuXCJ4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHhcIi5yZXBsYWNlKC9beHldL2cscj0+e2xldCB0PU1hdGgucmFuZG9tKCkqMTY7cmV0dXJuIG4+MD8odD0obit0KSUxNnwwLG49TWF0aC5mbG9vcihuLzE2KSk6KHQ9KGUrdCklMTZ8MCxlPU1hdGguZmxvb3IoZS8xNikpLChyPT1cInhcIj90OnQmN3w4KS50b1N0cmluZygxNil9KX1mdW5jdGlvbiBhKCl7cmV0dXJuIHR5cGVvZiB3aW5kb3c8XCJ1XCJ9dmFyIHg9XCJ4LXJlbW90ZS1zdG9yYWdlLWluc3RhbmNlLWlkXCIsdT1cIngtcmVtb3RlLXN0b3JhZ2UtdXNlci1pZFwiO3ZhciBvPVwiL2VudGl0aWVzL1wiLGk9Y2xhc3N7Y29uc3RydWN0b3IoZSl7bGV0e3NlcnZlckFkZHJlc3M6cixpbnN0YW5jZUlkOnQsdXNlcklkOnN9PWU/P3t9O3RoaXMuc2VydmVyQWRkcmVzcz1yPz9cImh0dHBzOi8vYXBpLnJlbW90ZS5zdG9yYWdlXCIsdGhpcy5pbnN0YW5jZUlkPXQ/P1wiZGVmYXVsdFwiLHRoaXMudXNlcklkPXM/P3RoaXMuZ2V0VXNlcklkKCl9YXN5bmMgZ2V0SXRlbShlLHIpe2xldCB0PWF3YWl0IHRoaXMuY2FsbChcIkdFVFwiLGAke299JHtlfWAscixudWxsKTtpZih0LnN0YXR1cz09PTQwNClyZXR1cm4gbnVsbDtsZXQgcz1hd2FpdCB0LnRleHQoKTtyZXR1cm4hcy5zdGFydHNXaXRoKFwie1wiKSYmIXMuc3RhcnRzV2l0aChcIltcIik/cz09PVwidHJ1ZVwiPyEwOnM9PT1cImZhbHNlXCI/ITE6aXNOYU4oTnVtYmVyKHMpKT9zOk51bWJlcihzKTpKU09OLnBhcnNlKHMpfWFzeW5jIHNldEl0ZW0oZSxyLHQpe2F3YWl0IHRoaXMuY2FsbChcIlBVVFwiLGAke299JHtlfWAsdCxyKX1hc3luYyByZW1vdmVJdGVtKGUscil7YXdhaXQgdGhpcy5jYWxsKFwiREVMRVRFXCIsYCR7b30ke2V9YCxyLG51bGwpfWFzeW5jIGNhbGwoZSxyLHQscyl7cmV0dXJuIGwobmV3IFVSTChyLHRoaXMuc2VydmVyQWRkcmVzcykudG9TdHJpbmcoKSx7bWV0aG9kOmUsaGVhZGVyczp7XCJDb250ZW50LVR5cGVcIjpcImFwcGxpY2F0aW9uL2pzb25cIixbeF06dGhpcy5pbnN0YW5jZUlkLFt1XTp0aGlzLnVzZXJJZCwuLi50PT1udWxsP3ZvaWQgMDp0LmhlYWRlcnN9LGJvZHk6cz9KU09OLnN0cmluZ2lmeShzKTp2b2lkIDB9KX1nZXRVc2VySWQoKXtsZXQgZT1cInJzLXVzZXItaWRcIjtpZihhKCkmJndpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShlKSlyZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGUpO2xldCByPWQoKTtyZXR1cm4gYSgpJiZ3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oZSxyKSxyfX07Z2xvYmFsVGhpcy5SZW1vdGVTdG9yYWdlPWk7ZXhwb3J0e3ggYXMgSEVBREVSX1JFTU9URV9TVE9SQUdFX0lOU1RBTkNFX0lELHUgYXMgSEVBREVSX1JFTU9URV9TVE9SQUdFX1VTRVJfSUQsaSBhcyBSZW1vdGVTdG9yYWdlfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/remote-storage/dist/index.js\n");

/***/ })

};
;
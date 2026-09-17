import{g as x}from"./_commonjsHelpers-CqkleIqs.js";function _(o,t){for(var e=0;e<t.length;e++){const r=t[e];if(typeof r!="string"&&!Array.isArray(r)){for(const s in r)if(s!=="default"&&!(s in o)){const a=Object.getOwnPropertyDescriptor(r,s);a&&Object.defineProperty(o,s,a.get?a:{enumerable:!0,get:()=>r[s]})}}}return Object.freeze(Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}))}var u={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d=Symbol.for("react.transitional.element"),c=Symbol.for("react.fragment");function f(o,t,e){var r=null;if(e!==void 0&&(r=""+e),t.key!==void 0&&(r=""+t.key),"key"in t){e={};for(var s in t)s!=="key"&&(e[s]=t[s])}else e=t;return t=e.ref,{$$typeof:d,type:o,key:r,ref:t!==void 0?t:null,props:e}}n.Fragment=c;n.jsx=f;n.jsxs=f;u.exports=n;var i=u.exports;const p=x(i),j=_({__proto__:null,default:p},[i]),l=p??j,v=l.Fragment,E=l.jsx,P=l.jsxs;export{v as Fragment,l as default,E as jsx,P as jsxs};

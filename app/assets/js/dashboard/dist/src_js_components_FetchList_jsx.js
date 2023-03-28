"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkwebpack"] = self["webpackChunkwebpack"] || []).push([["src_js_components_FetchList_jsx"],{

/***/ "./src/js/components/FetchList.jsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = \"function\" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || \"@@iterator\", asyncIteratorSymbol = $Symbol.asyncIterator || \"@@asyncIterator\", toStringTagSymbol = $Symbol.toStringTag || \"@@toStringTag\"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, \"\"); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, \"_invoke\", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: \"normal\", arg: fn.call(obj, arg) }; } catch (err) { return { type: \"throw\", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { [\"next\", \"throw\", \"return\"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if (\"throw\" !== record.type) { var result = record.arg, value = result.value; return value && \"object\" == _typeof(value) && hasOwn.call(value, \"__await\") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke(\"next\", value, resolve, reject); }, function (err) { invoke(\"throw\", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke(\"throw\", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, \"_invoke\", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = \"suspendedStart\"; return function (method, arg) { if (\"executing\" === state) throw new Error(\"Generator is already running\"); if (\"completed\" === state) { if (\"throw\" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if (\"next\" === context.method) context.sent = context._sent = context.arg;else if (\"throw\" === context.method) { if (\"suspendedStart\" === state) throw state = \"completed\", context.arg; context.dispatchException(context.arg); } else \"return\" === context.method && context.abrupt(\"return\", context.arg); state = \"executing\"; var record = tryCatch(innerFn, self, context); if (\"normal\" === record.type) { if (state = context.done ? \"completed\" : \"suspendedYield\", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } \"throw\" === record.type && (state = \"completed\", context.method = \"throw\", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, \"throw\" === methodName && delegate.iterator[\"return\"] && (context.method = \"return\", context.arg = undefined, maybeInvokeDelegate(delegate, context), \"throw\" === context.method) || \"return\" !== methodName && (context.method = \"throw\", context.arg = new TypeError(\"The iterator does not provide a '\" + methodName + \"' method\")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if (\"throw\" === record.type) return context.method = \"throw\", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, \"return\" !== context.method && (context.method = \"next\", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = \"throw\", context.arg = new TypeError(\"iterator result is not an object\"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = \"normal\", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: \"root\" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if (\"function\" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, \"GeneratorFunction\"), exports.isGeneratorFunction = function (genFun) { var ctor = \"function\" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || \"GeneratorFunction\" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, \"GeneratorFunction\")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, \"Generator\"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, \"toString\", function () { return \"[object Generator]\"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { \"t\" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if (\"throw\" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = \"throw\", record.arg = exception, context.next = loc, caught && (context.method = \"next\", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if (\"root\" === entry.tryLoc) return handle(\"end\"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, \"catchLoc\"), hasFinally = hasOwn.call(entry, \"finallyLoc\"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error(\"try statement without catch or finally\"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, \"finallyLoc\") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && (\"break\" === type || \"continue\" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = \"next\", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if (\"throw\" === record.type) throw record.arg; return \"break\" === record.type || \"continue\" === record.type ? this.next = record.arg : \"return\" === record.type ? (this.rval = this.arg = record.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, \"catch\": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if (\"throw\" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, \"next\" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\nfunction _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : \"undefined\" != typeof Symbol && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i[\"return\"] && (_r = _i[\"return\"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar FetchList = function FetchList(props) {\n  var list = props.list,\n    _props$Item = props.Item,\n    Item = _props$Item === void 0 ? function () {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);\n    } : _props$Item,\n    _props$Empty = props.Empty,\n    Empty = _props$Empty === void 0 ? function () {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);\n    } : _props$Empty,\n    _props$Fallback = props.Fallback,\n    Fallback = _props$Fallback === void 0 ? function () {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);\n    } : _props$Fallback;\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),\n    _React$useState2 = _slicedToArray(_React$useState, 2),\n    pending = _React$useState2[0],\n    setPending = _React$useState2[1];\n  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState([]),\n    _React$useState4 = _slicedToArray(_React$useState3, 2),\n    outList = _React$useState4[0],\n    setOutList = _React$useState4[1];\n  var beforeGet = function beforeGet() {\n    setPending(true);\n  };\n  var afterGet = function afterGet() {\n    setPending(false);\n  };\n  var getList = /*#__PURE__*/function () {\n    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(list) {\n      var out;\n      return _regeneratorRuntime().wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              beforeGet();\n              out = typeof list === \"function\" ? list() : list;\n              if (!(out instanceof Promise)) {\n                _context.next = 8;\n                break;\n              }\n              _context.next = 5;\n              return out;\n            case 5:\n              _context.t0 = _context.sent;\n              _context.next = 9;\n              break;\n            case 8:\n              _context.t0 = out;\n            case 9:\n              out = _context.t0;\n              out = out instanceof Array ? out : [];\n              afterGet();\n              setOutList(out);\n              return _context.abrupt(\"return\", out);\n            case 14:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n    return function getList(_x2) {\n      return _ref.apply(this, arguments);\n    };\n  }();\n\n  // var outList = React.useMemo(() => getList(list), [list]);\n  // outList = outList instanceof Promise ? outList.PromiseResult : outList;\n\n  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {\n    getList(list);\n  }, []);\n  if (pending) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Fallback, null);\n  }\n  if (!(outList !== null && outList !== void 0 && outList.length)) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Empty, null);\n  }\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, outList === null || outList === void 0 ? void 0 : outList.map(function (item) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Item, _extends({\n      key: item.id\n    }, item));\n  }));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FetchList);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvY29tcG9uZW50cy9GZXRjaExpc3QuanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OytDQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUQwQjtBQUUxQixJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBUyxDQUFJQyxLQUFLLEVBQUs7RUFDM0IsSUFDRUMsSUFBSSxHQUlGRCxLQUFLLENBSlBDLElBQUk7SUFBQSxjQUlGRCxLQUFLLENBSFBFLElBQUk7SUFBSkEsSUFBSSw0QkFBRztNQUFBLG9CQUFNLHlIQUFLO0lBQUE7SUFBQSxlQUdoQkYsS0FBSyxDQUZQRyxLQUFLO0lBQUxBLEtBQUssNkJBQUc7TUFBQSxvQkFBTSx5SEFBSztJQUFBO0lBQUEsa0JBRWpCSCxLQUFLLENBRFBJLFFBQVE7SUFBUkEsUUFBUSxnQ0FBRztNQUFBLG9CQUFNLHlIQUFLO0lBQUE7RUFHeEIsc0JBQThCTixxREFBYyxDQUFDLEtBQUssQ0FBQztJQUFBO0lBQTVDUSxPQUFPO0lBQUVDLFVBQVU7RUFDMUIsdUJBQThCVCxxREFBYyxDQUFDLEVBQUUsQ0FBQztJQUFBO0lBQXpDVSxPQUFPO0lBQUVDLFVBQVU7RUFFMUIsSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVMsR0FBUztJQUN0QkgsVUFBVSxDQUFDLElBQUksQ0FBQztFQUNsQixDQUFDO0VBQ0QsSUFBTUksUUFBUSxHQUFHLFNBQVhBLFFBQVEsR0FBUztJQUNyQkosVUFBVSxDQUFDLEtBQUssQ0FBQztFQUNuQixDQUFDO0VBRUQsSUFBTUssT0FBTztJQUFBLHNFQUFHLGlCQUFPWCxJQUFJO01BQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtjQUN6QlMsU0FBUyxFQUFFO2NBRVBHLEdBQUcsR0FBRyxPQUFPWixJQUFJLEtBQUssVUFBVSxHQUFHQSxJQUFJLEVBQUUsR0FBR0EsSUFBSTtjQUFBLE1BQzlDWSxHQUFHLFlBQVlDLE9BQU87Z0JBQUE7Z0JBQUE7Y0FBQTtjQUFBO2NBQUEsT0FBU0QsR0FBRztZQUFBO2NBQUE7Y0FBQTtjQUFBO1lBQUE7Y0FBQSxjQUFHQSxHQUFHO1lBQUE7Y0FBOUNBLEdBQUc7Y0FDSEEsR0FBRyxHQUFHQSxHQUFHLFlBQVlFLEtBQUssR0FBR0YsR0FBRyxHQUFHLEVBQUU7Y0FFckNGLFFBQVEsRUFBRTtjQUNWRixVQUFVLENBQUNJLEdBQUcsQ0FBQztjQUFDLGlDQUNUQSxHQUFHO1lBQUE7WUFBQTtjQUFBO1VBQUE7UUFBQTtNQUFBO0lBQUEsQ0FDWDtJQUFBLGdCQVZLRCxPQUFPO01BQUE7SUFBQTtFQUFBLEdBVVo7O0VBRUQ7RUFDQTs7RUFFQWQsc0RBQWUsQ0FBQyxZQUFNO0lBQ3BCYyxPQUFPLENBQUNYLElBQUksQ0FBQztFQUNmLENBQUMsRUFBRSxFQUFFLENBQUM7RUFFTixJQUFJSyxPQUFPLEVBQUU7SUFDWCxvQkFBTywyREFBQyxRQUFRLE9BQUc7RUFDckI7RUFFQSxJQUFJLEVBQUNFLE9BQU8sYUFBUEEsT0FBTyxlQUFQQSxPQUFPLENBQUVTLE1BQU0sR0FBRTtJQUNwQixvQkFBTywyREFBQyxLQUFLLE9BQUc7RUFDbEI7RUFFQSxvQkFDRSwwSEFDR1QsT0FBTyxhQUFQQSxPQUFPLHVCQUFQQSxPQUFPLENBQUVVLEdBQUcsQ0FBQyxVQUFDQyxJQUFJO0lBQUEsb0JBQ2pCLDJEQUFDLElBQUk7TUFBQyxHQUFHLEVBQUVBLElBQUksQ0FBQ0M7SUFBRyxHQUFLRCxJQUFJLEVBQUk7RUFBQSxDQUNqQyxDQUFDLENBQ0Q7QUFFUCxDQUFDO0FBRUQsaUVBQWVwQixTQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay8uL3NyYy9qcy9jb21wb25lbnRzL0ZldGNoTGlzdC5qc3g/MzVmYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5jb25zdCBGZXRjaExpc3QgPSAocHJvcHMpID0+IHtcclxuICBjb25zdCB7XHJcbiAgICBsaXN0LFxyXG4gICAgSXRlbSA9ICgpID0+IDw+PC8+LFxyXG4gICAgRW1wdHkgPSAoKSA9PiA8PjwvPixcclxuICAgIEZhbGxiYWNrID0gKCkgPT4gPD48Lz4sXHJcbiAgfSA9IHByb3BzO1xyXG5cclxuICBjb25zdCBbcGVuZGluZywgc2V0UGVuZGluZ10gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW291dExpc3QsIHNldE91dExpc3RdID0gUmVhY3QudXNlU3RhdGUoW10pO1xyXG5cclxuICBjb25zdCBiZWZvcmVHZXQgPSAoKSA9PiB7XHJcbiAgICBzZXRQZW5kaW5nKHRydWUpO1xyXG4gIH07XHJcbiAgY29uc3QgYWZ0ZXJHZXQgPSAoKSA9PiB7XHJcbiAgICBzZXRQZW5kaW5nKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBnZXRMaXN0ID0gYXN5bmMgKGxpc3QpID0+IHtcclxuICAgIGJlZm9yZUdldCgpO1xyXG5cclxuICAgIGxldCBvdXQgPSB0eXBlb2YgbGlzdCA9PT0gXCJmdW5jdGlvblwiID8gbGlzdCgpIDogbGlzdDtcclxuICAgIG91dCA9IG91dCBpbnN0YW5jZW9mIFByb21pc2UgPyBhd2FpdCBvdXQgOiBvdXQ7XHJcbiAgICBvdXQgPSBvdXQgaW5zdGFuY2VvZiBBcnJheSA/IG91dCA6IFtdO1xyXG5cclxuICAgIGFmdGVyR2V0KCk7XHJcbiAgICBzZXRPdXRMaXN0KG91dCk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG4gIH07XHJcblxyXG4gIC8vIHZhciBvdXRMaXN0ID0gUmVhY3QudXNlTWVtbygoKSA9PiBnZXRMaXN0KGxpc3QpLCBbbGlzdF0pO1xyXG4gIC8vIG91dExpc3QgPSBvdXRMaXN0IGluc3RhbmNlb2YgUHJvbWlzZSA/IG91dExpc3QuUHJvbWlzZVJlc3VsdCA6IG91dExpc3Q7XHJcblxyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBnZXRMaXN0KGxpc3QpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgaWYgKHBlbmRpbmcpIHtcclxuICAgIHJldHVybiA8RmFsbGJhY2sgLz47XHJcbiAgfVxyXG5cclxuICBpZiAoIW91dExpc3Q/Lmxlbmd0aCkge1xyXG4gICAgcmV0dXJuIDxFbXB0eSAvPjtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICB7b3V0TGlzdD8ubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgPEl0ZW0ga2V5PXtpdGVtLmlkfSB7Li4uaXRlbX0gLz5cclxuICAgICAgKSl9XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmV0Y2hMaXN0O1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJGZXRjaExpc3QiLCJwcm9wcyIsImxpc3QiLCJJdGVtIiwiRW1wdHkiLCJGYWxsYmFjayIsInVzZVN0YXRlIiwicGVuZGluZyIsInNldFBlbmRpbmciLCJvdXRMaXN0Iiwic2V0T3V0TGlzdCIsImJlZm9yZUdldCIsImFmdGVyR2V0IiwiZ2V0TGlzdCIsIm91dCIsIlByb21pc2UiLCJBcnJheSIsInVzZUVmZmVjdCIsImxlbmd0aCIsIm1hcCIsIml0ZW0iLCJpZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/components/FetchList.jsx\n");

/***/ })

}]);
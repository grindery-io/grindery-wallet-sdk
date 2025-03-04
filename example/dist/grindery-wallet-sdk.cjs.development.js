'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _construct(t, e, r) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeFunction(fn) {
  try {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  } catch (e) {
    return typeof fn === "function";
  }
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}

/**
 * @summary Provider events
 * @since 0.2.0
 * @link https://eips.ethereum.org/EIPS/eip-1193#provider-events
 * @enum {string}
 */
var ProviderEvents;
(function (ProviderEvents) {
  ProviderEvents["accountsChanged"] = "accountsChanged";
  ProviderEvents["pair"] = "pair";
  ProviderEvents["connect"] = "connect";
  ProviderEvents["disconnect"] = "disconnect";
  ProviderEvents["chainChanged"] = "chainChanged";
  ProviderEvents["message"] = "message";
})(ProviderEvents || (ProviderEvents = {}));
/**
 * @summary A class for emitting provider events
 * @since 0.2.0
 */
var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    /**
     * @summary A map of events and their listeners
     * @private
     */
    this.events = void 0;
    this.events = new Map();
  }
  var _proto = EventEmitter.prototype;
  /**
   * @summary Adds a listener to the event
   * @public
   * @param {string} event Event name
   * @param {Function} callback Callback function
   * @returns {EventEmitter} The instance of the class itself
   */
  _proto.on = function on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    return this;
  }
  /**
   * @summary Removes a listener from the event
   * @public
   * @param {string} event Event name
   * @param {Function} callback Callback function
   * @returns {EventEmitter} The instance of the class itself
   */;
  _proto.removeListener = function removeListener(event, callback) {
    if (this.events.has(event)) {
      var callbacks = this.events.get(event).filter(function (cb) {
        return cb !== callback;
      });
      this.events.set(event, callbacks);
    }
    return this;
  }
  /**
   * @summary Emits an event
   * @public
   * @param {string} event Event name
   * @param data Event data
   * @returns {EventEmitter} The instance of the class itself
   */;
  _proto.emit = function emit(event) {
    for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }
    if (this.events.has(event)) {
      console.log('[Grindery.WalletSDK] > Event:', event, data[0]);
      this.events.get(event).forEach(function (callback) {
        callback.apply(void 0, data);
      });
    }
    return this;
  };
  return EventEmitter;
}();

/**
 * @summary Generates a Version 4 (pseudorandom) UUID
 * @returns {string} The UUID
 */
var uuid = function uuid() {
  var d = '';
  while (d.length < 32) d += Math.random().toString(16).substr(2);
  var vr = (parseInt(d.substr(16, 1), 16) & 0x3 | 0x8).toString(16);
  return d.substr(0, 8) + "-" + d.substr(8, 4) + "-4" + d.substr(13, 3) + "-" + vr + d.substr(17, 3) + "-" + d.substr(20, 12);
};

var providerInfo = {
  uuid: /*#__PURE__*/uuid(),
  name: 'Grindery Wallet',
  rdns: 'com.grindery.wallet',
  icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiByeD0iNDgiIGZpbGw9IiMwQjBEMTciLz4KPHBhdGggZD0iTTUyLjcwOTMgNTQuNjI5NUw0My40MDAzIDYwLjU2MTdDNDEuOTkwMiA2MS40NjAzIDQxLjU4OTQgNjMuMzEwNSA0Mi41MDUxIDY0LjY5NDJDNDMuNDA5NyA2Ni4wNjExIDQ1LjI2MDYgNjYuNDYxNSA0Ni42NjQ4IDY1LjYwNDhMNTIuNDQ4MiA2MS43MjY5TDU3LjU1NjggNTguMjk1MUM1Ny42MzgyIDU4LjI0MTkgNTcuNzE5MyA1OC4xODk2IDU3LjgwMDMgNTguMTM4NEw1OC4wNTgxIDU3Ljk2NTVDNTguMjA1MyA1Ny44NjY4IDU4LjM1NzggNTcuNzgxMyA1OC41MTQxIDU3LjcwODlDNTguNjQwNiA1Ny42MzY5IDU4Ljc2NjYgNTcuNTY3MyA1OC44OTIxIDU3LjUwMDFDNjEuOTUwMSA1NS44NjQ0IDY1Ljc4MDQgNTYuOTcwOSA2Ny40NDczIDU5Ljk3MTdDNjguOTA3NSA2Mi42MDAzIDY4LjI0MDggNjUuODc3NiA2NS44NjQgNjcuNzU0NUM2Ni4yMzc2IDY2Ljg3NDggNjYuMTc2OCA2NS44MzUyIDY1LjYwNzkgNjQuOTc1NUM2NC43MDMzIDYzLjYwODYgNjIuODUyNCA2My4yMDgzIDYxLjQ0ODIgNjQuMDY1TDU1LjY2NDggNjcuOTQyOEw1MC41NTYyIDcxLjM3NDdDNTAuNTA3OSA3MS40MDU1IDUwLjQ1OTQgNzEuNDM1OCA1MC40MTA3IDcxLjQ2NTdMNTAuMDU1IDcxLjcwNDJDNDkuNzU1OCA3MS45MDQ5IDQ5LjQzNDkgNzIuMDUwNiA0OS4xMDQ3IDcyLjE0MzhDNDQuNjU3MyA3NC4wNTkyIDM5LjMyMzggNzIuNTg5NCAzNi41OTI0IDY4LjQ2MjFDMzMuNzUxNiA2NC4xNjk2IDM0LjczMTcgNTguNTIzNCAzOC42OTg2IDU1LjM3MzZDMzYuODE0IDU0LjY1NzkgMzUuMDI3NSA1My41OTk1IDMzLjQzNjEgNTIuMTkzNEMyNi40MzA0IDQ2LjAwMzYgMjUuODU3NyAzNS40MjA1IDMyLjE1NjkgMjguNTU1NEMzOC40NTYyIDIxLjY5MDQgNDkuMjQxOSAyMS4xNDMxIDU2LjI0NzYgMjcuMzMyOUM2My4yNTMzIDMzLjUyMjggNjMuODI2IDQ0LjEwNTkgNTcuNTI2NyA1MC45NzA5QzU2LjExNTIgNTIuNTA5MyA1NC40Nzg0IDUzLjczMDQgNTIuNzA5MyA1NC42Mjk1Wk01MS44MDcgNDYuMDUxNkM1NS40MjMgNDIuMDgyMyA1NS4wOTQzIDM1Ljk2MzEgNTEuMDcyNyAzMi4zODQxQzQ3LjA1MTEgMjguODA1MiA0MC44NTk1IDI5LjEyMTYgMzcuMjQzNSAzMy4wOTFDMzMuNjI3NCAzNy4wNjA0IDMzLjk1NjIgNDMuMTc5NSAzNy45Nzc4IDQ2Ljc1ODVDNDEuOTk5NCA1MC4zMzc1IDQ4LjE5MDkgNTAuMDIxIDUxLjgwNyA0Ni4wNTE2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=='
};

/**
 * @summary Error class for wallet Provider
 * @since 0.1.0
 * @extends Error
 */
var ProviderError = /*#__PURE__*/function (_Error) {
  function ProviderError(message, code, data) {
    var _this;
    _this = _Error.call(this, message) || this;
    _this.name = 'GrinderyWalletProviderError';
    _this.code = void 0;
    _this.data = void 0;
    _this.code = code;
    _this.data = data;
    return _this;
  }
  _inheritsLoose(ProviderError, _Error);
  return ProviderError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var ProviderErrors = {
  PairingFailed: /*#__PURE__*/new ProviderError('Pairing failed', 4900),
  Disconnected: /*#__PURE__*/new ProviderError('Disconnected', 4900),
  UnsupportedMethod: /*#__PURE__*/new ProviderError('Unsupported Method', 4200),
  Unauthorized: /*#__PURE__*/new ProviderError('Unauthorized', 4100),
  NoResult: /*#__PURE__*/new ProviderError('No result', 4900),
  NoAppId: /*#__PURE__*/new ProviderError('App ID is required', 4900),
  UserRejected: /*#__PURE__*/new ProviderError('User Rejected Request', 4001),
  ChainDisconnected: /*#__PURE__*/new ProviderError('Chain Disconnected', 4901)
};
var newProviderError = function newProviderError(error) {
  var errorResponse;
  if (error instanceof ProviderError) {
    errorResponse = new ProviderError(error.message || 'Unknown error', error.code || 4900, error.data);
  } else if (error instanceof Error) {
    errorResponse = new ProviderError(error.message || 'Unknown error', 4900, error);
  } else {
    errorResponse = new ProviderError('Unknown error', 4900, error);
  }
  return errorResponse;
};

/**
 * Supported chains list
 *
 * @description Currently supports the following chains: Polygon, BNB Smart Chain, and opBNB Smart Chain
 *
 * @since 0.3.0
 * @type {string[]} Chain ids in CAIP-2 format
 */
var CHAINS = ['eip155:137', 'eip155:56', 'eip155:204'];
var hexChainId = function hexChainId(chainId) {
  return "0x" + parseInt(chainId.split(':')[1], 10).toString(16);
};
var unhexChainId = function unhexChainId(hexChainId) {
  return "eip155:" + parseInt(hexChainId, 16);
};

var LOCALSTORAGE_KEY = 'GrinderyWalletProvider';
/**
 * @summary SdkStorage keys
 * @since 0.2.0
 */
var SdkStorageKeys;
(function (SdkStorageKeys) {
  SdkStorageKeys["pairingToken"] = "pairingToken";
  SdkStorageKeys["sessionId"] = "sessionId";
  SdkStorageKeys["connectUrl"] = "connectUrl";
  SdkStorageKeys["connectUrlBrowser"] = "connectUrlBrowser";
  SdkStorageKeys["shortToken"] = "shortToken";
  SdkStorageKeys["clientId"] = "clientId";
  SdkStorageKeys["address"] = "address";
  SdkStorageKeys["chainId"] = "chainId";
})(SdkStorageKeys || (SdkStorageKeys = {}));
/**
 * @summary A class to handle local storage
 * @since 0.2.0
 */
var SdkStorage = /*#__PURE__*/function () {
  function SdkStorage() {}
  var _proto = SdkStorage.prototype;
  /**
   * @summary Gets the value of the storage by the key
   * @public
   * @param {SdkStorageKey} key Provider storage key
   * @returns {string} The value of the storage by the key
   */
  _proto.getValue = function getValue(key) {
    var value = this.getSnapshot()[key] || '';
    return value;
  }
  /**
   * @summary Sets the value of the storage by the key
   * @public
   * @param {SdkStorageKey} key Provider storage key
   * @param {string} value The value to set
   * @returns {void}
   */;
  _proto.setValue = function setValue(key, value) {
    var snapshot = this.getSnapshot();
    snapshot[key] = value;
    this.saveSnapshot(snapshot);
    return value;
  }
  /**
   * @summary Clears the storage
   * @public
   * @returns {void}
   */;
  _proto.clear = function clear() {
    this.saveSnapshot({
      clientId: this.getSnapshot().clientId || uuid(),
      chainId: this.getSnapshot().chainId || CHAINS[0]
    });
  }
  /**
   * @summary Gets the storage
   * @since 0.2.0
   * @returns {SdkStorageSnapshot} The storage snapshot object
   */;
  _proto.getSnapshot = function getSnapshot() {
    try {
      return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '{}');
    } catch (error) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({}));
      throw new Error('Error parsing storage');
    }
  }
  /**
   * @summary Saves the storage
   * @since 0.2.0
   * @param {SdkStorageSnapshot} storage SdkStorage snapshot object
   */;
  _proto.saveSnapshot = function saveSnapshot(storage) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storage));
  };
  return SdkStorage;
}();

/**
 * @summary The Grindery RPC API method names
 * @updated 0.7.0 Added `requestPairingByUserId` and `requestPairingByTelegramLogin` methods
 */
var RpcMethodNames;
(function (RpcMethodNames) {
  RpcMethodNames["requestPairing"] = "requestPairing";
  RpcMethodNames["waitForPairingResult"] = "waitForPairingResult";
  RpcMethodNames["request"] = "request";
  RpcMethodNames["waitForRequestResult"] = "waitForRequestResult";
  RpcMethodNames["disconnect"] = "disconnect";
  RpcMethodNames["getUserWalletAddress"] = "getUserWalletAddress";
  RpcMethodNames["trackClientEvent"] = "trackClientEvent";
  /**
   * Server side method
   * @since 0.7.0
   */
  RpcMethodNames["requestPairingByUserId"] = "requestPairingByUserId";
  /**
   * Server side method
   * @since 0.7.0
   */
  RpcMethodNames["requestPairingByTelegramLogin"] = "requestPairingByTelegramLogin";
})(RpcMethodNames || (RpcMethodNames = {}));
/**
 * @summary The Grindery RPC API wrapper class
 * @since 0.2.0
 */
var Rpc = /*#__PURE__*/function () {
  function Rpc(config) {
    this.config = void 0;
    this.config = config;
  }
  /**
   * @summary Sends a provider request to the Grindery RPC API and waits for the result.
   * @public
   * @param {RpcMethodNames} method Provider request method name
   * @param {Array} params Provider request parameters
   * @param {number} timeout Optional. The time in milliseconds to wait for the request result. Default is 30000.
   * @returns The result of the provider request
   */
  var _proto = Rpc.prototype;
  _proto.sendAndWaitRpcRequest =
  /*#__PURE__*/
  function () {
    var _sendAndWaitRpcRequest = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(method, params, timeout) {
      var request;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.sendRpcRequest(method, params);
          case 2:
            request = _context.sent;
            _context.next = 5;
            return this.waitRpcRequest(request.requestToken, timeout);
          case 5:
            return _context.abrupt("return", _context.sent);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function sendAndWaitRpcRequest(_x, _x2, _x3) {
      return _sendAndWaitRpcRequest.apply(this, arguments);
    }
    return sendAndWaitRpcRequest;
  }()
  /**
   * @summary Sends a provider request to the Grindery RPC API.
   * @protected
   * @param {RpcMethodNames} method Provider request method name
   * @param {Array} params Provider request parameters
   * @returns {RpcRequestResults.request} Promise resolving with the request token to use in the `waitGrinderyRpcProviderRequest` method
   */
  ;
  _proto.sendRpcRequest =
  /*#__PURE__*/
  function () {
    var _sendRpcRequest = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(method, params) {
      var storage;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            storage = new SdkStorage();
            _context2.next = 3;
            return this.sendRpcApiRequest(RpcMethodNames.request, {
              sessionId: storage.getValue(SdkStorageKeys.sessionId),
              scope: storage.getValue(SdkStorageKeys.chainId),
              request: {
                method: method,
                params: params
              }
            });
          case 3:
            return _context2.abrupt("return", _context2.sent);
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function sendRpcRequest(_x4, _x5) {
      return _sendRpcRequest.apply(this, arguments);
    }
    return sendRpcRequest;
  }()
  /**
   * @summary Waits for the result of the provider request.
   * @protected
   * @param {string} requestToken A token to identify provider request. Recieved in the results of `sendGrinderyRpcProviderRequest` method.
   * @param {number} timeout Optional. The time in milliseconds to wait for the request result. Default is 30000.
   * @returns The result of the provider request
   */
  ;
  _proto.waitRpcRequest =
  /*#__PURE__*/
  function () {
    var _waitRpcRequest = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(requestToken, timeout) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return this.sendRpcApiRequest(RpcMethodNames.waitForRequestResult, {
              requestToken: requestToken,
              timeout: timeout
            });
          case 2:
            return _context3.abrupt("return", _context3.sent);
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }));
    function waitRpcRequest(_x6, _x7) {
      return _waitRpcRequest.apply(this, arguments);
    }
    return waitRpcRequest;
  }()
  /**
   * @summary Sends a request to the Grindery Walletconnect RPC API.
   * @public
   * @param {RpcMethodNames} method Request method name
   * @param {RequestArgumentsParams} params Request parameters
   * @returns {T} The result of the request
   */
  ;
  _proto.sendRpcApiRequest =
  /*#__PURE__*/
  function () {
    var _sendRpcApiRequest = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(method, params) {
      var response, data;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return fetch(this.config.pairingApiUrl || 'https://walletconnect-api.grindery.com', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: "gws_" + method,
                params: params || []
              })
            });
          case 3:
            response = _context4.sent;
            _context4.next = 6;
            return response.json();
          case 6:
            data = _context4.sent;
            if (!data.error) {
              _context4.next = 9;
              break;
            }
            throw new ProviderError(data.error.message, data.error.code);
          case 9:
            if (data.result) {
              _context4.next = 11;
              break;
            }
            throw ProviderErrors.NoResult;
          case 11:
            return _context4.abrupt("return", data.result);
          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](0);
            if (!(_context4.t0 instanceof Error)) {
              _context4.next = 18;
              break;
            }
            throw new ProviderError(_context4.t0.message, 500, _context4.t0);
          case 18:
            throw new ProviderError('Server error', 500, _context4.t0);
          case 19:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this, [[0, 14]]);
    }));
    function sendRpcApiRequest(_x8, _x9) {
      return _sendRpcApiRequest.apply(this, arguments);
    }
    return sendRpcApiRequest;
  }();
  return Rpc;
}();

/**
 * @summary The Grindery wallet provider method names
 * @since 0.2.0
 * @since 0.3.0 Added `eth_chainId`, `wallet_addEthereumChain` and `wallet_switchEthereumChain` methods
 */
var ProviderMethodNames;
(function (ProviderMethodNames) {
  ProviderMethodNames["eth_requestAccounts"] = "eth_requestAccounts";
  ProviderMethodNames["eth_accounts"] = "eth_accounts";
  ProviderMethodNames["personal_sign"] = "personal_sign";
  ProviderMethodNames["eth_sendTransaction"] = "eth_sendTransaction";
  ProviderMethodNames["gws_disconnect"] = "gws_disconnect";
  ProviderMethodNames["eth_chainId"] = "eth_chainId";
  ProviderMethodNames["wallet_addEthereumChain"] = "wallet_addEthereumChain";
  ProviderMethodNames["wallet_switchEthereumChain"] = "wallet_switchEthereumChain";
})(ProviderMethodNames || (ProviderMethodNames = {}));
/**
 * @summary The base wallet provider class
 * @since 0.2.0
 * @extends EventEmitter
 */
var Provider = /*#__PURE__*/function (_EventEmitter) {
  function Provider(config) {
    var _this$methods, _this$config5;
    var _this;
    _this = _EventEmitter.call(this) || this;
    _this.isGrinderyWallet = true;
    _this.config = void 0;
    _this.storage = new SdkStorage();
    _this.rpc = void 0;
    /**
     * @summary Switches the chain
     * @since 0.3.0
     * @param {string} chainId Chain id in hex format
     * @returns {null} `Null` on success
     */
    _this.switchChain = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
        var chainId, chainCaip;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              chainId = _ref.chainId;
              chainCaip = unhexChainId(chainId);
              if (CHAINS.includes(chainCaip)) {
                _context.next = 4;
                break;
              }
              throw newProviderError(ProviderErrors.ChainDisconnected);
            case 4:
              _this.storage.setValue(SdkStorageKeys.chainId, chainCaip);
              _this.emit(ProviderEvents.chainChanged, {
                chainId: chainId
              });
              return _context.abrupt("return", null);
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    /**
     * @summary The list of supported provider methods.
     * @private
     */
    _this.methods = (_this$methods = {}, _this$methods[ProviderMethodNames.eth_requestAccounts] = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(params) {
        var pairResult, _this$config, _this$config2, _this$config3, result, _pairResult;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (_this.config.appId) {
                _context2.next = 2;
                break;
              }
              throw newProviderError(ProviderErrors.NoAppId);
            case 2:
              if (!_this.storage.getValue('sessionId')) {
                _context2.next = 12;
                break;
              }
              _context2.prev = 3;
              _context2.next = 6;
              return _this.request({
                method: ProviderMethodNames.eth_accounts,
                params: []
              });
            case 6:
              return _context2.abrupt("return", _context2.sent);
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](3);
              _this.storage.setValue(SdkStorageKeys.sessionId, '');
              // skip failed request and continue with pairing
            case 12:
              if (!_this.storage.getValue('pairingToken')) {
                _context2.next = 29;
                break;
              }
              _context2.prev = 13;
              _context2.next = 16;
              return _this.rpc.sendRpcApiRequest(RpcMethodNames.waitForPairingResult, {
                pairingToken: _this.storage.getValue(SdkStorageKeys.pairingToken)
              });
            case 16:
              pairResult = _context2.sent;
              _this.storage.clear();
              _this.storage.setValue(SdkStorageKeys.sessionId, pairResult.session.sessionId);
              if (pairResult.session.sessionId) {
                _context2.next = 21;
                break;
              }
              throw ProviderErrors.PairingFailed;
            case 21:
              _context2.next = 23;
              return _this.request({
                method: ProviderMethodNames.eth_accounts,
                params: params || []
              });
            case 23:
              return _context2.abrupt("return", _context2.sent);
            case 26:
              _context2.prev = 26;
              _context2.t1 = _context2["catch"](13);
              _this.storage.clear();
              // skip failed request and continue with pairing
            case 29:
              _context2.prev = 29;
              _this.storage.clear();
              _context2.next = 33;
              return _this.rpc.sendRpcApiRequest(RpcMethodNames.requestPairing, {
                appId: ((_this$config = _this.config) == null ? void 0 : _this$config.appId) || '',
                clientId: _this.storage.getValue(SdkStorageKeys.clientId),
                redirectMode: (_this$config2 = _this.config) == null ? void 0 : _this$config2.redirectMode,
                redirectUrl: (_this$config3 = _this.config) == null ? void 0 : _this$config3.appUrl
              });
            case 33:
              result = _context2.sent;
              if (!(!result.pairingToken || !result.connectUrl)) {
                _context2.next = 36;
                break;
              }
              throw ProviderErrors.PairingFailed;
            case 36:
              _this.storage.setValue(SdkStorageKeys.pairingToken, result.pairingToken);
              _this.storage.setValue(SdkStorageKeys.connectUrl, result.connectUrl);
              _this.storage.setValue(SdkStorageKeys.connectUrlBrowser, result.connectUrlBrowser);
              _this.storage.setValue(SdkStorageKeys.shortToken, result.shortToken);
              _this.emit(ProviderEvents.pair, {
                config: _this.config,
                shortToken: result.shortToken,
                connectUrl: result.connectUrl,
                connectUrlBrowser: result.connectUrlBrowser,
                miniAppPairingToken: result.miniAppPairingToken
              });
              _context2.next = 43;
              return _this.rpc.sendRpcApiRequest(RpcMethodNames.waitForPairingResult, {
                pairingToken: result.pairingToken
              });
            case 43:
              _pairResult = _context2.sent;
              _this.storage.setValue(SdkStorageKeys.sessionId, _pairResult.session.sessionId);
              if (_pairResult.session.sessionId) {
                _context2.next = 47;
                break;
              }
              throw ProviderErrors.PairingFailed;
            case 47:
              _this.storage.setValue(SdkStorageKeys.pairingToken, '');
              _this.storage.setValue(SdkStorageKeys.connectUrl, '');
              _this.storage.setValue(SdkStorageKeys.connectUrlBrowser, '');
              _this.storage.setValue(SdkStorageKeys.shortToken, '');
              _context2.next = 53;
              return _this.request({
                method: ProviderMethodNames.eth_accounts,
                params: params || []
              });
            case 53:
              return _context2.abrupt("return", _context2.sent);
            case 56:
              _context2.prev = 56;
              _context2.t2 = _context2["catch"](29);
              throw _context2.t2;
            case 59:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[3, 9], [13, 26], [29, 56]]);
      }));
      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }(), _this$methods[ProviderMethodNames.eth_accounts] = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(params) {
        var result;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _this.rpc.sendAndWaitRpcRequest(ProviderMethodNames.eth_accounts, params ? Array.isArray(params) ? params : [params] : []);
            case 3:
              result = _context3.sent;
              _this.storage.setValue(SdkStorageKeys.address, result[0] || '');
              _this.emit(ProviderEvents.accountsChanged, result);
              return _context3.abrupt("return", result);
            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              throw newProviderError(_context3.t0);
            case 12:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 9]]);
      }));
      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }(), _this$methods[ProviderMethodNames.eth_sendTransaction] = function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(params) {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this.rpc.sendAndWaitRpcRequest(ProviderMethodNames.eth_sendTransaction, params ? Array.isArray(params) ? params : [params] : []);
            case 2:
              return _context4.abrupt("return", _context4.sent);
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return function (_x4) {
        return _ref5.apply(this, arguments);
      };
    }(), _this$methods[ProviderMethodNames.personal_sign] = function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(params) {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this.rpc.sendAndWaitRpcRequest(ProviderMethodNames.personal_sign, params ? Array.isArray(params) ? params : [params] : []);
            case 2:
              return _context5.abrupt("return", _context5.sent);
            case 3:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      return function (_x5) {
        return _ref6.apply(this, arguments);
      };
    }(), _this$methods[ProviderMethodNames.gws_disconnect] = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var result;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _this.rpc.sendRpcApiRequest(RpcMethodNames.disconnect, {
              sessionToken: _this.storage.getValue(SdkStorageKeys.sessionId)
            });
          case 3:
            result = _context6.sent;
            _this.emit(ProviderEvents.disconnect, ProviderErrors.Disconnected);
            return _context6.abrupt("return", result);
          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            throw newProviderError(_context6.t0);
          case 11:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 8]]);
    })), _this$methods[ProviderMethodNames.eth_chainId] = function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(_) {
        var _this$config4;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", hexChainId(_this.storage.getValue(SdkStorageKeys.chainId) || ((_this$config4 = _this.config) == null ? void 0 : _this$config4.chainId) || CHAINS[0]));
            case 1:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      return function (_x6) {
        return _ref8.apply(this, arguments);
      };
    }(), _this$methods[ProviderMethodNames.wallet_addEthereumChain] = function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(_) {
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              throw newProviderError(ProviderErrors.UserRejected);
            case 1:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      return function (_x7) {
        return _ref9.apply(this, arguments);
      };
    }(), _this$methods[ProviderMethodNames.wallet_switchEthereumChain] = function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(params) {
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _this.switchChain(params);
            case 2:
              return _context9.abrupt("return", _context9.sent);
            case 3:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }));
      return function (_x8) {
        return _ref10.apply(this, arguments);
      };
    }(), _this$methods);
    _this.config = config;
    _this.rpc = new Rpc(_this.config);
    if ((_this$config5 = _this.config) != null && _this$config5.appId) {
      _this.injectProvider();
      _this.listenForRequestProviderEvents();
      _this.announceProvider();
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('load', function () {
        _this.restoreConnection();
      });
    }
    return _this;
  }
  _inheritsLoose(Provider, _EventEmitter);
  var _proto = Provider.prototype;
  _proto.restoreConnection = function restoreConnection() {
    var _this$config6;
    if ((_this$config6 = this.config) != null && _this$config6.appId) {
      var _this$config7;
      this.emit(ProviderEvents.connect, {
        chainId: hexChainId(this.storage.getValue(SdkStorageKeys.chainId) || ((_this$config7 = this.config) == null ? void 0 : _this$config7.chainId) || CHAINS[0])
      });
      this.restorePairing();
      this.restoreSession();
    }
  }
  /**
   * @public
   * @returns {boolean} True if the provider is connected to the server.
   */;
  _proto.isConnected = function isConnected() {
    // Always true
    return true;
  }
  /**
   * @summary Sends a request to the provider
   * @public
   * @param {ProviderRequestArguments} args Request arguments
   * @param {string} args.method The method name
   * @param {ProviderRequestArgumentsParams} args.params The method parameters
   * @returns {T} The result of the request
   */;
  _proto.request =
  /*#__PURE__*/
  function () {
    var _request = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(_ref11) {
      var _this$methods$method, _this$methods2;
      var method, params;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            method = _ref11.method, params = _ref11.params;
            _context10.next = 3;
            return (_this$methods$method = (_this$methods2 = this.methods)[method]) == null ? void 0 : _this$methods$method.call(_this$methods2, params);
          case 3:
            return _context10.abrupt("return", _context10.sent);
          case 4:
          case "end":
            return _context10.stop();
        }
      }, _callee10, this);
    }));
    function request(_x9) {
      return _request.apply(this, arguments);
    }
    return request;
  }()
  /**
   * @summary Sends a request to the provider (legacy)
   * @public
   * @param {ProviderRequestArguments} args Request arguments
   * @param {string} args.method The method name
   * @param {ProviderRequestArgumentsParams} args.params The method parameters
   * @param {Function} callback The callback function
   * @deprecated Use `request` method instead
   * @since 0.5.4
   * @returns {void} `void`
   */
  ;
  _proto.sendAsync = function sendAsync(_ref12, callback) {
    var _this$methods$method2, _this$methods3;
    var method = _ref12.method,
      params = _ref12.params;
    (_this$methods$method2 = (_this$methods3 = this.methods)[method]) == null || _this$methods$method2.call(_this$methods3, params).then(function (res) {
      callback(null, res);
    })["catch"](function (error) {
      callback(error);
    });
  };
  /**
   * @summary Restores the pairing process if pairing token is stored in the local storage
   * @private
   * @returns {void}
   */
  _proto.restorePairing =
  /*#__PURE__*/
  function () {
    var _restorePairing = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
      var pairingToken, sessionId, _pairResult$session, pairResult, accounts;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            pairingToken = this.storage.getValue(SdkStorageKeys.pairingToken);
            sessionId = this.storage.getValue(SdkStorageKeys.sessionId);
            if (!(pairingToken && !sessionId)) {
              _context11.next = 19;
              break;
            }
            _context11.prev = 3;
            _context11.next = 6;
            return this.rpc.sendRpcApiRequest(RpcMethodNames.waitForPairingResult, {
              pairingToken: pairingToken
            });
          case 6:
            pairResult = _context11.sent;
            this.storage.clear();
            this.storage.setValue(SdkStorageKeys.sessionId, pairResult.session.sessionId);
            if (pairResult.session.sessionId) {
              _context11.next = 11;
              break;
            }
            throw ProviderErrors.PairingFailed;
          case 11:
            accounts = (((_pairResult$session = pairResult.session) == null || (_pairResult$session = _pairResult$session.namespaces) == null || (_pairResult$session = _pairResult$session["eip155"]) == null ? void 0 : _pairResult$session.accounts) || []).map(function (account) {
              return account.includes(':') ? account.split(':')[2] || '' : account;
            });
            this.storage.setValue(SdkStorageKeys.address, accounts[0] || '');
            this.emit(ProviderEvents.accountsChanged, accounts);
            _context11.next = 19;
            break;
          case 16:
            _context11.prev = 16;
            _context11.t0 = _context11["catch"](3);
            this.storage.clear();
          case 19:
          case "end":
            return _context11.stop();
        }
      }, _callee11, this, [[3, 16]]);
    }));
    function restorePairing() {
      return _restorePairing.apply(this, arguments);
    }
    return restorePairing;
  }()
  /**
   * @summary Restores the session if session Id is stored in the local storage
   * @private
   * @returns {void}
   */
  ;
  _proto.restoreSession =
  /*#__PURE__*/
  function () {
    var _restoreSession = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
      var pairingToken, sessionId;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            pairingToken = this.storage.getValue(SdkStorageKeys.pairingToken);
            sessionId = this.storage.getValue(SdkStorageKeys.sessionId);
            if (!(sessionId && !pairingToken)) {
              _context12.next = 11;
              break;
            }
            _context12.prev = 3;
            _context12.next = 6;
            return this.request({
              method: ProviderMethodNames.eth_requestAccounts
            });
          case 6:
            _context12.next = 11;
            break;
          case 8:
            _context12.prev = 8;
            _context12.t0 = _context12["catch"](3);
            this.storage.clear();
          case 11:
          case "end":
            return _context12.stop();
        }
      }, _callee12, this, [[3, 8]]);
    }));
    function restoreSession() {
      return _restoreSession.apply(this, arguments);
    }
    return restoreSession;
  }()
  /**
   * @summary Injects the provider into the window object
   * @private
   * @returns {void}
   */
  ;
  _proto.injectProvider = function injectProvider() {
    var _this2 = this;
    if (typeof window !== 'undefined') {
      if (!window.ethereum) {
        window.ethereum = this;
      } else {
        if (window.ethereum.providers && Array.isArray(window.ethereum.providers)) {
          if (window.ethereum.providers.filter(function (p) {
            return p.isGrinderyWallet;
          }).length > 0) {
            window.ethereum.providers = window.ethereum.providers.map(function (p) {
              if (p.isGrinderyWallet) {
                return _this2;
              }
              return p;
            });
          } else {
            window.ethereum.providers.push(this);
          }
        } else {
          window.ethereum.providers = [window.ethereum, this];
        }
      }
    }
  }
  /**
   * @summary Announces the provider to the window object
   * @private
   * @since 0.1.1
   * @link https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events
   * @returns {void}
   */;
  _proto.announceProvider = function announceProvider() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('eip6963:announceProvider', {
        detail: Object.freeze({
          info: providerInfo,
          provider: this
        })
      }));
    }
  }
  /**
   * @summary Listens for the request provider events
   * @private
   * @since 0.1.1
   * @link https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events
   * @returns {void}
   */;
  _proto.listenForRequestProviderEvents = function listenForRequestProviderEvents() {
    var _this3 = this;
    if (typeof window !== 'undefined') {
      window.addEventListener('eip6963:requestProvider', function () {
        _this3.announceProvider();
      });
    }
  };
  return Provider;
}(EventEmitter);

/**
 * @summary The Grindery Wallet API wrapper class
 * @since 0.5.0
 */
var WalletAPI = /*#__PURE__*/function () {
  function WalletAPI() {}
  var _proto = WalletAPI.prototype;
  /**
   * @summary Sends a request to the Grindery Wallet API
   * @public
   * @param {string} method JSON-RPC method name
   * @param {object} params JSON-RPC method parameters, optional
   * @returns {T} The result of the API request
   */
  _proto.sendApiRequest =
  /*#__PURE__*/
  function () {
    var _sendApiRequest = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(method, params) {
      var _window$Grindery;
      var storage, sessionId, address, customUrl, response, json;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            storage = new SdkStorage();
            sessionId = storage.getValue(SdkStorageKeys.sessionId);
            address = storage.getValue(SdkStorageKeys.address);
            if (!(!sessionId || !address)) {
              _context.next = 5;
              break;
            }
            throw new Error('Not connected to the wallet');
          case 5:
            customUrl = typeof window !== 'undefined' && (_window$Grindery = window.Grindery) != null && (_window$Grindery = _window$Grindery.WalletSDK) != null && _window$Grindery.config.walletApiUrl ? window.Grindery.WalletSDK.config.walletApiUrl : '';
            _context.next = 8;
            return fetch(customUrl || 'https://wallet-api.grindery.com/v3', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + address + ":" + sessionId
              },
              body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: method,
                params: params || {}
              })
            });
          case 8:
            response = _context.sent;
            if (response.ok) {
              _context.next = 11;
              break;
            }
            throw new Error("Failed to call " + method);
          case 11:
            _context.next = 13;
            return response.json();
          case 13:
            json = _context.sent;
            return _context.abrupt("return", json.result);
          case 15:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function sendApiRequest(_x, _x2) {
      return _sendApiRequest.apply(this, arguments);
    }
    return sendApiRequest;
  }();
  return WalletAPI;
}();

/**
 * @summary Get the SDK config from the script tag data attributes
 * @returns {object} The SDK config object
 */
var getConfigFromDataAttributes = function getConfigFromDataAttributes() {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return {};
  }
  var config = {};
  var attributesMap = {
    'data-app-id': 'appId',
    'data-wallet-api-url': 'walletApiUrl',
    'data-pairing-api-url': 'pairingApiUrl',
    'data-app-url': 'appUrl',
    'data-redirect-mode': 'redirectMode',
    'data-chain-id': 'chainId'
  };
  for (var _i = 0, _Object$entries = Object.entries(attributesMap); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _Object$entries[_i],
      attribute = _Object$entries$_i[0],
      key = _Object$entries$_i[1];
    var elements = document.querySelectorAll("[" + attribute + "]");
    for (var j = 0; j < elements.length; j++) {
      var element = elements[j];
      var value = element.getAttribute(attribute);
      var src = element.getAttribute('src');
      var isGrinderySrc = src && src.includes('grindery-wallet-sdk');
      if (isGrinderySrc && value) {
        config[key] = value;
      }
    }
  }
  return config;
};

/**
 * @summary The Wallet SDK class
 * @since 0.2.0
 */
var WalletSDK = /*#__PURE__*/function () {
  function WalletSDK(config) {
    var _window$Grindery, _window$Grindery2, _window$Grindery3, _window$Grindery4, _window$Grindery5, _window$Grindery6;
    /**
     * @summary The provider instance
     * @public
     */
    this.provider = void 0;
    this.config = typeof window !== 'undefined' ? {
      appId: ((_window$Grindery = window.Grindery) == null ? void 0 : _window$Grindery.appId) || '',
      appUrl: ((_window$Grindery2 = window.Grindery) == null ? void 0 : _window$Grindery2.appUrl) || window.location.origin,
      redirectMode: (_window$Grindery3 = window.Grindery) == null ? void 0 : _window$Grindery3.redirectMode,
      pairingApiUrl: (_window$Grindery4 = window.Grindery) == null ? void 0 : _window$Grindery4.pairingApiUrl,
      walletApiUrl: (_window$Grindery5 = window.Grindery) == null ? void 0 : _window$Grindery5.walletApiUrl,
      chainId: (_window$Grindery6 = window.Grindery) == null ? void 0 : _window$Grindery6.chainId
    } : {
      appId: '',
      appUrl: ''
    };
    /**
     * @summary SdkStorage class instance
     * @private
     */
    this.storage = new SdkStorage();
    /**
     * @summary The Grindery Wallet user
     * @private
     */
    this.user = null;
    this.config = _extends({}, this.config, config || getConfigFromDataAttributes() || {});
    if (typeof window !== 'undefined') {
      window.Grindery = _extends({}, this.config);
    }
    this.storage.setValue(SdkStorageKeys.chainId, this.storage.getValue(SdkStorageKeys.chainId) || this.config.chainId || CHAINS[0]);
    this.detectPairingToken();
    this.provider = this.getWeb3Provider();
    if (this.config.appId) {
      this.provider.on(ProviderEvents.pair, this.handlePairing);
    }
  }
  /**
   * @summary Checks if the provider is connected to the server
   * @returns {boolean} True if the provider is connected to the server.
   *
   * @example
   * ```typescript
   * const isConnected = window.Grindery.WalletSDK.isConnected();
   * ```
   */
  var _proto = WalletSDK.prototype;
  _proto.isConnected = function isConnected() {
    return this.provider.isConnected();
  }
  /**
   * @summary Checks if the provider is connected to the server and the Grindery Wallet
   * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet.
   */;
  _proto.isWalletConnected = function isWalletConnected() {
    return this.isConnected() && !!this.storage.getValue(SdkStorageKeys.pairingToken) && !this.storage.getValue(SdkStorageKeys.sessionId);
  }
  /**
   * @summary Initiate connection to the Grindery Wallet
   * @public
   * @returns {Promise<string[]>} The array of ethereum addresses
   * @since 0.1.0
   */;
  _proto.connect =
  /*#__PURE__*/
  function () {
    var _connect = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.provider.request({
              method: ProviderMethodNames.eth_requestAccounts
            });
          case 2:
            return _context.abrupt("return", _context.sent);
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function connect() {
      return _connect.apply(this, arguments);
    }
    return connect;
  }()
  /**
   * @summary Disconnects Grindery Wallet
   * @public
   * @returns {Promise<boolean>} True if wallet is disconnected
   * @since 0.1.0
   */
  ;
  _proto.disconnect =
  /*#__PURE__*/
  function () {
    var _disconnect = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return this.provider.request({
              method: ProviderMethodNames.gws_disconnect
            });
          case 2:
            return _context2.abrupt("return", _context2.sent);
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function disconnect() {
      return _disconnect.apply(this, arguments);
    }
    return disconnect;
  }()
  /**
   * @summary Sends a transaction request to the Grindery Wallet
   * @public
   * @since 0.1.0
   * @param {object} params The transaction parameters
   * @param {string} params.to The recipient address
   * @param {string} [params.value] The amount to send in wei
   * @param {string} [params.data] The data to send
   * @returns {Promise<string>} Transaction hash string
   */
  ;
  _proto.sendTransaction =
  /*#__PURE__*/
  function () {
    var _sendTransaction = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(params) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return this.provider.request({
              method: ProviderMethodNames.eth_sendTransaction,
              params: [params]
            });
          case 2:
            return _context3.abrupt("return", _context3.sent);
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }));
    function sendTransaction(_x) {
      return _sendTransaction.apply(this, arguments);
    }
    return sendTransaction;
  }()
  /**
   * @summary Sends a personal signature request to the Grindery Wallet
   * @public
   * @since 0.1.0
   * @param {string} message The message to sign
   * @returns {Promise<string>} Signature string
   */
  ;
  _proto.signMessage =
  /*#__PURE__*/
  function () {
    var _signMessage = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(message) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return this.provider.request({
              method: ProviderMethodNames.personal_sign,
              params: [message, this.storage.getValue('address')]
            });
          case 2:
            return _context4.abrupt("return", _context4.sent);
          case 3:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this);
    }));
    function signMessage(_x2) {
      return _signMessage.apply(this, arguments);
    }
    return signMessage;
  }()
  /**
   * @summary Requests the Grindery Wallet to switch the chain
   * @public
   * @since 0.3.0
   * @param {string} chainId Chain id in CAIP-2 format
   * @returns {Promise<null>} Returns `null` on success
   */
  ;
  _proto.switchChain =
  /*#__PURE__*/
  function () {
    var _switchChain = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(chainId) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return this.provider.request({
              method: ProviderMethodNames.wallet_switchEthereumChain,
              params: {
                chainId: hexChainId(chainId)
              }
            });
          case 2:
            return _context5.abrupt("return", _context5.sent);
          case 3:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this);
    }));
    function switchChain(_x3) {
      return _switchChain.apply(this, arguments);
    }
    return switchChain;
  }()
  /**
   * @summary Gets currently connected chain
   * @public
   * @since 0.3.0
   * @returns {string} Returns chain id in CAIP-2 format
   */
  ;
  _proto.getChain = function getChain() {
    return this.storage.getValue(SdkStorageKeys.chainId) || this.config.chainId || CHAINS[0];
  }
  /**
   * @summary Exchange user ID to wallet address
   * @public
   * @since 0.4.0
   * @param {string} userId User ID
   * @returns {Promise<string>} Grindery Wallet address
   */;
  _proto.getUserWalletAddress =
  /*#__PURE__*/
  function () {
    var _getUserWalletAddress = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(userId) {
      var rpc;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            rpc = new Rpc(this.config);
            if (this.config.appId) {
              _context6.next = 3;
              break;
            }
            throw new Error('App ID is required');
          case 3:
            _context6.next = 5;
            return rpc.sendRpcApiRequest(RpcMethodNames.getUserWalletAddress, {
              appId: this.config.appId,
              userId: userId
            });
          case 5:
            return _context6.abrupt("return", _context6.sent);
          case 6:
          case "end":
            return _context6.stop();
        }
      }, _callee6, this);
    }));
    function getUserWalletAddress(_x4) {
      return _getUserWalletAddress.apply(this, arguments);
    }
    return getUserWalletAddress;
  }()
  /**
   * @summary Adds a listener to the event
   * @public
   * @param {ProviderEventName} event Event name
   * @param {Function} callback Callback function
   * @returns {EventEmitter} The instance of the class itself
   */
  ;
  _proto.on = function on(event, callback) {
    this.provider.on(event, callback);
    return this;
  }
  /**
   * @summary Removes a listener from the event
   * @public
   * @param {ProviderEventName} event Event name
   * @param {Function} callback Callback function
   * @returns {EventEmitter} The instance of the class itself
   */;
  _proto.removeListener = function removeListener(event, callback) {
    this.provider.removeListener(event, callback);
    return this;
  }
  /**
   * @summary Gets the Grindery user information
   * @public
   * @since 0.5.0
   * @returns {Promise<User>} The Grindery user information
   */;
  _proto.getUser =
  /*#__PURE__*/
  function () {
    var _getUser = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var api;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            if (this.user) {
              _context7.next = 11;
              break;
            }
            api = new WalletAPI();
            _context7.prev = 2;
            _context7.next = 5;
            return api.sendApiRequest('gw_getMe');
          case 5:
            this.user = _context7.sent;
            _context7.next = 11;
            break;
          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](2);
            throw new Error(_context7.t0 instanceof Error ? _context7.t0.message : 'Failed to fetch user information');
          case 11:
            return _context7.abrupt("return", this.user);
          case 12:
          case "end":
            return _context7.stop();
        }
      }, _callee7, this, [[2, 8]]);
    }));
    function getUser() {
      return _getUser.apply(this, arguments);
    }
    return getUser;
  }()
  /**
   * @summary Sets the application ID
   * @public
   * @since 0.5.1
   * @param {string} appId The application ID
   * @returns {void}
   */
  ;
  _proto.setAppId = function setAppId(appId) {
    var _this = this;
    var appIdUpdated = false;
    if (appId !== this.config.appId) {
      appIdUpdated = true;
    }
    this.config.appId = appId;
    if (typeof window !== 'undefined') {
      window.Grindery = _extends({}, window.Grindery, {
        appId: appId
      });
    }
    if (appIdUpdated) {
      this.provider = this.getWeb3Provider();
      this.provider.removeListener(ProviderEvents.pair, this.handlePairing);
      setTimeout(function () {
        _this.provider.on(ProviderEvents.pair, _this.handlePairing);
      }, 0);
    }
  }
  /**
   * @summary Sets the SDK config
   * @public
   * @since 0.5.1
   * @param {object} config The partial SDK config object
   * @returns {void}
   */;
  _proto.setConfig = function setConfig(config) {
    var _this2 = this;
    var appIdUpdated = false;
    if (config.appId !== this.config.appId) {
      appIdUpdated = true;
    }
    this.config = _extends({}, this.config, config);
    if (typeof window !== 'undefined') {
      window.Grindery = _extends({}, window.Grindery, this.config);
    }
    if (appIdUpdated) {
      this.provider = this.getWeb3Provider();
      this.provider.removeListener(ProviderEvents.pair, this.handlePairing);
      setTimeout(function () {
        _this2.provider.on(ProviderEvents.pair, _this2.handlePairing);
      }, 0);
    }
  }
  /**
   * @summary Requests pairing by telegram login info
   * @public
   * @since 0.7.0
   * @param {string} appSecret The application secret. Obtained in the Grindery bot by the dApp developer. Required. Must be kept secret.
   * @param {TelegramLoginInfo} telegramLoginInfo The user's Telegram login info. Required.
   * @param {string} [clientId] The client ID. Optional. Unique identifier of the client device.
   */;
  _proto.requestPairingByTelegramLogin =
  /*#__PURE__*/
  function () {
    var _requestPairingByTelegramLogin = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(appSecret, telegramLoginInfo, clientId) {
      var rpc, pairingRequest;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            rpc = new Rpc(this.config);
            if (this.config.appId) {
              _context8.next = 4;
              break;
            }
            throw new Error('App ID is required');
          case 4:
            _context8.next = 6;
            return rpc.sendRpcApiRequest(RpcMethodNames.requestPairingByTelegramLogin, {
              appId: this.config.appId,
              clientId: clientId || this.storage.getValue(SdkStorageKeys.clientId),
              appSecret: appSecret,
              telegramLoginInfo: telegramLoginInfo
            });
          case 6:
            pairingRequest = _context8.sent;
            this.storage.setValue(SdkStorageKeys.pairingToken, pairingRequest.pairingToken);
            this.provider.restoreConnection();
            _context8.next = 14;
            break;
          case 11:
            _context8.prev = 11;
            _context8.t0 = _context8["catch"](0);
            throw new Error(_context8.t0 instanceof Error ? _context8.t0.message : 'Failed to request pairing by telegram login');
          case 14:
          case "end":
            return _context8.stop();
        }
      }, _callee8, this, [[0, 11]]);
    }));
    function requestPairingByTelegramLogin(_x5, _x6, _x7) {
      return _requestPairingByTelegramLogin.apply(this, arguments);
    }
    return requestPairingByTelegramLogin;
  }()
  /**
   * @summary Sends a request to the Grindery Wallet JSON-RPC API
   * @public
   * @since 0.7.0
   * @param {string} method Wallet API method name
   * @param {object} params Wallet API method params
   * @returns {T} The result field of the JSON-RPC API request
   */
  ;
  _proto.sendWalletApiRequest =
  /*#__PURE__*/
  function () {
    var _sendWalletApiRequest = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(method, params) {
      var api;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            api = new WalletAPI();
            _context9.prev = 1;
            _context9.next = 4;
            return api.sendApiRequest(method, params);
          case 4:
            return _context9.abrupt("return", _context9.sent);
          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](1);
            throw new Error(_context9.t0 instanceof Error ? _context9.t0.message : 'Failed to send wallet API request');
          case 10:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[1, 7]]);
    }));
    function sendWalletApiRequest(_x8, _x9) {
      return _sendWalletApiRequest.apply(this, arguments);
    }
    return sendWalletApiRequest;
  }();
  /**
   * @summary Gets the Grindery Wallet ethereum provider
   * @returns {Provider} The Grindery Wallet ethereum provider
   */
  _proto.getWeb3Provider = function getWeb3Provider() {
    return new Provider(this.config);
  }
  /**
   * @summary Handles the pairing request, by opening the Grindery Wallet
   * @private
   * @param ProviderRequestPairingResult
   * @returns {void}
   */;
  _proto.handlePairing = function handlePairing(_ref) {
    var config = _ref.config,
      shortToken = _ref.shortToken,
      connectUrlBrowser = _ref.connectUrlBrowser,
      miniAppPairingToken = _ref.miniAppPairingToken;
    if (typeof window === 'undefined') {
      alert('Please allow popups for this website and try again.');
      return;
    }
    var redirectUrl = connectUrlBrowser || "https://www.grindery.com/connect/wc?uri=" + shortToken;
    var miniAppUrl = miniAppPairingToken ? "https://t.me/GrinderyConnectTestBot/confirm?startapp=" + miniAppPairingToken.replaceAll('.', '___') : '';
    if (miniAppUrl && (config == null ? void 0 : config.redirectMode) === 'tg') {
      window.open(miniAppUrl, '_blank');
      return;
    }
    var connectPage = window.open(redirectUrl, '_blank');
    if (!connectPage) {
      alert('Please allow popups for this website and try again.');
    }
  };
  _proto.detectPairingToken = function detectPairingToken() {
    if (typeof window !== 'undefined') {
      var urlParams = new URLSearchParams(window.location.search);
      var token = urlParams.get('_grinderyPairingToken') || urlParams.get('tgWebAppStartParam');
      if (token) {
        this.storage.setValue(SdkStorageKeys.pairingToken, token);
        this.storage.setValue(SdkStorageKeys.sessionId, '');
      }
    }
  };
  return WalletSDK;
}();

/**
 * @summary The Grindery Wallet SDK
 */
var GrinderyWalletSDK = WalletSDK;
function init() {
  var _window$Grindery;
  if (typeof window !== 'undefined' && (!((_window$Grindery = window.Grindery) != null && _window$Grindery.WalletSDK) || !(window.Grindery.WalletSDK instanceof WalletSDK))) {
    window.Grindery = _extends({}, window.Grindery || {}, {
      WalletSDK: new WalletSDK()
    });
  }
}
// Initialize the SDK
init();

exports.GrinderyWalletSDK = GrinderyWalletSDK;
//# sourceMappingURL=grindery-wallet-sdk.cjs.development.js.map

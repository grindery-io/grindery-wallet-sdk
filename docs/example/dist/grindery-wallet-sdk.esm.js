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

var ProviderError = /*#__PURE__*/function (_Error) {
  function ProviderError(message, code, data) {
    var _this;
    _this = _Error.call(this, message) || this;
    _this.name = 'GrinderyWalletProviderError';
    _this.code = code;
    _this.data = data;
    return _this;
  }
  _inheritsLoose(ProviderError, _Error);
  return ProviderError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

/**
 * @summary A class for emitting provider events
 * @since 0.1.0
 */
var ProviderEventEmitter = /*#__PURE__*/function () {
  function ProviderEventEmitter() {
    this.events = new Map();
  }
  /**
   * @summary Adds a listener to the provider event
   * @param {string} event Event name
   * @param {Function} callback Callback function
   * @returns {ProviderEventEmitter} The instance of the class itself
   */
  var _proto = ProviderEventEmitter.prototype;
  _proto.on = function on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    return this;
  }
  /**
   * @summary Removes a listener from the provider event
   * @param {string} event Event name
   * @param {Function} callback Callback function
   * @returns {ProviderEventEmitter} The instance of the class itself
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
   * @param {string} event Event name
   * @param data Event data
   * @returns {ProviderEventEmitter} The instance of the class itself
   */;
  _proto.emit = function emit(event) {
    for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }
    if (this.events.has(event)) {
      console.log('[GrinderyWalletProvider] > Event:', event, data);
      this.events.get(event).forEach(function (callback) {
        callback.apply(void 0, data);
      });
    }
    return this;
  };
  return ProviderEventEmitter;
}();

var LOCALSTORAGE_KEY = 'GrinderyWalletProvider';
/**
 * @summary A local storage class for the provider
 * @since 0.1.0
 * @extends ProviderEventEmitter
 */
var ProviderLocalStorage = /*#__PURE__*/function (_ProviderEventEmitter) {
  function ProviderLocalStorage() {
    return _ProviderEventEmitter.apply(this, arguments) || this;
  }
  _inheritsLoose(ProviderLocalStorage, _ProviderEventEmitter);
  var _proto = ProviderLocalStorage.prototype;
  /**
   * @summary Gets the value of the storage by the key
   * @param {ProviderStorageKey} key Provider storage key
   * @returns {string} The value of the storage by the key
   */
  _proto.getStorageValue = function getStorageValue(key) {
    var value = this.getStorage()[key] || '';
    return value;
  }
  /**
   * @summary Sets the value of the storage by the key
   * @param {ProviderStorageKey} key Provider storage key
   * @param {string} value The value to set
   */;
  _proto.setStorageValue = function setStorageValue(key, value) {
    var storage = this.getStorage();
    storage[key] = value;
    this.saveStorage(storage);
  };
  _proto.getStorage = function getStorage() {
    try {
      return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '{}');
    } catch (error) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({}));
      throw new Error('Error parsing storage');
    }
  };
  _proto.saveStorage = function saveStorage(storage) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storage));
  };
  return ProviderLocalStorage;
}(ProviderEventEmitter);

var Provider = /*#__PURE__*/function (_ProviderLocalStorage) {
  function Provider() {
    var _this;
    _this = _ProviderLocalStorage.call(this) || this;
    /**
     * @summary The application ID.
     */
    _this.appId = window.location.href;
    /**
     * @summary The chain ID in CAIP-2 format; e.g. "eip155:1".
     */
    _this.chainId = 'eip155:137';
    /**
     * @summary The list of supported provider methods.
     */
    _this.methods = {};
    _this.injectProvider();
    return _this;
  }
  /**
   * @returns {boolean} True if the provider is connected to the server.
   */
  _inheritsLoose(Provider, _ProviderLocalStorage);
  var _proto = Provider.prototype;
  _proto.isConnected = function isConnected() {
    return !!this.chainId;
  }
  /**
   * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet.
   */;
  _proto.isWalletConnected = function isWalletConnected() {
    return this.isConnected() && !!this.getStorageValue('sessionId');
  }
  /**
   * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet pairing is in progress (pending).
   */;
  _proto.isWalletConnectionPending = function isWalletConnectionPending() {
    return this.isConnected() && !!this.getStorageValue('pairingToken');
  };
  _proto.request = /*#__PURE__*/function () {
    var _request = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
      var method, params;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            method = _ref.method, params = _ref.params;
            if (!(method !== 'wallet_ping' && !this.chainId)) {
              _context.next = 3;
              break;
            }
            throw new ProviderError('Disconnected', 4900);
          case 3:
            if (this.methods[method]) {
              _context.next = 5;
              break;
            }
            throw new ProviderError('Unsupported Method', 4200);
          case 5:
            _context.prev = 5;
            if (!(this.methods[method].sessionRequired && !this.isWalletConnected())) {
              _context.next = 8;
              break;
            }
            throw new ProviderError('Unauthorized', 4900);
          case 8:
            _context.next = 10;
            return this.methods[method].execute(params);
          case 10:
            return _context.abrupt("return", _context.sent);
          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](5);
            throw this.createProviderRpcError(_context.t0);
          case 16:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[5, 13]]);
    }));
    function request(_x) {
      return _request.apply(this, arguments);
    }
    return request;
  }();
  _proto.registerProviderMethods = function registerProviderMethods(methods) {
    this.methods = methods;
  };
  _proto.sendGrinderyRpcProviderRequest = /*#__PURE__*/function () {
    var _sendGrinderyRpcProviderRequest = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(method, params) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (this.getStorageValue('sessionId')) {
              _context2.next = 2;
              break;
            }
            throw new ProviderError('Unauthorized', 4900);
          case 2:
            _context2.prev = 2;
            _context2.next = 5;
            return this.sendGrinderyRpcApiRequest('checkout_request', {
              sessionId: this.getStorageValue('sessionId'),
              scope: this.chainId,
              request: {
                method: method,
                params: params
              }
            });
          case 5:
            return _context2.abrupt("return", _context2.sent);
          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            throw this.createProviderRpcError(_context2.t0);
          case 11:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this, [[2, 8]]);
    }));
    function sendGrinderyRpcProviderRequest(_x2, _x3) {
      return _sendGrinderyRpcProviderRequest.apply(this, arguments);
    }
    return sendGrinderyRpcProviderRequest;
  }();
  _proto.waitGrinderyRpcProviderRequest = /*#__PURE__*/function () {
    var _waitGrinderyRpcProviderRequest = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(requestToken, timeout) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (this.getStorageValue('sessionId')) {
              _context3.next = 2;
              break;
            }
            throw new ProviderError('Unauthorized', 4900);
          case 2:
            _context3.prev = 2;
            _context3.next = 5;
            return this.sendGrinderyRpcApiRequest('checkout_waitForRequestResult', {
              requestToken: requestToken,
              timeout: timeout
            });
          case 5:
            return _context3.abrupt("return", _context3.sent);
          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](2);
            throw this.createProviderRpcError(_context3.t0);
          case 11:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this, [[2, 8]]);
    }));
    function waitGrinderyRpcProviderRequest(_x4, _x5) {
      return _waitGrinderyRpcProviderRequest.apply(this, arguments);
    }
    return waitGrinderyRpcProviderRequest;
  }();
  _proto.sendGrinderyRpcApiRequest = /*#__PURE__*/function () {
    var _sendGrinderyRpcApiRequest = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(method, params) {
      var response, data;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return fetch('https://walletconnect-api.grindery.com', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: method,
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
            throw new ProviderError('No result', 4900);
          case 11:
            return _context4.abrupt("return", data.result);
          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](0);
            throw this.createProviderRpcError(_context4.t0);
          case 17:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this, [[0, 14]]);
    }));
    function sendGrinderyRpcApiRequest(_x6, _x7) {
      return _sendGrinderyRpcApiRequest.apply(this, arguments);
    }
    return sendGrinderyRpcApiRequest;
  }();
  _proto.createProviderRpcError = function createProviderRpcError(error) {
    var errorResponse;
    if (error instanceof ProviderError) {
      errorResponse = new ProviderError(error.message || 'Unknown error');
      errorResponse.code = error.code || 4900;
      errorResponse.data = error.data;
    } else if (error instanceof Error) {
      errorResponse = new ProviderError(error.message || 'Unknown error');
      errorResponse.code = 4900;
    } else {
      errorResponse = new ProviderError('Unknown error');
      errorResponse.code = 4900;
    }
    return errorResponse;
  };
  _proto.injectProvider = function injectProvider() {
    var _this2 = this;
    if (!window.ethereum) {
      window.ethereum = this;
    } else {
      if (window.ethereum.providers && Array.isArray(window.ethereum.providers)) {
        window.ethereum.providers.push(this);
      } else {
        window.ethereum.providers = [window.ethereum, this];
      }
    }
    addEventListener('load', function () {
      _this2.emit('connect', {
        chainId: _this2.chainId
      });
    });
  };
  return Provider;
}(ProviderLocalStorage);

/**
 * @summary The Grindery Wallet Ethereum Injected Provider Class.
 * @extends Provider
 * @implements ProviderInterface
 */
var GrinderyWalletProvider = /*#__PURE__*/function (_Provider) {
  function GrinderyWalletProvider() {
    var _this;
    _this = _Provider.call(this) || this;
    /**
     * @summary Indicates that the provider is a Grindery Wallet.
     */
    _this.isGrinderyWallet = true;
    _this.registerProviderMethods({
      /**
       * @summary Connect a dApp to the Grindery Wallet.
       * @since 0.1.0
       * @returns {Promise<string[]>} The list of user wallets' addresses.
       */
      eth_requestAccounts: {
        sessionRequired: false,
        execute: function () {
          var _execute = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
            var pairResult, result, _pairResult;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!_this.isWalletConnected()) {
                    _context.next = 10;
                    break;
                  }
                  _context.prev = 1;
                  _context.next = 4;
                  return _this.request({
                    method: 'eth_accounts',
                    params: params || []
                  });
                case 4:
                  return _context.abrupt("return", _context.sent);
                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](1);
                  _this.setStorageValue('sessionId', '');
                  // skip failed request and continue with pairing
                case 10:
                  if (!_this.isWalletConnectionPending()) {
                    _context.next = 31;
                    break;
                  }
                  _context.prev = 11;
                  _this.emit('restorePairing', {
                    connectUrl: _this.getStorageValue('connectUrl'),
                    connectUrlBrowser: _this.getStorageValue('connectUrlBrowser')
                  });
                  _context.next = 15;
                  return _this.sendGrinderyRpcApiRequest('checkout_waitForPairingResult', {
                    pairingToken: _this.getStorageValue('pairingToken')
                  });
                case 15:
                  pairResult = _context.sent;
                  _this.setStorageValue('sessionId', pairResult.sessionId);
                  _this.setStorageValue('pairingToken', '');
                  _this.setStorageValue('connectUrl', '');
                  _this.setStorageValue('connectUrlBrowser', '');
                  if (pairResult.sessionId) {
                    _context.next = 22;
                    break;
                  }
                  throw new ProviderError('Pairing failed', 4900);
                case 22:
                  return _context.abrupt("return", []);
                case 25:
                  _context.prev = 25;
                  _context.t1 = _context["catch"](11);
                  _this.setStorageValue('sessionId', '');
                  _this.setStorageValue('pairingToken', '');
                  _this.setStorageValue('connectUrl', '');
                  _this.setStorageValue('connectUrlBrowser', '');
                  // skip failed request and continue with pairing
                case 31:
                  _context.prev = 31;
                  _context.next = 34;
                  return _this.sendGrinderyRpcApiRequest('checkout_requestPairing', {
                    appId: _this.appId
                  });
                case 34:
                  result = _context.sent;
                  if (!(!result.pairingToken || !result.connectUrl)) {
                    _context.next = 37;
                    break;
                  }
                  throw new ProviderError('Pairing failed', 4900);
                case 37:
                  _this.setStorageValue('pairingToken', result.pairingToken);
                  _this.setStorageValue('connectUrl', result.connectUrl);
                  _this.setStorageValue('connectUrlBrowser', result.connectUrlBrowser);
                  _this.emit('pairing', {
                    connectUrl: result.connectUrl,
                    connectUrlBrowser: result.connectUrlBrowser
                  });
                  _context.next = 43;
                  return _this.sendGrinderyRpcApiRequest('checkout_waitForPairingResult', {
                    pairingToken: result.pairingToken
                  });
                case 43:
                  _pairResult = _context.sent;
                  _this.setStorageValue('sessionId', _pairResult.sessionId);
                  if (_pairResult.sessionId) {
                    _context.next = 47;
                    break;
                  }
                  throw new ProviderError('Pairing failed', 4900);
                case 47:
                  _context.next = 49;
                  return _this.sendGrinderyRpcApiRequest('checkout_request', {
                    sessionId: _pairResult.sessionId,
                    scope: _this.chainId,
                    request: {
                      method: 'eth_accounts',
                      params: []
                    }
                  });
                case 49:
                  return _context.abrupt("return", _context.sent);
                case 52:
                  _context.prev = 52;
                  _context.t2 = _context["catch"](31);
                  throw _this.createProviderRpcError(_context.t2);
                case 55:
                case "end":
                  return _context.stop();
              }
            }, _callee, null, [[1, 7], [11, 25], [31, 52]]);
          }));
          function execute(_x) {
            return _execute.apply(this, arguments);
          }
          return execute;
        }()
      },
      /**
       * @summary Get a list of user wallets' addresses.
       * @since 0.1.0
       * @returns {Promise<string[]>} The list of user wallets' addresses.
       */
      eth_accounts: {
        sessionRequired: true,
        execute: function () {
          var _execute2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(params) {
            var _yield$_this$sendGrin, requestToken;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return _this.sendGrinderyRpcProviderRequest('eth_accounts', params ? Array.isArray(params) ? params : [params] : []);
                case 3:
                  _yield$_this$sendGrin = _context2.sent;
                  requestToken = _yield$_this$sendGrin.requestToken;
                  if (requestToken) {
                    _context2.next = 7;
                    break;
                  }
                  throw new ProviderError('No request token', 4900);
                case 7:
                  _context2.next = 9;
                  return _this.waitGrinderyRpcProviderRequest(requestToken);
                case 9:
                  return _context2.abrupt("return", _context2.sent);
                case 12:
                  _context2.prev = 12;
                  _context2.t0 = _context2["catch"](0);
                  throw _this.createProviderRpcError(_context2.t0);
                case 15:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, null, [[0, 12]]);
          }));
          function execute(_x2) {
            return _execute2.apply(this, arguments);
          }
          return execute;
        }()
      },
      eth_sendTransaction: {
        sessionRequired: true,
        execute: function () {
          var _execute3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(params) {
            var _yield$_this$sendGrin2, requestToken;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return _this.sendGrinderyRpcProviderRequest('eth_sendTransaction', params ? Array.isArray(params) ? params : [params] : []);
                case 3:
                  _yield$_this$sendGrin2 = _context3.sent;
                  requestToken = _yield$_this$sendGrin2.requestToken;
                  if (requestToken) {
                    _context3.next = 7;
                    break;
                  }
                  throw new ProviderError('No request token', 4900);
                case 7:
                  _context3.next = 9;
                  return _this.waitGrinderyRpcProviderRequest(requestToken);
                case 9:
                  return _context3.abrupt("return", _context3.sent);
                case 12:
                  _context3.prev = 12;
                  _context3.t0 = _context3["catch"](0);
                  throw _this.createProviderRpcError(_context3.t0);
                case 15:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, null, [[0, 12]]);
          }));
          function execute(_x3) {
            return _execute3.apply(this, arguments);
          }
          return execute;
        }()
      },
      personal_sign: {
        sessionRequired: true,
        execute: function () {
          var _execute4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(params) {
            var _yield$_this$sendGrin3, requestToken;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return _this.sendGrinderyRpcProviderRequest('personal_sign', params ? Array.isArray(params) ? params : [params] : []);
                case 3:
                  _yield$_this$sendGrin3 = _context4.sent;
                  requestToken = _yield$_this$sendGrin3.requestToken;
                  if (requestToken) {
                    _context4.next = 7;
                    break;
                  }
                  throw new ProviderError('No request token', 4900);
                case 7:
                  _context4.next = 9;
                  return _this.waitGrinderyRpcProviderRequest(requestToken);
                case 9:
                  return _context4.abrupt("return", _context4.sent);
                case 12:
                  _context4.prev = 12;
                  _context4.t0 = _context4["catch"](0);
                  throw _this.createProviderRpcError(_context4.t0);
                case 15:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, null, [[0, 12]]);
          }));
          function execute(_x4) {
            return _execute4.apply(this, arguments);
          }
          return execute;
        }()
      }
    });
    return _this;
  }
  _inheritsLoose(GrinderyWalletProvider, _Provider);
  return GrinderyWalletProvider;
}(Provider);

var GrinderyWalletSDK = /*#__PURE__*/function () {
  function GrinderyWalletSDK() {
    this.provider = this.getWeb3Provider();
  }
  var _proto = GrinderyWalletSDK.prototype;
  _proto.getWeb3Provider = function getWeb3Provider() {
    var _window$ethereum;
    var provider = (_window$ethereum = window.ethereum) == null || (_window$ethereum = _window$ethereum.providers) == null ? void 0 : _window$ethereum.find(function (provider) {
      return provider instanceof GrinderyWalletProvider && provider.isGrinderyWallet;
    });
    if (!provider && window.ethereum instanceof GrinderyWalletProvider && window.ethereum.isGrinderyWallet) {
      provider = window.ethereum;
    }
    if (!provider) {
      provider = new GrinderyWalletProvider();
    }
    return provider;
  };
  return GrinderyWalletSDK;
}();

function init() {
  var _window$Grindery;
  if (!((_window$Grindery = window.Grindery) != null && _window$Grindery.WalletSDK) || !(window.Grindery.WalletSDK instanceof GrinderyWalletSDK)) {
    window.Grindery = _extends({}, window.Grindery || {}, {
      WalletSDK: new GrinderyWalletSDK()
    });
  }
}
// Initialize the SDK when the page is loaded
init();
//# sourceMappingURL=grindery-wallet-sdk.esm.js.map

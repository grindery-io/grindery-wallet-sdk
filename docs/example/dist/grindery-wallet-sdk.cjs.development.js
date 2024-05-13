'use strict';

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
 * @summary Generates a Version 4 (pseudorandom) UUID
 * @returns {string} The UUID
 */
var uuid = function uuid() {
  var d = '';
  while (d.length < 32) d += Math.random().toString(16).substr(2);
  var vr = (parseInt(d.substr(16, 1), 16) & 0x3 | 0x8).toString(16);
  return d.substr(0, 8) + "-" + d.substr(8, 4) + "-4" + d.substr(13, 3) + "-" + vr + d.substr(17, 3) + "-" + d.substr(20, 12);
};

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
 * @since 0.1.0
 */
var WalletProviderEventEmitter = /*#__PURE__*/function () {
  function WalletProviderEventEmitter() {
    /**
     * @summary A map of events and their listeners
     * @public
     */
    this.events = void 0;
    this.events = new Map();
  }
  /**
   * @summary Adds a listener to the event
   * @public
   * @param {string} event Event name
   * @param {Function} callback Callback function
   * @returns {EventEmitter} The instance of the class itself
   */
  var _proto = WalletProviderEventEmitter.prototype;
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
  return WalletProviderEventEmitter;
}();

var LOCALSTORAGE_KEY = 'GrinderyWalletProvider';
var ProviderStorageKeys;
(function (ProviderStorageKeys) {
  ProviderStorageKeys["pairingToken"] = "pairingToken";
  ProviderStorageKeys["sessionId"] = "sessionId";
  ProviderStorageKeys["connectUrl"] = "connectUrl";
  ProviderStorageKeys["connectUrlBrowser"] = "connectUrlBrowser";
  ProviderStorageKeys["shortToken"] = "shortToken";
  ProviderStorageKeys["clientId"] = "clientId";
})(ProviderStorageKeys || (ProviderStorageKeys = {}));
/**
 * @summary A local storage class for the provider
 * @since 0.1.0
 * @extends WalletProviderEventEmitter
 */
var WalletProviderLocalStorage = /*#__PURE__*/function (_WalletProviderEventE) {
  function WalletProviderLocalStorage() {
    return _WalletProviderEventE.apply(this, arguments) || this;
  }
  _inheritsLoose(WalletProviderLocalStorage, _WalletProviderEventE);
  var _proto = WalletProviderLocalStorage.prototype;
  /**
   * @summary Gets the value of the storage by the key
   * @protected
   * @param {ProviderStorageKey} key Provider storage key
   * @returns {string} The value of the storage by the key
   */
  _proto.getStorageValue = function getStorageValue(key) {
    var value = this.getStorage()[key] || '';
    return value;
  }
  /**
   * @summary Sets the value of the storage by the key
   * @protected
   * @param {ProviderStorageKey} key Provider storage key
   * @param {string} value The value to set
   * @returns {void}
   */;
  _proto.setStorageValue = function setStorageValue(key, value) {
    var storage = this.getStorage();
    storage[key] = value;
    this.saveStorage(storage);
    return value;
  }
  /**
   * @summary Clears the storage
   * @protected
   * @returns {void}
   */;
  _proto.clearStorage = function clearStorage() {
    this.saveStorage({
      clientId: this.getStorage().clientId || uuid()
    });
  }
  /**
   * @summary Gets the provider storage
   * @returns {ProviderStorage} The provider storage
   */;
  _proto.getStorage = function getStorage() {
    try {
      return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '{}');
    } catch (error) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({}));
      throw new Error('Error parsing storage');
    }
  }
  /**
   * @summary Saves the provider storage
   * @param {ProviderStorage} storage Provider storage object
   */;
  _proto.saveStorage = function saveStorage(storage) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storage));
  };
  return WalletProviderLocalStorage;
}(WalletProviderEventEmitter);

/**
 * @summary Error class for WalletProvider
 * @since 0.1.0
 * @extends Error
 */
var WalletProviderError = /*#__PURE__*/function (_Error) {
  function WalletProviderError(message, code, data) {
    var _this;
    _this = _Error.call(this, message) || this;
    _this.name = 'GrinderyWalletProviderError';
    _this.code = void 0;
    _this.data = void 0;
    _this.code = code;
    _this.data = data;
    return _this;
  }
  _inheritsLoose(WalletProviderError, _Error);
  return WalletProviderError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var WalletProviderErrors = {
  PairingFailed: /*#__PURE__*/new WalletProviderError('Pairing failed', 4900),
  Disconnected: /*#__PURE__*/new WalletProviderError('Disconnected', 4900),
  UnsupportedMethod: /*#__PURE__*/new WalletProviderError('Unsupported Method', 4200),
  Unauthorized: /*#__PURE__*/new WalletProviderError('Unauthorized', 4900),
  NoResult: /*#__PURE__*/new WalletProviderError('No result', 4900),
  NoAppId: /*#__PURE__*/new WalletProviderError('App ID is required', 4900)
};

/**
 * @summary The Grindery RPC API method names
 */
var GrinderyRpcMethodNames;
(function (GrinderyRpcMethodNames) {
  GrinderyRpcMethodNames["requestPairing"] = "requestPairing";
  GrinderyRpcMethodNames["waitForPairingResult"] = "waitForPairingResult";
  GrinderyRpcMethodNames["request"] = "request";
  GrinderyRpcMethodNames["waitForRequestResult"] = "waitForRequestResult";
  GrinderyRpcMethodNames["disconnect"] = "disconnect";
})(GrinderyRpcMethodNames || (GrinderyRpcMethodNames = {}));
/**
 * @summary The base wallet provider class
 * @since 0.1.0
 * @extends WalletProviderLocalStorage
 */
var WalletProvider = /*#__PURE__*/function (_WalletProviderLocalS) {
  function WalletProvider() {
    var _this;
    _this = _WalletProviderLocalS.call(this) || this;
    /**
     * @summary The application ID.
     * @protected
     */
    _this.appId = '';
    /**
     * @summary The chain ID in CAIP-2 format; e.g. "eip155:1".
     * @protected
     */
    _this.chainId = 'eip155:137';
    /**
     * @summary Client id
     * @protected
     */
    _this.clientId = _this.getStorageValue('clientId') || _this.setStorageValue('clientId', uuid());
    /**
     * @summary The list of supported provider methods.
     * @protected
     */
    _this.methods = {};
    /**
     * @summary The user's wallet addresses list.
     * @protected
     */
    _this.accounts = [];
    _this.injectProvider();
    return _this;
  }
  /**
   * @public
   * @returns {boolean} True if the provider is connected to the server.
   */
  _inheritsLoose(WalletProvider, _WalletProviderLocalS);
  var _proto = WalletProvider.prototype;
  _proto.isConnected = function isConnected() {
    return !!this.chainId;
  }
  /**
   * @public
   * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet.
   */;
  _proto.isWalletConnected = function isWalletConnected() {
    return this.isConnected() && !!this.getStorageValue(ProviderStorageKeys.sessionId);
  }
  /**
   * @public
   * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet pairing is in progress (pending).
   */;
  _proto.isWalletConnectionPending = function isWalletConnectionPending() {
    return this.isConnected() && !!this.getStorageValue(ProviderStorageKeys.pairingToken) && !this.getStorageValue(ProviderStorageKeys.sessionId);
  }
  /**
   * @summary Gets the connected chain ID in hex format
   * @public
   * @returns {ChainId} The chain ID in hex format
   */;
  _proto.getChain = function getChain() {
    return "0x" + parseFloat(this.chainId.split(':')[1]).toString(16);
  }
  /**
   * @summary Gets the connected user's wallet address
   * @public
   * @returns {Address} The ethereum wallet address
   */;
  _proto.getAddress = function getAddress() {
    return this.accounts[0] || '';
  }
  /**
   * @summary Sets the application ID
   * @public
   * @param {string} appId The application ID
   * @returns {string} The application ID
   */;
  _proto.setAppId = function setAppId(appId) {
    this.appId = appId;
    return this.appId;
  }
  /**
   * @summary Sends a request to the provider
   * @public
   * @param {RequestArguments} args Request arguments
   * @param {string} args.method The method name
   * @param {RequestArgumentsParams} args.params The method parameters
   * @returns {T} The result of the request
   */;
  _proto.request =
  /*#__PURE__*/
  function () {
    var _request = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
      var method, params, _this$methods$method, _this$methods$method2;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            method = _ref.method, params = _ref.params;
            if (this.chainId) {
              _context.next = 4;
              break;
            }
            this.emit(ProviderEvents.disconnect, WalletProviderErrors.Disconnected);
            throw WalletProviderErrors.Disconnected;
          case 4:
            if (this.methods[method]) {
              _context.next = 6;
              break;
            }
            throw WalletProviderErrors.UnsupportedMethod;
          case 6:
            _context.prev = 6;
            if (!((_this$methods$method = this.methods[method]) != null && _this$methods$method.sessionRequired && !this.isWalletConnected())) {
              _context.next = 9;
              break;
            }
            throw WalletProviderErrors.Unauthorized;
          case 9:
            _context.next = 11;
            return (_this$methods$method2 = this.methods[method]) == null ? void 0 : _this$methods$method2.execute(params);
          case 11:
            return _context.abrupt("return", _context.sent);
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](6);
            throw this.createProviderRpcError(_context.t0);
          case 17:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[6, 14]]);
    }));
    function request(_x) {
      return _request.apply(this, arguments);
    }
    return request;
  }()
  /**
   * @summary Sends a provider request to the Grindery RPC API and waits for the result.
   * @public
   * @param {GrinderyRpcProviderRequestMethodName} method Provider request method name
   * @param {Array} params Provider request parameters
   * @param {number} timeout Optional. The time in milliseconds to wait for the request result. Default is 30000.
   * @returns The result of the provider request
   */
  ;
  _proto.sendAndWaitGrinderyRpcProviderRequest =
  /*#__PURE__*/
  function () {
    var _sendAndWaitGrinderyRpcProviderRequest = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(method, params, timeout) {
      var request;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return this.sendGrinderyRpcProviderRequest(method, params);
          case 2:
            request = _context2.sent;
            _context2.next = 5;
            return this.waitGrinderyRpcProviderRequest(request.requestToken, timeout);
          case 5:
            return _context2.abrupt("return", _context2.sent);
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function sendAndWaitGrinderyRpcProviderRequest(_x2, _x3, _x4) {
      return _sendAndWaitGrinderyRpcProviderRequest.apply(this, arguments);
    }
    return sendAndWaitGrinderyRpcProviderRequest;
  }();
  _proto.setAccounts = function setAccounts(accounts) {
    if (JSON.stringify(accounts) !== JSON.stringify(this.accounts)) {
      this.emit(ProviderEvents.accountsChanged, accounts);
    }
    this.accounts = accounts;
    return this.accounts;
  }
  /**
   * @summary Registers the provider methods.
   * @protected
   * @param {ProviderMethods} methods A map of supported provider methods.
   * @returns {void}
   */;
  _proto.registerProviderMethods = function registerProviderMethods(methods) {
    this.methods = methods;
  }
  /**
   * @summary Sends a provider request to the Grindery RPC API.
   * @protected
   * @param {GrinderyRpcProviderRequestMethodName} method Provider request method name
   * @param {Array} params Provider request parameters
   * @returns {ProviderRequestResult} The request token to use in the `waitGrinderyRpcProviderRequest` method
   */;
  _proto.sendGrinderyRpcProviderRequest =
  /*#__PURE__*/
  function () {
    var _sendGrinderyRpcProviderRequest = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(method, params) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (this.getStorageValue(ProviderStorageKeys.sessionId)) {
              _context3.next = 2;
              break;
            }
            throw WalletProviderErrors.Unauthorized;
          case 2:
            _context3.prev = 2;
            _context3.next = 5;
            return this.sendGrinderyRpcApiRequest(GrinderyRpcMethodNames.request, {
              sessionId: this.getStorageValue(ProviderStorageKeys.sessionId),
              scope: this.chainId,
              request: {
                method: method,
                params: params
              }
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
    function sendGrinderyRpcProviderRequest(_x5, _x6) {
      return _sendGrinderyRpcProviderRequest.apply(this, arguments);
    }
    return sendGrinderyRpcProviderRequest;
  }()
  /**
   * @summary Waits for the result of the provider request.
   * @protected
   * @param {RequestToken} requestToken A token to identify provider request. Recieved in the results of `sendGrinderyRpcProviderRequest` method.
   * @param {number} timeout Optional. The time in milliseconds to wait for the request result. Default is 30000.
   * @returns The result of the provider request
   */
  ;
  _proto.waitGrinderyRpcProviderRequest =
  /*#__PURE__*/
  function () {
    var _waitGrinderyRpcProviderRequest = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(requestToken, timeout) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            if (this.getStorageValue(ProviderStorageKeys.sessionId)) {
              _context4.next = 2;
              break;
            }
            throw WalletProviderErrors.Unauthorized;
          case 2:
            _context4.prev = 2;
            _context4.next = 5;
            return this.sendGrinderyRpcApiRequest(GrinderyRpcMethodNames.waitForRequestResult, {
              requestToken: requestToken,
              timeout: timeout
            });
          case 5:
            return _context4.abrupt("return", _context4.sent);
          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](2);
            throw this.createProviderRpcError(_context4.t0);
          case 11:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this, [[2, 8]]);
    }));
    function waitGrinderyRpcProviderRequest(_x7, _x8) {
      return _waitGrinderyRpcProviderRequest.apply(this, arguments);
    }
    return waitGrinderyRpcProviderRequest;
  }()
  /**
   * @summary Sends a request to the Grindery Walletconnect RPC API.
   * @protected
   * @param {GrinderyRpcMethodName} method Request method name
   * @param {RequestArgumentsParams} params Request parameters
   * @returns {T} The result of the request
   */
  ;
  _proto.sendGrinderyRpcApiRequest =
  /*#__PURE__*/
  function () {
    var _sendGrinderyRpcApiRequest = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(method, params) {
      var response, data;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return fetch('https://walletconnect-api.grindery.com', {
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
            response = _context5.sent;
            _context5.next = 6;
            return response.json();
          case 6:
            data = _context5.sent;
            if (!data.error) {
              _context5.next = 9;
              break;
            }
            throw new WalletProviderError(data.error.message, data.error.code);
          case 9:
            if (data.result) {
              _context5.next = 11;
              break;
            }
            throw WalletProviderErrors.NoResult;
          case 11:
            return _context5.abrupt("return", data.result);
          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5["catch"](0);
            throw this.createProviderRpcError(_context5.t0);
          case 17:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this, [[0, 14]]);
    }));
    function sendGrinderyRpcApiRequest(_x9, _x10) {
      return _sendGrinderyRpcApiRequest.apply(this, arguments);
    }
    return sendGrinderyRpcApiRequest;
  }()
  /**
   * @summary Creates a provider error from an unknown error
   * @protected
   * @param {unknown} error Optional. Error object.
   * @returns {WalletProviderError} The provider error
   */
  ;
  _proto.createProviderRpcError = function createProviderRpcError(error) {
    var errorResponse;
    if (error instanceof WalletProviderError) {
      errorResponse = new WalletProviderError(error.message || 'Unknown error', error.code || 4900, error.data);
    } else if (error instanceof Error) {
      errorResponse = new WalletProviderError(error.message || 'Unknown error', 4900, error);
    } else {
      errorResponse = new WalletProviderError('Unknown error', 4900, error);
    }
    return errorResponse;
  }
  /**
   * @summary Injects the provider into the window object
   * @private
   * @returns {void}
   */;
  _proto.injectProvider = function injectProvider() {
    if (!window.ethereum) {
      window.ethereum = this;
    } else {
      if (window.ethereum.providers && Array.isArray(window.ethereum.providers)) {
        window.ethereum.providers.push(this);
      } else {
        window.ethereum.providers = [window.ethereum, this];
      }
    }
  };
  return WalletProvider;
}(WalletProviderLocalStorage);

/**
 * @summary The Grindery wallet provider method names
 */
var GrinderyWalletProviderMethodNames;
(function (GrinderyWalletProviderMethodNames) {
  GrinderyWalletProviderMethodNames["eth_requestAccounts"] = "eth_requestAccounts";
  GrinderyWalletProviderMethodNames["eth_accounts"] = "eth_accounts";
  GrinderyWalletProviderMethodNames["personal_sign"] = "personal_sign";
  GrinderyWalletProviderMethodNames["eth_sendTransaction"] = "eth_sendTransaction";
  GrinderyWalletProviderMethodNames["gws_disconnect"] = "gws_disconnect";
})(GrinderyWalletProviderMethodNames || (GrinderyWalletProviderMethodNames = {}));
/**
 * @summary The Grindery Wallet Ethereum Injected Provider Class.
 * @extends WalletProvider
 * @implements ProviderInterface
 */
var GrinderyWalletProvider = /*#__PURE__*/function (_WalletProvider) {
  function GrinderyWalletProvider() {
    var _this$registerProvide;
    var _this;
    _this = _WalletProvider.call(this) || this;
    /**
     * @summary Indicates that the provider is a Grindery Wallet.
     */
    _this.isGrinderyWallet = true;
    _this.registerProviderMethods((_this$registerProvide = {}, _this$registerProvide[GrinderyWalletProviderMethodNames.eth_requestAccounts] = {
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
                  method: GrinderyWalletProviderMethodNames.eth_accounts,
                  params: params || []
                });
              case 4:
                return _context.abrupt("return", _context.sent);
              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                _this.setStorageValue(ProviderStorageKeys.sessionId, '');
                // skip failed request and continue with pairing
              case 10:
                if (!_this.isWalletConnectionPending()) {
                  _context.next = 27;
                  break;
                }
                _context.prev = 11;
                _context.next = 14;
                return _this.sendGrinderyRpcApiRequest(GrinderyRpcMethodNames.waitForPairingResult, {
                  pairingToken: _this.getStorageValue(ProviderStorageKeys.pairingToken)
                });
              case 14:
                pairResult = _context.sent;
                _this.clearStorage();
                _this.setStorageValue(ProviderStorageKeys.sessionId, pairResult.session.sessionId);
                if (pairResult.session.sessionId) {
                  _context.next = 19;
                  break;
                }
                throw WalletProviderErrors.PairingFailed;
              case 19:
                _context.next = 21;
                return _this.request({
                  method: GrinderyWalletProviderMethodNames.eth_accounts,
                  params: params || []
                });
              case 21:
                return _context.abrupt("return", _context.sent);
              case 24:
                _context.prev = 24;
                _context.t1 = _context["catch"](11);
                _this.clearStorage();
                // skip failed request and continue with pairing
              case 27:
                _context.prev = 27;
                _context.next = 30;
                return _this.sendGrinderyRpcApiRequest(GrinderyRpcMethodNames.requestPairing, {
                  appId: _this.appId,
                  clientId: _this.clientId
                });
              case 30:
                result = _context.sent;
                if (!(!result.pairingToken || !result.connectUrl)) {
                  _context.next = 33;
                  break;
                }
                throw WalletProviderErrors.PairingFailed;
              case 33:
                _this.setStorageValue(ProviderStorageKeys.pairingToken, result.pairingToken);
                _this.setStorageValue(ProviderStorageKeys.connectUrl, result.connectUrl);
                _this.setStorageValue(ProviderStorageKeys.connectUrlBrowser, result.connectUrlBrowser);
                _this.setStorageValue(ProviderStorageKeys.shortToken, result.shortToken);
                _this.emit(ProviderEvents.pair, {
                  shortToken: result.shortToken,
                  connectUrl: result.connectUrl,
                  connectUrlBrowser: result.connectUrlBrowser
                });
                _context.next = 40;
                return _this.sendGrinderyRpcApiRequest(GrinderyRpcMethodNames.waitForPairingResult, {
                  pairingToken: result.pairingToken
                });
              case 40:
                _pairResult = _context.sent;
                _this.setStorageValue(ProviderStorageKeys.sessionId, _pairResult.session.sessionId);
                if (_pairResult.session.sessionId) {
                  _context.next = 44;
                  break;
                }
                throw WalletProviderErrors.PairingFailed;
              case 44:
                _this.setStorageValue(ProviderStorageKeys.pairingToken, '');
                _this.setStorageValue(ProviderStorageKeys.connectUrl, '');
                _this.setStorageValue(ProviderStorageKeys.connectUrlBrowser, '');
                _this.setStorageValue(ProviderStorageKeys.shortToken, '');
                _context.next = 50;
                return _this.request({
                  method: GrinderyWalletProviderMethodNames.eth_accounts,
                  params: params || []
                });
              case 50:
                return _context.abrupt("return", _context.sent);
              case 53:
                _context.prev = 53;
                _context.t2 = _context["catch"](27);
                throw _this.createProviderRpcError(_context.t2);
              case 56:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[1, 7], [11, 24], [27, 53]]);
        }));
        function execute(_x) {
          return _execute.apply(this, arguments);
        }
        return execute;
      }()
    }, _this$registerProvide[GrinderyWalletProviderMethodNames.eth_accounts] = {
      sessionRequired: true,
      execute: function () {
        var _execute2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(params) {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.t0 = _this;
                _context2.next = 4;
                return _this.sendAndWaitGrinderyRpcProviderRequest(GrinderyWalletProviderMethodNames.eth_accounts, params ? Array.isArray(params) ? params : [params] : []);
              case 4:
                _context2.t1 = _context2.sent;
                return _context2.abrupt("return", _context2.t0.setAccounts.call(_context2.t0, _context2.t1));
              case 8:
                _context2.prev = 8;
                _context2.t2 = _context2["catch"](0);
                throw _this.createProviderRpcError(_context2.t2);
              case 11:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[0, 8]]);
        }));
        function execute(_x2) {
          return _execute2.apply(this, arguments);
        }
        return execute;
      }()
    }, _this$registerProvide[GrinderyWalletProviderMethodNames.eth_sendTransaction] = {
      sessionRequired: true,
      execute: function () {
        var _execute3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(params) {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this.sendAndWaitGrinderyRpcProviderRequest(GrinderyWalletProviderMethodNames.eth_sendTransaction, params ? Array.isArray(params) ? params : [params] : []);
              case 2:
                return _context3.abrupt("return", _context3.sent);
              case 3:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }));
        function execute(_x3) {
          return _execute3.apply(this, arguments);
        }
        return execute;
      }()
    }, _this$registerProvide[GrinderyWalletProviderMethodNames.personal_sign] = {
      sessionRequired: true,
      execute: function () {
        var _execute4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(params) {
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this.sendAndWaitGrinderyRpcProviderRequest(GrinderyWalletProviderMethodNames.personal_sign, params ? Array.isArray(params) ? params : [params] : []);
              case 2:
                return _context4.abrupt("return", _context4.sent);
              case 3:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }));
        function execute(_x4) {
          return _execute4.apply(this, arguments);
        }
        return execute;
      }()
    }, _this$registerProvide[GrinderyWalletProviderMethodNames.gws_disconnect] = {
      sessionRequired: true,
      execute: function () {
        var _execute5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          var result;
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _this.sendGrinderyRpcApiRequest(GrinderyRpcMethodNames.disconnect, {
                  sessionToken: _this.getStorageValue(ProviderStorageKeys.sessionId)
                });
              case 3:
                result = _context5.sent;
                _this.emit(ProviderEvents.disconnect, WalletProviderErrors.Disconnected);
                _this.clearStorage();
                _this.setAccounts([]);
                return _context5.abrupt("return", result);
              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](0);
                throw _this.createProviderRpcError(_context5.t0);
              case 13:
              case "end":
                return _context5.stop();
            }
          }, _callee5, null, [[0, 10]]);
        }));
        function execute() {
          return _execute5.apply(this, arguments);
        }
        return execute;
      }()
    }, _this$registerProvide));
    window.addEventListener('load', function () {
      _this.emit(ProviderEvents.connect, _this.getChain());
      _this.restorePairing();
      _this.restoreSession();
    });
    return _this;
  }
  /**
   * @summary Restores the pairing process if pairing token is stored in the local storage
   * @private
   * @returns {void}
   */
  _inheritsLoose(GrinderyWalletProvider, _WalletProvider);
  var _proto = GrinderyWalletProvider.prototype;
  _proto.restorePairing =
  /*#__PURE__*/
  function () {
    var _restorePairing = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var pairingToken, sessionId, _pairResult$session, pairResult, accounts;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            pairingToken = this.getStorageValue(ProviderStorageKeys.pairingToken);
            sessionId = this.getStorageValue(ProviderStorageKeys.sessionId);
            if (!(pairingToken && !sessionId)) {
              _context6.next = 19;
              break;
            }
            _context6.prev = 3;
            _context6.next = 6;
            return this.sendGrinderyRpcApiRequest(GrinderyRpcMethodNames.waitForPairingResult, {
              pairingToken: pairingToken
            });
          case 6:
            pairResult = _context6.sent;
            this.clearStorage();
            this.setStorageValue(ProviderStorageKeys.sessionId, pairResult.session.sessionId);
            if (pairResult.session.sessionId) {
              _context6.next = 11;
              break;
            }
            throw WalletProviderErrors.PairingFailed;
          case 11:
            accounts = (((_pairResult$session = pairResult.session) == null || (_pairResult$session = _pairResult$session.namespaces) == null || (_pairResult$session = _pairResult$session["eip155"]) == null ? void 0 : _pairResult$session.accounts) || []).map(function (account) {
              return account.includes(':') ? account.split(':')[2] || '' : account;
            });
            this.setAccounts(accounts);
            _context6.next = 19;
            break;
          case 15:
            _context6.prev = 15;
            _context6.t0 = _context6["catch"](3);
            this.setAccounts([]);
            this.clearStorage();
          case 19:
          case "end":
            return _context6.stop();
        }
      }, _callee6, this, [[3, 15]]);
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
    var _restoreSession = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var pairingToken, sessionId;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            pairingToken = this.getStorageValue(ProviderStorageKeys.pairingToken);
            sessionId = this.getStorageValue(ProviderStorageKeys.sessionId);
            if (!(sessionId && !pairingToken)) {
              _context7.next = 12;
              break;
            }
            _context7.prev = 3;
            _context7.next = 6;
            return this.request({
              method: GrinderyWalletProviderMethodNames.eth_requestAccounts
            });
          case 6:
            _context7.next = 12;
            break;
          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](3);
            this.setAccounts([]);
            this.clearStorage();
          case 12:
          case "end":
            return _context7.stop();
        }
      }, _callee7, this, [[3, 8]]);
    }));
    function restoreSession() {
      return _restoreSession.apply(this, arguments);
    }
    return restoreSession;
  }();
  return GrinderyWalletProvider;
}(WalletProvider);

/**
 * @summary The Grindery Wallet SDK class
 * @since 0.1.0
 *
 * @example
 * ```typescript
 * const grinderyWalletSDK = new GrinderyWalletSDK({ appId: 'your-app-id' });
 * ```
 */
var GrinderyWalletSDK = /*#__PURE__*/function () {
  function GrinderyWalletSDK(_ref) {
    var appId = _ref.appId;
    /**
     * @summary The provider instance
     * @public
     */
    this.provider = void 0;
    this.provider = this.getWeb3Provider();
    this.setAppId(appId);
    this.provider.on(ProviderEvents.pair, this.handlePairing);
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
  var _proto = GrinderyWalletSDK.prototype;
  _proto.isConnected = function isConnected() {
    return this.provider.isConnected();
  }
  /**
   * @summary Checks if the provider is connected to the server and the Grindery Wallet
   * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet.
   */;
  _proto.isWalletConnected = function isWalletConnected() {
    return this.provider.isWalletConnected();
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
              method: GrinderyWalletProviderMethodNames.eth_requestAccounts
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
              method: GrinderyWalletProviderMethodNames.gws_disconnect
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
   * @summary Sets the app id
   * @public
   * @since 0.1.0
   * @param {string} appId The app id
   * @returns {void}
   */
  ;
  _proto.setAppId = function setAppId(appId) {
    this.provider.setAppId(appId);
  }
  /**
   * @summary Sends a transaction request to the Grindery Wallet
   * @public
   * @since 0.1.0
   * @param {object} params The transaction parameters
   * @param {string} params.to The recipient address
   * @param {string} [params.value] The amount to send in wei
   * @param {string} [params.data] The data to send
   * @returns {Promise<string[]>} Array with transaction hash string
   */;
  _proto.sendTransaction =
  /*#__PURE__*/
  function () {
    var _sendTransaction = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(params) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return this.provider.request({
              method: GrinderyWalletProviderMethodNames.eth_sendTransaction,
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
              method: GrinderyWalletProviderMethodNames.personal_sign,
              params: [message, this.provider.getAddress()]
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
   * @summary Adds a listener to the event
   * @public
   * @param {string} event Event name
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
   * @param {string} event Event name
   * @param {Function} callback Callback function
   * @returns {EventEmitter} The instance of the class itself
   */;
  _proto.removeListener = function removeListener(event, callback) {
    this.provider.removeListener(event, callback);
    return this;
  }
  /**
   * @summary Gets the Grindery Wallet ethereum provider
   * @returns {GrinderyWalletProvider} The Grindery Wallet ethereum provider
   */;
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
  }
  /**
   * @summary Handles the pairing request, by opening the Grindery Wallet
   * @private
   * @param ProviderRequestPairingResult
   * @returns {void}
   */;
  _proto.handlePairing = function handlePairing(_ref2) {
    var _window$Telegram;
    var shortToken = _ref2.shortToken,
      connectUrlBrowser = _ref2.connectUrlBrowser;
    var WebApp = (_window$Telegram = window.Telegram) == null ? void 0 : _window$Telegram.WebApp;
    var redirectUrl = "https://walletconnect.grindery.com/connect/wc?uri=" + shortToken;
    if (WebApp && WebApp.openTelegramLink && WebApp.platform && WebApp.platform !== 'unknown') {
      WebApp.openTelegramLink(connectUrlBrowser);
      if (WebApp.close) {
        window.Telegram.WebApp.close();
      }
    } else {
      window.open(redirectUrl, '_blank');
    }
  };
  return GrinderyWalletSDK;
}();

/**
 * @summary Get the app id from the script tag or window object
 * @returns {string} The app id
 */
var getAppId = function getAppId() {
  var _window$Grindery;
  var appId = '';
  var elements = document.querySelectorAll('[data-app-id]');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var value = element.getAttribute('data-app-id');
    var src = element.getAttribute('src');
    var isGrinderySrc = src && src.includes('grindery-wallet-sdk');
    if (value && isGrinderySrc) {
      appId = value;
    }
  }
  if ((_window$Grindery = window.Grindery) != null && _window$Grindery.appId) {
    appId = window.Grindery.appId;
  }
  return appId;
};

function init() {
  var _window$Grindery;
  if (!((_window$Grindery = window.Grindery) != null && _window$Grindery.WalletSDK) || !(window.Grindery.WalletSDK instanceof GrinderyWalletSDK)) {
    window.Grindery = _extends({}, window.Grindery || {}, {
      WalletSDK: new GrinderyWalletSDK({
        appId: getAppId()
      })
    });
  }
}
// Initialize the SDK
init();
//# sourceMappingURL=grindery-wallet-sdk.cjs.development.js.map

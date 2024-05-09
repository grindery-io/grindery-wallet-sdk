(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

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
   * @summary Error class for GrinderyWalletProvider
   * @since 0.1.0
   * @extends Error
   */
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
    }
    /**
     * @summary Clears the storage
     * @protected
     * @returns {void}
     */;
    _proto.clearStorage = function clearStorage() {
      this.saveStorage({});
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
    return ProviderLocalStorage;
  }(ProviderEventEmitter);

  /**
   * @summary The provider base class
   * @since 0.1.0
   * @extends ProviderLocalStorage
   */
  var ProviderBase = /*#__PURE__*/function (_ProviderLocalStorage) {
    function ProviderBase() {
      var _this;
      _this = _ProviderLocalStorage.call(this) || this;
      /**
       * @summary The application ID.
       * @protected
       */
      _this.appId = document.title || 'Grindery Wallet Provider';
      /**
       * @summary The chain ID in CAIP-2 format; e.g. "eip155:1".
       * @protected
       */
      _this.chainId = 'eip155:137';
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
    _inheritsLoose(ProviderBase, _ProviderLocalStorage);
    var _proto = ProviderBase.prototype;
    _proto.isConnected = function isConnected() {
      return !!this.chainId;
    }
    /**
     * @public
     * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet.
     */;
    _proto.isWalletConnected = function isWalletConnected() {
      return this.isConnected() && !!this.getStorageValue('sessionId');
    }
    /**
     * @public
     * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet pairing is in progress (pending).
     */;
    _proto.isWalletConnectionPending = function isWalletConnectionPending() {
      return this.isConnected() && !!this.getStorageValue('pairingToken');
    }
    /**
     * @summary Gets the connected chain ID in hex format
     * @public
     * @returns {string} The chain ID in hex format
     */;
    _proto.getChain = function getChain() {
      return "0x" + parseFloat(this.chainId.split(':')[1]).toString(16);
    }
    /**
     * @summary Gets the connected user's wallet address
     * @public
     * @returns {string} The ethereum wallet address
     */;
    _proto.getAddress = function getAddress() {
      return this.accounts[0] || '';
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
        var method, params;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              method = _ref.method, params = _ref.params;
              if (this.chainId) {
                _context.next = 4;
                break;
              }
              this.emit('disconnect', new ProviderError('Disconnected', 4900));
              throw new ProviderError('Disconnected', 4900);
            case 4:
              if (this.methods[method]) {
                _context.next = 6;
                break;
              }
              throw new ProviderError('Unsupported Method', 4200);
            case 6:
              _context.prev = 6;
              if (!(this.methods[method].sessionRequired && !this.isWalletConnected())) {
                _context.next = 9;
                break;
              }
              throw new ProviderError('Unauthorized', 4900);
            case 9:
              _context.next = 11;
              return this.methods[method].execute(params);
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
    }()
    /**
     * @summary Registers the provider methods.
     * @protected
     * @param {ProviderMethods} methods A map of supported provider methods.
     * @returns {void}
     */
    ;
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
              if (this.getStorageValue('sessionId')) {
                _context3.next = 2;
                break;
              }
              throw new ProviderError('Unauthorized', 4900);
            case 2:
              _context3.prev = 2;
              _context3.next = 5;
              return this.sendGrinderyRpcApiRequest('checkout_request', {
                sessionId: this.getStorageValue('sessionId'),
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
     * @param {string} requestToken A token to identify provider request. Recieved in the results of `sendGrinderyRpcProviderRequest` method.
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
              if (this.getStorageValue('sessionId')) {
                _context4.next = 2;
                break;
              }
              throw new ProviderError('Unauthorized', 4900);
            case 2:
              _context4.prev = 2;
              _context4.next = 5;
              return this.sendGrinderyRpcApiRequest('checkout_waitForRequestResult', {
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
                  method: method,
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
              throw new ProviderError(data.error.message, data.error.code);
            case 9:
              if (data.result) {
                _context5.next = 11;
                break;
              }
              throw new ProviderError('No result', 4900);
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
     * @returns {ProviderError} The provider error
     */
    ;
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
    return ProviderBase;
  }(ProviderLocalStorage);

  /**
   * @summary The Grindery Wallet Ethereum Injected Provider Class.
   * @extends ProviderBase
   * @implements ProviderInterface
   */
  var GrinderyWalletProvider = /*#__PURE__*/function (_ProviderBase) {
    function GrinderyWalletProvider() {
      var _this;
      _this = _ProviderBase.call(this) || this;
      /**
       * @summary Indicates that the provider is a Grindery Wallet.
       */
      _this.isGrinderyWallet = true;
      _this.registerProviderMethods({
        eth_requestAccounts: {
          sessionRequired: false,
          execute: function () {
            var _execute = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
              var accounts, _pairResult$session, pairResult, _accounts, _pairResult$session2, result, _pairResult, _accounts2;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (!_this.isWalletConnected()) {
                      _context.next = 13;
                      break;
                    }
                    _context.prev = 1;
                    _context.next = 4;
                    return _this.request({
                      method: 'eth_accounts',
                      params: params || []
                    });
                  case 4:
                    accounts = _context.sent;
                    _this.accounts = accounts;
                    _this.emit('accountsChanged', {
                      accounts: accounts
                    });
                    return _context.abrupt("return", accounts);
                  case 10:
                    _context.prev = 10;
                    _context.t0 = _context["catch"](1);
                    _this.setStorageValue('sessionId', '');
                    // skip failed request and continue with pairing
                  case 13:
                    if (!_this.isWalletConnectionPending()) {
                      _context.next = 32;
                      break;
                    }
                    _context.prev = 14;
                    _this.emit('restorePairing', {
                      connectUrl: _this.getStorageValue('connectUrl'),
                      connectUrlBrowser: _this.getStorageValue('connectUrlBrowser')
                    });
                    _context.next = 18;
                    return _this.sendGrinderyRpcApiRequest('checkout_waitForPairingResult', {
                      pairingToken: _this.getStorageValue('pairingToken')
                    });
                  case 18:
                    pairResult = _context.sent;
                    _this.clearStorage();
                    _this.setStorageValue('sessionId', pairResult.session.sessionId);
                    if (pairResult.session.sessionId) {
                      _context.next = 23;
                      break;
                    }
                    throw new ProviderError('Pairing failed', 4900);
                  case 23:
                    _accounts = (((_pairResult$session = pairResult.session) == null || (_pairResult$session = _pairResult$session.namespaces) == null || (_pairResult$session = _pairResult$session["eip155"]) == null ? void 0 : _pairResult$session.accounts) || []).map(function (account) {
                      return account.includes(':') ? account.split(':')[2] || '' : account;
                    });
                    _this.accounts = _accounts;
                    _this.emit('accountsChanged', {
                      accounts: _accounts
                    });
                    return _context.abrupt("return", []);
                  case 29:
                    _context.prev = 29;
                    _context.t1 = _context["catch"](14);
                    _this.clearStorage();
                    // skip failed request and continue with pairing
                  case 32:
                    _context.prev = 32;
                    _context.next = 35;
                    return _this.sendGrinderyRpcApiRequest('checkout_requestPairing', {
                      appId: _this.appId
                    });
                  case 35:
                    result = _context.sent;
                    if (!(!result.pairingToken || !result.connectUrl)) {
                      _context.next = 38;
                      break;
                    }
                    throw new ProviderError('Pairing failed', 4900);
                  case 38:
                    _this.setStorageValue('pairingToken', result.pairingToken);
                    _this.setStorageValue('connectUrl', result.connectUrl);
                    _this.setStorageValue('connectUrlBrowser', result.connectUrlBrowser);
                    _this.emit('pairing', {
                      connectUrl: result.connectUrl,
                      connectUrlBrowser: result.connectUrlBrowser
                    });
                    _context.next = 44;
                    return _this.sendGrinderyRpcApiRequest('checkout_waitForPairingResult', {
                      pairingToken: result.pairingToken
                    });
                  case 44:
                    _pairResult = _context.sent;
                    _this.setStorageValue('sessionId', _pairResult.session.sessionId);
                    if (_pairResult.session.sessionId) {
                      _context.next = 48;
                      break;
                    }
                    throw new ProviderError('Pairing failed', 4900);
                  case 48:
                    _this.setStorageValue('pairingToken', '');
                    _this.setStorageValue('connectUrl', '');
                    _this.setStorageValue('connectUrlBrowser', '');
                    _accounts2 = (((_pairResult$session2 = _pairResult.session) == null || (_pairResult$session2 = _pairResult$session2.namespaces) == null || (_pairResult$session2 = _pairResult$session2["eip155"]) == null ? void 0 : _pairResult$session2.accounts) || []).map(function (account) {
                      return account.includes(':') ? account.split(':')[2] || '' : account;
                    });
                    _this.accounts = _accounts2;
                    _this.emit('accountsChanged', {
                      accounts: _accounts2
                    });
                    return _context.abrupt("return", _accounts2);
                  case 57:
                    _context.prev = 57;
                    _context.t2 = _context["catch"](32);
                    throw _this.createProviderRpcError(_context.t2);
                  case 60:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[1, 10], [14, 29], [32, 57]]);
            }));
            function execute(_x) {
              return _execute.apply(this, arguments);
            }
            return execute;
          }()
        },
        eth_accounts: {
          sessionRequired: true,
          execute: function () {
            var _execute2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(params) {
              var accounts;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return _this.sendAndWaitGrinderyRpcProviderRequest('eth_accounts', params ? Array.isArray(params) ? params : [params] : []);
                  case 3:
                    accounts = _context2.sent;
                    _this.accounts = accounts;
                    _this.emit('accountsChanged', {
                      accounts: accounts
                    });
                    return _context2.abrupt("return", accounts);
                  case 9:
                    _context2.prev = 9;
                    _context2.t0 = _context2["catch"](0);
                    throw _this.createProviderRpcError(_context2.t0);
                  case 12:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, null, [[0, 9]]);
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
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return _this.sendAndWaitGrinderyRpcProviderRequest('eth_sendTransaction', params ? Array.isArray(params) ? params : [params] : []);
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
        },
        personal_sign: {
          sessionRequired: true,
          execute: function () {
            var _execute4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(params) {
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return _this.sendAndWaitGrinderyRpcProviderRequest('personal_sign', params ? Array.isArray(params) ? params : [params] : []);
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
        }
      });
      window.addEventListener('load', function () {
        _this.emit('connect', {
          chainId: _this.getChain()
        });
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
    _inheritsLoose(GrinderyWalletProvider, _ProviderBase);
    var _proto = GrinderyWalletProvider.prototype;
    _proto.restorePairing =
    /*#__PURE__*/
    function () {
      var _restorePairing = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var pairingToken, sessionId, _pairResult$session3, pairResult, accounts;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              pairingToken = this.getStorageValue('pairingToken');
              sessionId = this.getStorageValue('sessionId');
              if (!(pairingToken && !sessionId)) {
                _context5.next = 21;
                break;
              }
              _context5.prev = 3;
              this.emit('restorePairing', {
                connectUrl: this.getStorageValue('connectUrl'),
                connectUrlBrowser: this.getStorageValue('connectUrlBrowser')
              });
              _context5.next = 7;
              return this.sendGrinderyRpcApiRequest('checkout_waitForPairingResult', {
                pairingToken: pairingToken
              });
            case 7:
              pairResult = _context5.sent;
              this.clearStorage();
              this.setStorageValue('sessionId', pairResult.session.sessionId);
              if (pairResult.session.sessionId) {
                _context5.next = 12;
                break;
              }
              throw new ProviderError('Pairing failed', 4900);
            case 12:
              accounts = (((_pairResult$session3 = pairResult.session) == null || (_pairResult$session3 = _pairResult$session3.namespaces) == null || (_pairResult$session3 = _pairResult$session3["eip155"]) == null ? void 0 : _pairResult$session3.accounts) || []).map(function (account) {
                return account.includes(':') ? account.split(':')[2] || '' : account;
              });
              this.accounts = accounts;
              this.emit('accountsChanged', {
                accounts: accounts
              });
              _context5.next = 21;
              break;
            case 17:
              _context5.prev = 17;
              _context5.t0 = _context5["catch"](3);
              this.accounts = [];
              this.clearStorage();
            case 21:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[3, 17]]);
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
      var _restoreSession = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var pairingToken, sessionId;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              pairingToken = this.getStorageValue('pairingToken');
              sessionId = this.getStorageValue('sessionId');
              if (!(sessionId && !pairingToken)) {
                _context6.next = 12;
                break;
              }
              _context6.prev = 3;
              _context6.next = 6;
              return this.request({
                method: 'eth_requestAccounts'
              });
            case 6:
              _context6.next = 12;
              break;
            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](3);
              this.accounts = [];
              this.clearStorage();
            case 12:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this, [[3, 8]]);
      }));
      function restoreSession() {
        return _restoreSession.apply(this, arguments);
      }
      return restoreSession;
    }();
    return GrinderyWalletProvider;
  }(ProviderBase);

  /**
   * @summary The Grindery Wallet SDK class
   * @since 0.1.0
   */
  var GrinderyWalletSDK = /*#__PURE__*/function () {
    function GrinderyWalletSDK() {
      this.provider = this.getWeb3Provider();
    }
    /**
     * @summary Gets the Grindery Wallet ethereum provider
     * @returns {GrinderyWalletProvider} The Grindery Wallet ethereum provider
     */
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

})));
//# sourceMappingURL=grindery-wallet-sdk.umd.development.js.map

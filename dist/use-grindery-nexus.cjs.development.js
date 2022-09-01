'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var Web3Modal = _interopDefault(require('web3modal'));
var ethers = require('ethers');
var universalBase64url = require('universal-base64url');

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
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

var ENGINE_URL = 'https://orchestrator.grindery.org'; // Default context properties

var defaultContext = {
  user: null,
  address: null,
  chain: null,
  token: null,
  code: null,
  connect: function connect() {},
  disconnect: function disconnect() {},
  setUser: function setUser() {},
  setAddress: function setAddress() {},
  setChain: function setChain() {}
};
/** Grindery Nexus Context */

var GrinderyNexusContext = /*#__PURE__*/React.createContext(defaultContext);
/** Grindery Nexus Context Provider */

var GrinderyNexusContextProvider = function GrinderyNexusContextProvider(props) {
  var children = props.children;
  var cacheProvider = typeof props.cacheProvider !== 'undefined' ? props.cacheProvider : true; // Web3Modal instance

  var _useState = React.useState(null),
      web3Modal = _useState[0],
      setWeb3Modal = _useState[1]; // Web3Provider library


  var _useState2 = React.useState(null),
      library = _useState2[0],
      setLibrary = _useState2[1]; // User account


  var _useState3 = React.useState(null),
      account = _useState3[0],
      setAccount = _useState3[1]; // User id


  var _useState4 = React.useState(null),
      user = _useState4[0],
      setUser = _useState4[1]; // User wallet address


  var _useState5 = React.useState(null),
      address = _useState5[0],
      setAddress = _useState5[1]; // User chain id


  var _useState6 = React.useState(null),
      chain = _useState6[0],
      setChain = _useState6[1]; // Auth message


  var _useState7 = React.useState(null),
      message = _useState7[0],
      setMessage = _useState7[1]; // Authentication token object


  var _useState8 = React.useState(null),
      token = _useState8[0],
      setToken = _useState8[1]; // Signed authentication message


  var _useState9 = React.useState(null),
      signature = _useState9[0],
      setSignature = _useState9[1]; // Compiled authorization code


  var code = message && signature && universalBase64url.encode(JSON.stringify({
    message: message,
    signature: signature
  })) || null; // Subscribe to account change

  var addListeners = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(web3ModalProvider) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              web3ModalProvider.on('accountsChanged', function () {
                window.location.reload();
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function addListeners(_x) {
      return _ref.apply(this, arguments);
    };
  }(); // Connect MetaMask wallet


  var connect = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var provider, ethersProvider, userAddress, userChain, accounts;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return web3Modal.connect();

            case 2:
              provider = _context2.sent;
              addListeners(provider);
              ethersProvider = new ethers.providers.Web3Provider(provider);
              _context2.next = 7;
              return ethersProvider.getSigner().getAddress();

            case 7:
              userAddress = _context2.sent;
              _context2.next = 10;
              return ethersProvider.getSigner().getChainId();

            case 10:
              userChain = _context2.sent;
              _context2.next = 13;
              return ethersProvider.listAccounts();

            case 13:
              accounts = _context2.sent;
              setLibrary(ethersProvider);
              if (accounts) setAccount(accounts[0]);
              setAddress(userAddress);
              setChain(userChain);

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function connect() {
      return _ref2.apply(this, arguments);
    };
  }(); // Clear user state


  var clearUserState = function clearUserState() {
    setUser(null);
    setAddress(null);
    setChain(null);
    setAccount(null);
    setMessage(null);
    setToken(null);
    setSignature(null);
  }; // Disconnect user


  var disconnect = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return web3Modal.clearCachedProvider();

            case 2:
              clearUserState();
              clearAuthSession();

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function disconnect() {
      return _ref3.apply(this, arguments);
    };
  }(); // Fetch authentication message or access token from the engine API


  var startSession = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(userAddress) {
      var resWithCreds, json;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return fetch(ENGINE_URL + "/oauth/session?address=" + userAddress, {
                method: 'GET',
                credentials: 'include'
              });

            case 2:
              resWithCreds = _context4.sent;

              if (!(resWithCreds && resWithCreds.ok)) {
                _context4.next = 10;
                break;
              }

              _context4.next = 6;
              return resWithCreds.json();

            case 6:
              json = _context4.sent;

              // Set access token if exists
              if (json.access_token) {
                setToken(json);
              } else if (json.message) {
                // Or set auth message
                setMessage(json.message);
              }

              _context4.next = 11;
              break;

            case 10:
              console.error('startSessionWithCreds error', resWithCreds && resWithCreds.status || 'Unknown error');

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function startSession(_x2) {
      return _ref4.apply(this, arguments);
    };
  }(); // Sign authentication message with MetaMask


  var signMessage = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(lib, msg, userAccount) {
      var newSignature;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (web3Modal) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return");

            case 2:
              _context5.prev = 2;
              _context5.next = 5;
              return lib.provider.request({
                method: 'personal_sign',
                params: [msg, userAccount]
              });

            case 5:
              newSignature = _context5.sent;
              setSignature(newSignature);
              _context5.next = 13;
              break;

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](2);
              console.error('signMessage error', _context5.t0);
              clearUserState();

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[2, 9]]);
    }));

    return function signMessage(_x3, _x4, _x5) {
      return _ref5.apply(this, arguments);
    };
  }(); // Get access token from the engine API


  var getToken = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(code) {
      var res, result;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return fetch(ENGINE_URL + "/oauth/token?code=" + code, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  grant_type: 'authorization_code'
                })
              });

            case 2:
              res = _context6.sent;

              if (!res.ok) {
                _context6.next = 10;
                break;
              }

              _context6.next = 6;
              return res.json();

            case 6:
              result = _context6.sent;
              setToken(result);
              _context6.next = 12;
              break;

            case 10:
              console.error('getToken error', res.status);
              clearUserState();

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function getToken(_x6) {
      return _ref6.apply(this, arguments);
    };
  }(); // Set refresh_token cookie


  var registerAuthSession = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(refresh_token) {
      var res;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return fetch(ENGINE_URL + "/oauth/session-register", {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  refresh_token: refresh_token
                })
              });

            case 2:
              res = _context7.sent;

              if (!res.ok) {
                console.error('registerAuthSession error', res.status);
              }

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function registerAuthSession(_x7) {
      return _ref7.apply(this, arguments);
    };
  }(); // Remove refresh_token cookie


  var clearAuthSession = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var res;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return fetch(ENGINE_URL + "/oauth/session-register", {
                method: 'POST',
                credentials: 'include'
              });

            case 2:
              res = _context8.sent;

              if (!res.ok) {
                console.error('clearAuthSession error', res.status);
              }

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function clearAuthSession() {
      return _ref8.apply(this, arguments);
    };
  }(); // Set web3Modal instance


  React.useEffect(function () {
    var providerOptions = {};
    var newWeb3Modal = new Web3Modal({
      cacheProvider: cacheProvider,
      network: 'mainnet',
      providerOptions: providerOptions
    });
    setWeb3Modal(newWeb3Modal);
  }, []); // connect automatically and without a popup if user was connected before

  React.useEffect(function () {
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, [web3Modal]); // set user if token and address is known

  React.useEffect(function () {
    if (address && token && token.access_token) {
      setUser("eip155:1:" + address);

      if (token.refresh_token) {
        registerAuthSession(token.refresh_token);
      }
    } else {
      setUser(null);
    }
  }, [token, address]); // Start session if user address is known

  React.useEffect(function () {
    if (address && !message && !signature && !token) {
      startSession(address);
    }
  }, [address, message, signature, token]); // Sign authentication message if message is known

  React.useEffect(function () {
    if (library && message && account && !signature && !token) {
      signMessage(library, message, account);
    }
  }, [library, message, account, signature, token]); // Get authentication token if message is signed

  React.useEffect(function () {
    if (code && !token) {
      getToken(code);
    }
  }, [code, token]);
  return React__default.createElement(GrinderyNexusContext.Provider, {
    value: {
      user: user,
      address: address,
      chain: chain,
      token: token,
      code: code,
      connect: connect,
      disconnect: disconnect,
      setUser: setUser,
      setAddress: setAddress,
      setChain: setChain
    }
  }, children);
};
/** Grindery Nexus Hook */

var useGrinderyNexus = function useGrinderyNexus() {
  return React.useContext(GrinderyNexusContext);
};

exports.ENGINE_URL = ENGINE_URL;
exports.GrinderyNexusContext = GrinderyNexusContext;
exports.GrinderyNexusContextProvider = GrinderyNexusContextProvider;
exports.default = GrinderyNexusContextProvider;
exports.useGrinderyNexus = useGrinderyNexus;
//# sourceMappingURL=use-grindery-nexus.cjs.development.js.map
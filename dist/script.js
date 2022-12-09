"use strict";
function _typeof(t) {
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    _typeof(t)
  );
}
function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime =
    function () {
      return t;
    };
  var t = {},
    e = Object.prototype,
    n = e.hasOwnProperty,
    r =
      Object.defineProperty ||
      function (t, e, n) {
        t[e] = n.value;
      },
    o = "function" == typeof Symbol ? Symbol : {},
    a = o.iterator || "@@iterator",
    i = o.asyncIterator || "@@asyncIterator",
    c = o.toStringTag || "@@toStringTag";
  function l(t, e, n) {
    return (
      Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }),
      t[e]
    );
  }
  try {
    l({}, "");
  } catch (t) {
    l = function (t, e, n) {
      return (t[e] = n);
    };
  }
  function s(t, e, n, o) {
    var a = e && e.prototype instanceof f ? e : f,
      i = Object.create(a.prototype),
      c = new U(o || []);
    return r(i, "_invoke", { value: w(t, n, c) }), i;
  }
  function u(t, e, n) {
    try {
      return { type: "normal", arg: t.call(e, n) };
    } catch (t) {
      return { type: "throw", arg: t };
    }
  }
  t.wrap = s;
  var d = {};
  function f() {}
  function p() {}
  function h() {}
  var y = {};
  l(y, a, function () {
    return this;
  });
  var m = Object.getPrototypeOf,
    v = m && m(m(C([])));
  v && v !== e && n.call(v, a) && (y = v);
  var g = (h.prototype = f.prototype = Object.create(y));
  function x(t) {
    ["next", "throw", "return"].forEach(function (e) {
      l(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function b(t, e) {
    function o(r, a, i, c) {
      var l = u(t[r], t, a);
      if ("throw" !== l.type) {
        var s = l.arg,
          d = s.value;
        return d && "object" == _typeof(d) && n.call(d, "__await")
          ? e.resolve(d.__await).then(
              function (t) {
                o("next", t, i, c);
              },
              function (t) {
                o("throw", t, i, c);
              }
            )
          : e.resolve(d).then(
              function (t) {
                (s.value = t), i(s);
              },
              function (t) {
                return o("throw", t, i, c);
              }
            );
      }
      c(l.arg);
    }
    var a;
    r(this, "_invoke", {
      value: function (t, n) {
        function r() {
          return new e(function (e, r) {
            o(t, n, e, r);
          });
        }
        return (a = a ? a.then(r, r) : r());
      },
    });
  }
  function w(t, e, n) {
    var r = "suspendedStart";
    return function (o, a) {
      if ("executing" === r) throw new Error("Generator is already running");
      if ("completed" === r) {
        if ("throw" === o) throw a;
        return N();
      }
      for (n.method = o, n.arg = a; ; ) {
        var i = n.delegate;
        if (i) {
          var c = S(i, n);
          if (c) {
            if (c === d) continue;
            return c;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;
        else if ("throw" === n.method) {
          if ("suspendedStart" === r) throw ((r = "completed"), n.arg);
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        r = "executing";
        var l = u(t, e, n);
        if ("normal" === l.type) {
          if (((r = n.done ? "completed" : "suspendedYield"), l.arg === d))
            continue;
          return { value: l.arg, done: n.done };
        }
        "throw" === l.type &&
          ((r = "completed"), (n.method = "throw"), (n.arg = l.arg));
      }
    };
  }
  function S(t, e) {
    var n = e.method,
      r = t.iterator[n];
    if (void 0 === r)
      return (
        (e.delegate = null),
        ("throw" === n &&
          t.iterator.return &&
          ((e.method = "return"),
          (e.arg = void 0),
          S(t, e),
          "throw" === e.method)) ||
          ("return" !== n &&
            ((e.method = "throw"),
            (e.arg = new TypeError(
              "The iterator does not provide a '" + n + "' method"
            )))),
        d
      );
    var o = u(r, t.iterator, e.arg);
    if ("throw" === o.type)
      return (e.method = "throw"), (e.arg = o.arg), (e.delegate = null), d;
    var a = o.arg;
    return a
      ? a.done
        ? ((e[t.resultName] = a.value),
          (e.next = t.nextLoc),
          "return" !== e.method && ((e.method = "next"), (e.arg = void 0)),
          (e.delegate = null),
          d)
        : a
      : ((e.method = "throw"),
        (e.arg = new TypeError("iterator result is not an object")),
        (e.delegate = null),
        d);
  }
  function L(t) {
    var e = { tryLoc: t[0] };
    1 in t && (e.catchLoc = t[1]),
      2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
      this.tryEntries.push(e);
  }
  function E(t) {
    var e = t.completion || {};
    (e.type = "normal"), delete e.arg, (t.completion = e);
  }
  function U(t) {
    (this.tryEntries = [{ tryLoc: "root" }]),
      t.forEach(L, this),
      this.reset(!0);
  }
  function C(t) {
    if (t) {
      var e = t[a];
      if (e) return e.call(t);
      if ("function" == typeof t.next) return t;
      if (!isNaN(t.length)) {
        var r = -1,
          o = function e() {
            for (; ++r < t.length; )
              if (n.call(t, r)) return (e.value = t[r]), (e.done = !1), e;
            return (e.value = void 0), (e.done = !0), e;
          };
        return (o.next = o);
      }
    }
    return { next: N };
  }
  function N() {
    return { value: void 0, done: !0 };
  }
  return (
    (p.prototype = h),
    r(g, "constructor", { value: h, configurable: !0 }),
    r(h, "constructor", { value: p, configurable: !0 }),
    (p.displayName = l(h, c, "GeneratorFunction")),
    (t.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return (
        !!e && (e === p || "GeneratorFunction" === (e.displayName || e.name))
      );
    }),
    (t.mark = function (t) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(t, h)
          : ((t.__proto__ = h), l(t, c, "GeneratorFunction")),
        (t.prototype = Object.create(g)),
        t
      );
    }),
    (t.awrap = function (t) {
      return { __await: t };
    }),
    x(b.prototype),
    l(b.prototype, i, function () {
      return this;
    }),
    (t.AsyncIterator = b),
    (t.async = function (e, n, r, o, a) {
      void 0 === a && (a = Promise);
      var i = new b(s(e, n, r, o), a);
      return t.isGeneratorFunction(n)
        ? i
        : i.next().then(function (t) {
            return t.done ? t.value : i.next();
          });
    }),
    x(g),
    l(g, c, "Generator"),
    l(g, a, function () {
      return this;
    }),
    l(g, "toString", function () {
      return "[object Generator]";
    }),
    (t.keys = function (t) {
      var e = Object(t),
        n = [];
      for (var r in e) n.push(r);
      return (
        n.reverse(),
        function t() {
          for (; n.length; ) {
            var r = n.pop();
            if (r in e) return (t.value = r), (t.done = !1), t;
          }
          return (t.done = !0), t;
        }
      );
    }),
    (t.values = C),
    (U.prototype = {
      constructor: U,
      reset: function (t) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = void 0),
          (this.done = !1),
          (this.delegate = null),
          (this.method = "next"),
          (this.arg = void 0),
          this.tryEntries.forEach(E),
          !t)
        )
          for (var e in this)
            "t" === e.charAt(0) &&
              n.call(this, e) &&
              !isNaN(+e.slice(1)) &&
              (this[e] = void 0);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (t) {
        if (this.done) throw t;
        var e = this;
        function r(n, r) {
          return (
            (i.type = "throw"),
            (i.arg = t),
            (e.next = n),
            r && ((e.method = "next"), (e.arg = void 0)),
            !!r
          );
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var a = this.tryEntries[o],
            i = a.completion;
          if ("root" === a.tryLoc) return r("end");
          if (a.tryLoc <= this.prev) {
            var c = n.call(a, "catchLoc"),
              l = n.call(a, "finallyLoc");
            if (c && l) {
              if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
              if (this.prev < a.finallyLoc) return r(a.finallyLoc);
            } else if (c) {
              if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
            } else {
              if (!l) throw new Error("try statement without catch or finally");
              if (this.prev < a.finallyLoc) return r(a.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (
            o.tryLoc <= this.prev &&
            n.call(o, "finallyLoc") &&
            this.prev < o.finallyLoc
          ) {
            var a = o;
            break;
          }
        }
        a &&
          ("break" === t || "continue" === t) &&
          a.tryLoc <= e &&
          e <= a.finallyLoc &&
          (a = null);
        var i = a ? a.completion : {};
        return (
          (i.type = t),
          (i.arg = e),
          a
            ? ((this.method = "next"), (this.next = a.finallyLoc), d)
            : this.complete(i)
        );
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return (
          "break" === t.type || "continue" === t.type
            ? (this.next = t.arg)
            : "return" === t.type
            ? ((this.rval = this.arg = t.arg),
              (this.method = "return"),
              (this.next = "end"))
            : "normal" === t.type && e && (this.next = e),
          d
        );
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n.finallyLoc === t)
            return this.complete(n.completion, n.afterLoc), E(n), d;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n.tryLoc === t) {
            var r = n.completion;
            if ("throw" === r.type) {
              var o = r.arg;
              E(n);
            }
            return o;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (t, e, n) {
        return (
          (this.delegate = { iterator: C(t), resultName: e, nextLoc: n }),
          "next" === this.method && (this.arg = void 0),
          d
        );
      },
    }),
    t
  );
}
function asyncGeneratorStep(t, e, n, r, o, a, i) {
  try {
    var c = t[a](i),
      l = c.value;
  } catch (t) {
    return void n(t);
  }
  c.done ? e(l) : Promise.resolve(l).then(r, o);
}
function _asyncToGenerator(t) {
  return function () {
    var e = this,
      n = arguments;
    return new Promise(function (r, o) {
      var a = t.apply(e, n);
      function i(t) {
        asyncGeneratorStep(a, r, o, i, c, "next", t);
      }
      function c(t) {
        asyncGeneratorStep(a, r, o, i, c, "throw", t);
      }
      i(void 0);
    });
  };
}
var overlay = document.querySelector(".overlay"),
  modal = document.querySelector(".modal"),
  searchForm = document.querySelector("#searchForm"),
  searchInput = document.querySelector("#searchInput"),
  unitsValueForm = document.querySelector("#coinUnitsForm"),
  unitsInput = document.querySelector("#coinsUnits"),
  searchBtn = document.querySelector("#searchBtn"),
  loadingImg = document.querySelector("#loaderImg"),
  coinsContainer = document.querySelector(".coinsCtn"),
  errorMsgElement = document.querySelector(".errorMessage"),
  walletBalanceEle = document.querySelector(".walletBalance"),
  emptyMessage = document.querySelector(".emptyMessage"),
  overlayElems = [overlay, closeModalBtn],
  coinQuery = "",
  unitValue = 0,
  imgUrl = "",
  coinName = "",
  walletBalance = 0,
  currentCoinPrice = 0,
  coinAth = 0,
  closeModal = function () {
    [overlay, modal].forEach(function (t) {
      t.classList.add("fade-out"),
        t.classList.contains("fade-in") && t.classList.remove("fade-in");
    });
  },
  openModal = function () {
    [overlay, modal].forEach(function (t) {
      t.classList.remove("fade-out");
    }),
      modal.classList.add("fade-in"),
      overlay.classList.add("fade_in_overlay");
  },
  resetBtn = function () {
    (searchBtn.textContent = "Search"),
      loadingImg.classList.add("dn"),
      (searchInput.value = ""),
      document.activeElement.blur();
  },
  displayErrorMessage = function (t, e, n) {
    (t.textContent = "".concat(e)),
      setTimeout(function () {
        t.textContent = "";
      }, n);
  },
  updateBalance = function () {
    var t = coins
      .map(function (t) {
        return t.value;
      })
      .map(function (t) {
        return +t.replaceAll(",", "").replace("$", "");
      })
      .reduce(function (t, e) {
        return t + e;
      }, 0);
    (walletBalance = (walletBalance = t).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })),
      (walletBalanceEle.textContent = walletBalance);
  },
  coins = JSON.parse(localStorage.getItem("coins")) || [];
searchForm.addEventListener(
  "submit",
  (function () {
    var t = _asyncToGenerator(
      _regeneratorRuntime().mark(function t(e) {
        return _regeneratorRuntime().wrap(function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  e.preventDefault(),
                  (searchBtn.textContent = ""),
                  (searchBtn.style.height = "49px"),
                  loadingImg.classList.remove("dn"),
                  (coinQuery = searchInput.value),
                  (t.next = 7),
                  fetch(
                    new Request("https://api.livecoinwatch.com/coins/single"),
                    {
                      method: "POST",
                      headers: new Headers({
                        "content-type": "application/json",
                        "x-api-key": "2bf30367-3679-4c7e-b46b-05aa8c3ed935",
                      }),
                      body: JSON.stringify({
                        currency: "USD",
                        code: "".concat(coinQuery.toUpperCase()),
                        meta: !0,
                      }),
                    }
                  )
                    .then(function (t) {
                      return t.json();
                    })
                    .then(function (t) {
                      var e = t;
                      openModal(),
                        resetBtn(),
                        (imgUrl = e.png64),
                        (coinName = e.name),
                        (coinAth = e.allTimeHighUSD.toFixed(3)),
                        (currentCoinPrice = e.rate),
                        coinName.split(" ").length > 2 &&
                          (coinName = coinName
                            .split(" ")
                            .map(function (t) {
                              return t[0];
                            })
                            .join("")),
                        (modal.innerHTML =
                          '\n                <div class="closeCtn"><i id="closeModalBtn" onclick="closeModal(); resetBtn()" class="bi bi-x absolute right-2 top-0 text-4xl cursor-pointer"></i></div>\n                <div class="coin_info flex justify-between items-center px-6 mt-5 pt-3 pb-2 border-b-2 border-t-2 border-indigo-500">\n                <img class="w-16 rounded-full mr-4 lg:mr-0" src='
                            .concat(
                              e.png64,
                              ' alt="">\n                <p class="coinName font-bold lg:text-2xl text-lg uppercase">'
                            )
                            .concat(
                              coinName,
                              '</p>\n                <div class="priceCtn flex flex-col text-center">\n                    <p class="font-bold text-slate-300">ATH</p>\n                    <p class="ath lg:font-bold font-semibold text-lg">$'
                            )
                            .concat(
                              e.allTimeHighUSD.toFixed(3),
                              '</p>\n                    </div>\n            </div>\n\n            <div class="info px-8 flex gap-x-3 mt-2">\n                <i class="bi bi-info-circle"></i>\n                <p class="text-xs">Input how many '
                            )
                            .concat(
                              coinName,
                              ' you have below , then click \'add to wallet\' to calculate the value of your holding when it goes back to all time high</p>\n            </div>\n            \n            <div  id="coinUnitsForm" class="px-5 mt-8">\n                <p class="text-lg font-semibold py-3">How many '
                            )
                            .concat(
                              coinName,
                              ' do you have ?</p>\n                <input oninput="updateUnit(this.value, '
                            )
                            .concat(
                              e.allTimeHighUSD.toFixed(3),
                              ')" id="coinsUnits" class="w-full p-3 rounded-md mb-5 text-black"  placeholder="Enter coin quantity, eg \'10,500\'"  type="number" >\n                <h2 class="text-center font-bold text-xl">OR</h2>\n                <p class="text-lg font-semibold py-3">How many '
                            )
                            .concat(
                              coinName,
                              ' do you wanna buy ?</p>\n                <input oninput="updateUnitFiat(this.value)" id="fiatUnits" class="w-full p-3 rounded-md mb-5 text-black"  placeholder="Enter amount in $, eg \'20,000\'"  type="text">\n                <p class="addToWalletErrMsg text-red-600 py-2"></p>\n                <div class="valueDisplayCtn justify-between hidden py-1">\n                <div class="athCtn text-center basis-2/4">\n                    <p class="font-bold text-slate-300">Value(ATH)</p>\n                    <p class="athValue font-semibold py-2 text-lg">1000</p>\n                </div>\n                <div class="nowCtn text-center basis-2/4">\n                    <p class="font-bold text-slate-300">Value(NOW)</p>\n                    <p class="athValue font-semibold py-2 text-lg">1000</p>\n                </div>\n            </div>\n                <button onclick="addCoin('
                            )
                            .concat(
                              e.allTimeHighUSD.toFixed(3),
                              ')" class="w-full rounded-md px-1 py-3 font-bold " type="submit">Add to wallet</button>\n                </div>\n                \n          '
                            ));
                    })
                    .catch(function (t) {
                      closeModal(),
                        resetBtn(),
                        displayErrorMessage(
                          errorMsgElement,
                          "Something went wrong, try searching for another coin or try again later",
                          3e3
                        );
                    })
                );
              case 7:
              case "end":
                return t.stop();
            }
        }, t);
      })
    );
    return function (e) {
      return t.apply(this, arguments);
    };
  })()
);
var updateUnit = function (t, e) {
    unitValue = t;
    var n = t * e,
      r = currentCoinPrice * t,
      o = document.querySelector(".valueDisplayCtn");
    o.classList.remove("hidden"),
      o.classList.add("flex"),
      (o.innerHTML =
        '\n    <div class="athCtn text-center">\n        <p class="font-bold text-slate-300">Value(ATH)</p>\n        <p class="athValue font-semibold py-2 text-lg">'
          .concat(
            n.toLocaleString("en-US", { style: "currency", currency: "USD" }),
            '</p>\n    </div>\n    <div class="nowCtn text-center">\n        <p class="font-bold text-slate-300">Value(NOW)</p>\n        <p class="athValue font-semibold py-2 text-lg">'
          )
          .concat(
            r.toLocaleString("en-US", { style: "currency", currency: "USD" }),
            "</p>\n    </div>\n    "
          ));
  },
  updateUnitFiat = function (t) {
    var e = +t / currentCoinPrice;
    (document.querySelector("#coinsUnits").value = e),
      console.log("working"),
      updateUnit(+document.querySelector("#coinsUnits").value, coinAth);
  },
  updateUI = function () {
    (coinsContainer.innerHTML =
      '<h3 class="text-xl font-bold text-center mx-auto mt-5">WALLET</h3>'),
      coins.map(function (t) {
        var e = t.name,
          n = t.units,
          r = t.value,
          o = t.imgUrl;
        coinsContainer.innerHTML +=
          '\n\n        <div class="coinCtn w-full mt-7 flex justify-between items-center p-3 lg:py-4 lg:px-5">\n            <div class="imgCtn flex flex-col justify-center items-center my-auto">\n                <img class="w-16 rounded-full self-start items-start" src='
            .concat(
              o,
              ' alt="...">\n                <p class="coinName font-semibold py-1">'
            )
            .concat(
              e,
              '</p>\n          </div>\n            <div class="priceCtn flex flex-col text-center self-center">\n                <p class="font-bold text-slate-300">Quantity</p>\n                <p class="ath font-bold text-lg">'
            )
            .concat(
              n,
              '</p>\n            </div>\n            <div class="priceCtn flex flex-col text-center">\n                <p class="font-bold text-slate-300">Value(ATH)</p>\n                <p class="ath font-bold text-lg">'
            )
            .concat(r, "</p>\n            </div>\n        </div>\n        ");
      });
  },
  generatePortfolio = function () {
    0 !== coins.length && (emptyMessage.remove(), updateBalance(), updateUI());
  },
  addCoin = function (t) {
    var e =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : unitValue,
      n =
        arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : imgUrl,
      r = (t * e).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
      o = document.querySelector(".addToWalletErrMsg");
    unitValue > 0 &&
    !coins.find(function (t) {
      return t.name === coinName;
    })
      ? (coins.push({ name: coinName, units: e, value: r, imgUrl: n }),
        localStorage.setItem("coins", JSON.stringify(coins)),
        console.log(coins),
        updateBalance(),
        updateUI(),
        closeModal(),
        emptyMessage.remove(),
        resetBtn())
      : unitValue > 0 &&
        coins.find(function (t) {
          return t.name === coinName;
        })
      ? (o.textContent = "Coin already exists")
      : unitValue <= 0 &&
        !coins.find(function (t) {
          return t.name === coinName;
        }) &&
        (o.textContent = "Enter a value greater than 0");
  };
overlayElems.forEach(function (t) {
  t.addEventListener("click", function () {
    closeModal(), resetBtn();
  });
}),
  generatePortfolio();
//# sourceMappingURL=script.js.map

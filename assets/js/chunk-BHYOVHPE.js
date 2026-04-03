var iD = Object.defineProperty,
  sD = Object.defineProperties;
var aD = Object.getOwnPropertyDescriptors;
var Ho = Object.getOwnPropertySymbols;
var kd = Object.prototype.hasOwnProperty,
  Ld = Object.prototype.propertyIsEnumerable;
var Fd = (e, t, n) =>
    t in e
      ? iD(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  v = (e, t) => {
    for (var n in (t ||= {})) kd.call(t, n) && Fd(e, n, t[n]);
    if (Ho) for (var n of Ho(t)) Ld.call(t, n) && Fd(e, n, t[n]);
    return e;
  },
  L = (e, t) => sD(e, aD(t));
var Vd = (e, t) => {
  var n = {};
  for (var r in e) kd.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && Ho)
    for (var r of Ho(e)) t.indexOf(r) < 0 && Ld.call(e, r) && (n[r] = e[r]);
  return n;
};
var nn = (e, t, n) =>
  new Promise((r, o) => {
    var i = (c) => {
        try {
          a(n.next(c));
        } catch (u) {
          o(u);
        }
      },
      s = (c) => {
        try {
          a(n.throw(c));
        } catch (u) {
          o(u);
        }
      },
      a = (c) => (c.done ? r(c.value) : Promise.resolve(c.value).then(i, s));
    a((n = n.apply(e, t)).next());
  });
function Oa(e, t) {
  return Object.is(e, t);
}
var ee = null,
  zo = !1,
  Pa = 1,
  ke = Symbol("SIGNAL");
function O(e) {
  let t = ee;
  return (ee = e), t;
}
function jd() {
  return ee;
}
var Sr = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  kind: "unknown",
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function qo(e) {
  if (zo) throw new Error("");
  if (ee === null) return;
  ee.consumerOnSignalRead(e);
  let t = ee.nextProducerIndex++;
  if (
    (Yo(ee), t < ee.producerNode.length && ee.producerNode[t] !== e && Tr(ee))
  ) {
    let n = ee.producerNode[t];
    Zo(n, ee.producerIndexOfThis[t]);
  }
  ee.producerNode[t] !== e &&
    ((ee.producerNode[t] = e),
    (ee.producerIndexOfThis[t] = Tr(ee) ? $d(e, ee, t) : 0)),
    (ee.producerLastReadVersion[t] = e.version);
}
function cD() {
  Pa++;
}
function Fa(e) {
  if (!(Tr(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === Pa)) {
    if (!e.producerMustRecompute(e) && !La(e)) {
      xa(e);
      return;
    }
    e.producerRecomputeValue(e), xa(e);
  }
}
function Ud(e) {
  if (e.liveConsumerNode === void 0) return;
  let t = zo;
  zo = !0;
  try {
    for (let n of e.liveConsumerNode) n.dirty || uD(n);
  } finally {
    zo = t;
  }
}
function Bd() {
  return ee?.consumerAllowSignalWrites !== !1;
}
function uD(e) {
  (e.dirty = !0), Ud(e), e.consumerMarkedDirty?.(e);
}
function xa(e) {
  (e.dirty = !1), (e.lastCleanEpoch = Pa);
}
function Wo(e) {
  return e && (e.nextProducerIndex = 0), O(e);
}
function ka(e, t) {
  if (
    (O(t),
    !(
      !e ||
      e.producerNode === void 0 ||
      e.producerIndexOfThis === void 0 ||
      e.producerLastReadVersion === void 0
    ))
  ) {
    if (Tr(e))
      for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
        Zo(e.producerNode[n], e.producerIndexOfThis[n]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(),
        e.producerLastReadVersion.pop(),
        e.producerIndexOfThis.pop();
  }
}
function La(e) {
  Yo(e);
  for (let t = 0; t < e.producerNode.length; t++) {
    let n = e.producerNode[t],
      r = e.producerLastReadVersion[t];
    if (r !== n.version || (Fa(n), r !== n.version)) return !0;
  }
  return !1;
}
function Va(e) {
  if ((Yo(e), Tr(e)))
    for (let t = 0; t < e.producerNode.length; t++)
      Zo(e.producerNode[t], e.producerIndexOfThis[t]);
  (e.producerNode.length =
    e.producerLastReadVersion.length =
    e.producerIndexOfThis.length =
      0),
    e.liveConsumerNode &&
      (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
}
function $d(e, t, n) {
  if ((Hd(e), e.liveConsumerNode.length === 0 && zd(e)))
    for (let r = 0; r < e.producerNode.length; r++)
      e.producerIndexOfThis[r] = $d(e.producerNode[r], e, r);
  return e.liveConsumerIndexOfThis.push(n), e.liveConsumerNode.push(t) - 1;
}
function Zo(e, t) {
  if ((Hd(e), e.liveConsumerNode.length === 1 && zd(e)))
    for (let r = 0; r < e.producerNode.length; r++)
      Zo(e.producerNode[r], e.producerIndexOfThis[r]);
  let n = e.liveConsumerNode.length - 1;
  if (
    ((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
    (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n]),
    e.liveConsumerNode.length--,
    e.liveConsumerIndexOfThis.length--,
    t < e.liveConsumerNode.length)
  ) {
    let r = e.liveConsumerIndexOfThis[t],
      o = e.liveConsumerNode[t];
    Yo(o), (o.producerIndexOfThis[r] = t);
  }
}
function Tr(e) {
  return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
}
function Yo(e) {
  (e.producerNode ??= []),
    (e.producerIndexOfThis ??= []),
    (e.producerLastReadVersion ??= []);
}
function Hd(e) {
  (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
}
function zd(e) {
  return e.producerNode !== void 0;
}
function Gd(e) {
  let t = Object.create(lD);
  t.computation = e;
  let n = () => {
    if ((Fa(t), qo(t), t.value === Go)) throw t.error;
    return t.value;
  };
  return (n[ke] = t), n;
}
var Aa = Symbol("UNSET"),
  Ra = Symbol("COMPUTING"),
  Go = Symbol("ERRORED"),
  lD = L(v({}, Sr), {
    value: Aa,
    dirty: !0,
    error: null,
    equal: Oa,
    kind: "computed",
    producerMustRecompute(e) {
      return e.value === Aa || e.value === Ra;
    },
    producerRecomputeValue(e) {
      if (e.value === Ra) throw new Error("Detected cycle in computations.");
      let t = e.value;
      e.value = Ra;
      let n = Wo(e),
        r;
      try {
        r = e.computation();
      } catch (o) {
        (r = Go), (e.error = o);
      } finally {
        ka(e, n);
      }
      if (t !== Aa && t !== Go && r !== Go && e.equal(t, r)) {
        e.value = t;
        return;
      }
      (e.value = r), e.version++;
    },
  });
function dD() {
  throw new Error();
}
var qd = dD;
function Wd() {
  qd();
}
function Zd(e) {
  qd = e;
}
var fD = null;
function Yd(e) {
  let t = Object.create(ja);
  t.value = e;
  let n = () => (qo(t), t.value);
  return (n[ke] = t), n;
}
function Ko(e, t) {
  Bd() || Wd(), e.equal(e.value, t) || ((e.value = t), hD(e));
}
function Kd(e, t) {
  Bd() || Wd(), Ko(e, t(e.value));
}
var ja = L(v({}, Sr), { equal: Oa, value: void 0, kind: "signal" });
function hD(e) {
  e.version++, cD(), Ud(e), fD?.();
}
function S(e) {
  return typeof e == "function";
}
function Mn(e) {
  let n = e((r) => {
    Error.call(r), (r.stack = new Error().stack);
  });
  return (
    (n.prototype = Object.create(Error.prototype)),
    (n.prototype.constructor = n),
    n
  );
}
var Qo = Mn(
  (e) =>
    function (n) {
      e(this),
        (this.message = n
          ? `${n.length} errors occurred during unsubscription:
${n.map((r, o) => `${o + 1}) ${r.toString()}`).join(`
  `)}`
          : ""),
        (this.name = "UnsubscriptionError"),
        (this.errors = n);
    }
);
function Nr(e, t) {
  if (e) {
    let n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var K = class e {
  constructor(t) {
    (this.initialTeardown = t),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  unsubscribe() {
    let t;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: n } = this;
      if (n)
        if (((this._parentage = null), Array.isArray(n)))
          for (let i of n) i.remove(this);
        else n.remove(this);
      let { initialTeardown: r } = this;
      if (S(r))
        try {
          r();
        } catch (i) {
          t = i instanceof Qo ? i.errors : [i];
        }
      let { _finalizers: o } = this;
      if (o) {
        this._finalizers = null;
        for (let i of o)
          try {
            Qd(i);
          } catch (s) {
            (t = t ?? []),
              s instanceof Qo ? (t = [...t, ...s.errors]) : t.push(s);
          }
      }
      if (t) throw new Qo(t);
    }
  }
  add(t) {
    var n;
    if (t && t !== this)
      if (this.closed) Qd(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this)) return;
          t._addParent(this);
        }
        (this._finalizers =
          (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
      }
  }
  _hasParent(t) {
    let { _parentage: n } = this;
    return n === t || (Array.isArray(n) && n.includes(t));
  }
  _addParent(t) {
    let { _parentage: n } = this;
    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
  }
  _removeParent(t) {
    let { _parentage: n } = this;
    n === t ? (this._parentage = null) : Array.isArray(n) && Nr(n, t);
  }
  remove(t) {
    let { _finalizers: n } = this;
    n && Nr(n, t), t instanceof e && t._removeParent(this);
  }
};
K.EMPTY = (() => {
  let e = new K();
  return (e.closed = !0), e;
})();
var Ua = K.EMPTY;
function Xo(e) {
  return (
    e instanceof K ||
    (e && "closed" in e && S(e.remove) && S(e.add) && S(e.unsubscribe))
  );
}
function Qd(e) {
  S(e) ? e() : e.unsubscribe();
}
var $e = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var Tn = {
  setTimeout(e, t, ...n) {
    let { delegate: r } = Tn;
    return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n);
  },
  clearTimeout(e) {
    let { delegate: t } = Tn;
    return (t?.clearTimeout || clearTimeout)(e);
  },
  delegate: void 0,
};
function Jo(e) {
  Tn.setTimeout(() => {
    let { onUnhandledError: t } = $e;
    if (t) t(e);
    else throw e;
  });
}
function Ar() {}
var Xd = Ba("C", void 0, void 0);
function Jd(e) {
  return Ba("E", void 0, e);
}
function ef(e) {
  return Ba("N", e, void 0);
}
function Ba(e, t, n) {
  return { kind: e, value: t, error: n };
}
var rn = null;
function Sn(e) {
  if ($e.useDeprecatedSynchronousErrorHandling) {
    let t = !rn;
    if ((t && (rn = { errorThrown: !1, error: null }), e(), t)) {
      let { errorThrown: n, error: r } = rn;
      if (((rn = null), n)) throw r;
    }
  } else e();
}
function tf(e) {
  $e.useDeprecatedSynchronousErrorHandling &&
    rn &&
    ((rn.errorThrown = !0), (rn.error = e));
}
var on = class extends K {
    constructor(t) {
      super(),
        (this.isStopped = !1),
        t
          ? ((this.destination = t), Xo(t) && t.add(this))
          : (this.destination = mD);
    }
    static create(t, n, r) {
      return new Nn(t, n, r);
    }
    next(t) {
      this.isStopped ? Ha(ef(t), this) : this._next(t);
    }
    error(t) {
      this.isStopped
        ? Ha(Jd(t), this)
        : ((this.isStopped = !0), this._error(t));
    }
    complete() {
      this.isStopped ? Ha(Xd, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed ||
        ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(t) {
      this.destination.next(t);
    }
    _error(t) {
      try {
        this.destination.error(t);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  },
  pD = Function.prototype.bind;
function $a(e, t) {
  return pD.call(e, t);
}
var za = class {
    constructor(t) {
      this.partialObserver = t;
    }
    next(t) {
      let { partialObserver: n } = this;
      if (n.next)
        try {
          n.next(t);
        } catch (r) {
          ei(r);
        }
    }
    error(t) {
      let { partialObserver: n } = this;
      if (n.error)
        try {
          n.error(t);
        } catch (r) {
          ei(r);
        }
      else ei(t);
    }
    complete() {
      let { partialObserver: t } = this;
      if (t.complete)
        try {
          t.complete();
        } catch (n) {
          ei(n);
        }
    }
  },
  Nn = class extends on {
    constructor(t, n, r) {
      super();
      let o;
      if (S(t) || !t)
        o = { next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0 };
      else {
        let i;
        this && $e.useDeprecatedNextContext
          ? ((i = Object.create(t)),
            (i.unsubscribe = () => this.unsubscribe()),
            (o = {
              next: t.next && $a(t.next, i),
              error: t.error && $a(t.error, i),
              complete: t.complete && $a(t.complete, i),
            }))
          : (o = t);
      }
      this.destination = new za(o);
    }
  };
function ei(e) {
  $e.useDeprecatedSynchronousErrorHandling ? tf(e) : Jo(e);
}
function gD(e) {
  throw e;
}
function Ha(e, t) {
  let { onStoppedNotification: n } = $e;
  n && Tn.setTimeout(() => n(e, t));
}
var mD = { closed: !0, next: Ar, error: gD, complete: Ar };
var An = (typeof Symbol == "function" && Symbol.observable) || "@@observable";
function be(e) {
  return e;
}
function Ga(...e) {
  return qa(e);
}
function qa(e) {
  return e.length === 0
    ? be
    : e.length === 1
    ? e[0]
    : function (n) {
        return e.reduce((r, o) => o(r), n);
      };
}
var j = (() => {
  class e {
    constructor(n) {
      n && (this._subscribe = n);
    }
    lift(n) {
      let r = new e();
      return (r.source = this), (r.operator = n), r;
    }
    subscribe(n, r, o) {
      let i = yD(n) ? n : new Nn(n, r, o);
      return (
        Sn(() => {
          let { operator: s, source: a } = this;
          i.add(
            s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i)
          );
        }),
        i
      );
    }
    _trySubscribe(n) {
      try {
        return this._subscribe(n);
      } catch (r) {
        n.error(r);
      }
    }
    forEach(n, r) {
      return (
        (r = nf(r)),
        new r((o, i) => {
          let s = new Nn({
            next: (a) => {
              try {
                n(a);
              } catch (c) {
                i(c), s.unsubscribe();
              }
            },
            error: i,
            complete: o,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(n) {
      var r;
      return (r = this.source) === null || r === void 0
        ? void 0
        : r.subscribe(n);
    }
    [An]() {
      return this;
    }
    pipe(...n) {
      return qa(n)(this);
    }
    toPromise(n) {
      return (
        (n = nf(n)),
        new n((r, o) => {
          let i;
          this.subscribe(
            (s) => (i = s),
            (s) => o(s),
            () => r(i)
          );
        })
      );
    }
  }
  return (e.create = (t) => new e(t)), e;
})();
function nf(e) {
  var t;
  return (t = e ?? $e.Promise) !== null && t !== void 0 ? t : Promise;
}
function vD(e) {
  return e && S(e.next) && S(e.error) && S(e.complete);
}
function yD(e) {
  return (e && e instanceof on) || (vD(e) && Xo(e));
}
function Wa(e) {
  return S(e?.lift);
}
function U(e) {
  return (t) => {
    if (Wa(t))
      return t.lift(function (n) {
        try {
          return e(n, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function k(e, t, n, r, o) {
  return new Za(e, t, n, r, o);
}
var Za = class extends on {
  constructor(t, n, r, o, i, s) {
    super(t),
      (this.onFinalize = i),
      (this.shouldUnsubscribe = s),
      (this._next = n
        ? function (a) {
            try {
              n(a);
            } catch (c) {
              t.error(c);
            }
          }
        : super._next),
      (this._error = o
        ? function (a) {
            try {
              o(a);
            } catch (c) {
              t.error(c);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = r
        ? function () {
            try {
              r();
            } catch (a) {
              t.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var t;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: n } = this;
      super.unsubscribe(),
        !n && ((t = this.onFinalize) === null || t === void 0 || t.call(this));
    }
  }
};
function Rn() {
  return U((e, t) => {
    let n = null;
    e._refCount++;
    let r = k(t, void 0, void 0, void 0, () => {
      if (!e || e._refCount <= 0 || 0 < --e._refCount) {
        n = null;
        return;
      }
      let o = e._connection,
        i = n;
      (n = null), o && (!i || o === i) && o.unsubscribe(), t.unsubscribe();
    });
    e.subscribe(r), r.closed || (n = e.connect());
  });
}
var xn = class extends j {
  constructor(t, n) {
    super(),
      (this.source = t),
      (this.subjectFactory = n),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      Wa(t) && (this.lift = t.lift);
  }
  _subscribe(t) {
    return this.getSubject().subscribe(t);
  }
  getSubject() {
    let t = this._subject;
    return (
      (!t || t.isStopped) && (this._subject = this.subjectFactory()),
      this._subject
    );
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: t } = this;
    (this._subject = this._connection = null), t?.unsubscribe();
  }
  connect() {
    let t = this._connection;
    if (!t) {
      t = this._connection = new K();
      let n = this.getSubject();
      t.add(
        this.source.subscribe(
          k(
            n,
            void 0,
            () => {
              this._teardown(), n.complete();
            },
            (r) => {
              this._teardown(), n.error(r);
            },
            () => this._teardown()
          )
        )
      ),
        t.closed && ((this._connection = null), (t = K.EMPTY));
    }
    return t;
  }
  refCount() {
    return Rn()(this);
  }
};
var rf = Mn(
  (e) =>
    function () {
      e(this),
        (this.name = "ObjectUnsubscribedError"),
        (this.message = "object unsubscribed");
    }
);
var te = (() => {
    class e extends j {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(n) {
        let r = new ti(this, this);
        return (r.operator = n), r;
      }
      _throwIfClosed() {
        if (this.closed) throw new rf();
      }
      next(n) {
        Sn(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let r of this.currentObservers) r.next(n);
          }
        });
      }
      error(n) {
        Sn(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = n);
            let { observers: r } = this;
            for (; r.length; ) r.shift().error(n);
          }
        });
      }
      complete() {
        Sn(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: n } = this;
            for (; n.length; ) n.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }
      get observed() {
        var n;
        return (
          ((n = this.observers) === null || n === void 0 ? void 0 : n.length) >
          0
        );
      }
      _trySubscribe(n) {
        return this._throwIfClosed(), super._trySubscribe(n);
      }
      _subscribe(n) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(n),
          this._innerSubscribe(n)
        );
      }
      _innerSubscribe(n) {
        let { hasError: r, isStopped: o, observers: i } = this;
        return r || o
          ? Ua
          : ((this.currentObservers = null),
            i.push(n),
            new K(() => {
              (this.currentObservers = null), Nr(i, n);
            }));
      }
      _checkFinalizedStatuses(n) {
        let { hasError: r, thrownError: o, isStopped: i } = this;
        r ? n.error(o) : i && n.complete();
      }
      asObservable() {
        let n = new j();
        return (n.source = this), n;
      }
    }
    return (e.create = (t, n) => new ti(t, n)), e;
  })(),
  ti = class extends te {
    constructor(t, n) {
      super(), (this.destination = t), (this.source = n);
    }
    next(t) {
      var n, r;
      (r =
        (n = this.destination) === null || n === void 0 ? void 0 : n.next) ===
        null ||
        r === void 0 ||
        r.call(n, t);
    }
    error(t) {
      var n, r;
      (r =
        (n = this.destination) === null || n === void 0 ? void 0 : n.error) ===
        null ||
        r === void 0 ||
        r.call(n, t);
    }
    complete() {
      var t, n;
      (n =
        (t = this.destination) === null || t === void 0
          ? void 0
          : t.complete) === null ||
        n === void 0 ||
        n.call(t);
    }
    _subscribe(t) {
      var n, r;
      return (r =
        (n = this.source) === null || n === void 0
          ? void 0
          : n.subscribe(t)) !== null && r !== void 0
        ? r
        : Ua;
    }
  };
var se = class extends te {
  constructor(t) {
    super(), (this._value = t);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(t) {
    let n = super._subscribe(t);
    return !n.closed && t.next(this._value), n;
  }
  getValue() {
    let { hasError: t, thrownError: n, _value: r } = this;
    if (t) throw n;
    return this._throwIfClosed(), r;
  }
  next(t) {
    super.next((this._value = t));
  }
};
var Me = new j((e) => e.complete());
function of(e) {
  return e && S(e.schedule);
}
function sf(e) {
  return e[e.length - 1];
}
function ni(e) {
  return S(sf(e)) ? e.pop() : void 0;
}
function Rt(e) {
  return of(sf(e)) ? e.pop() : void 0;
}
function cf(e, t, n, r) {
  function o(i) {
    return i instanceof n
      ? i
      : new n(function (s) {
          s(i);
        });
  }
  return new (n || (n = Promise))(function (i, s) {
    function a(l) {
      try {
        u(r.next(l));
      } catch (d) {
        s(d);
      }
    }
    function c(l) {
      try {
        u(r.throw(l));
      } catch (d) {
        s(d);
      }
    }
    function u(l) {
      l.done ? i(l.value) : o(l.value).then(a, c);
    }
    u((r = r.apply(e, t || [])).next());
  });
}
function af(e) {
  var t = typeof Symbol == "function" && Symbol.iterator,
    n = t && e[t],
    r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function () {
        return (
          e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }
        );
      },
    };
  throw new TypeError(
    t ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function sn(e) {
  return this instanceof sn ? ((this.v = e), this) : new sn(e);
}
function uf(e, t, n) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(e, t || []),
    o,
    i = [];
  return (
    (o = Object.create(
      (typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype
    )),
    a("next"),
    a("throw"),
    a("return", s),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function s(f) {
    return function (g) {
      return Promise.resolve(g).then(f, d);
    };
  }
  function a(f, g) {
    r[f] &&
      ((o[f] = function (m) {
        return new Promise(function (D, w) {
          i.push([f, m, D, w]) > 1 || c(f, m);
        });
      }),
      g && (o[f] = g(o[f])));
  }
  function c(f, g) {
    try {
      u(r[f](g));
    } catch (m) {
      h(i[0][3], m);
    }
  }
  function u(f) {
    f.value instanceof sn
      ? Promise.resolve(f.value.v).then(l, d)
      : h(i[0][2], f);
  }
  function l(f) {
    c("next", f);
  }
  function d(f) {
    c("throw", f);
  }
  function h(f, g) {
    f(g), i.shift(), i.length && c(i[0][0], i[0][1]);
  }
}
function lf(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator],
    n;
  return t
    ? t.call(e)
    : ((e = typeof af == "function" ? af(e) : e[Symbol.iterator]()),
      (n = {}),
      r("next"),
      r("throw"),
      r("return"),
      (n[Symbol.asyncIterator] = function () {
        return this;
      }),
      n);
  function r(i) {
    n[i] =
      e[i] &&
      function (s) {
        return new Promise(function (a, c) {
          (s = e[i](s)), o(a, c, s.done, s.value);
        });
      };
  }
  function o(i, s, a, c) {
    Promise.resolve(c).then(function (u) {
      i({ value: u, done: a });
    }, s);
  }
}
var ri = (e) => e && typeof e.length == "number" && typeof e != "function";
function oi(e) {
  return S(e?.then);
}
function ii(e) {
  return S(e[An]);
}
function si(e) {
  return Symbol.asyncIterator && S(e?.[Symbol.asyncIterator]);
}
function ai(e) {
  return new TypeError(
    `You provided ${
      e !== null && typeof e == "object" ? "an invalid object" : `'${e}'`
    } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function DD() {
  return typeof Symbol != "function" || !Symbol.iterator
    ? "@@iterator"
    : Symbol.iterator;
}
var ci = DD();
function ui(e) {
  return S(e?.[ci]);
}
function li(e) {
  return uf(this, arguments, function* () {
    let n = e.getReader();
    try {
      for (;;) {
        let { value: r, done: o } = yield sn(n.read());
        if (o) return yield sn(void 0);
        yield yield sn(r);
      }
    } finally {
      n.releaseLock();
    }
  });
}
function di(e) {
  return S(e?.getReader);
}
function Q(e) {
  if (e instanceof j) return e;
  if (e != null) {
    if (ii(e)) return ED(e);
    if (ri(e)) return CD(e);
    if (oi(e)) return wD(e);
    if (si(e)) return df(e);
    if (ui(e)) return ID(e);
    if (di(e)) return _D(e);
  }
  throw ai(e);
}
function ED(e) {
  return new j((t) => {
    let n = e[An]();
    if (S(n.subscribe)) return n.subscribe(t);
    throw new TypeError(
      "Provided object does not correctly implement Symbol.observable"
    );
  });
}
function CD(e) {
  return new j((t) => {
    for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
    t.complete();
  });
}
function wD(e) {
  return new j((t) => {
    e.then(
      (n) => {
        t.closed || (t.next(n), t.complete());
      },
      (n) => t.error(n)
    ).then(null, Jo);
  });
}
function ID(e) {
  return new j((t) => {
    for (let n of e) if ((t.next(n), t.closed)) return;
    t.complete();
  });
}
function df(e) {
  return new j((t) => {
    bD(e, t).catch((n) => t.error(n));
  });
}
function _D(e) {
  return df(li(e));
}
function bD(e, t) {
  var n, r, o, i;
  return cf(this, void 0, void 0, function* () {
    try {
      for (n = lf(e); (r = yield n.next()), !r.done; ) {
        let s = r.value;
        if ((t.next(s), t.closed)) return;
      }
    } catch (s) {
      o = { error: s };
    } finally {
      try {
        r && !r.done && (i = n.return) && (yield i.call(n));
      } finally {
        if (o) throw o.error;
      }
    }
    t.complete();
  });
}
function ve(e, t, n, r = 0, o = !1) {
  let i = t.schedule(function () {
    n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if ((e.add(i), !o)) return i;
}
function fi(e, t = 0) {
  return U((n, r) => {
    n.subscribe(
      k(
        r,
        (o) => ve(r, e, () => r.next(o), t),
        () => ve(r, e, () => r.complete(), t),
        (o) => ve(r, e, () => r.error(o), t)
      )
    );
  });
}
function hi(e, t = 0) {
  return U((n, r) => {
    r.add(e.schedule(() => n.subscribe(r), t));
  });
}
function ff(e, t) {
  return Q(e).pipe(hi(t), fi(t));
}
function hf(e, t) {
  return Q(e).pipe(hi(t), fi(t));
}
function pf(e, t) {
  return new j((n) => {
    let r = 0;
    return t.schedule(function () {
      r === e.length
        ? n.complete()
        : (n.next(e[r++]), n.closed || this.schedule());
    });
  });
}
function gf(e, t) {
  return new j((n) => {
    let r;
    return (
      ve(n, t, () => {
        (r = e[ci]()),
          ve(
            n,
            t,
            () => {
              let o, i;
              try {
                ({ value: o, done: i } = r.next());
              } catch (s) {
                n.error(s);
                return;
              }
              i ? n.complete() : n.next(o);
            },
            0,
            !0
          );
      }),
      () => S(r?.return) && r.return()
    );
  });
}
function pi(e, t) {
  if (!e) throw new Error("Iterable cannot be null");
  return new j((n) => {
    ve(n, t, () => {
      let r = e[Symbol.asyncIterator]();
      ve(
        n,
        t,
        () => {
          r.next().then((o) => {
            o.done ? n.complete() : n.next(o.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function mf(e, t) {
  return pi(li(e), t);
}
function vf(e, t) {
  if (e != null) {
    if (ii(e)) return ff(e, t);
    if (ri(e)) return pf(e, t);
    if (oi(e)) return hf(e, t);
    if (si(e)) return pi(e, t);
    if (ui(e)) return gf(e, t);
    if (di(e)) return mf(e, t);
  }
  throw ai(e);
}
function z(e, t) {
  return t ? vf(e, t) : Q(e);
}
function M(...e) {
  let t = Rt(e);
  return z(e, t);
}
function On(e, t) {
  let n = S(e) ? e : () => e,
    r = (o) => o.error(n());
  return new j(t ? (o) => t.schedule(r, 0, o) : r);
}
function Ya(e) {
  return !!e && (e instanceof j || (S(e.lift) && S(e.subscribe)));
}
var dt = Mn(
  (e) =>
    function () {
      e(this),
        (this.name = "EmptyError"),
        (this.message = "no elements in sequence");
    }
);
function N(e, t) {
  return U((n, r) => {
    let o = 0;
    n.subscribe(
      k(r, (i) => {
        r.next(e.call(t, i, o++));
      })
    );
  });
}
var { isArray: MD } = Array;
function TD(e, t) {
  return MD(t) ? e(...t) : e(t);
}
function gi(e) {
  return N((t) => TD(e, t));
}
var { isArray: SD } = Array,
  { getPrototypeOf: ND, prototype: AD, keys: RD } = Object;
function mi(e) {
  if (e.length === 1) {
    let t = e[0];
    if (SD(t)) return { args: t, keys: null };
    if (xD(t)) {
      let n = RD(t);
      return { args: n.map((r) => t[r]), keys: n };
    }
  }
  return { args: e, keys: null };
}
function xD(e) {
  return e && typeof e == "object" && ND(e) === AD;
}
function vi(e, t) {
  return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
}
function Rr(...e) {
  let t = Rt(e),
    n = ni(e),
    { args: r, keys: o } = mi(e);
  if (r.length === 0) return z([], t);
  let i = new j(OD(r, t, o ? (s) => vi(o, s) : be));
  return n ? i.pipe(gi(n)) : i;
}
function OD(e, t, n = be) {
  return (r) => {
    yf(
      t,
      () => {
        let { length: o } = e,
          i = new Array(o),
          s = o,
          a = o;
        for (let c = 0; c < o; c++)
          yf(
            t,
            () => {
              let u = z(e[c], t),
                l = !1;
              u.subscribe(
                k(
                  r,
                  (d) => {
                    (i[c] = d), l || ((l = !0), a--), a || r.next(n(i.slice()));
                  },
                  () => {
                    --s || r.complete();
                  }
                )
              );
            },
            r
          );
      },
      r
    );
  };
}
function yf(e, t, n) {
  e ? ve(n, e, t) : t();
}
function Df(e, t, n, r, o, i, s, a) {
  let c = [],
    u = 0,
    l = 0,
    d = !1,
    h = () => {
      d && !c.length && !u && t.complete();
    },
    f = (m) => (u < r ? g(m) : c.push(m)),
    g = (m) => {
      i && t.next(m), u++;
      let D = !1;
      Q(n(m, l++)).subscribe(
        k(
          t,
          (w) => {
            o?.(w), i ? f(w) : t.next(w);
          },
          () => {
            D = !0;
          },
          void 0,
          () => {
            if (D)
              try {
                for (u--; c.length && u < r; ) {
                  let w = c.shift();
                  s ? ve(t, s, () => g(w)) : g(w);
                }
                h();
              } catch (w) {
                t.error(w);
              }
          }
        )
      );
    };
  return (
    e.subscribe(
      k(t, f, () => {
        (d = !0), h();
      })
    ),
    () => {
      a?.();
    }
  );
}
function X(e, t, n = 1 / 0) {
  return S(t)
    ? X((r, o) => N((i, s) => t(r, i, o, s))(Q(e(r, o))), n)
    : (typeof t == "number" && (n = t), U((r, o) => Df(r, o, e, n)));
}
function Pn(e = 1 / 0) {
  return X(be, e);
}
function Ef() {
  return Pn(1);
}
function Fn(...e) {
  return Ef()(z(e, Rt(e)));
}
function yi(e) {
  return new j((t) => {
    Q(e()).subscribe(t);
  });
}
function Ka(...e) {
  let t = ni(e),
    { args: n, keys: r } = mi(e),
    o = new j((i) => {
      let { length: s } = n;
      if (!s) {
        i.complete();
        return;
      }
      let a = new Array(s),
        c = s,
        u = s;
      for (let l = 0; l < s; l++) {
        let d = !1;
        Q(n[l]).subscribe(
          k(
            i,
            (h) => {
              d || ((d = !0), u--), (a[l] = h);
            },
            () => c--,
            void 0,
            () => {
              (!c || !d) && (u || i.next(r ? vi(r, a) : a), i.complete());
            }
          )
        );
      }
    });
  return t ? o.pipe(gi(t)) : o;
}
function ye(e, t) {
  return U((n, r) => {
    let o = 0;
    n.subscribe(k(r, (i) => e.call(t, i, o++) && r.next(i)));
  });
}
function xt(e) {
  return U((t, n) => {
    let r = null,
      o = !1,
      i;
    (r = t.subscribe(
      k(n, void 0, void 0, (s) => {
        (i = Q(e(s, xt(e)(t)))),
          r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
      })
    )),
      o && (r.unsubscribe(), (r = null), i.subscribe(n));
  });
}
function Cf(e, t, n, r, o) {
  return (i, s) => {
    let a = n,
      c = t,
      u = 0;
    i.subscribe(
      k(
        s,
        (l) => {
          let d = u++;
          (c = a ? e(c, l, d) : ((a = !0), l)), r && s.next(c);
        },
        o &&
          (() => {
            a && s.next(c), s.complete();
          })
      )
    );
  };
}
function ft(e, t) {
  return S(t) ? X(e, t, 1) : X(e, 1);
}
function Ot(e) {
  return U((t, n) => {
    let r = !1;
    t.subscribe(
      k(
        n,
        (o) => {
          (r = !0), n.next(o);
        },
        () => {
          r || n.next(e), n.complete();
        }
      )
    );
  });
}
function ht(e) {
  return e <= 0
    ? () => Me
    : U((t, n) => {
        let r = 0;
        t.subscribe(
          k(n, (o) => {
            ++r <= e && (n.next(o), e <= r && n.complete());
          })
        );
      });
}
function Di(e = PD) {
  return U((t, n) => {
    let r = !1;
    t.subscribe(
      k(
        n,
        (o) => {
          (r = !0), n.next(o);
        },
        () => (r ? n.complete() : n.error(e()))
      )
    );
  });
}
function PD() {
  return new dt();
}
function an(e) {
  return U((t, n) => {
    try {
      t.subscribe(n);
    } finally {
      n.add(e);
    }
  });
}
function pt(e, t) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(
      e ? ye((o, i) => e(o, i, r)) : be,
      ht(1),
      n ? Ot(t) : Di(() => new dt())
    );
}
function kn(e) {
  return e <= 0
    ? () => Me
    : U((t, n) => {
        let r = [];
        t.subscribe(
          k(
            n,
            (o) => {
              r.push(o), e < r.length && r.shift();
            },
            () => {
              for (let o of r) n.next(o);
              n.complete();
            },
            void 0,
            () => {
              r = null;
            }
          )
        );
      });
}
function Qa(e, t) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(
      e ? ye((o, i) => e(o, i, r)) : be,
      kn(1),
      n ? Ot(t) : Di(() => new dt())
    );
}
function Xa(e, t) {
  return U(Cf(e, t, arguments.length >= 2, !0));
}
function Ja(...e) {
  let t = Rt(e);
  return U((n, r) => {
    (t ? Fn(e, n, t) : Fn(e, n)).subscribe(r);
  });
}
function De(e, t) {
  return U((n, r) => {
    let o = null,
      i = 0,
      s = !1,
      a = () => s && !o && r.complete();
    n.subscribe(
      k(
        r,
        (c) => {
          o?.unsubscribe();
          let u = 0,
            l = i++;
          Q(e(c, l)).subscribe(
            (o = k(
              r,
              (d) => r.next(t ? t(c, d, l, u++) : d),
              () => {
                (o = null), a();
              }
            ))
          );
        },
        () => {
          (s = !0), a();
        }
      )
    );
  });
}
function ec(e) {
  return U((t, n) => {
    Q(e).subscribe(k(n, () => n.complete(), Ar)), !n.closed && t.subscribe(n);
  });
}
function ne(e, t, n) {
  let r = S(e) || t || n ? { next: e, error: t, complete: n } : e;
  return r
    ? U((o, i) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        o.subscribe(
          k(
            i,
            (c) => {
              var u;
              (u = r.next) === null || u === void 0 || u.call(r, c), i.next(c);
            },
            () => {
              var c;
              (a = !1),
                (c = r.complete) === null || c === void 0 || c.call(r),
                i.complete();
            },
            (c) => {
              var u;
              (a = !1),
                (u = r.error) === null || u === void 0 || u.call(r, c),
                i.error(c);
            },
            () => {
              var c, u;
              a && ((c = r.unsubscribe) === null || c === void 0 || c.call(r)),
                (u = r.finalize) === null || u === void 0 || u.call(r);
            }
          )
        );
      })
    : be;
}
var ic = { JSACTION: "jsaction" },
  sc = { JSACTION: "__jsaction", OWNER: "__owner" },
  bf = {};
function FD(e) {
  return e[sc.JSACTION];
}
function wf(e, t) {
  e[sc.JSACTION] = t;
}
function kD(e) {
  return bf[e];
}
function LD(e, t) {
  bf[e] = t;
}
var _ = {
    AUXCLICK: "auxclick",
    CHANGE: "change",
    CLICK: "click",
    CLICKMOD: "clickmod",
    CLICKONLY: "clickonly",
    DBLCLICK: "dblclick",
    FOCUS: "focus",
    FOCUSIN: "focusin",
    BLUR: "blur",
    FOCUSOUT: "focusout",
    SUBMIT: "submit",
    KEYDOWN: "keydown",
    KEYPRESS: "keypress",
    KEYUP: "keyup",
    MOUSEUP: "mouseup",
    MOUSEDOWN: "mousedown",
    MOUSEOVER: "mouseover",
    MOUSEOUT: "mouseout",
    MOUSEENTER: "mouseenter",
    MOUSELEAVE: "mouseleave",
    MOUSEMOVE: "mousemove",
    POINTERUP: "pointerup",
    POINTERDOWN: "pointerdown",
    POINTEROVER: "pointerover",
    POINTEROUT: "pointerout",
    POINTERENTER: "pointerenter",
    POINTERLEAVE: "pointerleave",
    POINTERMOVE: "pointermove",
    POINTERCANCEL: "pointercancel",
    GOTPOINTERCAPTURE: "gotpointercapture",
    LOSTPOINTERCAPTURE: "lostpointercapture",
    ERROR: "error",
    LOAD: "load",
    UNLOAD: "unload",
    TOUCHSTART: "touchstart",
    TOUCHEND: "touchend",
    TOUCHMOVE: "touchmove",
    INPUT: "input",
    SCROLL: "scroll",
    TOGGLE: "toggle",
    CUSTOM: "_custom",
  },
  VD = [_.MOUSEENTER, _.MOUSELEAVE, "pointerenter", "pointerleave"],
  vF = [
    _.CLICK,
    _.DBLCLICK,
    _.FOCUSIN,
    _.FOCUSOUT,
    _.KEYDOWN,
    _.KEYUP,
    _.KEYPRESS,
    _.MOUSEOVER,
    _.MOUSEOUT,
    _.SUBMIT,
    _.TOUCHSTART,
    _.TOUCHEND,
    _.TOUCHMOVE,
    "touchcancel",
    "auxclick",
    "change",
    "compositionstart",
    "compositionupdate",
    "compositionend",
    "beforeinput",
    "input",
    "select",
    "copy",
    "cut",
    "paste",
    "mousedown",
    "mouseup",
    "wheel",
    "contextmenu",
    "dragover",
    "dragenter",
    "dragleave",
    "drop",
    "dragstart",
    "dragend",
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointercancel",
    "pointerover",
    "pointerout",
    "gotpointercapture",
    "lostpointercapture",
    "ended",
    "loadedmetadata",
    "pagehide",
    "pageshow",
    "visibilitychange",
    "beforematch",
  ],
  jD = [_.FOCUS, _.BLUR, _.ERROR, _.LOAD, _.TOGGLE],
  ac = (e) => jD.indexOf(e) >= 0;
var UD = 3,
  BD = 13,
  $D = 32,
  Te = { MAC_ENTER: UD, ENTER: BD, SPACE: $D };
function HD(e) {
  return e === _.MOUSEENTER
    ? _.MOUSEOVER
    : e === _.MOUSELEAVE
    ? _.MOUSEOUT
    : e === _.POINTERENTER
    ? _.POINTEROVER
    : e === _.POINTERLEAVE
    ? _.POINTEROUT
    : e;
}
function zD(e, t, n, r) {
  let o = !1;
  ac(t) && (o = !0);
  let i = typeof r == "boolean" ? { capture: o, passive: r } : o;
  return (
    e.addEventListener(t, n, i),
    { eventType: t, handler: n, capture: o, passive: r }
  );
}
function GD(e, t) {
  if (e.removeEventListener) {
    let n = typeof t.passive == "boolean" ? { capture: t.capture } : t.capture;
    e.removeEventListener(t.eventType, t.handler, n);
  } else e.detachEvent && e.detachEvent(`on${t.eventType}`, t.handler);
}
function qD(e) {
  e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
}
var If = typeof navigator < "u" && /Macintosh/.test(navigator.userAgent);
function WD(e) {
  return e.which === 2 || (e.which == null && e.button === 4);
}
function ZD(e) {
  return (If && e.metaKey) || (!If && e.ctrlKey) || WD(e) || e.shiftKey;
}
var yF =
    typeof navigator < "u" &&
    !/Opera/.test(navigator.userAgent) &&
    /WebKit/.test(navigator.userAgent),
  DF =
    typeof navigator < "u" &&
    (/MSIE/.test(navigator.userAgent) || /Trident/.test(navigator.userAgent)),
  EF =
    typeof navigator < "u" &&
    !/Opera|WebKit/.test(navigator.userAgent) &&
    /Gecko/.test(navigator.product);
function YD(e, t, n) {
  let r = e.relatedTarget;
  return (
    ((e.type === _.MOUSEOVER && t === _.MOUSEENTER) ||
      (e.type === _.MOUSEOUT && t === _.MOUSELEAVE) ||
      (e.type === _.POINTEROVER && t === _.POINTERENTER) ||
      (e.type === _.POINTEROUT && t === _.POINTERLEAVE)) &&
    (!r || (r !== n && !n.contains(r)))
  );
}
function KD(e, t) {
  let n = {};
  for (let r in e) {
    if (r === "srcElement" || r === "target") continue;
    let o = r,
      i = e[o];
    typeof i != "function" && (n[o] = i);
  }
  return (
    e.type === _.MOUSEOVER
      ? (n.type = _.MOUSEENTER)
      : e.type === _.MOUSEOUT
      ? (n.type = _.MOUSELEAVE)
      : e.type === _.POINTEROVER
      ? (n.type = _.POINTERENTER)
      : (n.type = _.POINTERLEAVE),
    (n.target = n.srcElement = t),
    (n.bubbles = !1),
    n
  );
}
var CF = { Enter: Te.ENTER, " ": Te.SPACE },
  wF = {
    A: Te.ENTER,
    BUTTON: 0,
    CHECKBOX: Te.SPACE,
    COMBOBOX: Te.ENTER,
    FILE: 0,
    GRIDCELL: Te.ENTER,
    LINK: Te.ENTER,
    LISTBOX: Te.ENTER,
    MENU: 0,
    MENUBAR: 0,
    MENUITEM: 0,
    MENUITEMCHECKBOX: 0,
    MENUITEMRADIO: 0,
    OPTION: 0,
    RADIO: Te.SPACE,
    RADIOGROUP: Te.SPACE,
    RESET: 0,
    SUBMIT: 0,
    SWITCH: Te.SPACE,
    TAB: 0,
    TREE: Te.ENTER,
    TREEITEM: Te.ENTER,
  };
var QD = typeof navigator < "u" && /iPhone|iPad|iPod/.test(navigator.userAgent),
  Ii = class {
    element;
    handlerInfos = [];
    constructor(t) {
      this.element = t;
    }
    addEventListener(t, n, r) {
      QD && (this.element.style.cursor = "pointer"),
        this.handlerInfos.push(zD(this.element, t, n(this.element), r));
    }
    cleanUp() {
      for (let t = 0; t < this.handlerInfos.length; t++)
        GD(this.element, this.handlerInfos[t]);
      this.handlerInfos = [];
    }
  },
  XD = { NAMESPACE_ACTION_SEPARATOR: ".", EVENT_ACTION_SEPARATOR: ":" };
function Pt(e) {
  return e.eventType;
}
function cc(e, t) {
  e.eventType = t;
}
function Ci(e) {
  return e.event;
}
function Mf(e, t) {
  e.event = t;
}
function Tf(e) {
  return e.targetElement;
}
function Sf(e, t) {
  e.targetElement = t;
}
function Nf(e) {
  return e.eic;
}
function JD(e, t) {
  e.eic = t;
}
function eE(e) {
  return e.timeStamp;
}
function tE(e, t) {
  e.timeStamp = t;
}
function wi(e) {
  return e.eia;
}
function Af(e, t, n) {
  e.eia = [t, n];
}
function tc(e) {
  e.eia = void 0;
}
function Ei(e) {
  return e[1];
}
function nE(e) {
  return e.eirp;
}
function Rf(e, t) {
  e.eirp = t;
}
function xf(e) {
  return e.eir;
}
function Of(e, t) {
  e.eir = t;
}
function Pf(e) {
  return {
    eventType: e.eventType,
    event: e.event,
    targetElement: e.targetElement,
    eic: e.eic,
    eia: e.eia,
    timeStamp: e.timeStamp,
    eirp: e.eirp,
    eiack: e.eiack,
    eir: e.eir,
  };
}
function rE(e, t, n, r, o, i, s, a) {
  return {
    eventType: e,
    event: t,
    targetElement: n,
    eic: r,
    timeStamp: o,
    eia: i,
    eirp: s,
    eiack: a,
  };
}
var nc = class e {
    eventInfo;
    constructor(t) {
      this.eventInfo = t;
    }
    getEventType() {
      return Pt(this.eventInfo);
    }
    setEventType(t) {
      cc(this.eventInfo, t);
    }
    getEvent() {
      return Ci(this.eventInfo);
    }
    setEvent(t) {
      Mf(this.eventInfo, t);
    }
    getTargetElement() {
      return Tf(this.eventInfo);
    }
    setTargetElement(t) {
      Sf(this.eventInfo, t);
    }
    getContainer() {
      return Nf(this.eventInfo);
    }
    setContainer(t) {
      JD(this.eventInfo, t);
    }
    getTimestamp() {
      return eE(this.eventInfo);
    }
    setTimestamp(t) {
      tE(this.eventInfo, t);
    }
    getAction() {
      let t = wi(this.eventInfo);
      if (t) return { name: t[0], element: t[1] };
    }
    setAction(t) {
      if (!t) {
        tc(this.eventInfo);
        return;
      }
      Af(this.eventInfo, t.name, t.element);
    }
    getIsReplay() {
      return nE(this.eventInfo);
    }
    setIsReplay(t) {
      Rf(this.eventInfo, t);
    }
    getResolved() {
      return xf(this.eventInfo);
    }
    setResolved(t) {
      Of(this.eventInfo, t);
    }
    clone() {
      return new e(Pf(this.eventInfo));
    }
  },
  oE = {},
  iE = /\s*;\s*/,
  sE = _.CLICK,
  rc = class {
    a11yClickSupport = !1;
    clickModSupport = !0;
    syntheticMouseEventSupport;
    updateEventInfoForA11yClick = void 0;
    preventDefaultForA11yClick = void 0;
    populateClickOnlyAction = void 0;
    constructor({
      syntheticMouseEventSupport: t = !1,
      clickModSupport: n = !0,
    } = {}) {
      (this.syntheticMouseEventSupport = t), (this.clickModSupport = n);
    }
    resolveEventType(t) {
      this.clickModSupport && Pt(t) === _.CLICK && ZD(Ci(t))
        ? cc(t, _.CLICKMOD)
        : this.a11yClickSupport && this.updateEventInfoForA11yClick(t);
    }
    resolveAction(t) {
      xf(t) || (this.populateAction(t, Tf(t)), Of(t, !0));
    }
    resolveParentAction(t) {
      let n = wi(t),
        r = n && Ei(n);
      tc(t);
      let o = r && this.getParentNode(r);
      o && this.populateAction(t, o);
    }
    populateAction(t, n) {
      let r = n;
      for (
        ;
        r &&
        r !== Nf(t) &&
        (r.nodeType === Node.ELEMENT_NODE && this.populateActionOnElement(r, t),
        !wi(t));

      )
        r = this.getParentNode(r);
      let o = wi(t);
      if (
        o &&
        (this.a11yClickSupport && this.preventDefaultForA11yClick(t),
        this.syntheticMouseEventSupport &&
          (Pt(t) === _.MOUSEENTER ||
            Pt(t) === _.MOUSELEAVE ||
            Pt(t) === _.POINTERENTER ||
            Pt(t) === _.POINTERLEAVE))
      )
        if (YD(Ci(t), Pt(t), Ei(o))) {
          let i = KD(Ci(t), Ei(o));
          Mf(t, i), Sf(t, Ei(o));
        } else tc(t);
    }
    getParentNode(t) {
      let n = t[sc.OWNER];
      if (n) return n;
      let r = t.parentNode;
      return r?.nodeName === "#document-fragment" ? r?.host ?? null : r;
    }
    populateActionOnElement(t, n) {
      let r = this.parseActions(t),
        o = r[Pt(n)];
      o !== void 0 && Af(n, o, t),
        this.a11yClickSupport && this.populateClickOnlyAction(t, n, r);
    }
    parseActions(t) {
      let n = FD(t);
      if (!n) {
        let r = t.getAttribute(ic.JSACTION);
        if (!r) (n = oE), wf(t, n);
        else {
          if (((n = kD(r)), !n)) {
            n = {};
            let o = r.split(iE);
            for (let i = 0; i < o.length; i++) {
              let s = o[i];
              if (!s) continue;
              let a = s.indexOf(XD.EVENT_ACTION_SEPARATOR),
                c = a !== -1,
                u = c ? s.substr(0, a).trim() : sE,
                l = c ? s.substr(a + 1).trim() : s;
              n[u] = l;
            }
            LD(r, n);
          }
          wf(t, n);
        }
      }
      return n;
    }
    addA11yClickSupport(t, n, r) {
      (this.a11yClickSupport = !0),
        (this.updateEventInfoForA11yClick = t),
        (this.preventDefaultForA11yClick = n),
        (this.populateClickOnlyAction = r);
    }
  },
  Ff = (function (e) {
    return (
      (e[(e.I_AM_THE_JSACTION_FRAMEWORK = 0)] = "I_AM_THE_JSACTION_FRAMEWORK"),
      e
    );
  })(Ff || {}),
  oc = class {
    dispatchDelegate;
    actionResolver;
    eventReplayer;
    eventReplayScheduled = !1;
    replayEventInfoWrappers = [];
    constructor(t, { actionResolver: n, eventReplayer: r } = {}) {
      (this.dispatchDelegate = t),
        (this.actionResolver = n),
        (this.eventReplayer = r);
    }
    dispatch(t) {
      let n = new nc(t);
      this.actionResolver?.resolveEventType(t),
        this.actionResolver?.resolveAction(t);
      let r = n.getAction();
      if (
        (r && aE(r.element, n) && qD(n.getEvent()),
        this.eventReplayer && n.getIsReplay())
      ) {
        this.scheduleEventInfoWrapperReplay(n);
        return;
      }
      this.dispatchDelegate(n);
    }
    scheduleEventInfoWrapperReplay(t) {
      this.replayEventInfoWrappers.push(t),
        !this.eventReplayScheduled &&
          ((this.eventReplayScheduled = !0),
          Promise.resolve().then(() => {
            (this.eventReplayScheduled = !1),
              this.eventReplayer(this.replayEventInfoWrappers);
          }));
    }
  };
function aE(e, t) {
  return (
    e.tagName === "A" &&
    (t.getEventType() === _.CLICK || t.getEventType() === _.CLICKMOD)
  );
}
var kf = Symbol.for("propagationStopped"),
  uc = { REPLAY: 101 };
var cE = "`preventDefault` called during event replay.";
var uE = "`composedPath` called during event replay.",
  _i = class {
    dispatchDelegate;
    clickModSupport;
    actionResolver;
    dispatcher;
    constructor(t, n = !0) {
      (this.dispatchDelegate = t),
        (this.clickModSupport = n),
        (this.actionResolver = new rc({ clickModSupport: n })),
        (this.dispatcher = new oc(
          (r) => {
            this.dispatchToDelegate(r);
          },
          { actionResolver: this.actionResolver }
        ));
    }
    dispatch(t) {
      this.dispatcher.dispatch(t);
    }
    dispatchToDelegate(t) {
      for (t.getIsReplay() && fE(t), lE(t); t.getAction(); ) {
        if (
          (hE(t),
          (ac(t.getEventType()) &&
            t.getAction().element !== t.getTargetElement()) ||
            (this.dispatchDelegate(t.getEvent(), t.getAction().name), dE(t)))
        )
          return;
        this.actionResolver.resolveParentAction(t.eventInfo);
      }
    }
  };
function lE(e) {
  let t = e.getEvent(),
    n = e.getEvent().stopPropagation.bind(t),
    r = () => {
      (t[kf] = !0), n();
    };
  cn(t, "stopPropagation", r), cn(t, "stopImmediatePropagation", r);
}
function dE(e) {
  return !!e.getEvent()[kf];
}
function fE(e) {
  let t = e.getEvent(),
    n = e.getTargetElement(),
    r = t.preventDefault.bind(t);
  cn(t, "target", n),
    cn(t, "eventPhase", uc.REPLAY),
    cn(t, "preventDefault", () => {
      throw (r(), new Error(cE + ""));
    }),
    cn(t, "composedPath", () => {
      throw new Error(uE + "");
    });
}
function hE(e) {
  let t = e.getEvent(),
    n = e.getAction()?.element;
  n && cn(t, "currentTarget", n, { configurable: !0 });
}
function cn(e, t, n, { configurable: r = !1 } = {}) {
  Object.defineProperty(e, t, { value: n, configurable: r });
}
function Lf(e, t) {
  e.ecrd((n) => {
    t.dispatch(n);
  }, Ff.I_AM_THE_JSACTION_FRAMEWORK);
}
function pE(e) {
  return e?.q ?? [];
}
function gE(e) {
  e && (_f(e.c, e.et, e.h), _f(e.c, e.etc, e.h, !0));
}
function _f(e, t, n, r) {
  for (let o = 0; o < t.length; o++) e.removeEventListener(t[o], n, r);
}
var mE = !1,
  Vf = (() => {
    class e {
      static MOUSE_SPECIAL_SUPPORT = mE;
      containerManager;
      eventHandlers = {};
      browserEventTypeToExtraEventTypes = {};
      dispatcher = null;
      queuedEventInfos = [];
      constructor(n) {
        this.containerManager = n;
      }
      handleEvent(n, r, o) {
        let i = rE(n, r, r.target, o, Date.now());
        this.handleEventInfo(i);
      }
      handleEventInfo(n) {
        if (!this.dispatcher) {
          Rf(n, !0), this.queuedEventInfos?.push(n);
          return;
        }
        this.dispatcher(n);
      }
      addEvent(n, r, o) {
        if (
          n in this.eventHandlers ||
          !this.containerManager ||
          (!e.MOUSE_SPECIAL_SUPPORT && VD.indexOf(n) >= 0)
        )
          return;
        let i = (a, c, u) => {
          this.handleEvent(a, c, u);
        };
        this.eventHandlers[n] = i;
        let s = HD(r || n);
        if (s !== n) {
          let a = this.browserEventTypeToExtraEventTypes[s] || [];
          a.push(n), (this.browserEventTypeToExtraEventTypes[s] = a);
        }
        this.containerManager.addEventListener(
          s,
          (a) => (c) => {
            i(n, c, a);
          },
          o
        );
      }
      replayEarlyEvents(n = window._ejsa) {
        n && (this.replayEarlyEventInfos(n.q), gE(n), delete window._ejsa);
      }
      replayEarlyEventInfos(n) {
        for (let r = 0; r < n.length; r++) {
          let o = n[r],
            i = this.getEventTypesForBrowserEventType(o.eventType);
          for (let s = 0; s < i.length; s++) {
            let a = Pf(o);
            cc(a, i[s]), this.handleEventInfo(a);
          }
        }
      }
      getEventTypesForBrowserEventType(n) {
        let r = [];
        return (
          this.eventHandlers[n] && r.push(n),
          this.browserEventTypeToExtraEventTypes[n] &&
            r.push(...this.browserEventTypeToExtraEventTypes[n]),
          r
        );
      }
      handler(n) {
        return this.eventHandlers[n];
      }
      cleanUp() {
        this.containerManager?.cleanUp(),
          (this.containerManager = null),
          (this.eventHandlers = {}),
          (this.browserEventTypeToExtraEventTypes = {}),
          (this.dispatcher = null),
          (this.queuedEventInfos = []);
      }
      registerDispatcher(n, r) {
        this.ecrd(n, r);
      }
      ecrd(n, r) {
        if (((this.dispatcher = n), this.queuedEventInfos?.length)) {
          for (let o = 0; o < this.queuedEventInfos.length; o++)
            this.handleEventInfo(this.queuedEventInfos[o]);
          this.queuedEventInfos = null;
        }
      }
    }
    return e;
  })();
function jf(e, t = window) {
  return pE(t._ejsas?.[e]);
}
function Uf(e, t = window) {
  t._ejsas && (t._ejsas[e] = void 0);
}
var Bh = "https://g.co/ng/security#xss",
  E = class extends Error {
    code;
    constructor(t, n) {
      super(gs(t, n)), (this.code = t);
    }
  };
function gs(e, t) {
  return `${`NG0${Math.abs(e)}`}${t ? ": " + t : ""}`;
}
var $h = Symbol("InputSignalNode#UNSET"),
  vE = L(v({}, ja), {
    transformFn: void 0,
    applyValueToInputSignal(e, t) {
      Ko(e, t);
    },
  });
function Hh(e, t) {
  let n = Object.create(vE);
  (n.value = e), (n.transformFn = t?.transform);
  function r() {
    if ((qo(n), n.value === $h)) throw new E(-950, !1);
    return n.value;
  }
  return (r[ke] = n), r;
}
function Gr(e) {
  return { toString: e }.toString();
}
var bi = "__parameters__";
function yE(e) {
  return function (...n) {
    if (e) {
      let r = e(...n);
      for (let o in r) this[o] = r[o];
    }
  };
}
function zh(e, t, n) {
  return Gr(() => {
    let r = yE(t);
    function o(...i) {
      if (this instanceof o) return r.apply(this, i), this;
      let s = new o(...i);
      return (a.annotation = s), a;
      function a(c, u, l) {
        let d = c.hasOwnProperty(bi)
          ? c[bi]
          : Object.defineProperty(c, bi, { value: [] })[bi];
        for (; d.length <= l; ) d.push(null);
        return (d[l] = d[l] || []).push(s), c;
      }
    }
    return (
      n && (o.prototype = Object.create(n.prototype)),
      (o.prototype.ngMetadataName = e),
      (o.annotationCls = o),
      o
    );
  });
}
var kr = globalThis;
function H(e) {
  for (let t in e) if (e[t] === H) return t;
  throw Error("Could not find renamed property on target object.");
}
function DE(e, t) {
  for (let n in t) t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
}
function we(e) {
  if (typeof e == "string") return e;
  if (Array.isArray(e)) return "[" + e.map(we).join(", ") + "]";
  if (e == null) return "" + e;
  if (e.overriddenName) return `${e.overriddenName}`;
  if (e.name) return `${e.name}`;
  let t = e.toString();
  if (t == null) return "" + t;
  let n = t.indexOf(`
`);
  return n === -1 ? t : t.substring(0, n);
}
function Bf(e, t) {
  return e == null || e === ""
    ? t === null
      ? ""
      : t
    : t == null || t === ""
    ? e
    : e + " " + t;
}
var EE = H({ __forward_ref__: H });
function Bt(e) {
  return (
    (e.__forward_ref__ = Bt),
    (e.toString = function () {
      return we(this());
    }),
    e
  );
}
function pe(e) {
  return Gh(e) ? e() : e;
}
function Gh(e) {
  return (
    typeof e == "function" && e.hasOwnProperty(EE) && e.__forward_ref__ === Bt
  );
}
function C(e) {
  return {
    token: e.token,
    providedIn: e.providedIn || null,
    factory: e.factory,
    value: void 0,
  };
}
function Et(e) {
  return { providers: e.providers || [], imports: e.imports || [] };
}
function ms(e) {
  return $f(e, Wh) || $f(e, Zh);
}
function qh(e) {
  return ms(e) !== null;
}
function $f(e, t) {
  return e.hasOwnProperty(t) ? e[t] : null;
}
function CE(e) {
  let t = e && (e[Wh] || e[Zh]);
  return t || null;
}
function Hf(e) {
  return e && (e.hasOwnProperty(zf) || e.hasOwnProperty(wE)) ? e[zf] : null;
}
var Wh = H({ ɵprov: H }),
  zf = H({ ɵinj: H }),
  Zh = H({ ngInjectableDef: H }),
  wE = H({ ngInjectorDef: H }),
  y = class {
    _desc;
    ngMetadataName = "InjectionToken";
    ɵprov;
    constructor(t, n) {
      (this._desc = t),
        (this.ɵprov = void 0),
        typeof n == "number"
          ? (this.__NG_ELEMENT_ID__ = n)
          : n !== void 0 &&
            (this.ɵprov = C({
              token: this,
              providedIn: n.providedIn || "root",
              factory: n.factory,
            }));
    }
    get multi() {
      return this;
    }
    toString() {
      return `InjectionToken ${this._desc}`;
    }
  };
function Yh(e) {
  return e && !!e.ɵproviders;
}
var IE = H({ ɵcmp: H }),
  _E = H({ ɵdir: H }),
  bE = H({ ɵpipe: H }),
  ME = H({ ɵmod: H }),
  Ui = H({ ɵfac: H }),
  Fr = H({ __NG_ELEMENT_ID__: H }),
  Gf = H({ __NG_ENV_ID__: H });
function dn(e) {
  return typeof e == "string" ? e : e == null ? "" : String(e);
}
function TE(e) {
  return typeof e == "function"
    ? e.name || e.toString()
    : typeof e == "object" && e != null && typeof e.type == "function"
    ? e.type.name || e.type.toString()
    : dn(e);
}
function SE(e, t) {
  let n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
  throw new E(-200, e);
}
function Nu(e, t) {
  throw new E(-201, !1);
}
var P = (function (e) {
    return (
      (e[(e.Default = 0)] = "Default"),
      (e[(e.Host = 1)] = "Host"),
      (e[(e.Self = 2)] = "Self"),
      (e[(e.SkipSelf = 4)] = "SkipSelf"),
      (e[(e.Optional = 8)] = "Optional"),
      e
    );
  })(P || {}),
  Mc;
function Kh() {
  return Mc;
}
function Ee(e) {
  let t = Mc;
  return (Mc = e), t;
}
function Qh(e, t, n) {
  let r = ms(e);
  if (r && r.providedIn == "root")
    return r.value === void 0 ? (r.value = r.factory()) : r.value;
  if (n & P.Optional) return null;
  if (t !== void 0) return t;
  Nu(e, "Injector");
}
var NE = {},
  Lr = NE,
  Tc = "__NG_DI_FLAG__",
  Bi = "ngTempTokenPath",
  AE = "ngTokenPath",
  RE = /\n/gm,
  xE = "\u0275",
  qf = "__source",
  Bn;
function OE() {
  return Bn;
}
function Ft(e) {
  let t = Bn;
  return (Bn = e), t;
}
function PE(e, t = P.Default) {
  if (Bn === void 0) throw new E(-203, !1);
  return Bn === null
    ? Qh(e, void 0, t)
    : Bn.get(e, t & P.Optional ? null : void 0, t);
}
function I(e, t = P.Default) {
  return (Kh() || PE)(pe(e), t);
}
function p(e, t = P.Default) {
  return I(e, vs(t));
}
function vs(e) {
  return typeof e > "u" || typeof e == "number"
    ? e
    : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function Sc(e) {
  let t = [];
  for (let n = 0; n < e.length; n++) {
    let r = pe(e[n]);
    if (Array.isArray(r)) {
      if (r.length === 0) throw new E(900, !1);
      let o,
        i = P.Default;
      for (let s = 0; s < r.length; s++) {
        let a = r[s],
          c = FE(a);
        typeof c == "number" ? (c === -1 ? (o = a.token) : (i |= c)) : (o = a);
      }
      t.push(I(o, i));
    } else t.push(I(r));
  }
  return t;
}
function Xh(e, t) {
  return (e[Tc] = t), (e.prototype[Tc] = t), e;
}
function FE(e) {
  return e[Tc];
}
function kE(e, t, n, r) {
  let o = e[Bi];
  throw (
    (t[qf] && o.unshift(t[qf]),
    (e.message = LE(
      `
` + e.message,
      o,
      n,
      r
    )),
    (e[AE] = o),
    (e[Bi] = null),
    e)
  );
}
function LE(e, t, n, r = null) {
  e =
    e &&
    e.charAt(0) ===
      `
` &&
    e.charAt(1) == xE
      ? e.slice(2)
      : e;
  let o = we(t);
  if (Array.isArray(t)) o = t.map(we).join(" -> ");
  else if (typeof t == "object") {
    let i = [];
    for (let s in t)
      if (t.hasOwnProperty(s)) {
        let a = t[s];
        i.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : we(a)));
      }
    o = `{${i.join(", ")}}`;
  }
  return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
    RE,
    `
  `
  )}`;
}
var ys = Xh(zh("Optional"), 8);
var Au = Xh(zh("SkipSelf"), 4);
function fn(e, t) {
  let n = e.hasOwnProperty(Ui);
  return n ? e[Ui] : null;
}
function Ru(e, t) {
  e.forEach((n) => (Array.isArray(n) ? Ru(n, t) : t(n)));
}
function Jh(e, t, n) {
  t >= e.length ? e.push(n) : e.splice(t, 0, n);
}
function $i(e, t) {
  return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
function VE(e, t, n, r) {
  let o = e.length;
  if (o == t) e.push(n, r);
  else if (o === 1) e.push(r, e[0]), (e[0] = n);
  else {
    for (o--, e.push(e[o - 1], e[o]); o > t; ) {
      let i = o - 2;
      (e[o] = e[i]), o--;
    }
    (e[t] = n), (e[t + 1] = r);
  }
}
function jE(e, t, n) {
  let r = qr(e, t);
  return r >= 0 ? (e[r | 1] = n) : ((r = ~r), VE(e, r, t, n)), r;
}
function lc(e, t) {
  let n = qr(e, t);
  if (n >= 0) return e[n | 1];
}
function qr(e, t) {
  return UE(e, t, 1);
}
function UE(e, t, n) {
  let r = 0,
    o = e.length >> n;
  for (; o !== r; ) {
    let i = r + ((o - r) >> 1),
      s = e[i << n];
    if (t === s) return i << n;
    s > t ? (o = i) : (r = i + 1);
  }
  return ~(o << n);
}
var Gn = {},
  Le = [],
  Lt = new y(""),
  ep = new y("", -1),
  tp = new y(""),
  Hi = class {
    get(t, n = Lr) {
      if (n === Lr) {
        let r = new Error(`NullInjectorError: No provider for ${we(t)}!`);
        throw ((r.name = "NullInjectorError"), r);
      }
      return n;
    }
  };
function np(e, t) {
  let n = e[ME] || null;
  if (!n && t === !0)
    throw new Error(`Type ${we(e)} does not have '\u0275mod' property.`);
  return n;
}
function gt(e) {
  return e[IE] || null;
}
function xu(e) {
  return e[_E] || null;
}
function Ou(e) {
  return e[bE] || null;
}
function rp(e) {
  let t = gt(e) || xu(e) || Ou(e);
  return t !== null && t.standalone;
}
function $t(e) {
  return { ɵproviders: e };
}
function BE(...e) {
  return { ɵproviders: Pu(!0, e), ɵfromNgModule: !0 };
}
function Pu(e, ...t) {
  let n = [],
    r = new Set(),
    o,
    i = (s) => {
      n.push(s);
    };
  return (
    Ru(t, (s) => {
      let a = s;
      Nc(a, i, [], r) && ((o ||= []), o.push(a));
    }),
    o !== void 0 && op(o, i),
    n
  );
}
function op(e, t) {
  for (let n = 0; n < e.length; n++) {
    let { ngModule: r, providers: o } = e[n];
    Fu(o, (i) => {
      t(i, r);
    });
  }
}
function Nc(e, t, n, r) {
  if (((e = pe(e)), !e)) return !1;
  let o = null,
    i = Hf(e),
    s = !i && gt(e);
  if (!i && !s) {
    let c = e.ngModule;
    if (((i = Hf(c)), i)) o = c;
    else return !1;
  } else {
    if (s && !s.standalone) return !1;
    o = e;
  }
  let a = r.has(o);
  if (s) {
    if (a) return !1;
    if ((r.add(o), s.dependencies)) {
      let c =
        typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
      for (let u of c) Nc(u, t, n, r);
    }
  } else if (i) {
    if (i.imports != null && !a) {
      r.add(o);
      let u;
      try {
        Ru(i.imports, (l) => {
          Nc(l, t, n, r) && ((u ||= []), u.push(l));
        });
      } finally {
      }
      u !== void 0 && op(u, t);
    }
    if (!a) {
      let u = fn(o) || (() => new o());
      t({ provide: o, useFactory: u, deps: Le }, o),
        t({ provide: tp, useValue: o, multi: !0 }, o),
        t({ provide: Lt, useValue: () => I(o), multi: !0 }, o);
    }
    let c = i.providers;
    if (c != null && !a) {
      let u = e;
      Fu(c, (l) => {
        t(l, u);
      });
    }
  } else return !1;
  return o !== e && e.providers !== void 0;
}
function Fu(e, t) {
  for (let n of e)
    Yh(n) && (n = n.ɵproviders), Array.isArray(n) ? Fu(n, t) : t(n);
}
var $E = H({ provide: String, useValue: H });
function ip(e) {
  return e !== null && typeof e == "object" && $E in e;
}
function HE(e) {
  return !!(e && e.useExisting);
}
function zE(e) {
  return !!(e && e.useFactory);
}
function qn(e) {
  return typeof e == "function";
}
function GE(e) {
  return !!e.useClass;
}
var Ds = new y(""),
  Oi = {},
  qE = {},
  dc;
function ku() {
  return dc === void 0 && (dc = new Hi()), dc;
}
var fe = class {},
  Vr = class extends fe {
    parent;
    source;
    scopes;
    records = new Map();
    _ngOnDestroyHooks = new Set();
    _onDestroyHooks = [];
    get destroyed() {
      return this._destroyed;
    }
    _destroyed = !1;
    injectorDefTypes;
    constructor(t, n, r, o) {
      super(),
        (this.parent = n),
        (this.source = r),
        (this.scopes = o),
        Rc(t, (s) => this.processProvider(s)),
        this.records.set(ep, Ln(void 0, this)),
        o.has("environment") && this.records.set(fe, Ln(void 0, this));
      let i = this.records.get(Ds);
      i != null && typeof i.value == "string" && this.scopes.add(i.value),
        (this.injectorDefTypes = new Set(this.get(tp, Le, P.Self)));
    }
    destroy() {
      Or(this), (this._destroyed = !0);
      let t = O(null);
      try {
        for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
        let n = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let r of n) r();
      } finally {
        this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear(),
          O(t);
      }
    }
    onDestroy(t) {
      return (
        Or(this), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t)
      );
    }
    runInContext(t) {
      Or(this);
      let n = Ft(this),
        r = Ee(void 0),
        o;
      try {
        return t();
      } finally {
        Ft(n), Ee(r);
      }
    }
    get(t, n = Lr, r = P.Default) {
      if ((Or(this), t.hasOwnProperty(Gf))) return t[Gf](this);
      r = vs(r);
      let o,
        i = Ft(this),
        s = Ee(void 0);
      try {
        if (!(r & P.SkipSelf)) {
          let c = this.records.get(t);
          if (c === void 0) {
            let u = QE(t) && ms(t);
            u && this.injectableDefInScope(u)
              ? (c = Ln(Ac(t), Oi))
              : (c = null),
              this.records.set(t, c);
          }
          if (c != null) return this.hydrate(t, c);
        }
        let a = r & P.Self ? ku() : this.parent;
        return (n = r & P.Optional && n === Lr ? null : n), a.get(t, n);
      } catch (a) {
        if (a.name === "NullInjectorError") {
          if (((a[Bi] = a[Bi] || []).unshift(we(t)), i)) throw a;
          return kE(a, t, "R3InjectorError", this.source);
        } else throw a;
      } finally {
        Ee(s), Ft(i);
      }
    }
    resolveInjectorInitializers() {
      let t = O(null),
        n = Ft(this),
        r = Ee(void 0),
        o;
      try {
        let i = this.get(Lt, Le, P.Self);
        for (let s of i) s();
      } finally {
        Ft(n), Ee(r), O(t);
      }
    }
    toString() {
      let t = [],
        n = this.records;
      for (let r of n.keys()) t.push(we(r));
      return `R3Injector[${t.join(", ")}]`;
    }
    processProvider(t) {
      t = pe(t);
      let n = qn(t) ? t : pe(t && t.provide),
        r = ZE(t);
      if (!qn(t) && t.multi === !0) {
        let o = this.records.get(n);
        o ||
          ((o = Ln(void 0, Oi, !0)),
          (o.factory = () => Sc(o.multi)),
          this.records.set(n, o)),
          (n = t),
          o.multi.push(t);
      }
      this.records.set(n, r);
    }
    hydrate(t, n) {
      let r = O(null);
      try {
        return (
          n.value === Oi && ((n.value = qE), (n.value = n.factory())),
          typeof n.value == "object" &&
            n.value &&
            KE(n.value) &&
            this._ngOnDestroyHooks.add(n.value),
          n.value
        );
      } finally {
        O(r);
      }
    }
    injectableDefInScope(t) {
      if (!t.providedIn) return !1;
      let n = pe(t.providedIn);
      return typeof n == "string"
        ? n === "any" || this.scopes.has(n)
        : this.injectorDefTypes.has(n);
    }
    removeOnDestroy(t) {
      let n = this._onDestroyHooks.indexOf(t);
      n !== -1 && this._onDestroyHooks.splice(n, 1);
    }
  };
function Ac(e) {
  let t = ms(e),
    n = t !== null ? t.factory : fn(e);
  if (n !== null) return n;
  if (e instanceof y) throw new E(204, !1);
  if (e instanceof Function) return WE(e);
  throw new E(204, !1);
}
function WE(e) {
  if (e.length > 0) throw new E(204, !1);
  let n = CE(e);
  return n !== null ? () => n.factory(e) : () => new e();
}
function ZE(e) {
  if (ip(e)) return Ln(void 0, e.useValue);
  {
    let t = sp(e);
    return Ln(t, Oi);
  }
}
function sp(e, t, n) {
  let r;
  if (qn(e)) {
    let o = pe(e);
    return fn(o) || Ac(o);
  } else if (ip(e)) r = () => pe(e.useValue);
  else if (zE(e)) r = () => e.useFactory(...Sc(e.deps || []));
  else if (HE(e)) r = () => I(pe(e.useExisting));
  else {
    let o = pe(e && (e.useClass || e.provide));
    if (YE(e)) r = () => new o(...Sc(e.deps));
    else return fn(o) || Ac(o);
  }
  return r;
}
function Or(e) {
  if (e.destroyed) throw new E(205, !1);
}
function Ln(e, t, n = !1) {
  return { factory: e, value: t, multi: n ? [] : void 0 };
}
function YE(e) {
  return !!e.deps;
}
function KE(e) {
  return (
    e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function"
  );
}
function QE(e) {
  return typeof e == "function" || (typeof e == "object" && e instanceof y);
}
function Rc(e, t) {
  for (let n of e)
    Array.isArray(n) ? Rc(n, t) : n && Yh(n) ? Rc(n.ɵproviders, t) : t(n);
}
function _e(e, t) {
  e instanceof Vr && Or(e);
  let n,
    r = Ft(e),
    o = Ee(void 0);
  try {
    return t();
  } finally {
    Ft(r), Ee(o);
  }
}
function ap() {
  return Kh() !== void 0 || OE() != null;
}
function XE(e) {
  if (!ap()) throw new E(-203, !1);
}
function JE(e) {
  return typeof e == "function";
}
var Ne = 0,
  b = 1,
  T = 2,
  ce = 3,
  ze = 4,
  Ze = 5,
  qe = 6,
  zi = 7,
  le = 8,
  je = 9,
  mt = 10,
  q = 11,
  jr = 12,
  Wf = 13,
  or = 14,
  Ae = 15,
  Wn = 16,
  Vn = 17,
  Zn = 18,
  Es = 19,
  cp = 20,
  kt = 21,
  fc = 22,
  Gi = 23,
  Se = 24,
  Z = 25,
  up = 1,
  vt = 6,
  yt = 7,
  qi = 8,
  Wi = 9,
  de = 10;
function Ge(e) {
  return Array.isArray(e) && typeof e[up] == "object";
}
function ot(e) {
  return Array.isArray(e) && e[up] === !0;
}
function lp(e) {
  return (e.flags & 4) !== 0;
}
function Wr(e) {
  return e.componentOffset > -1;
}
function Lu(e) {
  return (e.flags & 1) === 1;
}
function Vt(e) {
  return !!e.template;
}
function Zi(e) {
  return (e[T] & 512) !== 0;
}
function ir(e) {
  return (e[T] & 256) === 256;
}
var xc = class {
  previousValue;
  currentValue;
  firstChange;
  constructor(t, n, r) {
    (this.previousValue = t), (this.currentValue = n), (this.firstChange = r);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function dp(e, t, n, r) {
  t !== null ? t.applyValueToInputSignal(t, r) : (e[n] = r);
}
var sr = (() => {
  let e = () => fp;
  return (e.ngInherit = !0), e;
})();
function fp(e) {
  return e.type.prototype.ngOnChanges && (e.setInput = tC), eC;
}
function eC() {
  let e = pp(this),
    t = e?.current;
  if (t) {
    let n = e.previous;
    if (n === Gn) e.previous = t;
    else for (let r in t) n[r] = t[r];
    (e.current = null), this.ngOnChanges(t);
  }
}
function tC(e, t, n, r, o) {
  let i = this.declaredInputs[r],
    s = pp(e) || nC(e, { previous: Gn, current: null }),
    a = s.current || (s.current = {}),
    c = s.previous,
    u = c[i];
  (a[i] = new xc(u && u.currentValue, n, c === Gn)), dp(e, t, o, n);
}
var hp = "__ngSimpleChanges__";
function pp(e) {
  return e[hp] || null;
}
function nC(e, t) {
  return (e[hp] = t);
}
var Zf = null;
var Ve = function (e, t, n) {
    Zf?.(e, t, n);
  },
  gp = "svg",
  rC = "math";
function We(e) {
  for (; Array.isArray(e); ) e = e[Ne];
  return e;
}
function mp(e, t) {
  return We(t[e]);
}
function Re(e, t) {
  return We(t[e.index]);
}
function Zr(e, t) {
  return e.data[t];
}
function oC(e, t) {
  return e[t];
}
function Ht(e, t) {
  let n = t[e];
  return Ge(n) ? n : n[Ne];
}
function Vu(e) {
  return (e[T] & 128) === 128;
}
function iC(e) {
  return ot(e[ce]);
}
function Yn(e, t) {
  return t == null ? null : e[t];
}
function vp(e) {
  e[Vn] = 0;
}
function ju(e) {
  e[T] & 1024 || ((e[T] |= 1024), Vu(e) && ws(e));
}
function sC(e, t) {
  for (; e > 0; ) (t = t[or]), e--;
  return t;
}
function Cs(e) {
  return !!(e[T] & 9216 || e[Se]?.dirty);
}
function Oc(e) {
  e[mt].changeDetectionScheduler?.notify(9),
    e[T] & 64 && (e[T] |= 1024),
    Cs(e) && ws(e);
}
function ws(e) {
  e[mt].changeDetectionScheduler?.notify(0);
  let t = hn(e);
  for (; t !== null && !(t[T] & 8192 || ((t[T] |= 8192), !Vu(t))); ) t = hn(t);
}
function Uu(e, t) {
  if (ir(e)) throw new E(911, !1);
  e[kt] === null && (e[kt] = []), e[kt].push(t);
}
function yp(e, t) {
  if (e[kt] === null) return;
  let n = e[kt].indexOf(t);
  n !== -1 && e[kt].splice(n, 1);
}
function hn(e) {
  let t = e[ce];
  return ot(t) ? t[ce] : t;
}
function aC(e) {
  return (e[zi] ??= []);
}
function cC(e) {
  return (e.cleanup ??= []);
}
var A = { lFrame: Tp(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
var Pc = !1;
function uC() {
  return A.lFrame.elementDepthCount;
}
function lC() {
  A.lFrame.elementDepthCount++;
}
function dC() {
  A.lFrame.elementDepthCount--;
}
function Dp() {
  return A.bindingsEnabled;
}
function Yr() {
  return A.skipHydrationRootTNode !== null;
}
function fC(e) {
  return A.skipHydrationRootTNode === e;
}
function hC(e) {
  A.skipHydrationRootTNode = e;
}
function pC() {
  A.skipHydrationRootTNode = null;
}
function F() {
  return A.lFrame.lView;
}
function ge() {
  return A.lFrame.tView;
}
function KF(e) {
  return (A.lFrame.contextLView = e), e[le];
}
function QF(e) {
  return (A.lFrame.contextLView = null), e;
}
function me() {
  let e = Ep();
  for (; e !== null && e.type === 64; ) e = e.parent;
  return e;
}
function Ep() {
  return A.lFrame.currentTNode;
}
function gC() {
  let e = A.lFrame,
    t = e.currentTNode;
  return e.isParent ? t : t.parent;
}
function Kr(e, t) {
  let n = A.lFrame;
  (n.currentTNode = e), (n.isParent = t);
}
function Cp() {
  return A.lFrame.isParent;
}
function mC() {
  A.lFrame.isParent = !1;
}
function wp() {
  return Pc;
}
function Yf(e) {
  let t = Pc;
  return (Pc = e), t;
}
function Qr() {
  let e = A.lFrame,
    t = e.bindingRootIndex;
  return t === -1 && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t;
}
function vC() {
  return A.lFrame.bindingIndex;
}
function yC(e) {
  return (A.lFrame.bindingIndex = e);
}
function Xr() {
  return A.lFrame.bindingIndex++;
}
function Ip(e) {
  let t = A.lFrame,
    n = t.bindingIndex;
  return (t.bindingIndex = t.bindingIndex + e), n;
}
function DC() {
  return A.lFrame.inI18n;
}
function EC(e, t) {
  let n = A.lFrame;
  (n.bindingIndex = n.bindingRootIndex = e), Fc(t);
}
function CC() {
  return A.lFrame.currentDirectiveIndex;
}
function Fc(e) {
  A.lFrame.currentDirectiveIndex = e;
}
function wC(e) {
  let t = A.lFrame.currentDirectiveIndex;
  return t === -1 ? null : e[t];
}
function _p(e) {
  A.lFrame.currentQueryIndex = e;
}
function IC(e) {
  let t = e[b];
  return t.type === 2 ? t.declTNode : t.type === 1 ? e[Ze] : null;
}
function bp(e, t, n) {
  if (n & P.SkipSelf) {
    let o = t,
      i = e;
    for (; (o = o.parent), o === null && !(n & P.Host); )
      if (((o = IC(i)), o === null || ((i = i[or]), o.type & 10))) break;
    if (o === null) return !1;
    (t = o), (e = i);
  }
  let r = (A.lFrame = Mp());
  return (r.currentTNode = t), (r.lView = e), !0;
}
function Bu(e) {
  let t = Mp(),
    n = e[b];
  (A.lFrame = t),
    (t.currentTNode = n.firstChild),
    (t.lView = e),
    (t.tView = n),
    (t.contextLView = e),
    (t.bindingIndex = n.bindingStartIndex),
    (t.inI18n = !1);
}
function Mp() {
  let e = A.lFrame,
    t = e === null ? null : e.child;
  return t === null ? Tp(e) : t;
}
function Tp(e) {
  let t = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: e,
    child: null,
    inI18n: !1,
  };
  return e !== null && (e.child = t), t;
}
function Sp() {
  let e = A.lFrame;
  return (A.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
}
var Np = Sp;
function $u() {
  let e = Sp();
  (e.isParent = !0),
    (e.tView = null),
    (e.selectedIndex = -1),
    (e.contextLView = null),
    (e.elementDepthCount = 0),
    (e.currentDirectiveIndex = -1),
    (e.currentNamespace = null),
    (e.bindingRootIndex = -1),
    (e.bindingIndex = -1),
    (e.currentQueryIndex = 0);
}
function _C(e) {
  return (A.lFrame.contextLView = sC(e, A.lFrame.contextLView))[le];
}
function zt() {
  return A.lFrame.selectedIndex;
}
function pn(e) {
  A.lFrame.selectedIndex = e;
}
function Is() {
  let e = A.lFrame;
  return Zr(e.tView, e.selectedIndex);
}
function XF() {
  A.lFrame.currentNamespace = gp;
}
function JF() {
  bC();
}
function bC() {
  A.lFrame.currentNamespace = null;
}
function Ap() {
  return A.lFrame.currentNamespace;
}
var Rp = !0;
function Hu() {
  return Rp;
}
function Gt(e) {
  Rp = e;
}
function MC(e, t, n) {
  let { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = t.type.prototype;
  if (r) {
    let s = fp(t);
    (n.preOrderHooks ??= []).push(e, s),
      (n.preOrderCheckHooks ??= []).push(e, s);
  }
  o && (n.preOrderHooks ??= []).push(0 - e, o),
    i &&
      ((n.preOrderHooks ??= []).push(e, i),
      (n.preOrderCheckHooks ??= []).push(e, i));
}
function zu(e, t) {
  for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
    let i = e.data[n].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: c,
        ngAfterViewChecked: u,
        ngOnDestroy: l,
      } = i;
    s && (e.contentHooks ??= []).push(-n, s),
      a &&
        ((e.contentHooks ??= []).push(n, a),
        (e.contentCheckHooks ??= []).push(n, a)),
      c && (e.viewHooks ??= []).push(-n, c),
      u &&
        ((e.viewHooks ??= []).push(n, u), (e.viewCheckHooks ??= []).push(n, u)),
      l != null && (e.destroyHooks ??= []).push(n, l);
  }
}
function Pi(e, t, n) {
  xp(e, t, 3, n);
}
function Fi(e, t, n, r) {
  (e[T] & 3) === n && xp(e, t, n, r);
}
function hc(e, t) {
  let n = e[T];
  (n & 3) === t && ((n &= 16383), (n += 1), (e[T] = n));
}
function xp(e, t, n, r) {
  let o = r !== void 0 ? e[Vn] & 65535 : 0,
    i = r ?? -1,
    s = t.length - 1,
    a = 0;
  for (let c = o; c < s; c++)
    if (typeof t[c + 1] == "number") {
      if (((a = t[c]), r != null && a >= r)) break;
    } else
      t[c] < 0 && (e[Vn] += 65536),
        (a < i || i == -1) &&
          (TC(e, n, t, c), (e[Vn] = (e[Vn] & 4294901760) + c + 2)),
        c++;
}
function Kf(e, t) {
  Ve(4, e, t);
  let n = O(null);
  try {
    t.call(e);
  } finally {
    O(n), Ve(5, e, t);
  }
}
function TC(e, t, n, r) {
  let o = n[r] < 0,
    i = n[r + 1],
    s = o ? -n[r] : n[r],
    a = e[s];
  o
    ? e[T] >> 14 < e[Vn] >> 16 &&
      (e[T] & 3) === t &&
      ((e[T] += 16384), Kf(a, i))
    : Kf(a, i);
}
var $n = -1,
  gn = class {
    factory;
    injectImpl;
    resolving = !1;
    canSeeViewProviders;
    multi;
    componentProviders;
    index;
    providerFactory;
    constructor(t, n, r) {
      (this.factory = t), (this.canSeeViewProviders = n), (this.injectImpl = r);
    }
  };
function SC(e) {
  return e instanceof gn;
}
function NC(e) {
  return (e.flags & 8) !== 0;
}
function AC(e) {
  return (e.flags & 16) !== 0;
}
function kc(e, t, n) {
  let r = 0;
  for (; r < n.length; ) {
    let o = n[r];
    if (typeof o == "number") {
      if (o !== 0) break;
      r++;
      let i = n[r++],
        s = n[r++],
        a = n[r++];
      e.setAttribute(t, s, a, i);
    } else {
      let i = o,
        s = n[++r];
      RC(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
    }
  }
  return r;
}
function Op(e) {
  return e === 3 || e === 4 || e === 6;
}
function RC(e) {
  return e.charCodeAt(0) === 64;
}
function Ur(e, t) {
  if (!(t === null || t.length === 0))
    if (e === null || e.length === 0) e = t.slice();
    else {
      let n = -1;
      for (let r = 0; r < t.length; r++) {
        let o = t[r];
        typeof o == "number"
          ? (n = o)
          : n === 0 ||
            (n === -1 || n === 2
              ? Qf(e, n, o, null, t[++r])
              : Qf(e, n, o, null, null));
      }
    }
  return e;
}
function Qf(e, t, n, r, o) {
  let i = 0,
    s = e.length;
  if (t === -1) s = -1;
  else
    for (; i < e.length; ) {
      let a = e[i++];
      if (typeof a == "number") {
        if (a === t) {
          s = -1;
          break;
        } else if (a > t) {
          s = i - 1;
          break;
        }
      }
    }
  for (; i < e.length; ) {
    let a = e[i];
    if (typeof a == "number") break;
    if (a === n) {
      if (r === null) {
        o !== null && (e[i + 1] = o);
        return;
      } else if (r === e[i + 1]) {
        e[i + 2] = o;
        return;
      }
    }
    i++, r !== null && i++, o !== null && i++;
  }
  s !== -1 && (e.splice(s, 0, t), (i = s + 1)),
    e.splice(i++, 0, n),
    r !== null && e.splice(i++, 0, r),
    o !== null && e.splice(i++, 0, o);
}
var pc = {},
  Hn = class {
    injector;
    parentInjector;
    constructor(t, n) {
      (this.injector = t), (this.parentInjector = n);
    }
    get(t, n, r) {
      r = vs(r);
      let o = this.injector.get(t, pc, r);
      return o !== pc || n === pc ? o : this.parentInjector.get(t, n, r);
    }
  };
function Pp(e) {
  return e !== $n;
}
function Yi(e) {
  return e & 32767;
}
function xC(e) {
  return e >> 16;
}
function Ki(e, t) {
  let n = xC(e),
    r = t;
  for (; n > 0; ) (r = r[or]), n--;
  return r;
}
var Lc = !0;
function Qi(e) {
  let t = Lc;
  return (Lc = e), t;
}
var OC = 256,
  Fp = OC - 1,
  kp = 5,
  PC = 0,
  Je = {};
function FC(e, t, n) {
  let r;
  typeof n == "string"
    ? (r = n.charCodeAt(0) || 0)
    : n.hasOwnProperty(Fr) && (r = n[Fr]),
    r == null && (r = n[Fr] = PC++);
  let o = r & Fp,
    i = 1 << o;
  t.data[e + (o >> kp)] |= i;
}
function Xi(e, t) {
  let n = Lp(e, t);
  if (n !== -1) return n;
  let r = t[b];
  r.firstCreatePass &&
    ((e.injectorIndex = t.length),
    gc(r.data, e),
    gc(t, null),
    gc(r.blueprint, null));
  let o = Gu(e, t),
    i = e.injectorIndex;
  if (Pp(o)) {
    let s = Yi(o),
      a = Ki(o, t),
      c = a[b].data;
    for (let u = 0; u < 8; u++) t[i + u] = a[s + u] | c[s + u];
  }
  return (t[i + 8] = o), i;
}
function gc(e, t) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
function Lp(e, t) {
  return e.injectorIndex === -1 ||
    (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
    t[e.injectorIndex + 8] === null
    ? -1
    : e.injectorIndex;
}
function Gu(e, t) {
  if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
  let n = 0,
    r = null,
    o = t;
  for (; o !== null; ) {
    if (((r = $p(o)), r === null)) return $n;
    if ((n++, (o = o[or]), r.injectorIndex !== -1))
      return r.injectorIndex | (n << 16);
  }
  return $n;
}
function Vc(e, t, n) {
  FC(e, t, n);
}
function kC(e, t) {
  if (t === "class") return e.classes;
  if (t === "style") return e.styles;
  let n = e.attrs;
  if (n) {
    let r = n.length,
      o = 0;
    for (; o < r; ) {
      let i = n[o];
      if (Op(i)) break;
      if (i === 0) o = o + 2;
      else if (typeof i == "number")
        for (o++; o < r && typeof n[o] == "string"; ) o++;
      else {
        if (i === t) return n[o + 1];
        o = o + 2;
      }
    }
  }
  return null;
}
function Vp(e, t, n) {
  if (n & P.Optional || e !== void 0) return e;
  Nu(t, "NodeInjector");
}
function jp(e, t, n, r) {
  if (
    (n & P.Optional && r === void 0 && (r = null), !(n & (P.Self | P.Host)))
  ) {
    let o = e[je],
      i = Ee(void 0);
    try {
      return o ? o.get(t, r, n & P.Optional) : Qh(t, r, n & P.Optional);
    } finally {
      Ee(i);
    }
  }
  return Vp(r, t, n);
}
function Up(e, t, n, r = P.Default, o) {
  if (e !== null) {
    if (t[T] & 2048 && !(r & P.Self)) {
      let s = BC(e, t, n, r, Je);
      if (s !== Je) return s;
    }
    let i = Bp(e, t, n, r, Je);
    if (i !== Je) return i;
  }
  return jp(t, n, r, o);
}
function Bp(e, t, n, r, o) {
  let i = jC(n);
  if (typeof i == "function") {
    if (!bp(t, e, r)) return r & P.Host ? Vp(o, n, r) : jp(t, n, r, o);
    try {
      let s;
      if (((s = i(r)), s == null && !(r & P.Optional))) Nu(n);
      else return s;
    } finally {
      Np();
    }
  } else if (typeof i == "number") {
    let s = null,
      a = Lp(e, t),
      c = $n,
      u = r & P.Host ? t[Ae][Ze] : null;
    for (
      (a === -1 || r & P.SkipSelf) &&
      ((c = a === -1 ? Gu(e, t) : t[a + 8]),
      c === $n || !Jf(r, !1)
        ? (a = -1)
        : ((s = t[b]), (a = Yi(c)), (t = Ki(c, t))));
      a !== -1;

    ) {
      let l = t[b];
      if (Xf(i, a, l.data)) {
        let d = LC(a, t, n, s, r, u);
        if (d !== Je) return d;
      }
      (c = t[a + 8]),
        c !== $n && Jf(r, t[b].data[a + 8] === u) && Xf(i, a, t)
          ? ((s = l), (a = Yi(c)), (t = Ki(c, t)))
          : (a = -1);
    }
  }
  return o;
}
function LC(e, t, n, r, o, i) {
  let s = t[b],
    a = s.data[e + 8],
    c = r == null ? Wr(a) && Lc : r != s && (a.type & 3) !== 0,
    u = o & P.Host && i === a,
    l = VC(a, s, n, c, u);
  return l !== null ? Kn(t, s, l, a) : Je;
}
function VC(e, t, n, r, o) {
  let i = e.providerIndexes,
    s = t.data,
    a = i & 1048575,
    c = e.directiveStart,
    u = e.directiveEnd,
    l = i >> 20,
    d = r ? a : a + l,
    h = o ? a + l : u;
  for (let f = d; f < h; f++) {
    let g = s[f];
    if ((f < c && n === g) || (f >= c && g.type === n)) return f;
  }
  if (o) {
    let f = s[c];
    if (f && Vt(f) && f.type === n) return c;
  }
  return null;
}
function Kn(e, t, n, r) {
  let o = e[n],
    i = t.data;
  if (SC(o)) {
    let s = o;
    s.resolving && SE(TE(i[n]));
    let a = Qi(s.canSeeViewProviders);
    s.resolving = !0;
    let c,
      u = s.injectImpl ? Ee(s.injectImpl) : null,
      l = bp(e, r, P.Default);
    try {
      (o = e[n] = s.factory(void 0, i, e, r)),
        t.firstCreatePass && n >= r.directiveStart && MC(n, i[n], t);
    } finally {
      u !== null && Ee(u), Qi(a), (s.resolving = !1), Np();
    }
  }
  return o;
}
function jC(e) {
  if (typeof e == "string") return e.charCodeAt(0) || 0;
  let t = e.hasOwnProperty(Fr) ? e[Fr] : void 0;
  return typeof t == "number" ? (t >= 0 ? t & Fp : UC) : t;
}
function Xf(e, t, n) {
  let r = 1 << e;
  return !!(n[t + (e >> kp)] & r);
}
function Jf(e, t) {
  return !(e & P.Self) && !(e & P.Host && t);
}
var ln = class {
  _tNode;
  _lView;
  constructor(t, n) {
    (this._tNode = t), (this._lView = n);
  }
  get(t, n, r) {
    return Up(this._tNode, this._lView, t, vs(r), n);
  }
};
function UC() {
  return new ln(me(), F());
}
function qt(e) {
  return Gr(() => {
    let t = e.prototype.constructor,
      n = t[Ui] || jc(t),
      r = Object.prototype,
      o = Object.getPrototypeOf(e.prototype).constructor;
    for (; o && o !== r; ) {
      let i = o[Ui] || jc(o);
      if (i && i !== n) return i;
      o = Object.getPrototypeOf(o);
    }
    return (i) => new i();
  });
}
function jc(e) {
  return Gh(e)
    ? () => {
        let t = jc(pe(e));
        return t && t();
      }
    : fn(e);
}
function BC(e, t, n, r, o) {
  let i = e,
    s = t;
  for (; i !== null && s !== null && s[T] & 2048 && !(s[T] & 512); ) {
    let a = Bp(i, s, n, r | P.Self, Je);
    if (a !== Je) return a;
    let c = i.parent;
    if (!c) {
      let u = s[cp];
      if (u) {
        let l = u.get(n, Je, r);
        if (l !== Je) return l;
      }
      (c = $p(s)), (s = s[or]);
    }
    i = c;
  }
  return o;
}
function $p(e) {
  let t = e[b],
    n = t.type;
  return n === 2 ? t.declTNode : n === 1 ? e[Ze] : null;
}
function qu(e) {
  return kC(me(), e);
}
function eh(e, t = null, n = null, r) {
  let o = Hp(e, t, n, r);
  return o.resolveInjectorInitializers(), o;
}
function Hp(e, t = null, n = null, r, o = new Set()) {
  let i = [n || Le, BE(e)];
  return (
    (r = r || (typeof e == "object" ? void 0 : we(e))),
    new Vr(i, t || ku(), r || null, o)
  );
}
var he = class e {
  static THROW_IF_NOT_FOUND = Lr;
  static NULL = new Hi();
  static create(t, n) {
    if (Array.isArray(t)) return eh({ name: "" }, n, t, "");
    {
      let r = t.name ?? "";
      return eh({ name: r }, t.parent, t.providers, r);
    }
  }
  static ɵprov = C({ token: e, providedIn: "any", factory: () => I(ep) });
  static __NG_ELEMENT_ID__ = -1;
};
var $C = new y("");
$C.__NG_ELEMENT_ID__ = (e) => {
  let t = me();
  if (t === null) throw new E(204, !1);
  if (t.type & 2) return t.value;
  if (e & P.Optional) return null;
  throw new E(204, !1);
};
var zp = !1,
  _s = (() => {
    class e {
      static __NG_ELEMENT_ID__ = HC;
      static __NG_ENV_ID__ = (n) => n;
    }
    return e;
  })(),
  Uc = class extends _s {
    _lView;
    constructor(t) {
      super(), (this._lView = t);
    }
    onDestroy(t) {
      return Uu(this._lView, t), () => yp(this._lView, t);
    }
  };
function HC() {
  return new Uc(F());
}
var Qn = class {},
  bs = new y("", { providedIn: "root", factory: () => !1 });
var Gp = new y(""),
  qp = new y(""),
  it = (() => {
    class e {
      taskId = 0;
      pendingTasks = new Set();
      get _hasPendingTasks() {
        return this.hasPendingTasks.value;
      }
      hasPendingTasks = new se(!1);
      add() {
        this._hasPendingTasks || this.hasPendingTasks.next(!0);
        let n = this.taskId++;
        return this.pendingTasks.add(n), n;
      }
      has(n) {
        return this.pendingTasks.has(n);
      }
      remove(n) {
        this.pendingTasks.delete(n),
          this.pendingTasks.size === 0 &&
            this._hasPendingTasks &&
            this.hasPendingTasks.next(!1);
      }
      ngOnDestroy() {
        this.pendingTasks.clear(),
          this._hasPendingTasks && this.hasPendingTasks.next(!1);
      }
      static ɵprov = C({
        token: e,
        providedIn: "root",
        factory: () => new e(),
      });
    }
    return e;
  })();
var Bc = class extends te {
    __isAsync;
    destroyRef = void 0;
    pendingTasks = void 0;
    constructor(t = !1) {
      super(),
        (this.__isAsync = t),
        ap() &&
          ((this.destroyRef = p(_s, { optional: !0 }) ?? void 0),
          (this.pendingTasks = p(it, { optional: !0 }) ?? void 0));
    }
    emit(t) {
      let n = O(null);
      try {
        super.next(t);
      } finally {
        O(n);
      }
    }
    subscribe(t, n, r) {
      let o = t,
        i = n || (() => null),
        s = r;
      if (t && typeof t == "object") {
        let c = t;
        (o = c.next?.bind(c)),
          (i = c.error?.bind(c)),
          (s = c.complete?.bind(c));
      }
      this.__isAsync &&
        ((i = this.wrapInTimeout(i)),
        o && (o = this.wrapInTimeout(o)),
        s && (s = this.wrapInTimeout(s)));
      let a = super.subscribe({ next: o, error: i, complete: s });
      return t instanceof K && t.add(a), a;
    }
    wrapInTimeout(t) {
      return (n) => {
        let r = this.pendingTasks?.add();
        setTimeout(() => {
          t(n), r !== void 0 && this.pendingTasks?.remove(r);
        });
      };
    }
  },
  ae = Bc;
function Ji(...e) {}
function Wp(e) {
  let t, n;
  function r() {
    e = Ji;
    try {
      n !== void 0 &&
        typeof cancelAnimationFrame == "function" &&
        cancelAnimationFrame(n),
        t !== void 0 && clearTimeout(t);
    } catch {}
  }
  return (
    (t = setTimeout(() => {
      e(), r();
    })),
    typeof requestAnimationFrame == "function" &&
      (n = requestAnimationFrame(() => {
        e(), r();
      })),
    () => r()
  );
}
function th(e) {
  return (
    queueMicrotask(() => e()),
    () => {
      e = Ji;
    }
  );
}
var Wu = "isAngularZone",
  es = Wu + "_ID",
  zC = 0,
  G = class e {
    hasPendingMacrotasks = !1;
    hasPendingMicrotasks = !1;
    isStable = !0;
    onUnstable = new ae(!1);
    onMicrotaskEmpty = new ae(!1);
    onStable = new ae(!1);
    onError = new ae(!1);
    constructor(t) {
      let {
        enableLongStackTrace: n = !1,
        shouldCoalesceEventChangeDetection: r = !1,
        shouldCoalesceRunChangeDetection: o = !1,
        scheduleInRootZone: i = zp,
      } = t;
      if (typeof Zone > "u") throw new E(908, !1);
      Zone.assertZonePatched();
      let s = this;
      (s._nesting = 0),
        (s._outer = s._inner = Zone.current),
        Zone.TaskTrackingZoneSpec &&
          (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec())),
        n &&
          Zone.longStackTraceZoneSpec &&
          (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)),
        (s.shouldCoalesceEventChangeDetection = !o && r),
        (s.shouldCoalesceRunChangeDetection = o),
        (s.callbackScheduled = !1),
        (s.scheduleInRootZone = i),
        WC(s);
    }
    static isInAngularZone() {
      return typeof Zone < "u" && Zone.current.get(Wu) === !0;
    }
    static assertInAngularZone() {
      if (!e.isInAngularZone()) throw new E(909, !1);
    }
    static assertNotInAngularZone() {
      if (e.isInAngularZone()) throw new E(909, !1);
    }
    run(t, n, r) {
      return this._inner.run(t, n, r);
    }
    runTask(t, n, r, o) {
      let i = this._inner,
        s = i.scheduleEventTask("NgZoneEvent: " + o, t, GC, Ji, Ji);
      try {
        return i.runTask(s, n, r);
      } finally {
        i.cancelTask(s);
      }
    }
    runGuarded(t, n, r) {
      return this._inner.runGuarded(t, n, r);
    }
    runOutsideAngular(t) {
      return this._outer.run(t);
    }
  },
  GC = {};
function Zu(e) {
  if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
    try {
      e._nesting++, e.onMicrotaskEmpty.emit(null);
    } finally {
      if ((e._nesting--, !e.hasPendingMicrotasks))
        try {
          e.runOutsideAngular(() => e.onStable.emit(null));
        } finally {
          e.isStable = !0;
        }
    }
}
function qC(e) {
  if (e.isCheckStableRunning || e.callbackScheduled) return;
  e.callbackScheduled = !0;
  function t() {
    Wp(() => {
      (e.callbackScheduled = !1),
        $c(e),
        (e.isCheckStableRunning = !0),
        Zu(e),
        (e.isCheckStableRunning = !1);
    });
  }
  e.scheduleInRootZone
    ? Zone.root.run(() => {
        t();
      })
    : e._outer.run(() => {
        t();
      }),
    $c(e);
}
function WC(e) {
  let t = () => {
      qC(e);
    },
    n = zC++;
  e._inner = e._inner.fork({
    name: "angular",
    properties: { [Wu]: !0, [es]: n, [es + n]: !0 },
    onInvokeTask: (r, o, i, s, a, c) => {
      if (ZC(c)) return r.invokeTask(i, s, a, c);
      try {
        return nh(e), r.invokeTask(i, s, a, c);
      } finally {
        ((e.shouldCoalesceEventChangeDetection && s.type === "eventTask") ||
          e.shouldCoalesceRunChangeDetection) &&
          t(),
          rh(e);
      }
    },
    onInvoke: (r, o, i, s, a, c, u) => {
      try {
        return nh(e), r.invoke(i, s, a, c, u);
      } finally {
        e.shouldCoalesceRunChangeDetection &&
          !e.callbackScheduled &&
          !YC(c) &&
          t(),
          rh(e);
      }
    },
    onHasTask: (r, o, i, s) => {
      r.hasTask(i, s),
        o === i &&
          (s.change == "microTask"
            ? ((e._hasPendingMicrotasks = s.microTask), $c(e), Zu(e))
            : s.change == "macroTask" &&
              (e.hasPendingMacrotasks = s.macroTask));
    },
    onHandleError: (r, o, i, s) => (
      r.handleError(i, s), e.runOutsideAngular(() => e.onError.emit(s)), !1
    ),
  });
}
function $c(e) {
  e._hasPendingMicrotasks ||
  ((e.shouldCoalesceEventChangeDetection ||
    e.shouldCoalesceRunChangeDetection) &&
    e.callbackScheduled === !0)
    ? (e.hasPendingMicrotasks = !0)
    : (e.hasPendingMicrotasks = !1);
}
function nh(e) {
  e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
}
function rh(e) {
  e._nesting--, Zu(e);
}
var Hc = class {
  hasPendingMicrotasks = !1;
  hasPendingMacrotasks = !1;
  isStable = !0;
  onUnstable = new ae();
  onMicrotaskEmpty = new ae();
  onStable = new ae();
  onError = new ae();
  run(t, n, r) {
    return t.apply(n, r);
  }
  runGuarded(t, n, r) {
    return t.apply(n, r);
  }
  runOutsideAngular(t) {
    return t();
  }
  runTask(t, n, r, o) {
    return t.apply(n, r);
  }
};
function ZC(e) {
  return Zp(e, "__ignore_ng_zone__");
}
function YC(e) {
  return Zp(e, "__scheduler_tick__");
}
function Zp(e, t) {
  return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[t] === !0;
}
var et = class {
    _console = console;
    handleError(t) {
      this._console.error("ERROR", t);
    }
  },
  KC = new y("", {
    providedIn: "root",
    factory: () => {
      let e = p(G),
        t = p(et);
      return (n) => e.runOutsideAngular(() => t.handleError(n));
    },
  }),
  zc = class {
    destroyed = !1;
    listeners = null;
    errorHandler = p(et, { optional: !0 });
    destroyRef = p(_s);
    constructor() {
      this.destroyRef.onDestroy(() => {
        (this.destroyed = !0), (this.listeners = null);
      });
    }
    subscribe(t) {
      if (this.destroyed) throw new E(953, !1);
      return (
        (this.listeners ??= []).push(t),
        {
          unsubscribe: () => {
            let n = this.listeners?.indexOf(t);
            n !== void 0 && n !== -1 && this.listeners?.splice(n, 1);
          },
        }
      );
    }
    emit(t) {
      if (this.destroyed) throw new E(953, !1);
      if (this.listeners === null) return;
      let n = O(null);
      try {
        for (let r of this.listeners)
          try {
            r(t);
          } catch (o) {
            this.errorHandler?.handleError(o);
          }
      } finally {
        O(n);
      }
    }
  };
function ek(e) {
  return new zc();
}
function oh(e, t) {
  return Hh(e, t);
}
function QC(e) {
  return Hh($h, e);
}
var Yp = ((oh.required = QC), oh);
function XC() {
  return Yu(me(), F());
}
function Yu(e, t) {
  return new Ue(Re(e, t));
}
var Ue = (() => {
  class e {
    nativeElement;
    constructor(n) {
      this.nativeElement = n;
    }
    static __NG_ELEMENT_ID__ = XC;
  }
  return e;
})();
var ih = new Set();
function xe(e) {
  ih.has(e) ||
    (ih.add(e),
    performance?.mark?.("mark_feature_usage", { detail: { feature: e } }));
}
function Ms(e, t) {
  xe("NgSignals");
  let n = Yd(e),
    r = n[ke];
  return (
    t?.equal && (r.equal = t.equal),
    (n.set = (o) => Ko(r, o)),
    (n.update = (o) => Kd(r, o)),
    (n.asReadonly = JC.bind(n)),
    n
  );
}
function JC() {
  let e = this[ke];
  if (e.readonlyFn === void 0) {
    let t = () => this();
    (t[ke] = e), (e.readonlyFn = t);
  }
  return e.readonlyFn;
}
var ew = "ngSkipHydration",
  tw = "ngskiphydration";
function Kp(e) {
  let t = e.mergedAttrs;
  if (t === null) return !1;
  for (let n = 0; n < t.length; n += 2) {
    let r = t[n];
    if (typeof r == "number") return !1;
    if (typeof r == "string" && r.toLowerCase() === tw) return !0;
  }
  return !1;
}
function Qp(e) {
  return e.hasAttribute(ew);
}
function ts(e) {
  return (e.flags & 128) === 128;
}
function nw(e) {
  if (ts(e)) return !0;
  let t = e.parent;
  for (; t; ) {
    if (ts(e) || Kp(t)) return !0;
    t = t.parent;
  }
  return !1;
}
var Xp = (function (e) {
    return (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e;
  })(Xp || {}),
  Jp = new Map(),
  rw = 0;
function ow() {
  return rw++;
}
function iw(e) {
  Jp.set(e[Es], e);
}
function Gc(e) {
  Jp.delete(e[Es]);
}
var sh = "__ngContext__";
function mn(e, t) {
  Ge(t) ? ((e[sh] = t[Es]), iw(t)) : (e[sh] = t);
}
function eg(e) {
  return ng(e[jr]);
}
function tg(e) {
  return ng(e[ze]);
}
function ng(e) {
  for (; e !== null && !ot(e); ) e = e[ze];
  return e;
}
var qc;
function rg(e) {
  qc = e;
}
function Jr() {
  if (qc !== void 0) return qc;
  if (typeof document < "u") return document;
  throw new E(210, !1);
}
var ar = new y("", { providedIn: "root", factory: () => sw }),
  sw = "ng",
  Ku = new y(""),
  Ct = new y("", { providedIn: "platform", factory: () => "unknown" });
var Qu = new y("", {
  providedIn: "root",
  factory: () =>
    Jr().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") ||
    null,
});
function aw() {
  let e = new yn();
  return p(Ct) === "browser" && (e.store = cw(Jr(), p(ar))), e;
}
var yn = (() => {
  class e {
    static ɵprov = C({ token: e, providedIn: "root", factory: aw });
    store = {};
    onSerializeCallbacks = {};
    get(n, r) {
      return this.store[n] !== void 0 ? this.store[n] : r;
    }
    set(n, r) {
      this.store[n] = r;
    }
    remove(n) {
      delete this.store[n];
    }
    hasKey(n) {
      return this.store.hasOwnProperty(n);
    }
    get isEmpty() {
      return Object.keys(this.store).length === 0;
    }
    onSerialize(n, r) {
      this.onSerializeCallbacks[n] = r;
    }
    toJson() {
      for (let n in this.onSerializeCallbacks)
        if (this.onSerializeCallbacks.hasOwnProperty(n))
          try {
            this.store[n] = this.onSerializeCallbacks[n]();
          } catch (r) {
            console.warn("Exception in onSerialize callback: ", r);
          }
      return JSON.stringify(this.store).replace(/</g, "\\u003C");
    }
  }
  return e;
})();
function cw(e, t) {
  let n = e.getElementById(t + "-state");
  if (n?.textContent)
    try {
      return JSON.parse(n.textContent);
    } catch (r) {
      console.warn("Exception while restoring TransferState for app " + t, r);
    }
  return {};
}
var og = "h",
  ig = "b",
  uw = "f",
  lw = "n",
  dw = "e",
  fw = "t",
  Xu = "c",
  sg = "x",
  ns = "r",
  hw = "i",
  pw = "n",
  ag = "d";
var cg = "di",
  ug = "s",
  gw = "p";
var Mi = new y(""),
  lg = !1,
  dg = new y("", { providedIn: "root", factory: () => lg });
var fg = new y(""),
  mw = !1,
  vw = new y(""),
  ah = new y("", { providedIn: "root", factory: () => new Map() }),
  Ju = (function (e) {
    return (
      (e[(e.CHANGE_DETECTION = 0)] = "CHANGE_DETECTION"),
      (e[(e.AFTER_NEXT_RENDER = 1)] = "AFTER_NEXT_RENDER"),
      e
    );
  })(Ju || {}),
  cr = new y("");
var jn = (function (e) {
    return (
      (e[(e.EarlyRead = 0)] = "EarlyRead"),
      (e[(e.Write = 1)] = "Write"),
      (e[(e.MixedReadWrite = 2)] = "MixedReadWrite"),
      (e[(e.Read = 3)] = "Read"),
      e
    );
  })(jn || {}),
  hg = (() => {
    class e {
      impl = null;
      execute() {
        this.impl?.execute();
      }
      static ɵprov = C({
        token: e,
        providedIn: "root",
        factory: () => new e(),
      });
    }
    return e;
  })(),
  yw = [jn.EarlyRead, jn.Write, jn.MixedReadWrite, jn.Read],
  Dw = (() => {
    class e {
      ngZone = p(G);
      scheduler = p(Qn);
      errorHandler = p(et, { optional: !0 });
      sequences = new Set();
      deferredRegistrations = new Set();
      executing = !1;
      constructor() {
        p(cr, { optional: !0 });
      }
      execute() {
        this.executing = !0;
        for (let n of yw)
          for (let r of this.sequences)
            if (!(r.erroredOrDestroyed || !r.hooks[n]))
              try {
                r.pipelinedValue = this.ngZone.runOutsideAngular(() =>
                  this.maybeTrace(
                    () => r.hooks[n](r.pipelinedValue),
                    r.snapshot
                  )
                );
              } catch (o) {
                (r.erroredOrDestroyed = !0), this.errorHandler?.handleError(o);
              }
        this.executing = !1;
        for (let n of this.sequences)
          n.afterRun(), n.once && (this.sequences.delete(n), n.destroy());
        for (let n of this.deferredRegistrations) this.sequences.add(n);
        this.deferredRegistrations.size > 0 && this.scheduler.notify(8),
          this.deferredRegistrations.clear();
      }
      register(n) {
        this.executing
          ? this.deferredRegistrations.add(n)
          : (this.sequences.add(n), this.scheduler.notify(7));
      }
      unregister(n) {
        this.executing && this.sequences.has(n)
          ? ((n.erroredOrDestroyed = !0),
            (n.pipelinedValue = void 0),
            (n.once = !0))
          : (this.sequences.delete(n), this.deferredRegistrations.delete(n));
      }
      maybeTrace(n, r) {
        return r ? r.run(Ju.AFTER_NEXT_RENDER, n) : n();
      }
      static ɵprov = C({
        token: e,
        providedIn: "root",
        factory: () => new e(),
      });
    }
    return e;
  })(),
  Wc = class {
    impl;
    hooks;
    once;
    snapshot;
    erroredOrDestroyed = !1;
    pipelinedValue = void 0;
    unregisterOnDestroy;
    constructor(t, n, r, o, i = null) {
      (this.impl = t),
        (this.hooks = n),
        (this.once = r),
        (this.snapshot = i),
        (this.unregisterOnDestroy = o?.onDestroy(() => this.destroy()));
    }
    afterRun() {
      (this.erroredOrDestroyed = !1),
        (this.pipelinedValue = void 0),
        this.snapshot?.dispose(),
        (this.snapshot = null);
    }
    destroy() {
      this.impl.unregister(this), this.unregisterOnDestroy?.();
    }
  };
function Ts(e, t) {
  !t?.injector && XE(Ts);
  let n = t?.injector ?? p(he);
  return xe("NgAfterNextRender"), Cw(e, n, t, !0);
}
function Ew(e, t) {
  if (e instanceof Function) {
    let n = [void 0, void 0, void 0, void 0];
    return (n[t] = e), n;
  } else return [e.earlyRead, e.write, e.mixedReadWrite, e.read];
}
function Cw(e, t, n, r) {
  let o = t.get(hg);
  o.impl ??= t.get(Dw);
  let i = t.get(cr, null, { optional: !0 }),
    s = n?.phase ?? jn.MixedReadWrite,
    a = n?.manualCleanup !== !0 ? t.get(_s) : null,
    c = new Wc(o.impl, Ew(e, s), r, a, i?.snapshot(null));
  return o.impl.register(c), c;
}
var Ce = (function (e) {
    return (
      (e[(e.NOT_STARTED = 0)] = "NOT_STARTED"),
      (e[(e.IN_PROGRESS = 1)] = "IN_PROGRESS"),
      (e[(e.COMPLETE = 2)] = "COMPLETE"),
      (e[(e.FAILED = 3)] = "FAILED"),
      e
    );
  })(Ce || {}),
  ch = 0,
  ww = 1,
  re = (function (e) {
    return (
      (e[(e.Placeholder = 0)] = "Placeholder"),
      (e[(e.Loading = 1)] = "Loading"),
      (e[(e.Complete = 2)] = "Complete"),
      (e[(e.Error = 3)] = "Error"),
      e
    );
  })(re || {}),
  pg = (function (e) {
    return (e[(e.Initial = -1)] = "Initial"), e;
  })(pg || {}),
  Iw = 0,
  el = 1;
var _w = 4,
  bw = 5,
  Mw = 6,
  Tw = 7,
  zn = 8,
  Sw = 9,
  gg = (function (e) {
    return (
      (e[(e.Manual = 0)] = "Manual"),
      (e[(e.Playthrough = 1)] = "Playthrough"),
      e
    );
  })(gg || {});
function mg(e, t, n) {
  let r = yg(e);
  t[r] === null && (t[r] = []), t[r].push(n);
}
function ki(e, t) {
  let n = yg(e),
    r = t[n];
  if (r !== null) {
    for (let o of r) o();
    t[n] = null;
  }
}
function vg(e) {
  ki(1, e), ki(0, e), ki(2, e);
}
function yg(e) {
  let t = _w;
  return e === 1 ? (t = bw) : e === 2 && (t = Sw), t;
}
function Ss(e) {
  return e + 1;
}
function ur(e, t) {
  let n = e[b],
    r = Ss(t.index);
  return e[r];
}
function Nw(e, t, n) {
  let r = e[b],
    o = Ss(t);
  e[o] = n;
}
function eo(e, t) {
  let n = Ss(t.index);
  return e.data[n];
}
function Aw(e, t, n) {
  let r = Ss(t);
  e.data[r] = n;
}
function Rw(e, t, n) {
  let r = t[b],
    o = eo(r, n);
  switch (e) {
    case re.Complete:
      return o.primaryTmplIndex;
    case re.Loading:
      return o.loadingTmplIndex;
    case re.Error:
      return o.errorTmplIndex;
    case re.Placeholder:
      return o.placeholderTmplIndex;
    default:
      return null;
  }
}
function uh(e, t) {
  return t === re.Placeholder
    ? e.placeholderBlockConfig?.[ch] ?? null
    : t === re.Loading
    ? e.loadingBlockConfig?.[ch] ?? null
    : null;
}
function xw(e) {
  return e.loadingBlockConfig?.[ww] ?? null;
}
function lh(e, t) {
  if (!e || e.length === 0) return t;
  let n = new Set(e);
  for (let r of t) n.add(r);
  return e.length === n.size ? e : Array.from(n);
}
function Ow(e, t) {
  let n = t.primaryTmplIndex + Z;
  return Zr(e, n);
}
var Ns = "ngb";
var Pw = (e, t, n) => {
    let r = e,
      o = r.__jsaction_fns ?? new Map(),
      i = o.get(t) ?? [];
    i.push(n), o.set(t, i), (r.__jsaction_fns = o);
  },
  Fw = (e, t) => {
    let n = e.getAttribute(Ns) ?? "",
      r = e,
      o = t.get(n) ?? new Set();
    o.has(r) || o.add(r), t.set(n, o);
  };
var kw = (e) => {
    e.removeAttribute(ic.JSACTION),
      e.removeAttribute(Ns),
      (e.__jsaction_fns = void 0);
  },
  Lw = new y("", { providedIn: "root", factory: () => ({}) });
function Dg(e, t) {
  let n = t?.__jsaction_fns?.get(e.type);
  if (n) for (let r of n) r(e);
}
var tl = new y("");
var Vw = "__nghData__",
  Eg = Vw,
  jw = "__nghDeferData__",
  Uw = jw,
  mc = "ngh",
  Bw = "nghm",
  Cg = () => null;
function $w(e, t, n = !1) {
  let r = e.getAttribute(mc);
  if (r == null) return null;
  let [o, i] = r.split("|");
  if (((r = n ? i : o), !r)) return null;
  let s = i ? `|${i}` : "",
    a = n ? o : s,
    c = {};
  if (r !== "") {
    let l = t.get(yn, null, { optional: !0 });
    l !== null && (c = l.get(Eg, [])[Number(r)]);
  }
  let u = { data: c, firstChild: e.firstChild ?? null };
  return (
    n && ((u.firstChild = e), As(u, 0, e.nextSibling)),
    a ? e.setAttribute(mc, a) : e.removeAttribute(mc),
    u
  );
}
function Hw() {
  Cg = $w;
}
function nl(e, t, n = !1) {
  return Cg(e, t, n);
}
function zw(e) {
  let t = e._lView;
  return t[b].type === 2 ? null : (Zi(t) && (t = t[Z]), t);
}
function Gw(e) {
  return e.textContent?.replace(/\s/gm, "");
}
function qw(e) {
  let t = Jr(),
    n = t.createNodeIterator(e, NodeFilter.SHOW_COMMENT, {
      acceptNode(i) {
        let s = Gw(i);
        return s === "ngetn" || s === "ngtns"
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    }),
    r,
    o = [];
  for (; (r = n.nextNode()); ) o.push(r);
  for (let i of o)
    i.textContent === "ngetn"
      ? i.replaceWith(t.createTextNode(""))
      : i.remove();
}
function As(e, t, n) {
  (e.segmentHeads ??= {}), (e.segmentHeads[t] = n);
}
function Zc(e, t) {
  return e.segmentHeads?.[t] ?? null;
}
function wg(e) {
  return e.get(vw, !1, { optional: !0 });
}
function Ww(e, t) {
  let n = e.data,
    r = n[dw]?.[t] ?? null;
  return r === null && n[Xu]?.[t] && (r = rl(e, t)), r;
}
function Ig(e, t) {
  return e.data[Xu]?.[t] ?? null;
}
function rl(e, t) {
  let n = Ig(e, t) ?? [],
    r = 0;
  for (let o of n) r += o[ns] * (o[sg] ?? 1);
  return r;
}
function Zw(e) {
  if (typeof e.disconnectedNodes > "u") {
    let t = e.data[ag];
    e.disconnectedNodes = t ? new Set(t) : null;
  }
  return e.disconnectedNodes;
}
function to(e, t) {
  if (typeof e.disconnectedNodes > "u") {
    let n = e.data[ag];
    e.disconnectedNodes = n ? new Set(n) : null;
  }
  return !!Zw(e)?.has(t);
}
function Yw(e, t) {
  let n = t.get(tl),
    o = t.get(yn).get(Uw, {}),
    i = !1,
    s = e,
    a = null,
    c = [];
  for (; !i && s; ) {
    i = n.has(s);
    let u = n.hydrating.get(s);
    if (a === null && u != null) {
      a = u.promise;
      break;
    }
    c.unshift(s), (s = o[s][gw]);
  }
  return { parentBlockPromise: a, hydrationQueue: c };
}
function _g(e, t) {
  let n = e.contentQueries;
  if (n !== null) {
    let r = O(null);
    try {
      for (let o = 0; o < n.length; o += 2) {
        let i = n[o],
          s = n[o + 1];
        if (s !== -1) {
          let a = e.data[s];
          _p(i), a.contentQueries(2, t[s], s);
        }
      }
    } finally {
      O(r);
    }
  }
}
function Yc(e, t, n) {
  _p(0);
  let r = O(null);
  try {
    t(e, n);
  } finally {
    O(r);
  }
}
function bg(e, t, n) {
  if (lp(t)) {
    let r = O(null);
    try {
      let o = t.directiveStart,
        i = t.directiveEnd;
      for (let s = o; s < i; s++) {
        let a = e.data[s];
        if (a.contentQueries) {
          let c = n[s];
          a.contentQueries(1, c, s);
        }
      }
    } finally {
      O(r);
    }
  }
}
var tt = (function (e) {
    return (
      (e[(e.Emulated = 0)] = "Emulated"),
      (e[(e.None = 2)] = "None"),
      (e[(e.ShadowDom = 3)] = "ShadowDom"),
      e
    );
  })(tt || {}),
  Ti;
function Kw() {
  if (Ti === void 0 && ((Ti = null), kr.trustedTypes))
    try {
      Ti = kr.trustedTypes.createPolicy("angular", {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return Ti;
}
function Rs(e) {
  return Kw()?.createHTML(e) || e;
}
var Si;
function Mg() {
  if (Si === void 0 && ((Si = null), kr.trustedTypes))
    try {
      Si = kr.trustedTypes.createPolicy("angular#unsafe-bypass", {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return Si;
}
function dh(e) {
  return Mg()?.createHTML(e) || e;
}
function fh(e) {
  return Mg()?.createScriptURL(e) || e;
}
var Dt = class {
    changingThisBreaksApplicationSecurity;
    constructor(t) {
      this.changingThisBreaksApplicationSecurity = t;
    }
    toString() {
      return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Bh})`;
    }
  },
  Kc = class extends Dt {
    getTypeName() {
      return "HTML";
    }
  },
  Qc = class extends Dt {
    getTypeName() {
      return "Style";
    }
  },
  Xc = class extends Dt {
    getTypeName() {
      return "Script";
    }
  },
  Jc = class extends Dt {
    getTypeName() {
      return "URL";
    }
  },
  eu = class extends Dt {
    getTypeName() {
      return "ResourceURL";
    }
  };
function Ye(e) {
  return e instanceof Dt ? e.changingThisBreaksApplicationSecurity : e;
}
function wt(e, t) {
  let n = Qw(e);
  if (n != null && n !== t) {
    if (n === "ResourceURL" && t === "URL") return !0;
    throw new Error(`Required a safe ${t}, got a ${n} (see ${Bh})`);
  }
  return n === t;
}
function Qw(e) {
  return (e instanceof Dt && e.getTypeName()) || null;
}
function Tg(e) {
  return new Kc(e);
}
function Sg(e) {
  return new Qc(e);
}
function Ng(e) {
  return new Xc(e);
}
function Ag(e) {
  return new Jc(e);
}
function Rg(e) {
  return new eu(e);
}
function Xw(e) {
  let t = new nu(e);
  return Jw() ? new tu(t) : t;
}
var tu = class {
    inertDocumentHelper;
    constructor(t) {
      this.inertDocumentHelper = t;
    }
    getInertBodyElement(t) {
      t = "<body><remove></remove>" + t;
      try {
        let n = new window.DOMParser().parseFromString(Rs(t), "text/html").body;
        return n === null
          ? this.inertDocumentHelper.getInertBodyElement(t)
          : (n.firstChild?.remove(), n);
      } catch {
        return null;
      }
    }
  },
  nu = class {
    defaultDoc;
    inertDocument;
    constructor(t) {
      (this.defaultDoc = t),
        (this.inertDocument =
          this.defaultDoc.implementation.createHTMLDocument(
            "sanitization-inert"
          ));
    }
    getInertBodyElement(t) {
      let n = this.inertDocument.createElement("template");
      return (n.innerHTML = Rs(t)), n;
    }
  };
function Jw() {
  try {
    return !!new window.DOMParser().parseFromString(Rs(""), "text/html");
  } catch {
    return !1;
  }
}
var eI = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function xs(e) {
  return (e = String(e)), e.match(eI) ? e : "unsafe:" + e;
}
function It(e) {
  let t = {};
  for (let n of e.split(",")) t[n] = !0;
  return t;
}
function no(...e) {
  let t = {};
  for (let n of e) for (let r in n) n.hasOwnProperty(r) && (t[r] = !0);
  return t;
}
var xg = It("area,br,col,hr,img,wbr"),
  Og = It("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
  Pg = It("rp,rt"),
  tI = no(Pg, Og),
  nI = no(
    Og,
    It(
      "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
    )
  ),
  rI = no(
    Pg,
    It(
      "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
    )
  ),
  hh = no(xg, nI, rI, tI),
  Fg = It("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
  oI = It(
    "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
  ),
  iI = It(
    "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
  ),
  sI = no(Fg, oI, iI),
  aI = It("script,style,template"),
  ru = class {
    sanitizedSomething = !1;
    buf = [];
    sanitizeChildren(t) {
      let n = t.firstChild,
        r = !0,
        o = [];
      for (; n; ) {
        if (
          (n.nodeType === Node.ELEMENT_NODE
            ? (r = this.startElement(n))
            : n.nodeType === Node.TEXT_NODE
            ? this.chars(n.nodeValue)
            : (this.sanitizedSomething = !0),
          r && n.firstChild)
        ) {
          o.push(n), (n = lI(n));
          continue;
        }
        for (; n; ) {
          n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
          let i = uI(n);
          if (i) {
            n = i;
            break;
          }
          n = o.pop();
        }
      }
      return this.buf.join("");
    }
    startElement(t) {
      let n = ph(t).toLowerCase();
      if (!hh.hasOwnProperty(n))
        return (this.sanitizedSomething = !0), !aI.hasOwnProperty(n);
      this.buf.push("<"), this.buf.push(n);
      let r = t.attributes;
      for (let o = 0; o < r.length; o++) {
        let i = r.item(o),
          s = i.name,
          a = s.toLowerCase();
        if (!sI.hasOwnProperty(a)) {
          this.sanitizedSomething = !0;
          continue;
        }
        let c = i.value;
        Fg[a] && (c = xs(c)), this.buf.push(" ", s, '="', gh(c), '"');
      }
      return this.buf.push(">"), !0;
    }
    endElement(t) {
      let n = ph(t).toLowerCase();
      hh.hasOwnProperty(n) &&
        !xg.hasOwnProperty(n) &&
        (this.buf.push("</"), this.buf.push(n), this.buf.push(">"));
    }
    chars(t) {
      this.buf.push(gh(t));
    }
  };
function cI(e, t) {
  return (
    (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) !==
    Node.DOCUMENT_POSITION_CONTAINED_BY
  );
}
function uI(e) {
  let t = e.nextSibling;
  if (t && e !== t.previousSibling) throw kg(t);
  return t;
}
function lI(e) {
  let t = e.firstChild;
  if (t && cI(e, t)) throw kg(t);
  return t;
}
function ph(e) {
  let t = e.nodeName;
  return typeof t == "string" ? t : "FORM";
}
function kg(e) {
  return new Error(
    `Failed to sanitize html because the element is clobbered: ${e.outerHTML}`
  );
}
var dI = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
  fI = /([^\#-~ |!])/g;
function gh(e) {
  return e
    .replace(/&/g, "&amp;")
    .replace(dI, function (t) {
      let n = t.charCodeAt(0),
        r = t.charCodeAt(1);
      return "&#" + ((n - 55296) * 1024 + (r - 56320) + 65536) + ";";
    })
    .replace(fI, function (t) {
      return "&#" + t.charCodeAt(0) + ";";
    })
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
var Ni;
function ol(e, t) {
  let n = null;
  try {
    Ni = Ni || Xw(e);
    let r = t ? String(t) : "";
    n = Ni.getInertBodyElement(r);
    let o = 5,
      i = r;
    do {
      if (o === 0)
        throw new Error(
          "Failed to sanitize html because the input is unstable"
        );
      o--, (r = i), (i = n.innerHTML), (n = Ni.getInertBodyElement(r));
    } while (r !== i);
    let a = new ru().sanitizeChildren(mh(n) || n);
    return Rs(a);
  } finally {
    if (n) {
      let r = mh(n) || n;
      for (; r.firstChild; ) r.firstChild.remove();
    }
  }
}
function mh(e) {
  return "content" in e && hI(e) ? e.content : null;
}
function hI(e) {
  return e.nodeType === Node.ELEMENT_NODE && e.nodeName === "TEMPLATE";
}
var Ke = (function (e) {
  return (
    (e[(e.NONE = 0)] = "NONE"),
    (e[(e.HTML = 1)] = "HTML"),
    (e[(e.STYLE = 2)] = "STYLE"),
    (e[(e.SCRIPT = 3)] = "SCRIPT"),
    (e[(e.URL = 4)] = "URL"),
    (e[(e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
    e
  );
})(Ke || {});
function tk(e) {
  let t = il();
  return t
    ? dh(t.sanitize(Ke.HTML, e) || "")
    : wt(e, "HTML")
    ? dh(Ye(e))
    : ol(Jr(), dn(e));
}
function pI(e) {
  let t = il();
  return t ? t.sanitize(Ke.URL, e) || "" : wt(e, "URL") ? Ye(e) : xs(dn(e));
}
function gI(e) {
  let t = il();
  if (t) return fh(t.sanitize(Ke.RESOURCE_URL, e) || "");
  if (wt(e, "ResourceURL")) return fh(Ye(e));
  throw new E(904, !1);
}
function mI(e, t) {
  return (t === "src" &&
    (e === "embed" ||
      e === "frame" ||
      e === "iframe" ||
      e === "media" ||
      e === "script")) ||
    (t === "href" && (e === "base" || e === "link"))
    ? gI
    : pI;
}
function Lg(e, t, n) {
  return mI(t, n)(e);
}
function il() {
  let e = F();
  return e && e[mt].sanitizer;
}
var vI = /^>|^->|<!--|-->|--!>|<!-$/g,
  yI = /(<|>)/g,
  DI = "\u200B$1\u200B";
function EI(e) {
  return e.replace(vI, (t) => t.replace(yI, DI));
}
function nk(e) {
  return e.ownerDocument.defaultView;
}
function rk(e) {
  return e.ownerDocument;
}
function CI(e) {
  return e.ownerDocument.body;
}
function Vg(e) {
  return e instanceof Function ? e() : e;
}
var jt = (function (e) {
    return (
      (e[(e.None = 0)] = "None"),
      (e[(e.SignalBased = 1)] = "SignalBased"),
      (e[(e.HasDecoratorInputTransform = 2)] = "HasDecoratorInputTransform"),
      e
    );
  })(jt || {}),
  nt = (function (e) {
    return (
      (e[(e.Important = 1)] = "Important"),
      (e[(e.DashCase = 2)] = "DashCase"),
      e
    );
  })(nt || {}),
  wI;
function sl(e, t) {
  return wI(e, t);
}
function Un(e, t, n, r, o) {
  if (r != null) {
    let i,
      s = !1;
    ot(r) ? (i = r) : Ge(r) && ((s = !0), (r = r[Ne]));
    let a = We(r);
    e === 0 && n !== null
      ? o == null
        ? Hg(t, n, a)
        : rs(t, n, a, o || null, !0)
      : e === 1 && n !== null
      ? rs(t, n, a, o || null, !0)
      : e === 2
      ? ll(t, a, s)
      : e === 3 && t.destroyNode(a),
      i != null && LI(t, e, i, n, o);
  }
}
function jg(e, t) {
  return e.createText(t);
}
function II(e, t, n) {
  e.setValue(t, n);
}
function Ug(e, t) {
  return e.createComment(EI(t));
}
function al(e, t, n) {
  return e.createElement(t, n);
}
function _I(e, t) {
  Bg(e, t), (t[Ne] = null), (t[Ze] = null);
}
function bI(e, t, n, r, o, i) {
  (r[Ne] = o), (r[Ze] = t), Ps(e, r, n, 1, o, i);
}
function Bg(e, t) {
  t[mt].changeDetectionScheduler?.notify(10), Ps(e, t, t[q], 2, null, null);
}
function MI(e) {
  let t = e[jr];
  if (!t) return vc(e[b], e);
  for (; t; ) {
    let n = null;
    if (Ge(t)) n = t[jr];
    else {
      let r = t[de];
      r && (n = r);
    }
    if (!n) {
      for (; t && !t[ze] && t !== e; ) Ge(t) && vc(t[b], t), (t = t[ce]);
      t === null && (t = e), Ge(t) && vc(t[b], t), (n = t && t[ze]);
    }
    t = n;
  }
}
function TI(e, t, n, r) {
  let o = de + r,
    i = n.length;
  r > 0 && (n[o - 1][ze] = t),
    r < i - de
      ? ((t[ze] = n[o]), Jh(n, de + r, t))
      : (n.push(t), (t[ze] = null)),
    (t[ce] = n);
  let s = t[Wn];
  s !== null && n !== s && $g(s, t);
  let a = t[Zn];
  a !== null && a.insertView(e), Oc(t), (t[T] |= 128);
}
function $g(e, t) {
  let n = e[Wi],
    r = t[ce];
  if (Ge(r)) e[T] |= 2;
  else {
    let o = r[ce][Ae];
    t[Ae] !== o && (e[T] |= 2);
  }
  n === null ? (e[Wi] = [t]) : n.push(t);
}
function cl(e, t) {
  let n = e[Wi],
    r = n.indexOf(t);
  n.splice(r, 1);
}
function Br(e, t) {
  if (e.length <= de) return;
  let n = de + t,
    r = e[n];
  if (r) {
    let o = r[Wn];
    o !== null && o !== e && cl(o, r), t > 0 && (e[n - 1][ze] = r[ze]);
    let i = $i(e, de + t);
    _I(r[b], r);
    let s = i[Zn];
    s !== null && s.detachView(i[b]),
      (r[ce] = null),
      (r[ze] = null),
      (r[T] &= -129);
  }
  return r;
}
function Os(e, t) {
  if (ir(t)) return;
  let n = t[q];
  n.destroyNode && Ps(e, t, n, 3, null, null), MI(t);
}
function vc(e, t) {
  if (ir(t)) return;
  let n = O(null);
  try {
    (t[T] &= -129),
      (t[T] |= 256),
      t[Se] && Va(t[Se]),
      NI(e, t),
      SI(e, t),
      t[b].type === 1 && t[q].destroy();
    let r = t[Wn];
    if (r !== null && ot(t[ce])) {
      r !== t[ce] && cl(r, t);
      let o = t[Zn];
      o !== null && o.detachView(e);
    }
    Gc(t);
  } finally {
    O(n);
  }
}
function SI(e, t) {
  let n = e.cleanup,
    r = t[zi];
  if (n !== null)
    for (let s = 0; s < n.length - 1; s += 2)
      if (typeof n[s] == "string") {
        let a = n[s + 3];
        a >= 0 ? r[a]() : r[-a].unsubscribe(), (s += 2);
      } else {
        let a = r[n[s + 1]];
        n[s].call(a);
      }
  r !== null && (t[zi] = null);
  let o = t[kt];
  if (o !== null) {
    t[kt] = null;
    for (let s = 0; s < o.length; s++) {
      let a = o[s];
      a();
    }
  }
  let i = t[Gi];
  if (i !== null) {
    t[Gi] = null;
    for (let s of i) s.destroy();
  }
}
function NI(e, t) {
  let n;
  if (e != null && (n = e.destroyHooks) != null)
    for (let r = 0; r < n.length; r += 2) {
      let o = t[n[r]];
      if (!(o instanceof gn)) {
        let i = n[r + 1];
        if (Array.isArray(i))
          for (let s = 0; s < i.length; s += 2) {
            let a = o[i[s]],
              c = i[s + 1];
            Ve(4, a, c);
            try {
              c.call(a);
            } finally {
              Ve(5, a, c);
            }
          }
        else {
          Ve(4, o, i);
          try {
            i.call(o);
          } finally {
            Ve(5, o, i);
          }
        }
      }
    }
}
function AI(e, t, n) {
  return RI(e, t.parent, n);
}
function RI(e, t, n) {
  let r = t;
  for (; r !== null && r.type & 168; ) (t = r), (r = t.parent);
  if (r === null) return n[Ne];
  {
    let { componentOffset: o } = r;
    if (o > -1) {
      let { encapsulation: i } = e.data[r.directiveStart + o];
      if (i === tt.None || i === tt.Emulated) return null;
    }
    return Re(r, n);
  }
}
function rs(e, t, n, r, o) {
  e.insertBefore(t, n, r, o);
}
function Hg(e, t, n) {
  e.appendChild(t, n);
}
function vh(e, t, n, r, o) {
  r !== null ? rs(e, t, n, r, o) : Hg(e, t, n);
}
function zg(e, t) {
  return e.parentNode(t);
}
function xI(e, t) {
  return e.nextSibling(t);
}
function OI(e, t, n) {
  return FI(e, t, n);
}
function PI(e, t, n) {
  return e.type & 40 ? Re(e, n) : null;
}
var FI = PI,
  yh;
function ul(e, t, n, r) {
  let o = AI(e, r, t),
    i = t[q],
    s = r.parent || t[Ze],
    a = OI(s, r, t);
  if (o != null)
    if (Array.isArray(n))
      for (let c = 0; c < n.length; c++) vh(i, o, n[c], a, !1);
    else vh(i, o, n, a, !1);
  yh !== void 0 && yh(i, r, t, n, o);
}
function Pr(e, t) {
  if (t !== null) {
    let n = t.type;
    if (n & 3) return Re(t, e);
    if (n & 4) return ou(-1, e[t.index]);
    if (n & 8) {
      let r = t.child;
      if (r !== null) return Pr(e, r);
      {
        let o = e[t.index];
        return ot(o) ? ou(-1, o) : We(o);
      }
    } else {
      if (n & 128) return Pr(e, t.next);
      if (n & 32) return sl(t, e)() || We(e[t.index]);
      {
        let r = Gg(e, t);
        if (r !== null) {
          if (Array.isArray(r)) return r[0];
          let o = hn(e[Ae]);
          return Pr(o, r);
        } else return Pr(e, t.next);
      }
    }
  }
  return null;
}
function Gg(e, t) {
  if (t !== null) {
    let r = e[Ae][Ze],
      o = t.projection;
    return r.projection[o];
  }
  return null;
}
function ou(e, t) {
  let n = de + e + 1;
  if (n < t.length) {
    let r = t[n],
      o = r[b].firstChild;
    if (o !== null) return Pr(r, o);
  }
  return t[yt];
}
function ll(e, t, n) {
  e.removeChild(null, t, n);
}
function qg(e) {
  e.textContent = "";
}
function dl(e, t, n, r, o, i, s) {
  for (; n != null; ) {
    if (n.type === 128) {
      n = n.next;
      continue;
    }
    let a = r[n.index],
      c = n.type;
    if (
      (s && t === 0 && (a && mn(We(a), r), (n.flags |= 2)),
      (n.flags & 32) !== 32)
    )
      if (c & 8) dl(e, t, n.child, r, o, i, !1), Un(t, e, o, a, i);
      else if (c & 32) {
        let u = sl(n, r),
          l;
        for (; (l = u()); ) Un(t, e, o, l, i);
        Un(t, e, o, a, i);
      } else c & 16 ? kI(e, t, r, n, o, i) : Un(t, e, o, a, i);
    n = s ? n.projectionNext : n.next;
  }
}
function Ps(e, t, n, r, o, i) {
  dl(n, r, e.firstChild, t, o, i, !1);
}
function kI(e, t, n, r, o, i) {
  let s = n[Ae],
    c = s[Ze].projection[r.projection];
  if (Array.isArray(c))
    for (let u = 0; u < c.length; u++) {
      let l = c[u];
      Un(t, e, o, l, i);
    }
  else {
    let u = c,
      l = s[ce];
    ts(r) && (u.flags |= 128), dl(e, t, u, l, o, i, !0);
  }
}
function LI(e, t, n, r, o) {
  let i = n[yt],
    s = We(n);
  i !== s && Un(t, e, r, i, o);
  for (let a = de; a < n.length; a++) {
    let c = n[a];
    Ps(c[b], c, e, t, r, i);
  }
}
function VI(e, t, n, r, o) {
  if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
  else {
    let i = r.indexOf("-") === -1 ? void 0 : nt.DashCase;
    o == null
      ? e.removeStyle(n, r, i)
      : (typeof o == "string" &&
          o.endsWith("!important") &&
          ((o = o.slice(0, -10)), (i |= nt.Important)),
        e.setStyle(n, r, o, i));
  }
}
function jI(e, t, n) {
  e.setAttribute(t, "style", n);
}
function Wg(e, t, n) {
  n === "" ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n);
}
function Zg(e, t, n) {
  let { mergedAttrs: r, classes: o, styles: i } = n;
  r !== null && kc(e, t, r),
    o !== null && Wg(e, t, o),
    i !== null && jI(e, t, i);
}
function UI(e, t, n) {
  let r = e.length;
  for (;;) {
    let o = e.indexOf(t, n);
    if (o === -1) return o;
    if (o === 0 || e.charCodeAt(o - 1) <= 32) {
      let i = t.length;
      if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
    }
    n = o + 1;
  }
}
var Yg = "ng-template";
function BI(e, t, n, r) {
  let o = 0;
  if (r) {
    for (; o < t.length && typeof t[o] == "string"; o += 2)
      if (t[o] === "class" && UI(t[o + 1].toLowerCase(), n, 0) !== -1)
        return !0;
  } else if (fl(e)) return !1;
  if (((o = t.indexOf(1, o)), o > -1)) {
    let i;
    for (; ++o < t.length && typeof (i = t[o]) == "string"; )
      if (i.toLowerCase() === n) return !0;
  }
  return !1;
}
function fl(e) {
  return e.type === 4 && e.value !== Yg;
}
function $I(e, t, n) {
  let r = e.type === 4 && !n ? Yg : e.value;
  return t === r;
}
function HI(e, t, n) {
  let r = 4,
    o = e.attrs,
    i = o !== null ? qI(o) : 0,
    s = !1;
  for (let a = 0; a < t.length; a++) {
    let c = t[a];
    if (typeof c == "number") {
      if (!s && !He(r) && !He(c)) return !1;
      if (s && He(c)) continue;
      (s = !1), (r = c | (r & 1));
      continue;
    }
    if (!s)
      if (r & 4) {
        if (
          ((r = 2 | (r & 1)),
          (c !== "" && !$I(e, c, n)) || (c === "" && t.length === 1))
        ) {
          if (He(r)) return !1;
          s = !0;
        }
      } else if (r & 8) {
        if (o === null || !BI(e, o, c, n)) {
          if (He(r)) return !1;
          s = !0;
        }
      } else {
        let u = t[++a],
          l = zI(c, o, fl(e), n);
        if (l === -1) {
          if (He(r)) return !1;
          s = !0;
          continue;
        }
        if (u !== "") {
          let d;
          if (
            (l > i ? (d = "") : (d = o[l + 1].toLowerCase()), r & 2 && u !== d)
          ) {
            if (He(r)) return !1;
            s = !0;
          }
        }
      }
  }
  return He(r) || s;
}
function He(e) {
  return (e & 1) === 0;
}
function zI(e, t, n, r) {
  if (t === null) return -1;
  let o = 0;
  if (r || !n) {
    let i = !1;
    for (; o < t.length; ) {
      let s = t[o];
      if (s === e) return o;
      if (s === 3 || s === 6) i = !0;
      else if (s === 1 || s === 2) {
        let a = t[++o];
        for (; typeof a == "string"; ) a = t[++o];
        continue;
      } else {
        if (s === 4) break;
        if (s === 0) {
          o += 4;
          continue;
        }
      }
      o += i ? 1 : 2;
    }
    return -1;
  } else return WI(t, e);
}
function GI(e, t, n = !1) {
  for (let r = 0; r < t.length; r++) if (HI(e, t[r], n)) return !0;
  return !1;
}
function qI(e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (Op(n)) return t;
  }
  return e.length;
}
function WI(e, t) {
  let n = e.indexOf(4);
  if (n > -1)
    for (n++; n < e.length; ) {
      let r = e[n];
      if (typeof r == "number") return -1;
      if (r === t) return n;
      n++;
    }
  return -1;
}
function Dh(e, t) {
  return e ? ":not(" + t.trim() + ")" : t;
}
function ZI(e) {
  let t = e[0],
    n = 1,
    r = 2,
    o = "",
    i = !1;
  for (; n < e.length; ) {
    let s = e[n];
    if (typeof s == "string")
      if (r & 2) {
        let a = e[++n];
        o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
      } else r & 8 ? (o += "." + s) : r & 4 && (o += " " + s);
    else
      o !== "" && !He(s) && ((t += Dh(i, o)), (o = "")),
        (r = s),
        (i = i || !He(r));
    n++;
  }
  return o !== "" && (t += Dh(i, o)), t;
}
function YI(e) {
  return e.map(ZI).join(",");
}
function KI(e) {
  let t = [],
    n = [],
    r = 1,
    o = 2;
  for (; r < e.length; ) {
    let i = e[r];
    if (typeof i == "string")
      o === 2 ? i !== "" && t.push(i, e[++r]) : o === 8 && n.push(i);
    else {
      if (!He(o)) break;
      o = i;
    }
    r++;
  }
  return { attrs: t, classes: n };
}
var Oe = {};
function ok(e = 1) {
  Kg(ge(), F(), zt() + e, !1);
}
function Kg(e, t, n, r) {
  if (!r)
    if ((t[T] & 3) === 3) {
      let i = e.preOrderCheckHooks;
      i !== null && Pi(t, i, n);
    } else {
      let i = e.preOrderHooks;
      i !== null && Fi(t, i, 0, n);
    }
  pn(n);
}
function V(e, t = P.Default) {
  let n = F();
  if (n === null) return I(e, t);
  let r = me();
  return Up(r, n, pe(e), t);
}
function Qg() {
  let e = "invalid";
  throw new Error(e);
}
function Xg(e, t, n, r, o, i) {
  let s = O(null);
  try {
    let a = null;
    o & jt.SignalBased && (a = t[r][ke]),
      a !== null && a.transformFn !== void 0 && (i = a.transformFn(i)),
      o & jt.HasDecoratorInputTransform &&
        (i = e.inputTransforms[r].call(t, i)),
      e.setInput !== null ? e.setInput(t, a, i, n, r) : dp(t, a, r, i);
  } finally {
    O(s);
  }
}
function Fs(e, t, n, r, o, i, s, a, c, u, l) {
  let d = t.blueprint.slice();
  return (
    (d[Ne] = o),
    (d[T] = r | 4 | 128 | 8 | 64 | 1024),
    (u !== null || (e && e[T] & 2048)) && (d[T] |= 2048),
    vp(d),
    (d[ce] = d[or] = e),
    (d[le] = n),
    (d[mt] = s || (e && e[mt])),
    (d[q] = a || (e && e[q])),
    (d[je] = c || (e && e[je]) || null),
    (d[Ze] = i),
    (d[Es] = ow()),
    (d[qe] = l),
    (d[cp] = u),
    (d[Ae] = t.type == 2 ? e[Ae] : d),
    d
  );
}
function ks(e, t, n, r, o) {
  let i = e.data[t];
  if (i === null) (i = QI(e, t, n, r, o)), DC() && (i.flags |= 32);
  else if (i.type & 64) {
    (i.type = n), (i.value = r), (i.attrs = o);
    let s = gC();
    i.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return Kr(i, !0), i;
}
function QI(e, t, n, r, o) {
  let i = Ep(),
    s = Cp(),
    a = s ? i : i && i.parent,
    c = (e.data[t] = r_(e, a, n, t, r, o));
  return (
    e.firstChild === null && (e.firstChild = c),
    i !== null &&
      (s
        ? i.child == null && c.parent !== null && (i.child = c)
        : i.next === null && ((i.next = c), (c.prev = i))),
    c
  );
}
function Jg(e, t, n, r) {
  if (n === 0) return -1;
  let o = t.length;
  for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
  return o;
}
function em(e, t, n, r, o) {
  let i = zt(),
    s = r & 2;
  try {
    pn(-1), s && t.length > Z && Kg(e, t, Z, !1), Ve(s ? 2 : 0, o), n(r, o);
  } finally {
    pn(i), Ve(s ? 3 : 1, o);
  }
}
function tm(e, t, n) {
  Dp() && (u_(e, t, n, Re(n, t)), (n.flags & 64) === 64 && cm(e, t, n));
}
function nm(e, t, n = Re) {
  let r = t.localNames;
  if (r !== null) {
    let o = t.index + 1;
    for (let i = 0; i < r.length; i += 2) {
      let s = r[i + 1],
        a = s === -1 ? n(t, e) : e[s];
      e[o++] = a;
    }
  }
}
function rm(e) {
  let t = e.tView;
  return t === null || t.incompleteFirstPass
    ? (e.tView = hl(
        1,
        null,
        e.template,
        e.decls,
        e.vars,
        e.directiveDefs,
        e.pipeDefs,
        e.viewQuery,
        e.schemas,
        e.consts,
        e.id
      ))
    : t;
}
function hl(e, t, n, r, o, i, s, a, c, u, l) {
  let d = Z + r,
    h = d + o,
    f = XI(d, h),
    g = typeof u == "function" ? u() : u;
  return (f[b] = {
    type: e,
    blueprint: f,
    template: n,
    queries: null,
    viewQuery: a,
    declTNode: t,
    data: f.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: h,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof i == "function" ? i() : i,
    pipeRegistry: typeof s == "function" ? s() : s,
    firstChild: null,
    schemas: c,
    consts: g,
    incompleteFirstPass: !1,
    ssrId: l,
  });
}
function XI(e, t) {
  let n = [];
  for (let r = 0; r < t; r++) n.push(r < e ? null : Oe);
  return n;
}
function JI(e, t, n, r) {
  let i = r.get(dg, lg) || n === tt.ShadowDom,
    s = e.selectRootElement(t, i);
  return e_(s), s;
}
function e_(e) {
  om(e);
}
var om = () => null;
function t_(e) {
  Qp(e) ? qg(e) : qw(e);
}
function n_() {
  om = t_;
}
function r_(e, t, n, r, o, i) {
  let s = t ? t.injectorIndex : -1,
    a = 0;
  return (
    Yr() && (a |= 128),
    {
      type: n,
      index: r,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: o,
      attrs: i,
      mergedAttrs: null,
      localNames: null,
      initialInputs: void 0,
      inputs: null,
      outputs: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: t,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
function Eh(e, t, n, r, o) {
  for (let i in t) {
    if (!t.hasOwnProperty(i)) continue;
    let s = t[i];
    if (s === void 0) continue;
    r ??= {};
    let a,
      c = jt.None;
    Array.isArray(s) ? ((a = s[0]), (c = s[1])) : (a = s);
    let u = i;
    if (o !== null) {
      if (!o.hasOwnProperty(i)) continue;
      u = o[i];
    }
    e === 0 ? Ch(r, n, u, a, c) : Ch(r, n, u, a);
  }
  return r;
}
function Ch(e, t, n, r, o) {
  let i;
  e.hasOwnProperty(n) ? (i = e[n]).push(t, r) : (i = e[n] = [t, r]),
    o !== void 0 && i.push(o);
}
function o_(e, t, n) {
  let r = t.directiveStart,
    o = t.directiveEnd,
    i = e.data,
    s = t.attrs,
    a = [],
    c = null,
    u = null;
  for (let l = r; l < o; l++) {
    let d = i[l],
      h = n ? n.get(d) : null,
      f = h ? h.inputs : null,
      g = h ? h.outputs : null;
    (c = Eh(0, d.inputs, l, c, f)), (u = Eh(1, d.outputs, l, u, g));
    let m = c !== null && s !== null && !fl(t) ? D_(c, l, s) : null;
    a.push(m);
  }
  c !== null &&
    (c.hasOwnProperty("class") && (t.flags |= 8),
    c.hasOwnProperty("style") && (t.flags |= 16)),
    (t.initialInputs = a),
    (t.inputs = c),
    (t.outputs = u);
}
function i_(e) {
  return e === "class"
    ? "className"
    : e === "for"
    ? "htmlFor"
    : e === "formaction"
    ? "formAction"
    : e === "innerHtml"
    ? "innerHTML"
    : e === "readonly"
    ? "readOnly"
    : e === "tabindex"
    ? "tabIndex"
    : e;
}
function im(e, t, n, r, o, i, s, a) {
  let c = Re(t, n),
    u = t.inputs,
    l;
  !a && u != null && (l = u[r])
    ? (pl(e, n, l, r, o), Wr(t) && s_(n, t.index))
    : t.type & 3
    ? ((r = i_(r)),
      (o = s != null ? s(o, t.value || "", r) : o),
      i.setProperty(c, r, o))
    : t.type & 12;
}
function s_(e, t) {
  let n = Ht(t, e);
  n[T] & 16 || (n[T] |= 64);
}
function sm(e, t, n, r) {
  if (Dp()) {
    let o = r === null ? null : { "": -1 },
      i = d_(e, n),
      s,
      a;
    i === null ? (s = a = null) : ([s, a] = i),
      s !== null && am(e, t, n, s, o, a),
      o && f_(n, r, o);
  }
  n.mergedAttrs = Ur(n.mergedAttrs, n.attrs);
}
function am(e, t, n, r, o, i) {
  for (let u = 0; u < r.length; u++) Vc(Xi(n, t), e, r[u].type);
  p_(n, e.data.length, r.length);
  for (let u = 0; u < r.length; u++) {
    let l = r[u];
    l.providersResolver && l.providersResolver(l);
  }
  let s = !1,
    a = !1,
    c = Jg(e, t, r.length, null);
  for (let u = 0; u < r.length; u++) {
    let l = r[u];
    (n.mergedAttrs = Ur(n.mergedAttrs, l.hostAttrs)),
      g_(e, n, t, c, l),
      h_(c, l, o),
      l.contentQueries !== null && (n.flags |= 4),
      (l.hostBindings !== null || l.hostAttrs !== null || l.hostVars !== 0) &&
        (n.flags |= 64);
    let d = l.type.prototype;
    !s &&
      (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
      ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
      !a &&
        (d.ngOnChanges || d.ngDoCheck) &&
        ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
      c++;
  }
  o_(e, n, i);
}
function a_(e, t, n, r, o) {
  let i = o.hostBindings;
  if (i) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~t.index;
    c_(s) != a && s.push(a), s.push(n, r, i);
  }
}
function c_(e) {
  let t = e.length;
  for (; t > 0; ) {
    let n = e[--t];
    if (typeof n == "number" && n < 0) return n;
  }
  return 0;
}
function u_(e, t, n, r) {
  let o = n.directiveStart,
    i = n.directiveEnd;
  Wr(n) && m_(t, n, e.data[o + n.componentOffset]),
    e.firstCreatePass || Xi(n, t),
    mn(r, t);
  let s = n.initialInputs;
  for (let a = o; a < i; a++) {
    let c = e.data[a],
      u = Kn(t, e, a, n);
    if ((mn(u, t), s !== null && y_(t, a - o, u, c, n, s), Vt(c))) {
      let l = Ht(n.index, t);
      l[le] = Kn(t, e, a, n);
    }
  }
}
function cm(e, t, n) {
  let r = n.directiveStart,
    o = n.directiveEnd,
    i = n.index,
    s = CC();
  try {
    pn(i);
    for (let a = r; a < o; a++) {
      let c = e.data[a],
        u = t[a];
      Fc(a),
        (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) &&
          l_(c, u);
    }
  } finally {
    pn(-1), Fc(s);
  }
}
function l_(e, t) {
  e.hostBindings !== null && e.hostBindings(1, t);
}
function d_(e, t) {
  let n = e.directiveRegistry,
    r = null,
    o = null;
  if (n)
    for (let i = 0; i < n.length; i++) {
      let s = n[i];
      if (GI(t, s.selectors, !1))
        if ((r || (r = []), Vt(s)))
          if (s.findHostDirectiveDefs !== null) {
            let a = [];
            (o = o || new Map()),
              s.findHostDirectiveDefs(s, a, o),
              r.unshift(...a, s);
            let c = a.length;
            iu(e, t, c);
          } else r.unshift(s), iu(e, t, 0);
        else
          (o = o || new Map()), s.findHostDirectiveDefs?.(s, r, o), r.push(s);
    }
  return r === null ? null : [r, o];
}
function iu(e, t, n) {
  (t.componentOffset = n), (e.components ??= []).push(t.index);
}
function f_(e, t, n) {
  if (t) {
    let r = (e.localNames = []);
    for (let o = 0; o < t.length; o += 2) {
      let i = n[t[o + 1]];
      if (i == null) throw new E(-301, !1);
      r.push(t[o], i);
    }
  }
}
function h_(e, t, n) {
  if (n) {
    if (t.exportAs)
      for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
    Vt(t) && (n[""] = e);
  }
}
function p_(e, t, n) {
  (e.flags |= 1),
    (e.directiveStart = t),
    (e.directiveEnd = t + n),
    (e.providerIndexes = t);
}
function g_(e, t, n, r, o) {
  e.data[r] = o;
  let i = o.factory || (o.factory = fn(o.type, !0)),
    s = new gn(i, Vt(o), V);
  (e.blueprint[r] = s), (n[r] = s), a_(e, t, r, Jg(e, n, o.hostVars, Oe), o);
}
function um(e) {
  let t = 16;
  return e.signals ? (t = 4096) : e.onPush && (t = 64), t;
}
function m_(e, t, n) {
  let r = Re(t, e),
    o = rm(n),
    i = e[mt].rendererFactory,
    s = Ls(
      e,
      Fs(
        e,
        o,
        null,
        um(n),
        r,
        t,
        null,
        i.createRenderer(r, n),
        null,
        null,
        null
      )
    );
  e[t.index] = s;
}
function lm(e, t, n, r, o, i) {
  let s = Re(e, t);
  v_(t[q], s, i, e.value, n, r, o);
}
function v_(e, t, n, r, o, i, s) {
  if (i == null) e.removeAttribute(t, o, n);
  else {
    let a = s == null ? dn(i) : s(i, r || "", o);
    e.setAttribute(t, o, a, n);
  }
}
function y_(e, t, n, r, o, i) {
  let s = i[t];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      let c = s[a++],
        u = s[a++],
        l = s[a++],
        d = s[a++];
      Xg(r, n, c, u, l, d);
    }
}
function D_(e, t, n) {
  let r = null,
    o = 0;
  for (; o < n.length; ) {
    let i = n[o];
    if (i === 0) {
      o += 4;
      continue;
    } else if (i === 5) {
      o += 2;
      continue;
    }
    if (typeof i == "number") break;
    if (e.hasOwnProperty(i)) {
      r === null && (r = []);
      let s = e[i];
      for (let a = 0; a < s.length; a += 3)
        if (s[a] === t) {
          r.push(i, s[a + 1], s[a + 2], n[o + 1]);
          break;
        }
    }
    o += 2;
  }
  return r;
}
function dm(e, t, n, r) {
  return [e, !0, 0, t, null, r, null, n, null, null];
}
function Ls(e, t) {
  return e[jr] ? (e[Wf][ze] = t) : (e[jr] = t), (e[Wf] = t), t;
}
function Vs(e, t) {
  let n = e[je],
    r = n ? n.get(et, null) : null;
  r && r.handleError(t);
}
function pl(e, t, n, r, o) {
  for (let i = 0; i < n.length; ) {
    let s = n[i++],
      a = n[i++],
      c = n[i++],
      u = t[s],
      l = e.data[s];
    Xg(l, u, r, a, c, o);
  }
}
function E_(e, t) {
  let n = Ht(t, e),
    r = n[b];
  C_(r, n);
  let o = n[Ne];
  o !== null && n[qe] === null && (n[qe] = nl(o, n[je])), gl(r, n, n[le]);
}
function C_(e, t) {
  for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
}
function gl(e, t, n) {
  Bu(t);
  try {
    let r = e.viewQuery;
    r !== null && Yc(1, r, n);
    let o = e.template;
    o !== null && em(e, t, o, 1, n),
      e.firstCreatePass && (e.firstCreatePass = !1),
      t[Zn]?.finishViewCreation(e),
      e.staticContentQueries && _g(e, t),
      e.staticViewQueries && Yc(2, e.viewQuery, n);
    let i = e.components;
    i !== null && w_(t, i);
  } catch (r) {
    throw (
      (e.firstCreatePass &&
        ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
      r)
    );
  } finally {
    (t[T] &= -5), $u();
  }
}
function w_(e, t) {
  for (let n = 0; n < t.length; n++) E_(e, t[n]);
}
function js(e, t, n, r) {
  let o = O(null);
  try {
    let i = t.tView,
      a = e[T] & 4096 ? 4096 : 16,
      c = Fs(
        e,
        i,
        n,
        a,
        null,
        t,
        null,
        null,
        r?.injector ?? null,
        r?.embeddedViewInjector ?? null,
        r?.dehydratedView ?? null
      ),
      u = e[t.index];
    c[Wn] = u;
    let l = e[Zn];
    return l !== null && (c[Zn] = l.createEmbeddedView(i)), gl(i, c, n), c;
  } finally {
    O(o);
  }
}
function fm(e, t) {
  let n = de + t;
  if (n < e.length) return e[n];
}
function Xn(e, t) {
  return !t || t.firstChild === null || ts(e);
}
function ro(e, t, n, r = !0) {
  let o = t[b];
  if ((TI(o, t, e, n), r)) {
    let s = ou(n, e),
      a = t[q],
      c = zg(a, e[yt]);
    c !== null && bI(o, e[Ze], a, t, c, s);
  }
  let i = t[qe];
  i !== null && i.firstChild !== null && (i.firstChild = null);
}
function ml(e, t) {
  let n = Br(e, t);
  return n !== void 0 && Os(n[b], n), n;
}
function os(e, t, n, r, o = !1) {
  for (; n !== null; ) {
    if (n.type === 128) {
      n = o ? n.projectionNext : n.next;
      continue;
    }
    let i = t[n.index];
    i !== null && r.push(We(i)), ot(i) && I_(i, r);
    let s = n.type;
    if (s & 8) os(e, t, n.child, r);
    else if (s & 32) {
      let a = sl(n, t),
        c;
      for (; (c = a()); ) r.push(c);
    } else if (s & 16) {
      let a = Gg(t, n);
      if (Array.isArray(a)) r.push(...a);
      else {
        let c = hn(t[Ae]);
        os(c[b], c, a, r, !0);
      }
    }
    n = o ? n.projectionNext : n.next;
  }
  return r;
}
function I_(e, t) {
  for (let n = de; n < e.length; n++) {
    let r = e[n],
      o = r[b].firstChild;
    o !== null && os(r[b], r, o, t);
  }
  e[yt] !== e[Ne] && t.push(e[yt]);
}
var hm = [];
function __(e) {
  return e[Se] ?? b_(e);
}
function b_(e) {
  let t = hm.pop() ?? Object.create(T_);
  return (t.lView = e), t;
}
function M_(e) {
  e.lView[Se] !== e && ((e.lView = null), hm.push(e));
}
var T_ = L(v({}, Sr), {
  consumerIsAlwaysLive: !0,
  kind: "template",
  consumerMarkedDirty: (e) => {
    ws(e.lView);
  },
  consumerOnSignalRead() {
    this.lView[Se] = this;
  },
});
function S_(e) {
  let t = e[Se] ?? Object.create(N_);
  return (t.lView = e), t;
}
var N_ = L(v({}, Sr), {
  consumerIsAlwaysLive: !0,
  kind: "template",
  consumerMarkedDirty: (e) => {
    let t = hn(e.lView);
    for (; t && !pm(t[b]); ) t = hn(t);
    t && ju(t);
  },
  consumerOnSignalRead() {
    this.lView[Se] = this;
  },
});
function pm(e) {
  return e.type !== 2;
}
function gm(e) {
  if (e[Gi] === null) return;
  let t = !0;
  for (; t; ) {
    let n = !1;
    for (let r of e[Gi])
      r.dirty &&
        ((n = !0),
        r.zone === null || Zone.current === r.zone
          ? r.run()
          : r.zone.run(() => r.run()));
    t = n && !!(e[T] & 8192);
  }
}
var A_ = 100;
function mm(e, t = !0, n = 0) {
  let o = e[mt].rendererFactory,
    i = !1;
  i || o.begin?.();
  try {
    R_(e, n);
  } catch (s) {
    throw (t && Vs(e, s), s);
  } finally {
    i || o.end?.();
  }
}
function R_(e, t) {
  let n = wp();
  try {
    Yf(!0), su(e, t);
    let r = 0;
    for (; Cs(e); ) {
      if (r === A_) throw new E(103, !1);
      r++, su(e, 1);
    }
  } finally {
    Yf(n);
  }
}
function x_(e, t, n, r) {
  if (ir(t)) return;
  let o = t[T],
    i = !1,
    s = !1;
  Bu(t);
  let a = !0,
    c = null,
    u = null;
  i ||
    (pm(e)
      ? ((u = __(t)), (c = Wo(u)))
      : jd() === null
      ? ((a = !1), (u = S_(t)), (c = Wo(u)))
      : t[Se] && (Va(t[Se]), (t[Se] = null)));
  try {
    vp(t), yC(e.bindingStartIndex), n !== null && em(e, t, n, 2, r);
    let l = (o & 3) === 3;
    if (!i)
      if (l) {
        let f = e.preOrderCheckHooks;
        f !== null && Pi(t, f, null);
      } else {
        let f = e.preOrderHooks;
        f !== null && Fi(t, f, 0, null), hc(t, 0);
      }
    if (
      (s || O_(t), gm(t), vm(t, 0), e.contentQueries !== null && _g(e, t), !i)
    )
      if (l) {
        let f = e.contentCheckHooks;
        f !== null && Pi(t, f);
      } else {
        let f = e.contentHooks;
        f !== null && Fi(t, f, 1), hc(t, 1);
      }
    F_(e, t);
    let d = e.components;
    d !== null && Dm(t, d, 0);
    let h = e.viewQuery;
    if ((h !== null && Yc(2, h, r), !i))
      if (l) {
        let f = e.viewCheckHooks;
        f !== null && Pi(t, f);
      } else {
        let f = e.viewHooks;
        f !== null && Fi(t, f, 2), hc(t, 2);
      }
    if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[fc])) {
      for (let f of t[fc]) f();
      t[fc] = null;
    }
    i || (t[T] &= -73);
  } catch (l) {
    throw (i || ws(t), l);
  } finally {
    u !== null && (ka(u, c), a && M_(u)), $u();
  }
}
function vm(e, t) {
  for (let n = eg(e); n !== null; n = tg(n))
    for (let r = de; r < n.length; r++) {
      let o = n[r];
      ym(o, t);
    }
}
function O_(e) {
  for (let t = eg(e); t !== null; t = tg(t)) {
    if (!(t[T] & 2)) continue;
    let n = t[Wi];
    for (let r = 0; r < n.length; r++) {
      let o = n[r];
      ju(o);
    }
  }
}
function P_(e, t, n) {
  let r = Ht(t, e);
  ym(r, n);
}
function ym(e, t) {
  Vu(e) && su(e, t);
}
function su(e, t) {
  let r = e[b],
    o = e[T],
    i = e[Se],
    s = !!(t === 0 && o & 16);
  if (
    ((s ||= !!(o & 64 && t === 0)),
    (s ||= !!(o & 1024)),
    (s ||= !!(i?.dirty && La(i))),
    (s ||= !1),
    i && (i.dirty = !1),
    (e[T] &= -9217),
    s)
  )
    x_(r, e, r.template, e[le]);
  else if (o & 8192) {
    gm(e), vm(e, 1);
    let a = r.components;
    a !== null && Dm(e, a, 1);
  }
}
function Dm(e, t, n) {
  for (let r = 0; r < t.length; r++) P_(e, t[r], n);
}
function F_(e, t) {
  let n = e.hostBindingOpCodes;
  if (n !== null)
    try {
      for (let r = 0; r < n.length; r++) {
        let o = n[r];
        if (o < 0) pn(~o);
        else {
          let i = o,
            s = n[++r],
            a = n[++r];
          EC(s, i);
          let c = t[i];
          Ve(24, c), a(2, c), Ve(25, c);
        }
      }
    } finally {
      pn(-1);
    }
}
function Us(e, t) {
  let n = wp() ? 64 : 1088;
  for (e[mt].changeDetectionScheduler?.notify(t); e; ) {
    e[T] |= n;
    let r = hn(e);
    if (Zi(e) && !r) return e;
    e = r;
  }
  return null;
}
var Jn = class {
  _lView;
  _cdRefInjectingView;
  notifyErrorHandler;
  _appRef = null;
  _attachedToViewContainer = !1;
  get rootNodes() {
    let t = this._lView,
      n = t[b];
    return os(n, t, n.firstChild, []);
  }
  constructor(t, n, r = !0) {
    (this._lView = t),
      (this._cdRefInjectingView = n),
      (this.notifyErrorHandler = r);
  }
  get context() {
    return this._lView[le];
  }
  get dirty() {
    return !!(this._lView[T] & 9280) || !!this._lView[Se]?.dirty;
  }
  set context(t) {
    this._lView[le] = t;
  }
  get destroyed() {
    return ir(this._lView);
  }
  destroy() {
    if (this._appRef) this._appRef.detachView(this);
    else if (this._attachedToViewContainer) {
      let t = this._lView[ce];
      if (ot(t)) {
        let n = t[qi],
          r = n ? n.indexOf(this) : -1;
        r > -1 && (Br(t, r), $i(n, r));
      }
      this._attachedToViewContainer = !1;
    }
    Os(this._lView[b], this._lView);
  }
  onDestroy(t) {
    Uu(this._lView, t);
  }
  markForCheck() {
    Us(this._cdRefInjectingView || this._lView, 4);
  }
  markForRefresh() {
    ju(this._cdRefInjectingView || this._lView);
  }
  detach() {
    this._lView[T] &= -129;
  }
  reattach() {
    Oc(this._lView), (this._lView[T] |= 128);
  }
  detectChanges() {
    (this._lView[T] |= 1024), mm(this._lView, this.notifyErrorHandler);
  }
  checkNoChanges() {}
  attachToViewContainerRef() {
    if (this._appRef) throw new E(902, !1);
    this._attachedToViewContainer = !0;
  }
  detachFromAppRef() {
    this._appRef = null;
    let t = Zi(this._lView),
      n = this._lView[Wn];
    n !== null && !t && cl(n, this._lView), Bg(this._lView[b], this._lView);
  }
  attachToAppRef(t) {
    if (this._attachedToViewContainer) throw new E(902, !1);
    this._appRef = t;
    let n = Zi(this._lView),
      r = this._lView[Wn];
    r !== null && !n && $g(r, this._lView), Oc(this._lView);
  }
};
var k_ = new RegExp(`^(\\d+)*(${ig}|${og})*(.*)`);
function L_(e) {
  let t = e.match(k_),
    [n, r, o, i] = t,
    s = r ? parseInt(r, 10) : o,
    a = [];
  for (let [c, u, l] of i.matchAll(/(f|n)(\d*)/g)) {
    let d = parseInt(l, 10) || 1;
    a.push(u, d);
  }
  return [s, ...a];
}
function V_(e) {
  return !e.prev && e.parent?.type === 8;
}
function yc(e) {
  return e.index - Z;
}
function j_(e, t) {
  let n = e.i18nNodes;
  if (n) return n.get(t);
}
function Bs(e, t, n, r) {
  let o = yc(r),
    i = j_(e, o);
  if (i === void 0) {
    let s = e.data[pw];
    if (s?.[o]) i = B_(s[o], n);
    else if (t.firstChild === r) i = e.firstChild;
    else {
      let a = r.prev === null,
        c = r.prev ?? r.parent;
      if (V_(r)) {
        let u = yc(r.parent);
        i = Zc(e, u);
      } else {
        let u = Re(c, n);
        if (a) i = u.firstChild;
        else {
          let l = yc(c),
            d = Zc(e, l);
          if (c.type === 2 && d) {
            let f = rl(e, l) + 1;
            i = $s(f, d);
          } else i = u.nextSibling;
        }
      }
    }
  }
  return i;
}
function $s(e, t) {
  let n = t;
  for (let r = 0; r < e; r++) n = n.nextSibling;
  return n;
}
function U_(e, t) {
  let n = e;
  for (let r = 0; r < t.length; r += 2) {
    let o = t[r],
      i = t[r + 1];
    for (let s = 0; s < i; s++)
      switch (o) {
        case uw:
          n = n.firstChild;
          break;
        case lw:
          n = n.nextSibling;
          break;
      }
  }
  return n;
}
function B_(e, t) {
  let [n, ...r] = L_(e),
    o;
  if (n === og) o = t[Ae][Ne];
  else if (n === ig) o = CI(t[Ae][Ne]);
  else {
    let i = Number(n);
    o = We(t[i + Z]);
  }
  return U_(o, r);
}
var $_ = !1;
function H_(e) {
  $_ = e;
}
function z_(e) {
  let t = e[qe];
  if (t) {
    let { i18nNodes: n, dehydratedIcuData: r } = t;
    if (n && r) {
      let o = e[q];
      for (let i of r.values()) G_(o, n, i);
    }
    (t.i18nNodes = void 0), (t.dehydratedIcuData = void 0);
  }
}
function G_(e, t, n) {
  for (let r of n.node.cases[n.case]) {
    let o = t.get(r.index - Z);
    o && ll(e, o, !1);
  }
}
function Em(e) {
  let t = e[vt] ?? [],
    r = e[ce][q],
    o = [];
  for (let i of t) i.data[cg] !== void 0 ? o.push(i) : q_(i, r);
  e[vt] = o;
}
function q_(e, t) {
  let n = 0,
    r = e.firstChild;
  if (r) {
    let o = e.data[ns];
    for (; n < o; ) {
      let i = r.nextSibling;
      ll(t, r, !1), (r = i), n++;
    }
  }
}
function vl(e) {
  Em(e);
  let t = e[Ne];
  Ge(t) && is(t);
  for (let n = de; n < e.length; n++) is(e[n]);
}
function is(e) {
  z_(e);
  let t = e[b];
  for (let n = Z; n < t.bindingStartIndex; n++)
    if (ot(e[n])) {
      let r = e[n];
      vl(r);
    } else Ge(e[n]) && is(e[n]);
}
function Cm(e) {
  let t = e._views;
  for (let n of t) {
    let r = zw(n);
    r !== null && r[Ne] !== null && (Ge(r) ? is(r) : vl(r));
  }
}
function W_(e, t, n, r) {
  e !== null && (n.cleanup(t), vl(e.lContainer), Cm(r));
}
function Z_(e, t) {
  let n = [];
  for (let r of t)
    for (let o = 0; o < (r[sg] ?? 1); o++) {
      let i = { data: r, firstChild: null };
      r[ns] > 0 && ((i.firstChild = e), (e = $s(r[ns], e))), n.push(i);
    }
  return [e, n];
}
var wm = () => null;
function Y_(e, t) {
  let n = e[vt];
  return !t || n === null || n.length === 0
    ? null
    : n[0].data[hw] === t
    ? n.shift()
    : (Em(e), null);
}
function K_() {
  wm = Y_;
}
function $r(e, t) {
  return wm(e, t);
}
var au = class {},
  ss = class {},
  cu = class {
    resolveComponentFactory(t) {
      throw Error(`No component factory found for ${we(t)}.`);
    }
  },
  er = class {
    static NULL = new cu();
  },
  tr = class {},
  Qe = (() => {
    class e {
      destroyNode = null;
      static __NG_ELEMENT_ID__ = () => Q_();
    }
    return e;
  })();
function Q_() {
  let e = F(),
    t = me(),
    n = Ht(t.index, e);
  return (Ge(n) ? n : e)[q];
}
var X_ = (() => {
  class e {
    static ɵprov = C({ token: e, providedIn: "root", factory: () => null });
  }
  return e;
})();
function uu(e, t, n) {
  let r = n ? e.styles : null,
    o = n ? e.classes : null,
    i = 0;
  if (t !== null)
    for (let s = 0; s < t.length; s++) {
      let a = t[s];
      if (typeof a == "number") i = a;
      else if (i == 1) o = Bf(o, a);
      else if (i == 2) {
        let c = a,
          u = t[++s];
        r = Bf(r, c + ": " + u + ";");
      }
    }
  n ? (e.styles = r) : (e.stylesWithoutHost = r),
    n ? (e.classes = o) : (e.classesWithoutHost = o);
}
var as = class extends er {
  ngModule;
  constructor(t) {
    super(), (this.ngModule = t);
  }
  resolveComponentFactory(t) {
    let n = gt(t);
    return new nr(n, this.ngModule);
  }
};
function wh(e, t) {
  let n = [];
  for (let r in e) {
    if (!e.hasOwnProperty(r)) continue;
    let o = e[r];
    if (o === void 0) continue;
    let i = Array.isArray(o),
      s = i ? o[0] : o,
      a = i ? o[1] : jt.None;
    t
      ? n.push({
          propName: s,
          templateName: r,
          isSignal: (a & jt.SignalBased) !== 0,
        })
      : n.push({ propName: s, templateName: r });
  }
  return n;
}
function J_(e) {
  let t = e.toLowerCase();
  return t === "svg" ? gp : t === "math" ? rC : null;
}
var nr = class extends ss {
    componentDef;
    ngModule;
    selector;
    componentType;
    ngContentSelectors;
    isBoundToModule;
    get inputs() {
      let t = this.componentDef,
        n = t.inputTransforms,
        r = wh(t.inputs, !0);
      if (n !== null)
        for (let o of r)
          n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
      return r;
    }
    get outputs() {
      return wh(this.componentDef.outputs, !1);
    }
    constructor(t, n) {
      super(),
        (this.componentDef = t),
        (this.ngModule = n),
        (this.componentType = t.type),
        (this.selector = YI(t.selectors)),
        (this.ngContentSelectors = t.ngContentSelectors
          ? t.ngContentSelectors
          : []),
        (this.isBoundToModule = !!n);
    }
    create(t, n, r, o) {
      let i = O(null);
      try {
        o = o || this.ngModule;
        let s = o instanceof fe ? o : o?.injector;
        s &&
          this.componentDef.getStandaloneInjector !== null &&
          (s = this.componentDef.getStandaloneInjector(s) || s);
        let a = s ? new Hn(t, s) : t,
          c = a.get(tr, null);
        if (c === null) throw new E(407, !1);
        let u = a.get(X_, null),
          l = a.get(Qn, null),
          d = { rendererFactory: c, sanitizer: u, changeDetectionScheduler: l },
          h = c.createRenderer(null, this.componentDef),
          f = this.componentDef.selectors[0][0] || "div",
          g = r
            ? JI(h, r, this.componentDef.encapsulation, a)
            : al(h, f, J_(f)),
          m = 512;
        this.componentDef.signals
          ? (m |= 4096)
          : this.componentDef.onPush || (m |= 16);
        let D = null;
        g !== null && (D = nl(g, a, !0));
        let w = hl(0, null, null, 1, 0, null, null, null, null, null, null),
          B = Fs(null, w, null, m, null, null, d, h, a, null, D);
        Bu(B);
        let x,
          W,
          Y = null;
        try {
          let J = this.componentDef,
            lt,
            Na = null;
          J.findHostDirectiveDefs
            ? ((lt = []),
              (Na = new Map()),
              J.findHostDirectiveDefs(J, lt, Na),
              lt.push(J))
            : (lt = [J]);
          let oD = eb(B, g);
          (Y = tb(oD, g, J, lt, B, d, h)),
            (W = Zr(w, Z)),
            g && ob(h, J, g, r),
            n !== void 0 && ib(W, this.ngContentSelectors, n),
            (x = rb(Y, J, lt, Na, B, [sb])),
            gl(w, B, null);
        } catch (J) {
          throw (Y !== null && Gc(Y), Gc(B), J);
        } finally {
          $u();
        }
        return new lu(this.componentType, x, Yu(W, B), B, W);
      } finally {
        O(i);
      }
    }
  },
  lu = class extends au {
    location;
    _rootLView;
    _tNode;
    instance;
    hostView;
    changeDetectorRef;
    componentType;
    previousInputValues = null;
    constructor(t, n, r, o, i) {
      super(),
        (this.location = r),
        (this._rootLView = o),
        (this._tNode = i),
        (this.instance = n),
        (this.hostView = this.changeDetectorRef = new Jn(o, void 0, !1)),
        (this.componentType = t);
    }
    setInput(t, n) {
      let r = this._tNode.inputs,
        o;
      if (r !== null && (o = r[t])) {
        if (
          ((this.previousInputValues ??= new Map()),
          this.previousInputValues.has(t) &&
            Object.is(this.previousInputValues.get(t), n))
        )
          return;
        let i = this._rootLView;
        pl(i[b], i, o, t, n), this.previousInputValues.set(t, n);
        let s = Ht(this._tNode.index, i);
        Us(s, 1);
      }
    }
    get injector() {
      return new ln(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(t) {
      this.hostView.onDestroy(t);
    }
  };
function eb(e, t) {
  let n = e[b],
    r = Z;
  return (e[r] = t), ks(n, r, 2, "#host", null);
}
function tb(e, t, n, r, o, i, s) {
  let a = o[b];
  nb(r, e, t, s);
  let c = null;
  t !== null && (c = nl(t, o[je]));
  let u = i.rendererFactory.createRenderer(t, n),
    l = Fs(o, rm(n), null, um(n), o[e.index], e, i, u, null, null, c);
  return (
    a.firstCreatePass && iu(a, e, r.length - 1), Ls(o, l), (o[e.index] = l)
  );
}
function nb(e, t, n, r) {
  for (let o of e) t.mergedAttrs = Ur(t.mergedAttrs, o.hostAttrs);
  t.mergedAttrs !== null &&
    (uu(t, t.mergedAttrs, !0), n !== null && Zg(r, n, t));
}
function rb(e, t, n, r, o, i) {
  let s = me(),
    a = o[b],
    c = Re(s, o);
  am(a, o, s, n, null, r);
  for (let l = 0; l < n.length; l++) {
    let d = s.directiveStart + l,
      h = Kn(o, a, d, s);
    mn(h, o);
  }
  cm(a, o, s), c && mn(c, o);
  let u = Kn(o, a, s.directiveStart + s.componentOffset, s);
  if (((e[le] = o[le] = u), i !== null)) for (let l of i) l(u, t);
  return bg(a, s, o), u;
}
function ob(e, t, n, r) {
  if (r) kc(e, n, ["ng-version", "19.1.1"]);
  else {
    let { attrs: o, classes: i } = KI(t.selectors[0]);
    o && kc(e, n, o), i && i.length > 0 && Wg(e, n, i.join(" "));
  }
}
function ib(e, t, n) {
  let r = (e.projection = []);
  for (let o = 0; o < t.length; o++) {
    let i = n[o];
    r.push(i != null && i.length ? Array.from(i) : null);
  }
}
function sb() {
  let e = me();
  zu(F()[b], e);
}
var Hs = (() => {
  class e {
    static __NG_ELEMENT_ID__ = ab;
  }
  return e;
})();
function ab() {
  let e = me();
  return ub(e, F());
}
var cb = Hs,
  Im = class extends cb {
    _lContainer;
    _hostTNode;
    _hostLView;
    constructor(t, n, r) {
      super(),
        (this._lContainer = t),
        (this._hostTNode = n),
        (this._hostLView = r);
    }
    get element() {
      return Yu(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new ln(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let t = Gu(this._hostTNode, this._hostLView);
      if (Pp(t)) {
        let n = Ki(t, this._hostLView),
          r = Yi(t),
          o = n[b].data[r + 8];
        return new ln(o, n);
      } else return new ln(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(t) {
      let n = Ih(this._lContainer);
      return (n !== null && n[t]) || null;
    }
    get length() {
      return this._lContainer.length - de;
    }
    createEmbeddedView(t, n, r) {
      let o, i;
      typeof r == "number"
        ? (o = r)
        : r != null && ((o = r.index), (i = r.injector));
      let s = $r(this._lContainer, t.ssrId),
        a = t.createEmbeddedViewImpl(n || {}, i, s);
      return this.insertImpl(a, o, Xn(this._hostTNode, s)), a;
    }
    createComponent(t, n, r, o, i) {
      let s = t && !JE(t),
        a;
      if (s) a = n;
      else {
        let g = n || {};
        (a = g.index),
          (r = g.injector),
          (o = g.projectableNodes),
          (i = g.environmentInjector || g.ngModuleRef);
      }
      let c = s ? t : new nr(gt(t)),
        u = r || this.parentInjector;
      if (!i && c.ngModule == null) {
        let m = (s ? u : this.parentInjector).get(fe, null);
        m && (i = m);
      }
      let l = gt(c.componentType ?? {}),
        d = $r(this._lContainer, l?.id ?? null),
        h = d?.firstChild ?? null,
        f = c.create(u, o, h, i);
      return this.insertImpl(f.hostView, a, Xn(this._hostTNode, d)), f;
    }
    insert(t, n) {
      return this.insertImpl(t, n, !0);
    }
    insertImpl(t, n, r) {
      let o = t._lView;
      if (iC(o)) {
        let a = this.indexOf(t);
        if (a !== -1) this.detach(a);
        else {
          let c = o[ce],
            u = new Im(c, c[Ze], c[ce]);
          u.detach(u.indexOf(t));
        }
      }
      let i = this._adjustIndex(n),
        s = this._lContainer;
      return ro(s, o, i, r), t.attachToViewContainerRef(), Jh(Dc(s), i, t), t;
    }
    move(t, n) {
      return this.insert(t, n);
    }
    indexOf(t) {
      let n = Ih(this._lContainer);
      return n !== null ? n.indexOf(t) : -1;
    }
    remove(t) {
      let n = this._adjustIndex(t, -1),
        r = Br(this._lContainer, n);
      r && ($i(Dc(this._lContainer), n), Os(r[b], r));
    }
    detach(t) {
      let n = this._adjustIndex(t, -1),
        r = Br(this._lContainer, n);
      return r && $i(Dc(this._lContainer), n) != null ? new Jn(r) : null;
    }
    _adjustIndex(t, n = 0) {
      return t ?? this.length + n;
    }
  };
function Ih(e) {
  return e[qi];
}
function Dc(e) {
  return e[qi] || (e[qi] = []);
}
function ub(e, t) {
  let n,
    r = t[e.index];
  return (
    ot(r) ? (n = r) : ((n = dm(r, t, null, e)), (t[e.index] = n), Ls(t, n)),
    _m(n, t, e, r),
    new Im(n, e, t)
  );
}
function lb(e, t) {
  let n = e[q],
    r = n.createComment(""),
    o = Re(t, e),
    i = zg(n, o);
  return rs(n, i, r, xI(n, o), !1), r;
}
var _m = Mm,
  yl = () => !1;
function bm(e, t, n) {
  return yl(e, t, n);
}
function Mm(e, t, n, r) {
  if (e[yt]) return;
  let o;
  n.type & 8 ? (o = We(r)) : (o = lb(t, n)), (e[yt] = o);
}
function db(e, t, n) {
  if (e[yt] && e[vt]) return !0;
  let r = n[qe],
    o = t.index - Z;
  if (!r || nw(t) || to(r, o)) return !1;
  let s = Zc(r, o),
    a = r.data[Xu]?.[o],
    [c, u] = Z_(s, a);
  return (e[yt] = c), (e[vt] = u), !0;
}
function fb(e, t, n, r) {
  yl(e, n, t) || Mm(e, t, n, r);
}
function hb() {
  (_m = fb), (yl = db);
}
var Ut = class {},
  Hr = class {};
var du = class extends Ut {
    ngModuleType;
    _parent;
    _bootstrapComponents = [];
    _r3Injector;
    instance;
    destroyCbs = [];
    componentFactoryResolver = new as(this);
    constructor(t, n, r, o = !0) {
      super(), (this.ngModuleType = t), (this._parent = n);
      let i = np(t);
      (this._bootstrapComponents = Vg(i.bootstrap)),
        (this._r3Injector = Hp(
          t,
          n,
          [
            { provide: Ut, useValue: this },
            { provide: er, useValue: this.componentFactoryResolver },
            ...r,
          ],
          we(t),
          new Set(["environment"])
        )),
        o && this.resolveInjectorInitializers();
    }
    resolveInjectorInitializers() {
      this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(this.ngModuleType));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let t = this._r3Injector;
      !t.destroyed && t.destroy(),
        this.destroyCbs.forEach((n) => n()),
        (this.destroyCbs = null);
    }
    onDestroy(t) {
      this.destroyCbs.push(t);
    }
  },
  fu = class extends Hr {
    moduleType;
    constructor(t) {
      super(), (this.moduleType = t);
    }
    create(t) {
      return new du(this.moduleType, t, []);
    }
  };
var cs = class extends Ut {
  injector;
  componentFactoryResolver = new as(this);
  instance = null;
  constructor(t) {
    super();
    let n = new Vr(
      [
        ...t.providers,
        { provide: Ut, useValue: this },
        { provide: er, useValue: this.componentFactoryResolver },
      ],
      t.parent || ku(),
      t.debugName,
      new Set(["environment"])
    );
    (this.injector = n),
      t.runEnvironmentInitializers && n.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(t) {
    this.injector.onDestroy(t);
  }
};
function oo(e, t, n = null) {
  return new cs({
    providers: e,
    parent: t,
    debugName: n,
    runEnvironmentInitializers: !0,
  }).injector;
}
var pb = (() => {
  class e {
    _injector;
    cachedInjectors = new Map();
    constructor(n) {
      this._injector = n;
    }
    getOrCreateStandaloneInjector(n) {
      if (!n.standalone) return null;
      if (!this.cachedInjectors.has(n)) {
        let r = Pu(!1, n.type),
          o =
            r.length > 0
              ? oo([r], this._injector, `Standalone[${n.type.name}]`)
              : null;
        this.cachedInjectors.set(n, o);
      }
      return this.cachedInjectors.get(n);
    }
    ngOnDestroy() {
      try {
        for (let n of this.cachedInjectors.values()) n !== null && n.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
    static ɵprov = C({
      token: e,
      providedIn: "environment",
      factory: () => new e(I(fe)),
    });
  }
  return e;
})();
function Tm(e) {
  return Gr(() => {
    let t = Sm(e),
      n = L(v({}, t), {
        decls: e.decls,
        vars: e.vars,
        template: e.template,
        consts: e.consts || null,
        ngContentSelectors: e.ngContentSelectors,
        onPush: e.changeDetection === Xp.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (t.standalone && e.dependencies) || null,
        getStandaloneInjector: t.standalone
          ? (o) => o.get(pb).getOrCreateStandaloneInjector(n)
          : null,
        getExternalStyles: null,
        signals: e.signals ?? !1,
        data: e.data || {},
        encapsulation: e.encapsulation || tt.Emulated,
        styles: e.styles || Le,
        _: null,
        schemas: e.schemas || null,
        tView: null,
        id: "",
      });
    t.standalone && xe("NgStandalone"), Nm(n);
    let r = e.dependencies;
    return (
      (n.directiveDefs = bh(r, !1)), (n.pipeDefs = bh(r, !0)), (n.id = yb(n)), n
    );
  });
}
function gb(e) {
  return gt(e) || xu(e);
}
function mb(e) {
  return e !== null;
}
function _t(e) {
  return Gr(() => ({
    type: e.type,
    bootstrap: e.bootstrap || Le,
    declarations: e.declarations || Le,
    imports: e.imports || Le,
    exports: e.exports || Le,
    transitiveCompileScopes: null,
    schemas: e.schemas || null,
    id: e.id || null,
  }));
}
function _h(e, t) {
  if (e == null) return Gn;
  let n = {};
  for (let r in e)
    if (e.hasOwnProperty(r)) {
      let o = e[r],
        i,
        s,
        a = jt.None;
      Array.isArray(o)
        ? ((a = o[0]), (i = o[1]), (s = o[2] ?? i))
        : ((i = o), (s = o)),
        t ? ((n[i] = a !== jt.None ? [r, a] : r), (t[i] = s)) : (n[i] = r);
    }
  return n;
}
function ue(e) {
  return Gr(() => {
    let t = Sm(e);
    return Nm(t), t;
  });
}
function vb(e) {
  return {
    type: e.type,
    name: e.name,
    factory: null,
    pure: e.pure !== !1,
    standalone: e.standalone ?? !0,
    onDestroy: e.type.prototype.ngOnDestroy || null,
  };
}
function Sm(e) {
  let t = {};
  return {
    type: e.type,
    providersResolver: null,
    factory: null,
    hostBindings: e.hostBindings || null,
    hostVars: e.hostVars || 0,
    hostAttrs: e.hostAttrs || null,
    contentQueries: e.contentQueries || null,
    declaredInputs: t,
    inputTransforms: null,
    inputConfig: e.inputs || Gn,
    exportAs: e.exportAs || null,
    standalone: e.standalone ?? !0,
    signals: e.signals === !0,
    selectors: e.selectors || Le,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: _h(e.inputs, t),
    outputs: _h(e.outputs),
    debugInfo: null,
  };
}
function Nm(e) {
  e.features?.forEach((t) => t(e));
}
function bh(e, t) {
  if (!e) return null;
  let n = t ? Ou : gb;
  return () => (typeof e == "function" ? e() : e).map((r) => n(r)).filter(mb);
}
function yb(e) {
  let t = 0,
    n = typeof e.consts == "function" ? "" : e.consts,
    r = [
      e.selectors,
      e.ngContentSelectors,
      e.hostVars,
      e.hostAttrs,
      n,
      e.vars,
      e.decls,
      e.encapsulation,
      e.standalone,
      e.signals,
      e.exportAs,
      JSON.stringify(e.inputs),
      JSON.stringify(e.outputs),
      Object.getOwnPropertyNames(e.type.prototype),
      !!e.contentQueries,
      !!e.viewQuery,
    ];
  for (let i of r.join("|")) t = (Math.imul(31, t) + i.charCodeAt(0)) << 0;
  return (t += 2147483648), "c" + t;
}
function Db(e) {
  return Object.getPrototypeOf(e.prototype).constructor;
}
function bt(e) {
  let t = Db(e.type),
    n = !0,
    r = [e];
  for (; t; ) {
    let o;
    if (Vt(e)) o = t.ɵcmp || t.ɵdir;
    else {
      if (t.ɵcmp) throw new E(903, !1);
      o = t.ɵdir;
    }
    if (o) {
      if (n) {
        r.push(o);
        let s = e;
        (s.inputs = Ai(e.inputs)),
          (s.inputTransforms = Ai(e.inputTransforms)),
          (s.declaredInputs = Ai(e.declaredInputs)),
          (s.outputs = Ai(e.outputs));
        let a = o.hostBindings;
        a && _b(e, a);
        let c = o.viewQuery,
          u = o.contentQueries;
        if (
          (c && wb(e, c),
          u && Ib(e, u),
          Eb(e, o),
          DE(e.outputs, o.outputs),
          Vt(o) && o.data.animation)
        ) {
          let l = e.data;
          l.animation = (l.animation || []).concat(o.data.animation);
        }
      }
      let i = o.features;
      if (i)
        for (let s = 0; s < i.length; s++) {
          let a = i[s];
          a && a.ngInherit && a(e), a === bt && (n = !1);
        }
    }
    t = Object.getPrototypeOf(t);
  }
  Cb(r);
}
function Eb(e, t) {
  for (let n in t.inputs) {
    if (!t.inputs.hasOwnProperty(n) || e.inputs.hasOwnProperty(n)) continue;
    let r = t.inputs[n];
    if (
      r !== void 0 &&
      ((e.inputs[n] = r),
      (e.declaredInputs[n] = t.declaredInputs[n]),
      t.inputTransforms !== null)
    ) {
      let o = Array.isArray(r) ? r[0] : r;
      if (!t.inputTransforms.hasOwnProperty(o)) continue;
      (e.inputTransforms ??= {}), (e.inputTransforms[o] = t.inputTransforms[o]);
    }
  }
}
function Cb(e) {
  let t = 0,
    n = null;
  for (let r = e.length - 1; r >= 0; r--) {
    let o = e[r];
    (o.hostVars = t += o.hostVars),
      (o.hostAttrs = Ur(o.hostAttrs, (n = Ur(n, o.hostAttrs))));
  }
}
function Ai(e) {
  return e === Gn ? {} : e === Le ? [] : e;
}
function wb(e, t) {
  let n = e.viewQuery;
  n
    ? (e.viewQuery = (r, o) => {
        t(r, o), n(r, o);
      })
    : (e.viewQuery = t);
}
function Ib(e, t) {
  let n = e.contentQueries;
  n
    ? (e.contentQueries = (r, o, i) => {
        t(r, o, i), n(r, o, i);
      })
    : (e.contentQueries = t);
}
function _b(e, t) {
  let n = e.hostBindings;
  n
    ? (e.hostBindings = (r, o) => {
        t(r, o), n(r, o);
      })
    : (e.hostBindings = t);
}
function Dl(e) {
  let t = e.inputConfig,
    n = {};
  for (let r in t)
    if (t.hasOwnProperty(r)) {
      let o = t[r];
      Array.isArray(o) && o[3] && (n[r] = o[3]);
    }
  e.inputTransforms = n;
}
function Am(e) {
  return e !== null && (typeof e == "function" || typeof e == "object");
}
function zs(e, t, n) {
  return (e[t] = n);
}
function Rm(e, t) {
  return e[t];
}
function rt(e, t, n) {
  let r = e[t];
  return Object.is(r, n) ? !1 : ((e[t] = n), !0);
}
function us(e, t, n, r) {
  let o = rt(e, t, n);
  return rt(e, t + 1, r) || o;
}
function bb(e, t, n, r, o, i) {
  let s = us(e, t, n, r);
  return us(e, t + 2, o, i) || s;
}
function io(e) {
  return (e.flags & 32) === 32;
}
function Mb(e, t, n, r, o, i, s, a, c) {
  let u = t.consts,
    l = ks(t, e, 4, s || null, a || null);
  sm(t, n, l, Yn(u, c)), zu(t, l);
  let d = (l.tView = hl(
    2,
    l,
    r,
    o,
    i,
    t.directiveRegistry,
    t.pipeRegistry,
    null,
    t.schemas,
    u,
    null
  ));
  return (
    t.queries !== null &&
      (t.queries.template(t, l), (d.queries = t.queries.embeddedTView(l))),
    l
  );
}
function ls(e, t, n, r, o, i, s, a, c, u) {
  let l = n + Z,
    d = t.firstCreatePass ? Mb(l, t, e, r, o, i, s, a, c) : t.data[l];
  Kr(d, !1);
  let h = xm(t, e, d, n);
  Hu() && ul(t, e, h, d), mn(h, e);
  let f = dm(h, e, h, d);
  return (
    (e[l] = f),
    Ls(e, f),
    bm(f, d, e),
    Lu(d) && tm(t, e, d),
    c != null && nm(e, d, u),
    d
  );
}
function Tb(e, t, n, r, o, i, s, a) {
  let c = F(),
    u = ge(),
    l = Yn(u.consts, i);
  return ls(c, u, e, t, n, r, o, l, s, a), Tb;
}
var xm = Om;
function Om(e, t, n, r) {
  return Gt(!0), t[q].createComment("");
}
function Sb(e, t, n, r) {
  let o = t[qe],
    i = !o || Yr() || io(n) || to(o, r);
  if ((Gt(i), i)) return Om(e, t, n, r);
  let s = o.data[fw]?.[r] ?? null;
  s !== null &&
    n.tView !== null &&
    n.tView.ssrId === null &&
    (n.tView.ssrId = s);
  let a = Bs(o, e, t, n);
  As(o, r, a);
  let c = rl(o, r);
  return $s(c, a);
}
function Nb() {
  xm = Sb;
}
function Ab(e, t) {
  let n = t.get(Ob),
    r = () => n.remove(e);
  return n.add(e), r;
}
var Rb = () =>
    typeof requestIdleCallback < "u" ? requestIdleCallback : setTimeout,
  xb = () =>
    typeof requestIdleCallback < "u" ? cancelIdleCallback : clearTimeout,
  Ob = (() => {
    class e {
      executingCallbacks = !1;
      idleId = null;
      current = new Set();
      deferred = new Set();
      ngZone = p(G);
      requestIdleCallbackFn = Rb().bind(globalThis);
      cancelIdleCallbackFn = xb().bind(globalThis);
      add(n) {
        (this.executingCallbacks ? this.deferred : this.current).add(n),
          this.idleId === null && this.scheduleIdleCallback();
      }
      remove(n) {
        let { current: r, deferred: o } = this;
        r.delete(n),
          o.delete(n),
          r.size === 0 && o.size === 0 && this.cancelIdleCallback();
      }
      scheduleIdleCallback() {
        let n = () => {
          this.cancelIdleCallback(), (this.executingCallbacks = !0);
          for (let r of this.current) r();
          if (
            (this.current.clear(),
            (this.executingCallbacks = !1),
            this.deferred.size > 0)
          ) {
            for (let r of this.deferred) this.current.add(r);
            this.deferred.clear(), this.scheduleIdleCallback();
          }
        };
        this.idleId = this.requestIdleCallbackFn(() => this.ngZone.run(n));
      }
      cancelIdleCallback() {
        this.idleId !== null &&
          (this.cancelIdleCallbackFn(this.idleId), (this.idleId = null));
      }
      ngOnDestroy() {
        this.cancelIdleCallback(), this.current.clear(), this.deferred.clear();
      }
      static ɵprov = C({
        token: e,
        providedIn: "root",
        factory: () => new e(),
      });
    }
    return e;
  })();
var Pb = (() => {
  class e {
    cachedInjectors = new Map();
    getOrCreateInjector(n, r, o, i) {
      if (!this.cachedInjectors.has(n)) {
        let s = o.length > 0 ? oo(o, r, i) : null;
        this.cachedInjectors.set(n, s);
      }
      return this.cachedInjectors.get(n);
    }
    ngOnDestroy() {
      try {
        for (let n of this.cachedInjectors.values()) n !== null && n.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
    static ɵprov = C({
      token: e,
      providedIn: "environment",
      factory: () => new e(),
    });
  }
  return e;
})();
var Fb = new y("");
function Ec(e, t, n) {
  return e.get(Pb).getOrCreateInjector(t, e, n, "");
}
function kb(e, t, n) {
  if (e instanceof Hn) {
    let o = e.injector,
      i = e.parentInjector,
      s = Ec(i, t, n);
    return new Hn(o, s);
  }
  let r = e.get(fe);
  if (r !== e) {
    let o = Ec(r, t, n);
    return new Hn(e, o);
  }
  return Ec(e, t, n);
}
function un(e, t, n, r = !1) {
  let o = n[ce],
    i = o[b];
  if (ir(o)) return;
  let s = ur(o, t),
    a = s[el],
    c = s[Tw];
  if (!(c !== null && e < c) && Mh(a, e) && Mh(s[Iw] ?? -1, e)) {
    let u = eo(i, t),
      d =
        !r &&
        !0 &&
        (xw(u) !== null || uh(u, re.Loading) !== null || uh(u, re.Placeholder))
          ? Ub
          : Vb;
    try {
      d(e, s, n, t, o);
    } catch (h) {
      Vs(o, h);
    }
  }
}
function Lb(e, t) {
  return e[vt]?.find((n) => n.data[ug] === t[el]) ?? null;
}
function Vb(e, t, n, r, o) {
  let i = Rw(e, o, r);
  if (i !== null) {
    t[el] = e;
    let s = o[b],
      a = i + Z,
      c = Zr(s, a),
      u = 0;
    ml(n, u);
    let l;
    if (e === re.Complete) {
      let f = eo(s, r),
        g = f.providers;
      g && g.length > 0 && (l = kb(o[je], f, g));
    }
    let d = Lb(n, t);
    n[vt] = null;
    let h = js(o, c, null, { injector: l, dehydratedView: d });
    if (
      (ro(n, h, u, Xn(c, d)),
      Us(h, 2),
      (e === re.Complete || e === re.Error) && Array.isArray(t[zn]))
    ) {
      for (let f of t[zn]) f();
      t[zn] = null;
    }
  }
}
function Mh(e, t) {
  return e < t;
}
function jb(e, t) {
  let n = e[t.index];
  un(re.Placeholder, t, n);
}
function Th(e, t, n) {
  e.loadingPromise.then(() => {
    e.loadingState === Ce.COMPLETE
      ? un(re.Complete, t, n)
      : e.loadingState === Ce.FAILED && un(re.Error, t, n);
  });
}
var Ub = null;
var El = (() => {
  class e {
    log(n) {
      console.log(n);
    }
    warn(n) {
      console.warn(n);
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "platform" });
  }
  return e;
})();
var Pm = new y("");
function Dn(e) {
  return !!e && typeof e.then == "function";
}
function Fm(e) {
  return !!e && typeof e.subscribe == "function";
}
var Gs = new y("");
var km = (() => {
    class e {
      resolve;
      reject;
      initialized = !1;
      done = !1;
      donePromise = new Promise((n, r) => {
        (this.resolve = n), (this.reject = r);
      });
      appInits = p(Gs, { optional: !0 }) ?? [];
      injector = p(he);
      constructor() {}
      runInitializers() {
        if (this.initialized) return;
        let n = [];
        for (let o of this.appInits) {
          let i = _e(this.injector, o);
          if (Dn(i)) n.push(i);
          else if (Fm(i)) {
            let s = new Promise((a, c) => {
              i.subscribe({ complete: a, error: c });
            });
            n.push(s);
          }
        }
        let r = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(n)
          .then(() => {
            r();
          })
          .catch((o) => {
            this.reject(o);
          }),
          n.length === 0 && r(),
          (this.initialized = !0);
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  Bb = (() => {
    class e {
      static ɵprov = C({
        token: e,
        providedIn: "root",
        factory: () => new hu(),
      });
    }
    return e;
  })(),
  hu = class {
    queuedEffectCount = 0;
    queues = new Map();
    schedule(t) {
      this.enqueue(t);
    }
    remove(t) {
      let n = t.zone,
        r = this.queues.get(n);
      r.has(t) && (r.delete(t), this.queuedEffectCount--);
    }
    enqueue(t) {
      let n = t.zone;
      this.queues.has(n) || this.queues.set(n, new Set());
      let r = this.queues.get(n);
      r.has(t) || (this.queuedEffectCount++, r.add(t));
    }
    flush() {
      for (; this.queuedEffectCount > 0; )
        for (let [t, n] of this.queues)
          t === null ? this.flushQueue(n) : t.run(() => this.flushQueue(n));
    }
    flushQueue(t) {
      for (let n of t) t.delete(n), this.queuedEffectCount--, n.run();
    }
  },
  Wt = new y("");
function $b() {
  Zd(() => {
    throw new E(600, !1);
  });
}
function Hb(e) {
  return e.isBoundToModule;
}
var zb = 10;
function Gb(e, t, n) {
  try {
    let r = n();
    return Dn(r)
      ? r.catch((o) => {
          throw (t.runOutsideAngular(() => e.handleError(o)), o);
        })
      : r;
  } catch (r) {
    throw (t.runOutsideAngular(() => e.handleError(r)), r);
  }
}
var Ie = (() => {
  class e {
    _runningTick = !1;
    _destroyed = !1;
    _destroyListeners = [];
    _views = [];
    internalErrorHandler = p(KC);
    afterRenderManager = p(hg);
    zonelessEnabled = p(bs);
    rootEffectScheduler = p(Bb);
    dirtyFlags = 0;
    deferredDirtyFlags = 0;
    tracingSnapshot = null;
    externalTestViews = new Set();
    afterTick = new te();
    get allViews() {
      return [...this.externalTestViews.keys(), ...this._views];
    }
    get destroyed() {
      return this._destroyed;
    }
    componentTypes = [];
    components = [];
    isStable = p(it).hasPendingTasks.pipe(N((n) => !n));
    constructor() {
      p(cr, { optional: !0 });
    }
    whenStable() {
      let n;
      return new Promise((r) => {
        n = this.isStable.subscribe({
          next: (o) => {
            o && r();
          },
        });
      }).finally(() => {
        n.unsubscribe();
      });
    }
    _injector = p(fe);
    _rendererFactory = null;
    get injector() {
      return this._injector;
    }
    bootstrap(n, r) {
      let o = n instanceof ss;
      if (!this._injector.get(km).done) {
        let h = !o && rp(n),
          f = !1;
        throw new E(405, f);
      }
      let s;
      o ? (s = n) : (s = this._injector.get(er).resolveComponentFactory(n)),
        this.componentTypes.push(s.componentType);
      let a = Hb(s) ? void 0 : this._injector.get(Ut),
        c = r || s.selector,
        u = s.create(he.NULL, [], c, a),
        l = u.location.nativeElement,
        d = u.injector.get(Pm, null);
      return (
        d?.registerApplication(l),
        u.onDestroy(() => {
          this.detachView(u.hostView),
            Li(this.components, u),
            d?.unregisterApplication(l);
        }),
        this._loadComponent(u),
        u
      );
    }
    tick() {
      this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick();
    }
    _tick = () => {
      if (this.tracingSnapshot !== null) {
        let r = this.tracingSnapshot;
        (this.tracingSnapshot = null),
          r.run(Ju.CHANGE_DETECTION, this._tick),
          r.dispose();
        return;
      }
      if (this._runningTick) throw new E(101, !1);
      let n = O(null);
      try {
        (this._runningTick = !0), this.synchronize();
      } catch (r) {
        this.internalErrorHandler(r);
      } finally {
        (this._runningTick = !1), O(n), this.afterTick.next();
      }
    };
    synchronize() {
      this._rendererFactory === null &&
        !this._injector.destroyed &&
        (this._rendererFactory = this._injector.get(tr, null, {
          optional: !0,
        })),
        (this.dirtyFlags |= this.deferredDirtyFlags),
        (this.deferredDirtyFlags = 0);
      let n = 0;
      for (; this.dirtyFlags !== 0 && n++ < zb; ) this.synchronizeOnce();
    }
    synchronizeOnce() {
      if (
        ((this.dirtyFlags |= this.deferredDirtyFlags),
        (this.deferredDirtyFlags = 0),
        this.dirtyFlags & 16 &&
          ((this.dirtyFlags &= -17), this.rootEffectScheduler.flush()),
        this.dirtyFlags & 7)
      ) {
        let n = !!(this.dirtyFlags & 1);
        (this.dirtyFlags &= -8), (this.dirtyFlags |= 8);
        for (let { _lView: r, notifyErrorHandler: o } of this.allViews)
          qb(r, o, n, this.zonelessEnabled);
        if (
          ((this.dirtyFlags &= -5),
          this.syncDirtyFlagsWithViews(),
          this.dirtyFlags & 23)
        )
          return;
      } else this._rendererFactory?.begin?.(), this._rendererFactory?.end?.();
      this.dirtyFlags & 8 &&
        ((this.dirtyFlags &= -9), this.afterRenderManager.execute()),
        this.syncDirtyFlagsWithViews();
    }
    syncDirtyFlagsWithViews() {
      if (this.allViews.some(({ _lView: n }) => Cs(n))) {
        this.dirtyFlags |= 2;
        return;
      } else this.dirtyFlags &= -8;
    }
    attachView(n) {
      let r = n;
      this._views.push(r), r.attachToAppRef(this);
    }
    detachView(n) {
      let r = n;
      Li(this._views, r), r.detachFromAppRef();
    }
    _loadComponent(n) {
      this.attachView(n.hostView),
        this.tick(),
        this.components.push(n),
        this._injector.get(Wt, []).forEach((o) => o(n));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach((n) => n()),
            this._views.slice().forEach((n) => n.destroy());
        } finally {
          (this._destroyed = !0),
            (this._views = []),
            (this._destroyListeners = []);
        }
    }
    onDestroy(n) {
      return (
        this._destroyListeners.push(n), () => Li(this._destroyListeners, n)
      );
    }
    destroy() {
      if (this._destroyed) throw new E(406, !1);
      let n = this._injector;
      n.destroy && !n.destroyed && n.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
  }
  return e;
})();
function Li(e, t) {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
function qb(e, t, n, r) {
  if (!n && !Cs(e)) return;
  mm(e, t, n && !r ? 0 : 1);
}
function Wb(e) {
  let t = F(),
    n = me();
  if ((jb(t, n), !Lm(0, t))) return;
  let r = t[je],
    o = ur(t, n),
    i = e(() => Vm(0, t, n), r);
  mg(0, o, i);
}
function Zb(e, t, n) {
  let r = t[je],
    o = t[b];
  if (e.loadingState !== Ce.NOT_STARTED)
    return e.loadingPromise ?? Promise.resolve();
  let i = ur(t, n),
    s = Ow(o, e);
  (e.loadingState = Ce.IN_PROGRESS), ki(1, i);
  let a = e.dependencyResolverFn,
    c = r.get(it),
    u = c.add();
  return a
    ? ((e.loadingPromise = Promise.allSettled(a()).then((l) => {
        let d = !1,
          h = [],
          f = [];
        for (let g of l)
          if (g.status === "fulfilled") {
            let m = g.value,
              D = gt(m) || xu(m);
            if (D) h.push(D);
            else {
              let w = Ou(m);
              w && f.push(w);
            }
          } else {
            d = !0;
            break;
          }
        if (((e.loadingPromise = null), c.remove(u), d)) {
          if (((e.loadingState = Ce.FAILED), e.errorTmplIndex === null)) {
            let g = "",
              m = new E(-750, !1);
            Vs(t, m);
          }
        } else {
          e.loadingState = Ce.COMPLETE;
          let g = s.tView;
          if (h.length > 0) {
            g.directiveRegistry = lh(g.directiveRegistry, h);
            let m = h.map((w) => w.type),
              D = Pu(!1, ...m);
            e.providers = D;
          }
          f.length > 0 && (g.pipeRegistry = lh(g.pipeRegistry, f));
        }
      })),
      e.loadingPromise)
    : ((e.loadingPromise = Promise.resolve().then(() => {
        (e.loadingPromise = null), (e.loadingState = Ce.COMPLETE), c.remove(u);
      })),
      e.loadingPromise);
}
function Lm(e, t) {
  return t[je].get(Fb, null, { optional: !0 })?.behavior !== gg.Manual;
}
function Vm(e, t, n) {
  let r = t[b],
    o = t[n.index];
  if (!Lm(e, t)) return;
  let i = ur(t, n),
    s = eo(r, n);
  switch ((vg(i), s.loadingState)) {
    case Ce.NOT_STARTED:
      un(re.Loading, n, o),
        Zb(s, t, n),
        s.loadingState === Ce.IN_PROGRESS && Th(s, n, o);
      break;
    case Ce.IN_PROGRESS:
      un(re.Loading, n, o), Th(s, n, o);
      break;
    case Ce.COMPLETE:
      un(re.Complete, n, o);
      break;
    case Ce.FAILED:
      un(re.Error, n, o);
      break;
    default:
  }
}
function Yb(e, t, n) {
  return nn(this, null, function* () {
    let r = e.get(tl),
      o = r.hydrating;
    if (o.has(t)) return;
    let { parentBlockPromise: i, hydrationQueue: s } = Yw(t, e);
    Kb(r, s);
    let a = e.get(it),
      c = a.add();
    i !== null && (yield i);
    for (let u of s) yield Xb(u, r), yield Qb(e), o.get(u).resolve();
    yield o.get(t)?.promise,
      a.remove(c),
      n && n(s),
      W_(r.get(t), s, r, e.get(Ie));
  });
}
function Kb(e, t) {
  for (let n of t) e.hydrating.set(n, Promise.withResolvers());
}
function Qb(e) {
  return new Promise((t) => Ts(t, { injector: e }));
}
function Xb(e, t) {
  return nn(this, null, function* () {
    let n = t.get(e);
    if (n === null) return;
    let { tNode: r, lView: o } = n,
      i = ur(o, r);
    return new Promise((s) => {
      Jb(i, s), Vm(2, o, r);
    });
  });
}
function Jb(e, t) {
  Array.isArray(e[zn]) || (e[zn] = []), e[zn].push(t);
}
function eM(e, t, n) {
  return e === 0 ? Sh(t, n) : e === 2 ? !Sh(t, n) : !0;
}
function Sh(e, t) {
  let n = e[je],
    r = eo(e[b], t),
    o = wg(n),
    i = r.flags !== null && (r.flags & 1) === 1,
    a = ur(e, t)[Mw] !== null;
  return !(i && a && o);
}
function sk(e, t, n, r, o, i, s, a, c, u) {
  let l = F(),
    d = ge(),
    h = e + Z,
    f = ls(l, d, e, null, 0, 0),
    g = l[je];
  if (d.firstCreatePass) {
    xe("NgDefer");
    let Y = {
      primaryTmplIndex: t,
      loadingTmplIndex: r ?? null,
      placeholderTmplIndex: o ?? null,
      errorTmplIndex: i ?? null,
      placeholderBlockConfig: null,
      loadingBlockConfig: null,
      dependencyResolverFn: n ?? null,
      loadingState: Ce.NOT_STARTED,
      loadingPromise: null,
      providers: null,
      hydrateTriggers: null,
      debug: null,
      flags: u ?? 0,
    };
    c?.(d, Y, a, s), Aw(d, h, Y);
  }
  let m = l[h];
  bm(m, f, l);
  let D = null,
    w = null;
  if (m[vt]?.length > 0) {
    let Y = m[vt][0].data;
    (w = Y[cg] ?? null), (D = Y[ug]);
  }
  let B = [null, pg.Initial, null, null, null, null, w, D, null, null];
  Nw(l, h, B);
  let x = null;
  w !== null &&
    ((x = g.get(tl)), x.add(w, { lView: l, tNode: f, lContainer: m }));
  let W = () => {
    vg(B), w !== null && x?.cleanup([w]);
  };
  mg(0, B, () => yp(l, W)), Uu(l, W);
}
function ak() {
  let e = F(),
    t = me();
  eM(0, e, t) && Wb(Ab);
}
function qs(e, t, n, r) {
  let o = F(),
    i = Xr();
  if (rt(o, i, t)) {
    let s = ge(),
      a = Is();
    lm(a, o, e, t, n, r);
  }
  return qs;
}
function Cl(e, t, n, r) {
  return rt(e, Xr(), n) ? t + dn(n) + r : Oe;
}
function tM(e, t, n, r, o, i) {
  let s = vC(),
    a = us(e, s, n, o);
  return Ip(2), a ? t + dn(n) + r + dn(o) + i : Oe;
}
function nM(e, t, n, r, o, i) {
  let s = F(),
    a = Cl(s, t, n, r);
  if (a !== Oe) {
    let c = Is();
    lm(c, s, e, a, o, i);
  }
  return nM;
}
function Ri(e, t) {
  return (e << 17) | (t << 2);
}
function vn(e) {
  return (e >> 17) & 32767;
}
function rM(e) {
  return (e & 2) == 2;
}
function oM(e, t) {
  return (e & 131071) | (t << 17);
}
function pu(e) {
  return e | 2;
}
function rr(e) {
  return (e & 131068) >> 2;
}
function Cc(e, t) {
  return (e & -131069) | (t << 2);
}
function iM(e) {
  return (e & 1) === 1;
}
function gu(e) {
  return e | 1;
}
function sM(e, t, n, r, o, i) {
  let s = i ? t.classBindings : t.styleBindings,
    a = vn(s),
    c = rr(s);
  e[r] = n;
  let u = !1,
    l;
  if (Array.isArray(n)) {
    let d = n;
    (l = d[1]), (l === null || qr(d, l) > 0) && (u = !0);
  } else l = n;
  if (o)
    if (c !== 0) {
      let h = vn(e[a + 1]);
      (e[r + 1] = Ri(h, a)),
        h !== 0 && (e[h + 1] = Cc(e[h + 1], r)),
        (e[a + 1] = oM(e[a + 1], r));
    } else
      (e[r + 1] = Ri(a, 0)), a !== 0 && (e[a + 1] = Cc(e[a + 1], r)), (a = r);
  else
    (e[r + 1] = Ri(c, 0)),
      a === 0 ? (a = r) : (e[c + 1] = Cc(e[c + 1], r)),
      (c = r);
  u && (e[r + 1] = pu(e[r + 1])),
    Nh(e, l, r, !0),
    Nh(e, l, r, !1),
    aM(t, l, e, r, i),
    (s = Ri(a, c)),
    i ? (t.classBindings = s) : (t.styleBindings = s);
}
function aM(e, t, n, r, o) {
  let i = o ? e.residualClasses : e.residualStyles;
  i != null &&
    typeof t == "string" &&
    qr(i, t) >= 0 &&
    (n[r + 1] = gu(n[r + 1]));
}
function Nh(e, t, n, r) {
  let o = e[n + 1],
    i = t === null,
    s = r ? vn(o) : rr(o),
    a = !1;
  for (; s !== 0 && (a === !1 || i); ) {
    let c = e[s],
      u = e[s + 1];
    cM(c, t) && ((a = !0), (e[s + 1] = r ? gu(u) : pu(u))),
      (s = r ? vn(u) : rr(u));
  }
  a && (e[n + 1] = r ? pu(o) : gu(o));
}
function cM(e, t) {
  return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t
    ? !0
    : Array.isArray(e) && typeof t == "string"
    ? qr(e, t) >= 0
    : !1;
}
function uM(e, t, n) {
  let r = F(),
    o = Xr();
  if (rt(r, o, t)) {
    let i = ge(),
      s = Is();
    im(i, s, r, e, t, r[q], n, !1);
  }
  return uM;
}
function Ah(e, t, n, r, o) {
  let i = t.inputs,
    s = o ? "class" : "style";
  pl(e, n, i[s], s, r);
}
function jm(e, t, n) {
  return Um(e, t, n, !1), jm;
}
function wl(e, t) {
  return Um(e, t, null, !0), wl;
}
function Um(e, t, n, r) {
  let o = F(),
    i = ge(),
    s = Ip(2);
  if ((i.firstUpdatePass && dM(i, e, s, r), t !== Oe && rt(o, s, t))) {
    let a = i.data[zt()];
    mM(i, a, o, o[q], e, (o[s + 1] = vM(t, n)), r, s);
  }
}
function lM(e, t) {
  return t >= e.expandoStartIndex;
}
function dM(e, t, n, r) {
  let o = e.data;
  if (o[n + 1] === null) {
    let i = o[zt()],
      s = lM(e, n);
    yM(i, r) && t === null && !s && (t = !1),
      (t = fM(o, i, t, r)),
      sM(o, i, t, n, s, r);
  }
}
function fM(e, t, n, r) {
  let o = wC(e),
    i = r ? t.residualClasses : t.residualStyles;
  if (o === null)
    (r ? t.classBindings : t.styleBindings) === 0 &&
      ((n = wc(null, e, t, n, r)), (n = zr(n, t.attrs, r)), (i = null));
  else {
    let s = t.directiveStylingLast;
    if (s === -1 || e[s] !== o)
      if (((n = wc(o, e, t, n, r)), i === null)) {
        let c = hM(e, t, r);
        c !== void 0 &&
          Array.isArray(c) &&
          ((c = wc(null, e, t, c[1], r)),
          (c = zr(c, t.attrs, r)),
          pM(e, t, r, c));
      } else i = gM(e, t, r);
  }
  return (
    i !== void 0 && (r ? (t.residualClasses = i) : (t.residualStyles = i)), n
  );
}
function hM(e, t, n) {
  let r = n ? t.classBindings : t.styleBindings;
  if (rr(r) !== 0) return e[vn(r)];
}
function pM(e, t, n, r) {
  let o = n ? t.classBindings : t.styleBindings;
  e[vn(o)] = r;
}
function gM(e, t, n) {
  let r,
    o = t.directiveEnd;
  for (let i = 1 + t.directiveStylingLast; i < o; i++) {
    let s = e[i].hostAttrs;
    r = zr(r, s, n);
  }
  return zr(r, t.attrs, n);
}
function wc(e, t, n, r, o) {
  let i = null,
    s = n.directiveEnd,
    a = n.directiveStylingLast;
  for (
    a === -1 ? (a = n.directiveStart) : a++;
    a < s && ((i = t[a]), (r = zr(r, i.hostAttrs, o)), i !== e);

  )
    a++;
  return e !== null && (n.directiveStylingLast = a), r;
}
function zr(e, t, n) {
  let r = n ? 1 : 2,
    o = -1;
  if (t !== null)
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      typeof s == "number"
        ? (o = s)
        : o === r &&
          (Array.isArray(e) || (e = e === void 0 ? [] : ["", e]),
          jE(e, s, n ? !0 : t[++i]));
    }
  return e === void 0 ? null : e;
}
function mM(e, t, n, r, o, i, s, a) {
  if (!(t.type & 3)) return;
  let c = e.data,
    u = c[a + 1],
    l = iM(u) ? Rh(c, t, n, o, rr(u), s) : void 0;
  if (!ds(l)) {
    ds(i) || (rM(u) && (i = Rh(c, null, n, o, a, s)));
    let d = mp(zt(), n);
    VI(r, s, d, o, i);
  }
}
function Rh(e, t, n, r, o, i) {
  let s = t === null,
    a;
  for (; o > 0; ) {
    let c = e[o],
      u = Array.isArray(c),
      l = u ? c[1] : c,
      d = l === null,
      h = n[o + 1];
    h === Oe && (h = d ? Le : void 0);
    let f = d ? lc(h, r) : l === r ? h : void 0;
    if ((u && !ds(f) && (f = lc(c, r)), ds(f) && ((a = f), s))) return a;
    let g = e[o + 1];
    o = s ? vn(g) : rr(g);
  }
  if (t !== null) {
    let c = i ? t.residualClasses : t.residualStyles;
    c != null && (a = lc(c, r));
  }
  return a;
}
function ds(e) {
  return e !== void 0;
}
function vM(e, t) {
  return (
    e == null ||
      e === "" ||
      (typeof t == "string"
        ? (e = e + t)
        : typeof e == "object" && (e = we(Ye(e)))),
    e
  );
}
function yM(e, t) {
  return (e.flags & (t ? 8 : 16)) !== 0;
}
var mu = class {
  destroy(t) {}
  updateValue(t, n) {}
  swap(t, n) {
    let r = Math.min(t, n),
      o = Math.max(t, n),
      i = this.detach(o);
    if (o - r > 1) {
      let s = this.detach(r);
      this.attach(r, i), this.attach(o, s);
    } else this.attach(r, i);
  }
  move(t, n) {
    this.attach(n, this.detach(t));
  }
};
function Ic(e, t, n, r, o) {
  return e === n && Object.is(t, r) ? 1 : Object.is(o(e, t), o(n, r)) ? -1 : 0;
}
function DM(e, t, n) {
  let r,
    o,
    i = 0,
    s = e.length - 1,
    a = void 0;
  if (Array.isArray(t)) {
    let c = t.length - 1;
    for (; i <= s && i <= c; ) {
      let u = e.at(i),
        l = t[i],
        d = Ic(i, u, i, l, n);
      if (d !== 0) {
        d < 0 && e.updateValue(i, l), i++;
        continue;
      }
      let h = e.at(s),
        f = t[c],
        g = Ic(s, h, c, f, n);
      if (g !== 0) {
        g < 0 && e.updateValue(s, f), s--, c--;
        continue;
      }
      let m = n(i, u),
        D = n(s, h),
        w = n(i, l);
      if (Object.is(w, D)) {
        let B = n(c, f);
        Object.is(B, m)
          ? (e.swap(i, s), e.updateValue(s, f), c--, s--)
          : e.move(s, i),
          e.updateValue(i, l),
          i++;
        continue;
      }
      if (((r ??= new fs()), (o ??= Oh(e, i, s, n)), vu(e, r, i, w)))
        e.updateValue(i, l), i++, s++;
      else if (o.has(w)) r.set(m, e.detach(i)), s--;
      else {
        let B = e.create(i, t[i]);
        e.attach(i, B), i++, s++;
      }
    }
    for (; i <= c; ) xh(e, r, n, i, t[i]), i++;
  } else if (t != null) {
    let c = t[Symbol.iterator](),
      u = c.next();
    for (; !u.done && i <= s; ) {
      let l = e.at(i),
        d = u.value,
        h = Ic(i, l, i, d, n);
      if (h !== 0) h < 0 && e.updateValue(i, d), i++, (u = c.next());
      else {
        (r ??= new fs()), (o ??= Oh(e, i, s, n));
        let f = n(i, d);
        if (vu(e, r, i, f)) e.updateValue(i, d), i++, s++, (u = c.next());
        else if (!o.has(f))
          e.attach(i, e.create(i, d)), i++, s++, (u = c.next());
        else {
          let g = n(i, l);
          r.set(g, e.detach(i)), s--;
        }
      }
    }
    for (; !u.done; ) xh(e, r, n, e.length, u.value), (u = c.next());
  }
  for (; i <= s; ) e.destroy(e.detach(s--));
  r?.forEach((c) => {
    e.destroy(c);
  });
}
function vu(e, t, n, r) {
  return t !== void 0 && t.has(r)
    ? (e.attach(n, t.get(r)), t.delete(r), !0)
    : !1;
}
function xh(e, t, n, r, o) {
  if (vu(e, t, r, n(r, o))) e.updateValue(r, o);
  else {
    let i = e.create(r, o);
    e.attach(r, i);
  }
}
function Oh(e, t, n, r) {
  let o = new Set();
  for (let i = t; i <= n; i++) o.add(r(i, e.at(i)));
  return o;
}
var fs = class {
  kvMap = new Map();
  _vMap = void 0;
  has(t) {
    return this.kvMap.has(t);
  }
  delete(t) {
    if (!this.has(t)) return !1;
    let n = this.kvMap.get(t);
    return (
      this._vMap !== void 0 && this._vMap.has(n)
        ? (this.kvMap.set(t, this._vMap.get(n)), this._vMap.delete(n))
        : this.kvMap.delete(t),
      !0
    );
  }
  get(t) {
    return this.kvMap.get(t);
  }
  set(t, n) {
    if (this.kvMap.has(t)) {
      let r = this.kvMap.get(t);
      this._vMap === void 0 && (this._vMap = new Map());
      let o = this._vMap;
      for (; o.has(r); ) r = o.get(r);
      o.set(r, n);
    } else this.kvMap.set(t, n);
  }
  forEach(t) {
    for (let [n, r] of this.kvMap)
      if ((t(r, n), this._vMap !== void 0)) {
        let o = this._vMap;
        for (; o.has(r); ) (r = o.get(r)), t(r, n);
      }
  }
};
function ck(e, t) {
  xe("NgControlFlow");
  let n = F(),
    r = Xr(),
    o = n[r] !== Oe ? n[r] : -1,
    i = o !== -1 ? hs(n, Z + o) : void 0,
    s = 0;
  if (rt(n, r, e)) {
    let a = O(null);
    try {
      if ((i !== void 0 && ml(i, s), e !== -1)) {
        let c = Z + e,
          u = hs(n, c),
          l = Cu(n[b], c),
          d = $r(u, l.tView.ssrId),
          h = js(n, l, t, { dehydratedView: d });
        ro(u, h, s, Xn(l, d));
      }
    } finally {
      O(a);
    }
  } else if (i !== void 0) {
    let a = fm(i, s);
    a !== void 0 && (a[le] = t);
  }
}
var yu = class {
  lContainer;
  $implicit;
  $index;
  constructor(t, n, r) {
    (this.lContainer = t), (this.$implicit = n), (this.$index = r);
  }
  get $count() {
    return this.lContainer.length - de;
  }
};
var Du = class {
  hasEmptyBlock;
  trackByFn;
  liveCollection;
  constructor(t, n, r) {
    (this.hasEmptyBlock = t), (this.trackByFn = n), (this.liveCollection = r);
  }
};
function uk(e, t, n, r, o, i, s, a, c, u, l, d, h) {
  xe("NgControlFlow");
  let f = F(),
    g = ge(),
    m = c !== void 0,
    D = F(),
    w = a ? s.bind(D[Ae][le]) : s,
    B = new Du(m, w);
  (D[Z + e] = B),
    ls(f, g, e + 1, t, n, r, o, Yn(g.consts, i)),
    m && ls(f, g, e + 2, c, u, l, d, Yn(g.consts, h));
}
var Eu = class extends mu {
  lContainer;
  hostLView;
  templateTNode;
  operationsCounter = void 0;
  needsIndexUpdate = !1;
  constructor(t, n, r) {
    super(),
      (this.lContainer = t),
      (this.hostLView = n),
      (this.templateTNode = r);
  }
  get length() {
    return this.lContainer.length - de;
  }
  at(t) {
    return this.getLView(t)[le].$implicit;
  }
  attach(t, n) {
    let r = n[qe];
    (this.needsIndexUpdate ||= t !== this.length),
      ro(this.lContainer, n, t, Xn(this.templateTNode, r));
  }
  detach(t) {
    return (
      (this.needsIndexUpdate ||= t !== this.length - 1), EM(this.lContainer, t)
    );
  }
  create(t, n) {
    let r = $r(this.lContainer, this.templateTNode.tView.ssrId),
      o = js(
        this.hostLView,
        this.templateTNode,
        new yu(this.lContainer, n, t),
        { dehydratedView: r }
      );
    return this.operationsCounter?.recordCreate(), o;
  }
  destroy(t) {
    Os(t[b], t), this.operationsCounter?.recordDestroy();
  }
  updateValue(t, n) {
    this.getLView(t)[le].$implicit = n;
  }
  reset() {
    (this.needsIndexUpdate = !1), this.operationsCounter?.reset();
  }
  updateIndexes() {
    if (this.needsIndexUpdate)
      for (let t = 0; t < this.length; t++) this.getLView(t)[le].$index = t;
  }
  getLView(t) {
    return CM(this.lContainer, t);
  }
};
function lk(e) {
  let t = O(null),
    n = zt();
  try {
    let r = F(),
      o = r[b],
      i = r[n],
      s = n + 1,
      a = hs(r, s);
    if (i.liveCollection === void 0) {
      let u = Cu(o, s);
      i.liveCollection = new Eu(a, r, u);
    } else i.liveCollection.reset();
    let c = i.liveCollection;
    if ((DM(c, e, i.trackByFn), c.updateIndexes(), i.hasEmptyBlock)) {
      let u = Xr(),
        l = c.length === 0;
      if (rt(r, u, l)) {
        let d = n + 2,
          h = hs(r, d);
        if (l) {
          let f = Cu(o, d),
            g = $r(h, f.tView.ssrId),
            m = js(r, f, void 0, { dehydratedView: g });
          ro(h, m, 0, Xn(f, g));
        } else ml(h, 0);
      }
    }
  } finally {
    O(t);
  }
}
function hs(e, t) {
  return e[t];
}
function EM(e, t) {
  return Br(e, t);
}
function CM(e, t) {
  return fm(e, t);
}
function Cu(e, t) {
  return Zr(e, t);
}
function wM(e, t, n, r, o, i) {
  let s = t.consts,
    a = Yn(s, o),
    c = ks(t, e, 2, r, a);
  return (
    sm(t, n, c, Yn(s, i)),
    c.attrs !== null && uu(c, c.attrs, !1),
    c.mergedAttrs !== null && uu(c, c.mergedAttrs, !0),
    t.queries !== null && t.queries.elementStart(t, c),
    c
  );
}
function Bm(e, t, n, r) {
  let o = F(),
    i = ge(),
    s = Z + e,
    a = o[q],
    c = i.firstCreatePass ? wM(s, i, o, t, n, r) : i.data[s],
    u = Hm(i, o, c, a, t, e);
  o[s] = u;
  let l = Lu(c);
  return (
    Kr(c, !0),
    Zg(a, u, c),
    !io(c) && Hu() && ul(i, o, u, c),
    uC() === 0 && mn(u, o),
    lC(),
    l && (tm(i, o, c), bg(i, c, o)),
    r !== null && nm(o, c),
    Bm
  );
}
function $m() {
  let e = me();
  Cp() ? mC() : ((e = e.parent), Kr(e, !1));
  let t = e;
  fC(t) && pC(), dC();
  let n = ge();
  return (
    n.firstCreatePass && (zu(n, e), lp(e) && n.queries.elementEnd(e)),
    t.classesWithoutHost != null &&
      NC(t) &&
      Ah(n, t, F(), t.classesWithoutHost, !0),
    t.stylesWithoutHost != null &&
      AC(t) &&
      Ah(n, t, F(), t.stylesWithoutHost, !1),
    $m
  );
}
function Il(e, t, n, r) {
  return Bm(e, t, n, r), $m(), Il;
}
var Hm = (e, t, n, r, o, i) => (Gt(!0), al(r, o, Ap()));
function IM(e, t, n, r, o, i) {
  let s = t[qe],
    a = !s || Yr() || io(n) || to(s, i);
  if ((Gt(a), a)) return al(r, o, Ap());
  let c = Bs(s, e, t, n);
  return (
    Ig(s, i) && As(s, i, c.nextSibling),
    s && (Kp(n) || Qp(c)) && Wr(n) && (hC(n), qg(c)),
    c
  );
}
function _M() {
  Hm = IM;
}
var bM = (e, t, n, r) => (Gt(!0), Ug(t[q], ""));
function MM(e, t, n, r) {
  let o,
    i = t[qe],
    s = !i || Yr() || to(i, r) || io(n);
  if ((Gt(s), s)) return Ug(t[q], "");
  let a = Bs(i, e, t, n),
    c = Ww(i, r);
  return As(i, r, a), (o = $s(c, a)), o;
}
function TM() {
  bM = MM;
}
function dk() {
  return F();
}
var ps = "en-US";
var SM = ps;
function NM(e) {
  typeof e == "string" && (SM = e.toLowerCase().replace(/_/g, "-"));
}
var zm = (e, t, n) => {};
function AM(e) {
  zm = e;
}
function Zt(e, t, n, r) {
  let o = F(),
    i = ge(),
    s = me();
  return xM(i, o, o[q], s, e, t, r), Zt;
}
function RM(e, t, n, r) {
  let o = e.cleanup;
  if (o != null)
    for (let i = 0; i < o.length - 1; i += 2) {
      let s = o[i];
      if (s === n && o[i + 1] === r) {
        let a = t[zi],
          c = o[i + 2];
        return a.length > c ? a[c] : null;
      }
      typeof s == "string" && (i += 2);
    }
  return null;
}
function xM(e, t, n, r, o, i, s) {
  let a = Lu(r),
    u = e.firstCreatePass && cC(e),
    l = t[le],
    d = aC(t),
    h = !0;
  if (r.type & 3 || s) {
    let m = Re(r, t),
      D = s ? s(m) : m,
      w = d.length,
      B = s ? (W) => s(We(W[r.index])) : r.index,
      x = null;
    if ((!s && a && (x = RM(e, t, o, r.index)), x !== null)) {
      let W = x.__ngLastListenerFn__ || x;
      (W.__ngNextListenerFn__ = i), (x.__ngLastListenerFn__ = i), (h = !1);
    } else {
      (i = Fh(r, t, l, i)), zm(m, o, i);
      let W = n.listen(D, o, i);
      d.push(i, W), u && u.push(o, B, w, w + 1);
    }
  } else i = Fh(r, t, l, i);
  let f = r.outputs,
    g;
  if (h && f !== null && (g = f[o])) {
    let m = g.length;
    if (m)
      for (let D = 0; D < m; D += 2) {
        let w = g[D],
          B = g[D + 1],
          Y = t[w][B].subscribe(i),
          J = d.length;
        d.push(i, Y), u && u.push(o, r.index, J, -(J + 1));
      }
  }
}
function Ph(e, t, n, r) {
  let o = O(null);
  try {
    return Ve(6, t, n), n(r) !== !1;
  } catch (i) {
    return Vs(e, i), !1;
  } finally {
    Ve(7, t, n), O(o);
  }
}
function Fh(e, t, n, r) {
  return function o(i) {
    if (i === Function) return r;
    let s = e.componentOffset > -1 ? Ht(e.index, t) : t;
    Us(s, 5);
    let a = Ph(t, n, r, i),
      c = o.__ngNextListenerFn__;
    for (; c; ) (a = Ph(t, n, c, i) && a), (c = c.__ngNextListenerFn__);
    return a;
  };
}
function fk(e = 1) {
  return _C(e);
}
function OM(e, t, n) {
  return Gm(e, "", t, "", n), OM;
}
function Gm(e, t, n, r, o) {
  let i = F(),
    s = Cl(i, t, n, r);
  if (s !== Oe) {
    let a = ge(),
      c = Is();
    im(a, c, i, e, s, i[q], o, !1);
  }
  return Gm;
}
function PM(e, t, n, r) {
  n >= e.data.length && ((e.data[n] = null), (e.blueprint[n] = null)),
    (t[n] = r);
}
function hk(e, t = "") {
  let n = F(),
    r = ge(),
    o = e + Z,
    i = r.firstCreatePass ? ks(r, o, 1, t, null) : r.data[o],
    s = qm(r, n, i, t, e);
  (n[o] = s), Hu() && ul(r, n, s, i), Kr(i, !1);
}
var qm = (e, t, n, r, o) => (Gt(!0), jg(t[q], r));
function FM(e, t, n, r, o) {
  let i = t[qe],
    s = !i || Yr() || io(n) || to(i, o);
  return Gt(s), s ? jg(t[q], r) : Bs(i, e, t, n);
}
function kM() {
  qm = FM;
}
function LM(e) {
  return Wm("", e, ""), LM;
}
function Wm(e, t, n) {
  let r = F(),
    o = Cl(r, e, t, n);
  return o !== Oe && Zm(r, zt(), o), Wm;
}
function VM(e, t, n, r, o) {
  let i = F(),
    s = tM(i, e, t, n, r, o);
  return s !== Oe && Zm(i, zt(), s), VM;
}
function Zm(e, t, n) {
  let r = mp(t, e);
  II(e[q], r, n);
}
function jM(e, t, n) {
  let r = ge();
  if (r.firstCreatePass) {
    let o = Vt(e);
    wu(n, r.data, r.blueprint, o, !0), wu(t, r.data, r.blueprint, o, !1);
  }
}
function wu(e, t, n, r, o) {
  if (((e = pe(e)), Array.isArray(e)))
    for (let i = 0; i < e.length; i++) wu(e[i], t, n, r, o);
  else {
    let i = ge(),
      s = F(),
      a = me(),
      c = qn(e) ? e : pe(e.provide),
      u = sp(e),
      l = a.providerIndexes & 1048575,
      d = a.directiveStart,
      h = a.providerIndexes >> 20;
    if (qn(e) || !e.multi) {
      let f = new gn(u, o, V),
        g = bc(c, t, o ? l : l + h, d);
      g === -1
        ? (Vc(Xi(a, s), i, c),
          _c(i, e, t.length),
          t.push(c),
          a.directiveStart++,
          a.directiveEnd++,
          o && (a.providerIndexes += 1048576),
          n.push(f),
          s.push(f))
        : ((n[g] = f), (s[g] = f));
    } else {
      let f = bc(c, t, l + h, d),
        g = bc(c, t, l, l + h),
        m = f >= 0 && n[f],
        D = g >= 0 && n[g];
      if ((o && !D) || (!o && !m)) {
        Vc(Xi(a, s), i, c);
        let w = $M(o ? BM : UM, n.length, o, r, u);
        !o && D && (n[g].providerFactory = w),
          _c(i, e, t.length, 0),
          t.push(c),
          a.directiveStart++,
          a.directiveEnd++,
          o && (a.providerIndexes += 1048576),
          n.push(w),
          s.push(w);
      } else {
        let w = Ym(n[o ? g : f], u, !o && r);
        _c(i, e, f > -1 ? f : g, w);
      }
      !o && r && D && n[g].componentProviders++;
    }
  }
}
function _c(e, t, n, r) {
  let o = qn(t),
    i = GE(t);
  if (o || i) {
    let c = (i ? pe(t.useClass) : t).prototype.ngOnDestroy;
    if (c) {
      let u = e.destroyHooks || (e.destroyHooks = []);
      if (!o && t.multi) {
        let l = u.indexOf(n);
        l === -1 ? u.push(n, [r, c]) : u[l + 1].push(r, c);
      } else u.push(n, c);
    }
  }
}
function Ym(e, t, n) {
  return n && e.componentProviders++, e.multi.push(t) - 1;
}
function bc(e, t, n, r) {
  for (let o = n; o < r; o++) if (t[o] === e) return o;
  return -1;
}
function UM(e, t, n, r) {
  return Iu(this.multi, []);
}
function BM(e, t, n, r) {
  let o = this.multi,
    i;
  if (this.providerFactory) {
    let s = this.providerFactory.componentProviders,
      a = Kn(n, n[b], this.providerFactory.index, r);
    (i = a.slice(0, s)), Iu(o, i);
    for (let c = s; c < a.length; c++) i.push(a[c]);
  } else (i = []), Iu(o, i);
  return i;
}
function Iu(e, t) {
  for (let n = 0; n < e.length; n++) {
    let r = e[n];
    t.push(r());
  }
  return t;
}
function $M(e, t, n, r, o) {
  let i = new gn(e, n, V);
  return (
    (i.multi = []),
    (i.index = t),
    (i.componentProviders = 0),
    Ym(i, o, r && !n),
    i
  );
}
function lr(e, t = []) {
  return (n) => {
    n.providersResolver = (r, o) => jM(r, o ? o(e) : e, t);
  };
}
function pk(e, t, n) {
  let r = Qr() + e,
    o = F();
  return o[r] === Oe ? zs(o, r, n ? t.call(n) : t()) : Rm(o, r);
}
function gk(e, t, n, r) {
  return HM(F(), Qr(), e, t, n, r);
}
function mk(e, t, n, r, o) {
  return Qm(F(), Qr(), e, t, n, r, o);
}
function vk(e, t, n, r, o, i, s, a) {
  let c = Qr() + e,
    u = F(),
    l = bb(u, c, n, r, o, i);
  return rt(u, c + 4, s) || l
    ? zs(u, c + 5, a ? t.call(a, n, r, o, i, s) : t(n, r, o, i, s))
    : Rm(u, c + 5);
}
function Km(e, t) {
  let n = e[t];
  return n === Oe ? void 0 : n;
}
function HM(e, t, n, r, o, i) {
  let s = t + n;
  return rt(e, s, o) ? zs(e, s + 1, i ? r.call(i, o) : r(o)) : Km(e, s + 1);
}
function Qm(e, t, n, r, o, i, s) {
  let a = t + n;
  return us(e, a, o, i)
    ? zs(e, a + 2, s ? r.call(s, o, i) : r(o, i))
    : Km(e, a + 2);
}
function yk(e, t) {
  let n = ge(),
    r,
    o = e + Z;
  n.firstCreatePass
    ? ((r = zM(t, n.pipeRegistry)),
      (n.data[o] = r),
      r.onDestroy && (n.destroyHooks ??= []).push(o, r.onDestroy))
    : (r = n.data[o]);
  let i = r.factory || (r.factory = fn(r.type, !0)),
    s,
    a = Ee(V);
  try {
    let c = Qi(!1),
      u = i();
    return Qi(c), PM(n, F(), o, u), u;
  } finally {
    Ee(a);
  }
}
function zM(e, t) {
  if (t)
    for (let n = t.length - 1; n >= 0; n--) {
      let r = t[n];
      if (e === r.name) return r;
    }
}
function Dk(e, t, n, r) {
  let o = e + Z,
    i = F(),
    s = oC(i, o);
  return GM(i, o) ? Qm(i, Qr(), t, s.transform, n, r, s) : s.transform(n, r);
}
function GM(e, t) {
  return e[b].data[t].pure;
}
var _u = class {
    ngModuleFactory;
    componentFactories;
    constructor(t, n) {
      (this.ngModuleFactory = t), (this.componentFactories = n);
    }
  },
  Ws = (() => {
    class e {
      compileModuleSync(n) {
        return new fu(n);
      }
      compileModuleAsync(n) {
        return Promise.resolve(this.compileModuleSync(n));
      }
      compileModuleAndAllComponentsSync(n) {
        let r = this.compileModuleSync(n),
          o = np(n),
          i = Vg(o.declarations).reduce((s, a) => {
            let c = gt(a);
            return c && s.push(new nr(c)), s;
          }, []);
        return new _u(r, i);
      }
      compileModuleAndAllComponentsAsync(n) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
      }
      clearCache() {}
      clearCacheFor(n) {}
      getModuleId(n) {}
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })();
var qM = (() => {
    class e {
      zone = p(G);
      changeDetectionScheduler = p(Qn);
      applicationRef = p(Ie);
      _onMicrotaskEmptySubscription;
      initialize() {
        this._onMicrotaskEmptySubscription ||
          (this._onMicrotaskEmptySubscription =
            this.zone.onMicrotaskEmpty.subscribe({
              next: () => {
                this.changeDetectionScheduler.runningTick ||
                  this.zone.run(() => {
                    this.applicationRef.tick();
                  });
              },
            }));
      }
      ngOnDestroy() {
        this._onMicrotaskEmptySubscription?.unsubscribe();
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  WM = new y("", { factory: () => !1 });
function Xm({
  ngZoneFactory: e,
  ignoreChangesOutsideZone: t,
  scheduleInRootZone: n,
}) {
  return (
    (e ??= () => new G(L(v({}, Jm()), { scheduleInRootZone: n }))),
    [
      { provide: G, useFactory: e },
      {
        provide: Lt,
        multi: !0,
        useFactory: () => {
          let r = p(qM, { optional: !0 });
          return () => r.initialize();
        },
      },
      {
        provide: Lt,
        multi: !0,
        useFactory: () => {
          let r = p(ZM);
          return () => {
            r.initialize();
          };
        },
      },
      t === !0 ? { provide: Gp, useValue: !0 } : [],
      { provide: qp, useValue: n ?? zp },
    ]
  );
}
function Ek(e) {
  let t = e?.ignoreChangesOutsideZone,
    n = e?.scheduleInRootZone,
    r = Xm({
      ngZoneFactory: () => {
        let o = Jm(e);
        return (
          (o.scheduleInRootZone = n),
          o.shouldCoalesceEventChangeDetection && xe("NgZone_CoalesceEvent"),
          new G(o)
        );
      },
      ignoreChangesOutsideZone: t,
      scheduleInRootZone: n,
    });
  return $t([{ provide: WM, useValue: !0 }, { provide: bs, useValue: !1 }, r]);
}
function Jm(e) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
  };
}
var ZM = (() => {
  class e {
    subscription = new K();
    initialized = !1;
    zone = p(G);
    pendingTasks = p(it);
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let n = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (n = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              G.assertNotInAngularZone(),
                queueMicrotask(() => {
                  n !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(n), (n = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            G.assertInAngularZone(), (n ??= this.pendingTasks.add());
          })
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
  }
  return e;
})();
var YM = (() => {
  class e {
    appRef = p(Ie);
    taskService = p(it);
    ngZone = p(G);
    zonelessEnabled = p(bs);
    tracing = p(cr, { optional: !0 });
    disableScheduling = p(Gp, { optional: !0 }) ?? !1;
    zoneIsDefined = typeof Zone < "u" && !!Zone.root.run;
    schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }];
    subscriptions = new K();
    angularZoneId = this.zoneIsDefined ? this.ngZone._inner?.get(es) : null;
    scheduleInRootZone =
      !this.zonelessEnabled &&
      this.zoneIsDefined &&
      (p(qp, { optional: !0 }) ?? !1);
    cancelScheduledCallback = null;
    useMicrotaskScheduler = !1;
    runningTick = !1;
    pendingRenderTaskId = null;
    constructor() {
      this.subscriptions.add(
        this.appRef.afterTick.subscribe(() => {
          this.runningTick || this.cleanup();
        })
      ),
        this.subscriptions.add(
          this.ngZone.onUnstable.subscribe(() => {
            this.runningTick || this.cleanup();
          })
        ),
        (this.disableScheduling ||=
          !this.zonelessEnabled &&
          (this.ngZone instanceof Hc || !this.zoneIsDefined));
    }
    notify(n) {
      if (!this.zonelessEnabled && n === 5) return;
      let r = !1;
      switch (n) {
        case 0: {
          this.appRef.dirtyFlags |= 2;
          break;
        }
        case 3:
        case 2:
        case 4:
        case 5:
        case 1: {
          this.appRef.dirtyFlags |= 4;
          break;
        }
        case 8: {
          this.appRef.deferredDirtyFlags |= 8;
          break;
        }
        case 6: {
          (this.appRef.dirtyFlags |= 2), (r = !0);
          break;
        }
        case 13: {
          (this.appRef.dirtyFlags |= 16), (r = !0);
          break;
        }
        case 14: {
          (this.appRef.dirtyFlags |= 2), (r = !0);
          break;
        }
        case 12: {
          r = !0;
          break;
        }
        case 10:
        case 9:
        case 7:
        case 11:
        default:
          this.appRef.dirtyFlags |= 8;
      }
      if (
        ((this.appRef.tracingSnapshot =
          this.tracing?.snapshot(this.appRef.tracingSnapshot) ?? null),
        !this.shouldScheduleTick(r))
      )
        return;
      let o = this.useMicrotaskScheduler ? th : Wp;
      (this.pendingRenderTaskId = this.taskService.add()),
        this.scheduleInRootZone
          ? (this.cancelScheduledCallback = Zone.root.run(() =>
              o(() => this.tick())
            ))
          : (this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() =>
              o(() => this.tick())
            ));
    }
    shouldScheduleTick(n) {
      return !(
        (this.disableScheduling && !n) ||
        this.appRef.destroyed ||
        this.pendingRenderTaskId !== null ||
        this.runningTick ||
        this.appRef._runningTick ||
        (!this.zonelessEnabled &&
          this.zoneIsDefined &&
          Zone.current.get(es + this.angularZoneId))
      );
    }
    tick() {
      if (this.runningTick || this.appRef.destroyed) return;
      if (this.appRef.dirtyFlags === 0) {
        this.cleanup();
        return;
      }
      !this.zonelessEnabled &&
        this.appRef.dirtyFlags & 7 &&
        (this.appRef.dirtyFlags |= 1);
      let n = this.taskService.add();
      try {
        this.ngZone.run(
          () => {
            (this.runningTick = !0), this.appRef._tick();
          },
          void 0,
          this.schedulerTickApplyArgs
        );
      } catch (r) {
        throw (this.taskService.remove(n), r);
      } finally {
        this.cleanup();
      }
      (this.useMicrotaskScheduler = !0),
        th(() => {
          (this.useMicrotaskScheduler = !1), this.taskService.remove(n);
        });
    }
    ngOnDestroy() {
      this.subscriptions.unsubscribe(), this.cleanup();
    }
    cleanup() {
      if (
        ((this.runningTick = !1),
        this.cancelScheduledCallback?.(),
        (this.cancelScheduledCallback = null),
        this.pendingRenderTaskId !== null)
      ) {
        let n = this.pendingRenderTaskId;
        (this.pendingRenderTaskId = null), this.taskService.remove(n);
      }
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
  }
  return e;
})();
function KM() {
  return (typeof $localize < "u" && $localize.locale) || ps;
}
var _l = new y("", {
  providedIn: "root",
  factory: () => p(_l, P.Optional | P.SkipSelf) || KM(),
});
var bu = new y(""),
  QM = new y("");
function xr(e) {
  return !e.moduleRef;
}
function XM(e) {
  let t = xr(e) ? e.r3Injector : e.moduleRef.injector,
    n = t.get(G);
  return n.run(() => {
    xr(e)
      ? e.r3Injector.resolveInjectorInitializers()
      : e.moduleRef.resolveInjectorInitializers();
    let r = t.get(et, null),
      o;
    if (
      (n.runOutsideAngular(() => {
        o = n.onError.subscribe({
          next: (i) => {
            r.handleError(i);
          },
        });
      }),
      xr(e))
    ) {
      let i = () => t.destroy(),
        s = e.platformInjector.get(bu);
      s.add(i),
        t.onDestroy(() => {
          o.unsubscribe(), s.delete(i);
        });
    } else {
      let i = () => e.moduleRef.destroy(),
        s = e.platformInjector.get(bu);
      s.add(i),
        e.moduleRef.onDestroy(() => {
          Li(e.allPlatformModules, e.moduleRef), o.unsubscribe(), s.delete(i);
        });
    }
    return Gb(r, n, () => {
      let i = t.get(km);
      return (
        i.runInitializers(),
        i.donePromise.then(() => {
          let s = t.get(_l, ps);
          if ((NM(s || ps), !t.get(QM, !0)))
            return xr(e)
              ? t.get(Ie)
              : (e.allPlatformModules.push(e.moduleRef), e.moduleRef);
          if (xr(e)) {
            let c = t.get(Ie);
            return (
              e.rootComponent !== void 0 && c.bootstrap(e.rootComponent), c
            );
          } else return JM(e.moduleRef, e.allPlatformModules), e.moduleRef;
        })
      );
    });
  });
}
function JM(e, t) {
  let n = e.injector.get(Ie);
  if (e._bootstrapComponents.length > 0)
    e._bootstrapComponents.forEach((r) => n.bootstrap(r));
  else if (e.instance.ngDoBootstrap) e.instance.ngDoBootstrap(n);
  else throw new E(-403, !1);
  t.push(e);
}
var Vi = null;
function eT(e = [], t) {
  return he.create({
    name: t,
    providers: [
      { provide: Ds, useValue: "platform" },
      { provide: bu, useValue: new Set([() => (Vi = null)]) },
      ...e,
    ],
  });
}
function tT(e = []) {
  if (Vi) return Vi;
  let t = eT(e);
  return (Vi = t), $b(), nT(t), t;
}
function nT(e) {
  let t = e.get(Ku, null);
  _e(e, () => {
    t?.forEach((n) => n());
  });
}
var En = (() => {
  class e {
    static __NG_ELEMENT_ID__ = rT;
  }
  return e;
})();
function rT(e) {
  return oT(me(), F(), (e & 16) === 16);
}
function oT(e, t, n) {
  if (Wr(e) && !n) {
    let r = Ht(e.index, t);
    return new Jn(r, r);
  } else if (e.type & 175) {
    let r = t[Ae];
    return new Jn(r, t);
  }
  return null;
}
var Mu = class {
    constructor() {}
    supports(t) {
      return t instanceof Map || Am(t);
    }
    create() {
      return new Tu();
    }
  },
  Tu = class {
    _records = new Map();
    _mapHead = null;
    _appendAfter = null;
    _previousMapHead = null;
    _changesHead = null;
    _changesTail = null;
    _additionsHead = null;
    _additionsTail = null;
    _removalsHead = null;
    _removalsTail = null;
    get isDirty() {
      return (
        this._additionsHead !== null ||
        this._changesHead !== null ||
        this._removalsHead !== null
      );
    }
    forEachItem(t) {
      let n;
      for (n = this._mapHead; n !== null; n = n._next) t(n);
    }
    forEachPreviousItem(t) {
      let n;
      for (n = this._previousMapHead; n !== null; n = n._nextPrevious) t(n);
    }
    forEachChangedItem(t) {
      let n;
      for (n = this._changesHead; n !== null; n = n._nextChanged) t(n);
    }
    forEachAddedItem(t) {
      let n;
      for (n = this._additionsHead; n !== null; n = n._nextAdded) t(n);
    }
    forEachRemovedItem(t) {
      let n;
      for (n = this._removalsHead; n !== null; n = n._nextRemoved) t(n);
    }
    diff(t) {
      if (!t) t = new Map();
      else if (!(t instanceof Map || Am(t))) throw new E(900, !1);
      return this.check(t) ? this : null;
    }
    onDestroy() {}
    check(t) {
      this._reset();
      let n = this._mapHead;
      if (
        ((this._appendAfter = null),
        this._forEach(t, (r, o) => {
          if (n && n.key === o)
            this._maybeAddToChanges(n, r),
              (this._appendAfter = n),
              (n = n._next);
          else {
            let i = this._getOrCreateRecordForKey(o, r);
            n = this._insertBeforeOrAppend(n, i);
          }
        }),
        n)
      ) {
        n._prev && (n._prev._next = null), (this._removalsHead = n);
        for (let r = n; r !== null; r = r._nextRemoved)
          r === this._mapHead && (this._mapHead = null),
            this._records.delete(r.key),
            (r._nextRemoved = r._next),
            (r.previousValue = r.currentValue),
            (r.currentValue = null),
            (r._prev = null),
            (r._next = null);
      }
      return (
        this._changesTail && (this._changesTail._nextChanged = null),
        this._additionsTail && (this._additionsTail._nextAdded = null),
        this.isDirty
      );
    }
    _insertBeforeOrAppend(t, n) {
      if (t) {
        let r = t._prev;
        return (
          (n._next = t),
          (n._prev = r),
          (t._prev = n),
          r && (r._next = n),
          t === this._mapHead && (this._mapHead = n),
          (this._appendAfter = t),
          t
        );
      }
      return (
        this._appendAfter
          ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
          : (this._mapHead = n),
        (this._appendAfter = n),
        null
      );
    }
    _getOrCreateRecordForKey(t, n) {
      if (this._records.has(t)) {
        let o = this._records.get(t);
        this._maybeAddToChanges(o, n);
        let i = o._prev,
          s = o._next;
        return (
          i && (i._next = s),
          s && (s._prev = i),
          (o._next = null),
          (o._prev = null),
          o
        );
      }
      let r = new Su(t);
      return (
        this._records.set(t, r),
        (r.currentValue = n),
        this._addToAdditions(r),
        r
      );
    }
    _reset() {
      if (this.isDirty) {
        let t;
        for (
          this._previousMapHead = this._mapHead, t = this._previousMapHead;
          t !== null;
          t = t._next
        )
          t._nextPrevious = t._next;
        for (t = this._changesHead; t !== null; t = t._nextChanged)
          t.previousValue = t.currentValue;
        for (t = this._additionsHead; t != null; t = t._nextAdded)
          t.previousValue = t.currentValue;
        (this._changesHead = this._changesTail = null),
          (this._additionsHead = this._additionsTail = null),
          (this._removalsHead = null);
      }
    }
    _maybeAddToChanges(t, n) {
      Object.is(n, t.currentValue) ||
        ((t.previousValue = t.currentValue),
        (t.currentValue = n),
        this._addToChanges(t));
    }
    _addToAdditions(t) {
      this._additionsHead === null
        ? (this._additionsHead = this._additionsTail = t)
        : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
    }
    _addToChanges(t) {
      this._changesHead === null
        ? (this._changesHead = this._changesTail = t)
        : ((this._changesTail._nextChanged = t), (this._changesTail = t));
    }
    _forEach(t, n) {
      t instanceof Map
        ? t.forEach(n)
        : Object.keys(t).forEach((r) => n(t[r], r));
    }
  },
  Su = class {
    key;
    previousValue = null;
    currentValue = null;
    _nextPrevious = null;
    _next = null;
    _prev = null;
    _nextAdded = null;
    _nextRemoved = null;
    _nextChanged = null;
    constructor(t) {
      this.key = t;
    }
  };
function kh() {
  return new bl([new Mu()]);
}
var bl = (() => {
  class e {
    static ɵprov = C({ token: e, providedIn: "root", factory: kh });
    factories;
    constructor(n) {
      this.factories = n;
    }
    static create(n, r) {
      if (r) {
        let o = r.factories.slice();
        n = n.concat(o);
      }
      return new e(n);
    }
    static extend(n) {
      return {
        provide: e,
        useFactory: (r) => e.create(n, r || kh()),
        deps: [[e, new Au(), new ys()]],
      };
    }
    find(n) {
      let r = this.factories.find((o) => o.supports(n));
      if (r) return r;
      throw new E(901, !1);
    }
  }
  return e;
})();
function ev(e) {
  try {
    let { rootComponent: t, appProviders: n, platformProviders: r } = e,
      o = tT(r),
      i = [Xm({}), { provide: Qn, useExisting: YM }, ...(n || [])],
      s = new cs({
        providers: i,
        parent: o,
        debugName: "",
        runEnvironmentInitializers: !1,
      });
    return XM({
      r3Injector: s.injector,
      platformInjector: o,
      rootComponent: t,
    });
  } catch (t) {
    return Promise.reject(t);
  }
}
var xi = new WeakSet(),
  Lh = "",
  ji = [];
function Vh(e) {
  return e.get(fg, mw);
}
function tv() {
  let e = [
    {
      provide: fg,
      useFactory: () => {
        let t = !0;
        {
          let n = p(ar);
          t = !!window._ejsas?.[n];
        }
        return t && xe("NgEventReplay"), t;
      },
    },
  ];
  return (
    e.push(
      {
        provide: Lt,
        useValue: () => {
          let t = p(he),
            n = t.get(Ie);
          if (!xi.has(n)) {
            let r = p(ah);
            Vh(t) &&
              AM((o, i, s) => {
                Pw(o, i, s), Fw(o, r);
              });
          }
        },
        multi: !0,
      },
      {
        provide: Wt,
        useFactory: () => {
          let t = p(he),
            n = p(Ie);
          return () => {
            !Vh(t) ||
              xi.has(n) ||
              (xi.add(n),
              n.onDestroy(() => xi.delete(n)),
              n.whenStable().then(() => {
                let r = t.get(Lw);
                iT(r, t);
                let o = t.get(ah);
                o.get(Lh)?.forEach(kw), o.delete(Lh);
                let i = r.instance;
                wg(t) ? n.onDestroy(() => i.cleanUp()) : i.cleanUp();
              }));
          };
        },
        multi: !0,
      }
    ),
    e
  );
}
var iT = (e, t) => {
  let n = t.get(ar),
    r = window._ejsas[n],
    o = (e.instance = new Vf(new Ii(r.c)));
  for (let a of r.et) o.addEvent(a);
  for (let a of r.etc) o.addEvent(a);
  let i = jf(n);
  o.replayEarlyEventInfos(i), Uf(n);
  let s = new _i((a) => {
    sT(t, a, a.currentTarget);
  });
  Lf(o, s);
};
function sT(e, t, n) {
  let r = (n && n.getAttribute(Ns)) ?? "";
  /d\d+/.test(r) ? aT(r, e, t, n) : t.eventPhase === uc.REPLAY && Dg(t, n);
}
function aT(e, t, n, r) {
  ji.push({ event: n, currentTarget: r }), Yb(t, e, cT);
}
function cT(e) {
  let t = [...ji],
    n = new Set(e);
  ji = [];
  for (let { event: r, currentTarget: o } of t) {
    let i = o.getAttribute(Ns);
    n.has(i) ? Dg(r, o) : ji.push({ event: r, currentTarget: o });
  }
}
var jh = !1;
function uT() {
  jh || ((jh = !0), Hw(), _M(), kM(), TM(), Nb(), hb(), K_(), n_());
}
function lT(e, t) {
  return e.whenStable();
}
function nv() {
  let e = [
    {
      provide: Mi,
      useFactory: () => {
        let t = !0;
        return (
          (t = !!p(yn, { optional: !0 })?.get(Eg, null)),
          t && xe("NgHydration"),
          t
        );
      },
    },
    {
      provide: Lt,
      useValue: () => {
        H_(!1), p(Mi) && (dT(), uT());
      },
      multi: !0,
    },
  ];
  return (
    e.push(
      { provide: dg, useFactory: () => p(Mi) },
      {
        provide: Wt,
        useFactory: () => {
          if (p(Mi)) {
            let t = p(Ie),
              n = p(he);
            return () => {
              lT(t, n).then(() => {
                Cm(t);
              });
            };
          }
          return () => {};
        },
        multi: !0,
      }
    ),
    $t(e)
  );
}
function dT() {
  let e = Jr(),
    t;
  for (let n of e.body.childNodes)
    if (n.nodeType === Node.COMMENT_NODE && n.textContent?.trim() === Bw) {
      t = n;
      break;
    }
  if (!t) throw new E(-507, !1);
}
function Cn(e) {
  return typeof e == "boolean" ? e : e != null && e !== "false";
}
function Zs(e, t) {
  xe("NgSignals");
  let n = Gd(e);
  return t?.equal && (n[ke].equal = t.equal), n;
}
function Yt(e) {
  let t = O(null);
  try {
    return e();
  } finally {
    O(t);
  }
}
var Uh = class {
  [ke];
  constructor(t) {
    this[ke] = t;
  }
  destroy() {
    this[ke].destroy();
  }
};
function rv(e) {
  let t = gt(e);
  if (!t) return null;
  let n = new nr(t);
  return {
    get selector() {
      return n.selector;
    },
    get type() {
      return n.componentType;
    },
    get inputs() {
      return n.inputs;
    },
    get outputs() {
      return n.outputs;
    },
    get ngContentSelectors() {
      return n.ngContentSelectors;
    },
    get isStandalone() {
      return t.standalone;
    },
    get isSignal() {
      return t.signals;
    },
  };
}
var Ck = new y("", { providedIn: "platform", factory: () => null });
var av = null;
function st() {
  return av;
}
function cv(e) {
  av ??= e;
}
var Ys = class {};
var oe = new y(""),
  Nl = (() => {
    class e {
      historyGo(n) {
        throw new Error("");
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({
        token: e,
        factory: () => p(fT),
        providedIn: "platform",
      });
    }
    return e;
  })(),
  uv = new y(""),
  fT = (() => {
    class e extends Nl {
      _location;
      _history;
      _doc = p(oe);
      constructor() {
        super(),
          (this._location = window.location),
          (this._history = window.history);
      }
      getBaseHrefFromDOM() {
        return st().getBaseHref(this._doc);
      }
      onPopState(n) {
        let r = st().getGlobalEventTarget(this._doc, "window");
        return (
          r.addEventListener("popstate", n, !1),
          () => r.removeEventListener("popstate", n)
        );
      }
      onHashChange(n) {
        let r = st().getGlobalEventTarget(this._doc, "window");
        return (
          r.addEventListener("hashchange", n, !1),
          () => r.removeEventListener("hashchange", n)
        );
      }
      get href() {
        return this._location.href;
      }
      get protocol() {
        return this._location.protocol;
      }
      get hostname() {
        return this._location.hostname;
      }
      get port() {
        return this._location.port;
      }
      get pathname() {
        return this._location.pathname;
      }
      get search() {
        return this._location.search;
      }
      get hash() {
        return this._location.hash;
      }
      set pathname(n) {
        this._location.pathname = n;
      }
      pushState(n, r, o) {
        this._history.pushState(n, r, o);
      }
      replaceState(n, r, o) {
        this._history.replaceState(n, r, o);
      }
      forward() {
        this._history.forward();
      }
      back() {
        this._history.back();
      }
      historyGo(n = 0) {
        this._history.go(n);
      }
      getState() {
        return this._history.state;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({
        token: e,
        factory: () => new e(),
        providedIn: "platform",
      });
    }
    return e;
  })();
function Al(e, t) {
  if (e.length == 0) return t;
  if (t.length == 0) return e;
  let n = 0;
  return (
    e.endsWith("/") && n++,
    t.startsWith("/") && n++,
    n == 2 ? e + t.substring(1) : n == 1 ? e + t : e + "/" + t
  );
}
function ov(e) {
  let t = e.match(/#|\?|$/),
    n = (t && t.index) || e.length,
    r = n - (e[n - 1] === "/" ? 1 : 0);
  return e.slice(0, r) + e.slice(n);
}
function Mt(e) {
  return e && e[0] !== "?" ? "?" + e : e;
}
var Tt = (() => {
    class e {
      historyGo(n) {
        throw new Error("");
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({ token: e, factory: () => p(Rl), providedIn: "root" });
    }
    return e;
  })(),
  lv = new y(""),
  Rl = (() => {
    class e extends Tt {
      _platformLocation;
      _baseHref;
      _removeListenerFns = [];
      constructor(n, r) {
        super(),
          (this._platformLocation = n),
          (this._baseHref =
            r ??
            this._platformLocation.getBaseHrefFromDOM() ??
            p(oe).location?.origin ??
            "");
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(n) {
        return Al(this._baseHref, n);
      }
      path(n = !1) {
        let r =
            this._platformLocation.pathname + Mt(this._platformLocation.search),
          o = this._platformLocation.hash;
        return o && n ? `${r}${o}` : r;
      }
      pushState(n, r, o, i) {
        let s = this.prepareExternalUrl(o + Mt(i));
        this._platformLocation.pushState(n, r, s);
      }
      replaceState(n, r, o, i) {
        let s = this.prepareExternalUrl(o + Mt(i));
        this._platformLocation.replaceState(n, r, s);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
      static ɵfac = function (r) {
        return new (r || e)(I(Nl), I(lv, 8));
      };
      static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  dv = (() => {
    class e extends Tt {
      _platformLocation;
      _baseHref = "";
      _removeListenerFns = [];
      constructor(n, r) {
        super(),
          (this._platformLocation = n),
          r != null && (this._baseHref = r);
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      path(n = !1) {
        let r = this._platformLocation.hash ?? "#";
        return r.length > 0 ? r.substring(1) : r;
      }
      prepareExternalUrl(n) {
        let r = Al(this._baseHref, n);
        return r.length > 0 ? "#" + r : r;
      }
      pushState(n, r, o, i) {
        let s = this.prepareExternalUrl(o + Mt(i));
        s.length == 0 && (s = this._platformLocation.pathname),
          this._platformLocation.pushState(n, r, s);
      }
      replaceState(n, r, o, i) {
        let s = this.prepareExternalUrl(o + Mt(i));
        s.length == 0 && (s = this._platformLocation.pathname),
          this._platformLocation.replaceState(n, r, s);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
      static ɵfac = function (r) {
        return new (r || e)(I(Nl), I(lv, 8));
      };
      static ɵprov = C({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  fr = (() => {
    class e {
      _subject = new te();
      _basePath;
      _locationStrategy;
      _urlChangeListeners = [];
      _urlChangeSubscription = null;
      constructor(n) {
        this._locationStrategy = n;
        let r = this._locationStrategy.getBaseHref();
        (this._basePath = gT(ov(iv(r)))),
          this._locationStrategy.onPopState((o) => {
            this._subject.next({
              url: this.path(!0),
              pop: !0,
              state: o.state,
              type: o.type,
            });
          });
      }
      ngOnDestroy() {
        this._urlChangeSubscription?.unsubscribe(),
          (this._urlChangeListeners = []);
      }
      path(n = !1) {
        return this.normalize(this._locationStrategy.path(n));
      }
      getState() {
        return this._locationStrategy.getState();
      }
      isCurrentPathEqualTo(n, r = "") {
        return this.path() == this.normalize(n + Mt(r));
      }
      normalize(n) {
        return e.stripTrailingSlash(pT(this._basePath, iv(n)));
      }
      prepareExternalUrl(n) {
        return (
          n && n[0] !== "/" && (n = "/" + n),
          this._locationStrategy.prepareExternalUrl(n)
        );
      }
      go(n, r = "", o = null) {
        this._locationStrategy.pushState(o, "", n, r),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Mt(r)), o);
      }
      replaceState(n, r = "", o = null) {
        this._locationStrategy.replaceState(o, "", n, r),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Mt(r)), o);
      }
      forward() {
        this._locationStrategy.forward();
      }
      back() {
        this._locationStrategy.back();
      }
      historyGo(n = 0) {
        this._locationStrategy.historyGo?.(n);
      }
      onUrlChange(n) {
        return (
          this._urlChangeListeners.push(n),
          (this._urlChangeSubscription ??= this.subscribe((r) => {
            this._notifyUrlChangeListeners(r.url, r.state);
          })),
          () => {
            let r = this._urlChangeListeners.indexOf(n);
            this._urlChangeListeners.splice(r, 1),
              this._urlChangeListeners.length === 0 &&
                (this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeSubscription = null));
          }
        );
      }
      _notifyUrlChangeListeners(n = "", r) {
        this._urlChangeListeners.forEach((o) => o(n, r));
      }
      subscribe(n, r, o) {
        return this._subject.subscribe({
          next: n,
          error: r ?? void 0,
          complete: o ?? void 0,
        });
      }
      static normalizeQueryParams = Mt;
      static joinWithSlash = Al;
      static stripTrailingSlash = ov;
      static ɵfac = function (r) {
        return new (r || e)(I(Tt));
      };
      static ɵprov = C({ token: e, factory: () => hT(), providedIn: "root" });
    }
    return e;
  })();
function hT() {
  return new fr(I(Tt));
}
function pT(e, t) {
  if (!e || !t.startsWith(e)) return t;
  let n = t.substring(e.length);
  return n === "" || ["/", ";", "?", "#"].includes(n[0]) ? n : t;
}
function iv(e) {
  return e.replace(/\/index.html$/, "");
}
function gT(e) {
  if (new RegExp("^(https?:)?//").test(e)) {
    let [, n] = e.split(/\/\/[^\/]+/);
    return n;
  }
  return e;
}
function Ks(e, t) {
  t = encodeURIComponent(t);
  for (let n of e.split(";")) {
    let r = n.indexOf("="),
      [o, i] = r == -1 ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
    if (o.trim() === t) return decodeURIComponent(i);
  }
  return null;
}
var Ml = /\s+/,
  sv = [],
  Yk = (() => {
    class e {
      _ngEl;
      _renderer;
      initialClasses = sv;
      rawClass;
      stateMap = new Map();
      constructor(n, r) {
        (this._ngEl = n), (this._renderer = r);
      }
      set klass(n) {
        this.initialClasses = n != null ? n.trim().split(Ml) : sv;
      }
      set ngClass(n) {
        this.rawClass = typeof n == "string" ? n.trim().split(Ml) : n;
      }
      ngDoCheck() {
        for (let r of this.initialClasses) this._updateState(r, !0);
        let n = this.rawClass;
        if (Array.isArray(n) || n instanceof Set)
          for (let r of n) this._updateState(r, !0);
        else if (n != null)
          for (let r of Object.keys(n)) this._updateState(r, !!n[r]);
        this._applyStateDiff();
      }
      _updateState(n, r) {
        let o = this.stateMap.get(n);
        o !== void 0
          ? (o.enabled !== r && ((o.changed = !0), (o.enabled = r)),
            (o.touched = !0))
          : this.stateMap.set(n, { enabled: r, changed: !0, touched: !0 });
      }
      _applyStateDiff() {
        for (let n of this.stateMap) {
          let r = n[0],
            o = n[1];
          o.changed
            ? (this._toggleClass(r, o.enabled), (o.changed = !1))
            : o.touched ||
              (o.enabled && this._toggleClass(r, !1), this.stateMap.delete(r)),
            (o.touched = !1);
        }
      }
      _toggleClass(n, r) {
        (n = n.trim()),
          n.length > 0 &&
            n.split(Ml).forEach((o) => {
              r
                ? this._renderer.addClass(this._ngEl.nativeElement, o)
                : this._renderer.removeClass(this._ngEl.nativeElement, o);
            });
      }
      static ɵfac = function (r) {
        return new (r || e)(V(Ue), V(Qe));
      };
      static ɵdir = ue({
        type: e,
        selectors: [["", "ngClass", ""]],
        inputs: { klass: [0, "class", "klass"], ngClass: "ngClass" },
      });
    }
    return e;
  })();
var Kk = (() => {
  class e {
    _ngEl;
    _differs;
    _renderer;
    _ngStyle = null;
    _differ = null;
    constructor(n, r, o) {
      (this._ngEl = n), (this._differs = r), (this._renderer = o);
    }
    set ngStyle(n) {
      (this._ngStyle = n),
        !this._differ && n && (this._differ = this._differs.find(n).create());
    }
    ngDoCheck() {
      if (this._differ) {
        let n = this._differ.diff(this._ngStyle);
        n && this._applyChanges(n);
      }
    }
    _setStyle(n, r) {
      let [o, i] = n.split("."),
        s = o.indexOf("-") === -1 ? void 0 : nt.DashCase;
      r != null
        ? this._renderer.setStyle(
            this._ngEl.nativeElement,
            o,
            i ? `${r}${i}` : r,
            s
          )
        : this._renderer.removeStyle(this._ngEl.nativeElement, o, s);
    }
    _applyChanges(n) {
      n.forEachRemovedItem((r) => this._setStyle(r.key, null)),
        n.forEachAddedItem((r) => this._setStyle(r.key, r.currentValue)),
        n.forEachChangedItem((r) => this._setStyle(r.key, r.currentValue));
    }
    static ɵfac = function (r) {
      return new (r || e)(V(Ue), V(bl), V(Qe));
    };
    static ɵdir = ue({
      type: e,
      selectors: [["", "ngStyle", ""]],
      inputs: { ngStyle: "ngStyle" },
    });
  }
  return e;
})();
var mT = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵmod = _t({ type: e });
      static ɵinj = Et({});
    }
    return e;
  })(),
  fv = "browser",
  vT = "server";
function xl(e) {
  return e === vT;
}
var hv = (() => {
    class e {
      static ɵprov = C({
        token: e,
        providedIn: "root",
        factory: () => new Tl(p(oe), window),
      });
    }
    return e;
  })(),
  Tl = class {
    document;
    window;
    offset = () => [0, 0];
    constructor(t, n) {
      (this.document = t), (this.window = n);
    }
    setOffset(t) {
      Array.isArray(t) ? (this.offset = () => t) : (this.offset = t);
    }
    getScrollPosition() {
      return [this.window.scrollX, this.window.scrollY];
    }
    scrollToPosition(t) {
      this.window.scrollTo(t[0], t[1]);
    }
    scrollToAnchor(t) {
      let n = yT(this.document, t);
      n && (this.scrollToElement(n), n.focus());
    }
    setHistoryScrollRestoration(t) {
      this.window.history.scrollRestoration = t;
    }
    scrollToElement(t) {
      let n = t.getBoundingClientRect(),
        r = n.left + this.window.pageXOffset,
        o = n.top + this.window.pageYOffset,
        i = this.offset();
      this.window.scrollTo(r - i[0], o - i[1]);
    }
  };
function yT(e, t) {
  let n = e.getElementById(t) || e.getElementsByName(t)[0];
  if (n) return n;
  if (
    typeof e.createTreeWalker == "function" &&
    e.body &&
    typeof e.body.attachShadow == "function"
  ) {
    let r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT),
      o = r.currentNode;
    for (; o; ) {
      let i = o.shadowRoot;
      if (i) {
        let s = i.getElementById(t) || i.querySelector(`[name="${t}"]`);
        if (s) return s;
      }
      o = r.nextNode();
    }
  }
  return null;
}
var dr = class {};
var uo = class {},
  lo = class {},
  at = class e {
    headers;
    normalizedNames = new Map();
    lazyInit;
    lazyUpdate = null;
    constructor(t) {
      t
        ? typeof t == "string"
          ? (this.lazyInit = () => {
              (this.headers = new Map()),
                t
                  .split(
                    `
`
                  )
                  .forEach((n) => {
                    let r = n.indexOf(":");
                    if (r > 0) {
                      let o = n.slice(0, r),
                        i = n.slice(r + 1).trim();
                      this.addHeaderEntry(o, i);
                    }
                  });
            })
          : typeof Headers < "u" && t instanceof Headers
          ? ((this.headers = new Map()),
            t.forEach((n, r) => {
              this.addHeaderEntry(r, n);
            }))
          : (this.lazyInit = () => {
              (this.headers = new Map()),
                Object.entries(t).forEach(([n, r]) => {
                  this.setHeaderEntries(n, r);
                });
            })
        : (this.headers = new Map());
    }
    has(t) {
      return this.init(), this.headers.has(t.toLowerCase());
    }
    get(t) {
      this.init();
      let n = this.headers.get(t.toLowerCase());
      return n && n.length > 0 ? n[0] : null;
    }
    keys() {
      return this.init(), Array.from(this.normalizedNames.values());
    }
    getAll(t) {
      return this.init(), this.headers.get(t.toLowerCase()) || null;
    }
    append(t, n) {
      return this.clone({ name: t, value: n, op: "a" });
    }
    set(t, n) {
      return this.clone({ name: t, value: n, op: "s" });
    }
    delete(t, n) {
      return this.clone({ name: t, value: n, op: "d" });
    }
    maybeSetNormalizedName(t, n) {
      this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
    }
    init() {
      this.lazyInit &&
        (this.lazyInit instanceof e
          ? this.copyFrom(this.lazyInit)
          : this.lazyInit(),
        (this.lazyInit = null),
        this.lazyUpdate &&
          (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
          (this.lazyUpdate = null)));
    }
    copyFrom(t) {
      t.init(),
        Array.from(t.headers.keys()).forEach((n) => {
          this.headers.set(n, t.headers.get(n)),
            this.normalizedNames.set(n, t.normalizedNames.get(n));
        });
    }
    clone(t) {
      let n = new e();
      return (
        (n.lazyInit =
          this.lazyInit && this.lazyInit instanceof e ? this.lazyInit : this),
        (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
        n
      );
    }
    applyUpdate(t) {
      let n = t.name.toLowerCase();
      switch (t.op) {
        case "a":
        case "s":
          let r = t.value;
          if ((typeof r == "string" && (r = [r]), r.length === 0)) return;
          this.maybeSetNormalizedName(t.name, n);
          let o = (t.op === "a" ? this.headers.get(n) : void 0) || [];
          o.push(...r), this.headers.set(n, o);
          break;
        case "d":
          let i = t.value;
          if (!i) this.headers.delete(n), this.normalizedNames.delete(n);
          else {
            let s = this.headers.get(n);
            if (!s) return;
            (s = s.filter((a) => i.indexOf(a) === -1)),
              s.length === 0
                ? (this.headers.delete(n), this.normalizedNames.delete(n))
                : this.headers.set(n, s);
          }
          break;
      }
    }
    addHeaderEntry(t, n) {
      let r = t.toLowerCase();
      this.maybeSetNormalizedName(t, r),
        this.headers.has(r)
          ? this.headers.get(r).push(n)
          : this.headers.set(r, [n]);
    }
    setHeaderEntries(t, n) {
      let r = (Array.isArray(n) ? n : [n]).map((i) => i.toString()),
        o = t.toLowerCase();
      this.headers.set(o, r), this.maybeSetNormalizedName(t, o);
    }
    forEach(t) {
      this.init(),
        Array.from(this.normalizedNames.keys()).forEach((n) =>
          t(this.normalizedNames.get(n), this.headers.get(n))
        );
    }
  };
var Fl = class {
  encodeKey(t) {
    return gv(t);
  }
  encodeValue(t) {
    return gv(t);
  }
  decodeKey(t) {
    return decodeURIComponent(t);
  }
  decodeValue(t) {
    return decodeURIComponent(t);
  }
};
function DT(e, t) {
  let n = new Map();
  return (
    e.length > 0 &&
      e
        .replace(/^\?/, "")
        .split("&")
        .forEach((o) => {
          let i = o.indexOf("="),
            [s, a] =
              i == -1
                ? [t.decodeKey(o), ""]
                : [t.decodeKey(o.slice(0, i)), t.decodeValue(o.slice(i + 1))],
            c = n.get(s) || [];
          c.push(a), n.set(s, c);
        }),
    n
  );
}
var ET = /%(\d[a-f0-9])/gi,
  CT = {
    40: "@",
    "3A": ":",
    24: "$",
    "2C": ",",
    "3B": ";",
    "3D": "=",
    "3F": "?",
    "2F": "/",
  };
function gv(e) {
  return encodeURIComponent(e).replace(ET, (t, n) => CT[n] ?? t);
}
function Qs(e) {
  return `${e}`;
}
var Qt = class e {
  map;
  encoder;
  updates = null;
  cloneFrom = null;
  constructor(t = {}) {
    if (((this.encoder = t.encoder || new Fl()), t.fromString)) {
      if (t.fromObject) throw new E(2805, !1);
      this.map = DT(t.fromString, this.encoder);
    } else
      t.fromObject
        ? ((this.map = new Map()),
          Object.keys(t.fromObject).forEach((n) => {
            let r = t.fromObject[n],
              o = Array.isArray(r) ? r.map(Qs) : [Qs(r)];
            this.map.set(n, o);
          }))
        : (this.map = null);
  }
  has(t) {
    return this.init(), this.map.has(t);
  }
  get(t) {
    this.init();
    let n = this.map.get(t);
    return n ? n[0] : null;
  }
  getAll(t) {
    return this.init(), this.map.get(t) || null;
  }
  keys() {
    return this.init(), Array.from(this.map.keys());
  }
  append(t, n) {
    return this.clone({ param: t, value: n, op: "a" });
  }
  appendAll(t) {
    let n = [];
    return (
      Object.keys(t).forEach((r) => {
        let o = t[r];
        Array.isArray(o)
          ? o.forEach((i) => {
              n.push({ param: r, value: i, op: "a" });
            })
          : n.push({ param: r, value: o, op: "a" });
      }),
      this.clone(n)
    );
  }
  set(t, n) {
    return this.clone({ param: t, value: n, op: "s" });
  }
  delete(t, n) {
    return this.clone({ param: t, value: n, op: "d" });
  }
  toString() {
    return (
      this.init(),
      this.keys()
        .map((t) => {
          let n = this.encoder.encodeKey(t);
          return this.map
            .get(t)
            .map((r) => n + "=" + this.encoder.encodeValue(r))
            .join("&");
        })
        .filter((t) => t !== "")
        .join("&")
    );
  }
  clone(t) {
    let n = new e({ encoder: this.encoder });
    return (
      (n.cloneFrom = this.cloneFrom || this),
      (n.updates = (this.updates || []).concat(t)),
      n
    );
  }
  init() {
    this.map === null && (this.map = new Map()),
      this.cloneFrom !== null &&
        (this.cloneFrom.init(),
        this.cloneFrom
          .keys()
          .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
        this.updates.forEach((t) => {
          switch (t.op) {
            case "a":
            case "s":
              let n = (t.op === "a" ? this.map.get(t.param) : void 0) || [];
              n.push(Qs(t.value)), this.map.set(t.param, n);
              break;
            case "d":
              if (t.value !== void 0) {
                let r = this.map.get(t.param) || [],
                  o = r.indexOf(Qs(t.value));
                o !== -1 && r.splice(o, 1),
                  r.length > 0
                    ? this.map.set(t.param, r)
                    : this.map.delete(t.param);
              } else {
                this.map.delete(t.param);
                break;
              }
          }
        }),
        (this.cloneFrom = this.updates = null));
  }
};
var kl = class {
  map = new Map();
  set(t, n) {
    return this.map.set(t, n), this;
  }
  get(t) {
    return (
      this.map.has(t) || this.map.set(t, t.defaultValue()), this.map.get(t)
    );
  }
  delete(t) {
    return this.map.delete(t), this;
  }
  has(t) {
    return this.map.has(t);
  }
  keys() {
    return this.map.keys();
  }
};
function wT(e) {
  switch (e) {
    case "DELETE":
    case "GET":
    case "HEAD":
    case "OPTIONS":
    case "JSONP":
      return !1;
    default:
      return !0;
  }
}
function mv(e) {
  return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
}
function vv(e) {
  return typeof Blob < "u" && e instanceof Blob;
}
function yv(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
function IT(e) {
  return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
}
var ao = "Content-Type",
  jl = "X-Request-URL",
  Iv = "text/plain",
  _v = "application/json",
  bv = `${_v}, ${Iv}, */*`,
  co = class e {
    url;
    body = null;
    headers;
    context;
    reportProgress = !1;
    withCredentials = !1;
    responseType = "json";
    method;
    params;
    urlWithParams;
    transferCache;
    constructor(t, n, r, o) {
      (this.url = n), (this.method = t.toUpperCase());
      let i;
      if (
        (wT(this.method) || o
          ? ((this.body = r !== void 0 ? r : null), (i = o))
          : (i = r),
        i &&
          ((this.reportProgress = !!i.reportProgress),
          (this.withCredentials = !!i.withCredentials),
          i.responseType && (this.responseType = i.responseType),
          i.headers && (this.headers = i.headers),
          i.context && (this.context = i.context),
          i.params && (this.params = i.params),
          (this.transferCache = i.transferCache)),
        (this.headers ??= new at()),
        (this.context ??= new kl()),
        !this.params)
      )
        (this.params = new Qt()), (this.urlWithParams = n);
      else {
        let s = this.params.toString();
        if (s.length === 0) this.urlWithParams = n;
        else {
          let a = n.indexOf("?"),
            c = a === -1 ? "?" : a < n.length - 1 ? "&" : "";
          this.urlWithParams = n + c + s;
        }
      }
    }
    serializeBody() {
      return this.body === null
        ? null
        : typeof this.body == "string" ||
          mv(this.body) ||
          vv(this.body) ||
          yv(this.body) ||
          IT(this.body)
        ? this.body
        : this.body instanceof Qt
        ? this.body.toString()
        : typeof this.body == "object" ||
          typeof this.body == "boolean" ||
          Array.isArray(this.body)
        ? JSON.stringify(this.body)
        : this.body.toString();
    }
    detectContentTypeHeader() {
      return this.body === null || yv(this.body)
        ? null
        : vv(this.body)
        ? this.body.type || null
        : mv(this.body)
        ? null
        : typeof this.body == "string"
        ? Iv
        : this.body instanceof Qt
        ? "application/x-www-form-urlencoded;charset=UTF-8"
        : typeof this.body == "object" ||
          typeof this.body == "number" ||
          typeof this.body == "boolean"
        ? _v
        : null;
    }
    clone(t = {}) {
      let n = t.method || this.method,
        r = t.url || this.url,
        o = t.responseType || this.responseType,
        i = t.transferCache ?? this.transferCache,
        s = t.body !== void 0 ? t.body : this.body,
        a = t.withCredentials ?? this.withCredentials,
        c = t.reportProgress ?? this.reportProgress,
        u = t.headers || this.headers,
        l = t.params || this.params,
        d = t.context ?? this.context;
      return (
        t.setHeaders !== void 0 &&
          (u = Object.keys(t.setHeaders).reduce(
            (h, f) => h.set(f, t.setHeaders[f]),
            u
          )),
        t.setParams &&
          (l = Object.keys(t.setParams).reduce(
            (h, f) => h.set(f, t.setParams[f]),
            l
          )),
        new e(n, r, s, {
          params: l,
          headers: u,
          context: d,
          reportProgress: c,
          responseType: o,
          withCredentials: a,
          transferCache: i,
        })
      );
    }
  },
  Xt = (function (e) {
    return (
      (e[(e.Sent = 0)] = "Sent"),
      (e[(e.UploadProgress = 1)] = "UploadProgress"),
      (e[(e.ResponseHeader = 2)] = "ResponseHeader"),
      (e[(e.DownloadProgress = 3)] = "DownloadProgress"),
      (e[(e.Response = 4)] = "Response"),
      (e[(e.User = 5)] = "User"),
      e
    );
  })(Xt || {}),
  fo = class {
    headers;
    status;
    statusText;
    url;
    ok;
    type;
    constructor(t, n = 200, r = "OK") {
      (this.headers = t.headers || new at()),
        (this.status = t.status !== void 0 ? t.status : n),
        (this.statusText = t.statusText || r),
        (this.url = t.url || null),
        (this.ok = this.status >= 200 && this.status < 300);
    }
  },
  Js = class e extends fo {
    constructor(t = {}) {
      super(t);
    }
    type = Xt.ResponseHeader;
    clone(t = {}) {
      return new e({
        headers: t.headers || this.headers,
        status: t.status !== void 0 ? t.status : this.status,
        statusText: t.statusText || this.statusText,
        url: t.url || this.url || void 0,
      });
    }
  },
  wn = class e extends fo {
    body;
    constructor(t = {}) {
      super(t), (this.body = t.body !== void 0 ? t.body : null);
    }
    type = Xt.Response;
    clone(t = {}) {
      return new e({
        body: t.body !== void 0 ? t.body : this.body,
        headers: t.headers || this.headers,
        status: t.status !== void 0 ? t.status : this.status,
        statusText: t.statusText || this.statusText,
        url: t.url || this.url || void 0,
      });
    }
  },
  Kt = class extends fo {
    name = "HttpErrorResponse";
    message;
    error;
    ok = !1;
    constructor(t) {
      super(t, 0, "Unknown Error"),
        this.status >= 200 && this.status < 300
          ? (this.message = `Http failure during parsing for ${
              t.url || "(unknown url)"
            }`)
          : (this.message = `Http failure response for ${
              t.url || "(unknown url)"
            }: ${t.status} ${t.statusText}`),
        (this.error = t.error || null);
    }
  },
  Mv = 200,
  _T = 204;
function Ol(e, t) {
  return {
    body: t,
    headers: e.headers,
    context: e.context,
    observe: e.observe,
    params: e.params,
    reportProgress: e.reportProgress,
    responseType: e.responseType,
    withCredentials: e.withCredentials,
    transferCache: e.transferCache,
  };
}
var bT = (() => {
    class e {
      handler;
      constructor(n) {
        this.handler = n;
      }
      request(n, r, o = {}) {
        let i;
        if (n instanceof co) i = n;
        else {
          let c;
          o.headers instanceof at ? (c = o.headers) : (c = new at(o.headers));
          let u;
          o.params &&
            (o.params instanceof Qt
              ? (u = o.params)
              : (u = new Qt({ fromObject: o.params }))),
            (i = new co(n, r, o.body !== void 0 ? o.body : null, {
              headers: c,
              context: o.context,
              params: u,
              reportProgress: o.reportProgress,
              responseType: o.responseType || "json",
              withCredentials: o.withCredentials,
              transferCache: o.transferCache,
            }));
        }
        let s = M(i).pipe(ft((c) => this.handler.handle(c)));
        if (n instanceof co || o.observe === "events") return s;
        let a = s.pipe(ye((c) => c instanceof wn));
        switch (o.observe || "body") {
          case "body":
            switch (i.responseType) {
              case "arraybuffer":
                return a.pipe(
                  N((c) => {
                    if (c.body !== null && !(c.body instanceof ArrayBuffer))
                      throw new Error("Response is not an ArrayBuffer.");
                    return c.body;
                  })
                );
              case "blob":
                return a.pipe(
                  N((c) => {
                    if (c.body !== null && !(c.body instanceof Blob))
                      throw new Error("Response is not a Blob.");
                    return c.body;
                  })
                );
              case "text":
                return a.pipe(
                  N((c) => {
                    if (c.body !== null && typeof c.body != "string")
                      throw new Error("Response is not a string.");
                    return c.body;
                  })
                );
              case "json":
              default:
                return a.pipe(N((c) => c.body));
            }
          case "response":
            return a;
          default:
            throw new Error(
              `Unreachable: unhandled observe type ${o.observe}}`
            );
        }
      }
      delete(n, r = {}) {
        return this.request("DELETE", n, r);
      }
      get(n, r = {}) {
        return this.request("GET", n, r);
      }
      head(n, r = {}) {
        return this.request("HEAD", n, r);
      }
      jsonp(n, r) {
        return this.request("JSONP", n, {
          params: new Qt().append(r, "JSONP_CALLBACK"),
          observe: "body",
          responseType: "json",
        });
      }
      options(n, r = {}) {
        return this.request("OPTIONS", n, r);
      }
      patch(n, r, o = {}) {
        return this.request("PATCH", n, Ol(o, r));
      }
      post(n, r, o = {}) {
        return this.request("POST", n, Ol(o, r));
      }
      put(n, r, o = {}) {
        return this.request("PUT", n, Ol(o, r));
      }
      static ɵfac = function (r) {
        return new (r || e)(I(uo));
      };
      static ɵprov = C({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  MT = /^\)\]\}',?\n/;
function Dv(e) {
  if (e.url) return e.url;
  let t = jl.toLocaleLowerCase();
  return e.headers.get(t);
}
var Tv = new y(""),
  Pl = (() => {
    class e {
      fetchImpl =
        p(Ll, { optional: !0 })?.fetch ?? ((...n) => globalThis.fetch(...n));
      ngZone = p(G);
      handle(n) {
        return new j((r) => {
          let o = new AbortController();
          return (
            this.doRequest(n, o.signal, r).then(Vl, (i) =>
              r.error(new Kt({ error: i }))
            ),
            () => o.abort()
          );
        });
      }
      doRequest(n, r, o) {
        return nn(this, null, function* () {
          let i = this.createRequestInit(n),
            s;
          try {
            let f = this.ngZone.runOutsideAngular(() =>
              this.fetchImpl(n.urlWithParams, v({ signal: r }, i))
            );
            TT(f), o.next({ type: Xt.Sent }), (s = yield f);
          } catch (f) {
            o.error(
              new Kt({
                error: f,
                status: f.status ?? 0,
                statusText: f.statusText,
                url: n.urlWithParams,
                headers: f.headers,
              })
            );
            return;
          }
          let a = new at(s.headers),
            c = s.statusText,
            u = Dv(s) ?? n.urlWithParams,
            l = s.status,
            d = null;
          if (
            (n.reportProgress &&
              o.next(new Js({ headers: a, status: l, statusText: c, url: u })),
            s.body)
          ) {
            let f = s.headers.get("content-length"),
              g = [],
              m = s.body.getReader(),
              D = 0,
              w,
              B,
              x = typeof Zone < "u" && Zone.current;
            yield this.ngZone.runOutsideAngular(() =>
              nn(this, null, function* () {
                for (;;) {
                  let { done: Y, value: J } = yield m.read();
                  if (Y) break;
                  if ((g.push(J), (D += J.length), n.reportProgress)) {
                    B =
                      n.responseType === "text"
                        ? (B ?? "") +
                          (w ??= new TextDecoder()).decode(J, { stream: !0 })
                        : void 0;
                    let lt = () =>
                      o.next({
                        type: Xt.DownloadProgress,
                        total: f ? +f : void 0,
                        loaded: D,
                        partialText: B,
                      });
                    x ? x.run(lt) : lt();
                  }
                }
              })
            );
            let W = this.concatChunks(g, D);
            try {
              let Y = s.headers.get(ao) ?? "";
              d = this.parseBody(n, W, Y);
            } catch (Y) {
              o.error(
                new Kt({
                  error: Y,
                  headers: new at(s.headers),
                  status: s.status,
                  statusText: s.statusText,
                  url: Dv(s) ?? n.urlWithParams,
                })
              );
              return;
            }
          }
          l === 0 && (l = d ? Mv : 0),
            l >= 200 && l < 300
              ? (o.next(
                  new wn({
                    body: d,
                    headers: a,
                    status: l,
                    statusText: c,
                    url: u,
                  })
                ),
                o.complete())
              : o.error(
                  new Kt({
                    error: d,
                    headers: a,
                    status: l,
                    statusText: c,
                    url: u,
                  })
                );
        });
      }
      parseBody(n, r, o) {
        switch (n.responseType) {
          case "json":
            let i = new TextDecoder().decode(r).replace(MT, "");
            return i === "" ? null : JSON.parse(i);
          case "text":
            return new TextDecoder().decode(r);
          case "blob":
            return new Blob([r], { type: o });
          case "arraybuffer":
            return r.buffer;
        }
      }
      createRequestInit(n) {
        let r = {},
          o = n.withCredentials ? "include" : void 0;
        if (
          (n.headers.forEach((i, s) => (r[i] = s.join(","))),
          n.headers.has("Accept") || (r.Accept = bv),
          !n.headers.has(ao))
        ) {
          let i = n.detectContentTypeHeader();
          i !== null && (r[ao] = i);
        }
        return {
          body: n.serializeBody(),
          method: n.method,
          headers: r,
          credentials: o,
        };
      }
      concatChunks(n, r) {
        let o = new Uint8Array(r),
          i = 0;
        for (let s of n) o.set(s, i), (i += s.length);
        return o;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Ll = class {};
function Vl() {}
function TT(e) {
  e.then(Vl, Vl);
}
function ST(e, t) {
  return t(e);
}
function NT(e, t, n) {
  return (r, o) => _e(n, () => t(r, (i) => e(i, o)));
}
var Sv = new y(""),
  Nv = new y(""),
  AT = new y("", { providedIn: "root", factory: () => !0 });
var Ev = (() => {
  class e extends uo {
    backend;
    injector;
    chain = null;
    pendingTasks = p(it);
    contributeToStability = p(AT);
    constructor(n, r) {
      super(), (this.backend = n), (this.injector = r);
    }
    handle(n) {
      if (this.chain === null) {
        let r = Array.from(
          new Set([...this.injector.get(Sv), ...this.injector.get(Nv, [])])
        );
        this.chain = r.reduceRight((o, i) => NT(o, i, this.injector), ST);
      }
      if (this.contributeToStability) {
        let r = this.pendingTasks.add();
        return this.chain(n, (o) => this.backend.handle(o)).pipe(
          an(() => this.pendingTasks.remove(r))
        );
      } else return this.chain(n, (r) => this.backend.handle(r));
    }
    static ɵfac = function (r) {
      return new (r || e)(I(lo), I(fe));
    };
    static ɵprov = C({ token: e, factory: e.ɵfac });
  }
  return e;
})();
var RT = /^\)\]\}',?\n/,
  xT = RegExp(`^${jl}:`, "m");
function OT(e) {
  return "responseURL" in e && e.responseURL
    ? e.responseURL
    : xT.test(e.getAllResponseHeaders())
    ? e.getResponseHeader(jl)
    : null;
}
var Cv = (() => {
    class e {
      xhrFactory;
      constructor(n) {
        this.xhrFactory = n;
      }
      handle(n) {
        if (n.method === "JSONP") throw new E(-2800, !1);
        let r = this.xhrFactory;
        return (r.ɵloadImpl ? z(r.ɵloadImpl()) : M(null)).pipe(
          De(
            () =>
              new j((i) => {
                let s = r.build();
                if (
                  (s.open(n.method, n.urlWithParams),
                  n.withCredentials && (s.withCredentials = !0),
                  n.headers.forEach((m, D) =>
                    s.setRequestHeader(m, D.join(","))
                  ),
                  n.headers.has("Accept") || s.setRequestHeader("Accept", bv),
                  !n.headers.has(ao))
                ) {
                  let m = n.detectContentTypeHeader();
                  m !== null && s.setRequestHeader(ao, m);
                }
                if (n.responseType) {
                  let m = n.responseType.toLowerCase();
                  s.responseType = m !== "json" ? m : "text";
                }
                let a = n.serializeBody(),
                  c = null,
                  u = () => {
                    if (c !== null) return c;
                    let m = s.statusText || "OK",
                      D = new at(s.getAllResponseHeaders()),
                      w = OT(s) || n.url;
                    return (
                      (c = new Js({
                        headers: D,
                        status: s.status,
                        statusText: m,
                        url: w,
                      })),
                      c
                    );
                  },
                  l = () => {
                    let { headers: m, status: D, statusText: w, url: B } = u(),
                      x = null;
                    D !== _T &&
                      (x =
                        typeof s.response > "u" ? s.responseText : s.response),
                      D === 0 && (D = x ? Mv : 0);
                    let W = D >= 200 && D < 300;
                    if (n.responseType === "json" && typeof x == "string") {
                      let Y = x;
                      x = x.replace(RT, "");
                      try {
                        x = x !== "" ? JSON.parse(x) : null;
                      } catch (J) {
                        (x = Y), W && ((W = !1), (x = { error: J, text: x }));
                      }
                    }
                    W
                      ? (i.next(
                          new wn({
                            body: x,
                            headers: m,
                            status: D,
                            statusText: w,
                            url: B || void 0,
                          })
                        ),
                        i.complete())
                      : i.error(
                          new Kt({
                            error: x,
                            headers: m,
                            status: D,
                            statusText: w,
                            url: B || void 0,
                          })
                        );
                  },
                  d = (m) => {
                    let { url: D } = u(),
                      w = new Kt({
                        error: m,
                        status: s.status || 0,
                        statusText: s.statusText || "Unknown Error",
                        url: D || void 0,
                      });
                    i.error(w);
                  },
                  h = !1,
                  f = (m) => {
                    h || (i.next(u()), (h = !0));
                    let D = { type: Xt.DownloadProgress, loaded: m.loaded };
                    m.lengthComputable && (D.total = m.total),
                      n.responseType === "text" &&
                        s.responseText &&
                        (D.partialText = s.responseText),
                      i.next(D);
                  },
                  g = (m) => {
                    let D = { type: Xt.UploadProgress, loaded: m.loaded };
                    m.lengthComputable && (D.total = m.total), i.next(D);
                  };
                return (
                  s.addEventListener("load", l),
                  s.addEventListener("error", d),
                  s.addEventListener("timeout", d),
                  s.addEventListener("abort", d),
                  n.reportProgress &&
                    (s.addEventListener("progress", f),
                    a !== null &&
                      s.upload &&
                      s.upload.addEventListener("progress", g)),
                  s.send(a),
                  i.next({ type: Xt.Sent }),
                  () => {
                    s.removeEventListener("error", d),
                      s.removeEventListener("abort", d),
                      s.removeEventListener("load", l),
                      s.removeEventListener("timeout", d),
                      n.reportProgress &&
                        (s.removeEventListener("progress", f),
                        a !== null &&
                          s.upload &&
                          s.upload.removeEventListener("progress", g)),
                      s.readyState !== s.DONE && s.abort();
                  }
                );
              })
          )
        );
      }
      static ɵfac = function (r) {
        return new (r || e)(I(dr));
      };
      static ɵprov = C({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Av = new y(""),
  PT = "XSRF-TOKEN",
  FT = new y("", { providedIn: "root", factory: () => PT }),
  kT = "X-XSRF-TOKEN",
  LT = new y("", { providedIn: "root", factory: () => kT }),
  ea = class {},
  VT = (() => {
    class e {
      doc;
      platform;
      cookieName;
      lastCookieString = "";
      lastToken = null;
      parseCount = 0;
      constructor(n, r, o) {
        (this.doc = n), (this.platform = r), (this.cookieName = o);
      }
      getToken() {
        if (this.platform === "server") return null;
        let n = this.doc.cookie || "";
        return (
          n !== this.lastCookieString &&
            (this.parseCount++,
            (this.lastToken = Ks(n, this.cookieName)),
            (this.lastCookieString = n)),
          this.lastToken
        );
      }
      static ɵfac = function (r) {
        return new (r || e)(I(oe), I(Ct), I(FT));
      };
      static ɵprov = C({ token: e, factory: e.ɵfac });
    }
    return e;
  })();
function jT(e, t) {
  let n = e.url.toLowerCase();
  if (
    !p(Av) ||
    e.method === "GET" ||
    e.method === "HEAD" ||
    n.startsWith("http://") ||
    n.startsWith("https://")
  )
    return t(e);
  let r = p(ea).getToken(),
    o = p(LT);
  return (
    r != null &&
      !e.headers.has(o) &&
      (e = e.clone({ headers: e.headers.set(o, r) })),
    t(e)
  );
}
var Rv = (function (e) {
  return (
    (e[(e.Interceptors = 0)] = "Interceptors"),
    (e[(e.LegacyInterceptors = 1)] = "LegacyInterceptors"),
    (e[(e.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
    (e[(e.NoXsrfProtection = 3)] = "NoXsrfProtection"),
    (e[(e.JsonpSupport = 4)] = "JsonpSupport"),
    (e[(e.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
    (e[(e.Fetch = 6)] = "Fetch"),
    e
  );
})(Rv || {});
function UT(e, t) {
  return { ɵkind: e, ɵproviders: t };
}
function u1(...e) {
  let t = [
    bT,
    Cv,
    Ev,
    { provide: uo, useExisting: Ev },
    { provide: lo, useFactory: () => p(Tv, { optional: !0 }) ?? p(Cv) },
    { provide: Sv, useValue: jT, multi: !0 },
    { provide: Av, useValue: !0 },
    { provide: ea, useClass: VT },
  ];
  for (let n of e) t.push(...n.ɵproviders);
  return $t(t);
}
function l1() {
  return UT(Rv.Fetch, [
    Pl,
    { provide: Tv, useExisting: Pl },
    { provide: lo, useExisting: Pl },
  ]);
}
var BT = new y(""),
  $T = "b",
  HT = "h",
  zT = "s",
  GT = "st",
  qT = "u",
  WT = "rt",
  Xs = new y(""),
  ZT = ["GET", "HEAD"];
function YT(e, t) {
  let h = p(Xs),
    { isCacheActive: n } = h,
    r = Vd(h, ["isCacheActive"]),
    { transferCache: o, method: i } = e;
  if (
    !n ||
    o === !1 ||
    (i === "POST" && !r.includePostRequests && !o) ||
    (i !== "POST" && !ZT.includes(i)) ||
    (!r.includeRequestsWithAuthHeaders && KT(e)) ||
    r.filter?.(e) === !1
  )
    return t(e);
  let s = p(yn);
  if (p(BT, { optional: !0 })) throw new E(2803, !1);
  let c = e.url,
    u = QT(e, c),
    l = s.get(u, null),
    d = r.includeHeaders;
  if ((typeof o == "object" && o.includeHeaders && (d = o.includeHeaders), l)) {
    let { [$T]: f, [WT]: g, [HT]: m, [zT]: D, [GT]: w, [qT]: B } = l,
      x = f;
    switch (g) {
      case "arraybuffer":
        x = new TextEncoder().encode(f).buffer;
        break;
      case "blob":
        x = new Blob([f]);
        break;
    }
    let W = new at(m);
    return M(new wn({ body: x, headers: W, status: D, statusText: w, url: B }));
  }
  return t(e).pipe(
    ne((f) => {
      f instanceof wn;
    })
  );
}
function KT(e) {
  return e.headers.has("authorization") || e.headers.has("proxy-authorization");
}
function wv(e) {
  return [...e.keys()]
    .sort()
    .map((t) => `${t}=${e.getAll(t)}`)
    .join("&");
}
function QT(e, t) {
  let { params: n, method: r, responseType: o } = e,
    i = wv(n),
    s = e.serializeBody();
  s instanceof URLSearchParams ? (s = wv(s)) : typeof s != "string" && (s = "");
  let a = [r, o, t, s, i].join("|"),
    c = XT(a);
  return c;
}
function XT(e) {
  let t = 0;
  for (let n of e) t = (Math.imul(31, t) + n.charCodeAt(0)) << 0;
  return (t += 2147483648), t.toString();
}
function Ul(e) {
  return [
    {
      provide: Xs,
      useFactory: () => (
        xe("NgHttpTransferCache"), v({ isCacheActive: !0 }, e)
      ),
    },
    { provide: Nv, useValue: YT, multi: !0, deps: [yn, Xs] },
    {
      provide: Wt,
      multi: !0,
      useFactory: () => {
        let t = p(Ie),
          n = p(Xs);
        return () => {
          t.whenStable().then(() => {
            n.isCacheActive = !1;
          });
        };
      },
    },
  ];
}
var $l = class extends Ys {
    supportsDOMEvents = !0;
  },
  Hl = class e extends $l {
    static makeCurrent() {
      cv(new e());
    }
    onAndCancel(t, n, r, o) {
      return (
        t.addEventListener(n, r, o),
        () => {
          t.removeEventListener(n, r, o);
        }
      );
    }
    dispatchEvent(t, n) {
      t.dispatchEvent(n);
    }
    remove(t) {
      t.remove();
    }
    createElement(t, n) {
      return (n = n || this.getDefaultDocument()), n.createElement(t);
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument("fakeTitle");
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(t) {
      return t.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(t) {
      return t instanceof DocumentFragment;
    }
    getGlobalEventTarget(t, n) {
      return n === "window"
        ? window
        : n === "document"
        ? t
        : n === "body"
        ? t.body
        : null;
    }
    getBaseHref(t) {
      let n = JT();
      return n == null ? null : eS(n);
    }
    resetBaseElement() {
      ho = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(t) {
      return Ks(document.cookie, t);
    }
  },
  ho = null;
function JT() {
  return (
    (ho = ho || document.querySelector("base")),
    ho ? ho.getAttribute("href") : null
  );
}
function eS(e) {
  return new URL(e, document.baseURI).pathname;
}
var tS = (() => {
    class e {
      build() {
        return new XMLHttpRequest();
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  zl = new y(""),
  Lv = (() => {
    class e {
      _zone;
      _plugins;
      _eventNameToPlugin = new Map();
      constructor(n, r) {
        (this._zone = r),
          n.forEach((o) => {
            o.manager = this;
          }),
          (this._plugins = n.slice().reverse());
      }
      addEventListener(n, r, o, i) {
        return this._findPluginFor(r).addEventListener(n, r, o, i);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(n) {
        let r = this._eventNameToPlugin.get(n);
        if (r) return r;
        if (((r = this._plugins.find((i) => i.supports(n))), !r))
          throw new E(5101, !1);
        return this._eventNameToPlugin.set(n, r), r;
      }
      static ɵfac = function (r) {
        return new (r || e)(I(zl), I(G));
      };
      static ɵprov = C({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  na = class {
    _doc;
    constructor(t) {
      this._doc = t;
    }
    manager;
  },
  ta = "ng-app-id";
function xv(e) {
  for (let t of e) t.remove();
}
function Ov(e, t) {
  let n = t.createElement("style");
  return (n.textContent = e), n;
}
function nS(e, t, n, r) {
  let o = e.head?.querySelectorAll(`style[${ta}="${t}"],link[${ta}="${t}"]`);
  if (o)
    for (let i of o)
      i.removeAttribute(ta),
        i instanceof HTMLLinkElement
          ? r.set(i.href.slice(i.href.lastIndexOf("/") + 1), {
              usage: 0,
              elements: [i],
            })
          : i.textContent && n.set(i.textContent, { usage: 0, elements: [i] });
}
function Gl(e, t) {
  let n = t.createElement("link");
  return n.setAttribute("rel", "stylesheet"), n.setAttribute("href", e), n;
}
var Vv = (() => {
    class e {
      doc;
      appId;
      nonce;
      inline = new Map();
      external = new Map();
      hosts = new Set();
      isServer;
      constructor(n, r, o, i = {}) {
        (this.doc = n),
          (this.appId = r),
          (this.nonce = o),
          (this.isServer = xl(i)),
          nS(n, r, this.inline, this.external),
          this.hosts.add(n.head);
      }
      addStyles(n, r) {
        for (let o of n) this.addUsage(o, this.inline, Ov);
        r?.forEach((o) => this.addUsage(o, this.external, Gl));
      }
      removeStyles(n, r) {
        for (let o of n) this.removeUsage(o, this.inline);
        r?.forEach((o) => this.removeUsage(o, this.external));
      }
      addUsage(n, r, o) {
        let i = r.get(n);
        i
          ? i.usage++
          : r.set(n, {
              usage: 1,
              elements: [...this.hosts].map((s) =>
                this.addElement(s, o(n, this.doc))
              ),
            });
      }
      removeUsage(n, r) {
        let o = r.get(n);
        o && (o.usage--, o.usage <= 0 && (xv(o.elements), r.delete(n)));
      }
      ngOnDestroy() {
        for (let [, { elements: n }] of [...this.inline, ...this.external])
          xv(n);
        this.hosts.clear();
      }
      addHost(n) {
        this.hosts.add(n);
        for (let [r, { elements: o }] of this.inline)
          o.push(this.addElement(n, Ov(r, this.doc)));
        for (let [r, { elements: o }] of this.external)
          o.push(this.addElement(n, Gl(r, this.doc)));
      }
      removeHost(n) {
        this.hosts.delete(n);
      }
      addElement(n, r) {
        return (
          this.nonce && r.setAttribute("nonce", this.nonce),
          this.isServer && r.setAttribute(ta, this.appId),
          n.appendChild(r)
        );
      }
      static ɵfac = function (r) {
        return new (r || e)(I(oe), I(ar), I(Qu, 8), I(Ct));
      };
      static ɵprov = C({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Bl = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
    math: "http://www.w3.org/1998/Math/MathML",
  },
  Wl = /%COMP%/g,
  jv = "%COMP%",
  rS = `_nghost-${jv}`,
  oS = `_ngcontent-${jv}`,
  iS = !0,
  sS = new y("", { providedIn: "root", factory: () => iS });
function aS(e) {
  return oS.replace(Wl, e);
}
function cS(e) {
  return rS.replace(Wl, e);
}
function Uv(e, t) {
  return t.map((n) => n.replace(Wl, e));
}
var Pv = (() => {
    class e {
      eventManager;
      sharedStylesHost;
      appId;
      removeStylesOnCompDestroy;
      doc;
      platformId;
      ngZone;
      nonce;
      tracingService;
      rendererByCompId = new Map();
      defaultRenderer;
      platformIsServer;
      constructor(n, r, o, i, s, a, c, u = null, l = null) {
        (this.eventManager = n),
          (this.sharedStylesHost = r),
          (this.appId = o),
          (this.removeStylesOnCompDestroy = i),
          (this.doc = s),
          (this.platformId = a),
          (this.ngZone = c),
          (this.nonce = u),
          (this.tracingService = l),
          (this.platformIsServer = xl(a)),
          (this.defaultRenderer = new po(
            n,
            s,
            c,
            this.platformIsServer,
            this.tracingService
          ));
      }
      createRenderer(n, r) {
        if (!n || !r) return this.defaultRenderer;
        this.platformIsServer &&
          r.encapsulation === tt.ShadowDom &&
          (r = L(v({}, r), { encapsulation: tt.Emulated }));
        let o = this.getOrCreateRenderer(n, r);
        return (
          o instanceof ra
            ? o.applyToHost(n)
            : o instanceof go && o.applyStyles(),
          o
        );
      }
      getOrCreateRenderer(n, r) {
        let o = this.rendererByCompId,
          i = o.get(r.id);
        if (!i) {
          let s = this.doc,
            a = this.ngZone,
            c = this.eventManager,
            u = this.sharedStylesHost,
            l = this.removeStylesOnCompDestroy,
            d = this.platformIsServer;
          switch (r.encapsulation) {
            case tt.Emulated:
              i = new ra(c, u, r, this.appId, l, s, a, d, this.tracingService);
              break;
            case tt.ShadowDom:
              return new ql(
                c,
                u,
                n,
                r,
                s,
                a,
                this.nonce,
                d,
                this.tracingService
              );
            default:
              i = new go(c, u, r, l, s, a, d, this.tracingService);
              break;
          }
          o.set(r.id, i);
        }
        return i;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
      componentReplaced(n) {
        this.rendererByCompId.delete(n);
      }
      static ɵfac = function (r) {
        return new (r || e)(
          I(Lv),
          I(Vv),
          I(ar),
          I(sS),
          I(oe),
          I(Ct),
          I(G),
          I(Qu),
          I(cr, 8)
        );
      };
      static ɵprov = C({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  po = class {
    eventManager;
    doc;
    ngZone;
    platformIsServer;
    tracingService;
    data = Object.create(null);
    throwOnSyntheticProps = !0;
    constructor(t, n, r, o, i) {
      (this.eventManager = t),
        (this.doc = n),
        (this.ngZone = r),
        (this.platformIsServer = o),
        (this.tracingService = i);
    }
    destroy() {}
    destroyNode = null;
    createElement(t, n) {
      return n
        ? this.doc.createElementNS(Bl[n] || n, t)
        : this.doc.createElement(t);
    }
    createComment(t) {
      return this.doc.createComment(t);
    }
    createText(t) {
      return this.doc.createTextNode(t);
    }
    appendChild(t, n) {
      (Fv(t) ? t.content : t).appendChild(n);
    }
    insertBefore(t, n, r) {
      t && (Fv(t) ? t.content : t).insertBefore(n, r);
    }
    removeChild(t, n) {
      n.remove();
    }
    selectRootElement(t, n) {
      let r = typeof t == "string" ? this.doc.querySelector(t) : t;
      if (!r) throw new E(-5104, !1);
      return n || (r.textContent = ""), r;
    }
    parentNode(t) {
      return t.parentNode;
    }
    nextSibling(t) {
      return t.nextSibling;
    }
    setAttribute(t, n, r, o) {
      if (o) {
        n = o + ":" + n;
        let i = Bl[o];
        i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
      } else t.setAttribute(n, r);
    }
    removeAttribute(t, n, r) {
      if (r) {
        let o = Bl[r];
        o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
      } else t.removeAttribute(n);
    }
    addClass(t, n) {
      t.classList.add(n);
    }
    removeClass(t, n) {
      t.classList.remove(n);
    }
    setStyle(t, n, r, o) {
      o & (nt.DashCase | nt.Important)
        ? t.style.setProperty(n, r, o & nt.Important ? "important" : "")
        : (t.style[n] = r);
    }
    removeStyle(t, n, r) {
      r & nt.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
    }
    setProperty(t, n, r) {
      t != null && (t[n] = r);
    }
    setValue(t, n) {
      t.nodeValue = n;
    }
    listen(t, n, r, o) {
      if (
        typeof t == "string" &&
        ((t = st().getGlobalEventTarget(this.doc, t)), !t)
      )
        throw new Error(`Unsupported event target ${t} for event ${n}`);
      let i = this.decoratePreventDefault(r);
      return (
        this.tracingService !== null &&
          this.tracingService.wrapEventListener &&
          (i = this.tracingService.wrapEventListener(t, n, i)),
        this.eventManager.addEventListener(t, n, i, o)
      );
    }
    decoratePreventDefault(t) {
      return (n) => {
        if (n === "__ngUnwrap__") return t;
        (this.platformIsServer ? this.ngZone.runGuarded(() => t(n)) : t(n)) ===
          !1 && n.preventDefault();
      };
    }
  };
function Fv(e) {
  return e.tagName === "TEMPLATE" && e.content !== void 0;
}
var ql = class extends po {
    sharedStylesHost;
    hostEl;
    shadowRoot;
    constructor(t, n, r, o, i, s, a, c, u) {
      super(t, i, s, c, u),
        (this.sharedStylesHost = n),
        (this.hostEl = r),
        (this.shadowRoot = r.attachShadow({ mode: "open" })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let l = Uv(o.id, o.styles);
      for (let h of l) {
        let f = document.createElement("style");
        a && f.setAttribute("nonce", a),
          (f.textContent = h),
          this.shadowRoot.appendChild(f);
      }
      let d = o.getExternalStyles?.();
      if (d)
        for (let h of d) {
          let f = Gl(h, i);
          a && f.setAttribute("nonce", a), this.shadowRoot.appendChild(f);
        }
    }
    nodeOrShadowRoot(t) {
      return t === this.hostEl ? this.shadowRoot : t;
    }
    appendChild(t, n) {
      return super.appendChild(this.nodeOrShadowRoot(t), n);
    }
    insertBefore(t, n, r) {
      return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
    }
    removeChild(t, n) {
      return super.removeChild(null, n);
    }
    parentNode(t) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  go = class extends po {
    sharedStylesHost;
    removeStylesOnCompDestroy;
    styles;
    styleUrls;
    constructor(t, n, r, o, i, s, a, c, u) {
      super(t, i, s, a, c),
        (this.sharedStylesHost = n),
        (this.removeStylesOnCompDestroy = o),
        (this.styles = u ? Uv(u, r.styles) : r.styles),
        (this.styleUrls = r.getExternalStyles?.(u));
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
    }
  },
  ra = class extends go {
    contentAttr;
    hostAttr;
    constructor(t, n, r, o, i, s, a, c, u) {
      let l = o + "-" + r.id;
      super(t, n, r, i, s, a, c, u, l),
        (this.contentAttr = aS(l)),
        (this.hostAttr = cS(l));
    }
    applyToHost(t) {
      this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
    }
    createElement(t, n) {
      let r = super.createElement(t, n);
      return super.setAttribute(r, this.contentAttr, ""), r;
    }
  },
  uS = (() => {
    class e extends na {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return !0;
      }
      addEventListener(n, r, o, i) {
        return (
          n.addEventListener(r, o, i),
          () => this.removeEventListener(n, r, o, i)
        );
      }
      removeEventListener(n, r, o, i) {
        return n.removeEventListener(r, o, i);
      }
      static ɵfac = function (r) {
        return new (r || e)(I(oe));
      };
      static ɵprov = C({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  kv = ["alt", "control", "meta", "shift"],
  lS = {
    "\b": "Backspace",
    "	": "Tab",
    "\x7F": "Delete",
    "\x1B": "Escape",
    Del: "Delete",
    Esc: "Escape",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Up: "ArrowUp",
    Down: "ArrowDown",
    Menu: "ContextMenu",
    Scroll: "ScrollLock",
    Win: "OS",
  },
  dS = {
    alt: (e) => e.altKey,
    control: (e) => e.ctrlKey,
    meta: (e) => e.metaKey,
    shift: (e) => e.shiftKey,
  },
  fS = (() => {
    class e extends na {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return e.parseEventName(n) != null;
      }
      addEventListener(n, r, o, i) {
        let s = e.parseEventName(r),
          a = e.eventCallback(s.fullKey, o, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => st().onAndCancel(n, s.domEventName, a, i));
      }
      static parseEventName(n) {
        let r = n.toLowerCase().split("."),
          o = r.shift();
        if (r.length === 0 || !(o === "keydown" || o === "keyup")) return null;
        let i = e._normalizeKey(r.pop()),
          s = "",
          a = r.indexOf("code");
        if (
          (a > -1 && (r.splice(a, 1), (s = "code.")),
          kv.forEach((u) => {
            let l = r.indexOf(u);
            l > -1 && (r.splice(l, 1), (s += u + "."));
          }),
          (s += i),
          r.length != 0 || i.length === 0)
        )
          return null;
        let c = {};
        return (c.domEventName = o), (c.fullKey = s), c;
      }
      static matchEventFullKeyCode(n, r) {
        let o = lS[n.key] || n.key,
          i = "";
        return (
          r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
          o == null || !o
            ? !1
            : ((o = o.toLowerCase()),
              o === " " ? (o = "space") : o === "." && (o = "dot"),
              kv.forEach((s) => {
                if (s !== o) {
                  let a = dS[s];
                  a(n) && (i += s + ".");
                }
              }),
              (i += o),
              i === r)
        );
      }
      static eventCallback(n, r, o) {
        return (i) => {
          e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
        };
      }
      static _normalizeKey(n) {
        return n === "esc" ? "escape" : n;
      }
      static ɵfac = function (r) {
        return new (r || e)(I(oe));
      };
      static ɵprov = C({ token: e, factory: e.ɵfac });
    }
    return e;
  })();
function N1(e, t) {
  return ev(v({ rootComponent: e }, hS(t)));
}
function hS(e) {
  return {
    appProviders: [...yS, ...(e?.providers ?? [])],
    platformProviders: vS,
  };
}
function pS() {
  Hl.makeCurrent();
}
function gS() {
  return new et();
}
function mS() {
  return rg(document), document;
}
var vS = [
  { provide: Ct, useValue: fv },
  { provide: Ku, useValue: pS, multi: !0 },
  { provide: oe, useFactory: mS, deps: [] },
];
var yS = [
  { provide: Ds, useValue: "root" },
  { provide: et, useFactory: gS, deps: [] },
  { provide: zl, useClass: uS, multi: !0, deps: [oe, G, Ct] },
  { provide: zl, useClass: fS, multi: !0, deps: [oe] },
  Pv,
  Vv,
  Lv,
  { provide: tr, useExisting: Pv },
  { provide: dr, useClass: tS, deps: [] },
  [],
];
var A1 = (() => {
    class e {
      _doc;
      _dom;
      constructor(n) {
        (this._doc = n), (this._dom = st());
      }
      addTag(n, r = !1) {
        return n ? this._getOrCreateElement(n, r) : null;
      }
      addTags(n, r = !1) {
        return n
          ? n.reduce(
              (o, i) => (i && o.push(this._getOrCreateElement(i, r)), o),
              []
            )
          : [];
      }
      getTag(n) {
        return (n && this._doc.querySelector(`meta[${n}]`)) || null;
      }
      getTags(n) {
        if (!n) return [];
        let r = this._doc.querySelectorAll(`meta[${n}]`);
        return r ? [].slice.call(r) : [];
      }
      updateTag(n, r) {
        if (!n) return null;
        r = r || this._parseSelector(n);
        let o = this.getTag(r);
        return o
          ? this._setMetaElementAttributes(n, o)
          : this._getOrCreateElement(n, !0);
      }
      removeTag(n) {
        this.removeTagElement(this.getTag(n));
      }
      removeTagElement(n) {
        n && this._dom.remove(n);
      }
      _getOrCreateElement(n, r = !1) {
        if (!r) {
          let s = this._parseSelector(n),
            a = this.getTags(s).filter((c) =>
              this._containsAttributes(n, c)
            )[0];
          if (a !== void 0) return a;
        }
        let o = this._dom.createElement("meta");
        return (
          this._setMetaElementAttributes(n, o),
          this._doc.getElementsByTagName("head")[0].appendChild(o),
          o
        );
      }
      _setMetaElementAttributes(n, r) {
        return (
          Object.keys(n).forEach((o) =>
            r.setAttribute(this._getMetaKeyMap(o), n[o])
          ),
          r
        );
      }
      _parseSelector(n) {
        let r = n.name ? "name" : "property";
        return `${r}="${n[r]}"`;
      }
      _containsAttributes(n, r) {
        return Object.keys(n).every(
          (o) => r.getAttribute(this._getMetaKeyMap(o)) === n[o]
        );
      }
      _getMetaKeyMap(n) {
        return DS[n] || n;
      }
      static ɵfac = function (r) {
        return new (r || e)(I(oe));
      };
      static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  DS = { httpEquiv: "http-equiv" },
  Bv = (() => {
    class e {
      _doc;
      constructor(n) {
        this._doc = n;
      }
      getTitle() {
        return this._doc.title;
      }
      setTitle(n) {
        this._doc.title = n || "";
      }
      static ɵfac = function (r) {
        return new (r || e)(I(oe));
      };
      static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })();
var ES = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({
        token: e,
        factory: function (r) {
          let o = null;
          return r ? (o = new (r || e)()) : (o = I(CS)), o;
        },
        providedIn: "root",
      });
    }
    return e;
  })(),
  CS = (() => {
    class e extends ES {
      _doc;
      constructor(n) {
        super(), (this._doc = n);
      }
      sanitize(n, r) {
        if (r == null) return null;
        switch (n) {
          case Ke.NONE:
            return r;
          case Ke.HTML:
            return wt(r, "HTML") ? Ye(r) : ol(this._doc, String(r)).toString();
          case Ke.STYLE:
            return wt(r, "Style") ? Ye(r) : r;
          case Ke.SCRIPT:
            if (wt(r, "Script")) return Ye(r);
            throw new E(5200, !1);
          case Ke.URL:
            return wt(r, "URL") ? Ye(r) : xs(String(r));
          case Ke.RESOURCE_URL:
            if (wt(r, "ResourceURL")) return Ye(r);
            throw new E(5201, !1);
          default:
            throw new E(5202, !1);
        }
      }
      bypassSecurityTrustHtml(n) {
        return Tg(n);
      }
      bypassSecurityTrustStyle(n) {
        return Sg(n);
      }
      bypassSecurityTrustScript(n) {
        return Ng(n);
      }
      bypassSecurityTrustUrl(n) {
        return Ag(n);
      }
      bypassSecurityTrustResourceUrl(n) {
        return Rg(n);
      }
      static ɵfac = function (r) {
        return new (r || e)(I(oe));
      };
      static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  mo = (function (e) {
    return (
      (e[(e.NoHttpTransferCache = 0)] = "NoHttpTransferCache"),
      (e[(e.HttpTransferCacheOptions = 1)] = "HttpTransferCacheOptions"),
      (e[(e.I18nSupport = 2)] = "I18nSupport"),
      (e[(e.EventReplay = 3)] = "EventReplay"),
      (e[(e.IncrementalHydration = 4)] = "IncrementalHydration"),
      e
    );
  })(mo || {});
function $v(e, t = [], n = {}) {
  return { ɵkind: e, ɵproviders: t };
}
function R1(e) {
  return $v(mo.HttpTransferCacheOptions, Ul(e));
}
function x1() {
  return $v(mo.EventReplay, tv());
}
function O1(...e) {
  let t = [],
    n = new Set(),
    r = n.has(mo.HttpTransferCacheOptions);
  for (let { ɵproviders: o, ɵkind: i } of e) n.add(i), o.length && t.push(o);
  return $t([[], nv(), n.has(mo.NoHttpTransferCache) || r ? [] : Ul({}), t]);
}
var R = "primary",
  Ao = Symbol("RouteTitle"),
  Xl = class {
    params;
    constructor(t) {
      this.params = t || {};
    }
    has(t) {
      return Object.prototype.hasOwnProperty.call(this.params, t);
    }
    get(t) {
      if (this.has(t)) {
        let n = this.params[t];
        return Array.isArray(n) ? n[0] : n;
      }
      return null;
    }
    getAll(t) {
      if (this.has(t)) {
        let n = this.params[t];
        return Array.isArray(n) ? n : [n];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function yr(e) {
  return new Xl(e);
}
function IS(e, t, n) {
  let r = n.path.split("/");
  if (
    r.length > e.length ||
    (n.pathMatch === "full" && (t.hasChildren() || r.length < e.length))
  )
    return null;
  let o = {};
  for (let i = 0; i < r.length; i++) {
    let s = r[i],
      a = e[i];
    if (s[0] === ":") o[s.substring(1)] = a;
    else if (s !== a.path) return null;
  }
  return { consumed: e.slice(0, r.length), posParams: o };
}
function _S(e, t) {
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; ++n) if (!ct(e[n], t[n])) return !1;
  return !0;
}
function ct(e, t) {
  let n = e ? Jl(e) : void 0,
    r = t ? Jl(t) : void 0;
  if (!n || !r || n.length != r.length) return !1;
  let o;
  for (let i = 0; i < n.length; i++)
    if (((o = n[i]), !Jv(e[o], t[o]))) return !1;
  return !0;
}
function Jl(e) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
}
function Jv(e, t) {
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return !1;
    let n = [...e].sort(),
      r = [...t].sort();
    return n.every((o, i) => r[i] === o);
  } else return e === t;
}
function ey(e) {
  return e.length > 0 ? e[e.length - 1] : null;
}
function tn(e) {
  return Ya(e) ? e : Dn(e) ? z(Promise.resolve(e)) : M(e);
}
var bS = { exact: ny, subset: ry },
  ty = { exact: MS, subset: TS, ignored: () => !0 };
function Hv(e, t, n) {
  return (
    bS[n.paths](e.root, t.root, n.matrixParams) &&
    ty[n.queryParams](e.queryParams, t.queryParams) &&
    !(n.fragment === "exact" && e.fragment !== t.fragment)
  );
}
function MS(e, t) {
  return ct(e, t);
}
function ny(e, t, n) {
  if (
    !_n(e.segments, t.segments) ||
    !sa(e.segments, t.segments, n) ||
    e.numberOfChildren !== t.numberOfChildren
  )
    return !1;
  for (let r in t.children)
    if (!e.children[r] || !ny(e.children[r], t.children[r], n)) return !1;
  return !0;
}
function TS(e, t) {
  return (
    Object.keys(t).length <= Object.keys(e).length &&
    Object.keys(t).every((n) => Jv(e[n], t[n]))
  );
}
function ry(e, t, n) {
  return oy(e, t, t.segments, n);
}
function oy(e, t, n, r) {
  if (e.segments.length > n.length) {
    let o = e.segments.slice(0, n.length);
    return !(!_n(o, n) || t.hasChildren() || !sa(o, n, r));
  } else if (e.segments.length === n.length) {
    if (!_n(e.segments, n) || !sa(e.segments, n, r)) return !1;
    for (let o in t.children)
      if (!e.children[o] || !ry(e.children[o], t.children[o], r)) return !1;
    return !0;
  } else {
    let o = n.slice(0, e.segments.length),
      i = n.slice(e.segments.length);
    return !_n(e.segments, o) || !sa(e.segments, o, r) || !e.children[R]
      ? !1
      : oy(e.children[R], t, i, r);
  }
}
function sa(e, t, n) {
  return t.every((r, o) => ty[n](e[o].parameters, r.parameters));
}
var Nt = class {
    root;
    queryParams;
    fragment;
    _queryParamMap;
    constructor(t = new $([], {}), n = {}, r = null) {
      (this.root = t), (this.queryParams = n), (this.fragment = r);
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= yr(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      return AS.serialize(this);
    }
  },
  $ = class {
    segments;
    children;
    parent = null;
    constructor(t, n) {
      (this.segments = t),
        (this.children = n),
        Object.values(n).forEach((r) => (r.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return aa(this);
    }
  },
  In = class {
    path;
    parameters;
    _parameterMap;
    constructor(t, n) {
      (this.path = t), (this.parameters = n);
    }
    get parameterMap() {
      return (this._parameterMap ??= yr(this.parameters)), this._parameterMap;
    }
    toString() {
      return sy(this);
    }
  };
function SS(e, t) {
  return _n(e, t) && e.every((n, r) => ct(n.parameters, t[r].parameters));
}
function _n(e, t) {
  return e.length !== t.length ? !1 : e.every((n, r) => n.path === t[r].path);
}
function NS(e, t) {
  let n = [];
  return (
    Object.entries(e.children).forEach(([r, o]) => {
      r === R && (n = n.concat(t(o, r)));
    }),
    Object.entries(e.children).forEach(([r, o]) => {
      r !== R && (n = n.concat(t(o, r)));
    }),
    n
  );
}
var Ro = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({
        token: e,
        factory: () => new Dr(),
        providedIn: "root",
      });
    }
    return e;
  })(),
  Dr = class {
    parse(t) {
      let n = new td(t);
      return new Nt(
        n.parseRootSegment(),
        n.parseQueryParams(),
        n.parseFragment()
      );
    }
    serialize(t) {
      let n = `/${vo(t.root, !0)}`,
        r = OS(t.queryParams),
        o = typeof t.fragment == "string" ? `#${RS(t.fragment)}` : "";
      return `${n}${r}${o}`;
    }
  },
  AS = new Dr();
function aa(e) {
  return e.segments.map((t) => sy(t)).join("/");
}
function vo(e, t) {
  if (!e.hasChildren()) return aa(e);
  if (t) {
    let n = e.children[R] ? vo(e.children[R], !1) : "",
      r = [];
    return (
      Object.entries(e.children).forEach(([o, i]) => {
        o !== R && r.push(`${o}:${vo(i, !1)}`);
      }),
      r.length > 0 ? `${n}(${r.join("//")})` : n
    );
  } else {
    let n = NS(e, (r, o) =>
      o === R ? [vo(e.children[R], !1)] : [`${o}:${vo(r, !1)}`]
    );
    return Object.keys(e.children).length === 1 && e.children[R] != null
      ? `${aa(e)}/${n[0]}`
      : `${aa(e)}/(${n.join("//")})`;
  }
}
function iy(e) {
  return encodeURIComponent(e)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",");
}
function oa(e) {
  return iy(e).replace(/%3B/gi, ";");
}
function RS(e) {
  return encodeURI(e);
}
function ed(e) {
  return iy(e)
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/%26/gi, "&");
}
function ca(e) {
  return decodeURIComponent(e);
}
function zv(e) {
  return ca(e.replace(/\+/g, "%20"));
}
function sy(e) {
  return `${ed(e.path)}${xS(e.parameters)}`;
}
function xS(e) {
  return Object.entries(e)
    .map(([t, n]) => `;${ed(t)}=${ed(n)}`)
    .join("");
}
function OS(e) {
  let t = Object.entries(e)
    .map(([n, r]) =>
      Array.isArray(r)
        ? r.map((o) => `${oa(n)}=${oa(o)}`).join("&")
        : `${oa(n)}=${oa(r)}`
    )
    .filter((n) => n);
  return t.length ? `?${t.join("&")}` : "";
}
var PS = /^[^\/()?;#]+/;
function Zl(e) {
  let t = e.match(PS);
  return t ? t[0] : "";
}
var FS = /^[^\/()?;=#]+/;
function kS(e) {
  let t = e.match(FS);
  return t ? t[0] : "";
}
var LS = /^[^=?&#]+/;
function VS(e) {
  let t = e.match(LS);
  return t ? t[0] : "";
}
var jS = /^[^&#]+/;
function US(e) {
  let t = e.match(jS);
  return t ? t[0] : "";
}
var td = class {
  url;
  remaining;
  constructor(t) {
    (this.url = t), (this.remaining = t);
  }
  parseRootSegment() {
    return (
      this.consumeOptional("/"),
      this.remaining === "" ||
      this.peekStartsWith("?") ||
      this.peekStartsWith("#")
        ? new $([], {})
        : new $([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let t = {};
    if (this.consumeOptional("?"))
      do this.parseQueryParam(t);
      while (this.consumeOptional("&"));
    return t;
  }
  parseFragment() {
    return this.consumeOptional("#")
      ? decodeURIComponent(this.remaining)
      : null;
  }
  parseChildren() {
    if (this.remaining === "") return {};
    this.consumeOptional("/");
    let t = [];
    for (
      this.peekStartsWith("(") || t.push(this.parseSegment());
      this.peekStartsWith("/") &&
      !this.peekStartsWith("//") &&
      !this.peekStartsWith("/(");

    )
      this.capture("/"), t.push(this.parseSegment());
    let n = {};
    this.peekStartsWith("/(") &&
      (this.capture("/"), (n = this.parseParens(!0)));
    let r = {};
    return (
      this.peekStartsWith("(") && (r = this.parseParens(!1)),
      (t.length > 0 || Object.keys(n).length > 0) && (r[R] = new $(t, n)),
      r
    );
  }
  parseSegment() {
    let t = Zl(this.remaining);
    if (t === "" && this.peekStartsWith(";")) throw new E(4009, !1);
    return this.capture(t), new In(ca(t), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let t = {};
    for (; this.consumeOptional(";"); ) this.parseParam(t);
    return t;
  }
  parseParam(t) {
    let n = kS(this.remaining);
    if (!n) return;
    this.capture(n);
    let r = "";
    if (this.consumeOptional("=")) {
      let o = Zl(this.remaining);
      o && ((r = o), this.capture(r));
    }
    t[ca(n)] = ca(r);
  }
  parseQueryParam(t) {
    let n = VS(this.remaining);
    if (!n) return;
    this.capture(n);
    let r = "";
    if (this.consumeOptional("=")) {
      let s = US(this.remaining);
      s && ((r = s), this.capture(r));
    }
    let o = zv(n),
      i = zv(r);
    if (t.hasOwnProperty(o)) {
      let s = t[o];
      Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
    } else t[o] = i;
  }
  parseParens(t) {
    let n = {};
    for (
      this.capture("(");
      !this.consumeOptional(")") && this.remaining.length > 0;

    ) {
      let r = Zl(this.remaining),
        o = this.remaining[r.length];
      if (o !== "/" && o !== ")" && o !== ";") throw new E(4010, !1);
      let i;
      r.indexOf(":") > -1
        ? ((i = r.slice(0, r.indexOf(":"))), this.capture(i), this.capture(":"))
        : t && (i = R);
      let s = this.parseChildren();
      (n[i] = Object.keys(s).length === 1 ? s[R] : new $([], s)),
        this.consumeOptional("//");
    }
    return n;
  }
  peekStartsWith(t) {
    return this.remaining.startsWith(t);
  }
  consumeOptional(t) {
    return this.peekStartsWith(t)
      ? ((this.remaining = this.remaining.substring(t.length)), !0)
      : !1;
  }
  capture(t) {
    if (!this.consumeOptional(t)) throw new E(4011, !1);
  }
};
function ay(e) {
  return e.segments.length > 0 ? new $([], { [R]: e }) : e;
}
function cy(e) {
  let t = {};
  for (let [r, o] of Object.entries(e.children)) {
    let i = cy(o);
    if (r === R && i.segments.length === 0 && i.hasChildren())
      for (let [s, a] of Object.entries(i.children)) t[s] = a;
    else (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
  }
  let n = new $(e.segments, t);
  return BS(n);
}
function BS(e) {
  if (e.numberOfChildren === 1 && e.children[R]) {
    let t = e.children[R];
    return new $(e.segments.concat(t.segments), t.children);
  }
  return e;
}
function bn(e) {
  return e instanceof Nt;
}
function $S(e, t, n = null, r = null) {
  let o = uy(e);
  return ly(o, t, n, r);
}
function uy(e) {
  let t;
  function n(i) {
    let s = {};
    for (let c of i.children) {
      let u = n(c);
      s[c.outlet] = u;
    }
    let a = new $(i.url, s);
    return i === e && (t = a), a;
  }
  let r = n(e.root),
    o = ay(r);
  return t ?? o;
}
function ly(e, t, n, r) {
  let o = e;
  for (; o.parent; ) o = o.parent;
  if (t.length === 0) return Yl(o, o, o, n, r);
  let i = HS(t);
  if (i.toRoot()) return Yl(o, o, new $([], {}), n, r);
  let s = zS(i, o, e),
    a = s.processChildren
      ? Do(s.segmentGroup, s.index, i.commands)
      : fy(s.segmentGroup, s.index, i.commands);
  return Yl(o, s.segmentGroup, a, n, r);
}
function ua(e) {
  return typeof e == "object" && e != null && !e.outlets && !e.segmentPath;
}
function wo(e) {
  return typeof e == "object" && e != null && e.outlets;
}
function Yl(e, t, n, r, o) {
  let i = {};
  r &&
    Object.entries(r).forEach(([c, u]) => {
      i[c] = Array.isArray(u) ? u.map((l) => `${l}`) : `${u}`;
    });
  let s;
  e === t ? (s = n) : (s = dy(e, t, n));
  let a = ay(cy(s));
  return new Nt(a, i, o);
}
function dy(e, t, n) {
  let r = {};
  return (
    Object.entries(e.children).forEach(([o, i]) => {
      i === t ? (r[o] = n) : (r[o] = dy(i, t, n));
    }),
    new $(e.segments, r)
  );
}
var la = class {
  isAbsolute;
  numberOfDoubleDots;
  commands;
  constructor(t, n, r) {
    if (
      ((this.isAbsolute = t),
      (this.numberOfDoubleDots = n),
      (this.commands = r),
      t && r.length > 0 && ua(r[0]))
    )
      throw new E(4003, !1);
    let o = r.find(wo);
    if (o && o !== ey(r)) throw new E(4004, !1);
  }
  toRoot() {
    return (
      this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"
    );
  }
};
function HS(e) {
  if (typeof e[0] == "string" && e.length === 1 && e[0] === "/")
    return new la(!0, 0, e);
  let t = 0,
    n = !1,
    r = e.reduce((o, i, s) => {
      if (typeof i == "object" && i != null) {
        if (i.outlets) {
          let a = {};
          return (
            Object.entries(i.outlets).forEach(([c, u]) => {
              a[c] = typeof u == "string" ? u.split("/") : u;
            }),
            [...o, { outlets: a }]
          );
        }
        if (i.segmentPath) return [...o, i.segmentPath];
      }
      return typeof i != "string"
        ? [...o, i]
        : s === 0
        ? (i.split("/").forEach((a, c) => {
            (c == 0 && a === ".") ||
              (c == 0 && a === ""
                ? (n = !0)
                : a === ".."
                ? t++
                : a != "" && o.push(a));
          }),
          o)
        : [...o, i];
    }, []);
  return new la(n, t, r);
}
var gr = class {
  segmentGroup;
  processChildren;
  index;
  constructor(t, n, r) {
    (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
  }
};
function zS(e, t, n) {
  if (e.isAbsolute) return new gr(t, !0, 0);
  if (!n) return new gr(t, !1, NaN);
  if (n.parent === null) return new gr(n, !0, 0);
  let r = ua(e.commands[0]) ? 0 : 1,
    o = n.segments.length - 1 + r;
  return GS(n, o, e.numberOfDoubleDots);
}
function GS(e, t, n) {
  let r = e,
    o = t,
    i = n;
  for (; i > o; ) {
    if (((i -= o), (r = r.parent), !r)) throw new E(4005, !1);
    o = r.segments.length;
  }
  return new gr(r, !1, o - i);
}
function qS(e) {
  return wo(e[0]) ? e[0].outlets : { [R]: e };
}
function fy(e, t, n) {
  if (((e ??= new $([], {})), e.segments.length === 0 && e.hasChildren()))
    return Do(e, t, n);
  let r = WS(e, t, n),
    o = n.slice(r.commandIndex);
  if (r.match && r.pathIndex < e.segments.length) {
    let i = new $(e.segments.slice(0, r.pathIndex), {});
    return (
      (i.children[R] = new $(e.segments.slice(r.pathIndex), e.children)),
      Do(i, 0, o)
    );
  } else
    return r.match && o.length === 0
      ? new $(e.segments, {})
      : r.match && !e.hasChildren()
      ? nd(e, t, n)
      : r.match
      ? Do(e, 0, o)
      : nd(e, t, n);
}
function Do(e, t, n) {
  if (n.length === 0) return new $(e.segments, {});
  {
    let r = qS(n),
      o = {};
    if (
      Object.keys(r).some((i) => i !== R) &&
      e.children[R] &&
      e.numberOfChildren === 1 &&
      e.children[R].segments.length === 0
    ) {
      let i = Do(e.children[R], t, n);
      return new $(e.segments, i.children);
    }
    return (
      Object.entries(r).forEach(([i, s]) => {
        typeof s == "string" && (s = [s]),
          s !== null && (o[i] = fy(e.children[i], t, s));
      }),
      Object.entries(e.children).forEach(([i, s]) => {
        r[i] === void 0 && (o[i] = s);
      }),
      new $(e.segments, o)
    );
  }
}
function WS(e, t, n) {
  let r = 0,
    o = t,
    i = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; o < e.segments.length; ) {
    if (r >= n.length) return i;
    let s = e.segments[o],
      a = n[r];
    if (wo(a)) break;
    let c = `${a}`,
      u = r < n.length - 1 ? n[r + 1] : null;
    if (o > 0 && c === void 0) break;
    if (c && u && typeof u == "object" && u.outlets === void 0) {
      if (!qv(c, u, s)) return i;
      r += 2;
    } else {
      if (!qv(c, {}, s)) return i;
      r++;
    }
    o++;
  }
  return { match: !0, pathIndex: o, commandIndex: r };
}
function nd(e, t, n) {
  let r = e.segments.slice(0, t),
    o = 0;
  for (; o < n.length; ) {
    let i = n[o];
    if (wo(i)) {
      let c = ZS(i.outlets);
      return new $(r, c);
    }
    if (o === 0 && ua(n[0])) {
      let c = e.segments[t];
      r.push(new In(c.path, Gv(n[0]))), o++;
      continue;
    }
    let s = wo(i) ? i.outlets[R] : `${i}`,
      a = o < n.length - 1 ? n[o + 1] : null;
    s && a && ua(a)
      ? (r.push(new In(s, Gv(a))), (o += 2))
      : (r.push(new In(s, {})), o++);
  }
  return new $(r, {});
}
function ZS(e) {
  let t = {};
  return (
    Object.entries(e).forEach(([n, r]) => {
      typeof r == "string" && (r = [r]),
        r !== null && (t[n] = nd(new $([], {}), 0, r));
    }),
    t
  );
}
function Gv(e) {
  let t = {};
  return Object.entries(e).forEach(([n, r]) => (t[n] = `${r}`)), t;
}
function qv(e, t, n) {
  return e == n.path && ct(t, n.parameters);
}
var Eo = "imperative",
  ie = (function (e) {
    return (
      (e[(e.NavigationStart = 0)] = "NavigationStart"),
      (e[(e.NavigationEnd = 1)] = "NavigationEnd"),
      (e[(e.NavigationCancel = 2)] = "NavigationCancel"),
      (e[(e.NavigationError = 3)] = "NavigationError"),
      (e[(e.RoutesRecognized = 4)] = "RoutesRecognized"),
      (e[(e.ResolveStart = 5)] = "ResolveStart"),
      (e[(e.ResolveEnd = 6)] = "ResolveEnd"),
      (e[(e.GuardsCheckStart = 7)] = "GuardsCheckStart"),
      (e[(e.GuardsCheckEnd = 8)] = "GuardsCheckEnd"),
      (e[(e.RouteConfigLoadStart = 9)] = "RouteConfigLoadStart"),
      (e[(e.RouteConfigLoadEnd = 10)] = "RouteConfigLoadEnd"),
      (e[(e.ChildActivationStart = 11)] = "ChildActivationStart"),
      (e[(e.ChildActivationEnd = 12)] = "ChildActivationEnd"),
      (e[(e.ActivationStart = 13)] = "ActivationStart"),
      (e[(e.ActivationEnd = 14)] = "ActivationEnd"),
      (e[(e.Scroll = 15)] = "Scroll"),
      (e[(e.NavigationSkipped = 16)] = "NavigationSkipped"),
      e
    );
  })(ie || {}),
  Be = class {
    id;
    url;
    constructor(t, n) {
      (this.id = t), (this.url = n);
    }
  },
  Er = class extends Be {
    type = ie.NavigationStart;
    navigationTrigger;
    restoredState;
    constructor(t, n, r = "imperative", o = null) {
      super(t, n), (this.navigationTrigger = r), (this.restoredState = o);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  ut = class extends Be {
    urlAfterRedirects;
    type = ie.NavigationEnd;
    constructor(t, n, r) {
      super(t, n), (this.urlAfterRedirects = r);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  Fe = (function (e) {
    return (
      (e[(e.Redirect = 0)] = "Redirect"),
      (e[(e.SupersededByNewNavigation = 1)] = "SupersededByNewNavigation"),
      (e[(e.NoDataFromResolver = 2)] = "NoDataFromResolver"),
      (e[(e.GuardRejected = 3)] = "GuardRejected"),
      e
    );
  })(Fe || {}),
  da = (function (e) {
    return (
      (e[(e.IgnoredSameUrlNavigation = 0)] = "IgnoredSameUrlNavigation"),
      (e[(e.IgnoredByUrlHandlingStrategy = 1)] =
        "IgnoredByUrlHandlingStrategy"),
      e
    );
  })(da || {}),
  St = class extends Be {
    reason;
    code;
    type = ie.NavigationCancel;
    constructor(t, n, r, o) {
      super(t, n), (this.reason = r), (this.code = o);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  Jt = class extends Be {
    reason;
    code;
    type = ie.NavigationSkipped;
    constructor(t, n, r, o) {
      super(t, n), (this.reason = r), (this.code = o);
    }
  },
  Io = class extends Be {
    error;
    target;
    type = ie.NavigationError;
    constructor(t, n, r, o) {
      super(t, n), (this.error = r), (this.target = o);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  fa = class extends Be {
    urlAfterRedirects;
    state;
    type = ie.RoutesRecognized;
    constructor(t, n, r, o) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  rd = class extends Be {
    urlAfterRedirects;
    state;
    type = ie.GuardsCheckStart;
    constructor(t, n, r, o) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  od = class extends Be {
    urlAfterRedirects;
    state;
    shouldActivate;
    type = ie.GuardsCheckEnd;
    constructor(t, n, r, o, i) {
      super(t, n),
        (this.urlAfterRedirects = r),
        (this.state = o),
        (this.shouldActivate = i);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  id = class extends Be {
    urlAfterRedirects;
    state;
    type = ie.ResolveStart;
    constructor(t, n, r, o) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  sd = class extends Be {
    urlAfterRedirects;
    state;
    type = ie.ResolveEnd;
    constructor(t, n, r, o) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  ad = class {
    route;
    type = ie.RouteConfigLoadStart;
    constructor(t) {
      this.route = t;
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  cd = class {
    route;
    type = ie.RouteConfigLoadEnd;
    constructor(t) {
      this.route = t;
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  ud = class {
    snapshot;
    type = ie.ChildActivationStart;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ChildActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  ld = class {
    snapshot;
    type = ie.ChildActivationEnd;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ChildActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  dd = class {
    snapshot;
    type = ie.ActivationStart;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  fd = class {
    snapshot;
    type = ie.ActivationEnd;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  ha = class {
    routerEvent;
    position;
    anchor;
    type = ie.Scroll;
    constructor(t, n, r) {
      (this.routerEvent = t), (this.position = n), (this.anchor = r);
    }
    toString() {
      let t = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
      return `Scroll(anchor: '${this.anchor}', position: '${t}')`;
    }
  },
  _o = class {},
  Cr = class {
    url;
    navigationBehaviorOptions;
    constructor(t, n) {
      (this.url = t), (this.navigationBehaviorOptions = n);
    }
  };
function YS(e, t) {
  return (
    e.providers &&
      !e._injector &&
      (e._injector = oo(e.providers, t, `Route: ${e.path}`)),
    e._injector ?? t
  );
}
function Xe(e) {
  return e.outlet || R;
}
function KS(e, t) {
  let n = e.filter((r) => Xe(r) === t);
  return n.push(...e.filter((r) => Xe(r) !== t)), n;
}
function xo(e) {
  if (!e) return null;
  if (e.routeConfig?._injector) return e.routeConfig._injector;
  for (let t = e.parent; t; t = t.parent) {
    let n = t.routeConfig;
    if (n?._loadedInjector) return n._loadedInjector;
    if (n?._injector) return n._injector;
  }
  return null;
}
var hd = class {
    rootInjector;
    outlet = null;
    route = null;
    children;
    attachRef = null;
    get injector() {
      return xo(this.route?.snapshot) ?? this.rootInjector;
    }
    constructor(t) {
      (this.rootInjector = t), (this.children = new Oo(this.rootInjector));
    }
  },
  Oo = (() => {
    class e {
      rootInjector;
      contexts = new Map();
      constructor(n) {
        this.rootInjector = n;
      }
      onChildOutletCreated(n, r) {
        let o = this.getOrCreateContext(n);
        (o.outlet = r), this.contexts.set(n, o);
      }
      onChildOutletDestroyed(n) {
        let r = this.getContext(n);
        r && ((r.outlet = null), (r.attachRef = null));
      }
      onOutletDeactivated() {
        let n = this.contexts;
        return (this.contexts = new Map()), n;
      }
      onOutletReAttached(n) {
        this.contexts = n;
      }
      getOrCreateContext(n) {
        let r = this.getContext(n);
        return (
          r || ((r = new hd(this.rootInjector)), this.contexts.set(n, r)), r
        );
      }
      getContext(n) {
        return this.contexts.get(n) || null;
      }
      static ɵfac = function (r) {
        return new (r || e)(I(fe));
      };
      static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  pa = class {
    _root;
    constructor(t) {
      this._root = t;
    }
    get root() {
      return this._root.value;
    }
    parent(t) {
      let n = this.pathFromRoot(t);
      return n.length > 1 ? n[n.length - 2] : null;
    }
    children(t) {
      let n = pd(t, this._root);
      return n ? n.children.map((r) => r.value) : [];
    }
    firstChild(t) {
      let n = pd(t, this._root);
      return n && n.children.length > 0 ? n.children[0].value : null;
    }
    siblings(t) {
      let n = gd(t, this._root);
      return n.length < 2
        ? []
        : n[n.length - 2].children.map((o) => o.value).filter((o) => o !== t);
    }
    pathFromRoot(t) {
      return gd(t, this._root).map((n) => n.value);
    }
  };
function pd(e, t) {
  if (e === t.value) return t;
  for (let n of t.children) {
    let r = pd(e, n);
    if (r) return r;
  }
  return null;
}
function gd(e, t) {
  if (e === t.value) return [t];
  for (let n of t.children) {
    let r = gd(e, n);
    if (r.length) return r.unshift(t), r;
  }
  return [];
}
var Pe = class {
  value;
  children;
  constructor(t, n) {
    (this.value = t), (this.children = n);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function pr(e) {
  let t = {};
  return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
}
var ga = class extends pa {
  snapshot;
  constructor(t, n) {
    super(t), (this.snapshot = n), _d(this, t);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function hy(e) {
  let t = QS(e),
    n = new se([new In("", {})]),
    r = new se({}),
    o = new se({}),
    i = new se({}),
    s = new se(""),
    a = new en(n, r, i, s, o, R, e, t.root);
  return (a.snapshot = t.root), new ga(new Pe(a, []), t);
}
function QS(e) {
  let t = {},
    n = {},
    r = {},
    o = "",
    i = new mr([], t, r, o, n, R, e, null, {});
  return new va("", new Pe(i, []));
}
var en = class {
  urlSubject;
  paramsSubject;
  queryParamsSubject;
  fragmentSubject;
  dataSubject;
  outlet;
  component;
  snapshot;
  _futureSnapshot;
  _routerState;
  _paramMap;
  _queryParamMap;
  title;
  url;
  params;
  queryParams;
  fragment;
  data;
  constructor(t, n, r, o, i, s, a, c) {
    (this.urlSubject = t),
      (this.paramsSubject = n),
      (this.queryParamsSubject = r),
      (this.fragmentSubject = o),
      (this.dataSubject = i),
      (this.outlet = s),
      (this.component = a),
      (this._futureSnapshot = c),
      (this.title = this.dataSubject?.pipe(N((u) => u[Ao])) ?? M(void 0)),
      (this.url = t),
      (this.params = n),
      (this.queryParams = r),
      (this.fragment = o),
      (this.data = i);
  }
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  get root() {
    return this._routerState.root;
  }
  get parent() {
    return this._routerState.parent(this);
  }
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  get children() {
    return this._routerState.children(this);
  }
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    return (
      (this._paramMap ??= this.params.pipe(N((t) => yr(t)))), this._paramMap
    );
  }
  get queryParamMap() {
    return (
      (this._queryParamMap ??= this.queryParams.pipe(N((t) => yr(t)))),
      this._queryParamMap
    );
  }
  toString() {
    return this.snapshot
      ? this.snapshot.toString()
      : `Future(${this._futureSnapshot})`;
  }
};
function ma(e, t, n = "emptyOnly") {
  let r,
    { routeConfig: o } = e;
  return (
    t !== null &&
    (n === "always" ||
      o?.path === "" ||
      (!t.component && !t.routeConfig?.loadComponent))
      ? (r = {
          params: v(v({}, t.params), e.params),
          data: v(v({}, t.data), e.data),
          resolve: v(v(v(v({}, e.data), t.data), o?.data), e._resolvedData),
        })
      : (r = {
          params: v({}, e.params),
          data: v({}, e.data),
          resolve: v(v({}, e.data), e._resolvedData ?? {}),
        }),
    o && gy(o) && (r.resolve[Ao] = o.title),
    r
  );
}
var mr = class {
    url;
    params;
    queryParams;
    fragment;
    data;
    outlet;
    component;
    routeConfig;
    _resolve;
    _resolvedData;
    _routerState;
    _paramMap;
    _queryParamMap;
    get title() {
      return this.data?.[Ao];
    }
    constructor(t, n, r, o, i, s, a, c, u) {
      (this.url = t),
        (this.params = n),
        (this.queryParams = r),
        (this.fragment = o),
        (this.data = i),
        (this.outlet = s),
        (this.component = a),
        (this.routeConfig = c),
        (this._resolve = u);
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return (this._paramMap ??= yr(this.params)), this._paramMap;
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= yr(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      let t = this.url.map((r) => r.toString()).join("/"),
        n = this.routeConfig ? this.routeConfig.path : "";
      return `Route(url:'${t}', path:'${n}')`;
    }
  },
  va = class extends pa {
    url;
    constructor(t, n) {
      super(n), (this.url = t), _d(this, n);
    }
    toString() {
      return py(this._root);
    }
  };
function _d(e, t) {
  (t.value._routerState = e), t.children.forEach((n) => _d(e, n));
}
function py(e) {
  let t = e.children.length > 0 ? ` { ${e.children.map(py).join(", ")} } ` : "";
  return `${e.value}${t}`;
}
function Kl(e) {
  if (e.snapshot) {
    let t = e.snapshot,
      n = e._futureSnapshot;
    (e.snapshot = n),
      ct(t.queryParams, n.queryParams) ||
        e.queryParamsSubject.next(n.queryParams),
      t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
      ct(t.params, n.params) || e.paramsSubject.next(n.params),
      _S(t.url, n.url) || e.urlSubject.next(n.url),
      ct(t.data, n.data) || e.dataSubject.next(n.data);
  } else
    (e.snapshot = e._futureSnapshot),
      e.dataSubject.next(e._futureSnapshot.data);
}
function md(e, t) {
  let n = ct(e.params, t.params) && SS(e.url, t.url),
    r = !e.parent != !t.parent;
  return n && !r && (!e.parent || md(e.parent, t.parent));
}
function gy(e) {
  return typeof e.title == "string" || e.title === null;
}
var XS = new y(""),
  JS = (() => {
    class e {
      activated = null;
      get activatedComponentRef() {
        return this.activated;
      }
      _activatedRoute = null;
      name = R;
      activateEvents = new ae();
      deactivateEvents = new ae();
      attachEvents = new ae();
      detachEvents = new ae();
      routerOutletData = Yp(void 0);
      parentContexts = p(Oo);
      location = p(Hs);
      changeDetector = p(En);
      inputBinder = p(Ca, { optional: !0 });
      supportsBindingToComponentInputs = !0;
      ngOnChanges(n) {
        if (n.name) {
          let { firstChange: r, previousValue: o } = n.name;
          if (r) return;
          this.isTrackedInParentContexts(o) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)),
            this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        this.isTrackedInParentContexts(this.name) &&
          this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(n) {
        return this.parentContexts.getContext(n)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        if (
          (this.parentContexts.onChildOutletCreated(this.name, this),
          this.activated)
        )
          return;
        let n = this.parentContexts.getContext(this.name);
        n?.route &&
          (n.attachRef
            ? this.attach(n.attachRef, n.route)
            : this.activateWith(n.route, n.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new E(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new E(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new E(4012, !1);
        this.location.detach();
        let n = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(n.instance),
          n
        );
      }
      attach(n, r) {
        (this.activated = n),
          (this._activatedRoute = r),
          this.location.insert(n.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(n.instance);
      }
      deactivate() {
        if (this.activated) {
          let n = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(n);
        }
      }
      activateWith(n, r) {
        if (this.isActivated) throw new E(4013, !1);
        this._activatedRoute = n;
        let o = this.location,
          s = n.snapshot.component,
          a = this.parentContexts.getOrCreateContext(this.name).children,
          c = new vd(n, a, o.injector, this.routerOutletData);
        (this.activated = o.createComponent(s, {
          index: o.length,
          injector: c,
          environmentInjector: r,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵdir = ue({
        type: e,
        selectors: [["router-outlet"]],
        inputs: { name: "name", routerOutletData: [1, "routerOutletData"] },
        outputs: {
          activateEvents: "activate",
          deactivateEvents: "deactivate",
          attachEvents: "attach",
          detachEvents: "detach",
        },
        exportAs: ["outlet"],
        features: [sr],
      });
    }
    return e;
  })(),
  vd = class e {
    route;
    childContexts;
    parent;
    outletData;
    __ngOutletInjector(t) {
      return new e(this.route, this.childContexts, t, this.outletData);
    }
    constructor(t, n, r, o) {
      (this.route = t),
        (this.childContexts = n),
        (this.parent = r),
        (this.outletData = o);
    }
    get(t, n) {
      return t === en
        ? this.route
        : t === Oo
        ? this.childContexts
        : t === XS
        ? this.outletData
        : this.parent.get(t, n);
    }
  },
  Ca = new y(""),
  Wv = (() => {
    class e {
      outletDataSubscriptions = new Map();
      bindActivatedRouteToOutletComponent(n) {
        this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
      }
      unsubscribeFromRouteData(n) {
        this.outletDataSubscriptions.get(n)?.unsubscribe(),
          this.outletDataSubscriptions.delete(n);
      }
      subscribeToRouteData(n) {
        let { activatedRoute: r } = n,
          o = Rr([r.queryParams, r.params, r.data])
            .pipe(
              De(
                ([i, s, a], c) => (
                  (a = v(v(v({}, i), s), a)),
                  c === 0 ? M(a) : Promise.resolve(a)
                )
              )
            )
            .subscribe((i) => {
              if (
                !n.isActivated ||
                !n.activatedComponentRef ||
                n.activatedRoute !== r ||
                r.component === null
              ) {
                this.unsubscribeFromRouteData(n);
                return;
              }
              let s = rv(r.component);
              if (!s) {
                this.unsubscribeFromRouteData(n);
                return;
              }
              for (let { templateName: a } of s.inputs)
                n.activatedComponentRef.setInput(a, i[a]);
            });
        this.outletDataSubscriptions.set(n, o);
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({ token: e, factory: e.ɵfac });
    }
    return e;
  })();
function e0(e, t, n) {
  let r = bo(e, t._root, n ? n._root : void 0);
  return new ga(r, t);
}
function bo(e, t, n) {
  if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
    let r = n.value;
    r._futureSnapshot = t.value;
    let o = t0(e, t, n);
    return new Pe(r, o);
  } else {
    if (e.shouldAttach(t.value)) {
      let i = e.retrieve(t.value);
      if (i !== null) {
        let s = i.route;
        return (
          (s.value._futureSnapshot = t.value),
          (s.children = t.children.map((a) => bo(e, a))),
          s
        );
      }
    }
    let r = n0(t.value),
      o = t.children.map((i) => bo(e, i));
    return new Pe(r, o);
  }
}
function t0(e, t, n) {
  return t.children.map((r) => {
    for (let o of n.children)
      if (e.shouldReuseRoute(r.value, o.value.snapshot)) return bo(e, r, o);
    return bo(e, r);
  });
}
function n0(e) {
  return new en(
    new se(e.url),
    new se(e.params),
    new se(e.queryParams),
    new se(e.fragment),
    new se(e.data),
    e.outlet,
    e.component,
    e
  );
}
var Mo = class {
    redirectTo;
    navigationBehaviorOptions;
    constructor(t, n) {
      (this.redirectTo = t), (this.navigationBehaviorOptions = n);
    }
  },
  my = "ngNavigationCancelingError";
function ya(e, t) {
  let { redirectTo: n, navigationBehaviorOptions: r } = bn(t)
      ? { redirectTo: t, navigationBehaviorOptions: void 0 }
      : t,
    o = vy(!1, Fe.Redirect);
  return (o.url = n), (o.navigationBehaviorOptions = r), o;
}
function vy(e, t) {
  let n = new Error(`NavigationCancelingError: ${e || ""}`);
  return (n[my] = !0), (n.cancellationCode = t), n;
}
function r0(e) {
  return yy(e) && bn(e.url);
}
function yy(e) {
  return !!e && e[my];
}
var o0 = (e, t, n, r) =>
    N(
      (o) => (
        new yd(t, o.targetRouterState, o.currentRouterState, n, r).activate(e),
        o
      )
    ),
  yd = class {
    routeReuseStrategy;
    futureState;
    currState;
    forwardEvent;
    inputBindingEnabled;
    constructor(t, n, r, o, i) {
      (this.routeReuseStrategy = t),
        (this.futureState = n),
        (this.currState = r),
        (this.forwardEvent = o),
        (this.inputBindingEnabled = i);
    }
    activate(t) {
      let n = this.futureState._root,
        r = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(n, r, t),
        Kl(this.futureState.root),
        this.activateChildRoutes(n, r, t);
    }
    deactivateChildRoutes(t, n, r) {
      let o = pr(n);
      t.children.forEach((i) => {
        let s = i.value.outlet;
        this.deactivateRoutes(i, o[s], r), delete o[s];
      }),
        Object.values(o).forEach((i) => {
          this.deactivateRouteAndItsChildren(i, r);
        });
    }
    deactivateRoutes(t, n, r) {
      let o = t.value,
        i = n ? n.value : null;
      if (o === i)
        if (o.component) {
          let s = r.getContext(o.outlet);
          s && this.deactivateChildRoutes(t, n, s.children);
        } else this.deactivateChildRoutes(t, n, r);
      else i && this.deactivateRouteAndItsChildren(n, r);
    }
    deactivateRouteAndItsChildren(t, n) {
      t.value.component &&
      this.routeReuseStrategy.shouldDetach(t.value.snapshot)
        ? this.detachAndStoreRouteSubtree(t, n)
        : this.deactivateRouteAndOutlet(t, n);
    }
    detachAndStoreRouteSubtree(t, n) {
      let r = n.getContext(t.value.outlet),
        o = r && t.value.component ? r.children : n,
        i = pr(t);
      for (let s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
      if (r && r.outlet) {
        let s = r.outlet.detach(),
          a = r.children.onOutletDeactivated();
        this.routeReuseStrategy.store(t.value.snapshot, {
          componentRef: s,
          route: t,
          contexts: a,
        });
      }
    }
    deactivateRouteAndOutlet(t, n) {
      let r = n.getContext(t.value.outlet),
        o = r && t.value.component ? r.children : n,
        i = pr(t);
      for (let s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
      r &&
        (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()),
        (r.attachRef = null),
        (r.route = null));
    }
    activateChildRoutes(t, n, r) {
      let o = pr(n);
      t.children.forEach((i) => {
        this.activateRoutes(i, o[i.value.outlet], r),
          this.forwardEvent(new fd(i.value.snapshot));
      }),
        t.children.length && this.forwardEvent(new ld(t.value.snapshot));
    }
    activateRoutes(t, n, r) {
      let o = t.value,
        i = n ? n.value : null;
      if ((Kl(o), o === i))
        if (o.component) {
          let s = r.getOrCreateContext(o.outlet);
          this.activateChildRoutes(t, n, s.children);
        } else this.activateChildRoutes(t, n, r);
      else if (o.component) {
        let s = r.getOrCreateContext(o.outlet);
        if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(o.snapshot);
          this.routeReuseStrategy.store(o.snapshot, null),
            s.children.onOutletReAttached(a.contexts),
            (s.attachRef = a.componentRef),
            (s.route = a.route.value),
            s.outlet && s.outlet.attach(a.componentRef, a.route.value),
            Kl(a.route.value),
            this.activateChildRoutes(t, null, s.children);
        } else
          (s.attachRef = null),
            (s.route = o),
            s.outlet && s.outlet.activateWith(o, s.injector),
            this.activateChildRoutes(t, null, s.children);
      } else this.activateChildRoutes(t, null, r);
    }
  },
  Da = class {
    path;
    route;
    constructor(t) {
      (this.path = t), (this.route = this.path[this.path.length - 1]);
    }
  },
  vr = class {
    component;
    route;
    constructor(t, n) {
      (this.component = t), (this.route = n);
    }
  };
function i0(e, t, n) {
  let r = e._root,
    o = t ? t._root : null;
  return yo(r, o, n, [r.value]);
}
function s0(e) {
  let t = e.routeConfig ? e.routeConfig.canActivateChild : null;
  return !t || t.length === 0 ? null : { node: e, guards: t };
}
function Ir(e, t) {
  let n = Symbol(),
    r = t.get(e, n);
  return r === n ? (typeof e == "function" && !qh(e) ? e : t.get(e)) : r;
}
function yo(
  e,
  t,
  n,
  r,
  o = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let i = pr(t);
  return (
    e.children.forEach((s) => {
      a0(s, i[s.value.outlet], n, r.concat([s.value]), o),
        delete i[s.value.outlet];
    }),
    Object.entries(i).forEach(([s, a]) => Co(a, n.getContext(s), o)),
    o
  );
}
function a0(
  e,
  t,
  n,
  r,
  o = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let i = e.value,
    s = t ? t.value : null,
    a = n ? n.getContext(e.value.outlet) : null;
  if (s && i.routeConfig === s.routeConfig) {
    let c = c0(s, i, i.routeConfig.runGuardsAndResolvers);
    c
      ? o.canActivateChecks.push(new Da(r))
      : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
      i.component ? yo(e, t, a ? a.children : null, r, o) : yo(e, t, n, r, o),
      c &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        o.canDeactivateChecks.push(new vr(a.outlet.component, s));
  } else
    s && Co(t, a, o),
      o.canActivateChecks.push(new Da(r)),
      i.component
        ? yo(e, null, a ? a.children : null, r, o)
        : yo(e, null, n, r, o);
  return o;
}
function c0(e, t, n) {
  if (typeof n == "function") return n(e, t);
  switch (n) {
    case "pathParamsChange":
      return !_n(e.url, t.url);
    case "pathParamsOrQueryParamsChange":
      return !_n(e.url, t.url) || !ct(e.queryParams, t.queryParams);
    case "always":
      return !0;
    case "paramsOrQueryParamsChange":
      return !md(e, t) || !ct(e.queryParams, t.queryParams);
    case "paramsChange":
    default:
      return !md(e, t);
  }
}
function Co(e, t, n) {
  let r = pr(e),
    o = e.value;
  Object.entries(r).forEach(([i, s]) => {
    o.component
      ? t
        ? Co(s, t.children.getContext(i), n)
        : Co(s, null, n)
      : Co(s, t, n);
  }),
    o.component
      ? t && t.outlet && t.outlet.isActivated
        ? n.canDeactivateChecks.push(new vr(t.outlet.component, o))
        : n.canDeactivateChecks.push(new vr(null, o))
      : n.canDeactivateChecks.push(new vr(null, o));
}
function Po(e) {
  return typeof e == "function";
}
function u0(e) {
  return typeof e == "boolean";
}
function l0(e) {
  return e && Po(e.canLoad);
}
function d0(e) {
  return e && Po(e.canActivate);
}
function f0(e) {
  return e && Po(e.canActivateChild);
}
function h0(e) {
  return e && Po(e.canDeactivate);
}
function p0(e) {
  return e && Po(e.canMatch);
}
function Dy(e) {
  return e instanceof dt || e?.name === "EmptyError";
}
var ia = Symbol("INITIAL_VALUE");
function wr() {
  return De((e) =>
    Rr(e.map((t) => t.pipe(ht(1), Ja(ia)))).pipe(
      N((t) => {
        for (let n of t)
          if (n !== !0) {
            if (n === ia) return ia;
            if (n === !1 || g0(n)) return n;
          }
        return !0;
      }),
      ye((t) => t !== ia),
      ht(1)
    )
  );
}
function g0(e) {
  return bn(e) || e instanceof Mo;
}
function m0(e, t) {
  return X((n) => {
    let {
      targetSnapshot: r,
      currentSnapshot: o,
      guards: { canActivateChecks: i, canDeactivateChecks: s },
    } = n;
    return s.length === 0 && i.length === 0
      ? M(L(v({}, n), { guardsResult: !0 }))
      : v0(s, r, o, e).pipe(
          X((a) => (a && u0(a) ? y0(r, i, e, t) : M(a))),
          N((a) => L(v({}, n), { guardsResult: a }))
        );
  });
}
function v0(e, t, n, r) {
  return z(e).pipe(
    X((o) => I0(o.component, o.route, n, t, r)),
    pt((o) => o !== !0, !0)
  );
}
function y0(e, t, n, r) {
  return z(t).pipe(
    ft((o) =>
      Fn(
        E0(o.route.parent, r),
        D0(o.route, r),
        w0(e, o.path, n),
        C0(e, o.route, n)
      )
    ),
    pt((o) => o !== !0, !0)
  );
}
function D0(e, t) {
  return e !== null && t && t(new dd(e)), M(!0);
}
function E0(e, t) {
  return e !== null && t && t(new ud(e)), M(!0);
}
function C0(e, t, n) {
  let r = t.routeConfig ? t.routeConfig.canActivate : null;
  if (!r || r.length === 0) return M(!0);
  let o = r.map((i) =>
    yi(() => {
      let s = xo(t) ?? n,
        a = Ir(i, s),
        c = d0(a) ? a.canActivate(t, e) : _e(s, () => a(t, e));
      return tn(c).pipe(pt());
    })
  );
  return M(o).pipe(wr());
}
function w0(e, t, n) {
  let r = t[t.length - 1],
    i = t
      .slice(0, t.length - 1)
      .reverse()
      .map((s) => s0(s))
      .filter((s) => s !== null)
      .map((s) =>
        yi(() => {
          let a = s.guards.map((c) => {
            let u = xo(s.node) ?? n,
              l = Ir(c, u),
              d = f0(l) ? l.canActivateChild(r, e) : _e(u, () => l(r, e));
            return tn(d).pipe(pt());
          });
          return M(a).pipe(wr());
        })
      );
  return M(i).pipe(wr());
}
function I0(e, t, n, r, o) {
  let i = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
  if (!i || i.length === 0) return M(!0);
  let s = i.map((a) => {
    let c = xo(t) ?? o,
      u = Ir(a, c),
      l = h0(u) ? u.canDeactivate(e, t, n, r) : _e(c, () => u(e, t, n, r));
    return tn(l).pipe(pt());
  });
  return M(s).pipe(wr());
}
function _0(e, t, n, r) {
  let o = t.canLoad;
  if (o === void 0 || o.length === 0) return M(!0);
  let i = o.map((s) => {
    let a = Ir(s, e),
      c = l0(a) ? a.canLoad(t, n) : _e(e, () => a(t, n));
    return tn(c);
  });
  return M(i).pipe(wr(), Ey(r));
}
function Ey(e) {
  return Ga(
    ne((t) => {
      if (typeof t != "boolean") throw ya(e, t);
    }),
    N((t) => t === !0)
  );
}
function b0(e, t, n, r) {
  let o = t.canMatch;
  if (!o || o.length === 0) return M(!0);
  let i = o.map((s) => {
    let a = Ir(s, e),
      c = p0(a) ? a.canMatch(t, n) : _e(e, () => a(t, n));
    return tn(c);
  });
  return M(i).pipe(wr(), Ey(r));
}
var To = class {
    segmentGroup;
    constructor(t) {
      this.segmentGroup = t || null;
    }
  },
  So = class extends Error {
    urlTree;
    constructor(t) {
      super(), (this.urlTree = t);
    }
  };
function hr(e) {
  return On(new To(e));
}
function M0(e) {
  return On(new E(4e3, !1));
}
function T0(e) {
  return On(vy(!1, Fe.GuardRejected));
}
var Dd = class {
    urlSerializer;
    urlTree;
    constructor(t, n) {
      (this.urlSerializer = t), (this.urlTree = n);
    }
    lineralizeSegments(t, n) {
      let r = [],
        o = n.root;
      for (;;) {
        if (((r = r.concat(o.segments)), o.numberOfChildren === 0)) return M(r);
        if (o.numberOfChildren > 1 || !o.children[R])
          return M0(`${t.redirectTo}`);
        o = o.children[R];
      }
    }
    applyRedirectCommands(t, n, r, o, i) {
      if (typeof n != "string") {
        let a = n,
          {
            queryParams: c,
            fragment: u,
            routeConfig: l,
            url: d,
            outlet: h,
            params: f,
            data: g,
            title: m,
          } = o,
          D = _e(i, () =>
            a({
              params: f,
              data: g,
              queryParams: c,
              fragment: u,
              routeConfig: l,
              url: d,
              outlet: h,
              title: m,
            })
          );
        if (D instanceof Nt) throw new So(D);
        n = D;
      }
      let s = this.applyRedirectCreateUrlTree(
        n,
        this.urlSerializer.parse(n),
        t,
        r
      );
      if (n[0] === "/") throw new So(s);
      return s;
    }
    applyRedirectCreateUrlTree(t, n, r, o) {
      let i = this.createSegmentGroup(t, n.root, r, o);
      return new Nt(
        i,
        this.createQueryParams(n.queryParams, this.urlTree.queryParams),
        n.fragment
      );
    }
    createQueryParams(t, n) {
      let r = {};
      return (
        Object.entries(t).forEach(([o, i]) => {
          if (typeof i == "string" && i[0] === ":") {
            let a = i.substring(1);
            r[o] = n[a];
          } else r[o] = i;
        }),
        r
      );
    }
    createSegmentGroup(t, n, r, o) {
      let i = this.createSegments(t, n.segments, r, o),
        s = {};
      return (
        Object.entries(n.children).forEach(([a, c]) => {
          s[a] = this.createSegmentGroup(t, c, r, o);
        }),
        new $(i, s)
      );
    }
    createSegments(t, n, r, o) {
      return n.map((i) =>
        i.path[0] === ":" ? this.findPosParam(t, i, o) : this.findOrReturn(i, r)
      );
    }
    findPosParam(t, n, r) {
      let o = r[n.path.substring(1)];
      if (!o) throw new E(4001, !1);
      return o;
    }
    findOrReturn(t, n) {
      let r = 0;
      for (let o of n) {
        if (o.path === t.path) return n.splice(r), o;
        r++;
      }
      return t;
    }
  },
  Ed = {
    matched: !1,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {},
  };
function S0(e, t, n, r, o) {
  let i = Cy(e, t, n);
  return i.matched
    ? ((r = YS(t, r)),
      b0(r, t, n, o).pipe(N((s) => (s === !0 ? i : v({}, Ed)))))
    : M(i);
}
function Cy(e, t, n) {
  if (t.path === "**") return N0(n);
  if (t.path === "")
    return t.pathMatch === "full" && (e.hasChildren() || n.length > 0)
      ? v({}, Ed)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: n,
          parameters: {},
          positionalParamSegments: {},
        };
  let o = (t.matcher || IS)(n, e, t);
  if (!o) return v({}, Ed);
  let i = {};
  Object.entries(o.posParams ?? {}).forEach(([a, c]) => {
    i[a] = c.path;
  });
  let s =
    o.consumed.length > 0
      ? v(v({}, i), o.consumed[o.consumed.length - 1].parameters)
      : i;
  return {
    matched: !0,
    consumedSegments: o.consumed,
    remainingSegments: n.slice(o.consumed.length),
    parameters: s,
    positionalParamSegments: o.posParams ?? {},
  };
}
function N0(e) {
  return {
    matched: !0,
    parameters: e.length > 0 ? ey(e).parameters : {},
    consumedSegments: e,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function Zv(e, t, n, r) {
  return n.length > 0 && x0(e, n, r)
    ? {
        segmentGroup: new $(t, R0(r, new $(n, e.children))),
        slicedSegments: [],
      }
    : n.length === 0 && O0(e, n, r)
    ? {
        segmentGroup: new $(e.segments, A0(e, n, r, e.children)),
        slicedSegments: n,
      }
    : { segmentGroup: new $(e.segments, e.children), slicedSegments: n };
}
function A0(e, t, n, r) {
  let o = {};
  for (let i of n)
    if (wa(e, t, i) && !r[Xe(i)]) {
      let s = new $([], {});
      o[Xe(i)] = s;
    }
  return v(v({}, r), o);
}
function R0(e, t) {
  let n = {};
  n[R] = t;
  for (let r of e)
    if (r.path === "" && Xe(r) !== R) {
      let o = new $([], {});
      n[Xe(r)] = o;
    }
  return n;
}
function x0(e, t, n) {
  return n.some((r) => wa(e, t, r) && Xe(r) !== R);
}
function O0(e, t, n) {
  return n.some((r) => wa(e, t, r));
}
function wa(e, t, n) {
  return (e.hasChildren() || t.length > 0) && n.pathMatch === "full"
    ? !1
    : n.path === "";
}
function P0(e, t, n) {
  return t.length === 0 && !e.children[n];
}
var Cd = class {};
function F0(e, t, n, r, o, i, s = "emptyOnly") {
  return new wd(e, t, n, r, o, s, i).recognize();
}
var k0 = 31,
  wd = class {
    injector;
    configLoader;
    rootComponentType;
    config;
    urlTree;
    paramsInheritanceStrategy;
    urlSerializer;
    applyRedirects;
    absoluteRedirectCount = 0;
    allowRedirects = !0;
    constructor(t, n, r, o, i, s, a) {
      (this.injector = t),
        (this.configLoader = n),
        (this.rootComponentType = r),
        (this.config = o),
        (this.urlTree = i),
        (this.paramsInheritanceStrategy = s),
        (this.urlSerializer = a),
        (this.applyRedirects = new Dd(this.urlSerializer, this.urlTree));
    }
    noMatchError(t) {
      return new E(4002, `'${t.segmentGroup}'`);
    }
    recognize() {
      let t = Zv(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(t).pipe(
        N(({ children: n, rootSnapshot: r }) => {
          let o = new Pe(r, n),
            i = new va("", o),
            s = $S(r, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (s.queryParams = this.urlTree.queryParams),
            (i.url = this.urlSerializer.serialize(s)),
            { state: i, tree: s }
          );
        })
      );
    }
    match(t) {
      let n = new mr(
        [],
        Object.freeze({}),
        Object.freeze(v({}, this.urlTree.queryParams)),
        this.urlTree.fragment,
        Object.freeze({}),
        R,
        this.rootComponentType,
        null,
        {}
      );
      return this.processSegmentGroup(this.injector, this.config, t, R, n).pipe(
        N((r) => ({ children: r, rootSnapshot: n })),
        xt((r) => {
          if (r instanceof So)
            return (this.urlTree = r.urlTree), this.match(r.urlTree.root);
          throw r instanceof To ? this.noMatchError(r) : r;
        })
      );
    }
    processSegmentGroup(t, n, r, o, i) {
      return r.segments.length === 0 && r.hasChildren()
        ? this.processChildren(t, n, r, i)
        : this.processSegment(t, n, r, r.segments, o, !0, i).pipe(
            N((s) => (s instanceof Pe ? [s] : []))
          );
    }
    processChildren(t, n, r, o) {
      let i = [];
      for (let s of Object.keys(r.children))
        s === "primary" ? i.unshift(s) : i.push(s);
      return z(i).pipe(
        ft((s) => {
          let a = r.children[s],
            c = KS(n, s);
          return this.processSegmentGroup(t, c, a, s, o);
        }),
        Xa((s, a) => (s.push(...a), s)),
        Ot(null),
        Qa(),
        X((s) => {
          if (s === null) return hr(r);
          let a = wy(s);
          return L0(a), M(a);
        })
      );
    }
    processSegment(t, n, r, o, i, s, a) {
      return z(n).pipe(
        ft((c) =>
          this.processSegmentAgainstRoute(
            c._injector ?? t,
            n,
            c,
            r,
            o,
            i,
            s,
            a
          ).pipe(
            xt((u) => {
              if (u instanceof To) return M(null);
              throw u;
            })
          )
        ),
        pt((c) => !!c),
        xt((c) => {
          if (Dy(c)) return P0(r, o, i) ? M(new Cd()) : hr(r);
          throw c;
        })
      );
    }
    processSegmentAgainstRoute(t, n, r, o, i, s, a, c) {
      return Xe(r) !== s && (s === R || !wa(o, i, r))
        ? hr(o)
        : r.redirectTo === void 0
        ? this.matchSegmentAgainstRoute(t, o, r, i, s, c)
        : this.allowRedirects && a
        ? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, i, s, c)
        : hr(o);
    }
    expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s, a) {
      let {
        matched: c,
        parameters: u,
        consumedSegments: l,
        positionalParamSegments: d,
        remainingSegments: h,
      } = Cy(n, o, i);
      if (!c) return hr(n);
      typeof o.redirectTo == "string" &&
        o.redirectTo[0] === "/" &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > k0 && (this.allowRedirects = !1));
      let f = new mr(
          i,
          u,
          Object.freeze(v({}, this.urlTree.queryParams)),
          this.urlTree.fragment,
          Yv(o),
          Xe(o),
          o.component ?? o._loadedComponent ?? null,
          o,
          Kv(o)
        ),
        g = ma(f, a, this.paramsInheritanceStrategy);
      (f.params = Object.freeze(g.params)), (f.data = Object.freeze(g.data));
      let m = this.applyRedirects.applyRedirectCommands(
        l,
        o.redirectTo,
        d,
        f,
        t
      );
      return this.applyRedirects
        .lineralizeSegments(o, m)
        .pipe(X((D) => this.processSegment(t, r, n, D.concat(h), s, !1, a)));
    }
    matchSegmentAgainstRoute(t, n, r, o, i, s) {
      let a = S0(n, r, o, t, this.urlSerializer);
      return (
        r.path === "**" && (n.children = {}),
        a.pipe(
          De((c) =>
            c.matched
              ? ((t = r._injector ?? t),
                this.getChildConfig(t, r, o).pipe(
                  De(({ routes: u }) => {
                    let l = r._loadedInjector ?? t,
                      {
                        parameters: d,
                        consumedSegments: h,
                        remainingSegments: f,
                      } = c,
                      g = new mr(
                        h,
                        d,
                        Object.freeze(v({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        Yv(r),
                        Xe(r),
                        r.component ?? r._loadedComponent ?? null,
                        r,
                        Kv(r)
                      ),
                      m = ma(g, s, this.paramsInheritanceStrategy);
                    (g.params = Object.freeze(m.params)),
                      (g.data = Object.freeze(m.data));
                    let { segmentGroup: D, slicedSegments: w } = Zv(n, h, f, u);
                    if (w.length === 0 && D.hasChildren())
                      return this.processChildren(l, u, D, g).pipe(
                        N((x) => new Pe(g, x))
                      );
                    if (u.length === 0 && w.length === 0)
                      return M(new Pe(g, []));
                    let B = Xe(r) === i;
                    return this.processSegment(
                      l,
                      u,
                      D,
                      w,
                      B ? R : i,
                      !0,
                      g
                    ).pipe(N((x) => new Pe(g, x instanceof Pe ? [x] : [])));
                  })
                ))
              : hr(n)
          )
        )
      );
    }
    getChildConfig(t, n, r) {
      return n.children
        ? M({ routes: n.children, injector: t })
        : n.loadChildren
        ? n._loadedRoutes !== void 0
          ? M({ routes: n._loadedRoutes, injector: n._loadedInjector })
          : _0(t, n, r, this.urlSerializer).pipe(
              X((o) =>
                o
                  ? this.configLoader.loadChildren(t, n).pipe(
                      ne((i) => {
                        (n._loadedRoutes = i.routes),
                          (n._loadedInjector = i.injector);
                      })
                    )
                  : T0(n)
              )
            )
        : M({ routes: [], injector: t });
    }
  };
function L0(e) {
  e.sort((t, n) =>
    t.value.outlet === R
      ? -1
      : n.value.outlet === R
      ? 1
      : t.value.outlet.localeCompare(n.value.outlet)
  );
}
function V0(e) {
  let t = e.value.routeConfig;
  return t && t.path === "";
}
function wy(e) {
  let t = [],
    n = new Set();
  for (let r of e) {
    if (!V0(r)) {
      t.push(r);
      continue;
    }
    let o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
    o !== void 0 ? (o.children.push(...r.children), n.add(o)) : t.push(r);
  }
  for (let r of n) {
    let o = wy(r.children);
    t.push(new Pe(r.value, o));
  }
  return t.filter((r) => !n.has(r));
}
function Yv(e) {
  return e.data || {};
}
function Kv(e) {
  return e.resolve || {};
}
function j0(e, t, n, r, o, i) {
  return X((s) =>
    F0(e, t, n, r, s.extractedUrl, o, i).pipe(
      N(({ state: a, tree: c }) =>
        L(v({}, s), { targetSnapshot: a, urlAfterRedirects: c })
      )
    )
  );
}
function U0(e, t) {
  return X((n) => {
    let {
      targetSnapshot: r,
      guards: { canActivateChecks: o },
    } = n;
    if (!o.length) return M(n);
    let i = new Set(o.map((c) => c.route)),
      s = new Set();
    for (let c of i) if (!s.has(c)) for (let u of Iy(c)) s.add(u);
    let a = 0;
    return z(s).pipe(
      ft((c) =>
        i.has(c)
          ? B0(c, r, e, t)
          : ((c.data = ma(c, c.parent, e).resolve), M(void 0))
      ),
      ne(() => a++),
      kn(1),
      X((c) => (a === s.size ? M(n) : Me))
    );
  });
}
function Iy(e) {
  let t = e.children.map((n) => Iy(n)).flat();
  return [e, ...t];
}
function B0(e, t, n, r) {
  let o = e.routeConfig,
    i = e._resolve;
  return (
    o?.title !== void 0 && !gy(o) && (i[Ao] = o.title),
    $0(i, e, t, r).pipe(
      N(
        (s) => (
          (e._resolvedData = s), (e.data = ma(e, e.parent, n).resolve), null
        )
      )
    )
  );
}
function $0(e, t, n, r) {
  let o = Jl(e);
  if (o.length === 0) return M({});
  let i = {};
  return z(o).pipe(
    X((s) =>
      H0(e[s], t, n, r).pipe(
        pt(),
        ne((a) => {
          if (a instanceof Mo) throw ya(new Dr(), a);
          i[s] = a;
        })
      )
    ),
    kn(1),
    N(() => i),
    xt((s) => (Dy(s) ? Me : On(s)))
  );
}
function H0(e, t, n, r) {
  let o = xo(t) ?? r,
    i = Ir(e, o),
    s = i.resolve ? i.resolve(t, n) : _e(o, () => i(t, n));
  return tn(s);
}
function Ql(e) {
  return De((t) => {
    let n = e(t);
    return n ? z(n).pipe(N(() => t)) : M(t);
  });
}
var _y = (() => {
    class e {
      buildTitle(n) {
        let r,
          o = n.root;
        for (; o !== void 0; )
          (r = this.getResolvedTitleForRoute(o) ?? r),
            (o = o.children.find((i) => i.outlet === R));
        return r;
      }
      getResolvedTitleForRoute(n) {
        return n.data[Ao];
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({ token: e, factory: () => p(z0), providedIn: "root" });
    }
    return e;
  })(),
  z0 = (() => {
    class e extends _y {
      title;
      constructor(n) {
        super(), (this.title = n);
      }
      updateTitle(n) {
        let r = this.buildTitle(n);
        r !== void 0 && this.title.setTitle(r);
      }
      static ɵfac = function (r) {
        return new (r || e)(I(Bv));
      };
      static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  Fo = new y("", { providedIn: "root", factory: () => ({}) }),
  G0 = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵcmp = Tm({
        type: e,
        selectors: [["ng-component"]],
        exportAs: ["emptyRouterOutlet"],
        decls: 1,
        vars: 0,
        template: function (r, o) {
          r & 1 && Il(0, "router-outlet");
        },
        dependencies: [JS],
        encapsulation: 2,
      });
    }
    return e;
  })();
function bd(e) {
  let t = e.children && e.children.map(bd),
    n = t ? L(v({}, e), { children: t }) : v({}, e);
  return (
    !n.component &&
      !n.loadComponent &&
      (t || n.loadChildren) &&
      n.outlet &&
      n.outlet !== R &&
      (n.component = G0),
    n
  );
}
var No = new y(""),
  Md = (() => {
    class e {
      componentLoaders = new WeakMap();
      childrenLoaders = new WeakMap();
      onLoadStartListener;
      onLoadEndListener;
      compiler = p(Ws);
      loadComponent(n) {
        if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
        if (n._loadedComponent) return M(n._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(n);
        let r = tn(n.loadComponent()).pipe(
            N(by),
            ne((i) => {
              this.onLoadEndListener && this.onLoadEndListener(n),
                (n._loadedComponent = i);
            }),
            an(() => {
              this.componentLoaders.delete(n);
            })
          ),
          o = new xn(r, () => new te()).pipe(Rn());
        return this.componentLoaders.set(n, o), o;
      }
      loadChildren(n, r) {
        if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
        if (r._loadedRoutes)
          return M({ routes: r._loadedRoutes, injector: r._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(r);
        let i = q0(r, this.compiler, n, this.onLoadEndListener).pipe(
            an(() => {
              this.childrenLoaders.delete(r);
            })
          ),
          s = new xn(i, () => new te()).pipe(Rn());
        return this.childrenLoaders.set(r, s), s;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })();
function q0(e, t, n, r) {
  return tn(e.loadChildren()).pipe(
    N(by),
    X((o) =>
      o instanceof Hr || Array.isArray(o) ? M(o) : z(t.compileModuleAsync(o))
    ),
    N((o) => {
      r && r(e);
      let i,
        s,
        a = !1;
      return (
        Array.isArray(o)
          ? ((s = o), (a = !0))
          : ((i = o.create(n).injector),
            (s = i.get(No, [], { optional: !0, self: !0 }).flat())),
        { routes: s.map(bd), injector: i }
      );
    })
  );
}
function W0(e) {
  return e && typeof e == "object" && "default" in e;
}
function by(e) {
  return W0(e) ? e.default : e;
}
var Td = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({ token: e, factory: () => p(Z0), providedIn: "root" });
    }
    return e;
  })(),
  Z0 = (() => {
    class e {
      shouldProcessUrl(n) {
        return !0;
      }
      extract(n) {
        return n;
      }
      merge(n, r) {
        return n;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  My = new y(""),
  Ty = new y("");
function Y0(e, t, n) {
  let r = e.get(Ty),
    o = e.get(oe);
  return e.get(G).runOutsideAngular(() => {
    if (!o.startViewTransition || r.skipNextTransition)
      return (r.skipNextTransition = !1), new Promise((u) => setTimeout(u));
    let i,
      s = new Promise((u) => {
        i = u;
      }),
      a = o.startViewTransition(() => (i(), K0(e))),
      { onViewTransitionCreated: c } = r;
    return c && _e(e, () => c({ transition: a, from: t, to: n })), s;
  });
}
function K0(e) {
  return new Promise((t) => {
    Ts({ read: () => setTimeout(t) }, { injector: e });
  });
}
var Sy = new y(""),
  Sd = (() => {
    class e {
      currentNavigation = null;
      currentTransition = null;
      lastSuccessfulNavigation = null;
      events = new te();
      transitionAbortSubject = new te();
      configLoader = p(Md);
      environmentInjector = p(fe);
      urlSerializer = p(Ro);
      rootContexts = p(Oo);
      location = p(fr);
      inputBindingEnabled = p(Ca, { optional: !0 }) !== null;
      titleStrategy = p(_y);
      options = p(Fo, { optional: !0 }) || {};
      paramsInheritanceStrategy =
        this.options.paramsInheritanceStrategy || "emptyOnly";
      urlHandlingStrategy = p(Td);
      createViewTransition = p(My, { optional: !0 });
      navigationErrorHandler = p(Sy, { optional: !0 });
      navigationId = 0;
      get hasRequestedNavigation() {
        return this.navigationId !== 0;
      }
      transitions;
      afterPreactivation = () => M(void 0);
      rootComponentType = null;
      constructor() {
        let n = (o) => this.events.next(new ad(o)),
          r = (o) => this.events.next(new cd(o));
        (this.configLoader.onLoadEndListener = r),
          (this.configLoader.onLoadStartListener = n);
      }
      complete() {
        this.transitions?.complete();
      }
      handleNavigationRequest(n) {
        let r = ++this.navigationId;
        this.transitions?.next(
          L(v(v({}, this.transitions.value), n), { id: r })
        );
      }
      setupNavigations(n, r, o) {
        return (
          (this.transitions = new se({
            id: 0,
            currentUrlTree: r,
            currentRawUrl: r,
            extractedUrl: this.urlHandlingStrategy.extract(r),
            urlAfterRedirects: this.urlHandlingStrategy.extract(r),
            rawUrl: r,
            extras: {},
            resolve: () => {},
            reject: () => {},
            promise: Promise.resolve(!0),
            source: Eo,
            restoredState: null,
            currentSnapshot: o.snapshot,
            targetSnapshot: null,
            currentRouterState: o,
            targetRouterState: null,
            guards: { canActivateChecks: [], canDeactivateChecks: [] },
            guardsResult: null,
          })),
          this.transitions.pipe(
            ye((i) => i.id !== 0),
            N((i) =>
              L(v({}, i), {
                extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl),
              })
            ),
            De((i) => {
              let s = !1,
                a = !1;
              return M(i).pipe(
                De((c) => {
                  if (this.navigationId > i.id)
                    return (
                      this.cancelNavigationTransition(
                        i,
                        "",
                        Fe.SupersededByNewNavigation
                      ),
                      Me
                    );
                  (this.currentTransition = i),
                    (this.currentNavigation = {
                      id: c.id,
                      initialUrl: c.rawUrl,
                      extractedUrl: c.extractedUrl,
                      targetBrowserUrl:
                        typeof c.extras.browserUrl == "string"
                          ? this.urlSerializer.parse(c.extras.browserUrl)
                          : c.extras.browserUrl,
                      trigger: c.source,
                      extras: c.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? L(v({}, this.lastSuccessfulNavigation), {
                            previousNavigation: null,
                          })
                        : null,
                    });
                  let u =
                      !n.navigated ||
                      this.isUpdatingInternalState() ||
                      this.isUpdatedBrowserUrl(),
                    l = c.extras.onSameUrlNavigation ?? n.onSameUrlNavigation;
                  if (!u && l !== "reload") {
                    let d = "";
                    return (
                      this.events.next(
                        new Jt(
                          c.id,
                          this.urlSerializer.serialize(c.rawUrl),
                          d,
                          da.IgnoredSameUrlNavigation
                        )
                      ),
                      c.resolve(!1),
                      Me
                    );
                  }
                  if (this.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))
                    return M(c).pipe(
                      De((d) => {
                        let h = this.transitions?.getValue();
                        return (
                          this.events.next(
                            new Er(
                              d.id,
                              this.urlSerializer.serialize(d.extractedUrl),
                              d.source,
                              d.restoredState
                            )
                          ),
                          h !== this.transitions?.getValue()
                            ? Me
                            : Promise.resolve(d)
                        );
                      }),
                      j0(
                        this.environmentInjector,
                        this.configLoader,
                        this.rootComponentType,
                        n.config,
                        this.urlSerializer,
                        this.paramsInheritanceStrategy
                      ),
                      ne((d) => {
                        (i.targetSnapshot = d.targetSnapshot),
                          (i.urlAfterRedirects = d.urlAfterRedirects),
                          (this.currentNavigation = L(
                            v({}, this.currentNavigation),
                            { finalUrl: d.urlAfterRedirects }
                          ));
                        let h = new fa(
                          d.id,
                          this.urlSerializer.serialize(d.extractedUrl),
                          this.urlSerializer.serialize(d.urlAfterRedirects),
                          d.targetSnapshot
                        );
                        this.events.next(h);
                      })
                    );
                  if (
                    u &&
                    this.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)
                  ) {
                    let {
                        id: d,
                        extractedUrl: h,
                        source: f,
                        restoredState: g,
                        extras: m,
                      } = c,
                      D = new Er(d, this.urlSerializer.serialize(h), f, g);
                    this.events.next(D);
                    let w = hy(this.rootComponentType).snapshot;
                    return (
                      (this.currentTransition = i =
                        L(v({}, c), {
                          targetSnapshot: w,
                          urlAfterRedirects: h,
                          extras: L(v({}, m), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })),
                      (this.currentNavigation.finalUrl = h),
                      M(i)
                    );
                  } else {
                    let d = "";
                    return (
                      this.events.next(
                        new Jt(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          d,
                          da.IgnoredByUrlHandlingStrategy
                        )
                      ),
                      c.resolve(!1),
                      Me
                    );
                  }
                }),
                ne((c) => {
                  let u = new rd(
                    c.id,
                    this.urlSerializer.serialize(c.extractedUrl),
                    this.urlSerializer.serialize(c.urlAfterRedirects),
                    c.targetSnapshot
                  );
                  this.events.next(u);
                }),
                N(
                  (c) => (
                    (this.currentTransition = i =
                      L(v({}, c), {
                        guards: i0(
                          c.targetSnapshot,
                          c.currentSnapshot,
                          this.rootContexts
                        ),
                      })),
                    i
                  )
                ),
                m0(this.environmentInjector, (c) => this.events.next(c)),
                ne((c) => {
                  if (
                    ((i.guardsResult = c.guardsResult),
                    c.guardsResult && typeof c.guardsResult != "boolean")
                  )
                    throw ya(this.urlSerializer, c.guardsResult);
                  let u = new od(
                    c.id,
                    this.urlSerializer.serialize(c.extractedUrl),
                    this.urlSerializer.serialize(c.urlAfterRedirects),
                    c.targetSnapshot,
                    !!c.guardsResult
                  );
                  this.events.next(u);
                }),
                ye((c) =>
                  c.guardsResult
                    ? !0
                    : (this.cancelNavigationTransition(c, "", Fe.GuardRejected),
                      !1)
                ),
                Ql((c) => {
                  if (c.guards.canActivateChecks.length)
                    return M(c).pipe(
                      ne((u) => {
                        let l = new id(
                          u.id,
                          this.urlSerializer.serialize(u.extractedUrl),
                          this.urlSerializer.serialize(u.urlAfterRedirects),
                          u.targetSnapshot
                        );
                        this.events.next(l);
                      }),
                      De((u) => {
                        let l = !1;
                        return M(u).pipe(
                          U0(
                            this.paramsInheritanceStrategy,
                            this.environmentInjector
                          ),
                          ne({
                            next: () => (l = !0),
                            complete: () => {
                              l ||
                                this.cancelNavigationTransition(
                                  u,
                                  "",
                                  Fe.NoDataFromResolver
                                );
                            },
                          })
                        );
                      }),
                      ne((u) => {
                        let l = new sd(
                          u.id,
                          this.urlSerializer.serialize(u.extractedUrl),
                          this.urlSerializer.serialize(u.urlAfterRedirects),
                          u.targetSnapshot
                        );
                        this.events.next(l);
                      })
                    );
                }),
                Ql((c) => {
                  let u = (l) => {
                    let d = [];
                    l.routeConfig?.loadComponent &&
                      !l.routeConfig._loadedComponent &&
                      d.push(
                        this.configLoader.loadComponent(l.routeConfig).pipe(
                          ne((h) => {
                            l.component = h;
                          }),
                          N(() => {})
                        )
                      );
                    for (let h of l.children) d.push(...u(h));
                    return d;
                  };
                  return Rr(u(c.targetSnapshot.root)).pipe(Ot(null), ht(1));
                }),
                Ql(() => this.afterPreactivation()),
                De(() => {
                  let { currentSnapshot: c, targetSnapshot: u } = i,
                    l = this.createViewTransition?.(
                      this.environmentInjector,
                      c.root,
                      u.root
                    );
                  return l ? z(l).pipe(N(() => i)) : M(i);
                }),
                N((c) => {
                  let u = e0(
                    n.routeReuseStrategy,
                    c.targetSnapshot,
                    c.currentRouterState
                  );
                  return (
                    (this.currentTransition = i =
                      L(v({}, c), { targetRouterState: u })),
                    (this.currentNavigation.targetRouterState = u),
                    i
                  );
                }),
                ne(() => {
                  this.events.next(new _o());
                }),
                o0(
                  this.rootContexts,
                  n.routeReuseStrategy,
                  (c) => this.events.next(c),
                  this.inputBindingEnabled
                ),
                ht(1),
                ne({
                  next: (c) => {
                    (s = !0),
                      (this.lastSuccessfulNavigation = this.currentNavigation),
                      this.events.next(
                        new ut(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects)
                        )
                      ),
                      this.titleStrategy?.updateTitle(
                        c.targetRouterState.snapshot
                      ),
                      c.resolve(!0);
                  },
                  complete: () => {
                    s = !0;
                  },
                }),
                ec(
                  this.transitionAbortSubject.pipe(
                    ne((c) => {
                      throw c;
                    })
                  )
                ),
                an(() => {
                  !s &&
                    !a &&
                    this.cancelNavigationTransition(
                      i,
                      "",
                      Fe.SupersededByNewNavigation
                    ),
                    this.currentTransition?.id === i.id &&
                      ((this.currentNavigation = null),
                      (this.currentTransition = null));
                }),
                xt((c) => {
                  if (((a = !0), yy(c)))
                    this.events.next(
                      new St(
                        i.id,
                        this.urlSerializer.serialize(i.extractedUrl),
                        c.message,
                        c.cancellationCode
                      )
                    ),
                      r0(c)
                        ? this.events.next(
                            new Cr(c.url, c.navigationBehaviorOptions)
                          )
                        : i.resolve(!1);
                  else {
                    let u = new Io(
                      i.id,
                      this.urlSerializer.serialize(i.extractedUrl),
                      c,
                      i.targetSnapshot ?? void 0
                    );
                    try {
                      let l = _e(this.environmentInjector, () =>
                        this.navigationErrorHandler?.(u)
                      );
                      if (l instanceof Mo) {
                        let { message: d, cancellationCode: h } = ya(
                          this.urlSerializer,
                          l
                        );
                        this.events.next(
                          new St(
                            i.id,
                            this.urlSerializer.serialize(i.extractedUrl),
                            d,
                            h
                          )
                        ),
                          this.events.next(
                            new Cr(l.redirectTo, l.navigationBehaviorOptions)
                          );
                      } else throw (this.events.next(u), c);
                    } catch (l) {
                      this.options.resolveNavigationPromiseOnError
                        ? i.resolve(!1)
                        : i.reject(l);
                    }
                  }
                  return Me;
                })
              );
            })
          )
        );
      }
      cancelNavigationTransition(n, r, o) {
        let i = new St(
          n.id,
          this.urlSerializer.serialize(n.extractedUrl),
          r,
          o
        );
        this.events.next(i), n.resolve(!1);
      }
      isUpdatingInternalState() {
        return (
          this.currentTransition?.extractedUrl.toString() !==
          this.currentTransition?.currentUrlTree.toString()
        );
      }
      isUpdatedBrowserUrl() {
        let n = this.urlHandlingStrategy.extract(
            this.urlSerializer.parse(this.location.path(!0))
          ),
          r =
            this.currentNavigation?.targetBrowserUrl ??
            this.currentNavigation?.extractedUrl;
        return (
          n.toString() !== r?.toString() &&
          !this.currentNavigation?.extras.skipLocationChange
        );
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })();
function Q0(e) {
  return e !== Eo;
}
var X0 = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({ token: e, factory: () => p(J0), providedIn: "root" });
    }
    return e;
  })(),
  Id = class {
    shouldDetach(t) {
      return !1;
    }
    store(t, n) {}
    shouldAttach(t) {
      return !1;
    }
    retrieve(t) {
      return null;
    }
    shouldReuseRoute(t, n) {
      return t.routeConfig === n.routeConfig;
    }
  },
  J0 = (() => {
    class e extends Id {
      static ɵfac = (() => {
        let n;
        return function (o) {
          return (n || (n = qt(e)))(o || e);
        };
      })();
      static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  Ny = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({ token: e, factory: () => p(eN), providedIn: "root" });
    }
    return e;
  })(),
  eN = (() => {
    class e extends Ny {
      location = p(fr);
      urlSerializer = p(Ro);
      options = p(Fo, { optional: !0 }) || {};
      canceledNavigationResolution =
        this.options.canceledNavigationResolution || "replace";
      urlHandlingStrategy = p(Td);
      urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
      currentUrlTree = new Nt();
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      rawUrlTree = this.currentUrlTree;
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      currentPageId = 0;
      lastSuccessfulId = -1;
      restoredState() {
        return this.location.getState();
      }
      get browserPageId() {
        return this.canceledNavigationResolution !== "computed"
          ? this.currentPageId
          : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
      }
      routerState = hy(null);
      getRouterState() {
        return this.routerState;
      }
      stateMemento = this.createStateMemento();
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState,
        };
      }
      registerNonRouterCurrentEntryChangeListener(n) {
        return this.location.subscribe((r) => {
          r.type === "popstate" && n(r.url, r.state);
        });
      }
      handleRouterEvent(n, r) {
        if (n instanceof Er) this.stateMemento = this.createStateMemento();
        else if (n instanceof Jt) this.rawUrlTree = r.initialUrl;
        else if (n instanceof fa) {
          if (
            this.urlUpdateStrategy === "eager" &&
            !r.extras.skipLocationChange
          ) {
            let o = this.urlHandlingStrategy.merge(r.finalUrl, r.initialUrl);
            this.setBrowserUrl(r.targetBrowserUrl ?? o, r);
          }
        } else
          n instanceof _o
            ? ((this.currentUrlTree = r.finalUrl),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                r.finalUrl,
                r.initialUrl
              )),
              (this.routerState = r.targetRouterState),
              this.urlUpdateStrategy === "deferred" &&
                !r.extras.skipLocationChange &&
                this.setBrowserUrl(r.targetBrowserUrl ?? this.rawUrlTree, r))
            : n instanceof St &&
              (n.code === Fe.GuardRejected || n.code === Fe.NoDataFromResolver)
            ? this.restoreHistory(r)
            : n instanceof Io
            ? this.restoreHistory(r, !0)
            : n instanceof ut &&
              ((this.lastSuccessfulId = n.id),
              (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(n, r) {
        let o = n instanceof Nt ? this.urlSerializer.serialize(n) : n;
        if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
          let i = this.browserPageId,
            s = v(v({}, r.extras.state), this.generateNgRouterState(r.id, i));
          this.location.replaceState(o, "", s);
        } else {
          let i = v(
            v({}, r.extras.state),
            this.generateNgRouterState(r.id, this.browserPageId + 1)
          );
          this.location.go(o, "", i);
        }
      }
      restoreHistory(n, r = !1) {
        if (this.canceledNavigationResolution === "computed") {
          let o = this.browserPageId,
            i = this.currentPageId - o;
          i !== 0
            ? this.location.historyGo(i)
            : this.currentUrlTree === n.finalUrl &&
              i === 0 &&
              (this.resetState(n), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === "replace" &&
            (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
      }
      resetState(n) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            n.finalUrl ?? this.rawUrlTree
          ));
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.rawUrlTree),
          "",
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(n, r) {
        return this.canceledNavigationResolution === "computed"
          ? { navigationId: n, ɵrouterPageId: r }
          : { navigationId: n };
      }
      static ɵfac = (() => {
        let n;
        return function (o) {
          return (n || (n = qt(e)))(o || e);
        };
      })();
      static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })();
function Ay(e, t) {
  e.events
    .pipe(
      ye(
        (n) =>
          n instanceof ut ||
          n instanceof St ||
          n instanceof Io ||
          n instanceof Jt
      ),
      N((n) =>
        n instanceof ut || n instanceof Jt
          ? 0
          : (
              n instanceof St
                ? n.code === Fe.Redirect ||
                  n.code === Fe.SupersededByNewNavigation
                : !1
            )
          ? 2
          : 1
      ),
      ye((n) => n !== 2),
      ht(1)
    )
    .subscribe(() => {
      t();
    });
}
var tN = {
    paths: "exact",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "exact",
  },
  nN = {
    paths: "subset",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "subset",
  },
  At = (() => {
    class e {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      disposed = !1;
      nonRouterCurrentEntryChangeSubscription;
      console = p(El);
      stateManager = p(Ny);
      options = p(Fo, { optional: !0 }) || {};
      pendingTasks = p(it);
      urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
      navigationTransitions = p(Sd);
      urlSerializer = p(Ro);
      location = p(fr);
      urlHandlingStrategy = p(Td);
      _events = new te();
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      navigated = !1;
      routeReuseStrategy = p(X0);
      onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore";
      config = p(No, { optional: !0 })?.flat() ?? [];
      componentInputBindingEnabled = !!p(Ca, { optional: !0 });
      constructor() {
        this.resetConfig(this.config),
          this.navigationTransitions
            .setupNavigations(this, this.currentUrlTree, this.routerState)
            .subscribe({
              error: (n) => {
                this.console.warn(n);
              },
            }),
          this.subscribeToNavigationEvents();
      }
      eventsSubscription = new K();
      subscribeToNavigationEvents() {
        let n = this.navigationTransitions.events.subscribe((r) => {
          try {
            let o = this.navigationTransitions.currentTransition,
              i = this.navigationTransitions.currentNavigation;
            if (o !== null && i !== null) {
              if (
                (this.stateManager.handleRouterEvent(r, i),
                r instanceof St &&
                  r.code !== Fe.Redirect &&
                  r.code !== Fe.SupersededByNewNavigation)
              )
                this.navigated = !0;
              else if (r instanceof ut) this.navigated = !0;
              else if (r instanceof Cr) {
                let s = r.navigationBehaviorOptions,
                  a = this.urlHandlingStrategy.merge(r.url, o.currentRawUrl),
                  c = v(
                    {
                      browserUrl: o.extras.browserUrl,
                      info: o.extras.info,
                      skipLocationChange: o.extras.skipLocationChange,
                      replaceUrl:
                        o.extras.replaceUrl ||
                        this.urlUpdateStrategy === "eager" ||
                        Q0(o.source),
                    },
                    s
                  );
                this.scheduleNavigation(a, Eo, null, c, {
                  resolve: o.resolve,
                  reject: o.reject,
                  promise: o.promise,
                });
              }
            }
            oN(r) && this._events.next(r);
          } catch (o) {
            this.navigationTransitions.transitionAbortSubject.next(o);
          }
        });
        this.eventsSubscription.add(n);
      }
      resetRootComponentType(n) {
        (this.routerState.root.component = n),
          (this.navigationTransitions.rootComponentType = n);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              Eo,
              this.stateManager.restoredState()
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??=
          this.stateManager.registerNonRouterCurrentEntryChangeListener(
            (n, r) => {
              setTimeout(() => {
                this.navigateToSyncWithBrowser(n, "popstate", r);
              }, 0);
            }
          );
      }
      navigateToSyncWithBrowser(n, r, o) {
        let i = { replaceUrl: !0 },
          s = o?.navigationId ? o : null;
        if (o) {
          let c = v({}, o);
          delete c.navigationId,
            delete c.ɵrouterPageId,
            Object.keys(c).length !== 0 && (i.state = c);
        }
        let a = this.parseUrl(n);
        this.scheduleNavigation(a, r, s, i);
      }
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      getCurrentNavigation() {
        return this.navigationTransitions.currentNavigation;
      }
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      resetConfig(n) {
        (this.config = n.map(bd)), (this.navigated = !1);
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this._events.unsubscribe(),
          this.navigationTransitions.complete(),
          this.nonRouterCurrentEntryChangeSubscription &&
            (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
            (this.nonRouterCurrentEntryChangeSubscription = void 0)),
          (this.disposed = !0),
          this.eventsSubscription.unsubscribe();
      }
      createUrlTree(n, r = {}) {
        let {
            relativeTo: o,
            queryParams: i,
            fragment: s,
            queryParamsHandling: a,
            preserveFragment: c,
          } = r,
          u = c ? this.currentUrlTree.fragment : s,
          l = null;
        switch (a ?? this.options.defaultQueryParamsHandling) {
          case "merge":
            l = v(v({}, this.currentUrlTree.queryParams), i);
            break;
          case "preserve":
            l = this.currentUrlTree.queryParams;
            break;
          default:
            l = i || null;
        }
        l !== null && (l = this.removeEmptyProps(l));
        let d;
        try {
          let h = o ? o.snapshot : this.routerState.snapshot.root;
          d = uy(h);
        } catch {
          (typeof n[0] != "string" || n[0][0] !== "/") && (n = []),
            (d = this.currentUrlTree.root);
        }
        return ly(d, n, l, u ?? null);
      }
      navigateByUrl(n, r = { skipLocationChange: !1 }) {
        let o = bn(n) ? n : this.parseUrl(n),
          i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
        return this.scheduleNavigation(i, Eo, null, r);
      }
      navigate(n, r = { skipLocationChange: !1 }) {
        return rN(n), this.navigateByUrl(this.createUrlTree(n, r), r);
      }
      serializeUrl(n) {
        return this.urlSerializer.serialize(n);
      }
      parseUrl(n) {
        try {
          return this.urlSerializer.parse(n);
        } catch {
          return this.urlSerializer.parse("/");
        }
      }
      isActive(n, r) {
        let o;
        if (
          (r === !0 ? (o = v({}, tN)) : r === !1 ? (o = v({}, nN)) : (o = r),
          bn(n))
        )
          return Hv(this.currentUrlTree, n, o);
        let i = this.parseUrl(n);
        return Hv(this.currentUrlTree, i, o);
      }
      removeEmptyProps(n) {
        return Object.entries(n).reduce(
          (r, [o, i]) => (i != null && (r[o] = i), r),
          {}
        );
      }
      scheduleNavigation(n, r, o, i, s) {
        if (this.disposed) return Promise.resolve(!1);
        let a, c, u;
        s
          ? ((a = s.resolve), (c = s.reject), (u = s.promise))
          : (u = new Promise((d, h) => {
              (a = d), (c = h);
            }));
        let l = this.pendingTasks.add();
        return (
          Ay(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(l));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: r,
            restoredState: o,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: n,
            extras: i,
            resolve: a,
            reject: c,
            promise: u,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          u.catch((d) => Promise.reject(d))
        );
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })();
function rN(e) {
  for (let t = 0; t < e.length; t++) if (e[t] == null) throw new E(4008, !1);
}
function oN(e) {
  return !(e instanceof _o) && !(e instanceof Cr);
}
var tL = (() => {
  class e {
    router;
    route;
    tabIndexAttribute;
    renderer;
    el;
    locationStrategy;
    href = null;
    target;
    queryParams;
    fragment;
    queryParamsHandling;
    state;
    info;
    relativeTo;
    isAnchorElement;
    subscription;
    onChanges = new te();
    constructor(n, r, o, i, s, a) {
      (this.router = n),
        (this.route = r),
        (this.tabIndexAttribute = o),
        (this.renderer = i),
        (this.el = s),
        (this.locationStrategy = a);
      let c = s.nativeElement.tagName?.toLowerCase();
      (this.isAnchorElement = c === "a" || c === "area"),
        this.isAnchorElement
          ? (this.subscription = n.events.subscribe((u) => {
              u instanceof ut && this.updateHref();
            }))
          : this.setTabIndexIfNotOnNativeEl("0");
    }
    preserveFragment = !1;
    skipLocationChange = !1;
    replaceUrl = !1;
    setTabIndexIfNotOnNativeEl(n) {
      this.tabIndexAttribute != null ||
        this.isAnchorElement ||
        this.applyAttributeValue("tabindex", n);
    }
    ngOnChanges(n) {
      this.isAnchorElement && this.updateHref(), this.onChanges.next(this);
    }
    routerLinkInput = null;
    set routerLink(n) {
      n == null
        ? ((this.routerLinkInput = null), this.setTabIndexIfNotOnNativeEl(null))
        : (bn(n)
            ? (this.routerLinkInput = n)
            : (this.routerLinkInput = Array.isArray(n) ? n : [n]),
          this.setTabIndexIfNotOnNativeEl("0"));
    }
    onClick(n, r, o, i, s) {
      let a = this.urlTree;
      if (
        a === null ||
        (this.isAnchorElement &&
          (n !== 0 ||
            r ||
            o ||
            i ||
            s ||
            (typeof this.target == "string" && this.target != "_self")))
      )
        return !0;
      let c = {
        skipLocationChange: this.skipLocationChange,
        replaceUrl: this.replaceUrl,
        state: this.state,
        info: this.info,
      };
      return this.router.navigateByUrl(a, c), !this.isAnchorElement;
    }
    ngOnDestroy() {
      this.subscription?.unsubscribe();
    }
    updateHref() {
      let n = this.urlTree;
      this.href =
        n !== null && this.locationStrategy
          ? this.locationStrategy?.prepareExternalUrl(
              this.router.serializeUrl(n)
            )
          : null;
      let r =
        this.href === null
          ? null
          : Lg(this.href, this.el.nativeElement.tagName.toLowerCase(), "href");
      this.applyAttributeValue("href", r);
    }
    applyAttributeValue(n, r) {
      let o = this.renderer,
        i = this.el.nativeElement;
      r !== null ? o.setAttribute(i, n, r) : o.removeAttribute(i, n);
    }
    get urlTree() {
      return this.routerLinkInput === null
        ? null
        : bn(this.routerLinkInput)
        ? this.routerLinkInput
        : this.router.createUrlTree(this.routerLinkInput, {
            relativeTo:
              this.relativeTo !== void 0 ? this.relativeTo : this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: this.preserveFragment,
          });
    }
    static ɵfac = function (r) {
      return new (r || e)(V(At), V(en), qu("tabindex"), V(Qe), V(Ue), V(Tt));
    };
    static ɵdir = ue({
      type: e,
      selectors: [["", "routerLink", ""]],
      hostVars: 1,
      hostBindings: function (r, o) {
        r & 1 &&
          Zt("click", function (s) {
            return o.onClick(
              s.button,
              s.ctrlKey,
              s.shiftKey,
              s.altKey,
              s.metaKey
            );
          }),
          r & 2 && qs("target", o.target);
      },
      inputs: {
        target: "target",
        queryParams: "queryParams",
        fragment: "fragment",
        queryParamsHandling: "queryParamsHandling",
        state: "state",
        info: "info",
        relativeTo: "relativeTo",
        preserveFragment: [2, "preserveFragment", "preserveFragment", Cn],
        skipLocationChange: [2, "skipLocationChange", "skipLocationChange", Cn],
        replaceUrl: [2, "replaceUrl", "replaceUrl", Cn],
        routerLink: "routerLink",
      },
      features: [Dl, sr],
    });
  }
  return e;
})();
var Ea = class {};
var iN = (() => {
    class e {
      router;
      injector;
      preloadingStrategy;
      loader;
      subscription;
      constructor(n, r, o, i, s) {
        (this.router = n),
          (this.injector = o),
          (this.preloadingStrategy = i),
          (this.loader = s);
      }
      setUpPreloading() {
        this.subscription = this.router.events
          .pipe(
            ye((n) => n instanceof ut),
            ft(() => this.preload())
          )
          .subscribe(() => {});
      }
      preload() {
        return this.processRoutes(this.injector, this.router.config);
      }
      ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
      }
      processRoutes(n, r) {
        let o = [];
        for (let i of r) {
          i.providers &&
            !i._injector &&
            (i._injector = oo(i.providers, n, `Route: ${i.path}`));
          let s = i._injector ?? n,
            a = i._loadedInjector ?? s;
          ((i.loadChildren && !i._loadedRoutes && i.canLoad === void 0) ||
            (i.loadComponent && !i._loadedComponent)) &&
            o.push(this.preloadConfig(s, i)),
            (i.children || i._loadedRoutes) &&
              o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
        }
        return z(o).pipe(Pn());
      }
      preloadConfig(n, r) {
        return this.preloadingStrategy.preload(r, () => {
          let o;
          r.loadChildren && r.canLoad === void 0
            ? (o = this.loader.loadChildren(n, r))
            : (o = M(null));
          let i = o.pipe(
            X((s) =>
              s === null
                ? M(void 0)
                : ((r._loadedRoutes = s.routes),
                  (r._loadedInjector = s.injector),
                  this.processRoutes(s.injector ?? n, s.routes))
            )
          );
          if (r.loadComponent && !r._loadedComponent) {
            let s = this.loader.loadComponent(r);
            return z([i, s]).pipe(Pn());
          } else return i;
        });
      }
      static ɵfac = function (r) {
        return new (r || e)(I(At), I(Ws), I(fe), I(Ea), I(Md));
      };
      static ɵprov = C({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })(),
  Ry = new y(""),
  sN = (() => {
    class e {
      urlSerializer;
      transitions;
      viewportScroller;
      zone;
      options;
      routerEventsSubscription;
      scrollEventsSubscription;
      lastId = 0;
      lastSource = "imperative";
      restoredId = 0;
      store = {};
      constructor(n, r, o, i, s = {}) {
        (this.urlSerializer = n),
          (this.transitions = r),
          (this.viewportScroller = o),
          (this.zone = i),
          (this.options = s),
          (s.scrollPositionRestoration ||= "disabled"),
          (s.anchorScrolling ||= "disabled");
      }
      init() {
        this.options.scrollPositionRestoration !== "disabled" &&
          this.viewportScroller.setHistoryScrollRestoration("manual"),
          (this.routerEventsSubscription = this.createScrollEvents()),
          (this.scrollEventsSubscription = this.consumeScrollEvents());
      }
      createScrollEvents() {
        return this.transitions.events.subscribe((n) => {
          n instanceof Er
            ? ((this.store[this.lastId] =
                this.viewportScroller.getScrollPosition()),
              (this.lastSource = n.navigationTrigger),
              (this.restoredId = n.restoredState
                ? n.restoredState.navigationId
                : 0))
            : n instanceof ut
            ? ((this.lastId = n.id),
              this.scheduleScrollEvent(
                n,
                this.urlSerializer.parse(n.urlAfterRedirects).fragment
              ))
            : n instanceof Jt &&
              n.code === da.IgnoredSameUrlNavigation &&
              ((this.lastSource = void 0),
              (this.restoredId = 0),
              this.scheduleScrollEvent(
                n,
                this.urlSerializer.parse(n.url).fragment
              ));
        });
      }
      consumeScrollEvents() {
        return this.transitions.events.subscribe((n) => {
          n instanceof ha &&
            (n.position
              ? this.options.scrollPositionRestoration === "top"
                ? this.viewportScroller.scrollToPosition([0, 0])
                : this.options.scrollPositionRestoration === "enabled" &&
                  this.viewportScroller.scrollToPosition(n.position)
              : n.anchor && this.options.anchorScrolling === "enabled"
              ? this.viewportScroller.scrollToAnchor(n.anchor)
              : this.options.scrollPositionRestoration !== "disabled" &&
                this.viewportScroller.scrollToPosition([0, 0]));
        });
      }
      scheduleScrollEvent(n, r) {
        this.zone.runOutsideAngular(() => {
          setTimeout(() => {
            this.zone.run(() => {
              this.transitions.events.next(
                new ha(
                  n,
                  this.lastSource === "popstate"
                    ? this.store[this.restoredId]
                    : null,
                  r
                )
              );
            });
          }, 0);
        });
      }
      ngOnDestroy() {
        this.routerEventsSubscription?.unsubscribe(),
          this.scrollEventsSubscription?.unsubscribe();
      }
      static ɵfac = function (r) {
        Qg();
      };
      static ɵprov = C({ token: e, factory: e.ɵfac });
    }
    return e;
  })();
function nL(e, ...t) {
  return $t([
    { provide: No, multi: !0, useValue: e },
    [],
    { provide: en, useFactory: xy, deps: [At] },
    { provide: Wt, multi: !0, useFactory: Oy },
    t.map((n) => n.ɵproviders),
  ]);
}
function xy(e) {
  return e.routerState.root;
}
function ko(e, t) {
  return { ɵkind: e, ɵproviders: t };
}
function Oy() {
  let e = p(he);
  return (t) => {
    let n = e.get(Ie);
    if (t !== n.components[0]) return;
    let r = e.get(At),
      o = e.get(Py);
    e.get(Nd) === 1 && r.initialNavigation(),
      e.get(Fy, null, P.Optional)?.setUpPreloading(),
      e.get(Ry, null, P.Optional)?.init(),
      r.resetRootComponentType(n.componentTypes[0]),
      o.closed || (o.next(), o.complete(), o.unsubscribe());
  };
}
var Py = new y("", { factory: () => new te() }),
  Nd = new y("", { providedIn: "root", factory: () => 1 });
function aN() {
  return ko(2, [
    { provide: Nd, useValue: 0 },
    {
      provide: Gs,
      multi: !0,
      deps: [he],
      useFactory: (t) => {
        let n = t.get(uv, Promise.resolve());
        return () =>
          n.then(
            () =>
              new Promise((r) => {
                let o = t.get(At),
                  i = t.get(Py);
                Ay(o, () => {
                  r(!0);
                }),
                  (t.get(Sd).afterPreactivation = () => (
                    r(!0), i.closed ? M(void 0) : i
                  )),
                  o.initialNavigation();
              })
          );
      },
    },
  ]);
}
function cN() {
  return ko(3, [
    {
      provide: Gs,
      multi: !0,
      useFactory: () => {
        let t = p(At);
        return () => {
          t.setUpLocationChangeListener();
        };
      },
    },
    { provide: Nd, useValue: 2 },
  ]);
}
var Fy = new y("");
function uN(e) {
  return ko(0, [
    { provide: Fy, useExisting: iN },
    { provide: Ea, useExisting: e },
  ]);
}
function lN() {
  return ko(8, [Wv, { provide: Ca, useExisting: Wv }]);
}
function dN(e) {
  let t = [
    { provide: My, useValue: Y0 },
    {
      provide: Ty,
      useValue: v({ skipNextTransition: !!e?.skipInitialTransition }, e),
    },
  ];
  return ko(9, t);
}
var Qv = new y("ROUTER_FORROOT_GUARD"),
  fN = [
    fr,
    { provide: Ro, useClass: Dr },
    At,
    Oo,
    { provide: en, useFactory: xy, deps: [At] },
    Md,
    [],
  ],
  rL = (() => {
    class e {
      constructor(n) {}
      static forRoot(n, r) {
        return {
          ngModule: e,
          providers: [
            fN,
            [],
            { provide: No, multi: !0, useValue: n },
            { provide: Qv, useFactory: mN, deps: [[At, new ys(), new Au()]] },
            r?.errorHandler ? { provide: Sy, useValue: r.errorHandler } : [],
            { provide: Fo, useValue: r || {} },
            r?.useHash ? pN() : gN(),
            hN(),
            r?.preloadingStrategy ? uN(r.preloadingStrategy).ɵproviders : [],
            r?.initialNavigation ? vN(r) : [],
            r?.bindToComponentInputs ? lN().ɵproviders : [],
            r?.enableViewTransitions ? dN().ɵproviders : [],
            yN(),
          ],
        };
      }
      static forChild(n) {
        return {
          ngModule: e,
          providers: [{ provide: No, multi: !0, useValue: n }],
        };
      }
      static ɵfac = function (r) {
        return new (r || e)(I(Qv, 8));
      };
      static ɵmod = _t({ type: e });
      static ɵinj = Et({});
    }
    return e;
  })();
function hN() {
  return {
    provide: Ry,
    useFactory: () => {
      let e = p(hv),
        t = p(G),
        n = p(Fo),
        r = p(Sd),
        o = p(Ro);
      return (
        n.scrollOffset && e.setOffset(n.scrollOffset), new sN(o, r, e, t, n)
      );
    },
  };
}
function pN() {
  return { provide: Tt, useClass: dv };
}
function gN() {
  return { provide: Tt, useClass: Rl };
}
function mN(e) {
  return "guarded";
}
function vN(e) {
  return [
    e.initialNavigation === "disabled" ? cN().ɵproviders : [],
    e.initialNavigation === "enabledBlocking" ? aN().ɵproviders : [],
  ];
}
var Xv = new y("");
function yN() {
  return [
    { provide: Xv, useFactory: Oy },
    { provide: Wt, multi: !0, useExisting: Xv },
  ];
}
var zy = (() => {
    class e {
      _renderer;
      _elementRef;
      onChange = (n) => {};
      onTouched = () => {};
      constructor(n, r) {
        (this._renderer = n), (this._elementRef = r);
      }
      setProperty(n, r) {
        this._renderer.setProperty(this._elementRef.nativeElement, n, r);
      }
      registerOnTouched(n) {
        this.onTouched = n;
      }
      registerOnChange(n) {
        this.onChange = n;
      }
      setDisabledState(n) {
        this.setProperty("disabled", n);
      }
      static ɵfac = function (r) {
        return new (r || e)(V(Qe), V(Ue));
      };
      static ɵdir = ue({ type: e });
    }
    return e;
  })(),
  Ta = (() => {
    class e extends zy {
      static ɵfac = (() => {
        let n;
        return function (o) {
          return (n || (n = qt(e)))(o || e);
        };
      })();
      static ɵdir = ue({ type: e, features: [bt] });
    }
    return e;
  })(),
  $o = new y("");
var DN = { provide: $o, useExisting: Bt(() => Gy), multi: !0 };
function EN() {
  let e = st() ? st().getUserAgent() : "";
  return /android (\d+)/.test(e.toLowerCase());
}
var CN = new y(""),
  Gy = (() => {
    class e extends zy {
      _compositionMode;
      _composing = !1;
      constructor(n, r, o) {
        super(n, r),
          (this._compositionMode = o),
          this._compositionMode == null && (this._compositionMode = !EN());
      }
      writeValue(n) {
        let r = n ?? "";
        this.setProperty("value", r);
      }
      _handleInput(n) {
        (!this._compositionMode ||
          (this._compositionMode && !this._composing)) &&
          this.onChange(n);
      }
      _compositionStart() {
        this._composing = !0;
      }
      _compositionEnd(n) {
        (this._composing = !1), this._compositionMode && this.onChange(n);
      }
      static ɵfac = function (r) {
        return new (r || e)(V(Qe), V(Ue), V(CN, 8));
      };
      static ɵdir = ue({
        type: e,
        selectors: [
          ["input", "formControlName", "", 3, "type", "checkbox"],
          ["textarea", "formControlName", ""],
          ["input", "formControl", "", 3, "type", "checkbox"],
          ["textarea", "formControl", ""],
          ["input", "ngModel", "", 3, "type", "checkbox"],
          ["textarea", "ngModel", ""],
          ["", "ngDefaultControl", ""],
        ],
        hostBindings: function (r, o) {
          r & 1 &&
            Zt("input", function (s) {
              return o._handleInput(s.target.value);
            })("blur", function () {
              return o.onTouched();
            })("compositionstart", function () {
              return o._compositionStart();
            })("compositionend", function (s) {
              return o._compositionEnd(s.target.value);
            });
        },
        standalone: !1,
        features: [lr([DN]), bt],
      });
    }
    return e;
  })();
var wN = new y(""),
  IN = new y("");
function qy(e) {
  return e != null;
}
function Wy(e) {
  return Dn(e) ? z(e) : e;
}
function Zy(e) {
  let t = {};
  return (
    e.forEach((n) => {
      t = n != null ? v(v({}, t), n) : t;
    }),
    Object.keys(t).length === 0 ? null : t
  );
}
function Yy(e, t) {
  return t.map((n) => n(e));
}
function _N(e) {
  return !e.validate;
}
function Ky(e) {
  return e.map((t) => (_N(t) ? t : (n) => t.validate(n)));
}
function bN(e) {
  if (!e) return null;
  let t = e.filter(qy);
  return t.length == 0
    ? null
    : function (n) {
        return Zy(Yy(n, t));
      };
}
function Qy(e) {
  return e != null ? bN(Ky(e)) : null;
}
function MN(e) {
  if (!e) return null;
  let t = e.filter(qy);
  return t.length == 0
    ? null
    : function (n) {
        let r = Yy(n, t).map(Wy);
        return Ka(r).pipe(N(Zy));
      };
}
function Xy(e) {
  return e != null ? MN(Ky(e)) : null;
}
function ky(e, t) {
  return e === null ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
}
function TN(e) {
  return e._rawValidators;
}
function SN(e) {
  return e._rawAsyncValidators;
}
function Ad(e) {
  return e ? (Array.isArray(e) ? e : [e]) : [];
}
function _a(e, t) {
  return Array.isArray(e) ? e.includes(t) : e === t;
}
function Ly(e, t) {
  let n = Ad(t);
  return (
    Ad(e).forEach((o) => {
      _a(n, o) || n.push(o);
    }),
    n
  );
}
function Vy(e, t) {
  return Ad(t).filter((n) => !_a(e, n));
}
var ba = class {
    get value() {
      return this.control ? this.control.value : null;
    }
    get valid() {
      return this.control ? this.control.valid : null;
    }
    get invalid() {
      return this.control ? this.control.invalid : null;
    }
    get pending() {
      return this.control ? this.control.pending : null;
    }
    get disabled() {
      return this.control ? this.control.disabled : null;
    }
    get enabled() {
      return this.control ? this.control.enabled : null;
    }
    get errors() {
      return this.control ? this.control.errors : null;
    }
    get pristine() {
      return this.control ? this.control.pristine : null;
    }
    get dirty() {
      return this.control ? this.control.dirty : null;
    }
    get touched() {
      return this.control ? this.control.touched : null;
    }
    get status() {
      return this.control ? this.control.status : null;
    }
    get untouched() {
      return this.control ? this.control.untouched : null;
    }
    get statusChanges() {
      return this.control ? this.control.statusChanges : null;
    }
    get valueChanges() {
      return this.control ? this.control.valueChanges : null;
    }
    get path() {
      return null;
    }
    _composedValidatorFn;
    _composedAsyncValidatorFn;
    _rawValidators = [];
    _rawAsyncValidators = [];
    _setValidators(t) {
      (this._rawValidators = t || []),
        (this._composedValidatorFn = Qy(this._rawValidators));
    }
    _setAsyncValidators(t) {
      (this._rawAsyncValidators = t || []),
        (this._composedAsyncValidatorFn = Xy(this._rawAsyncValidators));
    }
    get validator() {
      return this._composedValidatorFn || null;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn || null;
    }
    _onDestroyCallbacks = [];
    _registerOnDestroy(t) {
      this._onDestroyCallbacks.push(t);
    }
    _invokeOnDestroyCallbacks() {
      this._onDestroyCallbacks.forEach((t) => t()),
        (this._onDestroyCallbacks = []);
    }
    reset(t = void 0) {
      this.control && this.control.reset(t);
    }
    hasError(t, n) {
      return this.control ? this.control.hasError(t, n) : !1;
    }
    getError(t, n) {
      return this.control ? this.control.getError(t, n) : null;
    }
  },
  Rd = class extends ba {
    name;
    get formDirective() {
      return null;
    }
    get path() {
      return null;
    }
  },
  Bo = class extends ba {
    _parent = null;
    name = null;
    valueAccessor = null;
  },
  xd = class {
    _cd;
    constructor(t) {
      this._cd = t;
    }
    get isTouched() {
      return this._cd?.control?._touched?.(), !!this._cd?.control?.touched;
    }
    get isUntouched() {
      return !!this._cd?.control?.untouched;
    }
    get isPristine() {
      return this._cd?.control?._pristine?.(), !!this._cd?.control?.pristine;
    }
    get isDirty() {
      return !!this._cd?.control?.dirty;
    }
    get isValid() {
      return this._cd?.control?._status?.(), !!this._cd?.control?.valid;
    }
    get isInvalid() {
      return !!this._cd?.control?.invalid;
    }
    get isPending() {
      return !!this._cd?.control?.pending;
    }
    get isSubmitted() {
      return this._cd?._submitted?.(), !!this._cd?.submitted;
    }
  },
  NN = {
    "[class.ng-untouched]": "isUntouched",
    "[class.ng-touched]": "isTouched",
    "[class.ng-pristine]": "isPristine",
    "[class.ng-dirty]": "isDirty",
    "[class.ng-valid]": "isValid",
    "[class.ng-invalid]": "isInvalid",
    "[class.ng-pending]": "isPending",
  },
  CL = L(v({}, NN), { "[class.ng-submitted]": "isSubmitted" }),
  wL = (() => {
    class e extends xd {
      constructor(n) {
        super(n);
      }
      static ɵfac = function (r) {
        return new (r || e)(V(Bo, 2));
      };
      static ɵdir = ue({
        type: e,
        selectors: [
          ["", "formControlName", ""],
          ["", "ngModel", ""],
          ["", "formControl", ""],
        ],
        hostVars: 14,
        hostBindings: function (r, o) {
          r & 2 &&
            wl("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)(
              "ng-pristine",
              o.isPristine
            )("ng-dirty", o.isDirty)("ng-valid", o.isValid)(
              "ng-invalid",
              o.isInvalid
            )("ng-pending", o.isPending);
        },
        standalone: !1,
        features: [bt],
      });
    }
    return e;
  })();
var Lo = "VALID",
  Ia = "INVALID",
  _r = "PENDING",
  Vo = "DISABLED",
  Mr = class {},
  Ma = class extends Mr {
    value;
    source;
    constructor(t, n) {
      super(), (this.value = t), (this.source = n);
    }
  },
  jo = class extends Mr {
    pristine;
    source;
    constructor(t, n) {
      super(), (this.pristine = t), (this.source = n);
    }
  },
  Uo = class extends Mr {
    touched;
    source;
    constructor(t, n) {
      super(), (this.touched = t), (this.source = n);
    }
  },
  br = class extends Mr {
    status;
    source;
    constructor(t, n) {
      super(), (this.status = t), (this.source = n);
    }
  };
function AN(e) {
  return (Sa(e) ? e.validators : e) || null;
}
function RN(e) {
  return Array.isArray(e) ? Qy(e) : e || null;
}
function xN(e, t) {
  return (Sa(t) ? t.asyncValidators : e) || null;
}
function ON(e) {
  return Array.isArray(e) ? Xy(e) : e || null;
}
function Sa(e) {
  return e != null && !Array.isArray(e) && typeof e == "object";
}
var Od = class {
  _pendingDirty = !1;
  _hasOwnPendingAsyncValidator = null;
  _pendingTouched = !1;
  _onCollectionChange = () => {};
  _updateOn;
  _parent = null;
  _asyncValidationSubscription;
  _composedValidatorFn;
  _composedAsyncValidatorFn;
  _rawValidators;
  _rawAsyncValidators;
  value;
  constructor(t, n) {
    this._assignValidators(t), this._assignAsyncValidators(n);
  }
  get validator() {
    return this._composedValidatorFn;
  }
  set validator(t) {
    this._rawValidators = this._composedValidatorFn = t;
  }
  get asyncValidator() {
    return this._composedAsyncValidatorFn;
  }
  set asyncValidator(t) {
    this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
  }
  get parent() {
    return this._parent;
  }
  get status() {
    return Yt(this.statusReactive);
  }
  set status(t) {
    Yt(() => this.statusReactive.set(t));
  }
  _status = Zs(() => this.statusReactive());
  statusReactive = Ms(void 0);
  get valid() {
    return this.status === Lo;
  }
  get invalid() {
    return this.status === Ia;
  }
  get pending() {
    return this.status == _r;
  }
  get disabled() {
    return this.status === Vo;
  }
  get enabled() {
    return this.status !== Vo;
  }
  errors;
  get pristine() {
    return Yt(this.pristineReactive);
  }
  set pristine(t) {
    Yt(() => this.pristineReactive.set(t));
  }
  _pristine = Zs(() => this.pristineReactive());
  pristineReactive = Ms(!0);
  get dirty() {
    return !this.pristine;
  }
  get touched() {
    return Yt(this.touchedReactive);
  }
  set touched(t) {
    Yt(() => this.touchedReactive.set(t));
  }
  _touched = Zs(() => this.touchedReactive());
  touchedReactive = Ms(!1);
  get untouched() {
    return !this.touched;
  }
  _events = new te();
  events = this._events.asObservable();
  valueChanges;
  statusChanges;
  get updateOn() {
    return this._updateOn
      ? this._updateOn
      : this.parent
      ? this.parent.updateOn
      : "change";
  }
  setValidators(t) {
    this._assignValidators(t);
  }
  setAsyncValidators(t) {
    this._assignAsyncValidators(t);
  }
  addValidators(t) {
    this.setValidators(Ly(t, this._rawValidators));
  }
  addAsyncValidators(t) {
    this.setAsyncValidators(Ly(t, this._rawAsyncValidators));
  }
  removeValidators(t) {
    this.setValidators(Vy(t, this._rawValidators));
  }
  removeAsyncValidators(t) {
    this.setAsyncValidators(Vy(t, this._rawAsyncValidators));
  }
  hasValidator(t) {
    return _a(this._rawValidators, t);
  }
  hasAsyncValidator(t) {
    return _a(this._rawAsyncValidators, t);
  }
  clearValidators() {
    this.validator = null;
  }
  clearAsyncValidators() {
    this.asyncValidator = null;
  }
  markAsTouched(t = {}) {
    let n = this.touched === !1;
    this.touched = !0;
    let r = t.sourceControl ?? this;
    this._parent &&
      !t.onlySelf &&
      this._parent.markAsTouched(L(v({}, t), { sourceControl: r })),
      n && t.emitEvent !== !1 && this._events.next(new Uo(!0, r));
  }
  markAllAsTouched(t = {}) {
    this.markAsTouched({
      onlySelf: !0,
      emitEvent: t.emitEvent,
      sourceControl: this,
    }),
      this._forEachChild((n) => n.markAllAsTouched(t));
  }
  markAsUntouched(t = {}) {
    let n = this.touched === !0;
    (this.touched = !1), (this._pendingTouched = !1);
    let r = t.sourceControl ?? this;
    this._forEachChild((o) => {
      o.markAsUntouched({
        onlySelf: !0,
        emitEvent: t.emitEvent,
        sourceControl: r,
      });
    }),
      this._parent && !t.onlySelf && this._parent._updateTouched(t, r),
      n && t.emitEvent !== !1 && this._events.next(new Uo(!1, r));
  }
  markAsDirty(t = {}) {
    let n = this.pristine === !0;
    this.pristine = !1;
    let r = t.sourceControl ?? this;
    this._parent &&
      !t.onlySelf &&
      this._parent.markAsDirty(L(v({}, t), { sourceControl: r })),
      n && t.emitEvent !== !1 && this._events.next(new jo(!1, r));
  }
  markAsPristine(t = {}) {
    let n = this.pristine === !1;
    (this.pristine = !0), (this._pendingDirty = !1);
    let r = t.sourceControl ?? this;
    this._forEachChild((o) => {
      o.markAsPristine({ onlySelf: !0, emitEvent: t.emitEvent });
    }),
      this._parent && !t.onlySelf && this._parent._updatePristine(t, r),
      n && t.emitEvent !== !1 && this._events.next(new jo(!0, r));
  }
  markAsPending(t = {}) {
    this.status = _r;
    let n = t.sourceControl ?? this;
    t.emitEvent !== !1 &&
      (this._events.next(new br(this.status, n)),
      this.statusChanges.emit(this.status)),
      this._parent &&
        !t.onlySelf &&
        this._parent.markAsPending(L(v({}, t), { sourceControl: n }));
  }
  disable(t = {}) {
    let n = this._parentMarkedDirty(t.onlySelf);
    (this.status = Vo),
      (this.errors = null),
      this._forEachChild((o) => {
        o.disable(L(v({}, t), { onlySelf: !0 }));
      }),
      this._updateValue();
    let r = t.sourceControl ?? this;
    t.emitEvent !== !1 &&
      (this._events.next(new Ma(this.value, r)),
      this._events.next(new br(this.status, r)),
      this.valueChanges.emit(this.value),
      this.statusChanges.emit(this.status)),
      this._updateAncestors(L(v({}, t), { skipPristineCheck: n }), this),
      this._onDisabledChange.forEach((o) => o(!0));
  }
  enable(t = {}) {
    let n = this._parentMarkedDirty(t.onlySelf);
    (this.status = Lo),
      this._forEachChild((r) => {
        r.enable(L(v({}, t), { onlySelf: !0 }));
      }),
      this.updateValueAndValidity({ onlySelf: !0, emitEvent: t.emitEvent }),
      this._updateAncestors(L(v({}, t), { skipPristineCheck: n }), this),
      this._onDisabledChange.forEach((r) => r(!1));
  }
  _updateAncestors(t, n) {
    this._parent &&
      !t.onlySelf &&
      (this._parent.updateValueAndValidity(t),
      t.skipPristineCheck || this._parent._updatePristine({}, n),
      this._parent._updateTouched({}, n));
  }
  setParent(t) {
    this._parent = t;
  }
  getRawValue() {
    return this.value;
  }
  updateValueAndValidity(t = {}) {
    if ((this._setInitialStatus(), this._updateValue(), this.enabled)) {
      let r = this._cancelExistingSubscription();
      (this.errors = this._runValidator()),
        (this.status = this._calculateStatus()),
        (this.status === Lo || this.status === _r) &&
          this._runAsyncValidator(r, t.emitEvent);
    }
    let n = t.sourceControl ?? this;
    t.emitEvent !== !1 &&
      (this._events.next(new Ma(this.value, n)),
      this._events.next(new br(this.status, n)),
      this.valueChanges.emit(this.value),
      this.statusChanges.emit(this.status)),
      this._parent &&
        !t.onlySelf &&
        this._parent.updateValueAndValidity(L(v({}, t), { sourceControl: n }));
  }
  _updateTreeValidity(t = { emitEvent: !0 }) {
    this._forEachChild((n) => n._updateTreeValidity(t)),
      this.updateValueAndValidity({ onlySelf: !0, emitEvent: t.emitEvent });
  }
  _setInitialStatus() {
    this.status = this._allControlsDisabled() ? Vo : Lo;
  }
  _runValidator() {
    return this.validator ? this.validator(this) : null;
  }
  _runAsyncValidator(t, n) {
    if (this.asyncValidator) {
      (this.status = _r),
        (this._hasOwnPendingAsyncValidator = { emitEvent: n !== !1 });
      let r = Wy(this.asyncValidator(this));
      this._asyncValidationSubscription = r.subscribe((o) => {
        (this._hasOwnPendingAsyncValidator = null),
          this.setErrors(o, { emitEvent: n, shouldHaveEmitted: t });
      });
    }
  }
  _cancelExistingSubscription() {
    if (this._asyncValidationSubscription) {
      this._asyncValidationSubscription.unsubscribe();
      let t = this._hasOwnPendingAsyncValidator?.emitEvent ?? !1;
      return (this._hasOwnPendingAsyncValidator = null), t;
    }
    return !1;
  }
  setErrors(t, n = {}) {
    (this.errors = t),
      this._updateControlsErrors(n.emitEvent !== !1, this, n.shouldHaveEmitted);
  }
  get(t) {
    let n = t;
    return n == null || (Array.isArray(n) || (n = n.split(".")), n.length === 0)
      ? null
      : n.reduce((r, o) => r && r._find(o), this);
  }
  getError(t, n) {
    let r = n ? this.get(n) : this;
    return r && r.errors ? r.errors[t] : null;
  }
  hasError(t, n) {
    return !!this.getError(t, n);
  }
  get root() {
    let t = this;
    for (; t._parent; ) t = t._parent;
    return t;
  }
  _updateControlsErrors(t, n, r) {
    (this.status = this._calculateStatus()),
      t && this.statusChanges.emit(this.status),
      (t || r) && this._events.next(new br(this.status, n)),
      this._parent && this._parent._updateControlsErrors(t, n, r);
  }
  _initObservables() {
    (this.valueChanges = new ae()), (this.statusChanges = new ae());
  }
  _calculateStatus() {
    return this._allControlsDisabled()
      ? Vo
      : this.errors
      ? Ia
      : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(_r)
      ? _r
      : this._anyControlsHaveStatus(Ia)
      ? Ia
      : Lo;
  }
  _anyControlsHaveStatus(t) {
    return this._anyControls((n) => n.status === t);
  }
  _anyControlsDirty() {
    return this._anyControls((t) => t.dirty);
  }
  _anyControlsTouched() {
    return this._anyControls((t) => t.touched);
  }
  _updatePristine(t, n) {
    let r = !this._anyControlsDirty(),
      o = this.pristine !== r;
    (this.pristine = r),
      this._parent && !t.onlySelf && this._parent._updatePristine(t, n),
      o && this._events.next(new jo(this.pristine, n));
  }
  _updateTouched(t = {}, n) {
    (this.touched = this._anyControlsTouched()),
      this._events.next(new Uo(this.touched, n)),
      this._parent && !t.onlySelf && this._parent._updateTouched(t, n);
  }
  _onDisabledChange = [];
  _registerOnCollectionChange(t) {
    this._onCollectionChange = t;
  }
  _setUpdateStrategy(t) {
    Sa(t) && t.updateOn != null && (this._updateOn = t.updateOn);
  }
  _parentMarkedDirty(t) {
    let n = this._parent && this._parent.dirty;
    return !t && !!n && !this._parent._anyControlsDirty();
  }
  _find(t) {
    return null;
  }
  _assignValidators(t) {
    (this._rawValidators = Array.isArray(t) ? t.slice() : t),
      (this._composedValidatorFn = RN(this._rawValidators));
  }
  _assignAsyncValidators(t) {
    (this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t),
      (this._composedAsyncValidatorFn = ON(this._rawAsyncValidators));
  }
};
var Jy = new y("", { providedIn: "root", factory: () => Pd }),
  Pd = "always";
function PN(e, t) {
  return [...t.path, e];
}
function FN(e, t, n = Pd) {
  LN(e, t),
    t.valueAccessor.writeValue(e.value),
    (e.disabled || n === "always") &&
      t.valueAccessor.setDisabledState?.(e.disabled),
    VN(e, t),
    UN(e, t),
    jN(e, t),
    kN(e, t);
}
function jy(e, t) {
  e.forEach((n) => {
    n.registerOnValidatorChange && n.registerOnValidatorChange(t);
  });
}
function kN(e, t) {
  if (t.valueAccessor.setDisabledState) {
    let n = (r) => {
      t.valueAccessor.setDisabledState(r);
    };
    e.registerOnDisabledChange(n),
      t._registerOnDestroy(() => {
        e._unregisterOnDisabledChange(n);
      });
  }
}
function LN(e, t) {
  let n = TN(e);
  t.validator !== null
    ? e.setValidators(ky(n, t.validator))
    : typeof n == "function" && e.setValidators([n]);
  let r = SN(e);
  t.asyncValidator !== null
    ? e.setAsyncValidators(ky(r, t.asyncValidator))
    : typeof r == "function" && e.setAsyncValidators([r]);
  let o = () => e.updateValueAndValidity();
  jy(t._rawValidators, o), jy(t._rawAsyncValidators, o);
}
function VN(e, t) {
  t.valueAccessor.registerOnChange((n) => {
    (e._pendingValue = n),
      (e._pendingChange = !0),
      (e._pendingDirty = !0),
      e.updateOn === "change" && eD(e, t);
  });
}
function jN(e, t) {
  t.valueAccessor.registerOnTouched(() => {
    (e._pendingTouched = !0),
      e.updateOn === "blur" && e._pendingChange && eD(e, t),
      e.updateOn !== "submit" && e.markAsTouched();
  });
}
function eD(e, t) {
  e._pendingDirty && e.markAsDirty(),
    e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
    t.viewToModelUpdate(e._pendingValue),
    (e._pendingChange = !1);
}
function UN(e, t) {
  let n = (r, o) => {
    t.valueAccessor.writeValue(r), o && t.viewToModelUpdate(r);
  };
  e.registerOnChange(n),
    t._registerOnDestroy(() => {
      e._unregisterOnChange(n);
    });
}
function BN(e, t) {
  if (!e.hasOwnProperty("model")) return !1;
  let n = e.model;
  return n.isFirstChange() ? !0 : !Object.is(t, n.currentValue);
}
function $N(e) {
  return Object.getPrototypeOf(e.constructor) === Ta;
}
function HN(e, t) {
  if (!t) return null;
  Array.isArray(t);
  let n, r, o;
  return (
    t.forEach((i) => {
      i.constructor === Gy ? (n = i) : $N(i) ? (r = i) : (o = i);
    }),
    o || r || n || null
  );
}
function Uy(e, t) {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
function By(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    Object.keys(e).length === 2 &&
    "value" in e &&
    "disabled" in e
  );
}
var zN = class extends Od {
  defaultValue = null;
  _onChange = [];
  _pendingValue;
  _pendingChange = !1;
  constructor(t = null, n, r) {
    super(AN(n), xN(r, n)),
      this._applyFormState(t),
      this._setUpdateStrategy(n),
      this._initObservables(),
      this.updateValueAndValidity({
        onlySelf: !0,
        emitEvent: !!this.asyncValidator,
      }),
      Sa(n) &&
        (n.nonNullable || n.initialValueIsDefault) &&
        (By(t) ? (this.defaultValue = t.value) : (this.defaultValue = t));
  }
  setValue(t, n = {}) {
    (this.value = this._pendingValue = t),
      this._onChange.length &&
        n.emitModelToViewChange !== !1 &&
        this._onChange.forEach((r) =>
          r(this.value, n.emitViewToModelChange !== !1)
        ),
      this.updateValueAndValidity(n);
  }
  patchValue(t, n = {}) {
    this.setValue(t, n);
  }
  reset(t = this.defaultValue, n = {}) {
    this._applyFormState(t),
      this.markAsPristine(n),
      this.markAsUntouched(n),
      this.setValue(this.value, n),
      (this._pendingChange = !1);
  }
  _updateValue() {}
  _anyControls(t) {
    return !1;
  }
  _allControlsDisabled() {
    return this.disabled;
  }
  registerOnChange(t) {
    this._onChange.push(t);
  }
  _unregisterOnChange(t) {
    Uy(this._onChange, t);
  }
  registerOnDisabledChange(t) {
    this._onDisabledChange.push(t);
  }
  _unregisterOnDisabledChange(t) {
    Uy(this._onDisabledChange, t);
  }
  _forEachChild(t) {}
  _syncPendingControls() {
    return this.updateOn === "submit" &&
      (this._pendingDirty && this.markAsDirty(),
      this._pendingTouched && this.markAsTouched(),
      this._pendingChange)
      ? (this.setValue(this._pendingValue, {
          onlySelf: !0,
          emitModelToViewChange: !1,
        }),
        !0)
      : !1;
  }
  _applyFormState(t) {
    By(t)
      ? ((this.value = this._pendingValue = t.value),
        t.disabled
          ? this.disable({ onlySelf: !0, emitEvent: !1 })
          : this.enable({ onlySelf: !0, emitEvent: !1 }))
      : (this.value = this._pendingValue = t);
  }
};
var GN = { provide: Bo, useExisting: Bt(() => qN) },
  $y = Promise.resolve(),
  qN = (() => {
    class e extends Bo {
      _changeDetectorRef;
      callSetDisabledState;
      control = new zN();
      static ngAcceptInputType_isDisabled;
      _registered = !1;
      viewModel;
      name = "";
      isDisabled;
      model;
      options;
      update = new ae();
      constructor(n, r, o, i, s, a) {
        super(),
          (this._changeDetectorRef = s),
          (this.callSetDisabledState = a),
          (this._parent = n),
          this._setValidators(r),
          this._setAsyncValidators(o),
          (this.valueAccessor = HN(this, i));
      }
      ngOnChanges(n) {
        if ((this._checkForErrors(), !this._registered || "name" in n)) {
          if (this._registered && (this._checkName(), this.formDirective)) {
            let r = n.name.previousValue;
            this.formDirective.removeControl({
              name: r,
              path: this._getPath(r),
            });
          }
          this._setUpControl();
        }
        "isDisabled" in n && this._updateDisabled(n),
          BN(n, this.viewModel) &&
            (this._updateValue(this.model), (this.viewModel = this.model));
      }
      ngOnDestroy() {
        this.formDirective && this.formDirective.removeControl(this);
      }
      get path() {
        return this._getPath(this.name);
      }
      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      viewToModelUpdate(n) {
        (this.viewModel = n), this.update.emit(n);
      }
      _setUpControl() {
        this._setUpdateStrategy(),
          this._isStandalone()
            ? this._setUpStandalone()
            : this.formDirective.addControl(this),
          (this._registered = !0);
      }
      _setUpdateStrategy() {
        this.options &&
          this.options.updateOn != null &&
          (this.control._updateOn = this.options.updateOn);
      }
      _isStandalone() {
        return !this._parent || !!(this.options && this.options.standalone);
      }
      _setUpStandalone() {
        FN(this.control, this, this.callSetDisabledState),
          this.control.updateValueAndValidity({ emitEvent: !1 });
      }
      _checkForErrors() {
        this._isStandalone() || this._checkParentType(), this._checkName();
      }
      _checkParentType() {}
      _checkName() {
        this.options && this.options.name && (this.name = this.options.name),
          !this._isStandalone() && this.name;
      }
      _updateValue(n) {
        $y.then(() => {
          this.control.setValue(n, { emitViewToModelChange: !1 }),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _updateDisabled(n) {
        let r = n.isDisabled.currentValue,
          o = r !== 0 && Cn(r);
        $y.then(() => {
          o && !this.control.disabled
            ? this.control.disable()
            : !o && this.control.disabled && this.control.enable(),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _getPath(n) {
        return this._parent ? PN(n, this._parent) : [n];
      }
      static ɵfac = function (r) {
        return new (r || e)(
          V(Rd, 9),
          V(wN, 10),
          V(IN, 10),
          V($o, 10),
          V(En, 8),
          V(Jy, 8)
        );
      };
      static ɵdir = ue({
        type: e,
        selectors: [
          ["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""],
        ],
        inputs: {
          name: "name",
          isDisabled: [0, "disabled", "isDisabled"],
          model: [0, "ngModel", "model"],
          options: [0, "ngModelOptions", "options"],
        },
        outputs: { update: "ngModelChange" },
        exportAs: ["ngModel"],
        standalone: !1,
        features: [lr([GN]), bt, sr],
      });
    }
    return e;
  })();
var WN = { provide: $o, useExisting: Bt(() => ZN), multi: !0 },
  ZN = (() => {
    class e extends Ta {
      writeValue(n) {
        let r = n ?? "";
        this.setProperty("value", r);
      }
      registerOnChange(n) {
        this.onChange = (r) => {
          n(r == "" ? null : parseFloat(r));
        };
      }
      static ɵfac = (() => {
        let n;
        return function (o) {
          return (n || (n = qt(e)))(o || e);
        };
      })();
      static ɵdir = ue({
        type: e,
        selectors: [
          ["input", "type", "number", "formControlName", ""],
          ["input", "type", "number", "formControl", ""],
          ["input", "type", "number", "ngModel", ""],
        ],
        hostBindings: function (r, o) {
          r & 1 &&
            Zt("input", function (s) {
              return o.onChange(s.target.value);
            })("blur", function () {
              return o.onTouched();
            });
        },
        standalone: !1,
        features: [lr([WN]), bt],
      });
    }
    return e;
  })();
var YN = { provide: $o, useExisting: Bt(() => nD), multi: !0 };
function tD(e, t) {
  return e == null
    ? `${t}`
    : (t && typeof t == "object" && (t = "Object"), `${e}: ${t}`.slice(0, 50));
}
function KN(e) {
  return e.split(":")[0];
}
var nD = (() => {
    class e extends Ta {
      value;
      _optionMap = new Map();
      _idCounter = 0;
      set compareWith(n) {
        this._compareWith = n;
      }
      _compareWith = Object.is;
      writeValue(n) {
        this.value = n;
        let r = this._getOptionId(n),
          o = tD(r, n);
        this.setProperty("value", o);
      }
      registerOnChange(n) {
        this.onChange = (r) => {
          (this.value = this._getOptionValue(r)), n(this.value);
        };
      }
      _registerOption() {
        return (this._idCounter++).toString();
      }
      _getOptionId(n) {
        for (let r of this._optionMap.keys())
          if (this._compareWith(this._optionMap.get(r), n)) return r;
        return null;
      }
      _getOptionValue(n) {
        let r = KN(n);
        return this._optionMap.has(r) ? this._optionMap.get(r) : n;
      }
      static ɵfac = (() => {
        let n;
        return function (o) {
          return (n || (n = qt(e)))(o || e);
        };
      })();
      static ɵdir = ue({
        type: e,
        selectors: [
          ["select", "formControlName", "", 3, "multiple", ""],
          ["select", "formControl", "", 3, "multiple", ""],
          ["select", "ngModel", "", 3, "multiple", ""],
        ],
        hostBindings: function (r, o) {
          r & 1 &&
            Zt("change", function (s) {
              return o.onChange(s.target.value);
            })("blur", function () {
              return o.onTouched();
            });
        },
        inputs: { compareWith: "compareWith" },
        standalone: !1,
        features: [lr([YN]), bt],
      });
    }
    return e;
  })(),
  _L = (() => {
    class e {
      _element;
      _renderer;
      _select;
      id;
      constructor(n, r, o) {
        (this._element = n),
          (this._renderer = r),
          (this._select = o),
          this._select && (this.id = this._select._registerOption());
      }
      set ngValue(n) {
        this._select != null &&
          (this._select._optionMap.set(this.id, n),
          this._setElementValue(tD(this.id, n)),
          this._select.writeValue(this._select.value));
      }
      set value(n) {
        this._setElementValue(n),
          this._select && this._select.writeValue(this._select.value);
      }
      _setElementValue(n) {
        this._renderer.setProperty(this._element.nativeElement, "value", n);
      }
      ngOnDestroy() {
        this._select &&
          (this._select._optionMap.delete(this.id),
          this._select.writeValue(this._select.value));
      }
      static ɵfac = function (r) {
        return new (r || e)(V(Ue), V(Qe), V(nD, 9));
      };
      static ɵdir = ue({
        type: e,
        selectors: [["option"]],
        inputs: { ngValue: "ngValue", value: "value" },
        standalone: !1,
      });
    }
    return e;
  })(),
  QN = { provide: $o, useExisting: Bt(() => rD), multi: !0 };
function Hy(e, t) {
  return e == null
    ? `${t}`
    : (typeof t == "string" && (t = `'${t}'`),
      t && typeof t == "object" && (t = "Object"),
      `${e}: ${t}`.slice(0, 50));
}
function XN(e) {
  return e.split(":")[0];
}
var rD = (() => {
    class e extends Ta {
      value;
      _optionMap = new Map();
      _idCounter = 0;
      set compareWith(n) {
        this._compareWith = n;
      }
      _compareWith = Object.is;
      writeValue(n) {
        this.value = n;
        let r;
        if (Array.isArray(n)) {
          let o = n.map((i) => this._getOptionId(i));
          r = (i, s) => {
            i._setSelected(o.indexOf(s.toString()) > -1);
          };
        } else
          r = (o, i) => {
            o._setSelected(!1);
          };
        this._optionMap.forEach(r);
      }
      registerOnChange(n) {
        this.onChange = (r) => {
          let o = [],
            i = r.selectedOptions;
          if (i !== void 0) {
            let s = i;
            for (let a = 0; a < s.length; a++) {
              let c = s[a],
                u = this._getOptionValue(c.value);
              o.push(u);
            }
          } else {
            let s = r.options;
            for (let a = 0; a < s.length; a++) {
              let c = s[a];
              if (c.selected) {
                let u = this._getOptionValue(c.value);
                o.push(u);
              }
            }
          }
          (this.value = o), n(o);
        };
      }
      _registerOption(n) {
        let r = (this._idCounter++).toString();
        return this._optionMap.set(r, n), r;
      }
      _getOptionId(n) {
        for (let r of this._optionMap.keys())
          if (this._compareWith(this._optionMap.get(r)._value, n)) return r;
        return null;
      }
      _getOptionValue(n) {
        let r = XN(n);
        return this._optionMap.has(r) ? this._optionMap.get(r)._value : n;
      }
      static ɵfac = (() => {
        let n;
        return function (o) {
          return (n || (n = qt(e)))(o || e);
        };
      })();
      static ɵdir = ue({
        type: e,
        selectors: [
          ["select", "multiple", "", "formControlName", ""],
          ["select", "multiple", "", "formControl", ""],
          ["select", "multiple", "", "ngModel", ""],
        ],
        hostBindings: function (r, o) {
          r & 1 &&
            Zt("change", function (s) {
              return o.onChange(s.target);
            })("blur", function () {
              return o.onTouched();
            });
        },
        inputs: { compareWith: "compareWith" },
        standalone: !1,
        features: [lr([QN]), bt],
      });
    }
    return e;
  })(),
  bL = (() => {
    class e {
      _element;
      _renderer;
      _select;
      id;
      _value;
      constructor(n, r, o) {
        (this._element = n),
          (this._renderer = r),
          (this._select = o),
          this._select && (this.id = this._select._registerOption(this));
      }
      set ngValue(n) {
        this._select != null &&
          ((this._value = n),
          this._setElementValue(Hy(this.id, n)),
          this._select.writeValue(this._select.value));
      }
      set value(n) {
        this._select
          ? ((this._value = n),
            this._setElementValue(Hy(this.id, n)),
            this._select.writeValue(this._select.value))
          : this._setElementValue(n);
      }
      _setElementValue(n) {
        this._renderer.setProperty(this._element.nativeElement, "value", n);
      }
      _setSelected(n) {
        this._renderer.setProperty(this._element.nativeElement, "selected", n);
      }
      ngOnDestroy() {
        this._select &&
          (this._select._optionMap.delete(this.id),
          this._select.writeValue(this._select.value));
      }
      static ɵfac = function (r) {
        return new (r || e)(V(Ue), V(Qe), V(rD, 9));
      };
      static ɵdir = ue({
        type: e,
        selectors: [["option"]],
        inputs: { ngValue: "ngValue", value: "value" },
        standalone: !1,
      });
    }
    return e;
  })();
var JN = (() => {
  class e {
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵmod = _t({ type: e });
    static ɵinj = Et({});
  }
  return e;
})();
var ML = (() => {
  class e {
    static withConfig(n) {
      return {
        ngModule: e,
        providers: [{ provide: Jy, useValue: n.callSetDisabledState ?? Pd }],
      };
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵmod = _t({ type: e });
    static ɵinj = Et({ imports: [JN] });
  }
  return e;
})();
export {
  v as a,
  L as b,
  C as c,
  p as d,
  KF as e,
  QF as f,
  XF as g,
  JF as h,
  ek as i,
  Yp as j,
  Ms as k,
  Ts as l,
  tk as m,
  pI as n,
  nk as o,
  rk as p,
  ok as q,
  Tm as r,
  vb as s,
  Tb as t,
  sk as u,
  ak as v,
  qs as w,
  nM as x,
  uM as y,
  jm as z,
  wl as A,
  ck as B,
  uk as C,
  lk as D,
  Bm as E,
  $m as F,
  Il as G,
  dk as H,
  Zt as I,
  fk as J,
  OM as K,
  hk as L,
  LM as M,
  Wm as N,
  VM as O,
  pk as P,
  gk as Q,
  mk as R,
  vk as S,
  yk as T,
  Dk as U,
  Ek as V,
  Ck as W,
  Yk as X,
  Kk as Y,
  mT as Z,
  bT as _,
  u1 as $,
  l1 as aa,
  N1 as ba,
  A1 as ca,
  Bv as da,
  ES as ea,
  R1 as fa,
  x1 as ga,
  O1 as ha,
  en as ia,
  JS as ja,
  At as ka,
  tL as la,
  nL as ma,
  rL as na,
  Gy as oa,
  wL as pa,
  qN as qa,
  ZN as ra,
  nD as sa,
  _L as ta,
  bL as ua,
  ML as va,
};

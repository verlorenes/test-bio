import { a as ie, b as X } from "./chunk-G725ZYQT.js";
import { a as Q } from "./chunk-7YCLC2QD.js";
import { a as R } from "./chunk-RVCKRJI4.js";
import { a as N } from "./chunk-C2T4CRIM.js";
import {
  $ as $e,
  A as k,
  B as _,
  C as W,
  D as J,
  E as o,
  F as r,
  G as l,
  H as w,
  I as C,
  J as s,
  K as fe,
  L as m,
  M as E,
  N as b,
  P as oe,
  Q as P,
  R as _e,
  T as u,
  U as h,
  V as Oe,
  X as He,
  Y as ce,
  Z as O,
  _ as A,
  a as M,
  aa as Ge,
  b as B,
  ba as Re,
  ca as pe,
  d as y,
  da as U,
  e as x,
  f as g,
  fa as Ne,
  g as Y,
  ga as Ae,
  h as Ce,
  ha as ze,
  ia as ue,
  j as ve,
  ja as Ue,
  k as S,
  ka as re,
  la as z,
  m as G,
  ma as Ze,
  n as he,
  na as H,
  o as De,
  oa as ae,
  pa as le,
  q as i,
  qa as se,
  r as D,
  ra as qe,
  s as ye,
  sa as Te,
  t as v,
  ta as Pe,
  u as I,
  ua as Ee,
  v as F,
  va as $,
  w as ke,
  x as T,
  y as p,
  z as de,
} from "./chunk-BHYOVHPE.js";
var K = (() => {
  class t {
    transform(e, a) {
      let n = new Date(e);
      if (a == "short") {
        let c = Math.abs(new Date().getTime() - n.getTime()) / 1e3;
        return c < 60
          ? Math.floor(c) + "s"
          : c < 3600
          ? Math.floor(c / 60) + "m"
          : c < 86400
          ? Math.floor(c / 3600) + "h"
          : c < 604800
          ? Math.floor(c / 86400) + "d"
          : c < 31536e3
          ? Math.floor(c / 604800) + "w"
          : Math.floor(c / 31536e3) + "y";
      } else if (a == "long") {
        let c = { month: "2-digit", day: "2-digit", year: "numeric" };
        return n.toLocaleString(void 0, c);
      } else if (a == "minimal") {
        let c = { year: "numeric" };
        return n.toLocaleString(void 0, c);
      } else return e.toString();
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵpipe = ye({ name: "datePipe", type: t, pure: !0 });
    }
  }
  return t;
})();
var ee = (() => {
  class t {
    transform(e, a) {
      let n = typeof e == "string" ? parseFloat(e) : e;
      return a == "suffix"
        ? n >= 1e12
          ? (n / 1e12).toFixed(1) + "t"
          : n >= 1e9
          ? (n / 1e9).toFixed(1) + "b"
          : n >= 1e6
          ? (n / 1e6).toFixed(1) + "m"
          : n >= 1e3
          ? (n / 1e3).toFixed(1) + "k"
          : n.toString()
        : a == "reputation"
        ? (n <= 0 ? "" : "+") + n.toString()
        : a == "bytes"
        ? n >= 1e12
          ? Math.round(n / 1e12) + " TB"
          : n >= 1e9
          ? Math.round(n / 1e9) + " GB"
          : n >= 1e6
          ? Math.round(n / 1e6) + " MB"
          : n >= 1e3
          ? Math.round(n / 1e3) + " KB"
          : n.toString() + " B"
        : e.toString();
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵpipe = ye({ name: "numberPipe", type: t, pure: !0 });
    }
  }
  return t;
})();
var It = (t, d) => ({ nvs: t, nvb: d }),
  Ft = (t) => ["/", t];
function Bt(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.logout());
      }),
      l(1, "icons", 11),
      r(),
      o(2, "button", 12),
      l(3, "icons", 13),
      r();
  }
}
function Lt(t, d) {
  if (
    (t & 1 &&
      (o(0, "button", 14),
      l(1, "icons", 15),
      r(),
      o(2, "button", 16),
      l(3, "icons", 17),
      r(),
      o(4, "button", 18),
      l(5, "icons", 19),
      r(),
      o(6, "button", 20),
      l(7, "icons", 21),
      r(),
      o(8, "button", 22),
      l(9, "icons", 23),
      r(),
      o(10, "button", 24),
      l(11, "icons", 25),
      r(),
      o(12, "button", 26),
      l(13, "icons", 27),
      r()),
    t & 2)
  ) {
    let e = s();
    p("routerLink", P(1, Ft, e.user().username));
  }
}
function Dt(t, d) {
  t & 1 && (o(0, "button", 6), l(1, "icons", 15), r());
}
var Z = (() => {
  class t {
    constructor() {
      (this.user = ve({})),
        (this.eNav = S(!1)),
        (this.scroll = S(0)),
        (this.last = S(Date.now())),
        (this.client = y(N)),
        (this.router = y(re)),
        (this.http = y(A));
    }
    tNav() {
      this.eNav.update((e) => !e);
    }
    logout() {
      this.http
        .post(
          this.client.config("api") + "/user/logout",
          null,
          this.client.headers()
        )
        .subscribe({
          next: (e) => {
            e.type == "success" &&
              (new Audio(
                this.client.config("static") + "/audios/goodbye.mp3"
              ).play(),
              this.router.navigate(["/"]));
          },
          error: (e) => {
            this.router.navigate(["/"]);
          },
        });
    }
    onScroll() {
      Date.now() - this.last() > 50 &&
        (this.scroll.set(
          Math.floor(
            (window.scrollY /
              (document.body.scrollHeight - window.innerHeight)) *
              100
          )
        ),
        this.last.set(Date.now()));
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["navbar"]],
        hostBindings: function (a, n) {
          a & 1 &&
            C(
              "scroll",
              function () {
                return n.onScroll();
              },
              !1,
              De
            );
        },
        inputs: { user: [1, "user"] },
        decls: 12,
        vars: 10,
        consts: [
          [1, "nv"],
          [1, "nvlg", 3, "routerLink"],
          [
            "icon",
            "logo",
            "width",
            "25",
            "height",
            "25",
            "color",
            "var(--c-c)",
          ],
          [1, "nvt", 3, "click"],
          ["icon", "bars", "width", "11", "height", "11", 3, "color"],
          [3, "ngClass"],
          ["routerLink", "/auth"],
          ["routerLink", "/premium"],
          [
            "icon",
            "brush",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "nvsc"],
          [1, "nvrt", 3, "click"],
          [
            "icon",
            "cross",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["routerLink", "/settings", 1, "nvrt"],
          [
            "icon",
            "gear",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [3, "routerLink"],
          [
            "icon",
            "user",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["routerLink", "/messages"],
          [
            "icon",
            "message",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["routerLink", "/bookmarks"],
          [
            "icon",
            "bookmark",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["routerLink", "/files"],
          [
            "icon",
            "file",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["routerLink", "/directory"],
          [
            "icon",
            "info",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["routerLink", "/shop"],
          [
            "icon",
            "shop",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["routerLink", "/invites"],
          [
            "icon",
            "invite",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
        ],
        template: function (a, n) {
          a & 1 &&
            (o(0, "div", 0)(1, "div", 1),
            l(2, "icons", 2),
            r(),
            v(3, Bt, 4, 0),
            o(4, "button", 3),
            C("click", function () {
              return n.tNav();
            }),
            l(5, "icons", 4),
            r(),
            o(6, "div", 5),
            v(7, Lt, 14, 3)(8, Dt, 2, 0, "button", 6),
            o(9, "button", 7),
            l(10, "icons", 8),
            r()(),
            l(11, "div", 9),
            r()),
            a & 2 &&
              (i(),
              p("routerLink", n.user().username ? "/home" : "/"),
              i(2),
              _(n.user() && n.user().id ? 3 : -1),
              i(2),
              p("color", n.eNav() ? "var(--c-e)" : "var(--c-c)"),
              i(),
              p("ngClass", _e(7, It, n.eNav(), !n.eNav())),
              i(),
              _(n.user() && n.user().id ? 7 : 8),
              i(4),
              de("width", n.scroll(), "%"));
        },
        dependencies: [H, z, O, He, $, R],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var Ot = () => [import("./chunk-QUB3NLZO.js").then((t) => t.CliComponent)],
  me = (t) => ["/", t],
  We = (t) => ({ "--x": t, "font-size": "16px" }),
  Ht = () => ["/invites"],
  $t = () => ["/bookmarks"],
  je = () => ["/files"],
  Gt = () => ["/messages"],
  Ve = () => ["/shop"],
  Me = (t) => ({ "--x": t });
function Rt(t, d) {
  if ((t & 1 && (o(0, "span", 8), m(1), r()), t & 2)) {
    let e = s(2);
    k("glw", e.user().premium),
      p("routerLink", P(5, me, e.user().username))(
        "ngStyle",
        P(7, We, e.user().color)
      ),
      i(),
      b("(", e.user().name, ")");
  }
}
function Nt(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 11),
      u(1, "datePipe"),
      Y(),
      o(2, "svg", 43),
      l(3, "path", 44),
      r()()),
    t & 2)
  ) {
    let e = s(2);
    T("data-title", "Admin (Expires ", h(1, 5, e.user().admin, "long"), ")"),
      i(2),
      k("glw", e.user().premium),
      p("ngStyle", P(8, Me, e.user().color));
  }
}
function At(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 11),
      u(1, "datePipe"),
      Y(),
      o(2, "svg", 45),
      l(3, "path", 46),
      r()()),
    t & 2)
  ) {
    let e = s(2);
    T(
      "data-title",
      "Premium (Expires ",
      h(1, 5, e.user().premium, "long"),
      ")"
    ),
      i(2),
      k("glw", e.user().premium),
      p("ngStyle", P(8, Me, e.user().color));
  }
}
function zt(t, d) {
  if (
    (t & 1 && (o(0, "div", 12), Y(), o(1, "svg", 47), l(2, "path", 48), r()()),
    t & 2)
  ) {
    let e = s(2);
    i(), k("glw", e.user().premium), p("ngStyle", P(3, Me, e.user().color));
  }
}
function Ut(t, d) {
  if ((t & 1 && l(0, "cli", 49), t & 2)) {
    let e = s(2);
    p("user", e.user());
  }
}
function Zt(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 1)(1, "div", 2),
      l(2, "icons", 3),
      m(3),
      l(4, "div", 4),
      r(),
      o(5, "div", 5),
      l(6, "avatar", 6),
      r(),
      o(7, "div", 2),
      l(8, "div", 4),
      o(9, "div", 7)(10, "span", 8),
      m(11),
      r(),
      v(12, Rt, 2, 9, "span", 9),
      o(13, "span", 10),
      v(14, Nt, 4, 10, "div", 11)(15, At, 4, 10, "div", 11)(
        16,
        zt,
        3,
        5,
        "div",
        12
      ),
      r()(),
      l(17, "div", 4),
      r(),
      o(18, "div", 13)(19, "div", 14),
      l(20, "icons", 15),
      m(21),
      u(22, "numberPipe"),
      r(),
      o(23, "div", 16),
      l(24, "icons", 17),
      m(25),
      u(26, "numberPipe"),
      l(27, "icons", 18),
      r(),
      o(28, "div", 19),
      m(29),
      u(30, "numberPipe"),
      l(31, "icons", 15),
      r()(),
      o(32, "div", 5)(33, "button", 20),
      l(34, "icons", 21),
      r(),
      o(35, "button", 22),
      l(36, "icons", 23),
      r(),
      o(37, "button", 24),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.logout());
      }),
      l(38, "icons", 25),
      r()()(),
      o(39, "div", 1)(40, "div", 2),
      l(41, "icons", 3),
      m(42, " Metrics "),
      l(43, "div", 4),
      r(),
      o(44, "div", 26)(45, "button", 27),
      l(46, "icons", 28),
      m(47),
      u(48, "numberPipe"),
      r(),
      o(49, "button", 27),
      l(50, "icons", 29),
      m(51),
      u(52, "numberPipe"),
      r(),
      o(53, "button", 27),
      l(54, "icons", 30),
      m(55),
      u(56, "numberPipe"),
      r(),
      o(57, "button", 27),
      l(58, "icons", 31),
      m(59),
      u(60, "numberPipe"),
      r(),
      o(61, "button", 27),
      l(62, "icons", 32),
      m(63),
      u(64, "numberPipe"),
      r(),
      o(65, "button", 27),
      l(66, "icons", 33),
      m(67),
      u(68, "numberPipe"),
      r(),
      o(69, "button", 27),
      l(70, "icons", 21),
      m(71),
      u(72, "numberPipe"),
      r(),
      o(73, "button", 27),
      l(74, "icons", 34),
      m(75),
      u(76, "numberPipe"),
      r(),
      o(77, "button", 27),
      l(78, "icons", 35),
      m(79),
      u(80, "numberPipe"),
      r(),
      o(81, "button", 27),
      l(82, "icons", 36),
      m(83),
      u(84, "numberPipe"),
      r(),
      o(85, "button", 27),
      l(86, "icons", 37),
      m(87),
      u(88, "numberPipe"),
      r(),
      o(89, "button", 27),
      l(90, "icons", 37),
      m(91),
      u(92, "numberPipe"),
      r(),
      o(93, "button", 27),
      l(94, "icons", 38),
      m(95),
      u(96, "numberPipe"),
      r(),
      o(97, "button", 27),
      l(98, "icons", 39),
      m(99),
      u(100, "numberPipe"),
      r(),
      o(101, "button", 27),
      l(102, "icons", 40),
      m(103),
      u(104, "numberPipe"),
      r(),
      o(105, "button", 27),
      l(106, "icons", 41),
      m(107),
      u(108, "numberPipe"),
      r(),
      o(109, "button", 27),
      l(110, "icons", 42),
      m(111),
      u(112, "numberPipe"),
      r(),
      o(113, "button", 27),
      l(114, "icons", 42),
      m(115),
      u(116, "datePipe"),
      r()()(),
      o(117, "div", 1)(118, "div", 2),
      l(119, "icons", 3),
      m(120, " CLI "),
      l(121, "div", 4),
      r(),
      v(122, Ut, 1, 1),
      I(123, 122, Ot),
      F(),
      r();
  }
  if (t & 2) {
    let e = s();
    i(3),
      b(" ", e.siteName(), " "),
      i(3),
      p("user", e.user()),
      i(4),
      k("glw", e.user().premium),
      p("routerLink", P(114, me, e.user().username))(
        "ngStyle",
        P(116, We, e.user().color)
      ),
      i(),
      b("@", e.user().username, ""),
      i(),
      _(e.user().name ? 12 : -1),
      i(2),
      _(e.user().admin ? 14 : -1),
      i(),
      _(e.user().premium ? 15 : -1),
      i(),
      _(e.user().privacy > 0 ? 16 : -1),
      i(5),
      b(" ", h(22, 51, e.user().experience.xp, "suffix"), ""),
      i(4),
      b(" ", h(26, 54, e.user().experience.level, "suffix"), " "),
      i(4),
      b("", h(30, 57, e.user().experience.next, "suffix"), " "),
      i(4),
      p("routerLink", P(118, me, e.user().username)),
      i(12),
      p("routerLink", P(120, me, e.user().username)),
      i(2),
      b(" ", h(48, 60, e.user().views, "suffix"), ""),
      i(2),
      p("routerLink", P(122, me, e.user().username)),
      i(2),
      b(" ", h(52, 63, e.user().reputation, "reputation"), ""),
      i(2),
      p("routerLink", oe(124, Ht)),
      i(2),
      b(" ", h(56, 66, e.user().invites, "suffix"), ""),
      i(2),
      p("routerLink", P(125, me, e.user().username)),
      i(2),
      b(" ", h(60, 69, e.user().posts, "suffix"), ""),
      i(2),
      p("routerLink", P(127, me, e.user().username)),
      i(2),
      b(" ", h(64, 72, e.user().replies, "suffix"), ""),
      i(2),
      p("routerLink", P(129, me, e.user().username)),
      i(2),
      b(" ", h(68, 75, e.user().likes, "suffix"), ""),
      i(2),
      p("routerLink", P(131, me, e.user().username)),
      i(2),
      b(" ", h(72, 78, e.user().following, "suffix"), ""),
      i(2),
      p("routerLink", P(133, me, e.user().username)),
      i(2),
      b(" ", h(76, 81, e.user().followers, "suffix"), ""),
      i(2),
      p("routerLink", P(135, me, e.user().username)),
      i(2),
      b(" ", h(80, 84, e.user().pending, "suffix"), ""),
      i(2),
      p("routerLink", oe(137, $t)),
      i(2),
      b(" ", h(84, 87, e.user().bookmarks, "suffix"), ""),
      i(2),
      p("routerLink", oe(138, je)),
      i(2),
      b(" ", h(88, 90, e.user().files, "suffix"), ""),
      i(2),
      p("routerLink", oe(139, je)),
      i(2),
      b(" ", h(92, 93, e.user().storage, "bytes"), ""),
      i(2),
      p("routerLink", oe(140, Gt)),
      i(2),
      b(" ", h(96, 96, e.user().messages, "suffix"), ""),
      i(2),
      p("routerLink", P(141, me, e.user().username)),
      i(2),
      b(" ", h(100, 99, e.user().comments, "suffix"), ""),
      i(2),
      p("routerLink", oe(143, Ve)),
      i(2),
      E(h(104, 102, e.user().balance, "suffix")),
      i(2),
      p("routerLink", oe(144, Ve)),
      i(2),
      E(h(108, 105, e.user().spent, "suffix")),
      i(2),
      p("routerLink", oe(145, Ve)),
      i(2),
      E(h(112, 108, e.user().streak, "suffix")),
      i(2),
      p("routerLink", oe(146, Ve)),
      i(2),
      E(e.user().daily ? h(116, 111, e.user().daily, "short") : "Now");
  }
}
function qt(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 1)(1, "div", 2),
      l(2, "icons", 3),
      m(3),
      l(4, "div", 4),
      r(),
      o(5, "div", 5),
      l(6, "avatar", 6),
      r(),
      o(7, "div", 2),
      l(8, "div", 4),
      o(9, "div", 50),
      m(10, " Not logged in "),
      r(),
      l(11, "div", 4),
      r(),
      o(12, "div", 5)(13, "button", 51),
      l(14, "icons", 52),
      r(),
      o(15, "button", 53),
      l(16, "icons", 21),
      r(),
      o(17, "button", 54),
      l(18, "icons", 55),
      r()(),
      o(19, "div", 56)(20, "div", 57),
      l(21, "icons", 58),
      o(22, "span", 59),
      m(23, "Information"),
      r()(),
      o(24, "div", 60),
      m(25, "You must be logged in to access the rest of the features"),
      r()()()),
    t & 2)
  ) {
    let e = s();
    i(3), b(" ", e.siteName(), " "), i(3), p("user", e.placeholder());
  }
}
var q = (() => {
  class t {
    constructor() {
      (this.user = ve({})),
        (this.siteName = S("")),
        (this.placeholder = S({})),
        (this.client = y(N)),
        (this.router = y(re)),
        (this.http = y(A));
    }
    ngOnInit() {
      this.siteName.set(this.client.config("name")),
        this.placeholder.set(this.client.config("placeholder"));
    }
    logout() {
      this.http
        .post(
          this.client.config("api") + "/user/logout",
          null,
          this.client.headers()
        )
        .subscribe({
          next: (e) => {
            e.type == "success" &&
              (new Audio(
                this.client.config("static") + "/audios/goodbye.mp3"
              ).play(),
              this.router.navigate(["/"]));
          },
          error: (e) => {
            this.router.navigate(["/"]);
          },
        });
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["left"]],
        inputs: { user: [1, "user"] },
        decls: 3,
        vars: 1,
        consts: [
          [2, "display", "flex", "flex-direction", "column"],
          [1, "pgl"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [1, "rw"],
          ["size", "large", 3, "user"],
          [2, "margin", "0"],
          [1, "un", 3, "routerLink", "ngStyle"],
          [1, "un", 3, "routerLink", "ngStyle", "glw"],
          [2, "display", "inline-flex", "margin-left", "3px"],
          [1, "bdgc"],
          ["data-title", "Private", 1, "bdgc"],
          [1, "exp"],
          [2, "margin-left", "6px"],
          [
            "icon",
            "experience",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin", "0 6px"],
          [
            "icon",
            "doubleleft",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "doubleright",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-right", "6px"],
          [2, "width", "100%", 3, "routerLink"],
          [
            "icon",
            "user",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["routerLink", "/settings", 2, "width", "100%"],
          [
            "icon",
            "gear",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "width", "100%", 3, "click"],
          [
            "icon",
            "cross",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "gr", 2, "--x", "55px"],
          [1, "ev", 2, "font-size", "10px", 3, "routerLink"],
          [
            "icon",
            "views",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "reputation",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "invite",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "post",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "reply",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "like",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "users",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "pending",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "bookmark",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "file",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "message",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "comment",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "money",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "shop",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "flame",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "height",
            "16",
            "width",
            "16",
            "fill",
            "var(--x)",
            "version",
            "1.2",
            "xmlns",
            "http://www.w3.org/2000/svg",
            "viewBox",
            "0 0 256 240.5",
            0,
            "xml",
            "space",
            "preserve",
            1,
            "bdg",
            3,
            "ngStyle",
          ],
          [
            "d",
            "M41 196h174v31H41v-31zM236 59a20 20 0 0 0-18 29l-42 21-38-64a20 20 0 1 0-20 0l-38 64-41-21c2-2 2-5 2-9a20 20 0 1 0-16 20l15 77h176l16-77a20 20 0 0 0 24-20c0-11-9-20-20-20z",
          ],
          [
            "width",
            "16",
            "height",
            "16",
            "fill",
            "var(--x)",
            "viewBox",
            "0 -5.5 56.3 56.3",
            "xmlns",
            "http://www.w3.org/2000/svg",
            1,
            "bdg",
            3,
            "ngStyle",
          ],
          [
            "d",
            "m24 1 2-1H13L0 15h13Zm-8 14h24l-6-8-6-6-8 9ZM0 17l24 25-11-25Zm41 0H15l13 28 12-26Zm-9 25 24-25H44Zm24-27L43 0H31l12 15Z",
          ],
          [
            "height",
            "16",
            "width",
            "16",
            "fill",
            "var(--x)",
            "xmlns",
            "http://www.w3.org/2000/svg",
            "viewBox",
            "-2 0 24 24",
            1,
            "bdg",
            3,
            "ngStyle",
          ],
          [
            "d",
            "M3.5 6.5V10H2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2h-1.5V6.5a6.5 6.5 0 1 0-13 0M6 10V6.5a4 4 0 0 1 8 0V10zm2 5.5a2 2 0 1 1 3.1 1.68h-.02l.42 2.57c0 .42-.34.75-.75.75h-1.5a.75.75 0 0 1-.75-.75l.41-2.57A2 2 0 0 1 8 15.5",
          ],
          [3, "user"],
          [2, "margin", "0", "font-size", "16px"],
          ["routerLink", "/", 2, "width", "100%"],
          [
            "icon",
            "logo",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["routerLink", "/auth", 2, "width", "100%"],
          ["routerLink", "/premium", 2, "width", "100%"],
          [
            "icon",
            "brush",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "cn"],
          [1, "hl"],
          [
            "icon",
            "info",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-left", "5px"],
          [1, "cnt"],
        ],
        template: function (a, n) {
          a & 1 &&
            (o(0, "div", 0), v(1, Zt, 125, 147)(2, qt, 26, 2, "div", 1), r()),
            a & 2 && (i(), _(n.user() && n.user().id ? 1 : 2));
        },
        dependencies: [K, ee, H, z, O, ce, $, R, X],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var jt = () => [import("./chunk-U35HPDKO.js").then((t) => t.RealtimeComponent)],
  Wt = () => [import("./chunk-IGKAPWAB.js").then((t) => t.ComposeComponent)],
  Jt = () => [import("./chunk-QHDGOEVR.js").then((t) => t.UploadComponent)];
function Kt(t, d) {
  if ((t & 1 && l(0, "realtime", 5), t & 2)) {
    let e = s(2);
    p("user", e.user());
  }
}
function Yt(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "compose", 6),
      C("onComposed", function (n) {
        x(e);
        let c = s(2);
        return g(c.composed(n));
      }),
      r();
  }
}
function Qt(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "upload", 7),
      C("onUploaded", function (n) {
        x(e);
        let c = s(2);
        return g(c.uploaded(n));
      }),
      r();
  }
}
function Xt(t, d) {
  t & 1 &&
    (v(0, Kt, 1, 1),
    I(1, 0, jt),
    F(),
    o(3, "div", 1)(4, "div", 2),
    l(5, "icons", 3),
    m(6, " Post "),
    l(7, "div", 4),
    r(),
    v(8, Yt, 1, 0),
    I(9, 8, Wt),
    F(),
    r(),
    o(11, "div", 1)(12, "div", 2),
    l(13, "icons", 3),
    m(14, " Upload "),
    l(15, "div", 4),
    r(),
    v(16, Qt, 1, 0),
    I(17, 16, Jt),
    F(),
    r());
}
function ei(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 1)(1, "div", 2),
      l(2, "icons", 3),
      m(3, " Join "),
      l(4, "div", 4),
      r(),
      o(5, "div", 8)(6, "div", 9),
      l(7, "icons", 10),
      o(8, "span", 11),
      m(9, "Information"),
      r()(),
      o(10, "div", 12),
      m(
        11,
        "Our platform is invite only. To join us, register using an invite code or apply on our discord server"
      ),
      r()()(),
      o(12, "div", 1)(13, "div", 2),
      l(14, "icons", 3),
      m(15, " Contact "),
      l(16, "div", 4),
      r(),
      o(17, "div", 8)(18, "div", 9),
      l(19, "icons", 10),
      o(20, "span", 11),
      m(21, "Information"),
      r()(),
      o(22, "div", 12),
      m(
        23,
        "Want to reach out to us about something? Send us an email or join our discord server below"
      ),
      r()(),
      o(24, "div", 13)(25, "a", 14),
      l(26, "icons", 15),
      r(),
      o(27, "a", 14),
      l(28, "icons", 16),
      r()()()),
    t & 2)
  ) {
    let e = s();
    i(25),
      p("href", e.contact().email, he),
      i(2),
      p("href", e.contact().discord, he);
  }
}
var j = (() => {
  class t {
    constructor() {
      (this.user = ve({})),
        (this.contact = S({})),
        (this.client = y(N)),
        (this.router = y(re));
    }
    ngOnInit() {
      this.contact.set(this.client.config("contact"));
    }
    composed(e) {
      this.router.navigate(["/post", e]);
    }
    uploaded(e) {
      this.router.navigate(["/file", e]);
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["right"]],
        inputs: { user: [1, "user"] },
        decls: 3,
        vars: 1,
        consts: [
          [2, "display", "flex", "flex-direction", "column"],
          [1, "pgr"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [3, "user"],
          ["type", "post", "size", "small", 3, "onComposed"],
          ["size", "small", "category", "upload", 3, "onUploaded"],
          [1, "cn"],
          [1, "hl"],
          [
            "icon",
            "info",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-left", "5px"],
          [1, "cnt"],
          [1, "rw"],
          ["target", "_blank", 2, "width", "100%", 3, "href"],
          [
            "icon",
            "message",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "discord",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
        ],
        template: function (a, n) {
          a & 1 && (o(0, "div", 0), v(1, Xt, 19, 0)(2, ei, 29, 2), r()),
            a & 2 && (i(), _(n.user() && n.user().id ? 1 : 2));
        },
        dependencies: [H, O, $, R],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var ti = (t, d) => d.id;
function ii(t, d) {
  if ((t & 1 && (l(0, "span", 39), u(1, "contentPipe")), t & 2)) {
    let e = s().$implicit;
    p("innerHTML", h(1, 1, e.bio, "preview"), G);
  }
}
function ni(t, d) {
  if ((t & 1 && (o(0, "span", 41), l(1, "icons", 44), m(2), r()), t & 2)) {
    let e = s().$implicit;
    T("data-title", "Currently in ", e.location, ""),
      i(),
      p("color", e.color),
      i(),
      b(" ", e.location, "");
  }
}
function oi(t, d) {
  if (
    (t & 1 &&
      (o(0, "span", 41),
      u(1, "numberPipe"),
      l(2, "icons", 45),
      m(3),
      u(4, "numberPipe"),
      r()),
    t & 2)
  ) {
    let e = s().$implicit;
    T("data-title", "", h(1, 4, e.views, "suffix"), " Views"),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(4, 7, e.views, "suffix"), "");
  }
}
function ri(t, d) {
  if (
    (t & 1 &&
      (o(0, "span", 41),
      u(1, "datePipe"),
      l(2, "icons", 46),
      m(3),
      u(4, "datePipe"),
      r()),
    t & 2)
  ) {
    let e = s().$implicit;
    T("data-title", "Last seen ", h(1, 4, e.seen, "long"), ""),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(4, 7, e.seen, "short"), "");
  }
}
function ai(t, d) {
  if ((t & 1 && (o(0, "span", 41), l(1, "icons", 47), m(2), r()), t & 2)) {
    let e = s().$implicit;
    T("data-title", "Member of #", e.group.tag, ""),
      i(),
      p("color", e.color),
      i(),
      b(" ", e.group.tag, "");
  }
}
function li(t, d) {
  if ((t & 1 && (o(0, "span", 41), l(1, "display", 38), r()), t & 2)) {
    let e = s().$implicit;
    T("data-title", "Invited by @", e.inviter.username, ""),
      i(),
      p("user", e.inviter)("color", e.color);
  }
}
function si(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 23),
      l(1, "avatar", 37)(2, "display", 38),
      v(3, ii, 2, 4, "span", 39),
      o(4, "div", 40)(5, "span", 41),
      u(6, "numberPipe"),
      l(7, "icons", 42),
      m(8),
      u(9, "numberPipe"),
      r(),
      v(10, ni, 3, 4, "span", 41)(11, oi, 5, 10, "span", 41),
      o(12, "span", 41),
      u(13, "datePipe"),
      l(14, "icons", 43),
      m(15),
      u(16, "datePipe"),
      r(),
      v(17, ri, 5, 10, "span", 41)(18, ai, 3, 4, "span", 41)(
        19,
        li,
        2,
        4,
        "span",
        41
      ),
      r()()),
    t & 2)
  ) {
    let e = d.$implicit;
    i(),
      p("user", e),
      i(),
      p("user", e)("color", e.color),
      i(),
      _(e.bio ? 3 : -1),
      i(2),
      T("data-title", "User #", h(6, 17, e.uuid, "suffix"), ""),
      i(2),
      p("color", e.color),
      i(),
      b(" #", h(9, 20, e.uuid, "suffix"), ""),
      i(2),
      _(e.location ? 10 : -1),
      i(),
      _(e.views ? 11 : -1),
      i(),
      T("data-title", "Joined ", h(13, 23, e.timestamp, "long"), ""),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(16, 26, e.timestamp, "minimal"), ""),
      i(2),
      _(e.seen ? 17 : -1),
      i(),
      _(e.group ? 18 : -1),
      i(),
      _(e.inviter ? 19 : -1);
  }
}
function ci(t, d) {
  if ((t & 1 && W(0, si, 20, 29, "div", 23, ti), t & 2)) {
    let e = s(2);
    J(e.users());
  }
}
function pi(t, d) {
  if (
    (t & 1 &&
      (l(0, "left"),
      o(1, "div", 1)(2, "div", 2),
      l(3, "icons", 3),
      m(4),
      l(5, "div", 4),
      r(),
      o(6, "div", 5)(7, "div", 6)(8, "div", 7),
      l(9, "avatar", 8),
      r(),
      o(10, "div", 9)(11, "span", 10),
      m(12, "@s"),
      r(),
      o(13, "span", 11)(14, "div", 12),
      Y(),
      o(15, "svg", 13),
      l(16, "path", 14),
      r()(),
      Ce(),
      o(17, "div", 15),
      Y(),
      o(18, "svg", 16),
      l(19, "path", 17),
      r()(),
      Ce(),
      o(20, "div", 18),
      Y(),
      o(21, "svg", 19),
      l(22, "path", 20),
      r()()(),
      Ce(),
      o(23, "div", 21),
      m(
        24,
        "Exclusive, fast, and secure platform with customizable features. Experience unmatched interactivity."
      ),
      r()()()(),
      o(25, "div", 22)(26, "div", 23)(27, "div", 24),
      l(28, "icons", 25),
      o(29, "span", 26),
      m(30, "Restricted"),
      r()(),
      o(31, "div", 27),
      m(32, "Invite only system implemented to restrict public access"),
      r()(),
      o(33, "div", 23)(34, "div", 24),
      l(35, "icons", 28),
      o(36, "span", 26),
      m(37, "Customizable"),
      r()(),
      o(38, "div", 27),
      m(39, "Tons of customization offered including a text editor"),
      r()(),
      o(40, "div", 23)(41, "div", 24),
      l(42, "icons", 29),
      o(43, "span", 26),
      m(44, "Performant"),
      r()(),
      o(45, "div", 27),
      m(46, "Designed to be blazing fast, scalable and always available"),
      r()(),
      o(47, "div", 23)(48, "div", 24),
      l(49, "icons", 30),
      o(50, "span", 26),
      m(51, "Secure"),
      r()(),
      o(52, "div", 27),
      m(53, "Data is encrypted and hashed ensuring maximum security"),
      r()(),
      o(54, "div", 23)(55, "div", 24),
      l(56, "icons", 31),
      o(57, "span", 26),
      m(58, "Interactive"),
      r()(),
      o(59, "div", 27),
      m(60, "Endless ways to interact with people and what they say"),
      r()(),
      o(61, "div", 23)(62, "div", 24),
      l(63, "icons", 32),
      o(64, "span", 26),
      m(65, "Private"),
      r()(),
      o(66, "div", 27),
      m(67, "Global and individual privacy and visibility settings"),
      r()(),
      o(68, "div", 23)(69, "div", 24),
      l(70, "icons", 33),
      o(71, "span", 26),
      m(72, "Realtime"),
      r()(),
      o(73, "div", 27),
      m(74, "Stay up to date with instant notifications and live chatting"),
      r()(),
      o(75, "div", 23)(76, "div", 24),
      l(77, "icons", 34),
      o(78, "span", 26),
      m(79, "Rewarding"),
      r()(),
      o(80, "div", 27),
      m(81, "Earn rewards and redeem them in the shop for free"),
      r()(),
      o(82, "div", 23)(83, "div", 24),
      l(84, "icons", 35),
      o(85, "span", 26),
      m(86, "Minimal"),
      r()(),
      o(87, "div", 27),
      m(88, "Optimized for a rich and super smooth user experience"),
      r()()(),
      o(89, "div", 23)(90, "div", 24),
      l(91, "icons", 36),
      o(92, "span", 26),
      m(93, "Explore"),
      r()(),
      o(94, "div", 27),
      m(
        95,
        "Check out some of our recently registered users below and find out what they're talking about."
      ),
      r()(),
      v(96, ci, 2, 0),
      r(),
      l(97, "right")),
    t & 2)
  ) {
    let e = s();
    i(4),
      b(" ", e.siteName(), " "),
      i(5),
      p("user", e.placeholder()),
      i(87),
      _(e.users().length > 0 ? 96 : -1);
  }
}
var Je = (() => {
  class t {
    constructor() {
      (this.users = S([])),
        (this.siteName = S("")),
        (this.placeholder = S({})),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U)),
        (this.router = y(re)),
        (this.meta = y(pe));
    }
    ngOnInit() {
      this.siteName.set(this.client.config("name")),
        this.placeholder.set(this.client.config("placeholder")),
        this.title.setTitle(this.siteName()),
        this.meta.addTags([
          { name: "title", content: this.siteName() },
          { name: "og:title", content: this.siteName() },
          { name: "twitter:title", content: this.siteName() },
          {
            name: "description",
            content:
              "Exclusive, fast, and secure platform with customizable features. Experience unmatched interactivity.",
          },
          {
            name: "og:description",
            content:
              "Exclusive, fast, and secure platform with customizable features. Experience unmatched interactivity.",
          },
          { name: "theme-color", content: "#000000" },
          {
            name: "og:image",
            content: this.client.config("static") + "/images/avatar.png",
          },
          { name: "twitter:card", content: "summary" },
          { name: "og:type", content: "website" },
        ]),
        this.getUsers();
    }
    getUsers() {
      let e = { option: "users" };
      this.http
        .post(
          this.client.config("api") + "/view/latest",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (a.me && a.me.id && this.router.navigate(["/home"]),
              this.users.set(a.users));
          },
          error: (a) => {},
        });
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["index"]],
        decls: 3,
        vars: 1,
        consts: [
          [1, "app"],
          [1, "pg"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [1, "bn", 2, "border-radius", "var(--b-c)"],
          [
            2,
            "display",
            "flex",
            "flex-direction",
            "row",
            "align-items",
            "center",
          ],
          [2, "align-self", "start", "position", "relative"],
          ["size", "large", 3, "user"],
          [2, "text-align", "left", "margin-left", "15px"],
          ["routerLink", "/s", 1, "un", "glw", 2, "--x", "var(--c-c)"],
          [2, "display", "inline-flex", "margin-left", "3px"],
          ["data-title", "Admin", 1, "bdgc"],
          [
            "height",
            "16",
            "width",
            "16",
            "fill",
            "var(--x)",
            "version",
            "1.2",
            "xmlns",
            "http://www.w3.org/2000/svg",
            "viewBox",
            "0 0 256 240.5",
            0,
            "xml",
            "space",
            "preserve",
            1,
            "bdg",
            "glw",
            2,
            "--x",
            "var(--c-c)",
          ],
          [
            "d",
            "M41 196h174v31H41v-31zM236 59a20 20 0 0 0-18 29l-42 21-38-64a20 20 0 1 0-20 0l-38 64-41-21c2-2 2-5 2-9a20 20 0 1 0-16 20l15 77h176l16-77a20 20 0 0 0 24-20c0-11-9-20-20-20z",
          ],
          ["data-title", "Premium", 1, "bdgc"],
          [
            "width",
            "16",
            "height",
            "16",
            "fill",
            "var(--x)",
            "viewBox",
            "0 -5.5 56.3 56.3",
            "xmlns",
            "http://www.w3.org/2000/svg",
            1,
            "bdg",
            "glw",
            2,
            "--x",
            "var(--c-c)",
          ],
          [
            "d",
            "m24 1 2-1H13L0 15h13Zm-8 14h24l-6-8-6-6-8 9ZM0 17l24 25-11-25Zm41 0H15l13 28 12-26Zm-9 25 24-25H44Zm24-27L43 0H31l12 15Z",
          ],
          ["data-title", "Private", 1, "bdgc"],
          [
            "width",
            "16",
            "height",
            "16",
            "fill",
            "var(--x)",
            "xmlns",
            "http://www.w3.org/2000/svg",
            "viewBox",
            "-2 0 24 24",
            1,
            "bdg",
            "glw",
            2,
            "--x",
            "var(--c-c)",
          ],
          [
            "d",
            "M3.5 6.5V10H2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2h-1.5V6.5a6.5 6.5 0 1 0-13 0M6 10V6.5a4 4 0 0 1 8 0V10zm2 5.5a2 2 0 1 1 3.1 1.68h-.02l.42 2.57c0 .42-.34.75-.75.75h-1.5a.75.75 0 0 1-.75-.75l.41-2.57A2 2 0 0 1 8 15.5",
          ],
          [1, "bi", 2, "margin", "8px 0 0 0"],
          [1, "gr", 2, "--x", "150px"],
          [1, "cn"],
          [1, "hl"],
          [
            "icon",
            "cross",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-left", "5px"],
          [1, "cnt"],
          [
            "icon",
            "wrench",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "lightning",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "shield",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "uparrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "hide",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "flame",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "money",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "users",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "topright",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["size", "small", 3, "user"],
          [3, "user", "color"],
          [
            1,
            "bi",
            2,
            "margin-left",
            "5px",
            "vertical-align",
            "middle",
            "white-space",
            "nowrap",
            3,
            "innerHTML",
          ],
          [1, "ints", 2, "margin-top", "10px"],
          [1, "bx", 2, "margin", "8px 4px 0 0"],
          ["icon", "user", "width", "11", "height", "11", 3, "color"],
          ["icon", "calendar", "width", "11", "height", "11", 3, "color"],
          ["icon", "location", "width", "11", "height", "11", 3, "color"],
          ["icon", "views", "width", "11", "height", "11", 3, "color"],
          ["icon", "seen", "width", "11", "height", "11", 3, "color"],
          ["icon", "hashtag", "width", "11", "height", "11", 3, "color"],
        ],
        template: function (a, n) {
          a & 1 && (o(0, "div", 0), l(1, "navbar"), v(2, pi, 98, 3), r()),
            a & 2 && (i(2), _(n.users().length > 0 ? 2 : -1));
        },
        dependencies: [K, ee, Q, H, z, O, $, ie, Z, R, X, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
function mi(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "input", 15),
      C("ngModelChange", function (n) {
        x(e);
        let c = s();
        return g(c.verifypassword.set(n));
      }),
      r();
  }
  if (t & 2) {
    let e = s();
    p("ngModel", e.verifypassword());
  }
}
function di(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 8)(1, "input", 16),
      C("ngModelChange", function (n) {
        x(e);
        let c = s();
        return g(c.invite.set(n));
      }),
      r()();
  }
  if (t & 2) {
    let e = s();
    i(), p("ngModel", e.invite());
  }
}
function _i(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 8)(1, "input", 17),
      C("ngModelChange", function (n) {
        x(e);
        let c = s();
        return g(c.verifycode.set(n));
      }),
      r()();
  }
  if (t & 2) {
    let e = s();
    i(), p("ngModel", e.verifycode());
  }
}
function ui(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 9),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.login());
      }),
      m(1, "Login"),
      r();
  }
}
function hi(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 9),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.register());
      }),
      m(1, "Register"),
      r();
  }
}
function fi(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 14)(1, "div", 18),
      l(2, "icons", 19),
      o(3, "span", 20),
      m(4, "Information"),
      r()(),
      o(5, "div", 21),
      m(6),
      r()()),
    t & 2)
  ) {
    let e = s();
    i(6), E(e.response());
  }
}
var Ke = (() => {
  class t {
    constructor() {
      (this.authOpt = S("login")),
        (this.response = S("")),
        (this.username = S("")),
        (this.password = S("")),
        (this.verifypassword = S("")),
        (this.verifycode = S("")),
        (this.invite = S("")),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U)),
        (this.router = y(re));
    }
    ngOnInit() {
      this.title.setTitle("Authenticate"), this.getMe();
    }
    getMe() {
      this.http
        .post(
          this.client.config("api") + "/view/me",
          null,
          this.client.headers()
        )
        .subscribe({
          next: (e) => {
            e.type == "success" && this.router.navigate(["/home"]);
          },
          error: (e) => {},
        });
    }
    register() {
      if (this.password() != this.verifypassword())
        this.response.set("Passwords do not match");
      else {
        let e = {
          username: this.username(),
          password: this.password(),
          invite: this.invite(),
        };
        this.http
          .post(
            this.client.config("api") + "/account/register",
            e,
            this.client.headers()
          )
          .subscribe({
            next: (a) => {
              a.type == "success" &&
                (new Audio(
                  this.client.config("static") + "/audios/welcome.mp3"
                ).play(),
                this.username.set(""),
                this.password.set(""),
                this.verifypassword.set(""),
                this.verifycode.set(""),
                this.invite.set(""),
                this.router.navigate(["/home"]));
            },
            error: (a) => {
              this.response.set(a.error.message);
            },
          });
      }
    }
    login() {
      let e = {
        username: this.username(),
        password: this.password(),
        code: this.verifycode(),
      };
      this.http
        .post(
          this.client.config("api") + "/account/login",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (new Audio(
                this.client.config("static") + "/audios/welcome.mp3"
              ).play(),
              this.username.set(""),
              this.password.set(""),
              this.router.navigate(["/home"]));
          },
          error: (a) => {
            this.response.set(a.error.message);
          },
        });
    }
    updateAuthOpt(e) {
      this.authOpt() != e &&
        (this.authOpt.set(e),
        this.username.set(""),
        this.password.set(""),
        this.verifypassword.set(""),
        this.verifycode.set(""),
        this.invite.set(""),
        this.response.set(""));
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["auth"]],
        decls: 30,
        vars: 13,
        consts: [
          [1, "app"],
          [1, "pg"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [2, "margin-left", "auto"],
          ["data-title", "Go back", "routerLink", "/"],
          [
            "icon",
            "doubleleft",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "rw"],
          [2, "width", "100%", 3, "click"],
          [
            "type",
            "text",
            "placeholder",
            "Username",
            3,
            "ngModelChange",
            "ngModel",
          ],
          [
            "type",
            "password",
            "placeholder",
            "Password",
            3,
            "ngModelChange",
            "ngModel",
          ],
          ["type", "password", "placeholder", "Verify Password", 3, "ngModel"],
          [2, "width", "100%"],
          [1, "cn"],
          [
            "type",
            "password",
            "placeholder",
            "Verify Password",
            3,
            "ngModelChange",
            "ngModel",
          ],
          [
            "type",
            "text",
            "placeholder",
            "Invite code",
            3,
            "ngModelChange",
            "ngModel",
          ],
          [
            "type",
            "text",
            "placeholder",
            "2FA Code (Optional)",
            3,
            "ngModelChange",
            "ngModel",
          ],
          [1, "hl"],
          [
            "icon",
            "info",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-left", "5px"],
          [1, "cnt"],
        ],
        template: function (a, n) {
          a & 1 &&
            (o(0, "div", 0),
            l(1, "navbar")(2, "left"),
            o(3, "div", 1)(4, "div", 2),
            l(5, "icons", 3),
            m(6, " Authenticate "),
            l(7, "icons", 3),
            m(8),
            l(9, "div", 4),
            o(10, "div", 5)(11, "button", 6),
            l(12, "icons", 7),
            r()()(),
            o(13, "div", 8)(14, "button", 9),
            C("click", function () {
              return n.updateAuthOpt("login");
            }),
            m(15, "Login"),
            r(),
            o(16, "button", 9),
            C("click", function () {
              return n.updateAuthOpt("register");
            }),
            m(17, "Register"),
            r()(),
            o(18, "div", 8)(19, "input", 10),
            C("ngModelChange", function (f) {
              return n.username.set(f);
            }),
            r()(),
            o(20, "div", 8)(21, "input", 11),
            C("ngModelChange", function (f) {
              return n.password.set(f);
            }),
            r(),
            v(22, mi, 1, 1, "input", 12),
            r(),
            v(23, di, 2, 1, "div", 8)(24, _i, 2, 1, "div", 8),
            o(25, "div", 8),
            v(26, ui, 2, 0, "button", 13)(27, hi, 2, 0, "button", 13),
            r(),
            v(28, fi, 7, 1, "div", 14),
            r(),
            l(29, "right"),
            r()),
            a & 2 &&
              (i(8),
              b(" ", n.authOpt() == "login" ? "Login" : "Register", " "),
              i(6),
              k("act", n.authOpt() == "login"),
              i(2),
              k("act", n.authOpt() == "register"),
              i(3),
              p("ngModel", n.username()),
              i(2),
              p("ngModel", n.password()),
              i(),
              _(n.authOpt() == "register" ? 22 : -1),
              i(),
              _(n.authOpt() == "register" ? 23 : -1),
              i(),
              _(n.authOpt() == "login" ? 24 : -1),
              i(2),
              _(n.authOpt() == "login" ? 26 : -1),
              i(),
              _(n.authOpt() == "register" ? 27 : -1),
              i(),
              _(n.response() ? 28 : -1));
        },
        dependencies: [H, z, O, $, ae, le, se, Z, R, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var Ci = (t, d) => d.id;
function xi(t, d) {
  if ((t & 1 && (l(0, "span", 38), u(1, "contentPipe")), t & 2)) {
    let e = s().$implicit;
    p("innerHTML", h(1, 1, e.bio, "preview"), G);
  }
}
function gi(t, d) {
  if ((t & 1 && (o(0, "span", 40), l(1, "icons", 43), m(2), r()), t & 2)) {
    let e = s().$implicit;
    T("data-title", "Currently in ", e.location, ""),
      i(),
      p("color", e.color),
      i(),
      b(" ", e.location, "");
  }
}
function vi(t, d) {
  if (
    (t & 1 &&
      (o(0, "span", 40),
      u(1, "numberPipe"),
      l(2, "icons", 44),
      m(3),
      u(4, "numberPipe"),
      r()),
    t & 2)
  ) {
    let e = s().$implicit;
    T("data-title", "", h(1, 4, e.views, "suffix"), " Views"),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(4, 7, e.views, "suffix"), "");
  }
}
function bi(t, d) {
  if (
    (t & 1 &&
      (o(0, "span", 40),
      u(1, "datePipe"),
      l(2, "icons", 45),
      m(3),
      u(4, "datePipe"),
      r()),
    t & 2)
  ) {
    let e = s().$implicit;
    T("data-title", "Last seen ", h(1, 4, e.seen, "long"), ""),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(4, 7, e.seen, "short"), "");
  }
}
function wi(t, d) {
  if ((t & 1 && (o(0, "span", 40), l(1, "icons", 46), m(2), r()), t & 2)) {
    let e = s().$implicit;
    T("data-title", "Member of #", e.group.tag, ""),
      i(),
      p("color", e.color),
      i(),
      b(" ", e.group.tag, "");
  }
}
function Si(t, d) {
  if ((t & 1 && (o(0, "span", 40), l(1, "display", 37), r()), t & 2)) {
    let e = s().$implicit;
    T("data-title", "Invited by @", e.inviter.username, ""),
      i(),
      p("user", e.inviter)("color", e.color);
  }
}
function yi(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 27),
      l(1, "avatar", 36)(2, "display", 37),
      v(3, xi, 2, 4, "span", 38),
      o(4, "div", 39)(5, "span", 40),
      u(6, "numberPipe"),
      l(7, "icons", 41),
      m(8),
      u(9, "numberPipe"),
      r(),
      v(10, gi, 3, 4, "span", 40)(11, vi, 5, 10, "span", 40),
      o(12, "span", 40),
      u(13, "datePipe"),
      l(14, "icons", 42),
      m(15),
      u(16, "datePipe"),
      r(),
      v(17, bi, 5, 10, "span", 40)(18, wi, 3, 4, "span", 40)(
        19,
        Si,
        2,
        4,
        "span",
        40
      ),
      r()()),
    t & 2)
  ) {
    let e = d.$implicit;
    i(),
      p("user", e),
      i(),
      p("user", e)("color", e.color),
      i(),
      _(e.bio ? 3 : -1),
      i(2),
      T("data-title", "User #", h(6, 17, e.uuid, "suffix"), ""),
      i(2),
      p("color", e.color),
      i(),
      b(" #", h(9, 20, e.uuid, "suffix"), ""),
      i(2),
      _(e.location ? 10 : -1),
      i(),
      _(e.views ? 11 : -1),
      i(),
      T("data-title", "Joined ", h(13, 23, e.timestamp, "long"), ""),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(16, 26, e.timestamp, "minimal"), ""),
      i(2),
      _(e.seen ? 17 : -1),
      i(),
      _(e.group ? 18 : -1),
      i(),
      _(e.inviter ? 19 : -1);
  }
}
function ki(t, d) {
  if ((t & 1 && W(0, yi, 20, 29, "div", 27, Ci), t & 2)) {
    let e = s(2);
    J(e.users());
  }
}
function Ti(t, d) {
  if (
    (t & 1 &&
      (l(0, "left", 1),
      o(1, "div", 2)(2, "div", 3),
      l(3, "icons", 4),
      m(4, " Premium "),
      l(5, "div", 5),
      o(6, "div", 6)(7, "button", 7),
      l(8, "icons", 8),
      r()()(),
      o(9, "div", 9)(10, "div", 10)(11, "div", 11),
      l(12, "avatar", 12),
      r(),
      o(13, "div", 13)(14, "span", 14),
      m(15, "@s"),
      r(),
      o(16, "span", 15)(17, "div", 16),
      Y(),
      o(18, "svg", 17),
      l(19, "path", 18),
      r()(),
      Ce(),
      o(20, "div", 19),
      Y(),
      o(21, "svg", 20),
      l(22, "path", 21),
      r()(),
      Ce(),
      o(23, "div", 22),
      Y(),
      o(24, "svg", 23),
      l(25, "path", 24),
      r()()(),
      Ce(),
      o(26, "div", 25),
      m(
        27,
        "Premium can be bought using the shop using rewards. The duration depends on the subscription period."
      ),
      r()()()(),
      o(28, "div", 26)(29, "div", 27)(30, "div", 28),
      l(31, "icons", 29),
      o(32, "span", 30),
      m(33, "Visuals"),
      r()(),
      o(34, "div", 31),
      m(35, "Exclusive badge, text effects and cosmetics to showcase"),
      r()(),
      o(36, "div", 27)(37, "div", 28),
      l(38, "icons", 32),
      o(39, "span", 30),
      m(40, "Limitless"),
      r()(),
      o(41, "div", 31),
      m(42, "Unlimited possibilities with increased limits everywhere"),
      r()(),
      o(43, "div", 27)(44, "div", 28),
      l(45, "icons", 33),
      o(46, "span", 30),
      m(47, "Storage"),
      r()(),
      o(48, "div", 31),
      m(49, "Increased individual file upload size and total file storage"),
      r()(),
      o(50, "div", 27)(51, "div", 28),
      l(52, "icons", 34),
      o(53, "span", 30),
      m(54, "Reputation"),
      r()(),
      o(55, "div", 31),
      m(56, "Hand out bigger reputation points to leave a greater impact"),
      r()()(),
      o(57, "div", 27)(58, "div", 28),
      l(59, "icons", 35),
      o(60, "span", 30),
      m(61, "Explore"),
      r()(),
      o(62, "div", 31),
      m(
        63,
        "Check out some of our latest premium users below and find out what they're talking about."
      ),
      r()(),
      v(64, ki, 2, 0),
      r(),
      l(65, "right", 1)),
    t & 2)
  ) {
    let e = s();
    p("user", e.me()),
      i(7),
      p("routerLink", e.me() && e.me().id ? "/home" : "/"),
      i(5),
      p("user", e.placeholder()),
      i(52),
      _(e.users().length > 0 ? 64 : -1),
      i(),
      p("user", e.me());
  }
}
var Ye = (() => {
  class t {
    constructor() {
      (this.me = S({})),
        (this.users = S([])),
        (this.placeholder = S({})),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U)),
        (this.meta = y(pe));
    }
    ngOnInit() {
      this.placeholder.set(this.client.config("placeholder")),
        this.title.setTitle("Premium"),
        this.meta.addTags([
          { name: "title", content: "Premium" },
          { name: "og:title", content: "Premium" },
          { name: "twitter:title", content: "Premium" },
          {
            name: "description",
            content: "Explore premium and the perks it has to offer.",
          },
          {
            name: "og:description",
            content: "Explore premium and the perks it has to offer.",
          },
          { name: "theme-color", content: "#000000" },
          {
            name: "og:image",
            content: this.client.config("static") + "/images/avatar.png",
          },
          { name: "twitter:card", content: "summary" },
          { name: "og:type", content: "website" },
        ]),
        this.getUsers();
    }
    getUsers() {
      let e = { option: "premium" };
      this.http
        .post(
          this.client.config("api") + "/view/latest",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" && (this.me.set(a.me), this.users.set(a.users));
          },
          error: (a) => {},
        });
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["premium"]],
        decls: 3,
        vars: 2,
        consts: [
          [1, "app"],
          [3, "user"],
          [1, "pg"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [2, "margin-left", "auto"],
          ["data-title", "Go back", 3, "routerLink"],
          [
            "icon",
            "doubleleft",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "bn", 2, "border-radius", "var(--b-c)"],
          [
            2,
            "display",
            "flex",
            "flex-direction",
            "row",
            "align-items",
            "center",
          ],
          [2, "align-self", "start", "position", "relative"],
          ["size", "large", 3, "user"],
          [2, "text-align", "left", "margin-left", "15px"],
          ["routerLink", "/s", 1, "un", "glw", 2, "--x", "var(--c-c)"],
          [2, "display", "inline-flex", "margin-left", "3px"],
          ["data-title", "Admin", 1, "bdgc"],
          [
            "height",
            "16",
            "width",
            "16",
            "fill",
            "var(--x)",
            "version",
            "1.2",
            "xmlns",
            "http://www.w3.org/2000/svg",
            "viewBox",
            "0 0 256 240.5",
            0,
            "xml",
            "space",
            "preserve",
            1,
            "bdg",
            "glw",
            2,
            "--x",
            "var(--c-c)",
          ],
          [
            "d",
            "M41 196h174v31H41v-31zM236 59a20 20 0 0 0-18 29l-42 21-38-64a20 20 0 1 0-20 0l-38 64-41-21c2-2 2-5 2-9a20 20 0 1 0-16 20l15 77h176l16-77a20 20 0 0 0 24-20c0-11-9-20-20-20z",
          ],
          ["data-title", "Premium", 1, "bdgc"],
          [
            "width",
            "16",
            "height",
            "16",
            "fill",
            "var(--x)",
            "viewBox",
            "0 -5.5 56.3 56.3",
            "xmlns",
            "http://www.w3.org/2000/svg",
            1,
            "bdg",
            "glw",
            2,
            "--x",
            "var(--c-c)",
          ],
          [
            "d",
            "m24 1 2-1H13L0 15h13Zm-8 14h24l-6-8-6-6-8 9ZM0 17l24 25-11-25Zm41 0H15l13 28 12-26Zm-9 25 24-25H44Zm24-27L43 0H31l12 15Z",
          ],
          ["data-title", "Private", 1, "bdgc"],
          [
            "width",
            "16",
            "height",
            "16",
            "fill",
            "var(--x)",
            "xmlns",
            "http://www.w3.org/2000/svg",
            "viewBox",
            "-2 0 24 24",
            1,
            "bdg",
            "glw",
            2,
            "--x",
            "var(--c-c)",
          ],
          [
            "d",
            "M3.5 6.5V10H2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2h-1.5V6.5a6.5 6.5 0 1 0-13 0M6 10V6.5a4 4 0 0 1 8 0V10zm2 5.5a2 2 0 1 1 3.1 1.68h-.02l.42 2.57c0 .42-.34.75-.75.75h-1.5a.75.75 0 0 1-.75-.75l.41-2.57A2 2 0 0 1 8 15.5",
          ],
          [1, "bi", 2, "margin", "8px 0 0 0"],
          [1, "gr", 2, "--x", "175px"],
          [1, "cn"],
          [1, "hl"],
          [
            "icon",
            "brush",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-left", "5px"],
          [1, "cnt"],
          [
            "icon",
            "uparrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "file",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "reputation",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "topright",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["size", "small", 3, "user"],
          [3, "user", "color"],
          [
            1,
            "bi",
            2,
            "margin-left",
            "5px",
            "vertical-align",
            "middle",
            "white-space",
            "nowrap",
            3,
            "innerHTML",
          ],
          [1, "ints", 2, "margin-top", "10px"],
          [1, "bx", 2, "margin", "8px 4px 0 0"],
          ["icon", "user", "width", "11", "height", "11", 3, "color"],
          ["icon", "calendar", "width", "11", "height", "11", 3, "color"],
          ["icon", "location", "width", "11", "height", "11", 3, "color"],
          ["icon", "views", "width", "11", "height", "11", 3, "color"],
          ["icon", "seen", "width", "11", "height", "11", 3, "color"],
          ["icon", "hashtag", "width", "11", "height", "11", 3, "color"],
        ],
        template: function (a, n) {
          a & 1 && (o(0, "div", 0), l(1, "navbar", 1), v(2, Ti, 66, 5), r()),
            a & 2 &&
              (i(), p("user", n.me()), i(), _(n.users().length > 0 ? 2 : -1));
        },
        dependencies: [K, ee, Q, H, z, O, $, Z, R, ie, X, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var Pi = (t, d) => d.id,
  Ei = () => [import("./chunk-IGKAPWAB.js").then((t) => t.ComposeComponent)],
  Vi = () => [import("./chunk-LBQ2VAXP.js").then((t) => t.LoaderComponent)],
  Mi = () => [import("./chunk-RHH4XAVI.js").then((t) => t.MediaComponent)],
  Qe = (t) => ["/post", t];
function Ii(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 6)(1, "input", 8),
      C("keydown.enter", function () {
        x(e);
        let n = s(2);
        return g(n.getSearch());
      })("ngModelChange", function (n) {
        x(e);
        let c = s(2);
        return g(c.search.set(n));
      }),
      r(),
      o(2, "button", 9),
      C("click", function () {
        x(e);
        let n = s(2);
        return g(n.getSearch());
      }),
      l(3, "icons", 10),
      r()();
  }
  if (t & 2) {
    let e = s(2);
    i(), p("ngModel", e.search());
  }
}
function Fi(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "compose", 11),
      C("onComposed", function (n) {
        x(e);
        let c = s(2);
        return g(c.composed(n));
      }),
      r();
  }
}
function Bi(t, d) {
  if ((t & 1 && (o(0, "span", 15), m(1), u(2, "numberPipe"), r()), t & 2)) {
    let e = s().$implicit;
    i(), E(h(2, 1, e.views, "suffix"));
  }
}
function Li(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 16),
      l(1, "icons", 30),
      o(2, "span", 31)(3, "button", 32),
      m(4, "Repost from "),
      l(5, "display", 18),
      r()()()),
    t & 2)
  ) {
    let e = s().$implicit;
    i(3),
      p("routerLink", P(3, Qe, e.id)),
      i(2),
      p("user", e.reposter)("color", e.reposter.color);
  }
}
function Di(t, d) {
  if ((t & 1 && l(0, "media", 33), t & 2)) {
    let e = s().$implicit;
    p("attachment", e.attachment);
  }
}
function Oi(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 22),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.pinPost(n.id));
      }),
      l(1, "icons", 34),
      r();
  }
  if (t & 2) {
    let e = s().$implicit;
    i(), p("color", e.pinned ? "var(--c-e)" : "var(--c-c)");
  }
}
function Hi(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 22),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.hidePost(n.id));
      }),
      l(1, "icons", 35),
      r();
  }
  if (t & 2) {
    let e = s().$implicit;
    i(), p("color", e.hidden ? "var(--c-e)" : "var(--c-c)");
  }
}
function $i(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 22),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.deletePost(n.id));
      }),
      l(1, "icons", 36),
      r();
  }
}
function Gi(t, d) {
  if ((t & 1 && (l(0, "div", 29), u(1, "contentPipe")), t & 2)) {
    let e = s().$implicit;
    p("innerHTML", h(1, 1, e.signature, "full"), G);
  }
}
function Ri(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 12)(1, "span", 13),
      l(2, "icons", 14),
      v(3, Bi, 3, 4, "span", 15),
      r(),
      v(4, Li, 6, 5, "div", 16),
      l(5, "avatar", 17)(6, "display", 18),
      o(7, "span", 19),
      m(8),
      u(9, "datePipe"),
      r(),
      l(10, "div", 20),
      u(11, "contentPipe"),
      v(12, Di, 1, 1),
      I(13, 12, Mi),
      F(),
      o(15, "div", 21)(16, "button", 22),
      C("click", function () {
        let n = x(e).$implicit,
          c = s(3);
        return g(c.likePost(n.id));
      }),
      l(17, "icons", 23),
      m(18),
      u(19, "numberPipe"),
      r(),
      o(20, "button", 22),
      C("click", function () {
        let n = x(e).$implicit,
          c = s(3);
        return g(c.repost(n.id));
      }),
      l(21, "icons", 24),
      m(22),
      u(23, "numberPipe"),
      r(),
      o(24, "button", 25),
      l(25, "icons", 26),
      m(26),
      u(27, "numberPipe"),
      r(),
      o(28, "button", 22),
      C("click", function () {
        let n = x(e).$implicit,
          c = s(3);
        return g(c.bookmarkPost(n.id));
      }),
      l(29, "icons", 27),
      m(30),
      u(31, "numberPipe"),
      r(),
      v(32, Oi, 2, 1, "button", 28)(33, Hi, 2, 1, "button", 28)(
        34,
        $i,
        2,
        0,
        "button",
        28
      )(35, Gi, 2, 4, "div", 29),
      r()();
  }
  if (t & 2) {
    let e = d.$implicit,
      a = s(3);
    i(2),
      p("icon", e.views ? "views" : "hide"),
      i(),
      _(e.views ? 3 : -1),
      i(),
      _(e.repost && e.reposter ? 4 : -1),
      i(),
      p("user", e),
      i(),
      p("user", e)("color", e.color),
      i(2),
      b("\u2022 ", h(9, 21, e.timestamp, "short"), ""),
      i(2),
      p("innerHTML", h(11, 24, e.content, "full"), G),
      i(7),
      p("color", e.liked ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(19, 27, e.likes, "suffix"), ""),
      i(3),
      p("color", e.reposted ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(23, 30, e.reposts, "suffix"), ""),
      i(2),
      p("routerLink", P(39, Qe, e.id)),
      i(),
      p("color", e.replied ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(27, 33, e.replies, "suffix"), ""),
      i(3),
      p("color", e.bookmarked ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(31, 36, e.bookmarks, "suffix"), ""),
      i(2),
      _(a.me() && a.me().id == e.user_id ? 32 : -1),
      i(),
      _(a.me() && a.me().id == e.user_id ? 33 : -1),
      i(),
      _(a.me() && a.me().id == e.user_id ? 34 : -1),
      i(),
      _(e.signature ? 35 : -1);
  }
}
function Ni(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "loader", 37),
      C("onScrolled", function () {
        x(e);
        let n = s(3);
        return g(n.getPosts());
      }),
      r();
  }
}
function Ai(t, d) {
  if (
    (t & 1 &&
      (W(0, Ri, 36, 41, "div", 12, Pi), v(2, Ni, 1, 0), I(3, 2, Vi), F()),
    t & 2)
  ) {
    let e = s(2);
    J(e.posts());
  }
}
function zi(t, d) {
  if (t & 1) {
    let e = w();
    l(0, "left", 1),
      o(1, "div", 2)(2, "div", 3),
      l(3, "icons", 4),
      m(4, " Home "),
      l(5, "icons", 4),
      m(6),
      l(7, "div", 5),
      r(),
      o(8, "div", 6)(9, "button", 7),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updatePostOpt("feed"));
      }),
      m(10, "Feed"),
      r(),
      o(11, "button", 7),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updatePostOpt("following"));
      }),
      m(12, "Following"),
      r(),
      o(13, "button", 7),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updatePostOpt("search"));
      }),
      m(14, "Search"),
      r()(),
      v(15, Ii, 4, 1, "div", 6)(16, Fi, 1, 0),
      I(17, 16, Ei),
      F(),
      v(19, Ai, 5, 0),
      r(),
      l(20, "right", 1);
  }
  if (t & 2) {
    let e = s();
    p("user", e.me()),
      i(6),
      b(
        " ",
        e.postOpt() == "feed"
          ? "Feed"
          : e.postOpt() == "following"
          ? "Following"
          : "Search",
        " "
      ),
      i(3),
      k("act", e.postOpt() == "feed"),
      i(2),
      k("act", e.postOpt() == "following"),
      i(2),
      k("act", e.postOpt() == "search"),
      i(2),
      _(e.postOpt() == "search" ? 15 : -1),
      i(4),
      _(e.posts().length > 0 ? 19 : -1),
      i(),
      p("user", e.me());
  }
}
var Xe = (() => {
  class t {
    constructor() {
      (this.me = S({})),
        (this.posts = S([])),
        (this.postOpt = S("feed")),
        (this.search = S("")),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U));
    }
    ngOnInit() {
      this.title.setTitle("Home"), this.getPosts();
    }
    composed(e) {
      this.posts.set([]),
        this.postOpt.set("feed"),
        this.search.set(""),
        this.getPosts();
    }
    getPosts() {
      let e = {
        cursor: this.posts().length > 0 ? this.posts().at(-1).timestamp : null,
        option: this.postOpt(),
        search: this.search(),
      };
      this.http
        .post(
          this.client.config("api") + "/view/feed",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (this.me.set(a.me),
              this.posts().length > 0
                ? this.posts.update((n) =>
                    [...n, ...a.posts].filter(
                      (c, f, V) =>
                        f ===
                        V.findIndex(
                          (L) => L.id === c.id && L.timestamp === c.timestamp
                        )
                    )
                  )
                : this.posts.set(a.posts));
          },
          error: (a) => {},
        });
    }
    likePost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/like",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.posts().length > 0 &&
                this.posts.update((c) =>
                  c.map((f) =>
                    f.id == e
                      ? B(M({}, f), {
                          liked: !f.liked,
                          likes: n.add ? f.likes + 1 : f.likes - 1,
                        })
                      : f
                  )
                ));
          },
          error: (n) => {},
        });
    }
    hidePost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/hide",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.posts().length > 0 &&
                this.posts.update((c) =>
                  c.map((f) =>
                    f.id == e ? B(M({}, f), { hidden: !f.hidden }) : M({}, f)
                  )
                ));
          },
          error: (n) => {},
        });
    }
    repost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/repost",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.posts().length > 0 &&
                this.posts.update((c) =>
                  c.map((f) =>
                    f.id == e
                      ? B(M({}, f), {
                          reposted: !f.reposted,
                          reposts: n.add ? f.reposts + 1 : f.reposts - 1,
                        })
                      : f
                  )
                ));
          },
          error: (n) => {},
        });
    }
    pinPost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/pin",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.posts().length > 0 &&
                this.posts.update((c) =>
                  c.map((f) =>
                    f.id == e
                      ? B(M({}, f), { pinned: !f.pinned })
                      : B(M({}, f), { pinned: !1 })
                  )
                ));
          },
          error: (n) => {},
        });
    }
    bookmarkPost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/bookmark",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.posts().length > 0 &&
                this.posts.update((c) =>
                  c.map((f) =>
                    f.id == e
                      ? B(M({}, f), {
                          bookmarked: !f.bookmarked,
                          bookmarks: n.add ? f.bookmarks + 1 : f.bookmarks - 1,
                        })
                      : f
                  )
                ));
          },
          error: (n) => {},
        });
    }
    deletePost(e) {
      if (
        confirm(
          "This will delete the current post. This action is irreversible. Would you like to continue?"
        )
      ) {
        let n = { id: e };
        this.http
          .post(
            this.client.config("api") + "/delete/post",
            n,
            this.client.headers()
          )
          .subscribe({
            next: (c) => {
              c.type == "success" &&
                (this.me.set(c.me),
                this.posts().length > 0 &&
                  this.posts.update((f) => f.filter((V) => V.id != e)));
            },
            error: (c) => {},
          });
      }
    }
    updatePostOpt(e) {
      this.postOpt() != e &&
        (this.posts.set([]),
        this.postOpt.set(e),
        this.search.set(""),
        this.getPosts());
    }
    getSearch() {
      this.posts.set([]), this.getPosts();
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["home"]],
        decls: 3,
        vars: 2,
        consts: [
          [1, "app"],
          [3, "user"],
          [1, "pg"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [1, "rw"],
          [2, "width", "100%", 3, "click"],
          [
            "type",
            "text",
            "placeholder",
            "Keywords...",
            3,
            "keydown.enter",
            "ngModelChange",
            "ngModel",
          ],
          [2, "width", "auto", 3, "click"],
          [
            "icon",
            "search",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["type", "post", "size", "large", 3, "onComposed"],
          [1, "cn"],
          [1, "tr"],
          ["width", "11", "height", "11", "color", "var(--c-c)", 3, "icon"],
          [2, "margin-left", "3px"],
          [1, "hl"],
          ["size", "small", 3, "user"],
          [3, "user", "color"],
          [1, "dt"],
          [1, "cnt", 3, "innerHTML"],
          [1, "ints"],
          [1, "int", 3, "click"],
          ["icon", "like", "width", "11", "height", "11", 3, "color"],
          ["icon", "repost", "width", "11", "height", "11", 3, "color"],
          [1, "int", 3, "routerLink"],
          ["icon", "reply", "width", "11", "height", "11", 3, "color"],
          ["icon", "bookmark", "width", "11", "height", "11", 3, "color"],
          [1, "int"],
          [1, "sig", 3, "innerHTML"],
          [
            "icon",
            "topright",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-left", "5px"],
          [1, "lnk", 3, "routerLink"],
          [3, "attachment"],
          ["icon", "pin", "width", "11", "height", "11", 3, "color"],
          ["icon", "hide", "width", "11", "height", "11", 3, "color"],
          [
            "icon",
            "cross",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [3, "onScrolled"],
        ],
        template: function (a, n) {
          a & 1 && (o(0, "div", 0), l(1, "navbar", 1), v(2, zi, 21, 11), r()),
            a & 2 &&
              (i(), p("user", n.me()), i(), _(n.me() && n.me().id ? 2 : -1));
        },
        dependencies: [K, ee, Q, H, z, O, $, ae, le, se, ie, Z, R, X, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var Ui = (t, d) => d.id,
  Zi = () => [import("./chunk-LBQ2VAXP.js").then((t) => t.LoaderComponent)],
  qi = () => [import("./chunk-RHH4XAVI.js").then((t) => t.MediaComponent)],
  et = (t) => ["/post", t];
function ji(t, d) {
  if ((t & 1 && (o(0, "span", 12), m(1), u(2, "numberPipe"), r()), t & 2)) {
    let e = s().$implicit;
    i(), E(h(2, 1, e.views, "suffix"));
  }
}
function Wi(t, d) {
  if ((t & 1 && l(0, "media", 29), t & 2)) {
    let e = s().$implicit;
    p("attachment", e.attachment);
  }
}
function Ji(t, d) {
  if ((t & 1 && (l(0, "div", 28), u(1, "contentPipe")), t & 2)) {
    let e = s().$implicit;
    p("innerHTML", h(1, 1, e.signature, "full"), G);
  }
}
function Ki(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 9)(1, "span", 10),
      l(2, "icons", 11),
      v(3, ji, 3, 4, "span", 12),
      r(),
      o(4, "div", 13),
      l(5, "icons", 14),
      o(6, "span", 15)(7, "button", 16),
      m(8, "Bookmarked this"),
      r()()(),
      l(9, "avatar", 17)(10, "display", 18),
      o(11, "span", 19),
      m(12),
      u(13, "datePipe"),
      r(),
      l(14, "div", 20),
      u(15, "contentPipe"),
      v(16, Wi, 1, 1),
      I(17, 16, qi),
      F(),
      o(19, "div", 21)(20, "button", 22),
      C("click", function () {
        let n = x(e).$implicit,
          c = s(3);
        return g(c.likePost(n.id));
      }),
      l(21, "icons", 23),
      m(22),
      u(23, "numberPipe"),
      r(),
      o(24, "button", 22),
      C("click", function () {
        let n = x(e).$implicit,
          c = s(3);
        return g(c.repost(n.id));
      }),
      l(25, "icons", 24),
      m(26),
      u(27, "numberPipe"),
      r(),
      o(28, "button", 25),
      l(29, "icons", 26),
      m(30),
      u(31, "numberPipe"),
      r(),
      o(32, "button", 22),
      C("click", function () {
        let n = x(e).$implicit,
          c = s(3);
        return g(c.bookmarkPost(n.id));
      }),
      l(33, "icons", 27),
      m(34),
      u(35, "numberPipe"),
      r(),
      v(36, Ji, 2, 4, "div", 28),
      r()();
  }
  if (t & 2) {
    let e = d.$implicit;
    i(2),
      p("icon", e.views ? "views" : "hide"),
      i(),
      _(e.views ? 3 : -1),
      i(4),
      p("routerLink", P(36, et, e.id)),
      i(2),
      p("user", e),
      i(),
      p("user", e)("color", e.color),
      i(2),
      b("\u2022 ", h(13, 18, e.timestamp, "short"), ""),
      i(2),
      p("innerHTML", h(15, 21, e.content, "full"), G),
      i(7),
      p("color", e.liked ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(23, 24, e.likes, "suffix"), ""),
      i(3),
      p("color", e.reposted ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(27, 27, e.reposts, "suffix"), ""),
      i(2),
      p("routerLink", P(38, et, e.id)),
      i(),
      p("color", e.replied ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(31, 30, e.replies, "suffix"), ""),
      i(3),
      p("color", e.bookmarked ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(35, 33, e.bookmarks, "suffix"), ""),
      i(2),
      _(e.signature ? 36 : -1);
  }
}
function Yi(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "loader", 30),
      C("onScrolled", function () {
        x(e);
        let n = s(3);
        return g(n.getBookmarks());
      }),
      r();
  }
}
function Qi(t, d) {
  if (
    (t & 1 &&
      (W(0, Ki, 37, 40, "div", 9, Ui), v(2, Yi, 1, 0), I(3, 2, Zi), F()),
    t & 2)
  ) {
    let e = s(2);
    J(e.bookmarks());
  }
}
function Xi(t, d) {
  if (
    (t & 1 &&
      (l(0, "left", 1),
      o(1, "div", 2)(2, "div", 3),
      l(3, "icons", 4),
      m(4),
      u(5, "numberPipe"),
      l(6, "div", 5),
      o(7, "div", 6)(8, "button", 7),
      l(9, "icons", 8),
      r()()(),
      v(10, Qi, 5, 0),
      r(),
      l(11, "right", 1)),
    t & 2)
  ) {
    let e = s();
    p("user", e.me()),
      i(4),
      b(" ", h(5, 4, e.amount(), "suffix"), " Bookmarks "),
      i(6),
      _(e.bookmarks().length > 0 ? 10 : -1),
      i(),
      p("user", e.me());
  }
}
var tt = (() => {
  class t {
    constructor() {
      (this.me = S({})),
        (this.bookmarks = S([])),
        (this.amount = S(0)),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U));
    }
    ngOnInit() {
      this.title.setTitle("Bookmarks"), this.getBookmarks();
    }
    getBookmarks() {
      let e = {
        cursor:
          this.bookmarks().length > 0
            ? this.bookmarks().at(-1).timestamp
            : null,
      };
      this.http
        .post(
          this.client.config("api") + "/view/bookmarks",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (this.me.set(a.me),
              this.bookmarks().length > 0
                ? this.bookmarks.update((n) =>
                    [...n, ...a.bookmarks].filter(
                      (c, f, V) =>
                        f ===
                        V.findIndex(
                          (L) => L.id === c.id && L.timestamp === c.timestamp
                        )
                    )
                  )
                : this.bookmarks.set(a.bookmarks),
              this.amount.set(a.amount));
          },
          error: (a) => {},
        });
    }
    bookmarkPost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/bookmark",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.bookmarks().length > 0 &&
                this.bookmarks.update((c) =>
                  c.map((f) =>
                    f.id == e
                      ? B(M({}, f), {
                          bookmarked: !f.bookmarked,
                          bookmarks: n.add ? f.bookmarks + 1 : f.bookmarks - 1,
                        })
                      : f
                  )
                ),
              this.amount.update((c) => (n.add ? c + 1 : c - 1)));
          },
          error: (n) => {},
        });
    }
    likePost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/like",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.bookmarks().length > 0 &&
                this.bookmarks.update((c) =>
                  c.map((f) =>
                    f.id == e
                      ? B(M({}, f), {
                          liked: !f.liked,
                          likes: n.add ? f.likes + 1 : f.likes - 1,
                        })
                      : f
                  )
                ));
          },
          error: (n) => {},
        });
    }
    repost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/repost",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.bookmarks().length > 0 &&
                this.bookmarks.update((c) =>
                  c.map((f) =>
                    f.id == e
                      ? B(M({}, f), {
                          reposted: !f.reposted,
                          reposts: n.add ? f.reposts + 1 : f.reposts - 1,
                        })
                      : f
                  )
                ));
          },
          error: (n) => {},
        });
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["bookmarks"]],
        decls: 3,
        vars: 2,
        consts: [
          [1, "app"],
          [3, "user"],
          [1, "pg"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [2, "margin-left", "auto"],
          ["data-title", "Go back", "routerLink", "/home"],
          [
            "icon",
            "doubleleft",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "cn"],
          [1, "tr"],
          ["width", "11", "height", "11", "color", "var(--c-c)", 3, "icon"],
          [2, "margin-left", "3px"],
          [1, "hl"],
          [
            "icon",
            "topright",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-left", "5px"],
          [1, "lnk", 3, "routerLink"],
          ["size", "small", 3, "user"],
          [3, "user", "color"],
          [1, "dt"],
          [1, "cnt", 3, "innerHTML"],
          [1, "ints"],
          [1, "int", 3, "click"],
          ["icon", "like", "width", "11", "height", "11", 3, "color"],
          ["icon", "repost", "width", "11", "height", "11", 3, "color"],
          [1, "int", 3, "routerLink"],
          ["icon", "reply", "width", "11", "height", "11", 3, "color"],
          ["icon", "bookmark", "width", "11", "height", "11", 3, "color"],
          [1, "sig", 3, "innerHTML"],
          [3, "attachment"],
          [3, "onScrolled"],
        ],
        template: function (a, n) {
          a & 1 && (o(0, "div", 0), l(1, "navbar", 1), v(2, Xi, 12, 7), r()),
            a & 2 &&
              (i(), p("user", n.me()), i(), _(n.me() && n.me().id ? 2 : -1));
        },
        dependencies: [K, ee, Q, H, z, O, $, ie, Z, R, X, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var en = (t, d) => d.value,
  tn = () => [import("./chunk-QHDGOEVR.js").then((t) => t.UploadComponent)],
  Se = (t) => ({ "--x": t });
function nn(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 24)(1, "input", 27),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(3);
        return g(c.value.set(n));
      }),
      r()();
  }
  if (t & 2) {
    let e = s(3);
    i(), fe("placeholder", e.currentSetting().hint), p("ngModel", e.value());
  }
}
function on(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 25),
      C("click", function () {
        x(e);
        let n = s(4);
        return g(n.generateAuthenticator());
      }),
      m(1, "Generate secret"),
      r();
  }
}
function rn(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "input", 27),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(4);
        return g(c.value.set(n));
      }),
      r();
  }
  if (t & 2) {
    let e = s(4);
    fe("placeholder", e.currentSetting().hint), p("ngModel", e.value());
  }
}
function an(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 24),
      v(1, on, 2, 0, "button", 28)(2, rn, 1, 2, "input", 29),
      r()),
    t & 2)
  ) {
    let e = s(3);
    i(), _(e.value() ? -1 : 1), i(), _(e.value() ? 2 : -1);
  }
}
function ln(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 24)(1, "textarea", 30),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(3);
        return g(c.value.set(n));
      }),
      m(2),
      r()();
  }
  if (t & 2) {
    let e = s(3);
    i(),
      fe("placeholder", e.currentSetting().hint),
      p("ngModel", e.value()),
      i(),
      E(e.value());
  }
}
function sn(t, d) {
  if ((t & 1 && (o(0, "option", 33), m(1), r()), t & 2)) {
    let e = d.$implicit;
    p("value", e.value), i(), E(e.value);
  }
}
function cn(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 24)(1, "select", 31),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(4);
        return g(c.value.set(n));
      }),
      o(2, "option", 32),
      m(3, "none"),
      r(),
      W(4, sn, 2, 2, "option", 33, en),
      r()();
  }
  if (t & 2) {
    let e = s(4);
    i(), p("ngModel", e.value()), i(3), J(e.cosmetics());
  }
}
function pn(t, d) {
  if ((t & 1 && v(0, cn, 6, 1, "div", 24), t & 2)) {
    let e = s(3);
    _(e.cosmetics().length > 0 ? 0 : -1);
  }
}
function mn(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 24)(1, "select", 31),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(3);
        return g(c.value.set(n));
      }),
      o(2, "option", 34),
      m(3, "Public"),
      r(),
      o(4, "option", 35),
      m(5, "Friends only"),
      r(),
      o(6, "option", 36),
      m(7, "Only me"),
      r()()();
  }
  if (t & 2) {
    let e = s(3);
    i(), p("ngModel", e.value());
  }
}
function dn(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 24)(1, "select", 31),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(3);
        return g(c.value.set(n));
      }),
      o(2, "option", 34),
      m(3, "Public"),
      r(),
      o(4, "option", 35),
      m(5, "Hidden"),
      r()()();
  }
  if (t & 2) {
    let e = s(3);
    i(), p("ngModel", e.value());
  }
}
function _n(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 24)(1, "input", 37),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(3);
        return g(c.value.set(n));
      }),
      r()();
  }
  if (t & 2) {
    let e = s(3);
    i(), p("ngModel", e.value());
  }
}
function un(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "upload", 38),
      C("onUploaded", function (n) {
        x(e);
        let c = s(4);
        return g(c.uploaded(n));
      }),
      r();
  }
}
function hn(t, d) {
  t & 1 && (v(0, un, 1, 0), I(1, 0, tn), F());
}
function fn(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 24)(1, "input", 39),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(3);
        return g(c.currentCode.set(n));
      }),
      r()();
  }
  if (t & 2) {
    let e = s(3);
    i(), p("ngModel", e.currentCode());
  }
}
function Cn(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 24)(1, "input", 40),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(3);
        return g(c.currentPassword.set(n));
      }),
      r()();
  }
  if (t & 2) {
    let e = s(3);
    i(), p("ngModel", e.currentPassword());
  }
}
function xn(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 26)(1, "div", 41),
      l(2, "icons", 42),
      o(3, "span", 43),
      m(4, "Information"),
      r()(),
      o(5, "div", 44),
      m(6),
      r()()),
    t & 2)
  ) {
    let e = s(3);
    i(6), E(e.response());
  }
}
function gn(t, d) {
  if (t & 1) {
    let e = w();
    v(0, nn, 2, 2, "div", 24)(1, an, 3, 2, "div", 24)(2, ln, 3, 3, "div", 24)(
      3,
      pn,
      1,
      1
    )(4, mn, 8, 1, "div", 24)(5, dn, 6, 1, "div", 24)(
      6,
      _n,
      2,
      1,
      "div",
      24
    )(7, hn, 3, 0)(8, fn, 2, 1, "div", 24)(9, Cn, 2, 1, "div", 24),
      o(10, "div", 24)(11, "button", 25),
      C("click", function () {
        x(e);
        let n = s(2);
        return g(n.updateSetting());
      }),
      m(12, "Update"),
      r()(),
      v(13, xn, 7, 1, "div", 26);
  }
  if (t & 2) {
    let e = s(2);
    _(
      !e.currentSetting().uploadable &&
        e.currentSetting().name != "color" &&
        e.currentSetting().name != "bio" &&
        e.currentSetting().name != "signature" &&
        e.currentSetting().name != "cosmetic" &&
        e.currentSetting().name != "privacy" &&
        e.currentSetting().name != "analytics" &&
        e.currentSetting().name != "authenticator"
        ? 0
        : -1
    ),
      i(),
      _(e.currentSetting().name == "authenticator" ? 1 : -1),
      i(),
      _(
        e.currentSetting().name == "bio" ||
          e.currentSetting().name == "signature"
          ? 2
          : -1
      ),
      i(),
      _(e.currentSetting().name == "cosmetic" ? 3 : -1),
      i(),
      _(e.currentSetting().name == "privacy" ? 4 : -1),
      i(),
      _(e.currentSetting().name == "analytics" ? 5 : -1),
      i(),
      _(e.currentSetting().name == "color" ? 6 : -1),
      i(),
      _(e.currentSetting().uploadable ? 7 : -1),
      i(),
      _(e.currentSetting().verifyCode ? 8 : -1),
      i(),
      _(e.currentSetting().verifyPassword ? 9 : -1),
      i(4),
      _(e.response() ? 13 : -1);
  }
}
function vn(t, d) {
  if ((t & 1 && (o(0, "span", 18), m(1), r()), t & 2)) {
    let e = s(2);
    k("glw", e.me().premium),
      p(
        "ngStyle",
        P(
          4,
          Se,
          e.currentSetting().name == "color" && e.value()
            ? e.value()
            : e.me().color
        )
      ),
      i(),
      b(
        "(",
        e.currentSetting().name == "name" && e.value()
          ? e.value()
          : e.me().name
          ? e.me().name
          : "",
        ")"
      );
  }
}
function bn(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 21),
      u(1, "datePipe"),
      Y(),
      o(2, "svg", 45),
      l(3, "path", 46),
      r()()),
    t & 2)
  ) {
    let e = s(2);
    T("data-title", "Admin (Expires ", h(1, 5, e.me().admin, "long"), ")"),
      i(2),
      k("glw", e.me().premium),
      p(
        "ngStyle",
        P(
          8,
          Se,
          e.currentSetting().name == "color" && e.value()
            ? e.value()
            : e.me().color
        )
      );
  }
}
function wn(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 21),
      u(1, "datePipe"),
      Y(),
      o(2, "svg", 47),
      l(3, "path", 48),
      r()()),
    t & 2)
  ) {
    let e = s(2);
    T("data-title", "Premium (Expires ", h(1, 5, e.me().premium, "long"), ")"),
      i(2),
      k("glw", e.me().premium),
      p(
        "ngStyle",
        P(
          8,
          Se,
          e.currentSetting().name == "color" && e.value()
            ? e.value()
            : e.me().color
        )
      );
  }
}
function Sn(t, d) {
  if (
    (t & 1 && (o(0, "div", 22), Y(), o(1, "svg", 49), l(2, "path", 50), r()()),
    t & 2)
  ) {
    let e = s(2);
    i(),
      k("glw", e.me().premium),
      p(
        "ngStyle",
        P(
          3,
          Se,
          e.currentSetting().name == "color" && e.value()
            ? e.value()
            : e.me().color
        )
      );
  }
}
function yn(t, d) {
  if ((t & 1 && (l(0, "div", 23), u(1, "contentPipe")), t & 2)) {
    let e = s(2);
    p(
      "innerHTML",
      h(
        1,
        1,
        e.currentSetting().name == "bio" && e.value()
          ? e.value()
          : e.me().bio
          ? e.me().bio
          : "",
        "full"
      ),
      G
    );
  }
}
function kn(t, d) {
  if (t & 1) {
    let e = w();
    l(0, "left", 1),
      o(1, "div", 2)(2, "div", 3),
      l(3, "icons", 4),
      m(4, " Settings "),
      l(5, "icons", 4),
      m(6),
      l(7, "div", 5),
      o(8, "div", 6)(9, "button", 7),
      l(10, "icons", 8),
      r(),
      o(11, "button", 9),
      l(12, "icons", 10),
      r()()(),
      o(13, "div", 11)(14, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(
          n.setSetting("username", "Username", !0, !1, !1, "New username")
        );
      }),
      m(15, "Username"),
      r(),
      o(16, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("alias", "Alias", !0, !1, !1, "New alias"));
      }),
      m(17, "Alias"),
      r(),
      o(18, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(
          n.setSetting("password", "Password", !0, !1, !1, "New password")
        );
      }),
      m(19, "Password"),
      r(),
      o(20, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(
          n.setSetting(
            "authenticator",
            "Authenticator",
            !0,
            !0,
            !1,
            "Authenticator secret"
          )
        );
      }),
      m(21, "2FA"),
      r(),
      o(22, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("name", "Name", !1, !1, !1, "New name"));
      }),
      m(23, "Name"),
      r(),
      o(24, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("avatar", "Avatar", !1, !1, !0, ""));
      }),
      m(25, "Avatar"),
      r(),
      o(26, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("banner", "Banner", !1, !1, !0, ""));
      }),
      m(27, "Banner"),
      r(),
      o(28, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("background", "Background", !1, !1, !0, ""));
      }),
      m(29, "Background"),
      r(),
      o(30, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("bio", "Bio", !1, !1, !1, "New profile bio"));
      }),
      m(31, "Bio"),
      r(),
      o(32, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(
          n.setSetting(
            "signature",
            "Signature",
            !1,
            !1,
            !1,
            "New profile signature"
          )
        );
      }),
      m(33, "Signature"),
      r(),
      o(34, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("group", "Group", !1, !1, !1, "Group vanity"));
      }),
      m(35, "Group"),
      r(),
      o(36, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(
          n.setSetting("location", "Location", !1, !1, !1, "New location")
        );
      }),
      m(37, "Location"),
      r(),
      o(38, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(
          n.setSetting("link", "Link", !1, !1, !1, "https://example.com/")
        );
      }),
      m(39, "Link"),
      r(),
      o(40, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("color", "Color", !1, !1, !1, "#FFFFFF"));
      }),
      m(41, "Color"),
      r(),
      o(42, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(
          n.setSetting("cosmetic", "Cosmetic", !1, !1, !1, "New cosmetic")
        );
      }),
      m(43, "Cosmetic"),
      r(),
      o(44, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(
          n.setSetting("privacy", "Privacy", !1, !1, !1, "Modify privacy")
        );
      }),
      m(45, "Privacy"),
      r(),
      o(46, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(
          n.setSetting("analytics", "Analytics", !1, !1, !1, "Modify analytics")
        );
      }),
      m(47, "Analytics"),
      r()(),
      v(48, gn, 14, 11),
      o(49, "div", 13)(50, "div", 14)(51, "div", 15),
      l(52, "avatar", 16),
      r(),
      o(53, "div", 17)(54, "span", 18),
      m(55),
      r(),
      v(56, vn, 2, 6, "span", 19),
      o(57, "span", 20),
      v(58, bn, 4, 10, "div", 21)(59, wn, 4, 10, "div", 21)(
        60,
        Sn,
        3,
        5,
        "div",
        22
      ),
      r(),
      v(61, yn, 2, 4, "div", 23),
      r()()()(),
      l(62, "right", 1);
  }
  if (t & 2) {
    let e = s();
    p("user", e.me()),
      i(6),
      b(" ", e.currentSetting().label, " "),
      i(8),
      k("act", e.currentSetting().name == "username"),
      i(2),
      k("act", e.currentSetting().name == "alias"),
      i(2),
      k("act", e.currentSetting().name == "password"),
      i(2),
      k("act", e.currentSetting().name == "authenticator"),
      i(2),
      k("act", e.currentSetting().name == "name"),
      i(2),
      k("act", e.currentSetting().name == "avatar"),
      i(2),
      k("act", e.currentSetting().name == "banner"),
      i(2),
      k("act", e.currentSetting().name == "background"),
      i(2),
      k("act", e.currentSetting().name == "bio"),
      i(2),
      k("act", e.currentSetting().name == "signature"),
      i(2),
      k("act", e.currentSetting().name == "group"),
      i(2),
      k("act", e.currentSetting().name == "location"),
      i(2),
      k("act", e.currentSetting().name == "link"),
      i(2),
      k("act", e.currentSetting().name == "color"),
      i(2),
      k("act", e.currentSetting().name == "cosmetic"),
      i(2),
      k("act", e.currentSetting().name == "privacy"),
      i(2),
      k("act", e.currentSetting().name == "analytics"),
      i(2),
      _(e.currentSetting() && e.currentSetting().name ? 48 : -1),
      i(),
      de("background-image", e.me().banner ? "url(" + e.me().banner + ")" : ""),
      i(3),
      p("user", e.me()),
      i(2),
      k("glw", e.me().premium),
      p(
        "ngStyle",
        P(
          50,
          Se,
          e.currentSetting().name == "color" && e.value()
            ? e.value()
            : e.me().color
        )
      ),
      i(),
      b(
        "@",
        e.currentSetting().name == "username" && e.value()
          ? e.value()
          : e.me().username
          ? e.me().username
          : "",
        ""
      ),
      i(),
      _(e.currentSetting().name == "name" || e.me().name ? 56 : -1),
      i(2),
      _(e.me().admin ? 58 : -1),
      i(),
      _(e.me().premium ? 59 : -1),
      i(),
      _(
        (e.currentSetting().name == "privacy" &&
          (e.value() == "1" || e.value() == "2")) ||
          e.me().privacy > 0
          ? 60
          : -1
      ),
      i(),
      _(e.currentSetting().name == "bio" || e.me().bio ? 61 : -1),
      i(),
      p("user", e.me());
  }
}
var it = (() => {
  class t {
    constructor() {
      (this.me = S({})),
        (this.currentSetting = S({})),
        (this.response = S("")),
        (this.value = S("")),
        (this.currentPassword = S("")),
        (this.currentCode = S("")),
        (this.cosmetics = S([])),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U));
    }
    ngOnInit() {
      this.cosmetics.set(this.client.config("cosmetics")),
        this.title.setTitle("Settings"),
        this.getMe(),
        this.setSetting("username", "Username", !0, !1, !1, "New username");
    }
    getMe() {
      this.http
        .post(
          this.client.config("api") + "/view/me",
          null,
          this.client.headers()
        )
        .subscribe({
          next: (e) => {
            e.type == "success" && this.me.set(e.me);
          },
          error: (e) => {},
        });
    }
    setSetting(e, a, n, c, f, V) {
      if (
        (this.currentSetting.set({
          name: e,
          label: a,
          verifyPassword: n,
          verifyCode: c,
          uploadable: f,
          hint: V,
        }),
        this.currentSetting().uploadable)
      )
        this.value.set("");
      else {
        let L = this.me()[this.currentSetting().name];
        L
          ? this.value.set(
              this.currentSetting().name == "group"
                ? this.me().group.vanity
                : L.toString()
            )
          : this.value.set("");
      }
      this.currentPassword.set(""),
        this.currentCode.set(""),
        this.response.set("");
    }
    updateSetting() {
      let e = {
        [this.currentSetting().name]: this.value(),
        verifypassword: this.currentPassword(),
        verifycode: this.currentCode(),
      };
      this.http
        .post(
          this.client.config("api") + "/user/update",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (this.me.set(a.me), this.response.set(a.message));
          },
          error: (a) => {
            this.response.set(a.error.message);
          },
        });
    }
    uploaded(e) {
      this.value.set(e);
    }
    generateAuthenticator() {
      this.http
        .post(
          this.client.config("api") + "/user/authenticator",
          null,
          this.client.headers()
        )
        .subscribe({
          next: (e) => {
            e.type == "success" &&
              (this.me.set(e.me),
              this.value.set(e.token),
              this.response.set(e.message));
          },
          error: (e) => {
            this.response.set(e.error.message);
          },
        });
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["settings"]],
        decls: 3,
        vars: 2,
        consts: [
          [1, "app"],
          [3, "user"],
          [1, "pg"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [2, "margin-left", "auto"],
          ["data-title", "Admin", "routerLink", "/admin"],
          [
            "icon",
            "wrench",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["data-title", "Go back", "routerLink", "/home"],
          [
            "icon",
            "doubleleft",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "gr", 2, "--x", "110px"],
          [3, "click"],
          [1, "bn", 2, "border-radius", "var(--b-c)"],
          [
            2,
            "display",
            "flex",
            "flex-direction",
            "row",
            "align-items",
            "center",
          ],
          [2, "align-self", "start", "position", "relative"],
          ["size", "large", 3, "user"],
          [2, "text-align", "left", "margin-left", "15px"],
          [1, "un", 3, "ngStyle"],
          [1, "un", 3, "ngStyle", "glw"],
          [2, "display", "inline-flex", "margin-left", "3px"],
          [1, "bdgc"],
          ["data-title", "Private", 1, "bdgc"],
          [1, "bi", 2, "margin", "8px 0 0 0", 3, "innerHTML"],
          [1, "rw"],
          [2, "width", "100%", 3, "click"],
          [1, "cn"],
          ["type", "text", 3, "ngModelChange", "ngModel", "placeholder"],
          [2, "width", "100%"],
          ["type", "text", 3, "ngModel", "placeholder"],
          [
            "type",
            "text",
            2,
            "resize",
            "vertical",
            3,
            "ngModelChange",
            "ngModel",
            "placeholder",
          ],
          [3, "ngModelChange", "ngModel"],
          ["value", ""],
          [3, "value"],
          ["value", "0"],
          ["value", "1"],
          ["value", "2"],
          ["type", "color", 3, "ngModelChange", "ngModel"],
          ["size", "small", "category", "upload", 3, "onUploaded"],
          [
            "type",
            "text",
            "placeholder",
            "Verify 2FA Code",
            3,
            "ngModelChange",
            "ngModel",
          ],
          [
            "type",
            "password",
            "placeholder",
            "Current Password",
            3,
            "ngModelChange",
            "ngModel",
          ],
          [1, "hl"],
          [
            "icon",
            "info",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-left", "5px"],
          [1, "cnt"],
          [
            "height",
            "16",
            "width",
            "16",
            "fill",
            "var(--x)",
            "version",
            "1.2",
            "xmlns",
            "http://www.w3.org/2000/svg",
            "viewBox",
            "0 0 256 240.5",
            0,
            "xml",
            "space",
            "preserve",
            1,
            "bdg",
            3,
            "ngStyle",
          ],
          [
            "d",
            "M41 196h174v31H41v-31zM236 59a20 20 0 0 0-18 29l-42 21-38-64a20 20 0 1 0-20 0l-38 64-41-21c2-2 2-5 2-9a20 20 0 1 0-16 20l15 77h176l16-77a20 20 0 0 0 24-20c0-11-9-20-20-20z",
          ],
          [
            "width",
            "16",
            "height",
            "16",
            "fill",
            "var(--x)",
            "viewBox",
            "0 -5.5 56.3 56.3",
            "xmlns",
            "http://www.w3.org/2000/svg",
            1,
            "bdg",
            3,
            "ngStyle",
          ],
          [
            "d",
            "m24 1 2-1H13L0 15h13Zm-8 14h24l-6-8-6-6-8 9ZM0 17l24 25-11-25Zm41 0H15l13 28 12-26Zm-9 25 24-25H44Zm24-27L43 0H31l12 15Z",
          ],
          [
            "width",
            "16",
            "height",
            "16",
            "fill",
            "var(--x)",
            "xmlns",
            "http://www.w3.org/2000/svg",
            "viewBox",
            "-2 0 24 24",
            1,
            "bdg",
            3,
            "ngStyle",
          ],
          [
            "d",
            "M3.5 6.5V10H2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2h-1.5V6.5a6.5 6.5 0 1 0-13 0M6 10V6.5a4 4 0 0 1 8 0V10zm2 5.5a2 2 0 1 1 3.1 1.68h-.02l.42 2.57c0 .42-.34.75-.75.75h-1.5a.75.75 0 0 1-.75-.75l.41-2.57A2 2 0 0 1 8 15.5",
          ],
        ],
        template: function (a, n) {
          a & 1 && (o(0, "div", 0), l(1, "navbar", 1), v(2, kn, 63, 52), r()),
            a & 2 &&
              (i(), p("user", n.me()), i(), _(n.me() && n.me().id ? 2 : -1));
        },
        dependencies: [
          K,
          Q,
          H,
          z,
          O,
          ce,
          $,
          Pe,
          Ee,
          ae,
          Te,
          le,
          se,
          Z,
          R,
          X,
          q,
          j,
        ],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var Tn = (t, d) => d.value,
  Pn = () => [import("./chunk-QHDGOEVR.js").then((t) => t.UploadComponent)];
function En(t, d) {
  if ((t & 1 && (o(0, "option", 16), m(1), r()), t & 2)) {
    let e = d.$implicit;
    p("value", e.value), i(), E(e.value);
  }
}
function Vn(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 11)(1, "select", 14),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(4);
        return g(c.value.set(n));
      }),
      o(2, "option", 15),
      m(3, "none"),
      r(),
      W(4, En, 2, 2, "option", 16, Tn),
      r()();
  }
  if (t & 2) {
    let e = s(4);
    i(), p("ngModel", e.value()), i(3), J(e.cosmetics());
  }
}
function Mn(t, d) {
  if ((t & 1 && v(0, Vn, 6, 1, "div", 11), t & 2)) {
    let e = s(3);
    _(e.cosmetics().length > 0 ? 0 : -1);
  }
}
function In(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 11)(1, "select", 14),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(3);
        return g(c.value.set(n));
      }),
      o(2, "option", 17),
      m(3, "Everything"),
      r(),
      o(4, "option", 18),
      m(5, "Only userbar"),
      r(),
      o(6, "option", 19),
      m(7, "No hashtag"),
      r()()();
  }
  if (t & 2) {
    let e = s(3);
    i(), p("ngModel", e.value());
  }
}
function Fn(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 11)(1, "input", 20),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(3);
        return g(c.value.set(n));
      }),
      r()();
  }
  if (t & 2) {
    let e = s(3);
    i(), fe("placeholder", e.currentSetting().hint), p("ngModel", e.value());
  }
}
function Bn(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 11)(1, "textarea", 21),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(3);
        return g(c.value.set(n));
      }),
      m(2),
      r()();
  }
  if (t & 2) {
    let e = s(3);
    i(),
      fe("placeholder", e.currentSetting().hint),
      p("ngModel", e.value()),
      i(),
      E(e.value());
  }
}
function Ln(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 11)(1, "input", 22),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(3);
        return g(c.value.set(n));
      }),
      r()();
  }
  if (t & 2) {
    let e = s(3);
    i(), p("ngModel", e.value());
  }
}
function Dn(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "upload", 23),
      C("onUploaded", function (n) {
        x(e);
        let c = s(4);
        return g(c.uploaded(n));
      }),
      r();
  }
}
function On(t, d) {
  t & 1 && (v(0, Dn, 1, 0), I(1, 0, Pn), F());
}
function Hn(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 13)(1, "div", 24),
      l(2, "icons", 25),
      o(3, "span", 26),
      m(4, "Information"),
      r()(),
      o(5, "div", 27),
      m(6),
      r()()),
    t & 2)
  ) {
    let e = s(3);
    i(6), E(e.response());
  }
}
function $n(t, d) {
  if (t & 1) {
    let e = w();
    v(0, Mn, 1, 1)(1, In, 8, 1, "div", 11)(2, Fn, 2, 2, "div", 11)(
      3,
      Bn,
      3,
      3,
      "div",
      11
    )(
      4,
      Ln,
      2,
      1,
      "div",
      11
    )(5, On, 3, 0),
      o(6, "div", 11)(7, "button", 12),
      C("click", function () {
        x(e);
        let n = s(2);
        return g(n.updateSetting());
      }),
      m(8, "Update"),
      r()(),
      v(9, Hn, 7, 1, "div", 13);
  }
  if (t & 2) {
    let e = s(2);
    _(
      !e.currentSetting().uploadable &&
        e.currentSetting().name != "color" &&
        e.currentSetting().name != "description" &&
        e.currentSetting().name == "cosmetic"
        ? 0
        : -1
    ),
      i(),
      _(
        !e.currentSetting().uploadable &&
          e.currentSetting().name != "color" &&
          e.currentSetting().name != "description" &&
          e.currentSetting().name == "visibility" &&
          e.currentSetting().name != "cosmetic"
          ? 1
          : -1
      ),
      i(),
      _(
        !e.currentSetting().uploadable &&
          e.currentSetting().name != "color" &&
          e.currentSetting().name != "description" &&
          e.currentSetting().name != "visibility" &&
          e.currentSetting().name != "cosmetic"
          ? 2
          : -1
      ),
      i(),
      _(
        !e.currentSetting().uploadable &&
          e.currentSetting().name != "color" &&
          e.currentSetting().name == "description" &&
          e.currentSetting().name != "visibility" &&
          e.currentSetting().name != "cosmetic"
          ? 3
          : -1
      ),
      i(),
      _(
        !e.currentSetting().uploadable && e.currentSetting().name == "color"
          ? 4
          : -1
      ),
      i(),
      _(e.currentSetting().uploadable ? 5 : -1),
      i(4),
      _(e.response() ? 9 : -1);
  }
}
function Gn(t, d) {
  if (t & 1) {
    let e = w();
    l(0, "left", 1),
      o(1, "div", 2)(2, "div", 3),
      l(3, "icons", 4),
      m(4, " Group Settings "),
      l(5, "icons", 4),
      m(6),
      l(7, "div", 5),
      o(8, "div", 6)(9, "button", 7),
      l(10, "icons", 8),
      r()()(),
      o(11, "div", 9)(12, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("name", "Name", !1, "New name"));
      }),
      m(13, "Name"),
      r(),
      o(14, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("tag", "Tag", !1, "New tag"));
      }),
      m(15, "Tag"),
      r(),
      o(16, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(
          n.setSetting("description", "Description", !1, "New description")
        );
      }),
      m(17, "Description"),
      r(),
      o(18, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("cosmetic", "Cosmetic", !1, "New cosmetic"));
      }),
      m(19, "Cosmetic"),
      r(),
      o(20, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("color", "Color", !1, ""));
      }),
      m(21, "Color"),
      r(),
      o(22, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("vanity", "Vanity", !1, "New vanity"));
      }),
      m(23, "Vanity"),
      r(),
      o(24, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("avatar", "Avatar", !0, ""));
      }),
      m(25, "Avatar"),
      r(),
      o(26, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("banner", "Banner", !0, ""));
      }),
      m(27, "Banner"),
      r(),
      o(28, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("background", "Background", !0, ""));
      }),
      m(29, "Background"),
      r(),
      o(30, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("userbar", "Userbar", !0, ""));
      }),
      m(31, "Userbar"),
      r(),
      o(32, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("visibility", "Visibility", !1, ""));
      }),
      m(33, "Visibility"),
      r()(),
      v(34, $n, 10, 7),
      r(),
      l(35, "right", 1);
  }
  if (t & 2) {
    let e = s();
    p("user", e.me()),
      i(6),
      b(" ", e.currentSetting().label, " "),
      i(6),
      k("act", e.currentSetting().name == "name"),
      i(2),
      k("act", e.currentSetting().name == "tag"),
      i(2),
      k("act", e.currentSetting().name == "description"),
      i(2),
      k("act", e.currentSetting().name == "cosmetic"),
      i(2),
      k("act", e.currentSetting().name == "color"),
      i(2),
      k("act", e.currentSetting().name == "vanity"),
      i(2),
      k("act", e.currentSetting().name == "avatar"),
      i(2),
      k("act", e.currentSetting().name == "banner"),
      i(2),
      k("act", e.currentSetting().name == "background"),
      i(2),
      k("act", e.currentSetting().name == "userbar"),
      i(2),
      k("act", e.currentSetting().name == "visibility"),
      i(2),
      _(e.currentSetting() && e.currentSetting().name ? 34 : -1),
      i(),
      p("user", e.me());
  }
}
var nt = (() => {
  class t {
    constructor() {
      (this.me = S({})),
        (this.currentSetting = S({})),
        (this.response = S("")),
        (this.value = S("")),
        (this.cosmetics = S([])),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U)),
        (this.route = y(ue));
    }
    ngOnInit() {
      this.cosmetics.set(this.client.config("cosmetics")),
        this.title.setTitle("Group Settings"),
        this.getMe(),
        this.setSetting("name", "Name", !1, "New name");
    }
    getMe() {
      this.http
        .post(
          this.client.config("api") + "/view/me",
          null,
          this.client.headers()
        )
        .subscribe({
          next: (e) => {
            e.type == "success" && this.me.set(e.me);
          },
          error: (e) => {},
        });
    }
    setSetting(e, a, n, c) {
      this.currentSetting.set({ name: e, label: a, uploadable: n, hint: c }),
        this.value.set(""),
        this.response.set("");
    }
    updateSetting() {
      let e = {
        id: this.route.snapshot.paramMap.get("id"),
        [this.currentSetting().name]: this.value(),
      };
      this.http
        .post(
          this.client.config("api") + "/group/update",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (this.me.set(a.me),
              this.response.set(a.message),
              this.value.set(""));
          },
          error: (a) => {
            this.response.set(a.error.message);
          },
        });
    }
    uploaded(e) {
      this.value.set(e);
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["groupsettings"]],
        decls: 3,
        vars: 2,
        consts: [
          [1, "app"],
          [3, "user"],
          [1, "pg"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [2, "margin-left", "auto"],
          ["data-title", "Go back", "routerLink", "/home"],
          [
            "icon",
            "doubleleft",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "gr", 2, "--x", "110px"],
          [3, "click"],
          [1, "rw"],
          [2, "width", "100%", 3, "click"],
          [1, "cn"],
          [3, "ngModelChange", "ngModel"],
          ["value", ""],
          [3, "value"],
          ["value", "0"],
          ["value", "1"],
          ["value", "2"],
          ["type", "text", 3, "ngModelChange", "ngModel", "placeholder"],
          [
            "type",
            "text",
            2,
            "resize",
            "vertical",
            3,
            "ngModelChange",
            "ngModel",
            "placeholder",
          ],
          ["type", "color", 3, "ngModelChange", "ngModel"],
          ["size", "small", "category", "upload", 3, "onUploaded"],
          [1, "hl"],
          [
            "icon",
            "info",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-left", "5px"],
          [1, "cnt"],
        ],
        template: function (a, n) {
          a & 1 && (o(0, "div", 0), l(1, "navbar", 1), v(2, Gn, 36, 26), r()),
            a & 2 &&
              (i(), p("user", n.me()), i(), _(n.me() && n.me().id ? 2 : -1));
        },
        dependencies: [H, z, O, $, Pe, Ee, ae, Te, le, se, Z, R, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
function Rn(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 16)(1, "div", 17),
      l(2, "icons", 18),
      o(3, "span", 19),
      m(4, "Information"),
      r()(),
      o(5, "div", 20),
      m(6),
      r()()),
    t & 2)
  ) {
    let e = s(3);
    i(6), E(e.response());
  }
}
function Nn(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 11)(1, "input", 12),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(2);
        return g(c.target.set(n));
      }),
      r()(),
      o(2, "div", 11)(3, "input", 13),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(2);
        return g(c.value.set(n));
      }),
      r()(),
      o(4, "div", 11)(5, "input", 14),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(2);
        return g(c.currentPassword.set(n));
      }),
      r()(),
      o(6, "div", 11)(7, "button", 15),
      C("click", function () {
        x(e);
        let n = s(2);
        return g(n.updateSetting());
      }),
      m(8, "Update"),
      r()(),
      v(9, Rn, 7, 1, "div", 16);
  }
  if (t & 2) {
    let e = s(2);
    i(),
      p("ngModel", e.target()),
      i(2),
      fe("placeholder", e.currentSetting().hint),
      p("ngModel", e.value()),
      i(2),
      p("ngModel", e.currentPassword()),
      i(4),
      _(e.response() ? 9 : -1);
  }
}
function An(t, d) {
  if (t & 1) {
    let e = w();
    l(0, "left", 1),
      o(1, "div", 2)(2, "div", 3),
      l(3, "icons", 4),
      m(4, " Settings "),
      l(5, "icons", 4),
      m(6, " Admin "),
      l(7, "icons", 4),
      m(8),
      l(9, "div", 5),
      o(10, "div", 6)(11, "button", 7),
      l(12, "icons", 8),
      r()()(),
      o(13, "div", 9)(14, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("balance", "Balance", "Amount of currency"));
      }),
      m(15, "Balance"),
      r(),
      o(16, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("banned", "Banned", "true / false"));
      }),
      m(17, "Banned"),
      r(),
      o(18, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.setSetting("delete", "Delete", "true / false"));
      }),
      m(19, "Delete"),
      r()(),
      v(20, Nn, 10, 5),
      r(),
      l(21, "right", 1);
  }
  if (t & 2) {
    let e = s();
    p("user", e.me()),
      i(8),
      b(" ", e.currentSetting().label, " "),
      i(6),
      k("act", e.currentSetting().name == "balance"),
      i(2),
      k("act", e.currentSetting().name == "banned"),
      i(2),
      k("act", e.currentSetting().name == "delete"),
      i(2),
      _(e.currentSetting() && e.currentSetting().name ? 20 : -1),
      i(),
      p("user", e.me());
  }
}
var ot = (() => {
  class t {
    constructor() {
      (this.me = S({})),
        (this.currentSetting = S({})),
        (this.response = S("")),
        (this.target = S("")),
        (this.value = S("")),
        (this.currentPassword = S("")),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U));
    }
    ngOnInit() {
      this.title.setTitle("Admin"),
        this.getMe(),
        this.setSetting("balance", "Balance", "Amount of currency");
    }
    getMe() {
      this.http
        .post(
          this.client.config("api") + "/view/me",
          null,
          this.client.headers()
        )
        .subscribe({
          next: (e) => {
            e.type == "success" && this.me.set(e.me);
          },
          error: (e) => {},
        });
    }
    setSetting(e, a, n) {
      this.currentSetting.set({ name: e, label: a, hint: n }),
        this.target.set(""),
        this.value.set(""),
        this.currentPassword.set(""),
        this.response.set("");
    }
    updateSetting() {
      let e = {
        target: this.target(),
        password: this.currentPassword(),
        field: this.currentSetting().name,
        value: this.value(),
      };
      this.http
        .post(
          this.client.config("api") + "/staff/update",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (this.me.set(a.me), this.response.set(a.message));
          },
          error: (a) => {
            this.response.set(a.error.message);
          },
        });
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["admin"]],
        decls: 3,
        vars: 2,
        consts: [
          [1, "app"],
          [3, "user"],
          [1, "pg"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [2, "margin-left", "auto"],
          ["data-title", "Go back", "routerLink", "/settings"],
          [
            "icon",
            "doubleleft",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "gr", 2, "--x", "110px"],
          [3, "click"],
          [1, "rw"],
          [
            "type",
            "text",
            "placeholder",
            "Target Username",
            3,
            "ngModelChange",
            "ngModel",
          ],
          ["type", "text", 3, "ngModelChange", "ngModel", "placeholder"],
          [
            "type",
            "password",
            "placeholder",
            "Current Password",
            3,
            "ngModelChange",
            "ngModel",
          ],
          [2, "width", "100%", 3, "click"],
          [1, "cn"],
          [1, "hl"],
          [
            "icon",
            "info",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-left", "5px"],
          [1, "cnt"],
        ],
        template: function (a, n) {
          a & 1 && (o(0, "div", 0), l(1, "navbar", 1), v(2, An, 22, 10), r()),
            a & 2 &&
              (i(), p("user", n.me()), i(), _(n.me() && n.me().id ? 2 : -1));
        },
        dependencies: [H, z, O, $, ae, le, se, Z, R, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var rt = (t, d) => d.id,
  at = () => [import("./chunk-LBQ2VAXP.js").then((t) => t.LoaderComponent)],
  lt = () => [import("./chunk-IGKAPWAB.js").then((t) => t.ComposeComponent)],
  st = () => [import("./chunk-RHH4XAVI.js").then((t) => t.MediaComponent)],
  zn = (t, d) => ({ "--c-b": t, "--c-c": d }),
  Un = () => ({}),
  ct = (t) => ({ "--x": t, "font-size": "16px" }),
  Ie = (t) => ({ "--x": t }),
  Zn = (t) => ["/", t],
  be = (t) => ["/post", t];
function qn(t, d) {
  if ((t & 1 && (o(0, "a", 7), l(1, "icons", 33), r()), t & 2)) {
    let e = s(2);
    p("href", e.user().link, he),
      ke("data-title", e.user().link),
      i(),
      p("color", e.user().color);
  }
}
function jn(t, d) {
  if ((t & 1 && (o(0, "span", 11), m(1), r()), t & 2)) {
    let e = s(2);
    k("glw", e.user().premium),
      p("ngStyle", P(4, ct, e.user().color)),
      i(),
      b("(", e.user().name, ")");
  }
}
function Wn(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 14),
      u(1, "datePipe"),
      Y(),
      o(2, "svg", 34),
      l(3, "path", 35),
      r()()),
    t & 2)
  ) {
    let e = s(2);
    T("data-title", "Admin (Expires ", h(1, 5, e.user().admin, "long"), ")"),
      i(2),
      k("glw", e.user().premium),
      p("ngStyle", P(8, Ie, e.user().color));
  }
}
function Jn(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 14),
      u(1, "datePipe"),
      Y(),
      o(2, "svg", 36),
      l(3, "path", 37),
      r()()),
    t & 2)
  ) {
    let e = s(2);
    T(
      "data-title",
      "Premium (Expires ",
      h(1, 5, e.user().premium, "long"),
      ")"
    ),
      i(2),
      k("glw", e.user().premium),
      p("ngStyle", P(8, Ie, e.user().color));
  }
}
function Kn(t, d) {
  if (
    (t & 1 && (o(0, "div", 15), Y(), o(1, "svg", 38), l(2, "path", 39), r()()),
    t & 2)
  ) {
    let e = s(2);
    i(), k("glw", e.user().premium), p("ngStyle", P(3, Ie, e.user().color));
  }
}
function Yn(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 40),
      C("click", function () {
        x(e);
        let n = s(2);
        return g(n.follow(n.user().id));
      }),
      m(1),
      r();
  }
  if (t & 2) {
    let e = s(2);
    i(),
      E(
        e.user().followed
          ? "Unfollow"
          : e.user().requested
          ? "Cancel"
          : "Request"
      );
  }
}
function Qn(t, d) {
  if ((t & 1 && (l(0, "div", 17), u(1, "contentPipe")), t & 2)) {
    let e = s(2);
    p("innerHTML", h(1, 1, e.user().bio, "full"), G);
  }
}
function Xn(t, d) {
  if ((t & 1 && (o(0, "div", 19), l(1, "icons", 41), m(2), r()), t & 2)) {
    let e = s(2);
    T("data-title", "Currently in ", e.user().location, ""),
      i(),
      p("color", e.user().color),
      i(),
      b(" ", e.user().location, "");
  }
}
function eo(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 19),
      u(1, "numberPipe"),
      l(2, "icons", 42),
      m(3),
      u(4, "numberPipe"),
      r()),
    t & 2)
  ) {
    let e = s(2);
    T("data-title", "", h(1, 4, e.user().views, "suffix"), " Views"),
      i(2),
      p("color", e.user().color),
      i(),
      b(" ", h(4, 7, e.user().views, "suffix"), "");
  }
}
function to(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 19),
      u(1, "datePipe"),
      l(2, "icons", 43),
      m(3),
      u(4, "datePipe"),
      r()),
    t & 2)
  ) {
    let e = s(2);
    T("data-title", "Last seen ", h(1, 4, e.user().seen, "long"), ""),
      i(2),
      p("color", e.user().color),
      i(),
      b(" ", h(4, 7, e.user().seen, "short"), "");
  }
}
function io(t, d) {
  if ((t & 1 && (o(0, "div", 19), l(1, "icons", 44), m(2), r()), t & 2)) {
    let e = s(2);
    T("data-title", "Member of #", e.user().group.tag, ""),
      i(),
      p("color", e.user().color),
      i(),
      b(" ", e.user().group.tag, "");
  }
}
function no(t, d) {
  if ((t & 1 && (o(0, "div", 19), l(1, "display", 45), r()), t & 2)) {
    let e = s(2);
    T("data-title", "Invited by @", e.user().inviter.username, ""),
      i(),
      p("user", e.user().inviter)("color", e.user().color);
  }
}
function oo(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 22)(1, "div", 46),
      l(2, "icons", 47),
      m(3),
      u(4, "numberPipe"),
      r(),
      o(5, "div", 48),
      l(6, "icons", 49),
      m(7),
      u(8, "numberPipe"),
      l(9, "icons", 50),
      r(),
      o(10, "div", 51),
      m(11),
      u(12, "numberPipe"),
      l(13, "icons", 47),
      r()()),
    t & 2)
  ) {
    let e = s(2);
    i(3),
      b(" ", h(4, 3, e.user().experience.xp, "suffix"), ""),
      i(4),
      b(" ", h(8, 6, e.user().experience.level, "suffix"), " "),
      i(4),
      b("", h(12, 9, e.user().experience.next, "suffix"), " ");
  }
}
function ro(t, d) {
  t & 1 &&
    (o(0, "div", 32)(1, "div", 52),
    l(2, "icons", 53),
    o(3, "span", 54),
    m(4, "Information"),
    r()(),
    o(5, "div", 55),
    m(
      6,
      "This user has a private profile, their privacy settings prevent you from viewing anything beyond this point."
    ),
    r()());
}
function ao(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 58)(1, "button", 59),
      C("click", function () {
        x(e);
        let n = s(2).$implicit,
          c = s(3);
        return g(c.follow(n.id));
      }),
      m(2),
      r(),
      o(3, "button", 59),
      C("click", function () {
        x(e);
        let n = s(2).$implicit,
          c = s(3);
        return g(c.block(n.id));
      }),
      m(4),
      r()();
  }
  if (t & 2) {
    let e = s(2).$implicit;
    i(2),
      E(e.followed ? "Unfollow" : e.requested ? "Cancel" : "Request"),
      i(2),
      E(e.blocked ? "Blocked" : "Block");
  }
}
function lo(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 58)(1, "button", 59),
      C("click", function () {
        x(e);
        let n = s(2).$implicit,
          c = s(3);
        return g(c.follower(n.id, "approve"));
      }),
      m(2, "Approve"),
      r(),
      o(3, "button", 59),
      C("click", function () {
        x(e);
        let n = s(2).$implicit,
          c = s(3);
        return g(c.follower(n.id, "deny"));
      }),
      m(4, "Deny"),
      r()();
  }
}
function so(t, d) {
  if ((t & 1 && v(0, ao, 5, 2, "div", 58)(1, lo, 5, 0, "div", 58), t & 2)) {
    let e = s(4);
    _(e.usersOpt() != "pending" ? 0 : -1),
      i(),
      _(e.usersOpt() == "pending" && e.me().id == e.user().id ? 1 : -1);
  }
}
function co(t, d) {
  if (
    (t & 1 && (o(0, "div", 23)(1, "button", 60), m(2, "My profile"), r()()),
    t & 2)
  ) {
    let e = s(4);
    i(), p("routerLink", P(1, Zn, e.me().username));
  }
}
function po(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 32),
      l(1, "avatar", 57)(2, "display", 45),
      v(3, so, 2, 2)(4, co, 3, 3, "div", 23),
      r()),
    t & 2)
  ) {
    let e = d.$implicit,
      a = s(3);
    i(),
      p("user", e),
      i(),
      p("user", e)("color", e.color),
      i(),
      _(a.me() && a.me().id && a.me().id != e.id ? 3 : -1),
      i(),
      _(a.me() && a.me().id && a.me().id == e.id ? 4 : -1);
  }
}
function mo(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "loader", 61),
      C("onScrolled", function () {
        x(e);
        let n = s(3);
        return g(n.getUsers());
      }),
      r();
  }
}
function _o(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 56),
      W(1, po, 5, 5, "div", 32, rt),
      r(),
      v(3, mo, 1, 0),
      I(4, 3, at),
      F()),
    t & 2)
  ) {
    let e = s(2);
    i(), J(e.users());
  }
}
function uo(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "compose", 62),
      C("onComposed", function (n) {
        x(e);
        let c = s(4);
        return g(c.composed(n));
      }),
      r();
  }
}
function ho(t, d) {
  t & 1 && (v(0, uo, 1, 0), I(1, 0, lt), F());
}
function fo(t, d) {
  if ((t & 1 && v(0, ho, 3, 0), t & 2)) {
    let e = s(2);
    _(e.me() && e.me().id && e.me().id == e.user().id ? 0 : -1);
  }
}
function Co(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "compose", 63),
      C("onComposed", function (n) {
        x(e);
        let c = s(4);
        return g(c.composed(n));
      }),
      r();
  }
  if (t & 2) {
    let e = s(4);
    p("id", e.user().id);
  }
}
function xo(t, d) {
  t & 1 && (v(0, Co, 1, 1), I(1, 0, lt), F());
}
function go(t, d) {
  if ((t & 1 && v(0, xo, 3, 0), t & 2)) {
    let e = s(2);
    _(e.me() && e.me().id && e.me().id != e.user().id ? 0 : -1);
  }
}
function vo(t, d) {
  if ((t & 1 && (o(0, "span", 66), m(1), u(2, "numberPipe"), r()), t & 2)) {
    let e = s(3);
    i(), E(h(2, 1, e.pinned().views, "suffix"));
  }
}
function bo(t, d) {
  if ((t & 1 && l(0, "media", 80), t & 2)) {
    let e = s(3);
    p("attachment", e.pinned().attachment);
  }
}
function wo(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 72),
      C("click", function () {
        x(e);
        let n = s(3);
        return g(n.pinPost(n.pinned().id));
      }),
      l(1, "icons", 81),
      r();
  }
  if (t & 2) {
    let e = s(3);
    i(), p("color", e.pinned().pinned ? "var(--c-e)" : "var(--c-c)");
  }
}
function So(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 72),
      C("click", function () {
        x(e);
        let n = s(3);
        return g(n.hidePost(n.pinned().id));
      }),
      l(1, "icons", 82),
      r();
  }
  if (t & 2) {
    let e = s(3);
    i(), p("color", e.pinned().hidden ? "var(--c-e)" : "var(--c-c)");
  }
}
function yo(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 72),
      C("click", function () {
        x(e);
        let n = s(3);
        return g(n.deletePost(n.pinned().id));
      }),
      l(1, "icons", 83),
      r();
  }
}
function ko(t, d) {
  if ((t & 1 && (l(0, "div", 79), u(1, "contentPipe")), t & 2)) {
    let e = s(3);
    p("innerHTML", h(1, 1, e.pinned().signature, "full"), G);
  }
}
function To(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 32)(1, "span", 64),
      l(2, "icons", 65),
      v(3, vo, 3, 4, "span", 66),
      r(),
      o(4, "div", 52),
      l(5, "icons", 67),
      o(6, "span", 54)(7, "button", 68),
      m(8, "Pinned this"),
      r()()(),
      l(9, "avatar", 57)(10, "display", 45),
      o(11, "span", 69),
      m(12),
      u(13, "datePipe"),
      r(),
      l(14, "div", 70),
      u(15, "contentPipe"),
      v(16, bo, 1, 1),
      I(17, 16, st),
      F(),
      o(19, "div", 71)(20, "button", 72),
      C("click", function () {
        x(e);
        let n = s(2);
        return g(n.likePost(n.pinned().id));
      }),
      l(21, "icons", 73),
      m(22),
      u(23, "numberPipe"),
      r(),
      o(24, "button", 72),
      C("click", function () {
        x(e);
        let n = s(2);
        return g(n.repost(n.pinned().id));
      }),
      l(25, "icons", 74),
      m(26),
      u(27, "numberPipe"),
      r(),
      o(28, "button", 75),
      l(29, "icons", 76),
      m(30),
      u(31, "numberPipe"),
      r(),
      o(32, "button", 72),
      C("click", function () {
        x(e);
        let n = s(2);
        return g(n.bookmarkPost(n.pinned().id));
      }),
      l(33, "icons", 77),
      m(34),
      u(35, "numberPipe"),
      r(),
      v(36, wo, 2, 1, "button", 78)(37, So, 2, 1, "button", 78)(
        38,
        yo,
        2,
        0,
        "button",
        78
      )(39, ko, 2, 4, "div", 79),
      r()();
  }
  if (t & 2) {
    let e = s(2);
    i(2),
      p("icon", e.pinned().views ? "views" : "hide"),
      i(),
      _(e.pinned().views ? 3 : -1),
      i(4),
      p("routerLink", P(39, be, e.pinned().id)),
      i(2),
      p("user", e.pinned()),
      i(),
      p("user", e.pinned())("color", e.pinned().color),
      i(2),
      b("\u2022 ", h(13, 21, e.pinned().timestamp, "short"), ""),
      i(2),
      p("innerHTML", h(15, 24, e.pinned().content, "full"), G),
      i(7),
      p("color", e.pinned().liked ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(23, 27, e.pinned().likes, "suffix"), ""),
      i(3),
      p("color", e.pinned().reposted ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(27, 30, e.pinned().reposts, "suffix"), ""),
      i(2),
      p("routerLink", P(41, be, e.pinned().id)),
      i(),
      p("color", e.pinned().replied ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(31, 33, e.pinned().replies, "suffix"), ""),
      i(3),
      p("color", e.pinned().bookmarked ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(35, 36, e.pinned().bookmarks, "suffix"), ""),
      i(2),
      _(e.me() && e.me().id == e.pinned().user_id ? 36 : -1),
      i(),
      _(e.me() && e.me().id == e.pinned().user_id ? 37 : -1),
      i(),
      _(e.me() && e.me().id == e.pinned().user_id ? 38 : -1),
      i(),
      _(e.pinned().signature ? 39 : -1);
  }
}
function Po(t, d) {
  if ((t & 1 && (o(0, "span", 66), m(1), u(2, "numberPipe"), r()), t & 2)) {
    let e = s().$implicit;
    i(), E(h(2, 1, e.views, "suffix"));
  }
}
function Eo(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 52),
      l(1, "icons", 67),
      o(2, "span", 54)(3, "button", 68),
      m(4, "Replied to this"),
      r()()()),
    t & 2)
  ) {
    let e = s().$implicit;
    i(3), p("routerLink", P(1, be, e.post));
  }
}
function Vo(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 52),
      l(1, "icons", 67),
      o(2, "span", 54)(3, "button", 68),
      m(4, "Liked this"),
      r()()()),
    t & 2)
  ) {
    let e = s().$implicit;
    i(3), p("routerLink", P(1, be, e.id));
  }
}
function Mo(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 52),
      l(1, "icons", 67),
      o(2, "span", 54)(3, "button", 68),
      m(4, "Reposted this"),
      r()()()),
    t & 2)
  ) {
    let e = s().$implicit;
    i(3), p("routerLink", P(1, be, e.id));
  }
}
function Io(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 52),
      l(1, "icons", 67),
      o(2, "span", 54),
      m(3),
      u(4, "numberPipe"),
      r()()),
    t & 2)
  ) {
    let e = s().$implicit;
    i(3), b("", h(4, 1, e.reputation, "reputation"), " Reputation");
  }
}
function Fo(t, d) {
  if ((t & 1 && l(0, "media", 80), t & 2)) {
    let e = s().$implicit;
    p("attachment", e.attachment);
  }
}
function Bo(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 72),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.likePost(n.id));
      }),
      l(1, "icons", 73),
      m(2),
      u(3, "numberPipe"),
      r();
  }
  if (t & 2) {
    let e = s().$implicit;
    i(),
      p("color", e.liked ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(3, 2, e.likes, "suffix"), "");
  }
}
function Lo(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 72),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.repost(n.id));
      }),
      l(1, "icons", 74),
      m(2),
      u(3, "numberPipe"),
      r();
  }
  if (t & 2) {
    let e = s().$implicit;
    i(),
      p("color", e.reposted ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(3, 2, e.reposts, "suffix"), "");
  }
}
function Do(t, d) {
  if (
    (t & 1 &&
      (o(0, "button", 75), l(1, "icons", 76), m(2), u(3, "numberPipe"), r()),
    t & 2)
  ) {
    let e = s().$implicit;
    p("routerLink", P(6, be, e.id)),
      i(),
      p("color", e.replied ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(3, 3, e.replies, "suffix"), "");
  }
}
function Oo(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 72),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.bookmarkPost(n.id));
      }),
      l(1, "icons", 77),
      m(2),
      u(3, "numberPipe"),
      r();
  }
  if (t & 2) {
    let e = s().$implicit;
    i(),
      p("color", e.bookmarked ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(3, 2, e.bookmarks, "suffix"), "");
  }
}
function Ho(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 72),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.pinPost(n.id));
      }),
      l(1, "icons", 81),
      r();
  }
  if (t & 2) {
    let e = s().$implicit;
    i(), p("color", e.pinned ? "var(--c-e)" : "var(--c-c)");
  }
}
function $o(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 72),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.hidePost(n.id));
      }),
      l(1, "icons", 82),
      r();
  }
  if (t & 2) {
    let e = s().$implicit;
    i(), p("color", e.hidden ? "var(--c-e)" : "var(--c-c)");
  }
}
function Go(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 72),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.deletePost(n.id));
      }),
      l(1, "icons", 83),
      r();
  }
}
function Ro(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 72),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.deleteReply(n.id));
      }),
      l(1, "icons", 83),
      r();
  }
}
function No(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 72),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.deleteReputation(n.id));
      }),
      l(1, "icons", 83),
      r();
  }
}
function Ao(t, d) {
  if ((t & 1 && (l(0, "div", 79), u(1, "contentPipe")), t & 2)) {
    let e = s().$implicit;
    p("innerHTML", h(1, 1, e.signature, "full"), G);
  }
}
function zo(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 32)(1, "span", 64),
      l(2, "icons", 65),
      v(3, Po, 3, 4, "span", 66),
      r(),
      v(4, Eo, 5, 3, "div", 52)(5, Vo, 5, 3, "div", 52)(6, Mo, 5, 3, "div", 52)(
        7,
        Io,
        5,
        4,
        "div",
        52
      ),
      l(8, "avatar", 57)(9, "display", 45),
      o(10, "span", 69),
      m(11),
      u(12, "datePipe"),
      r(),
      l(13, "div", 70),
      u(14, "contentPipe"),
      v(15, Fo, 1, 1),
      I(16, 15, st),
      F(),
      o(18, "div", 71),
      v(19, Bo, 4, 5, "button", 78)(20, Lo, 4, 5, "button", 78)(
        21,
        Do,
        4,
        8,
        "button",
        75
      )(22, Oo, 4, 5, "button", 78)(23, Ho, 2, 1, "button", 78)(
        24,
        $o,
        2,
        1,
        "button",
        78
      )(25, Go, 2, 0, "button", 78)(26, Ro, 2, 0, "button", 78)(
        27,
        No,
        2,
        0,
        "button",
        78
      )(28, Ao, 2, 4, "div", 79),
      r()()),
    t & 2)
  ) {
    let e = d.$implicit,
      a = s(3);
    i(2),
      p("icon", e.views ? "views" : "hide"),
      i(),
      _(e.views ? 3 : -1),
      i(),
      _(a.postOpt() == "replies" ? 4 : -1),
      i(),
      _(a.postOpt() == "likes" ? 5 : -1),
      i(),
      _(a.postOpt() != "reputations" && e.repost && e.reposter ? 6 : -1),
      i(),
      _(a.postOpt() == "reputations" ? 7 : -1),
      i(),
      p("user", e),
      i(),
      p("user", e)("color", e.color),
      i(2),
      b("\u2022 ", h(12, 21, e.timestamp, "short"), ""),
      i(2),
      p("innerHTML", h(14, 24, e.content, "full"), G),
      i(6),
      _(a.postOpt() != "reputations" ? 19 : -1),
      i(),
      _(a.postOpt() != "reputations" ? 20 : -1),
      i(),
      _(a.postOpt() != "reputations" && a.postOpt() != "replies" ? 21 : -1),
      i(),
      _(a.postOpt() != "reputations" ? 22 : -1),
      i(),
      _(a.me() && a.me().id == e.user_id && a.postOpt() == "posts" ? 23 : -1),
      i(),
      _(a.me() && a.me().id == e.user_id && a.postOpt() ? 24 : -1),
      i(),
      _(a.me() && a.me().id == e.user_id && a.postOpt() == "posts" ? 25 : -1),
      i(),
      _(a.me() && a.me().id == e.user_id && a.postOpt() == "replies" ? 26 : -1),
      i(),
      _(
        a.me() && a.me().id == e.user_id && a.postOpt() == "reputations"
          ? 27
          : -1
      ),
      i(),
      _(e.signature ? 28 : -1);
  }
}
function Uo(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "loader", 61),
      C("onScrolled", function () {
        x(e);
        let n = s(3);
        return g(n.getPosts());
      }),
      r();
  }
}
function Zo(t, d) {
  if (
    (t & 1 &&
      (W(0, zo, 29, 27, "div", 32, rt), v(2, Uo, 1, 0), I(3, 2, at), F()),
    t & 2)
  ) {
    let e = s(2);
    J(e.posts());
  }
}
function qo(t, d) {
  if (t & 1) {
    let e = w();
    l(0, "left", 1),
      o(1, "div", 3)(2, "div", 4)(3, "div", 5)(4, "div", 6),
      v(5, qn, 2, 3, "a", 7),
      r()(),
      o(6, "div", 8),
      l(7, "avatar", 9),
      o(8, "div", 10)(9, "span", 11),
      m(10),
      r(),
      v(11, jn, 2, 6, "span", 12),
      o(12, "span", 13),
      v(13, Wn, 4, 10, "div", 14)(14, Jn, 4, 10, "div", 14)(
        15,
        Kn,
        3,
        5,
        "div",
        15
      ),
      r(),
      v(16, Yn, 2, 1, "button", 16)(17, Qn, 2, 4, "div", 17),
      r()(),
      o(18, "div", 18)(19, "div", 19),
      u(20, "numberPipe"),
      l(21, "icons", 20),
      m(22),
      u(23, "numberPipe"),
      r(),
      v(24, Xn, 3, 4, "div", 19)(25, eo, 5, 10, "div", 19),
      o(26, "div", 19),
      u(27, "datePipe"),
      l(28, "icons", 21),
      m(29),
      u(30, "datePipe"),
      r(),
      v(31, to, 5, 10, "div", 19)(32, io, 3, 4, "div", 19)(
        33,
        no,
        2,
        4,
        "div",
        19
      ),
      r()(),
      v(34, oo, 14, 12, "div", 22),
      o(35, "div", 23)(36, "button", 24),
      u(37, "numberPipe"),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updateUsersOpt("following"));
      }),
      l(38, "icons", 25),
      m(39),
      u(40, "numberPipe"),
      r(),
      o(41, "button", 24),
      u(42, "numberPipe"),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updateUsersOpt("followers"));
      }),
      l(43, "icons", 26),
      m(44),
      u(45, "numberPipe"),
      r(),
      o(46, "button", 24),
      u(47, "numberPipe"),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updateUsersOpt("pending"));
      }),
      l(48, "icons", 27),
      m(49),
      u(50, "numberPipe"),
      r(),
      o(51, "button", 24),
      u(52, "numberPipe"),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updatePostOpt("posts"));
      }),
      l(53, "icons", 28),
      m(54),
      u(55, "numberPipe"),
      r(),
      o(56, "button", 24),
      u(57, "numberPipe"),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updatePostOpt("replies"));
      }),
      l(58, "icons", 29),
      m(59),
      u(60, "numberPipe"),
      r(),
      o(61, "button", 24),
      u(62, "numberPipe"),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updatePostOpt("likes"));
      }),
      l(63, "icons", 30),
      m(64),
      u(65, "numberPipe"),
      r(),
      o(66, "button", 24),
      u(67, "numberPipe"),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updatePostOpt("reputations"));
      }),
      l(68, "icons", 31),
      m(69),
      u(70, "numberPipe"),
      r()(),
      v(71, ro, 7, 0, "div", 32)(72, _o, 6, 0)(73, fo, 1, 1)(74, go, 1, 1)(
        75,
        To,
        40,
        43,
        "div",
        32
      )(76, Zo, 5, 0),
      r(),
      l(77, "right", 1);
  }
  if (t & 2) {
    let e = s();
    p("user", e.me()),
      i(2),
      de(
        "background-image",
        e.user().banner ? "url(" + e.user().banner + ")" : null
      ),
      i(3),
      _(e.user().link ? 5 : -1),
      i(2),
      p("user", e.user()),
      i(2),
      k("glw", e.user().premium),
      p("ngStyle", P(125, ct, e.user().color)),
      i(),
      b("@", e.user().username, ""),
      i(),
      _(e.user().name ? 11 : -1),
      i(2),
      _(e.user().admin ? 13 : -1),
      i(),
      _(e.user().premium ? 14 : -1),
      i(),
      _(e.user().privacy > 0 ? 15 : -1),
      i(),
      _(e.me() && e.me().id && e.me().id != e.user().id ? 16 : -1),
      i(),
      _(e.user().bio ? 17 : -1),
      i(2),
      T("data-title", "User #", h(20, 71, e.user().uuid, "suffix"), ""),
      i(2),
      p("color", e.user().color),
      i(),
      b(" #", h(23, 74, e.user().uuid, "suffix"), ""),
      i(2),
      _(e.user().location ? 24 : -1),
      i(),
      _(e.user().views ? 25 : -1),
      i(),
      T("data-title", "Joined ", h(27, 77, e.user().timestamp, "long"), ""),
      i(2),
      p("color", e.user().color),
      i(),
      b(" ", h(30, 80, e.user().timestamp, "minimal"), ""),
      i(2),
      _(e.user().seen ? 31 : -1),
      i(),
      _(e.user().group ? 32 : -1),
      i(),
      _(e.user().inviter ? 33 : -1),
      i(),
      _(e.user().experience ? 34 : -1),
      i(2),
      k("act", e.usersOpt() == "following"),
      T(
        "data-title",
        "",
        h(37, 83, e.user().following, "suffix"),
        " Following"
      ),
      i(3),
      E(h(40, 86, e.user().following, "suffix")),
      i(2),
      k("act", e.usersOpt() == "followers"),
      T(
        "data-title",
        "",
        h(42, 89, e.user().followers, "suffix"),
        " Followers"
      ),
      i(3),
      E(h(45, 92, e.user().followers, "suffix")),
      i(2),
      k("act", e.usersOpt() == "pending"),
      T("data-title", "", h(47, 95, e.user().pending, "suffix"), " Pending"),
      i(3),
      E(h(50, 98, e.user().pending, "suffix")),
      i(2),
      k("act", e.postOpt() == "posts"),
      T("data-title", "", h(52, 101, e.user().posts, "suffix"), " Posts"),
      i(3),
      E(h(55, 104, e.user().posts, "suffix")),
      i(2),
      k("act", e.postOpt() == "replies"),
      T("data-title", "", h(57, 107, e.user().replies, "suffix"), " Replies"),
      i(3),
      E(h(60, 110, e.user().replies, "suffix")),
      i(2),
      k("act", e.postOpt() == "likes"),
      T("data-title", "", h(62, 113, e.user().likes, "suffix"), " Likes"),
      i(3),
      E(h(65, 116, e.user().likes, "suffix")),
      i(2),
      k("act", e.postOpt() == "reputations"),
      T(
        "data-title",
        "",
        h(67, 119, e.user().reputation, "reputation"),
        " Reputation"
      ),
      i(3),
      E(h(70, 122, e.user().reputation, "reputation")),
      i(2),
      _(
        e.user().privacy > 0 && e.posts().length <= 0 && e.users().length <= 0
          ? 71
          : -1
      ),
      i(),
      _(e.users().length > 0 ? 72 : -1),
      i(),
      _(e.postOpt() == "posts" ? 73 : -1),
      i(),
      _(e.postOpt() == "reputations" ? 74 : -1),
      i(),
      _(e.pinned() && e.pinned().id ? 75 : -1),
      i(),
      _(e.posts().length > 0 ? 76 : -1),
      i(),
      p("user", e.me());
  }
}
var pt = (() => {
  class t {
    constructor() {
      (this.me = S({})),
        (this.user = S({})),
        (this.postOpt = S("posts")),
        (this.posts = S([])),
        (this.pinned = S({})),
        (this.usersOpt = S("")),
        (this.users = S([])),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U)),
        (this.router = y(re)),
        (this.route = y(ue)),
        (this.meta = y(pe));
    }
    ngOnInit() {
      this.getUser();
    }
    ngOnDestroy() {
      this.subscription && this.subscription.unsubscribe();
    }
    getUser() {
      this.subscription = this.route.paramMap.subscribe((e) => {
        let a = { username: e.get("username") };
        this.http
          .post(
            this.client.config("api") + "/view/user",
            a,
            this.client.headers()
          )
          .subscribe({
            next: (n) => {
              n.type == "success" &&
                (this.me.set(n.me),
                this.user.set({}),
                this.postOpt.set("posts"),
                this.posts.set([]),
                this.pinned.set({}),
                this.usersOpt.set(""),
                this.users.set([]),
                this.user.set(n.user),
                this.title.setTitle(`@${this.user().username}`),
                this.meta.addTags([
                  { name: "title", content: `@${this.user().username}` },
                  { name: "og:title", content: `@${this.user().username}` },
                  {
                    name: "twitter:title",
                    content: `@${this.user().username}`,
                  },
                  {
                    name: "description",
                    content: this.user().bio
                      ? this.user().bio.length > 200
                        ? this.user()
                            .bio.substring(0, 200)
                            .replace(/\s\S*$/, "") + "..."
                        : this.user().bio
                      : "",
                  },
                  {
                    name: "og:description",
                    content: this.user().bio
                      ? this.user().bio.length > 200
                        ? this.user()
                            .bio.substring(0, 200)
                            .replace(/\s\S*$/, "") + "..."
                        : this.user().bio
                      : "",
                  },
                  { name: "theme-color", content: this.user().color },
                  {
                    name: "og:image",
                    content: this.user().avatar
                      ? this.user().avatar
                      : this.client.config("static") + "/images/avatar.png",
                  },
                  { name: "twitter:card", content: "summary" },
                  { name: "og:type", content: "website" },
                ]),
                this.getPosts());
            },
            error: (n) => {
              this.router.navigate(["/404"]);
            },
          });
      });
    }
    composed(e) {
      this.pinned.set({}),
        this.posts.set([]),
        this.users.set([]),
        this.getPosts();
    }
    follow(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/follow",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.users().length > 0 &&
                this.users.update((c) =>
                  c.map((f) =>
                    f.id == e ? B(M({}, f), { requested: n.add }) : f
                  )
                ),
              this.user() &&
                this.user().id == e &&
                this.user.update((c) => B(M({}, c), { requested: n.add })));
          },
          error: (n) => {},
        });
    }
    block(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/block",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.users().length > 0 &&
                this.users.update((c) =>
                  c.map((f) =>
                    f.id == e ? B(M({}, f), { blocked: !0, followed: !1 }) : f
                  )
                ));
          },
          error: (n) => {},
        });
    }
    follower(e, a) {
      let n = { id: e, option: a };
      this.http
        .post(
          this.client.config("api") + "/create/follower",
          n,
          this.client.headers()
        )
        .subscribe({
          next: (c) => {
            c.type == "success" &&
              (this.me.set(c.me),
              this.users().length > 0 &&
                this.users.update((f) => f.filter((V) => V.id != e)));
          },
          error: (c) => {},
        });
    }
    getUsers() {
      let e = {
        id: this.user().id,
        cursor: this.users().length > 0 ? this.users().at(-1).timestamp : null,
        option: this.usersOpt(),
      };
      this.http
        .post(
          this.client.config("api") + "/view/followers",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (this.me.set(a.me),
              this.users().length > 0
                ? this.users.update((n) =>
                    [...n, ...a.users].filter(
                      (c, f, V) =>
                        f ===
                        V.findIndex(
                          (L) => L.id === c.id && L.timestamp === c.timestamp
                        )
                    )
                  )
                : this.users.set(a.users));
          },
          error: (a) => {},
        });
    }
    getPosts() {
      let e = {
        id: this.user().id,
        cursor: this.posts().length > 0 ? this.posts().at(-1).timestamp : null,
        option: this.postOpt(),
      };
      this.http
        .post(
          this.client.config("api") + "/view/posts",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (this.me.set(a.me),
              this.pinned.set(a.pinned),
              this.posts().length > 0
                ? this.posts.update((n) =>
                    [...n, ...a.posts].filter(
                      (c, f, V) =>
                        f ===
                        V.findIndex(
                          (L) => L.id === c.id && L.timestamp === c.timestamp
                        )
                    )
                  )
                : this.posts.set(a.posts));
          },
          error: (a) => {},
        });
    }
    likePost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/like",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.posts().length > 0 &&
                this.posts.update((c) =>
                  c.map((f) =>
                    f.id == e
                      ? B(M({}, f), {
                          liked: !f.liked,
                          likes: n.add ? f.likes + 1 : f.likes - 1,
                        })
                      : f
                  )
                ),
              this.pinned() &&
                this.pinned().id &&
                this.pinned.update((c) =>
                  c.id == e
                    ? B(M({}, c), {
                        liked: !c.liked,
                        likes: n.add ? c.likes + 1 : c.likes - 1,
                      })
                    : c
                ));
          },
          error: (n) => {},
        });
    }
    hidePost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/hide",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.posts().length > 0 &&
                this.posts.update((c) =>
                  c.map((f) =>
                    f.id == e ? B(M({}, f), { hidden: !f.hidden }) : M({}, f)
                  )
                ),
              this.pinned() &&
                this.pinned().id &&
                this.pinned.update((c) =>
                  c.id == e ? B(M({}, c), { hidden: !c.hidden }) : M({}, c)
                ));
          },
          error: (n) => {},
        });
    }
    repost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/repost",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.posts().length > 0 &&
                this.posts.update((c) =>
                  c.map((f) =>
                    f.id == e
                      ? B(M({}, f), {
                          reposted: !f.reposted,
                          reposts: n.add ? f.reposts + 1 : f.reposts - 1,
                        })
                      : f
                  )
                ),
              this.pinned() &&
                this.pinned().id &&
                this.pinned.update((c) =>
                  c.id == e
                    ? B(M({}, c), {
                        reposted: !c.reposted,
                        reposts: n.add ? c.reposts + 1 : c.reposts - 1,
                      })
                    : c
                ));
          },
          error: (n) => {},
        });
    }
    bookmarkPost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/bookmark",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.pinned() &&
                this.pinned().id &&
                this.pinned.update((c) =>
                  c.id == e
                    ? B(M({}, c), {
                        bookmarked: !c.bookmarked,
                        bookmarks: n.add ? c.bookmarks + 1 : c.bookmarks - 1,
                      })
                    : c
                ),
              this.posts().length > 0 &&
                this.posts.update((c) =>
                  c.map((f) =>
                    f.id == e
                      ? B(M({}, f), {
                          bookmarked: !f.bookmarked,
                          bookmarks: n.add ? f.bookmarks + 1 : f.bookmarks - 1,
                        })
                      : f
                  )
                ));
          },
          error: (n) => {},
        });
    }
    pinPost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/pin",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.posts().length > 0 &&
                this.posts.update((c) =>
                  c.map((f) =>
                    f.id == e
                      ? B(M({}, f), { pinned: !f.pinned })
                      : B(M({}, f), { pinned: !1 })
                  )
                ),
              this.pinned() &&
                this.pinned().id &&
                this.pinned.update((c) =>
                  c.id == e
                    ? B(M({}, c), { pinned: !c.pinned })
                    : B(M({}, c), { pinned: !1 })
                ));
          },
          error: (n) => {},
        });
    }
    deletePost(e) {
      if (
        confirm(
          "This will delete the current post. This action is irreversible. Would you like to continue?"
        )
      ) {
        let n = { id: e };
        this.http
          .post(
            this.client.config("api") + "/delete/post",
            n,
            this.client.headers()
          )
          .subscribe({
            next: (c) => {
              c.type == "success" &&
                (this.me.set(c.me),
                this.posts().length > 0 &&
                  this.posts.update((f) => f.filter((V) => V.id != e)));
            },
            error: (c) => {},
          });
      }
    }
    deleteReply(e) {
      if (
        confirm(
          "This will delete the current reply. This action is irreversible. Would you like to continue?"
        )
      ) {
        let n = { id: e };
        this.http
          .post(
            this.client.config("api") + "/delete/reply",
            n,
            this.client.headers()
          )
          .subscribe({
            next: (c) => {
              c.type == "success" &&
                (this.me.set(c.me),
                this.posts().length > 0 &&
                  this.posts.update((f) => f.filter((V) => V.id != e)));
            },
            error: (c) => {},
          });
      }
    }
    deleteReputation(e) {
      if (
        confirm(
          "This will delete the current reputation. This action is irreversible. Would you like to continue?"
        )
      ) {
        let n = { id: e };
        this.http
          .post(
            this.client.config("api") + "/delete/reputation",
            n,
            this.client.headers()
          )
          .subscribe({
            next: (c) => {
              c.type == "success" &&
                (this.me.set(c.me),
                this.posts().length > 0 &&
                  this.posts.update((f) => f.filter((V) => V.id != e)));
            },
            error: (c) => {},
          });
      }
    }
    updatePostOpt(e) {
      this.postOpt() != e &&
        (this.pinned.set({}),
        this.posts.set([]),
        this.users.set([]),
        this.usersOpt.set(""),
        this.postOpt.set(e),
        this.getPosts());
    }
    updateUsersOpt(e) {
      this.usersOpt() != e &&
        (this.pinned.set({}),
        this.posts.set([]),
        this.users.set([]),
        this.usersOpt.set(e),
        this.postOpt.set(""),
        this.getUsers());
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["profile"]],
        decls: 4,
        vars: 9,
        consts: [
          [1, "app", 3, "ngStyle"],
          [3, "user"],
          [1, "bg"],
          [1, "pg"],
          [1, "bn"],
          [2, "position", "relative"],
          [2, "position", "absolute", "top", "0px", "right", "0px"],
          [
            "target",
            "_blank",
            "rel",
            "noopener noreferrer",
            2,
            "padding",
            "0",
            "background",
            "none",
            "border",
            "none",
            "box-shadow",
            "none",
            3,
            "href",
          ],
          [
            2,
            "display",
            "flex",
            "flex-direction",
            "row",
            "align-items",
            "center",
          ],
          ["size", "large", 3, "user"],
          [2, "text-align", "left", "margin-left", "15px"],
          [1, "un", 3, "ngStyle"],
          [1, "un", 3, "ngStyle", "glw"],
          [2, "display", "inline-flex", "margin-left", "3px"],
          [1, "bdgc"],
          ["data-title", "Private", 1, "bdgc"],
          [2, "margin-left", "8px", "background", "var(--c-b)"],
          [1, "bi", 2, "margin", "8px 0 0 0", 3, "innerHTML"],
          [
            2,
            "display",
            "flex",
            "flex-direction",
            "row",
            "flex-wrap",
            "wrap",
            "margin",
            "10px 0 0",
          ],
          [1, "bx", 2, "margin", "8px 4px 0 0"],
          ["icon", "user", "width", "11", "height", "11", 3, "color"],
          ["icon", "calendar", "width", "11", "height", "11", 3, "color"],
          [1, "exp"],
          [1, "rw"],
          [1, "ev", 2, "width", "100%", "font-size", "10px", 3, "click"],
          [
            "icon",
            "user",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "users",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "pending",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "post",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "reply",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "like",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "reputation",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "cn"],
          ["icon", "link", "width", "16", "height", "16", 3, "color"],
          [
            "height",
            "16",
            "width",
            "16",
            "fill",
            "var(--x)",
            "version",
            "1.2",
            "xmlns",
            "http://www.w3.org/2000/svg",
            "viewBox",
            "0 0 256 240.5",
            0,
            "xml",
            "space",
            "preserve",
            1,
            "bdg",
            3,
            "ngStyle",
          ],
          [
            "d",
            "M41 196h174v31H41v-31zM236 59a20 20 0 0 0-18 29l-42 21-38-64a20 20 0 1 0-20 0l-38 64-41-21c2-2 2-5 2-9a20 20 0 1 0-16 20l15 77h176l16-77a20 20 0 0 0 24-20c0-11-9-20-20-20z",
          ],
          [
            "width",
            "16",
            "height",
            "16",
            "fill",
            "var(--x)",
            "viewBox",
            "0 -5.5 56.3 56.3",
            "xmlns",
            "http://www.w3.org/2000/svg",
            1,
            "bdg",
            3,
            "ngStyle",
          ],
          [
            "d",
            "m24 1 2-1H13L0 15h13Zm-8 14h24l-6-8-6-6-8 9ZM0 17l24 25-11-25Zm41 0H15l13 28 12-26Zm-9 25 24-25H44Zm24-27L43 0H31l12 15Z",
          ],
          [
            "height",
            "16",
            "width",
            "16",
            "fill",
            "var(--x)",
            "xmlns",
            "http://www.w3.org/2000/svg",
            "viewBox",
            "-2 0 24 24",
            1,
            "bdg",
            3,
            "ngStyle",
          ],
          [
            "d",
            "M3.5 6.5V10H2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2h-1.5V6.5a6.5 6.5 0 1 0-13 0M6 10V6.5a4 4 0 0 1 8 0V10zm2 5.5a2 2 0 1 1 3.1 1.68h-.02l.42 2.57c0 .42-.34.75-.75.75h-1.5a.75.75 0 0 1-.75-.75l.41-2.57A2 2 0 0 1 8 15.5",
          ],
          [2, "margin-left", "8px", "background", "var(--c-b)", 3, "click"],
          ["icon", "location", "width", "11", "height", "11", 3, "color"],
          ["icon", "views", "width", "11", "height", "11", 3, "color"],
          ["icon", "seen", "width", "11", "height", "11", 3, "color"],
          ["icon", "hashtag", "width", "11", "height", "11", 3, "color"],
          [3, "user", "color"],
          [2, "margin-left", "6px"],
          [
            "icon",
            "experience",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin", "0 6px"],
          [
            "icon",
            "doubleleft",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "doubleright",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-right", "6px"],
          [1, "hl"],
          [
            "icon",
            "info",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-left", "5px"],
          [1, "cnt"],
          [1, "gr", 2, "--x", "175px"],
          ["size", "small", 3, "user"],
          [1, "rw", 2, "gap", "5px"],
          [
            2,
            "margin",
            "5px 0 0 0",
            "padding",
            "5px 10px",
            "width",
            "100%",
            3,
            "click",
          ],
          [
            2,
            "margin",
            "5px 0 0 0",
            "padding",
            "5px 10px",
            "width",
            "100%",
            3,
            "routerLink",
          ],
          [3, "onScrolled"],
          ["type", "post", "size", "large", 3, "onComposed"],
          ["type", "reputation", "size", "large", 3, "onComposed", "id"],
          [1, "tr"],
          ["width", "11", "height", "11", "color", "var(--c-c)", 3, "icon"],
          [2, "margin-left", "3px"],
          [
            "icon",
            "topright",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "lnk", 3, "routerLink"],
          [1, "dt"],
          [1, "cnt", 3, "innerHTML"],
          [1, "ints"],
          [1, "int", 3, "click"],
          ["icon", "like", "width", "11", "height", "11", 3, "color"],
          ["icon", "repost", "width", "11", "height", "11", 3, "color"],
          [1, "int", 3, "routerLink"],
          ["icon", "reply", "width", "11", "height", "11", 3, "color"],
          ["icon", "bookmark", "width", "11", "height", "11", 3, "color"],
          [1, "int"],
          [1, "sig", 3, "innerHTML"],
          [3, "attachment"],
          ["icon", "pin", "width", "11", "height", "11", 3, "color"],
          ["icon", "hide", "width", "11", "height", "11", 3, "color"],
          [
            "icon",
            "cross",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
        ],
        template: function (a, n) {
          a & 1 &&
            (o(0, "div", 0),
            l(1, "navbar", 1)(2, "div", 2),
            v(3, qo, 78, 127),
            r()),
            a & 2 &&
              (p(
                "ngStyle",
                n.user() && n.user().id
                  ? _e(5, zn, n.user().color + "38", n.user().color + "da")
                  : oe(8, Un)
              ),
              i(),
              p("user", n.me()),
              i(),
              de(
                "background-image",
                n.user() && n.user().id && n.user().background
                  ? "url(" + n.user().background + ")"
                  : null
              ),
              i(),
              _(n.user() && n.user().id ? 3 : -1));
        },
        dependencies: [K, ee, Q, H, z, O, ce, $, ie, Z, R, X, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var jo = (t, d) => d.id,
  mt = () => [import("./chunk-RHH4XAVI.js").then((t) => t.MediaComponent)],
  Wo = () => [import("./chunk-IGKAPWAB.js").then((t) => t.ComposeComponent)],
  Jo = () => [import("./chunk-LBQ2VAXP.js").then((t) => t.LoaderComponent)],
  Ko = (t, d) => ({ "--c-b": t, "--c-c": d }),
  Yo = () => ({}),
  dt = (t) => ["/", t],
  _t = (t) => ({ "--x": t, "font-size": "16px" }),
  Fe = (t) => ({ "--x": t });
function Qo(t, d) {
  if ((t & 1 && (o(0, "span", 12), m(1), u(2, "numberPipe"), r()), t & 2)) {
    let e = s(2);
    i(), E(h(2, 1, e.post().views, "suffix"));
  }
}
function Xo(t, d) {
  if ((t & 1 && (o(0, "span", 16), m(1), r()), t & 2)) {
    let e = s(2);
    k("glw", e.post().premium),
      p("routerLink", P(5, dt, e.post().username))(
        "ngStyle",
        P(7, _t, e.post().color)
      ),
      i(),
      b("(", e.post().name, ")");
  }
}
function er(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 19),
      u(1, "datePipe"),
      Y(),
      o(2, "svg", 31),
      l(3, "path", 32),
      r()()),
    t & 2)
  ) {
    let e = s(2);
    T("data-title", "Admin (Expires ", h(1, 5, e.post().admin, "long"), ")"),
      i(2),
      k("glw", e.post().premium),
      p("ngStyle", P(8, Fe, e.post().color));
  }
}
function tr(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 19),
      u(1, "datePipe"),
      Y(),
      o(2, "svg", 33),
      l(3, "path", 34),
      r()()),
    t & 2)
  ) {
    let e = s(2);
    T(
      "data-title",
      "Premium (Expires ",
      h(1, 5, e.post().premium, "long"),
      ")"
    ),
      i(2),
      k("glw", e.post().premium),
      p("ngStyle", P(8, Fe, e.post().color));
  }
}
function ir(t, d) {
  if (
    (t & 1 && (o(0, "div", 20), Y(), o(1, "svg", 35), l(2, "path", 36), r()()),
    t & 2)
  ) {
    let e = s(2);
    i(), k("glw", e.post().premium), p("ngStyle", P(3, Fe, e.post().color));
  }
}
function nr(t, d) {
  if ((t & 1 && l(0, "media", 37), t & 2)) {
    let e = s(2);
    p("attachment", e.post().attachment);
  }
}
function or(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 24),
      C("click", function () {
        x(e);
        let n = s(2);
        return g(n.pinPost(n.post().id));
      }),
      l(1, "icons", 38),
      r();
  }
  if (t & 2) {
    let e = s(2);
    i(), p("color", e.post().pinned ? "var(--c-e)" : "var(--c-c)");
  }
}
function rr(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 24),
      C("click", function () {
        x(e);
        let n = s(2);
        return g(n.hidePost(n.post().id));
      }),
      l(1, "icons", 39),
      r();
  }
  if (t & 2) {
    let e = s(2);
    i(), p("color", e.post().hidden ? "var(--c-e)" : "var(--c-c)");
  }
}
function ar(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 24),
      C("click", function () {
        x(e);
        let n = s(2);
        return g(n.deletePost(n.post().id));
      }),
      l(1, "icons", 40),
      r();
  }
}
function lr(t, d) {
  if ((t & 1 && (l(0, "div", 30), u(1, "contentPipe")), t & 2)) {
    let e = s(2);
    p("innerHTML", h(1, 1, e.post().signature, "full"), G);
  }
}
function sr(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "compose", 41),
      C("onComposed", function (n) {
        x(e);
        let c = s(3);
        return g(c.composed(n));
      }),
      r();
  }
  if (t & 2) {
    let e = s(3);
    p("id", e.post().id);
  }
}
function cr(t, d) {
  t & 1 && (v(0, sr, 1, 1), I(1, 0, Wo), F());
}
function pr(t, d) {
  if ((t & 1 && (o(0, "span", 12), m(1), u(2, "numberPipe"), r()), t & 2)) {
    let e = s().$implicit;
    i(), E(h(2, 1, e.views, "suffix"));
  }
}
function mr(t, d) {
  if ((t & 1 && l(0, "media", 37), t & 2)) {
    let e = s().$implicit;
    p("attachment", e.attachment);
  }
}
function dr(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 24),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.hidePost(n.id));
      }),
      l(1, "icons", 39),
      r();
  }
  if (t & 2) {
    let e = s().$implicit;
    i(), p("color", e.hidden ? "var(--c-e)" : "var(--c-c)");
  }
}
function _r(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 24),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.deleteReply(n.id));
      }),
      l(1, "icons", 40),
      r();
  }
}
function ur(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 46),
      l(1, "avatar", 42),
      o(2, "div", 47),
      l(3, "icons", 48),
      r()()),
    t & 2)
  ) {
    let e = s(4);
    i(), p("user", e.post());
  }
}
function hr(t, d) {
  if ((t & 1 && (l(0, "div", 30), u(1, "contentPipe")), t & 2)) {
    let e = s().$implicit;
    p("innerHTML", h(1, 1, e.signature, "full"), G);
  }
}
function fr(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 9)(1, "span", 10),
      l(2, "icons", 11),
      v(3, pr, 3, 4, "span", 12),
      r(),
      l(4, "avatar", 42)(5, "display", 43),
      o(6, "span", 44),
      m(7),
      u(8, "datePipe"),
      r(),
      l(9, "div", 45),
      u(10, "contentPipe"),
      v(11, mr, 1, 1),
      I(12, 11, mt),
      F(),
      o(14, "div", 23)(15, "button", 24),
      C("click", function () {
        let n = x(e).$implicit,
          c = s(3);
        return g(c.likePost(n.id));
      }),
      l(16, "icons", 25),
      m(17),
      u(18, "numberPipe"),
      r(),
      o(19, "button", 24),
      C("click", function () {
        let n = x(e).$implicit,
          c = s(3);
        return g(c.repost(n.id));
      }),
      l(20, "icons", 26),
      m(21),
      u(22, "numberPipe"),
      r(),
      o(23, "button", 24),
      C("click", function () {
        let n = x(e).$implicit,
          c = s(3);
        return g(c.bookmarkPost(n.id));
      }),
      l(24, "icons", 29),
      m(25),
      u(26, "numberPipe"),
      r(),
      v(27, dr, 2, 1, "button", 27)(28, _r, 2, 0, "button", 27)(
        29,
        ur,
        4,
        1,
        "div",
        46
      )(30, hr, 2, 4, "div", 30),
      r()();
  }
  if (t & 2) {
    let e = d.$implicit,
      a = s(3);
    i(2),
      p("icon", e.views ? "views" : "hide"),
      i(),
      _(e.views ? 3 : -1),
      i(),
      p("user", e),
      i(),
      p("user", e)("color", e.color),
      i(2),
      b("\u2022 ", h(8, 17, e.timestamp, "short"), ""),
      i(2),
      p("innerHTML", h(10, 20, e.content, "full"), G),
      i(7),
      p("color", e.liked ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(18, 23, e.likes, "suffix"), ""),
      i(3),
      p("color", e.reposted ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(22, 26, e.reposts, "suffix"), ""),
      i(3),
      p("color", e.bookmarked ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(26, 29, e.bookmarks, "suffix"), ""),
      i(2),
      _(a.me() && a.me().id == e.user_id ? 27 : -1),
      i(),
      _(a.me() && a.me().id == e.user_id ? 28 : -1),
      i(),
      _(e.loved ? 29 : -1),
      i(),
      _(e.signature ? 30 : -1);
  }
}
function Cr(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "loader", 49),
      C("onScrolled", function () {
        x(e);
        let n = s(3);
        return g(n.getReplies());
      }),
      r();
  }
}
function xr(t, d) {
  if (
    (t & 1 &&
      (W(0, fr, 31, 32, "div", 9, jo), v(2, Cr, 1, 0), I(3, 2, Jo), F()),
    t & 2)
  ) {
    let e = s(2);
    J(e.replies());
  }
}
function gr(t, d) {
  if (t & 1) {
    let e = w();
    l(0, "left", 1),
      o(1, "div", 2)(2, "div", 3),
      l(3, "icons", 4),
      m(4, " Post "),
      l(5, "icons", 4),
      m(6),
      u(7, "numberPipe"),
      l(8, "div", 5),
      o(9, "div", 6)(10, "button", 7),
      l(11, "icons", 8),
      r()()(),
      o(12, "div", 9)(13, "span", 10),
      l(14, "icons", 11),
      v(15, Qo, 3, 4, "span", 12),
      r(),
      o(16, "div", 13),
      l(17, "avatar", 14),
      o(18, "div", 15)(19, "span", 16),
      m(20),
      r(),
      v(21, Xo, 2, 9, "span", 17),
      o(22, "span", 18),
      v(23, er, 4, 10, "div", 19)(24, tr, 4, 10, "div", 19)(
        25,
        ir,
        3,
        5,
        "div",
        20
      ),
      r(),
      o(26, "div", 21),
      m(27),
      u(28, "datePipe"),
      r()()(),
      l(29, "div", 22),
      u(30, "contentPipe"),
      v(31, nr, 1, 1),
      I(32, 31, mt),
      F(),
      o(34, "div", 23)(35, "button", 24),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.likePost(n.post().id));
      }),
      l(36, "icons", 25),
      m(37),
      u(38, "numberPipe"),
      r(),
      o(39, "button", 24),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.repost(n.post().id));
      }),
      l(40, "icons", 26),
      m(41),
      u(42, "numberPipe"),
      r(),
      o(43, "button", 27),
      l(44, "icons", 28),
      m(45),
      u(46, "numberPipe"),
      r(),
      o(47, "button", 24),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.bookmarkPost(n.post().id));
      }),
      l(48, "icons", 29),
      m(49),
      u(50, "numberPipe"),
      r(),
      v(51, or, 2, 1, "button", 27)(52, rr, 2, 1, "button", 27)(
        53,
        ar,
        2,
        0,
        "button",
        27
      )(54, lr, 2, 4, "div", 30),
      r()(),
      v(55, cr, 3, 0)(56, xr, 5, 0),
      r(),
      l(57, "right", 1);
  }
  if (t & 2) {
    let e = s();
    p("user", e.me()),
      i(6),
      b(" ", h(7, 32, e.post().replies, "suffix"), " Replies "),
      i(4),
      p("routerLink", e.me() && e.me().id ? "/home" : "/"),
      i(4),
      p("icon", e.post().views ? "views" : "hide"),
      i(),
      _(e.post().views ? 15 : -1),
      i(2),
      p("user", e.post()),
      i(2),
      k("glw", e.post().premium),
      p("routerLink", P(53, dt, e.post().username))(
        "ngStyle",
        P(55, _t, e.post().color)
      ),
      i(),
      b("@", e.post().username, ""),
      i(),
      _(e.post().name ? 21 : -1),
      i(2),
      _(e.post().admin ? 23 : -1),
      i(),
      _(e.post().premium ? 24 : -1),
      i(),
      _(e.post().privacy > 0 ? 25 : -1),
      i(2),
      E(h(28, 35, e.post().timestamp, "long")),
      i(2),
      p("innerHTML", h(30, 38, e.post().content, "full"), G),
      i(7),
      p("color", e.post().liked ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(38, 41, e.post().likes, "suffix"), ""),
      i(3),
      p("color", e.post().reposted ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(42, 44, e.post().reposts, "suffix"), ""),
      i(3),
      p("color", e.post().replied ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(46, 47, e.post().replies, "suffix"), ""),
      i(3),
      p("color", e.post().bookmarked ? "var(--c-e)" : "var(--c-c)"),
      i(),
      b(" ", h(50, 50, e.post().bookmarks, "suffix"), ""),
      i(2),
      _(e.me() && e.me().id == e.post().user_id ? 51 : -1),
      i(),
      _(e.me() && e.me().id == e.post().user_id ? 52 : -1),
      i(),
      _(e.me() && e.me().id == e.post().user_id ? 53 : -1),
      i(),
      _(e.post().signature ? 54 : -1),
      i(),
      _(e.me() && e.me().id ? 55 : -1),
      i(),
      _(e.replies().length > 0 ? 56 : -1),
      i(),
      p("user", e.me());
  }
}
var ut = (() => {
  class t {
    constructor() {
      (this.me = S({})),
        (this.post = S({})),
        (this.replies = S([])),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U)),
        (this.router = y(re)),
        (this.route = y(ue)),
        (this.meta = y(pe));
    }
    ngOnInit() {
      this.getPost();
    }
    ngOnDestroy() {
      this.subscription && this.subscription.unsubscribe();
    }
    getPost() {
      this.subscription = this.route.paramMap.subscribe((e) => {
        let a = { id: e.get("id"), option: "post" };
        this.http
          .post(
            this.client.config("api") + "/view/post",
            a,
            this.client.headers()
          )
          .subscribe({
            next: (n) => {
              n.type == "success" &&
                (this.me.set(n.me),
                this.post.set({}),
                this.replies.set([]),
                this.post.set(n.post),
                this.title.setTitle(`@${this.post().username}'s post`),
                this.meta.addTags([
                  { name: "title", content: `@${this.post().username}'s post` },
                  {
                    name: "og:title",
                    content: `@${this.post().username}'s post`,
                  },
                  {
                    name: "twitter:title",
                    content: `@${this.post().username}'s post`,
                  },
                  {
                    name: "description",
                    content: this.post().content
                      ? this.post().content.length > 200
                        ? this.post()
                            .content.substring(0, 200)
                            .replace(/\s\S*$/, "") + "..."
                        : this.post().content
                      : "",
                  },
                  {
                    name: "og:description",
                    content: this.post().content
                      ? this.post().content.length > 200
                        ? this.post()
                            .content.substring(0, 200)
                            .replace(/\s\S*$/, "") + "..."
                        : this.post().content
                      : "",
                  },
                  { name: "theme-color", content: this.post().color },
                ]),
                this.post().attachment &&
                ["mp4", "avi", "mov"].some((c) =>
                  this.post().attachment.includes(c)
                )
                  ? this.meta.addTags([
                      { name: "og:video", content: this.post().attachment },
                      {
                        name: "og:video:type",
                        content:
                          "video/" + this.post().attachment.split(".").pop(),
                      },
                      { name: "og:type", content: "video" },
                    ])
                  : this.post().attachment &&
                    ["png", "jpg", "jpeg", "gif"].some((c) =>
                      this.post().attachment.includes(c)
                    )
                  ? this.meta.addTags([
                      { name: "og:image", content: this.post().attachment },
                      { name: "twitter:card", content: "summary_large_image" },
                      { name: "og:type", content: "website" },
                    ])
                  : this.meta.addTags([
                      {
                        name: "og:image",
                        content: this.post().avatar
                          ? this.post().avatar
                          : this.client.config("static") + "/images/avatar.png",
                      },
                      { name: "twitter:card", content: "summary" },
                      { name: "og:type", content: "website" },
                    ]),
                this.getReplies());
            },
            error: (n) => {
              this.router.navigate(["/404"]);
            },
          });
      });
    }
    composed(e) {
      this.replies.set([]), this.getReplies();
    }
    likePost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/like",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.replies().length > 0 &&
                this.replies.update((c) =>
                  c.map((f) =>
                    f.id == e
                      ? B(M({}, f), {
                          liked: !f.liked,
                          likes: n.add ? f.likes + 1 : f.likes - 1,
                        })
                      : f
                  )
                ),
              this.post() &&
                this.post().id &&
                this.post.update((c) =>
                  c.id == e
                    ? B(M({}, c), {
                        liked: !c.liked,
                        likes: n.add ? c.likes + 1 : c.likes - 1,
                      })
                    : c
                ));
          },
          error: (n) => {},
        });
    }
    hidePost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/hide",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.replies().length > 0 &&
                this.replies.update((c) =>
                  c.map((f) =>
                    f.id == e ? B(M({}, f), { hidden: !f.hidden }) : M({}, f)
                  )
                ),
              this.post() &&
                this.post().id &&
                this.post.update((c) =>
                  c.id == e ? B(M({}, c), { hidden: !c.hidden }) : M({}, c)
                ));
          },
          error: (n) => {},
        });
    }
    repost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/repost",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.replies().length > 0 &&
                this.replies.update((c) =>
                  c.map((f) =>
                    f.id == e
                      ? B(M({}, f), {
                          reposted: !f.reposted,
                          reposts: n.add ? f.reposts + 1 : f.reposts - 1,
                        })
                      : f
                  )
                ),
              this.post() &&
                this.post().id &&
                this.post.update((c) =>
                  c.id == e
                    ? B(M({}, c), {
                        reposted: !c.reposted,
                        reposts: n.add ? c.reposts + 1 : c.reposts - 1,
                      })
                    : c
                ));
          },
          error: (n) => {},
        });
    }
    bookmarkPost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/bookmark",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.post() &&
                this.post().id &&
                this.post.update((c) =>
                  c.id == e
                    ? B(M({}, c), {
                        bookmarked: !c.bookmarked,
                        bookmarks: n.add ? c.bookmarks + 1 : c.bookmarks - 1,
                      })
                    : c
                ),
              this.replies().length > 0 &&
                this.replies.update((c) =>
                  c.map((f) =>
                    f.id == e
                      ? B(M({}, f), {
                          bookmarked: !f.bookmarked,
                          bookmarks: n.add ? f.bookmarks + 1 : f.bookmarks - 1,
                        })
                      : f
                  )
                ));
          },
          error: (n) => {},
        });
    }
    deleteReply(e) {
      if (
        confirm(
          "This will delete the current reply. This action is irreversible. Would you like to continue?"
        )
      ) {
        let n = { id: e };
        this.http
          .post(
            this.client.config("api") + "/delete/reply",
            n,
            this.client.headers()
          )
          .subscribe({
            next: (c) => {
              c.type == "success" &&
                (this.me.set(c.me),
                this.replies().length > 0 &&
                  this.replies.update((f) => f.filter((V) => V.id != e)));
            },
            error: (c) => {},
          });
      }
    }
    deletePost(e) {
      if (
        confirm(
          "This will delete the current post. This action is irreversible. Would you like to continue?"
        )
      ) {
        let n = { id: e };
        this.http
          .post(
            this.client.config("api") + "/delete/post",
            n,
            this.client.headers()
          )
          .subscribe((c) => {
            c.type == "success" &&
              (this.me.set(c.me),
              this.post.set({}),
              this.replies.set([]),
              this.router.navigate(["/404"]));
          });
      }
    }
    pinPost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/pin",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.replies().length > 0 &&
                this.replies.update((c) =>
                  c.map((f) =>
                    f.id == e
                      ? B(M({}, f), { pinned: !f.pinned })
                      : B(M({}, f), { pinned: !1 })
                  )
                ),
              this.post() &&
                this.post().id &&
                this.post.update((c) =>
                  c.id == e
                    ? B(M({}, c), { pinned: !c.pinned })
                    : B(M({}, c), { pinned: !1 })
                ));
          },
          error: (n) => {},
        });
    }
    getReplies() {
      let e = {
        id: this.post().id,
        cursor:
          this.replies().length > 0 ? this.replies().at(-1).timestamp : null,
        option: "replies",
      };
      this.http
        .post(
          this.client.config("api") + "/view/post",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (this.me.set(a.me),
              this.replies().length > 0
                ? this.replies.update((n) =>
                    [...n, ...a.replies].filter(
                      (c, f, V) =>
                        f ===
                        V.findIndex(
                          (L) => L.id === c.id && L.timestamp === c.timestamp
                        )
                    )
                  )
                : this.replies.set(a.replies));
          },
          error: (a) => {},
        });
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["post"]],
        decls: 3,
        vars: 7,
        consts: [
          [1, "app", 3, "ngStyle"],
          [3, "user"],
          [1, "pg"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [2, "margin-left", "auto"],
          ["data-title", "Go back", 3, "routerLink"],
          [
            "icon",
            "doubleleft",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "cn"],
          [1, "tr"],
          ["width", "11", "height", "11", "color", "var(--c-c)", 3, "icon"],
          [2, "margin-left", "3px"],
          [
            2,
            "display",
            "flex",
            "flex-direction",
            "row",
            "align-items",
            "center",
          ],
          ["size", "large", 3, "user"],
          [2, "text-align", "left", "margin-left", "15px"],
          [1, "un", 3, "routerLink", "ngStyle"],
          [1, "un", 3, "routerLink", "ngStyle", "glw"],
          [2, "display", "inline-flex", "margin-left", "3px"],
          [1, "bdgc"],
          ["data-title", "Private", 1, "bdgc"],
          [1, "dt", 2, "margin", "10px 0px 0px 3px"],
          [
            1,
            "cnt",
            2,
            "padding",
            "10px",
            "margin-top",
            "10px",
            "text-align",
            "left",
            3,
            "innerHTML",
          ],
          [1, "ints"],
          [1, "int", 3, "click"],
          ["icon", "like", "width", "11", "height", "11", 3, "color"],
          ["icon", "repost", "width", "11", "height", "11", 3, "color"],
          [1, "int"],
          ["icon", "reply", "width", "11", "height", "11", 3, "color"],
          ["icon", "bookmark", "width", "11", "height", "11", 3, "color"],
          [1, "sig", 3, "innerHTML"],
          [
            "height",
            "16",
            "width",
            "16",
            "fill",
            "var(--x)",
            "version",
            "1.2",
            "xmlns",
            "http://www.w3.org/2000/svg",
            "viewBox",
            "0 0 256 240.5",
            0,
            "xml",
            "space",
            "preserve",
            1,
            "bdg",
            3,
            "ngStyle",
          ],
          [
            "d",
            "M41 196h174v31H41v-31zM236 59a20 20 0 0 0-18 29l-42 21-38-64a20 20 0 1 0-20 0l-38 64-41-21c2-2 2-5 2-9a20 20 0 1 0-16 20l15 77h176l16-77a20 20 0 0 0 24-20c0-11-9-20-20-20z",
          ],
          [
            "width",
            "16",
            "height",
            "16",
            "fill",
            "var(--x)",
            "viewBox",
            "0 -5.5 56.3 56.3",
            "xmlns",
            "http://www.w3.org/2000/svg",
            1,
            "bdg",
            3,
            "ngStyle",
          ],
          [
            "d",
            "m24 1 2-1H13L0 15h13Zm-8 14h24l-6-8-6-6-8 9ZM0 17l24 25-11-25Zm41 0H15l13 28 12-26Zm-9 25 24-25H44Zm24-27L43 0H31l12 15Z",
          ],
          [
            "height",
            "16",
            "width",
            "16",
            "fill",
            "var(--x)",
            "xmlns",
            "http://www.w3.org/2000/svg",
            "viewBox",
            "-2 0 24 24",
            1,
            "bdg",
            3,
            "ngStyle",
          ],
          [
            "d",
            "M3.5 6.5V10H2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2h-1.5V6.5a6.5 6.5 0 1 0-13 0M6 10V6.5a4 4 0 0 1 8 0V10zm2 5.5a2 2 0 1 1 3.1 1.68h-.02l.42 2.57c0 .42-.34.75-.75.75h-1.5a.75.75 0 0 1-.75-.75l.41-2.57A2 2 0 0 1 8 15.5",
          ],
          [3, "attachment"],
          ["icon", "pin", "width", "11", "height", "11", 3, "color"],
          ["icon", "hide", "width", "11", "height", "11", 3, "color"],
          [
            "icon",
            "cross",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["type", "reply", "size", "large", 3, "onComposed", "id"],
          ["size", "small", 3, "user"],
          [3, "user", "color"],
          [1, "dt"],
          [1, "cnt", 3, "innerHTML"],
          [
            2,
            "display",
            "flex",
            "align-items",
            "center",
            "position",
            "relative",
            "margin-left",
            "3px",
          ],
          [2, "position", "absolute", "right", "0", "bottom", "0"],
          [
            "icon",
            "like",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-e)",
          ],
          [3, "onScrolled"],
        ],
        template: function (a, n) {
          a & 1 && (o(0, "div", 0), l(1, "navbar", 1), v(2, gr, 58, 57), r()),
            a & 2 &&
              (p(
                "ngStyle",
                n.post() && n.post().id
                  ? _e(3, Ko, n.post().color + "38", n.post().color + "da")
                  : oe(6, Yo)
              ),
              i(),
              p("user", n.me()),
              i(),
              _(n.post() && n.post().id ? 2 : -1));
        },
        dependencies: [K, ee, Q, H, z, O, ce, $, ie, Z, R, X, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var ht = (t, d) => d.id,
  vr = () => [import("./chunk-IGKAPWAB.js").then((t) => t.ComposeComponent)],
  ft = () => [import("./chunk-LBQ2VAXP.js").then((t) => t.LoaderComponent)],
  br = () => [import("./chunk-RHH4XAVI.js").then((t) => t.MediaComponent)],
  wr = (t, d) => ({ "--c-b": t, "--c-c": d }),
  Sr = () => ({}),
  yr = (t) => ["/group", t],
  kr = (t) => ({ "--x": t, "font-size": "16px" }),
  Tr = (t) => ["/groupsettings", t];
function Pr(t, d) {
  if ((t & 1 && (o(0, "span", 7), m(1), u(2, "numberPipe"), r()), t & 2)) {
    let e = s(2);
    i(), E(h(2, 1, e.group().views, "suffix"));
  }
}
function Er(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 30),
      C("click", function () {
        x(e);
        let n = s(2);
        return g(n.request(n.group().id));
      }),
      m(1),
      r();
  }
  if (t & 2) {
    let e = s(2);
    i(),
      E(
        e.group().joined ? "Leave" : e.group().requested ? "Cancel" : "Request"
      );
  }
}
function Vr(t, d) {
  if ((t & 1 && (l(0, "div", 13), u(1, "contentPipe")), t & 2)) {
    let e = s(2);
    p("innerHTML", h(1, 1, e.group().description, "full"), G);
  }
}
function Mr(t, d) {
  if ((t & 1 && (o(0, "span", 15), l(1, "display", 31), r()), t & 2)) {
    let e = s(2);
    T("data-title", "Owned by @", e.group().owner.username, ""),
      i(),
      p("user", e.group().owner)("color", e.group().color);
  }
}
function Ir(t, d) {
  if ((t & 1 && (o(0, "button", 28), l(1, "icons", 32), r()), t & 2)) {
    let e = s(2);
    p("routerLink", P(1, Tr, e.group().id));
  }
}
function Fr(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 33),
      C("click", function () {
        x(e);
        let n = s(2);
        return g(n.deleteGroup(n.group().id));
      }),
      l(1, "icons", 34),
      r();
  }
}
function Br(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "compose", 35),
      C("onComposed", function (n) {
        x(e);
        let c = s(4);
        return g(c.composed(n));
      }),
      r();
  }
  if (t & 2) {
    let e = s(4);
    p("id", e.group().id);
  }
}
function Lr(t, d) {
  t & 1 && (v(0, Br, 1, 1), I(1, 0, vr), F());
}
function Dr(t, d) {
  if ((t & 1 && v(0, Lr, 3, 0), t & 2)) {
    let e = s(2);
    _(e.me() && e.me().id && e.group().joined ? 0 : -1);
  }
}
function Or(t, d) {
  if ((t & 1 && (o(0, "span", 7), m(1), u(2, "numberPipe"), r()), t & 2)) {
    let e = s().$implicit;
    i(), E(h(2, 1, e.views, "suffix"));
  }
}
function Hr(t, d) {
  if ((t & 1 && l(0, "media", 43), t & 2)) {
    let e = s().$implicit;
    p("attachment", e.attachment);
  }
}
function $r(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 44),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.hidePost(n.id));
      }),
      l(1, "icons", 45),
      r();
  }
  if (t & 2) {
    let e = s().$implicit;
    i(), p("color", e.hidden ? "var(--c-e)" : "var(--c-c)");
  }
}
function Gr(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 44),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.deleteComment(n.id));
      }),
      l(1, "icons", 34),
      r();
  }
}
function Rr(t, d) {
  if ((t & 1 && (l(0, "div", 42), u(1, "contentPipe")), t & 2)) {
    let e = s().$implicit;
    p("innerHTML", h(1, 1, e.signature, "full"), G);
  }
}
function Nr(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 36)(1, "span", 5),
      l(2, "icons", 6),
      v(3, Or, 3, 4, "span", 7),
      r(),
      l(4, "avatar", 37)(5, "display", 31),
      o(6, "span", 38),
      m(7),
      u(8, "datePipe"),
      r(),
      l(9, "div", 39),
      u(10, "contentPipe"),
      v(11, Hr, 1, 1),
      I(12, 11, br),
      F(),
      o(14, "div", 40),
      v(15, $r, 2, 1, "button", 41)(16, Gr, 2, 0, "button", 41)(
        17,
        Rr,
        2,
        4,
        "div",
        42
      ),
      r()()),
    t & 2)
  ) {
    let e = d.$implicit,
      a = s(3);
    i(2),
      p("icon", e.views ? "views" : "hide"),
      i(),
      _(e.views ? 3 : -1),
      i(),
      p("user", e),
      i(),
      p("user", e)("color", e.color),
      i(2),
      b("\u2022 ", h(8, 10, e.timestamp, "short"), ""),
      i(2),
      p("innerHTML", h(10, 13, e.content, "full"), G),
      i(6),
      _(a.me() && a.me().id == e.user_id ? 15 : -1),
      i(),
      _(
        (a.me() && a.me().id == e.user_id) || a.group().permission > 0 ? 16 : -1
      ),
      i(),
      _(e.signature ? 17 : -1);
  }
}
function Ar(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "loader", 46),
      C("onScrolled", function () {
        x(e);
        let n = s(3);
        return g(n.getComments());
      }),
      r();
  }
}
function zr(t, d) {
  if (
    (t & 1 &&
      (W(0, Nr, 18, 16, "div", 36, ht), v(2, Ar, 1, 0), I(3, 2, ft), F()),
    t & 2)
  ) {
    let e = s(2);
    J(e.comments());
  }
}
function Ur(t, d) {
  if ((t & 1 && (o(0, "span", 47), m(1), r()), t & 2)) {
    let e = s().$implicit;
    i(),
      E(
        e.permission > 0
          ? e.permission == 3
            ? "Owner"
            : e.permission == 2
            ? "Officer"
            : "Enforcer"
          : "Member"
      );
  }
}
function Zr(t, d) {
  t & 1 && (o(0, "span", 47), m(1, "Pending request"), r());
}
function qr(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 49),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.membership(n.id, c.group().id, "kick"));
      }),
      m(1, "Kick"),
      r(),
      o(2, "button", 49),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.membership(n.id, c.group().id, "promote"));
      }),
      m(3, "Promote"),
      r();
  }
}
function jr(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 49),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.membership(n.id, c.group().id, "deny"));
      }),
      m(1, "Deny"),
      r(),
      o(2, "button", 49),
      C("click", function () {
        x(e);
        let n = s().$implicit,
          c = s(3);
        return g(c.membership(n.id, c.group().id, "approve"));
      }),
      m(3, "Approve"),
      r();
  }
}
function Wr(t, d) {
  if ((t & 1 && (o(0, "div", 15), l(1, "icons", 50), m(2), r()), t & 2)) {
    let e = s().$implicit;
    T("data-title", "Currently in ", e.location, ""),
      i(),
      p("color", e.color),
      i(),
      b(" ", e.location, "");
  }
}
function Jr(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 15),
      u(1, "numberPipe"),
      l(2, "icons", 51),
      m(3),
      u(4, "numberPipe"),
      r()),
    t & 2)
  ) {
    let e = s().$implicit;
    T("data-title", "", h(1, 4, e.views, "suffix"), " Views"),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(4, 7, e.views, "suffix"), "");
  }
}
function Kr(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 15),
      u(1, "datePipe"),
      l(2, "icons", 52),
      m(3),
      u(4, "datePipe"),
      r()),
    t & 2)
  ) {
    let e = s().$implicit;
    T("data-title", "Last seen ", h(1, 4, e.seen, "long"), ""),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(4, 7, e.seen, "short"), "");
  }
}
function Yr(t, d) {
  if ((t & 1 && (o(0, "div", 15), l(1, "icons", 21), m(2), r()), t & 2)) {
    let e = s().$implicit;
    T("data-title", "Member of #", e.group.tag, ""),
      i(),
      p("color", e.color),
      i(),
      b(" ", e.group.tag, "");
  }
}
function Qr(t, d) {
  if ((t & 1 && (o(0, "div", 15), l(1, "display", 31), r()), t & 2)) {
    let e = s().$implicit;
    T("data-title", "Invited by @", e.inviter.username, ""),
      i(),
      p("user", e.inviter)("color", e.color);
  }
}
function Xr(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 36),
      l(1, "avatar", 37)(2, "display", 31),
      v(3, Ur, 2, 1, "span", 47)(4, Zr, 2, 0, "span", 47)(5, qr, 4, 0)(
        6,
        jr,
        4,
        0
      ),
      o(7, "div", 48)(8, "div", 15),
      u(9, "numberPipe"),
      l(10, "icons", 16),
      m(11),
      u(12, "numberPipe"),
      r(),
      v(13, Wr, 3, 4, "div", 15)(14, Jr, 5, 10, "div", 15),
      o(15, "div", 15),
      u(16, "datePipe"),
      l(17, "icons", 17),
      m(18),
      u(19, "datePipe"),
      r(),
      v(20, Kr, 5, 10, "div", 15)(21, Yr, 3, 4, "div", 15)(
        22,
        Qr,
        2,
        4,
        "div",
        15
      ),
      r()()),
    t & 2)
  ) {
    let e = d.$implicit,
      a = s(3);
    i(),
      p("user", e),
      i(),
      p("user", e)("color", e.color),
      i(),
      _(a.usersOpt() == "members" ? 3 : -1),
      i(),
      _(a.usersOpt() == "requests" ? 4 : -1),
      i(),
      _(
        a.usersOpt() == "members" &&
          a.me() &&
          a.me().id &&
          a.me().id != e.id &&
          a.group().permission > 0
          ? 5
          : -1
      ),
      i(),
      _(
        a.usersOpt() == "requests" &&
          a.me() &&
          a.me().id &&
          a.me().id != e.id &&
          a.group().permission > 0
          ? 6
          : -1
      ),
      i(2),
      T("data-title", "User #", h(9, 20, e.uuid, "suffix"), ""),
      i(2),
      p("color", e.color),
      i(),
      b(" #", h(12, 23, e.uuid, "suffix"), ""),
      i(2),
      _(e.location ? 13 : -1),
      i(),
      _(e.views ? 14 : -1),
      i(),
      T("data-title", "Joined ", h(16, 26, e.timestamp, "long"), ""),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(19, 29, e.timestamp, "minimal"), ""),
      i(2),
      _(e.seen ? 20 : -1),
      i(),
      _(e.group ? 21 : -1),
      i(),
      _(e.inviter ? 22 : -1);
  }
}
function ea(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "loader", 46),
      C("onScrolled", function () {
        x(e);
        let n = s(3);
        return g(n.getUsers());
      }),
      r();
  }
}
function ta(t, d) {
  if (
    (t & 1 &&
      (W(0, Xr, 23, 32, "div", 36, ht), v(2, ea, 1, 0), I(3, 2, ft), F()),
    t & 2)
  ) {
    let e = s(2);
    J(e.users());
  }
}
function ia(t, d) {
  if (t & 1) {
    let e = w();
    l(0, "left", 1),
      o(1, "div", 3)(2, "div", 4)(3, "span", 5),
      l(4, "icons", 6),
      v(5, Pr, 3, 4, "span", 7),
      r(),
      o(6, "div", 8),
      l(7, "avatar", 9),
      o(8, "div", 10)(9, "span", 11),
      m(10),
      r(),
      v(11, Er, 2, 1, "button", 12),
      r()(),
      v(12, Vr, 2, 4, "div", 13),
      o(13, "div", 14)(14, "span", 15),
      u(15, "numberPipe"),
      l(16, "icons", 16),
      m(17),
      u(18, "numberPipe"),
      r(),
      o(19, "span", 15),
      u(20, "datePipe"),
      l(21, "icons", 17),
      m(22),
      u(23, "datePipe"),
      r(),
      o(24, "span", 15),
      u(25, "numberPipe"),
      l(26, "icons", 18),
      m(27),
      u(28, "numberPipe"),
      r(),
      o(29, "span", 15),
      u(30, "numberPipe"),
      l(31, "icons", 19),
      m(32),
      u(33, "numberPipe"),
      r(),
      o(34, "span", 15),
      u(35, "numberPipe"),
      l(36, "icons", 20),
      m(37),
      u(38, "numberPipe"),
      r(),
      o(39, "span", 15),
      l(40, "icons", 21),
      m(41),
      r(),
      o(42, "span", 15),
      l(43, "icons", 22),
      m(44),
      r(),
      v(45, Mr, 2, 4, "span", 15),
      r()(),
      o(46, "div", 23)(47, "button", 24),
      u(48, "numberPipe"),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updateCommentsOpt("comments"));
      }),
      l(49, "icons", 25),
      m(50),
      u(51, "numberPipe"),
      r(),
      o(52, "button", 24),
      u(53, "numberPipe"),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updateUsersOpt("members"));
      }),
      l(54, "icons", 26),
      m(55),
      u(56, "numberPipe"),
      r(),
      o(57, "button", 24),
      u(58, "numberPipe"),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updateUsersOpt("requests"));
      }),
      l(59, "icons", 27),
      m(60),
      u(61, "numberPipe"),
      r(),
      v(62, Ir, 2, 3, "button", 28)(63, Fr, 2, 0, "button", 29),
      r(),
      v(64, Dr, 1, 1)(65, zr, 5, 0)(66, ta, 5, 0),
      r(),
      l(67, "right", 1);
  }
  if (t & 2) {
    let e = s();
    p("user", e.me()),
      i(2),
      de(
        "background-image",
        e.group().banner ? "url(" + e.group().banner + ")" : null
      ),
      i(2),
      p("icon", e.group().views ? "views" : "hide"),
      i(),
      _(e.group().views ? 5 : -1),
      i(2),
      p("user", e.group()),
      i(2),
      k("glw", e.group().owner.premium),
      p("routerLink", P(111, yr, e.group().vanity))(
        "ngStyle",
        P(113, kr, e.group().color)
      ),
      i(),
      E(e.group().name),
      i(),
      _(e.me() && e.me().id && e.me().id != e.group().owner.user_id ? 11 : -1),
      i(),
      _(e.group().description ? 12 : -1),
      i(2),
      T("data-title", "Group #", h(15, 63, e.group().uuid, "suffix"), ""),
      i(2),
      p("color", e.group().color),
      i(),
      b(" #", h(18, 66, e.group().uuid, "suffix"), ""),
      i(2),
      T("data-title", "Created ", h(20, 69, e.group().timestamp, "long"), ""),
      i(2),
      p("color", e.group().color),
      i(),
      b(" ", h(23, 72, e.group().timestamp, "minimal"), ""),
      i(2),
      T("data-title", "", h(25, 75, e.group().members, "suffix"), " Members"),
      i(2),
      p("color", e.group().color),
      i(),
      b(" ", h(28, 78, e.group().members, "suffix"), ""),
      i(2),
      T("data-title", "", h(30, 81, e.group().requests, "suffix"), " Requests"),
      i(2),
      p("color", e.group().color),
      i(),
      b(" ", h(33, 84, e.group().requests, "suffix"), ""),
      i(2),
      T("data-title", "", h(35, 87, e.group().comments, "suffix"), " Comments"),
      i(2),
      p("color", e.group().color),
      i(),
      b(" ", h(38, 90, e.group().comments, "suffix"), ""),
      i(2),
      T("data-title", "Tag #", e.group().tag, ""),
      i(),
      p("color", e.group().color),
      i(),
      b(" ", e.group().tag, ""),
      i(),
      T("data-title", "Vanity /", e.group().vanity, ""),
      i(),
      p("color", e.group().color),
      i(),
      b(" /", e.group().vanity, ""),
      i(),
      _(e.group().owner ? 45 : -1),
      i(2),
      k("act", e.commentOpt() == "comments"),
      T("data-title", "", h(48, 93, e.group().comments, "suffix"), " Comments"),
      i(3),
      E(h(51, 96, e.group().comments, "suffix")),
      i(2),
      k("act", e.usersOpt() == "members"),
      T("data-title", "", h(53, 99, e.group().members, "suffix"), " Members"),
      i(3),
      E(h(56, 102, e.group().members, "suffix")),
      i(2),
      k("act", e.usersOpt() == "requests"),
      T(
        "data-title",
        "",
        h(58, 105, e.group().requests, "suffix"),
        " Requests"
      ),
      i(3),
      E(h(61, 108, e.group().requests, "suffix")),
      i(2),
      _(e.me() && e.me().id && e.me().id == e.group().owner.user_id ? 62 : -1),
      i(),
      _(e.me() && e.me().id && e.me().id == e.group().owner.user_id ? 63 : -1),
      i(),
      _(e.commentOpt() == "comments" ? 64 : -1),
      i(),
      _(e.comments().length > 0 ? 65 : -1),
      i(),
      _(e.users().length > 0 ? 66 : -1),
      i(),
      p("user", e.me());
  }
}
var Ct = (() => {
  class t {
    constructor() {
      (this.me = S({})),
        (this.usersOpt = S("")),
        (this.commentOpt = S("comments")),
        (this.group = S({})),
        (this.users = S([])),
        (this.comments = S([])),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U)),
        (this.router = y(re)),
        (this.route = y(ue)),
        (this.meta = y(pe));
    }
    ngOnInit() {
      this.getGroup();
    }
    ngOnDestroy() {
      this.subscription && this.subscription.unsubscribe();
    }
    getGroup() {
      this.subscription = this.route.paramMap.subscribe((e) => {
        let a = { vanity: e.get("vanity") };
        this.http
          .post(
            this.client.config("api") + "/view/group",
            a,
            this.client.headers()
          )
          .subscribe({
            next: (n) => {
              n.type == "success" &&
                (this.me.set(n.me),
                this.usersOpt.set(""),
                this.commentOpt.set("comments"),
                this.group.set({}),
                this.users.set([]),
                this.comments.set([]),
                this.group.set(n.group),
                this.title.setTitle(
                  `${this.group().name} (${this.group().tag})`
                ),
                this.meta.addTags([
                  {
                    name: "title",
                    content: `${this.group().name} (${this.group().tag})`,
                  },
                  {
                    name: "og:title",
                    content: `${this.group().name} (${this.group().tag})`,
                  },
                  {
                    name: "twitter:title",
                    content: `${this.group().name} (${this.group().tag})`,
                  },
                  {
                    name: "description",
                    content: this.group().description
                      ? this.group().description.length > 200
                        ? this.group()
                            .description.substring(0, 200)
                            .replace(/\s\S*$/, "") + "..."
                        : this.group().description
                      : "",
                  },
                  {
                    name: "og:description",
                    content: this.group().description
                      ? this.group().description.length > 200
                        ? this.group()
                            .description.substring(0, 200)
                            .replace(/\s\S*$/, "") + "..."
                        : this.group().description
                      : "",
                  },
                  { name: "theme-color", content: this.group().color },
                  {
                    name: "og:image",
                    content: this.group().avatar
                      ? this.group().avatar
                      : this.client.config("static") + "/images/avatar.png",
                  },
                  { name: "twitter:card", content: "summary" },
                  { name: "og:type", content: "website" },
                ]),
                this.getComments());
            },
            error: (n) => {
              this.router.navigate(["/404"]);
            },
          });
      });
    }
    updateUsersOpt(e) {
      this.usersOpt() != e &&
        (this.users.set([]),
        this.comments.set([]),
        this.usersOpt.set(e),
        this.commentOpt.set(""),
        this.getUsers());
    }
    updateCommentsOpt(e) {
      this.commentOpt() != e &&
        (this.users.set([]),
        this.comments.set([]),
        this.commentOpt.set(e),
        this.usersOpt.set(""),
        this.getComments());
    }
    composed(e) {
      this.users.set([]),
        this.comments.set([]),
        this.commentOpt.set("comments"),
        this.usersOpt.set(""),
        this.getComments();
    }
    hidePost(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/hide",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.comments().length > 0 &&
                this.comments.update((c) =>
                  c.map((f) =>
                    f.id == e ? B(M({}, f), { hidden: !f.hidden }) : M({}, f)
                  )
                ));
          },
          error: (n) => {},
        });
    }
    getUsers() {
      let e = {
        cursor: this.users().length > 0 ? this.users().at(-1).timestamp : null,
        group: this.group().id,
        option: this.usersOpt(),
      };
      this.http
        .post(
          this.client.config("api") + "/view/members",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (this.me.set(a.me),
              this.users().length > 0
                ? this.users.update((n) =>
                    [...n, ...a.users].filter(
                      (c, f, V) =>
                        f ===
                        V.findIndex(
                          (L) => L.id === c.id && L.timestamp === c.timestamp
                        )
                    )
                  )
                : this.users.set(a.users));
          },
          error: (a) => {},
        });
    }
    getComments() {
      let e = {
        cursor:
          this.comments().length > 0 ? this.comments().at(-1).timestamp : null,
        group: this.group().id,
      };
      this.http
        .post(
          this.client.config("api") + "/view/comments",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (this.me.set(a.me),
              this.comments().length > 0
                ? this.comments.update((n) =>
                    [...n, ...a.comments].filter(
                      (c, f, V) =>
                        f ===
                        V.findIndex(
                          (L) => L.id === c.id && L.timestamp === c.timestamp
                        )
                    )
                  )
                : this.comments.set(a.comments));
          },
          error: (a) => {},
        });
    }
    deleteComment(e) {
      if (
        confirm(
          "This will delete the current comment. This action is irreversible. Would you like to continue?"
        )
      ) {
        let n = { id: e };
        this.http
          .post(
            this.client.config("api") + "/delete/comment",
            n,
            this.client.headers()
          )
          .subscribe({
            next: (c) => {
              c.type == "success" &&
                (this.me.set(c.me),
                this.comments().length > 0 &&
                  this.comments.update((f) => f.filter((V) => V.id != e)));
            },
            error: (c) => {},
          });
      }
    }
    deleteGroup(e) {
      if (
        confirm(
          "This will delete the current group. This action is irreversible. Would you like to continue?"
        )
      ) {
        let n = { group: e };
        this.http
          .post(
            this.client.config("api") + "/delete/group",
            n,
            this.client.headers()
          )
          .subscribe((c) => {
            c.type == "success" &&
              (this.me.set(c.me),
              this.group.set({}),
              this.users.set([]),
              this.comments.set([]),
              this.router.navigate(["/404"]));
          });
      }
    }
    request(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/request",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.group() &&
                this.group().id == e &&
                this.group.update((c) => B(M({}, c), { requested: n.add })));
          },
          error: (n) => {},
        });
    }
    membership(e, a, n) {
      let c = { id: e, group: a, option: n };
      this.http
        .post(
          this.client.config("api") + "/create/membership",
          c,
          this.client.headers()
        )
        .subscribe({
          next: (f) => {
            f.type == "success" &&
              (this.me.set(f.me),
              this.users().length > 0 &&
                n != "promote" &&
                this.users.update((V) => V.filter((L) => L.id != e)),
              this.users().length > 0 &&
                n == "promote" &&
                this.users.update((V) =>
                  V.map((L) =>
                    L.id == e ? B(M({}, L), { permission: f.permission }) : L
                  )
                ));
          },
          error: (f) => {},
        });
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["group"]],
        decls: 4,
        vars: 9,
        consts: [
          [1, "app", 3, "ngStyle"],
          [3, "user"],
          [1, "bg"],
          [1, "pg"],
          [1, "bn"],
          [1, "tr"],
          ["width", "11", "height", "11", "color", "var(--c-c)", 3, "icon"],
          [2, "margin-left", "3px"],
          [
            2,
            "display",
            "flex",
            "flex-direction",
            "row",
            "align-items",
            "center",
          ],
          ["size", "large", 3, "user"],
          [2, "text-align", "left", "margin-left", "15px"],
          [1, "un", 3, "routerLink", "ngStyle"],
          [2, "margin-left", "8px", "background", "var(--c-b)"],
          [
            1,
            "cnt",
            2,
            "padding",
            "10px",
            "margin-top",
            "10px",
            "text-align",
            "left",
            3,
            "innerHTML",
          ],
          [
            2,
            "display",
            "flex",
            "flex-direction",
            "row",
            "flex-wrap",
            "wrap",
            "margin",
            "10px 0 0",
          ],
          [1, "bx", 2, "margin", "8px 4px 0 0"],
          ["icon", "user", "width", "11", "height", "11", 3, "color"],
          ["icon", "calendar", "width", "11", "height", "11", 3, "color"],
          ["icon", "users", "width", "11", "height", "11", 3, "color"],
          ["icon", "pending", "width", "11", "height", "11", 3, "color"],
          ["icon", "comment", "width", "11", "height", "11", 3, "color"],
          ["icon", "hashtag", "width", "11", "height", "11", 3, "color"],
          ["icon", "link", "width", "11", "height", "11", 3, "color"],
          [1, "rw"],
          [1, "ev", 2, "width", "100%", "font-size", "10px", 3, "click"],
          [
            "icon",
            "comment",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "users",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "pending",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "data-title",
            "Group settings",
            1,
            "ev",
            2,
            "width",
            "100%",
            "font-size",
            "10px",
            3,
            "routerLink",
          ],
          [
            "data-title",
            "Delete group",
            1,
            "ev",
            2,
            "width",
            "100%",
            "font-size",
            "10px",
          ],
          [2, "margin-left", "8px", "background", "var(--c-b)", 3, "click"],
          [3, "user", "color"],
          [
            "icon",
            "gear",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "data-title",
            "Delete group",
            1,
            "ev",
            2,
            "width",
            "100%",
            "font-size",
            "10px",
            3,
            "click",
          ],
          [
            "icon",
            "cross",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["type", "comment", "size", "large", 3, "onComposed", "id"],
          [1, "cn"],
          ["size", "small", 3, "user"],
          [1, "dt"],
          [1, "cnt", 3, "innerHTML"],
          [1, "ints"],
          [1, "int"],
          [1, "sig", 3, "innerHTML"],
          [3, "attachment"],
          [1, "int", 3, "click"],
          ["icon", "hide", "width", "11", "height", "11", 3, "color"],
          [3, "onScrolled"],
          [1, "bi", 2, "margin-left", "5px", "vertical-align", "middle"],
          [1, "ints", 2, "margin-top", "10px"],
          [
            2,
            "margin",
            "0 5px",
            "padding",
            "5px 10px",
            "float",
            "right",
            3,
            "click",
          ],
          ["icon", "location", "width", "11", "height", "11", 3, "color"],
          ["icon", "views", "width", "11", "height", "11", 3, "color"],
          ["icon", "seen", "width", "11", "height", "11", 3, "color"],
        ],
        template: function (a, n) {
          a & 1 &&
            (o(0, "div", 0),
            l(1, "navbar", 1)(2, "div", 2),
            v(3, ia, 68, 115),
            r()),
            a & 2 &&
              (p(
                "ngStyle",
                n.group() && n.group().id
                  ? _e(5, wr, n.group().color + "38", n.group().color + "da")
                  : oe(8, Sr)
              ),
              i(),
              p("user", n.me()),
              i(),
              de(
                "background-image",
                n.group() && n.group().id && n.group().background
                  ? "url(" + n.group().background + ")"
                  : null
              ),
              i(),
              _(n.group() && n.group().id ? 3 : -1));
        },
        dependencies: [K, ee, Q, H, z, O, ce, $, ie, Z, R, X, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var na = (t, d) => d.id,
  oa = () => [import("./chunk-LBQ2VAXP.js").then((t) => t.LoaderComponent)],
  ra = () => [import("./chunk-RHH4XAVI.js").then((t) => t.MediaComponent)],
  aa = (t) => ["/file", t];
function la(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 9)(1, "input", 12),
      C("ngModelChange", function (n) {
        x(e);
        let c = s(2);
        return g(c.currentPassword.set(n));
      }),
      r(),
      o(2, "button", 13),
      C("click", function () {
        x(e);
        let n = s(2);
        return g(n.createSharex());
      }),
      m(3, "Sharex"),
      r()();
  }
  if (t & 2) {
    let e = s(2);
    i(), p("ngModel", e.currentPassword());
  }
}
function sa(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 11)(1, "div", 14),
      l(2, "icons", 15),
      o(3, "span", 16),
      m(4, "Information"),
      r()(),
      o(5, "div", 17),
      m(6),
      r()()),
    t & 2)
  ) {
    let e = s(2);
    i(6), E(e.response());
  }
}
function ca(t, d) {
  if ((t & 1 && (o(0, "span", 20), m(1), u(2, "numberPipe"), r()), t & 2)) {
    let e = s().$implicit;
    i(), E(h(2, 1, e.views, "suffix"));
  }
}
function pa(t, d) {
  if ((t & 1 && l(0, "media", 33), t & 2)) {
    let e = s().$implicit;
    p("attachment", e.url);
  }
}
function ma(t, d) {
  if ((t & 1 && (l(0, "div", 32), u(1, "contentPipe")), t & 2)) {
    let e = s().$implicit;
    p("innerHTML", h(1, 1, e.signature, "full"), G);
  }
}
function da(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 11)(1, "span", 18),
      l(2, "icons", 19),
      v(3, ca, 3, 4, "span", 20),
      r(),
      o(4, "div", 14),
      l(5, "icons", 21),
      o(6, "span", 16),
      m(7),
      u(8, "numberPipe"),
      r()(),
      l(9, "avatar", 22)(10, "display", 23),
      o(11, "span", 24),
      m(12),
      u(13, "datePipe"),
      r(),
      v(14, pa, 1, 1),
      I(15, 14, ra),
      F(),
      o(17, "div", 25)(18, "a", 26),
      l(19, "icons", 27),
      r(),
      o(20, "button", 28),
      l(21, "icons", 29),
      r(),
      o(22, "button", 30),
      C("click", function () {
        let n = x(e).$implicit,
          c = s(3);
        return g(c.deleteFile(n.id));
      }),
      l(23, "icons", 31),
      r(),
      v(24, ma, 2, 4, "div", 32),
      r()();
  }
  if (t & 2) {
    let e = d.$implicit;
    i(2),
      p("icon", e.views ? "views" : "hide"),
      i(),
      _(e.views ? 3 : -1),
      i(4),
      E(h(8, 10, e.bytes, "bytes")),
      i(2),
      p("user", e),
      i(),
      p("user", e)("color", e.color),
      i(2),
      b("\u2022 ", h(13, 13, e.timestamp, "short"), ""),
      i(6),
      p("href", e.url, he),
      i(2),
      p("routerLink", P(16, aa, e.id)),
      i(4),
      _(e.signature ? 24 : -1);
  }
}
function _a(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "loader", 34),
      C("onScrolled", function () {
        x(e);
        let n = s(3);
        return g(n.getFiles());
      }),
      r();
  }
}
function ua(t, d) {
  if (
    (t & 1 &&
      (W(0, da, 25, 18, "div", 11, na), v(2, _a, 1, 0), I(3, 2, oa), F()),
    t & 2)
  ) {
    let e = s(2);
    J(e.files());
  }
}
function ha(t, d) {
  if (t & 1) {
    let e = w();
    l(0, "left", 1),
      o(1, "div", 2)(2, "div", 3),
      l(3, "icons", 4),
      m(4),
      u(5, "numberPipe"),
      l(6, "icons", 4),
      m(7),
      u(8, "numberPipe"),
      l(9, "icons", 4),
      m(10),
      l(11, "div", 5),
      o(12, "div", 6)(13, "button", 7),
      l(14, "icons", 8),
      r()()(),
      o(15, "div", 9)(16, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updateFileOpt("screenshot"));
      }),
      m(17, "Screenshots"),
      r(),
      o(18, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updateFileOpt("upload"));
      }),
      m(19, "Uploads"),
      r(),
      o(20, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updateFileOpt("attachment"));
      }),
      m(21, "Attachments"),
      r()(),
      v(22, la, 4, 1, "div", 9)(23, sa, 7, 1, "div", 11)(24, ua, 5, 0),
      r(),
      l(25, "right", 1);
  }
  if (t & 2) {
    let e = s();
    p("user", e.me()),
      i(4),
      b(" ", h(5, 14, e.amount(), "suffix"), " Files "),
      i(3),
      b(" ", h(8, 17, e.size(), "bytes"), " "),
      i(3),
      b(
        " ",
        e.fileOpt() == "screenshot"
          ? "Screenshots"
          : e.fileOpt() == "upload"
          ? "Uploads"
          : "Attachments",
        " "
      ),
      i(6),
      k("act", e.fileOpt() == "screenshot"),
      i(2),
      k("act", e.fileOpt() == "upload"),
      i(2),
      k("act", e.fileOpt() == "attachment"),
      i(2),
      _(e.fileOpt() == "screenshot" ? 22 : -1),
      i(),
      _(e.response() ? 23 : -1),
      i(),
      _(e.files().length > 0 ? 24 : -1),
      i(),
      p("user", e.me());
  }
}
var xt = (() => {
  class t {
    constructor() {
      (this.me = S({})),
        (this.files = S([])),
        (this.fileOpt = S("screenshot")),
        (this.amount = S(0)),
        (this.size = S(0)),
        (this.response = S("")),
        (this.currentPassword = S("")),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U));
    }
    ngOnInit() {
      this.title.setTitle("Files"), this.getFiles();
    }
    getFiles() {
      let e = {
        cursor: this.files().length > 0 ? this.files().at(-1).timestamp : null,
        option: this.fileOpt(),
      };
      this.http
        .post(
          this.client.config("api") + "/view/files",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (this.me.set(a.me),
              this.files().length > 0
                ? this.files.update((n) =>
                    [...n, ...a.files].filter(
                      (c, f, V) =>
                        f ===
                        V.findIndex(
                          (L) => L.id === c.id && L.timestamp === c.timestamp
                        )
                    )
                  )
                : this.files.set(a.files),
              this.amount.set(a.amount),
              this.size.set(a.size));
          },
          error: (a) => {},
        });
    }
    updateFileOpt(e) {
      this.fileOpt() != e &&
        (this.files.set([]),
        this.amount.set(0),
        this.size.set(0),
        this.fileOpt.set(e),
        this.getFiles());
    }
    deleteFile(e) {
      if (
        confirm(
          "This will delete the current file. This action is irreversible. Would you like to continue?"
        )
      ) {
        let n = { id: e };
        this.http
          .post(
            this.client.config("api") + "/delete/file",
            n,
            this.client.headers()
          )
          .subscribe({
            next: (c) => {
              c.type == "success" &&
                (this.me.set(c.me),
                this.size.update(
                  (f) => f - this.files().find((V) => V.id == e).bytes
                ),
                this.files().length > 0 &&
                  this.files.update((f) => f.filter((V) => V.id != e)),
                this.amount.update((f) => f - 1));
            },
            error: (c) => {},
          });
      }
    }
    createSharex() {
      let e = { verifypassword: this.currentPassword() };
      this.http
        .post(this.client.config("api") + "/file/sharex", e, {
          withCredentials: !0,
          responseType: "blob",
        })
        .subscribe({
          next: (a) => {
            let n = window.URL.createObjectURL(a),
              c = document.createElement("a");
            (c.href = n),
              (c.download = "sharex.sxcu"),
              document.body.appendChild(c),
              c.click(),
              document.body.removeChild(c),
              window.URL.revokeObjectURL(n);
          },
          error: (a) => {
            this.response.set("Invalid login");
          },
        });
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["files"]],
        decls: 3,
        vars: 2,
        consts: [
          [1, "app"],
          [3, "user"],
          [1, "pg"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [2, "margin-left", "auto"],
          ["data-title", "Go back", "routerLink", "/home"],
          [
            "icon",
            "doubleleft",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "rw"],
          [2, "width", "100%", 3, "click"],
          [1, "cn"],
          [
            "type",
            "password",
            "placeholder",
            "Current Password",
            3,
            "ngModelChange",
            "ngModel",
          ],
          [2, "width", "auto", 3, "click"],
          [1, "hl"],
          [
            "icon",
            "info",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-left", "5px"],
          [1, "cnt"],
          [1, "tr"],
          ["width", "11", "height", "11", "color", "var(--c-c)", 3, "icon"],
          [2, "margin-left", "3px"],
          [
            "icon",
            "topright",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["size", "small", 3, "user"],
          [3, "user", "color"],
          [1, "dt"],
          [1, "ints"],
          ["target", "_blank", 1, "int", 3, "href"],
          [
            "icon",
            "cursor",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "int", 3, "routerLink"],
          [
            "icon",
            "share",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "int", 3, "click"],
          [
            "icon",
            "cross",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "sig", 3, "innerHTML"],
          [3, "attachment"],
          [3, "onScrolled"],
        ],
        template: function (a, n) {
          a & 1 && (o(0, "div", 0), l(1, "navbar", 1), v(2, ha, 26, 20), r()),
            a & 2 &&
              (i(), p("user", n.me()), i(), _(n.me() && n.me().id ? 2 : -1));
        },
        dependencies: [K, ee, Q, H, z, O, $, ae, le, se, ie, Z, R, X, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var fa = () => [import("./chunk-RHH4XAVI.js").then((t) => t.MediaComponent)],
  Ca = (t, d) => ({ "--c-b": t, "--c-c": d }),
  xa = () => ({}),
  gt = (t) => ["/", t],
  vt = (t) => ({ "--x": t, "font-size": "16px" }),
  ga = (t) => ["/file", t],
  Be = (t) => ({ "--x": t });
function va(t, d) {
  if ((t & 1 && (o(0, "span", 12), m(1), u(2, "numberPipe"), r()), t & 2)) {
    let e = s(2);
    i(), E(h(2, 1, e.file().views, "suffix"));
  }
}
function ba(t, d) {
  if ((t & 1 && (o(0, "span", 16), m(1), r()), t & 2)) {
    let e = s(2);
    k("glw", e.file().premium),
      p("routerLink", P(5, gt, e.file().username))(
        "ngStyle",
        P(7, vt, e.file().color)
      ),
      i(),
      b("(", e.file().name, ")");
  }
}
function wa(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 19),
      u(1, "datePipe"),
      Y(),
      o(2, "svg", 29),
      l(3, "path", 30),
      r()()),
    t & 2)
  ) {
    let e = s(2);
    T("data-title", "Admin (Expires ", h(1, 5, e.file().admin, "long"), ")"),
      i(2),
      k("glw", e.file().premium),
      p("ngStyle", P(8, Be, e.file().color));
  }
}
function Sa(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 19),
      u(1, "datePipe"),
      Y(),
      o(2, "svg", 31),
      l(3, "path", 32),
      r()()),
    t & 2)
  ) {
    let e = s(2);
    T(
      "data-title",
      "Premium (Expires ",
      h(1, 5, e.file().premium, "long"),
      ")"
    ),
      i(2),
      k("glw", e.file().premium),
      p("ngStyle", P(8, Be, e.file().color));
  }
}
function ya(t, d) {
  if (
    (t & 1 && (o(0, "div", 20), Y(), o(1, "svg", 33), l(2, "path", 34), r()()),
    t & 2)
  ) {
    let e = s(2);
    i(), k("glw", e.file().premium), p("ngStyle", P(3, Be, e.file().color));
  }
}
function ka(t, d) {
  if ((t & 1 && l(0, "media", 35), t & 2)) {
    let e = s(2);
    p("attachment", e.file().url);
  }
}
function Ta(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 36),
      C("click", function () {
        x(e);
        let n = s(2);
        return g(n.deleteFile(n.file().id));
      }),
      l(1, "icons", 37),
      r();
  }
}
function Pa(t, d) {
  if ((t & 1 && (l(0, "div", 28), u(1, "contentPipe")), t & 2)) {
    let e = s(2);
    p("innerHTML", h(1, 1, e.file().signature, "full"), G);
  }
}
function Ea(t, d) {
  if (
    (t & 1 &&
      (l(0, "left", 1),
      o(1, "div", 2)(2, "div", 3),
      l(3, "icons", 4),
      m(4, " File "),
      l(5, "icons", 4),
      m(6),
      u(7, "numberPipe"),
      l(8, "div", 5),
      o(9, "div", 6)(10, "button", 7),
      l(11, "icons", 8),
      r()()(),
      o(12, "div", 9)(13, "span", 10),
      l(14, "icons", 11),
      v(15, va, 3, 4, "span", 12),
      r(),
      o(16, "div", 13),
      l(17, "avatar", 14),
      o(18, "div", 15)(19, "span", 16),
      m(20),
      r(),
      v(21, ba, 2, 9, "span", 17),
      o(22, "span", 18),
      v(23, wa, 4, 10, "div", 19)(24, Sa, 4, 10, "div", 19)(
        25,
        ya,
        3,
        5,
        "div",
        20
      ),
      r(),
      o(26, "div", 21),
      m(27),
      u(28, "datePipe"),
      r()()(),
      v(29, ka, 1, 1),
      I(30, 29, fa),
      F(),
      o(32, "div", 22)(33, "a", 23),
      l(34, "icons", 24),
      r(),
      o(35, "button", 25),
      l(36, "icons", 26),
      r(),
      v(37, Ta, 2, 0, "button", 27)(38, Pa, 2, 4, "div", 28),
      r()()(),
      l(39, "right", 1)),
    t & 2)
  ) {
    let e = s();
    p("user", e.me()),
      i(6),
      b(" ", h(7, 21, e.file().bytes, "bytes"), " "),
      i(4),
      p("routerLink", e.me() && e.me().id ? "/home" : "/"),
      i(4),
      p("icon", e.file().views ? "views" : "hide"),
      i(),
      _(e.file().views ? 15 : -1),
      i(2),
      p("user", e.file()),
      i(2),
      k("glw", e.file().premium),
      p("routerLink", P(27, gt, e.file().username))(
        "ngStyle",
        P(29, vt, e.file().color)
      ),
      i(),
      b("@", e.file().username, ""),
      i(),
      _(e.file().name ? 21 : -1),
      i(2),
      _(e.file().admin ? 23 : -1),
      i(),
      _(e.file().premium ? 24 : -1),
      i(),
      _(e.file().privacy > 0 ? 25 : -1),
      i(2),
      E(h(28, 24, e.file().timestamp, "long")),
      i(6),
      p("href", e.file().url, he),
      i(2),
      p("routerLink", P(31, ga, e.file().id)),
      i(2),
      _(e.me() && e.me().id == e.file().user_id ? 37 : -1),
      i(),
      _(e.file().signature ? 38 : -1),
      i(),
      p("user", e.me());
  }
}
var bt = (() => {
  class t {
    constructor() {
      (this.me = S({})),
        (this.file = S({})),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U)),
        (this.router = y(re)),
        (this.route = y(ue)),
        (this.meta = y(pe));
    }
    ngOnInit() {
      this.getFile();
    }
    ngOnDestroy() {
      this.subscription && this.subscription.unsubscribe();
    }
    getFile() {
      this.subscription = this.route.paramMap.subscribe((e) => {
        let a = { id: e.get("id") };
        this.http
          .post(
            this.client.config("api") + "/view/file",
            a,
            this.client.headers()
          )
          .subscribe({
            next: (n) => {
              n.type == "success" &&
                (this.me.set(n.me),
                this.file.set(n.file),
                this.title.setTitle(`@${this.file().username}`),
                this.meta.addTags([
                  { name: "title", content: `@${this.file().username}` },
                  { name: "og:title", content: `@${this.file().username}` },
                  {
                    name: "twitter:title",
                    content: `@${this.file().username}`,
                  },
                  { name: "theme-color", content: this.file().color },
                ]),
                this.file().url &&
                ["mp4", "avi", "mov"].some((c) => this.file().url.includes(c))
                  ? this.meta.addTags([
                      { name: "og:video", content: this.file().url },
                      {
                        name: "og:video:type",
                        content: "video/" + this.file().url.split(".").pop(),
                      },
                      { name: "og:type", content: "video" },
                    ])
                  : this.file().url &&
                    ["png", "jpg", "jpeg", "gif"].some((c) =>
                      this.file().url.includes(c)
                    )
                  ? this.meta.addTags([
                      { name: "og:image", content: this.file().url },
                      { name: "twitter:card", content: "summary_large_image" },
                      { name: "og:type", content: "website" },
                    ])
                  : this.meta.addTags([
                      {
                        name: "og:image",
                        content: this.file().avatar
                          ? this.file().avatar
                          : this.client.config("static") + "/images/avatar.png",
                      },
                      { name: "twitter:card", content: "summary" },
                      { name: "og:type", content: "website" },
                    ]));
            },
            error: (n) => {
              this.router.navigate(["/404"]);
            },
          });
      });
    }
    deleteFile(e) {
      if (
        confirm(
          "This will delete the current file. This action is irreversible. Would you like to continue?"
        )
      ) {
        let n = { id: e };
        this.http
          .post(
            this.client.config("api") + "/delete/file",
            n,
            this.client.headers()
          )
          .subscribe({
            next: (c) => {
              c.type == "success" &&
                (this.me.set(c.me),
                this.file.set({}),
                this.router.navigate(["/404"]));
            },
            error: (c) => {},
          });
      }
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["file"]],
        decls: 3,
        vars: 7,
        consts: [
          [1, "app", 3, "ngStyle"],
          [3, "user"],
          [1, "pg"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [2, "margin-left", "auto"],
          [3, "routerLink"],
          [
            "icon",
            "doubleleft",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "cn"],
          [1, "tr"],
          ["width", "11", "height", "11", "color", "var(--c-c)", 3, "icon"],
          [2, "margin-left", "3px"],
          [
            2,
            "display",
            "flex",
            "flex-direction",
            "row",
            "align-items",
            "center",
          ],
          ["size", "large", 3, "user"],
          [2, "text-align", "left", "margin-left", "15px"],
          [1, "un", 3, "routerLink", "ngStyle"],
          [1, "un", 3, "routerLink", "ngStyle", "glw"],
          [2, "display", "inline-flex", "margin-left", "3px"],
          [1, "bdgc"],
          ["data-title", "Private", 1, "bdgc"],
          [1, "dt", 2, "margin", "10px 0px 0px 3px"],
          [1, "ints"],
          ["target", "_blank", 1, "int", 3, "href"],
          [
            "icon",
            "cursor",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "int", 3, "routerLink"],
          [
            "icon",
            "share",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "int"],
          [1, "sig", 3, "innerHTML"],
          [
            "height",
            "16",
            "width",
            "16",
            "fill",
            "var(--x)",
            "version",
            "1.2",
            "xmlns",
            "http://www.w3.org/2000/svg",
            "viewBox",
            "0 0 256 240.5",
            0,
            "xml",
            "space",
            "preserve",
            1,
            "bdg",
            3,
            "ngStyle",
          ],
          [
            "d",
            "M41 196h174v31H41v-31zM236 59a20 20 0 0 0-18 29l-42 21-38-64a20 20 0 1 0-20 0l-38 64-41-21c2-2 2-5 2-9a20 20 0 1 0-16 20l15 77h176l16-77a20 20 0 0 0 24-20c0-11-9-20-20-20z",
          ],
          [
            "width",
            "16",
            "height",
            "16",
            "fill",
            "var(--x)",
            "viewBox",
            "0 -5.5 56.3 56.3",
            "xmlns",
            "http://www.w3.org/2000/svg",
            1,
            "bdg",
            3,
            "ngStyle",
          ],
          [
            "d",
            "m24 1 2-1H13L0 15h13Zm-8 14h24l-6-8-6-6-8 9ZM0 17l24 25-11-25Zm41 0H15l13 28 12-26Zm-9 25 24-25H44Zm24-27L43 0H31l12 15Z",
          ],
          [
            "height",
            "16",
            "width",
            "16",
            "fill",
            "var(--x)",
            "xmlns",
            "http://www.w3.org/2000/svg",
            "viewBox",
            "-2 0 24 24",
            1,
            "bdg",
            3,
            "ngStyle",
          ],
          [
            "d",
            "M3.5 6.5V10H2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2h-1.5V6.5a6.5 6.5 0 1 0-13 0M6 10V6.5a4 4 0 0 1 8 0V10zm2 5.5a2 2 0 1 1 3.1 1.68h-.02l.42 2.57c0 .42-.34.75-.75.75h-1.5a.75.75 0 0 1-.75-.75l.41-2.57A2 2 0 0 1 8 15.5",
          ],
          [3, "attachment"],
          [1, "int", 3, "click"],
          [
            "icon",
            "cross",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
        ],
        template: function (a, n) {
          a & 1 && (o(0, "div", 0), l(1, "navbar", 1), v(2, Ea, 40, 33), r()),
            a & 2 &&
              (p(
                "ngStyle",
                n.file() && n.file().id
                  ? _e(3, Ca, n.file().color + "38", n.file().color + "da")
                  : oe(6, xa)
              ),
              i(),
              p("user", n.me()),
              i(),
              _(n.file() && n.file().id ? 2 : -1));
        },
        dependencies: [K, ee, Q, H, z, O, ce, $, Z, R, X, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var Va = (t, d) => d.id,
  Ma = () => [import("./chunk-IGKAPWAB.js").then((t) => t.ComposeComponent)],
  Ia = () => [import("./chunk-LBQ2VAXP.js").then((t) => t.LoaderComponent)],
  Fa = () => [import("./chunk-RHH4XAVI.js").then((t) => t.MediaComponent)];
function Ba(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "compose", 14),
      C("onComposed", function (n) {
        x(e);
        let c = s(2);
        return g(c.composed(n));
      }),
      r();
  }
}
function La(t, d) {
  if ((t & 1 && (o(0, "span", 18), m(1), u(2, "datePipe"), r()), t & 2)) {
    let e = s().$implicit;
    i(), E(h(2, 1, e.seen, "short"));
  }
}
function Da(t, d) {
  t & 1 && (o(0, "span", 18), m(1, "Sent"), r());
}
function Oa(t, d) {
  if (
    (t & 1 &&
      (o(0, "span", 21), m(1, "Message from "), l(2, "display", 23), r()),
    t & 2)
  ) {
    let e = s().$implicit;
    i(2), p("user", e.from)("color", e.from.color);
  }
}
function Ha(t, d) {
  if (
    (t & 1 && (o(0, "span", 21), m(1, "Message to "), l(2, "display", 23), r()),
    t & 2)
  ) {
    let e = s().$implicit;
    i(2), p("user", e.to)("color", e.to.color);
  }
}
function $a(t, d) {
  if ((t & 1 && l(0, "media", 30), t & 2)) {
    let e = s().$implicit;
    p("attachment", e.attachment);
  }
}
function Ga(t, d) {
  if ((t & 1 && (l(0, "div", 29), u(1, "contentPipe")), t & 2)) {
    let e = s().$implicit;
    p("innerHTML", h(1, 1, e.signature, "full"), G);
  }
}
function Ra(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 15)(1, "span", 16),
      l(2, "icons", 17),
      v(3, La, 3, 4, "span", 18)(4, Da, 2, 0, "span", 18),
      r(),
      o(5, "div", 19),
      l(6, "icons", 20),
      v(7, Oa, 3, 2, "span", 21)(8, Ha, 3, 2, "span", 21),
      r(),
      l(9, "avatar", 22)(10, "display", 23),
      o(11, "span", 24),
      m(12),
      u(13, "datePipe"),
      r(),
      l(14, "div", 25),
      u(15, "contentPipe"),
      v(16, $a, 1, 1),
      I(17, 16, Fa),
      F(),
      o(19, "div", 26)(20, "button", 27),
      C("click", function () {
        let n = x(e).$implicit,
          c = s(3);
        return g(c.deleteMessage(n.id));
      }),
      l(21, "icons", 28),
      r(),
      v(22, Ga, 2, 4, "div", 29),
      r()();
  }
  if (t & 2) {
    let e = d.$implicit,
      a = s(3);
    i(2),
      p("icon", e.seen ? "seen" : "sent"),
      i(),
      _(e.seen ? 3 : -1),
      i(),
      _(e.seen ? -1 : 4),
      i(3),
      _(a.messageOpt() == "incoming" ? 7 : -1),
      i(),
      _(a.messageOpt() == "outgoing" ? 8 : -1),
      i(),
      p("user", e.from),
      i(),
      p("user", e.from)("color", e.from.color),
      i(2),
      b("\u2022 ", h(13, 11, e.timestamp, "short"), ""),
      i(2),
      p("innerHTML", h(15, 14, e.content, "full"), G),
      i(8),
      _(e.signature ? 22 : -1);
  }
}
function Na(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "loader", 31),
      C("onScrolled", function () {
        x(e);
        let n = s(3);
        return g(n.getMessages());
      }),
      r();
  }
}
function Aa(t, d) {
  if (
    (t & 1 &&
      (W(0, Ra, 23, 17, "div", 15, Va), v(2, Na, 1, 0), I(3, 2, Ia), F()),
    t & 2)
  ) {
    let e = s(2);
    J(e.messages());
  }
}
function za(t, d) {
  if (t & 1) {
    let e = w();
    l(0, "left", 1),
      o(1, "div", 2)(2, "div", 3),
      l(3, "icons", 4),
      m(4),
      u(5, "numberPipe"),
      l(6, "icons", 4),
      m(7),
      l(8, "div", 5),
      o(9, "div", 6)(10, "button", 7),
      l(11, "icons", 8),
      r()()(),
      o(12, "div", 9)(13, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updateMessageOpt("incoming"));
      }),
      m(14, "Incoming"),
      r(),
      o(15, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updateMessageOpt("outgoing"));
      }),
      m(16, "Outgoing"),
      r()(),
      o(17, "div", 9)(18, "input", 11),
      C("keydown.enter", function () {
        x(e);
        let n = s();
        return g(n.getSearch());
      })("ngModelChange", function (n) {
        x(e);
        let c = s();
        return g(c.search.set(n));
      }),
      r(),
      o(19, "button", 12),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.getSearch());
      }),
      l(20, "icons", 13),
      r()(),
      v(21, Ba, 1, 0),
      I(22, 21, Ma),
      F(),
      v(24, Aa, 5, 0),
      r(),
      l(25, "right", 1);
  }
  if (t & 2) {
    let e = s();
    p("user", e.me()),
      i(4),
      b(" ", h(5, 10, e.amount(), "suffix"), " Messages "),
      i(3),
      b(" ", e.messageOpt() == "incoming" ? "Incoming" : "Outgoing", " "),
      i(6),
      k("act", e.messageOpt() == "incoming"),
      i(2),
      k("act", e.messageOpt() == "outgoing"),
      i(3),
      p("ngModel", e.search()),
      i(6),
      _(e.messages().length > 0 ? 24 : -1),
      i(),
      p("user", e.me());
  }
}
var wt = (() => {
  class t {
    constructor() {
      (this.me = S({})),
        (this.messageOpt = S("incoming")),
        (this.search = S("")),
        (this.amount = S(0)),
        (this.messages = S([])),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U));
    }
    ngOnInit() {
      this.title.setTitle("Messages"), this.getMessages();
    }
    getMessages() {
      let e = {
        cursor:
          this.messages().length > 0 ? this.messages().at(-1).timestamp : null,
        option: this.messageOpt(),
        search: this.search(),
      };
      this.http
        .post(
          this.client.config("api") + "/view/messages",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (this.me.set(a.me),
              this.messages().length > 0
                ? this.messages.update((n) =>
                    [...n, ...a.messages].filter(
                      (c, f, V) =>
                        f ===
                        V.findIndex(
                          (L) => L.id === c.id && L.timestamp === c.timestamp
                        )
                    )
                  )
                : this.messages.set(a.messages),
              this.amount.set(a.amount));
          },
          error: (a) => {},
        });
    }
    composed(e) {
      this.messages.set([]),
        this.messageOpt.set("outgoing"),
        this.getMessages();
    }
    getSearch() {
      this.messages.set([]), this.getMessages();
    }
    deleteMessage(e) {
      if (
        confirm(
          "This will delete the current message. This action is irreversible. Would you like to continue?"
        )
      ) {
        let n = { id: e };
        this.http
          .post(
            this.client.config("api") + "/delete/message",
            n,
            this.client.headers()
          )
          .subscribe({
            next: (c) => {
              c.type == "success" &&
                (this.me.set(c.me),
                this.messages().length > 0 &&
                  this.messages.update((f) => f.filter((V) => V.id != e)),
                this.amount.update((f) => f - 1));
            },
            error: (c) => {},
          });
      }
    }
    updateMessageOpt(e) {
      this.messageOpt() != e &&
        (this.messages.set([]), this.messageOpt.set(e), this.getMessages());
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["messages"]],
        decls: 3,
        vars: 2,
        consts: [
          [1, "app"],
          [3, "user"],
          [1, "pg"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [2, "margin-left", "auto"],
          ["data-title", "Go back", "routerLink", "/home"],
          [
            "icon",
            "doubleleft",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "rw"],
          [2, "width", "100%", 3, "click"],
          [
            "type",
            "text",
            "placeholder",
            "Username...",
            3,
            "keydown.enter",
            "ngModelChange",
            "ngModel",
          ],
          [2, "width", "auto", 3, "click"],
          [
            "icon",
            "search",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          ["type", "message", "size", "large", 3, "onComposed"],
          [1, "cn"],
          [1, "tr"],
          ["width", "11", "height", "11", "color", "var(--c-c)", 3, "icon"],
          [2, "margin-left", "3px"],
          [1, "hl"],
          [
            "icon",
            "topright",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-left", "5px"],
          ["size", "small", 3, "user"],
          [3, "user", "color"],
          [1, "dt"],
          [1, "cnt", 3, "innerHTML"],
          [1, "ints"],
          [1, "int", 3, "click"],
          [
            "icon",
            "cross",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "sig", 3, "innerHTML"],
          [3, "attachment"],
          [3, "onScrolled"],
        ],
        template: function (a, n) {
          a & 1 && (o(0, "div", 0), l(1, "navbar", 1), v(2, za, 26, 13), r()),
            a & 2 &&
              (i(), p("user", n.me()), i(), _(n.me() && n.me().id ? 2 : -1));
        },
        dependencies: [K, ee, Q, H, z, O, $, ae, le, se, ie, Z, R, X, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var St = (t, d) => d.id,
  yt = () => [import("./chunk-LBQ2VAXP.js").then((t) => t.LoaderComponent)],
  Ua = (t) => ["/group", t],
  Za = (t) => ({ "--x": t });
function qa(t, d) {
  if ((t & 1 && (l(0, "span", 14), u(1, "contentPipe")), t & 2)) {
    let e = s().$implicit;
    p("innerHTML", h(1, 1, e.bio, "preview"), G);
  }
}
function ja(t, d) {
  if ((t & 1 && (o(0, "span", 16), l(1, "icons", 19), m(2), r()), t & 2)) {
    let e = s().$implicit;
    T("data-title", "Currently in ", e.location, ""),
      i(),
      p("color", e.color),
      i(),
      b(" ", e.location, "");
  }
}
function Wa(t, d) {
  if (
    (t & 1 &&
      (o(0, "span", 16),
      u(1, "numberPipe"),
      l(2, "icons", 20),
      m(3),
      u(4, "numberPipe"),
      r()),
    t & 2)
  ) {
    let e = s().$implicit;
    T("data-title", "", h(1, 4, e.views, "suffix"), " Views"),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(4, 7, e.views, "suffix"), "");
  }
}
function Ja(t, d) {
  if (
    (t & 1 &&
      (o(0, "span", 16),
      u(1, "datePipe"),
      l(2, "icons", 21),
      m(3),
      u(4, "datePipe"),
      r()),
    t & 2)
  ) {
    let e = s().$implicit;
    T("data-title", "Last seen ", h(1, 4, e.seen, "long"), ""),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(4, 7, e.seen, "short"), "");
  }
}
function Ka(t, d) {
  if ((t & 1 && (o(0, "span", 16), l(1, "icons", 22), m(2), r()), t & 2)) {
    let e = s().$implicit;
    T("data-title", "Member of #", e.group.tag, ""),
      i(),
      p("color", e.color),
      i(),
      b(" ", e.group.tag, "");
  }
}
function Ya(t, d) {
  if ((t & 1 && (o(0, "span", 16), l(1, "display", 13), r()), t & 2)) {
    let e = s().$implicit;
    T("data-title", "Invited by @", e.inviter.username, ""),
      i(),
      p("user", e.inviter)("color", e.color);
  }
}
function Qa(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 11),
      l(1, "avatar", 12)(2, "display", 13),
      v(3, qa, 2, 4, "span", 14),
      o(4, "div", 15)(5, "span", 16),
      u(6, "numberPipe"),
      l(7, "icons", 17),
      m(8),
      u(9, "numberPipe"),
      r(),
      v(10, ja, 3, 4, "span", 16)(11, Wa, 5, 10, "span", 16),
      o(12, "span", 16),
      u(13, "datePipe"),
      l(14, "icons", 18),
      m(15),
      u(16, "datePipe"),
      r(),
      v(17, Ja, 5, 10, "span", 16)(18, Ka, 3, 4, "span", 16)(
        19,
        Ya,
        2,
        4,
        "span",
        16
      ),
      r()()),
    t & 2)
  ) {
    let e = d.$implicit;
    i(),
      p("user", e),
      i(),
      p("user", e)("color", e.color),
      i(),
      _(e.bio ? 3 : -1),
      i(2),
      T("data-title", "User #", h(6, 17, e.uuid, "suffix"), ""),
      i(2),
      p("color", e.color),
      i(),
      b(" #", h(9, 20, e.uuid, "suffix"), ""),
      i(2),
      _(e.location ? 10 : -1),
      i(),
      _(e.views ? 11 : -1),
      i(),
      T("data-title", "Joined ", h(13, 23, e.timestamp, "long"), ""),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(16, 26, e.timestamp, "minimal"), ""),
      i(2),
      _(e.seen ? 17 : -1),
      i(),
      _(e.group ? 18 : -1),
      i(),
      _(e.inviter ? 19 : -1);
  }
}
function Xa(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "loader", 23),
      C("onScrolled", function () {
        x(e);
        let n = s(3);
        return g(n.getDirectory());
      }),
      r();
  }
}
function el(t, d) {
  if (
    (t & 1 &&
      (W(0, Qa, 20, 29, "div", 11, St), v(2, Xa, 1, 0), I(3, 2, yt), F()),
    t & 2)
  ) {
    let e = s(2);
    J(e.users());
  }
}
function tl(t, d) {
  if ((t & 1 && (l(0, "span", 14), u(1, "contentPipe")), t & 2)) {
    let e = s().$implicit;
    p("innerHTML", h(1, 1, e.description, "preview"), G);
  }
}
function il(t, d) {
  if (
    (t & 1 &&
      (o(0, "span", 16),
      u(1, "numberPipe"),
      l(2, "icons", 20),
      m(3),
      u(4, "numberPipe"),
      r()),
    t & 2)
  ) {
    let e = s().$implicit;
    T("data-title", "", h(1, 4, e.views, "suffix"), " Views"),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(4, 7, e.views, "suffix"), "");
  }
}
function nl(t, d) {
  if ((t & 1 && (o(0, "span", 16), l(1, "display", 13), r()), t & 2)) {
    let e = s().$implicit;
    T("data-title", "Owned by @", e.owner.username, ""),
      i(),
      p("user", e.owner)("color", e.color);
  }
}
function ol(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 11),
      l(1, "avatar", 12),
      o(2, "span", 24),
      m(3),
      r(),
      v(4, tl, 2, 4, "span", 14),
      o(5, "div", 15)(6, "span", 16),
      u(7, "numberPipe"),
      l(8, "icons", 17),
      m(9),
      u(10, "numberPipe"),
      r(),
      o(11, "span", 16),
      u(12, "datePipe"),
      l(13, "icons", 18),
      m(14),
      u(15, "datePipe"),
      r(),
      o(16, "span", 16),
      u(17, "numberPipe"),
      l(18, "icons", 25),
      m(19),
      u(20, "numberPipe"),
      r(),
      o(21, "span", 16),
      u(22, "numberPipe"),
      l(23, "icons", 26),
      m(24),
      u(25, "numberPipe"),
      r(),
      o(26, "span", 16),
      u(27, "numberPipe"),
      l(28, "icons", 27),
      m(29),
      u(30, "numberPipe"),
      r(),
      o(31, "span", 16),
      l(32, "icons", 22),
      m(33),
      r(),
      o(34, "span", 16),
      l(35, "icons", 28),
      m(36),
      r(),
      v(37, il, 5, 10, "span", 16)(38, nl, 2, 4, "span", 16),
      r()()),
    t & 2)
  ) {
    let e = d.$implicit;
    i(),
      p("user", e),
      i(),
      k("glw", e.owner.premium),
      p("routerLink", P(67, Ua, e.vanity))("ngStyle", P(69, Za, e.color)),
      i(),
      E(e.name),
      i(),
      _(e.description ? 4 : -1),
      i(2),
      T("data-title", "Group #", h(7, 37, e.uuid, "suffix"), ""),
      i(2),
      p("color", e.color),
      i(),
      b(" #", h(10, 40, e.uuid, "suffix"), ""),
      i(2),
      T("data-title", "Created ", h(12, 43, e.timestamp, "long"), ""),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(15, 46, e.timestamp, "minimal"), ""),
      i(2),
      T("data-title", "", h(17, 49, e.members, "suffix"), " Members"),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(20, 52, e.members, "suffix"), ""),
      i(2),
      T("data-title", "", h(22, 55, e.requests, "suffix"), " Requests"),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(25, 58, e.requests, "suffix"), ""),
      i(2),
      T("data-title", "", h(27, 61, e.comments, "suffix"), " Comments"),
      i(2),
      p("color", e.color),
      i(),
      b(" ", h(30, 64, e.comments, "suffix"), ""),
      i(2),
      T("data-title", "Tag #", e.tag, ""),
      i(),
      p("color", e.color),
      i(),
      b(" ", e.tag, ""),
      i(),
      T("data-title", "Vanity /", e.vanity, ""),
      i(),
      p("color", e.color),
      i(),
      b(" /", e.vanity, ""),
      i(),
      _(e.views ? 37 : -1),
      i(),
      _(e.owner ? 38 : -1);
  }
}
function rl(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "loader", 23),
      C("onScrolled", function () {
        x(e);
        let n = s(3);
        return g(n.getDirectory());
      }),
      r();
  }
}
function al(t, d) {
  if (
    (t & 1 &&
      (W(0, ol, 39, 71, "div", 11, St), v(2, rl, 1, 0), I(3, 2, yt), F()),
    t & 2)
  ) {
    let e = s(2);
    J(e.groups());
  }
}
function ll(t, d) {
  if (t & 1) {
    let e = w();
    l(0, "left", 1),
      o(1, "div", 2)(2, "div", 3),
      l(3, "icons", 4),
      m(4, " Directory "),
      l(5, "icons", 4),
      m(6),
      l(7, "div", 5),
      o(8, "div", 6)(9, "button", 7),
      l(10, "icons", 8),
      r()()(),
      o(11, "div", 9)(12, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updateDirectoryOpt("users"));
      }),
      m(13, "Users"),
      r(),
      o(14, "button", 10),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.updateDirectoryOpt("groups"));
      }),
      m(15, "Groups"),
      r()(),
      v(16, el, 5, 0)(17, al, 5, 0),
      r(),
      l(18, "right", 1);
  }
  if (t & 2) {
    let e = s();
    p("user", e.me()),
      i(6),
      b(" ", e.directoryOpt() == "users" ? "Users" : "Groups", " "),
      i(6),
      k("act", e.directoryOpt() == "users"),
      i(2),
      k("act", e.directoryOpt() == "groups"),
      i(2),
      _(e.users().length > 0 ? 16 : -1),
      i(),
      _(e.groups().length > 0 ? 17 : -1),
      i(),
      p("user", e.me());
  }
}
var kt = (() => {
  class t {
    constructor() {
      (this.me = S({})),
        (this.directoryOpt = S("users")),
        (this.groups = S([])),
        (this.users = S([])),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U));
    }
    ngOnInit() {
      this.title.setTitle("Directory"), this.getDirectory();
    }
    getDirectory() {
      let a = {
        cursor:
          this.directoryOpt() == "users"
            ? this.users().length > 0
              ? this.users().at(-1).timestamp
              : null
            : this.directoryOpt() == "groups" && this.groups().length > 0
            ? this.groups().at(-1).timestamp
            : null,
        option: this.directoryOpt(),
      };
      this.http
        .post(
          this.client.config("api") + "/view/directory",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me),
              this.directoryOpt() == "users" &&
                (this.users().length > 0
                  ? this.users.update((c) =>
                      [...c, ...n.users].filter(
                        (f, V, L) =>
                          V ===
                          L.findIndex(
                            (we) =>
                              we.id === f.id && we.timestamp === f.timestamp
                          )
                      )
                    )
                  : this.users.set(n.users)),
              this.directoryOpt() == "groups" &&
                (this.groups().length > 0
                  ? this.groups.update((c) =>
                      [...c, ...n.groups].filter(
                        (f, V, L) =>
                          V ===
                          L.findIndex(
                            (we) =>
                              we.id === f.id && we.timestamp === f.timestamp
                          )
                      )
                    )
                  : this.groups.set(n.groups)));
          },
          error: (n) => {},
        });
    }
    updateDirectoryOpt(e) {
      this.directoryOpt() != e &&
        (this.groups.set([]),
        this.users.set([]),
        this.directoryOpt.set(e),
        this.getDirectory());
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["directory"]],
        decls: 3,
        vars: 2,
        consts: [
          [1, "app"],
          [3, "user"],
          [1, "pg"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [2, "margin-left", "auto"],
          ["data-title", "Go back", "routerLink", "/home"],
          [
            "icon",
            "doubleleft",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "rw"],
          [2, "width", "100%", 3, "click"],
          [1, "cn"],
          ["size", "small", 3, "user"],
          [3, "user", "color"],
          [
            1,
            "bi",
            2,
            "margin-left",
            "5px",
            "vertical-align",
            "middle",
            "white-space",
            "nowrap",
            3,
            "innerHTML",
          ],
          [1, "ints", 2, "margin-top", "10px"],
          [1, "bx", 2, "margin", "8px 4px 0 0"],
          ["icon", "user", "width", "11", "height", "11", 3, "color"],
          ["icon", "calendar", "width", "11", "height", "11", 3, "color"],
          ["icon", "location", "width", "11", "height", "11", 3, "color"],
          ["icon", "views", "width", "11", "height", "11", 3, "color"],
          ["icon", "seen", "width", "11", "height", "11", 3, "color"],
          ["icon", "hashtag", "width", "11", "height", "11", 3, "color"],
          [3, "onScrolled"],
          [1, "un", 3, "routerLink", "ngStyle"],
          ["icon", "users", "width", "11", "height", "11", 3, "color"],
          ["icon", "pending", "width", "11", "height", "11", 3, "color"],
          ["icon", "comment", "width", "11", "height", "11", 3, "color"],
          ["icon", "link", "width", "11", "height", "11", 3, "color"],
        ],
        template: function (a, n) {
          a & 1 && (o(0, "div", 0), l(1, "navbar", 1), v(2, ll, 19, 9), r()),
            a & 2 &&
              (i(), p("user", n.me()), i(), _(n.me() && n.me().id ? 2 : -1));
        },
        dependencies: [K, ee, Q, H, z, O, ce, $, ie, Z, R, X, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var sl = (t, d) => d.id,
  cl = () => [import("./chunk-LBQ2VAXP.js").then((t) => t.LoaderComponent)];
function pl(t, d) {
  if ((t & 1 && (o(0, "button", 17), m(1), u(2, "datePipe"), r()), t & 2)) {
    let e = s(2);
    i(), b("Please wait ", h(2, 1, e.me().daily, "short"), "");
  }
}
function ml(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "button", 20),
      C("click", function () {
        x(e);
        let n = s(2);
        return g(n.dailyClaim());
      }),
      m(1, "Claim daily rewards"),
      r();
  }
}
function dl(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 19)(1, "div", 21),
      l(2, "icons", 22),
      o(3, "span", 23),
      m(4, "Information"),
      r()(),
      o(5, "div", 24),
      m(6),
      r()()),
    t & 2)
  ) {
    let e = s(2);
    i(6), E(e.response());
  }
}
function _l(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 19)(1, "div", 21),
      l(2, "icons", 26),
      o(3, "span", 23),
      m(4),
      r()(),
      l(5, "div", 27),
      u(6, "contentPipe"),
      o(7, "div", 9)(8, "button", 20),
      C("click", function () {
        let n = x(e).$implicit,
          c = s(3);
        return g(c.purchase(n.id));
      }),
      l(9, "icons", 11),
      m(10),
      u(11, "numberPipe"),
      r()()();
  }
  if (t & 2) {
    let e = d.$implicit;
    i(4),
      E(e.name),
      i(),
      p("innerHTML", h(6, 3, e.content, "full"), G),
      i(5),
      b(" ", h(11, 6, e.price, "suffix"), "");
  }
}
function ul(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "loader", 28),
      C("onScrolled", function () {
        x(e);
        let n = s(3);
        return g(n.getShop());
      }),
      r();
  }
}
function hl(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 25),
      W(1, _l, 12, 9, "div", 19, sl),
      r(),
      v(3, ul, 1, 0),
      I(4, 3, cl),
      F()),
    t & 2)
  ) {
    let e = s(2);
    i(), J(e.items());
  }
}
function fl(t, d) {
  if (t & 1) {
    let e = w();
    l(0, "left", 1),
      o(1, "div", 2)(2, "div", 3),
      l(3, "icons", 4),
      m(4, " Shop "),
      l(5, "icons", 4),
      m(6, " Items "),
      l(7, "div", 5),
      o(8, "div", 6)(9, "button", 7),
      l(10, "icons", 8),
      r()()(),
      o(11, "div", 9)(12, "button", 10),
      u(13, "numberPipe"),
      l(14, "icons", 11),
      m(15),
      u(16, "numberPipe"),
      r(),
      o(17, "button", 10),
      u(18, "numberPipe"),
      l(19, "icons", 12),
      m(20),
      u(21, "numberPipe"),
      r(),
      o(22, "button", 10),
      u(23, "numberPipe"),
      l(24, "icons", 13),
      m(25),
      u(26, "numberPipe"),
      r(),
      o(27, "button", 10),
      u(28, "datePipe"),
      l(29, "icons", 13),
      m(30),
      u(31, "datePipe"),
      r()(),
      o(32, "div", 9)(33, "input", 14),
      C("ngModelChange", function (n) {
        x(e);
        let c = s();
        return g(c.target.set(n));
      }),
      r(),
      o(34, "input", 15),
      C("ngModelChange", function (n) {
        x(e);
        let c = s();
        return g(c.amount.set(n));
      }),
      r(),
      o(35, "button", 16),
      C("click", function () {
        x(e);
        let n = s();
        return g(n.transfer());
      }),
      l(36, "icons", 11),
      r()(),
      o(37, "div", 9),
      v(38, pl, 3, 4, "button", 17)(39, ml, 2, 0, "button", 18),
      r(),
      v(40, dl, 7, 1, "div", 19)(41, hl, 6, 0),
      r(),
      l(42, "right", 1);
  }
  if (t & 2) {
    let e = s();
    p("user", e.me()),
      i(12),
      T("data-title", "$", h(13, 19, e.me().balance, "suffix"), " Balance"),
      i(3),
      E(h(16, 22, e.me().balance, "suffix")),
      i(2),
      T("data-title", "$", h(18, 25, e.me().spent, "suffix"), " Spent"),
      i(3),
      E(h(21, 28, e.me().spent, "suffix")),
      i(2),
      T("data-title", "", h(23, 31, e.me().streak, "suffix"), " Claim streak"),
      i(3),
      E(h(26, 34, e.me().streak, "suffix")),
      i(2),
      ke(
        "data-title",
        e.me().daily
          ? h(28, 37, e.me().daily, "short") + " Till claimable"
          : "Claimable"
      ),
      i(3),
      E(e.me().daily ? h(31, 40, e.me().daily, "short") : "Now"),
      i(3),
      p("ngModel", e.target()),
      i(),
      p("ngModel", e.amount()),
      i(4),
      _(e.me().daily ? 38 : -1),
      i(),
      _(e.me().daily ? -1 : 39),
      i(),
      _(e.response() ? 40 : -1),
      i(),
      _(e.items().length > 0 ? 41 : -1),
      i(),
      p("user", e.me());
  }
}
var Tt = (() => {
  class t {
    constructor() {
      (this.me = S({})),
        (this.items = S([])),
        (this.response = S("")),
        (this.amount = S(0)),
        (this.target = S("")),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U));
    }
    ngOnInit() {
      this.title.setTitle("Shop"), this.getShop();
    }
    getShop() {
      let e = {
        cursor: this.items().length > 0 ? this.items().at(-1).timestamp : null,
      };
      this.http
        .post(
          this.client.config("api") + "/view/shop",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (this.me.set(a.me),
              this.items().length > 0
                ? this.items.update((n) =>
                    [...n, ...a.items].filter(
                      (c, f, V) =>
                        f ===
                        V.findIndex(
                          (L) => L.id === c.id && L.timestamp === c.timestamp
                        )
                    )
                  )
                : this.items.set(a.items));
          },
          error: (a) => {},
        });
    }
    dailyClaim() {
      this.http
        .post(
          this.client.config("api") + "/create/claim",
          null,
          this.client.headers()
        )
        .subscribe({
          next: (e) => {
            e.type == "success" &&
              (this.me.set(e.me), this.response.set(e.message));
          },
          error: (e) => {
            this.response.set(e.error.message);
          },
        });
    }
    transfer() {
      let e = { username: this.target(), amount: this.amount() };
      this.http
        .post(
          this.client.config("api") + "/create/transfer",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (this.me.set(a.me), this.response.set(a.message));
          },
          error: (a) => {
            this.response.set(a.error.message);
          },
        });
    }
    purchase(e) {
      let a = { id: e };
      this.http
        .post(
          this.client.config("api") + "/create/purchase",
          a,
          this.client.headers()
        )
        .subscribe({
          next: (n) => {
            n.type == "success" &&
              (this.me.set(n.me), this.response.set(n.message));
          },
          error: (n) => {
            this.response.set(n.error.message);
          },
        });
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["shop"]],
        decls: 3,
        vars: 2,
        consts: [
          [1, "app"],
          [3, "user"],
          [1, "pg"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [2, "margin-left", "auto"],
          ["data-title", "Go back", "routerLink", "/home"],
          [
            "icon",
            "doubleleft",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "rw"],
          [1, "ev", 2, "width", "100%", "font-size", "10px"],
          [
            "icon",
            "money",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "shop",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "icon",
            "flame",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [
            "type",
            "text",
            "placeholder",
            "Username",
            3,
            "ngModelChange",
            "ngModel",
          ],
          [
            "type",
            "number",
            "placeholder",
            "Amount",
            3,
            "ngModelChange",
            "ngModel",
          ],
          [2, "width", "auto", 3, "click"],
          [2, "width", "100%", "pointer-events", "none"],
          [2, "width", "100%"],
          [1, "cn"],
          [2, "width", "100%", 3, "click"],
          [1, "hl"],
          [
            "icon",
            "info",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-left", "5px"],
          [1, "cnt"],
          [1, "gr", 2, "--x", "175px"],
          [
            "icon",
            "topright",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "cnt", 3, "innerHTML"],
          [3, "onScrolled"],
        ],
        template: function (a, n) {
          a & 1 && (o(0, "div", 0), l(1, "navbar", 1), v(2, fl, 43, 43), r()),
            a & 2 &&
              (i(), p("user", n.me()), i(), _(n.me() && n.me().id ? 2 : -1));
        },
        dependencies: [K, ee, Q, H, z, O, $, ae, qe, le, se, Z, R, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var Le = (() => {
  class t {
    constructor() {
      (this.me = S({})),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U)),
        (this.meta = y(pe));
    }
    ngOnInit() {
      this.title.setTitle("Not found"),
        this.meta.addTags([
          { name: "title", content: "Not found" },
          { name: "og:title", content: "Not found" },
          { name: "twitter:title", content: "Not found" },
          {
            name: "description",
            content: "We can't find what you're looking for...",
          },
          {
            name: "og:description",
            content: "We can't find what you're looking for...",
          },
          { name: "theme-color", content: "#000000" },
          {
            name: "og:image",
            content: this.client.config("static") + "/images/avatar.png",
          },
          { name: "twitter:card", content: "summary" },
          { name: "og:type", content: "website" },
        ]),
        this.getMe();
    }
    getMe() {
      this.http
        .post(
          this.client.config("api") + "/view/me",
          null,
          this.client.headers()
        )
        .subscribe({
          next: (e) => {
            e.type == "success" && this.me.set(e.me);
          },
          error: (e) => {},
        });
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["notfound"]],
        decls: 21,
        vars: 4,
        consts: [
          [1, "app"],
          [3, "user"],
          [1, "pg"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [2, "margin-left", "auto"],
          ["data-title", "Go back", 3, "routerLink"],
          [
            "icon",
            "doubleleft",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "cn"],
          [1, "hl"],
          [
            "icon",
            "info",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-left", "5px"],
          [1, "cnt"],
        ],
        template: function (a, n) {
          a & 1 &&
            (o(0, "div", 0),
            l(1, "navbar", 1)(2, "left", 1),
            o(3, "div", 2)(4, "div", 3),
            l(5, "icons", 4),
            m(6, " 404 "),
            l(7, "icons", 4),
            m(8, " Not found "),
            l(9, "div", 5),
            o(10, "div", 6)(11, "button", 7),
            l(12, "icons", 8),
            r()()(),
            o(13, "div", 9)(14, "div", 10),
            l(15, "icons", 11),
            o(16, "span", 12),
            m(17, "Information"),
            r()(),
            o(18, "div", 13),
            m(19, "We can't find what you're looking for..."),
            r()()(),
            l(20, "right", 1),
            r()),
            a & 2 &&
              (i(),
              p("user", n.me()),
              i(),
              p("user", n.me()),
              i(9),
              p("routerLink", n.me() && n.me().id ? "/home" : "/"),
              i(9),
              p("user", n.me()));
        },
        dependencies: [H, z, O, $, Z, R, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var Cl = (t, d) => d.id,
  xl = () => [import("./chunk-LBQ2VAXP.js").then((t) => t.LoaderComponent)];
function gl(t, d) {
  if (
    (t & 1 &&
      (o(0, "div", 10),
      l(1, "icons", 20),
      o(2, "span", 21),
      m(3, "Claimed by "),
      l(4, "display", 12),
      r()()),
    t & 2)
  ) {
    let e = s().$implicit;
    i(4), p("user", e.claimed)("color", e.claimed.color);
  }
}
function vl(t, d) {
  if ((t & 1 && (l(0, "div", 19), u(1, "contentPipe")), t & 2)) {
    let e = s().$implicit;
    p("innerHTML", h(1, 1, e.signature, "full"), G);
  }
}
function bl(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "div", 9),
      v(1, gl, 5, 2, "div", 10),
      l(2, "avatar", 11)(3, "display", 12),
      o(4, "span", 13),
      m(5),
      u(6, "datePipe"),
      r(),
      l(7, "div", 14),
      u(8, "contentPipe"),
      o(9, "div", 15)(10, "button", 16),
      C("click", function () {
        let n = x(e).$implicit,
          c = s(3);
        return g(c.copyInvite(n.id));
      }),
      l(11, "icons", 17),
      r(),
      o(12, "button", 16),
      C("click", function () {
        let n = x(e).$implicit,
          c = s(3);
        return g(c.deleteInvite(n.id));
      }),
      l(13, "icons", 18),
      r(),
      v(14, vl, 2, 4, "div", 19),
      r()();
  }
  if (t & 2) {
    let e = d.$implicit;
    i(),
      _(e.claimed ? 1 : -1),
      i(),
      p("user", e),
      i(),
      p("user", e)("color", e.color),
      i(2),
      b("\u2022 ", h(6, 8, e.timestamp, "short"), ""),
      i(2),
      p("innerHTML", h(8, 11, e.invite, "full"), G),
      i(4),
      p("color", e.copied ? "var(--c-e)" : "var(--c-c)"),
      i(3),
      _(e.signature ? 14 : -1);
  }
}
function wl(t, d) {
  if (t & 1) {
    let e = w();
    o(0, "loader", 22),
      C("onScrolled", function () {
        x(e);
        let n = s(3);
        return g(n.getInvites());
      }),
      r();
  }
}
function Sl(t, d) {
  if (
    (t & 1 &&
      (W(0, bl, 15, 14, "div", 9, Cl), v(2, wl, 1, 0), I(3, 2, xl), F()),
    t & 2)
  ) {
    let e = s(2);
    J(e.invites());
  }
}
function yl(t, d) {
  if (
    (t & 1 &&
      (l(0, "left", 1),
      o(1, "div", 2)(2, "div", 3),
      l(3, "icons", 4),
      m(4),
      u(5, "numberPipe"),
      l(6, "div", 5),
      o(7, "div", 6)(8, "button", 7),
      l(9, "icons", 8),
      r()()(),
      v(10, Sl, 5, 0),
      r(),
      l(11, "right", 1)),
    t & 2)
  ) {
    let e = s();
    p("user", e.me()),
      i(4),
      b(" ", h(5, 4, e.amount(), "suffix"), " Invites "),
      i(6),
      _(e.invites().length > 0 ? 10 : -1),
      i(),
      p("user", e.me());
  }
}
var Pt = (() => {
  class t {
    constructor() {
      (this.me = S({})),
        (this.invites = S([])),
        (this.amount = S(0)),
        (this.client = y(N)),
        (this.http = y(A)),
        (this.title = y(U));
    }
    ngOnInit() {
      this.title.setTitle("Invites"), this.getInvites();
    }
    getInvites() {
      let e = {
        cursor:
          this.invites().length > 0 ? this.invites().at(-1).timestamp : null,
      };
      this.http
        .post(
          this.client.config("api") + "/view/invites",
          e,
          this.client.headers()
        )
        .subscribe({
          next: (a) => {
            a.type == "success" &&
              (this.me.set(a.me),
              this.invites().length > 0
                ? this.invites.update((n) =>
                    [...n, ...a.invites].filter(
                      (c, f, V) =>
                        f ===
                        V.findIndex(
                          (L) => L.id === c.id && L.timestamp === c.timestamp
                        )
                    )
                  )
                : this.invites.set(a.invites),
              this.amount.set(a.amount));
          },
          error: (a) => {},
        });
    }
    deleteInvite(e) {
      if (
        confirm(
          "This will delete the current invite. This action is irreversible. Would you like to continue?"
        )
      ) {
        let n = { id: e };
        this.http
          .post(
            this.client.config("api") + "/delete/invite",
            n,
            this.client.headers()
          )
          .subscribe({
            next: (c) => {
              c.type == "success" &&
                (this.me.set(c.me),
                this.invites().length > 0 &&
                  this.invites.update((f) => f.filter((V) => V.id != e)),
                this.amount.update((f) => f - 1));
            },
            error: (c) => {},
          });
      }
    }
    copyInvite(e) {
      let a = this.invites().find((n) => n.id == e);
      a &&
        (navigator.clipboard.writeText(a.invite),
        this.invites().length > 0 &&
          this.invites.update((n) =>
            n.map((c) => (c.id == e ? B(M({}, c), { copied: !0 }) : c))
          ));
    }
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["invites"]],
        decls: 3,
        vars: 2,
        consts: [
          [1, "app"],
          [3, "user"],
          [1, "pg"],
          [1, "hd"],
          [
            "icon",
            "rightarrow",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "dvdr"],
          [2, "margin-left", "auto"],
          ["data-title", "Go back", "routerLink", "/home"],
          [
            "icon",
            "doubleleft",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "cn"],
          [1, "hl"],
          ["size", "small", 3, "user"],
          [3, "user", "color"],
          [1, "dt"],
          [1, "cnt", 3, "innerHTML"],
          [1, "ints"],
          [1, "int", 3, "click"],
          ["icon", "copy", "width", "11", "height", "11", 3, "color"],
          [
            "icon",
            "cross",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [1, "sig", 3, "innerHTML"],
          [
            "icon",
            "topright",
            "width",
            "11",
            "height",
            "11",
            "color",
            "var(--c-c)",
          ],
          [2, "margin-left", "5px"],
          [3, "onScrolled"],
        ],
        template: function (a, n) {
          a & 1 && (o(0, "div", 0), l(1, "navbar", 1), v(2, yl, 12, 7), r()),
            a & 2 &&
              (i(), p("user", n.me()), i(), _(n.me() && n.me().id ? 2 : -1));
        },
        dependencies: [K, ee, Q, H, z, O, $, ie, Z, R, X, q, j],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var Et = [
  { path: "", component: Je },
  { path: "auth", component: Ke },
  { path: "premium", component: Ye },
  { path: "home", component: Xe },
  { path: "bookmarks", component: tt },
  { path: "settings", component: it },
  { path: "groupsettings/:id", component: nt },
  { path: "admin", component: ot },
  { path: "post/:id", component: ut },
  { path: "group/:vanity", component: Ct },
  { path: "files", component: xt },
  { path: "file/:id", component: bt },
  { path: "messages", component: wt },
  { path: "directory", component: kt },
  { path: "shop", component: Tt },
  { path: "invites", component: Pt },
  { path: "404", component: Le },
  { path: ":username", component: pt },
  { path: "**", component: Le },
];
var Vt = {
  providers: [
    Oe({ eventCoalescing: !0 }),
    Ze(Et),
    $e(Ge()),
    ze(
      Ne({ includePostRequests: !0, includeRequestsWithAuthHeaders: !0 }),
      Ae()
    ),
  ],
};
var kl = () => [import("./chunk-RIACB26D.js").then((t) => t.SecurityComponent)];
function Tl(t, d) {
  t & 1 && l(0, "security");
}
var Mt = (() => {
  class t {
    static {
      this.ɵfac = function (a) {
        return new (a || t)();
      };
    }
    static {
      this.ɵcmp = D({
        type: t,
        selectors: [["root"]],
        decls: 4,
        vars: 0,
        template: function (a, n) {
          a & 1 && (v(0, Tl, 1, 0), I(1, 0, kl), F(), l(3, "router-outlet"));
        },
        dependencies: [H, Ue, O, $],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
Re(Mt, Vt);

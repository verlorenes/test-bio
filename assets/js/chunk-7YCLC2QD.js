import { d as a, ea as n, s as i } from "./chunk-BHYOVHPE.js";
var o = (() => {
  class e {
    constructor() {
      this.sanitizer = a(n);
    }
    transform(s, r) {
      let t = s
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/__(.*?)__/g, "<u>$1</u>")
        .replace(/--(.*?)--/g, "<del>$1</del>")
        .replace(
          /(https?:\/\/[^\s]+)/g,
          '<a href="$1" target="_blank" class="mnt">$1</a>'
        )
        .replace(/@(\w+)/g, '<a href="/$1" class="mnt">&#64;$1</a>')
        .replace(/\$(\w+)/g, '<a href="/group/$1" class="mnt">/$1</a>')
        .replace(
          /\[#([0-9a-fA-F]{6})\]\((.*?)\)/g,
          '<span style="color: #$1;">$2</span>'
        )
        .replace(
          /\{#([0-9a-fA-F]{6})\}\((.*?)\)/g,
          '<span style="background: #$1;">$2</span>'
        );
      return t.trim()
        ? r == "full"
          ? this.sanitizer.bypassSecurityTrustHtml(t)
          : r == "preview"
          ? this.sanitizer.bypassSecurityTrustHtml(
              t.length > 15
                ? t.substring(0, 15).replace(/\s\S*$/, "") + "..."
                : t
            )
          : this.sanitizer.bypassSecurityTrustHtml("")
        : this.sanitizer.bypassSecurityTrustHtml("");
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵpipe = i({ name: "contentPipe", type: e, pure: !0 });
    }
  }
  return e;
})();
export { o as a };

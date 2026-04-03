import { W as r, c as i, d as t, k as v } from "./chunk-BHYOVHPE.js";
var c = (() => {
  class e {
    constructor() {
      (this.request = t(r)),
        (this.configuration = v({
          name: "Criminal",
          hostname: "criminal.im",
          api: "https://criminal.im/api",
          static: "https://x.criminal.im/static",
          contact: {
            email: "mailto:s@criminal.im",
            discord: "https://discord.gg/thief",
          },
          placeholder: {
            username: "s",
            user_id: 1,
            avatar: "https://x.criminal.im/static/images/avatar.png",
            cosmetic: "kitty",
            color: "var(--c-c)",
            premium: !0,
            admin: !0,
            privacy: 1,
          },
          cosmetics: [
            { value: "air" },
            { value: "angry" },
            { value: "balance" },
            { value: "blackhole" },
            { value: "blades" },
            { value: "bloodthirsty" },
            { value: "bones" },
            { value: "breeze" },
            { value: "butterflies" },
            { value: "candle" },
            { value: "cat" },
            { value: "chilly" },
            { value: "chromawave" },
            { value: "cloudy" },
            { value: "clown" },
            { value: "confetti" },
            { value: "constellations" },
            { value: "dimension" },
            { value: "dismay" },
            { value: "dragon" },
            { value: "dusk" },
            { value: "earth" },
            { value: "edge" },
            { value: "electric" },
            { value: "energy" },
            { value: "eyes" },
            { value: "fairy" },
            { value: "fire" },
            { value: "flowers" },
            { value: "ghosts" },
            { value: "glitch" },
            { value: "graveyard" },
            { value: "headphones" },
            { value: "heart" },
            { value: "helsman" },
            { value: "hood" },
            { value: "ice" },
            { value: "implant" },
            { value: "ink" },
            { value: "jackolantern" },
            { value: "kabuto" },
            { value: "kitty" },
            { value: "koi" },
            { value: "lamb" },
            { value: "leaves" },
            { value: "leer" },
            { value: "lightning" },
            { value: "lights" },
            { value: "love" },
            { value: "malefic" },
            { value: "minions" },
            { value: "oni" },
            { value: "pirate" },
            { value: "potion" },
            { value: "puppy" },
            { value: "rage" },
            { value: "redcandle" },
            { value: "ring" },
            { value: "runes" },
            { value: "sakura" },
            { value: "shocked" },
            { value: "shuriken" },
            { value: "sigil" },
            { value: "skull" },
            { value: "snowing" },
            { value: "solar" },
            { value: "soul" },
            { value: "spirit" },
            { value: "spooky" },
            { value: "stardust" },
            { value: "starry" },
            { value: "strawhat" },
            { value: "sunrise" },
            { value: "sweating" },
            { value: "sword" },
            { value: "tears" },
            { value: "twilight" },
            { value: "venomous" },
            { value: "victory" },
            { value: "warrior" },
            { value: "water" },
            { value: "witch" },
            { value: "wizard" },
            { value: "zombie" },
          ],
        }));
    }
    headers() {
      if (!this.request) return { withCredentials: !0 };
      let a = (this.request.headers.get("Cookie") || "")
        .split(";")
        .map((u) => u.trim())
        .find((u) => u.startsWith("token="));
      return a ? { headers: { Cookie: a } } : {};
    }
    config(l) {
      return this.configuration()[l];
    }
    static {
      this.ɵfac = function (a) {
        return new (a || e)();
      };
    }
    static {
      this.ɵprov = i({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
export { c as a };

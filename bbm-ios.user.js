// ==UserScript==
// @name         ClutchGM — Basketball Monster redesign
// @namespace    https://github.com/thinhdinhlca/clutchgm-bbm
// @version      0.7.6
// @description  Restyles Basketball Monster pages and adds the Trade Monster guidance card. Personal install.
// @author       thinhdinhlca
// @match        *://basketballmonster.com/*
// @match        *://*.basketballmonster.com/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      publish.x.com
// @connect      api.allorigins.win
// @connect      api.codetabs.com
// @downloadURL  https://thinhdinhlca.github.io/clutchgm-bbm/bbm-ios.user.js
// @updateURL    https://thinhdinhlca.github.io/clutchgm-bbm/bbm-ios.user.js
// ==/UserScript==
// Loads the bundle from https://thinhdinhlca.github.io/clutchgm-bbm/. Besides player headshots on a.espncdn.com, a
// story that links a tweet fetches that tweet's text through X's oEmbed
// endpoint (directly when the manager grants it, else through a CORS proxy).
// The cgm-bbm class is the boot marker the extension also uses, so a second
// injection stands down instead of doubling the page furniture.
(() => {
  "use strict";
  const BASE = "https://thinhdinhlca.github.io/clutchgm-bbm/";
  const boot = () => {
    const root = document.documentElement;
    if (!root || root.classList.contains("cgm-bbm")) return;
    root.classList.add("cgm-bbm");

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = BASE + "src/bbm.css";
    const script = Object.assign(document.createElement("script"), { type: "module", src: BASE + "src/bbm-page.js" });
    // document-start can arrive before a head exists, so the first element that
    // does carries the two tags; a stylesheet and a script apply from anywhere.
    (document.head || root).append(link, script);
  };
  if (document.documentElement) boot();
  else new MutationObserver((_, observer) => {
    if (!document.documentElement) return;
    observer.disconnect();
    boot();
  }).observe(document, { childList: true, subtree: true });
})();

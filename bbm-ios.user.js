// ==UserScript==
// @name         ClutchGM — Basketball Monster redesign
// @namespace    https://github.com/thinhdinhlca/clutchgm-bbm
// @version      0.2.0
// @description  Restyles Basketball Monster pages and adds the Trade Monster guidance card. Personal install.
// @author       thinhdinhlca
// @match        *://basketballmonster.com/*
// @match        *://*.basketballmonster.com/*
// @run-at       document-start
// @grant        none
// @downloadURL  https://thinhdinhlca.github.io/clutchgm-bbm/bbm-ios.user.js
// @updateURL    https://thinhdinhlca.github.io/clutchgm-bbm/bbm-ios.user.js
// ==/UserScript==
// Loads the bundle from https://thinhdinhlca.github.io/clutchgm-bbm/. Nothing is fetched from anywhere else except
// player headshots on a.espncdn.com. The cgm-bbm class is the boot marker the
// extension also uses, so a second injection stands down instead of doubling
// the page furniture.
(() => {
  "use strict";
  const BASE = "https://thinhdinhlca.github.io/clutchgm-bbm/";
  const root = document.documentElement;
  if (!root || root.classList.contains("cgm-bbm")) return;
  root.classList.add("cgm-bbm");

  const add = (node) => (document.head || root).append(node);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = BASE + "src/bbm.css";
  add(link);

  const load = () => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = BASE + "src/bbm-page.js";
    add(script);
  };
  if (document.head) load();
  else document.addEventListener("DOMContentLoaded", load, { once: true });
})();

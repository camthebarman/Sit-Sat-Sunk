/* theme.js — dark mode toggle. Loaded in <head> so the stored preference
   applies before first paint (no flash of the wrong theme). */
(function () {
  var KEY = "sitSatSunk.theme";

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function getStored() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  // A theme already stamped on the document by whatever is hosting the page.
  function hostTheme() {
    var attr = document.documentElement.getAttribute("data-theme");
    return attr === "dark" || attr === "light" ? attr : null;
  }

  // The theme actually in effect right now: this app's own stored choice first,
  // then a theme the host has already stamped, then whatever the OS prefers.
  function effective() {
    var stored = getStored();
    if (stored === "dark" || stored === "light") return stored;
    return hostTheme() || (systemPrefersDark() ? "dark" : "light");
  }

  function apply(theme) {
    if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.setAttribute("data-theme", "light");
  }

  function set(theme) {
    try {
      localStorage.setItem(KEY, theme);
    } catch (e) {}
    apply(theme);
  }

  function toggle() {
    var next = effective() === "dark" ? "light" : "dark";
    set(next);
    return next;
  }

  // Apply immediately so the page never flashes the wrong theme.
  apply(effective());

  window.Theme = { effective: effective, set: set, toggle: toggle };
})();

// Based on:
// https://github.com/donavon/use-dark-mode/blob/develop/noflash.js.txt
(function () {
  const storageKey = "colorMode";
  const classNameDark = "dark";
  const classNameLight = "light";

  function setClassOnDocument(isDarkMode) {
    document.documentElement.classList.add(
      isDarkMode ? classNameDark : classNameLight
    );
    document.documentElement.classList.remove(
      isDarkMode ? classNameLight : classNameDark
    );
  }

  const preferDarkQuery = "(prefers-color-scheme: dark)";
  const mql = window.matchMedia(preferDarkQuery);
  const supportsColorSchemeQuery = mql.media === preferDarkQuery;
  let localStorageTheme = null;
  try {
    localStorageTheme = localStorage.getItem(storageKey);
    // eslint-disable-next-line
  } catch (error) {}

  // Determine the source of truth.
  if (localStorageTheme) {
    // Source of truth from localStorage.
    setClassOnDocument(localStorageTheme === "dark");
  } else if (supportsColorSchemeQuery) {
    // Source of truth from system.
    setClassOnDocument(mql.matches);
    localStorage.setItem(storageKey, mql.matches ? "dark" : "light");
  } else {
    // Source of truth from document.body.
    const isDarkMode = document.body.classList.contains(classNameDark);
    localStorage.setItem(storageKey, isDarkMode ? "dark" : "light");
  }
})();

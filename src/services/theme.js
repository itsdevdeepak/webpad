export default class Theme {
  static VALID_THEMES = ['dark', 'light', 'system'];
  #initialized = false;
  #mediaQuery;

  init() {
    if (this.#initialized == true) return;

    this.#mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    window.store = window.store || {};
    window.store.theme = this.getCurrentTheme();
    this.setTheme(window.store.theme);

    this.#mediaQuery.addEventListener(
      'change',
      this.#handleThemeChange.bind(this)
    );

    this.#initialized = true;
  }

  setTheme(theme) {
    if (!this.#validateTheme(theme)) throw new Error('Invalid theme');

    window.store.theme = theme;
    const bodyElement = document.querySelector('body');

    if (theme === 'system') {
      bodyElement.dataset.theme = this.#mediaQuery.matches ? 'dark' : 'light';
    } else {
      bodyElement.dataset.theme = theme;
    }
  }

  getCurrentTheme() {
    const storedTheme = window.store?.theme;

    if (!storedTheme || !Theme.VALID_THEMES.includes(storedTheme)) {
      return 'system';
    }

    return storedTheme;
  }

  #validateTheme(theme) {
    return !(
      !theme ||
      typeof theme !== 'string' ||
      !Theme.VALID_THEMES.includes(theme)
    );
  }

  #handleThemeChange() {
    const currentTheme = this.getCurrentTheme();
    if (currentTheme === 'system') {
      this.setTheme(currentTheme);
    }
  }
}

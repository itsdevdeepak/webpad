export default class Theme {
  static VALID_COLOR_SCHEMES = ['dark', 'light', 'system'];
  static VALID_FONTS = ['san-serif', 'serif', 'monospace'];

  #initialized = false;
  #mediaQuery;

  init() {
    if (this.#initialized == true) return;

    this.#mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    window.store = window.store || {};
    window.store.theme = this.getCurrentTheme();
    this.setColorScheme(window.store.theme.colorScheme);
    this.setFont(window.store.theme.font);

    this.#mediaQuery.addEventListener(
      'change',
      this.#handleColorSchemeChange.bind(this)
    );

    this.#initialized = true;
  }

  setColorScheme(colorScheme) {
    if (!this.#isValidColorScheme(colorScheme))
      throw new Error('Invalid Color Scheme');

    window.store.theme.colorScheme = colorScheme;
    const bodyElement = document.querySelector('body');

    if (colorScheme === 'system') {
      bodyElement.dataset.colorScheme = this.#mediaQuery.matches
        ? 'dark'
        : 'light';
    } else {
      bodyElement.dataset.colorScheme = colorScheme;
    }
  }

  setFont(font) {
    if (!this.#isValidFont(font)) throw new Error('Invalid Font');

    window.store.theme.font = font;
    document.querySelector('body').dataset.font = font;
  }

  getCurrentTheme() {
    let { colorScheme, font } = window.store.theme || {
      theme: 'system',
      font: 'san-serif'
    };

    if (!Theme.VALID_COLOR_SCHEMES.includes(colorScheme)) {
      colorScheme = 'system';
    }

    if (!Theme.VALID_FONTS.includes(font)) {
      font = 'san-serif';
    }

    return { colorScheme, font };
  }

  #isValidColorScheme(theme) {
    return !(
      !theme ||
      typeof theme !== 'string' ||
      !Theme.VALID_COLOR_SCHEMES.includes(theme)
    );
  }

  #isValidFont(font) {
    return !(
      !font ||
      typeof font !== 'string' ||
      !Theme.VALID_FONTS.includes(font)
    );
  }

  #handleColorSchemeChange() {
    const currentTheme = this.getCurrentTheme();
    if (currentTheme === 'system') {
      this.setColorScheme(currentTheme);
    }
  }
}

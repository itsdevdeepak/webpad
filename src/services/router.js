import renderNotFound from '../views/not_found.js';

export default class Router {
  #routes;
  #redirects;
  #initialized = false;

  constructor(routes, redirects = {}) {
    if (!this.#hasValidRoutes(routes)) throw new Error('Invalid routes');
    this.#routes = routes;

    if (!this.#hasValidRedirects(redirects, routes))
      throw new Error('Invalid redirects');
    this.#redirects = redirects;
  }

  init() {
    if (this.#initialized) return;

    window.store = window.store || {};
    window.store.router = this;
    this.#initialized = true;

    this.#bindNavigationEvents();

    window.addEventListener('popstate', event => {
      this.navigateTo(event.state.route, false);
    });

    this.navigateTo(location.pathname);
  }

  navigateTo(route, addToHistory = true) {
    if (route in this.#redirects) {
      route = this.#redirects[route];
    }

    if (addToHistory) history.pushState({ route }, null, route);

    const { path, params } = this.#getPathAndPrams(route);

    this.#unbindNavigationEvents();

    if (path in this.#routes) {
      const { view, location } = this.#routes[path];
      this.#attachNewElement(view(params), location, params);
    } else {
      this.#attachNewElement(renderNotFound(), '.main');
    }

    this.#bindNavigationEvents();
  }

  #getPathAndPrams(route) {
    const splitResult = route.split('/id/');

    if (splitResult.length >= 3) return;

    if (splitResult.length == 1) {
      return { path: splitResult[0], params: {} };
    } else {
      if (splitResult[1].split('/').length > 1) return;

      return {
        path: splitResult[0] + '/id/:id',
        params: { id: splitResult[1] }
      };
    }
  }

  #attachNewElement(viewComponent, targetSelector) {
    if (!(viewComponent instanceof HTMLElement))
      throw new Error('Invalid View');

    const targetElement = document.querySelector(targetSelector);
    targetElement.innerHTML = '';
    targetElement.appendChild(viewComponent);
    window.scrollTo(0, 0);
  }

  #hasValidRoutes(routes) {
    if (!routes || typeof routes !== 'object') return false;

    for (const [path, options] of Object.entries(routes)) {
      if (!this.#isValidPath(path)) return false;
      if (typeof options.location !== 'string') return false;
      if (
        typeof options.view !== 'function' ||
        !(options.view({}) instanceof HTMLElement)
      )
        return false;
    }

    return true;
  }

  #hasValidRedirects(redirects, routes) {
    if (!redirects || typeof redirects !== 'object') return false;

    const isValid = Object.entries(redirects).every(redirect => {
      const [path1, path2] = redirect;
      if (!(this.#isValidPath(path1) && this.#isValidPath(path2))) return false;
      if (!(path2 in routes)) return false;
      return true;
    });

    return isValid;
  }

  #isValidPath(path) {
    if (typeof path !== 'string' || !path.startsWith('/')) return false;
    return true;
  }

  #unbindNavigationEvents() {
    document.querySelectorAll('.app-nav').forEach(nav => {
      nav.removeEventListener('click', this.#handleNavClick.bind(this), false);
    });
  }

  #bindNavigationEvents() {
    document.querySelectorAll('.app-nav').forEach(nav => {
      nav.addEventListener('click', this.#handleNavClick.bind(this), false);
    });
  }

  #handleNavClick(event) {
    event.preventDefault();
    const url = event.target.getAttribute('href');

    if (url !== location.pathname) {
      this.navigateTo(url);
    }
  }
}

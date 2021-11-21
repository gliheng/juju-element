import Emitter from '../utils/emitter';

export default class Router extends Emitter {
  currentRoute?: Route;

  constructor(private _routerConfig: {
    routes: Route[];
    notFound?(name?: string): string | string;
  }) {
    super();
    window.addEventListener('popstate', this.onPopState);

    const path = location.pathname;
    let route = this.getRouteByPath(path);
    if (route) {
      this.currentRoute = route;
    }
  }

  onPopState = (_evt: Event) => {
    let state = history.state;
    let currentRoute: Route | undefined;
    if (!state || !state.name) {
      // If no state is retrived from history
      // match by path
      const path = location.pathname;
      currentRoute = this.getRouteByPath(path);
    } else {
      currentRoute = this.getRoute(state.name);
    }
    this._changeRoute(currentRoute);
  };

  public getNotFoundRoute(from?: string) {
    let { notFound } = this._routerConfig;
    if (typeof notFound == 'string') {
      return notFound;
    } else if (typeof notFound == 'function') {
      return notFound(from);
    }
    throw 'Not found url is not set'
  }

  public getRoute(name: string): Route | undefined {
    let route = this._routerConfig.routes.find((r) => r.name == name);
    if (route) {
      return route;
    } else {
      let notFound = this.getNotFoundRoute(name);
      if (notFound) {
        this.push(notFound);
      } else {
        throw `Route with name ${name} cannot be found`;
      }
    }
    return undefined;
  }

  public getRouteByPath(path: string): Route | undefined {
    let route = this._routerConfig.routes.find((r) => {
      return path.startsWith(r.path) && (
        path.length == r.path.length || path[r.path.length] == '/'
      );
    });
    if (route) {
      return route;
    } else {
      let notFound = this.getNotFoundRoute(path);
      if (notFound) {
        this.push(notFound);
      } else {
        throw `Route with path ${path} cannot be found`;
      }
    }
    return undefined;
  }

  public push(name: string) {
    if (this.currentRoute?.name == name) return;

    const route = this.getRoute(name);
    if (!route) return;
    history.pushState({ name }, '', route.path);
    this._changeRoute(route);
  }

  public replace(name: string) {
    if (this.currentRoute?.name == name) return;

    const route = this.getRoute(name);
    if (!route) return;
    history.replaceState({ name }, '', route.path);
  }
  
  private _changeRoute(route: Route | undefined) {
    if (!route || this.currentRoute == route) {
      return;
    }
  
    let oldRoute = this.currentRoute;
    this.currentRoute = route;
    this.emit('change', [route, oldRoute]);
  }

  moduleCache: Map<string, ExternalModule> = new Map();

  private async resolveModule(name: string): Promise<ExternalModule> {
    
    let m: any = this.moduleCache.get(name);
    if (m) return m;
    
    let route = this._routerConfig.routes.filter((r) => r.name == name)[0];
    if (!route) throw `No route with name ${name} found`;
    if (typeof route.component == 'function' && !(route.component.prototype instanceof HTMLElement)) {
      m = await route.component();
      if (m) {
        m = m.default || m;
      }
    } else {
      m = route.component;
    }
    if (!m) throw `Cannot resolve module ${name}`;
    this.moduleCache.set(name, m);
    return m;
  }

  public async unmountRoute(dom: HTMLElement | ShadowRoot, route: Route) {
    let m = await this.resolveModule(route.name);
    if (typeof m == 'function') {
      if (dom.firstElementChild) {
        dom.removeChild(dom.firstElementChild);
      }
    } else {
      m.unmount(dom);
    }
  }
  
  public async mountRoute(dom: HTMLElement | ShadowRoot, route: Route) {
    let m = await this.resolveModule(route.name);
    if (typeof m == 'function') {
      dom.appendChild(new m());
    } else {
      m.mount(dom, route);
    }
  }
}

type ElementConstructor = new() => HTMLElement;

export type ExternalModule = {
  mount: (root: HTMLElement | ShadowRoot, route: Route) => void;
  unmount: (root: HTMLElement | ShadowRoot) => void;
} | ElementConstructor;

export interface Route {
  name: string;
  path: string;
  component: () => Promise<ExternalModule> | ExternalModule;
}

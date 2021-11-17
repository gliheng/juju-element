import Emitter from "./event";

export default class Router extends Emitter {
  currentRoute: Route;
  constructor(private _routeConfig: RouteConfig) {
    super();
    window.addEventListener("popstate", this.onPopState);

    const path = location.pathname;
    this.currentRoute = this.getRouteByPath(path);
  }

  onPopState = (_evt: Event) => {
    let state = history.state;
    let currentRoute: Route;
    if (!state || !state.name) {
      // If no state is retrived from history
      // match by path
      const path = location.pathname;
      currentRoute = this.getRouteByPath(path);
    } else {
      currentRoute = this.getRoute(state.name);
    }
    if (this.currentRoute != currentRoute) {
      this.currentRoute = currentRoute;
      this.emit("change", currentRoute);
    }
  };

  private getRoute(name: string): Route {
    let route = this._routeConfig.routes.find((r) => r.name == name);
    if (!route) {
      if (this._routeConfig.notFound) {
        return this.getRoute(this._routeConfig.notFound(name));
      }

      throw `Route with name ${name} cannot be found`;
    } else {
      return route;
    }
  }

  private getRouteByPath(path: string): Route {
    let route = this._routeConfig.routes.find((r) => path.startsWith(r.path));
    if (!route) {
      if (this._routeConfig.notFound) {
        return this.getRoute(this._routeConfig.notFound(path));
      }

      throw `No route found for path ${path}`;
    }
    return route;
  }

  push(name: string) {
    if (this.currentRoute.name == name) return;

    const route = this.getRoute(name);
    history.pushState({ name }, "", route.path);
    this.currentRoute = route;
    this.emit("change", route);
  }

  replace(name: string) {
    if (this.currentRoute.name == name) return;

    const route = this.getRoute(name);
    history.replaceState({ name }, "", route.path);
    this.currentRoute = route;
    this.emit("change", route);
  }
}

export interface SubApp {
    mount: (root: Element, route: Route) => void;
    unmount: (root: Element) => void;
  }
  
  export interface Route {
    name: string;
    path: string;
    component: () => Promise<SubApp>;
  }
  
  export interface RouteConfig {
    routes: Route[];
    notFound?(name: string): string;
  }
  
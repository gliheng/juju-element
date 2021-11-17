import { LitElement, html, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import Router, { SubApp, Route } from "./router";
import { routeConfig, nav } from "../routes";


const moduleCache: Map<string, SubApp> = new Map();

async function resolveModule(name: string): Promise<SubApp> {
  let module = moduleCache.get(name);
  if (module) return module;

  let route = routeConfig.routes.filter((r) => r.name == name)[0];
  if (!route) throw `No route with name ${name} found`;
  module = await route.component();
  moduleCache.set(name, module);
  return module;
}

async function unmountRoute(dom: Element, route: Route) {
  let m = await resolveModule(route.name);
  m.unmount(dom);
}

async function mountRoute(dom: Element, route: Route) {
  let module = await resolveModule(route.name);
  module.mount(dom, route);
}

@customElement("j-router-view")
class RouterView extends LitElement {
  routerViewRef: Ref<HTMLElement> = createRef();

  @property({ type: Object })
  route?: Route;

  createRenderRoot() {
    return this;
  }

  async update(changed: PropertyValues) {
    super.update(changed);
    if (!changed.has("route")) return;
    let oldRoute = changed.get("route") as Route;
    let root = this.routerViewRef.value;
    if (root) {
      if (oldRoute) {
        await unmountRoute(root, oldRoute);
      }
      if (this.route) {
        await mountRoute(root, this.route);
      }
    }
  }

  // Is this required? Since update event will also fire before firstUpdated event
  // firstUpdated() {
  //   if (this.name) {
  //     mountRoute(this.routerViewRef.value!, this.name);
  //   }
  // }

  render() {
    return html`<div ${ref(this.routerViewRef)}></div>`;
  }
}

@customElement("j-router-app")
export class RouterApp extends LitElement {
  public router: Router;

  constructor() {
    super();
    this.router = new Router(routeConfig);
    this.router.on<Route>("change", this.onRouteChange);
    this.currentRoute = this.router.currentRoute;
  }

  private onRouteChange = (route?: Route) => {
    if (route) {
      this.currentRoute = route;
    }
  };

  createRenderRoot() {
    return this;
  }

  @property({ attribute: false, type: Object })
  currentRoute;

  private navigate(name: string) {
    this.router.push(name);
  }

  render() {
    let menu;
    if (nav.length) {
      menu = html`<div class="menu">
        ${nav.map((page) => {
          return html`<button
            @click=${this.navigate.bind(this, page)}
            part="button"
          >
            ${page}
          </button>`;
        })}
      </div>`;
    }
    return html`
      ${menu}
      <j-router-view .route=${this.currentRoute}></j-router-view>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "j-router-app": RouterApp;
    "j-router-view": RouterView;
  }
}

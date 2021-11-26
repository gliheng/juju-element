import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import Router, { Route } from "./router";

export { Router };

class RouterAwareElement extends LitElement {
  router?: Router;

  onRouterChange = async ([route, _]: [Route, Route?]) => {}
  
  connectedCallback() {
    super.connectedCallback();
    let routerNode = this.closest('j-router-app');
    if (!routerNode || !routerNode.router) {
      throw 'router-view need a router-app ancestor node';
    }
    let router = routerNode.router;
    // @ts-ignore
    router.on('change', this.onRouterChange);
    this.router = router;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // @ts-ignore
    this.router!.off('change', this.onRouterChange);
  }
}

@customElement("j-router-link")
export class RouterLink extends RouterAwareElement {
  static styles = css`
    a[data-active] {
      color: var(--primary-color);
    }
  `;

  onRouterChange = async ([route, _]: [Route, Route?]) => {
    this.active = this.name == route.name;
  }

  private onClick(evt: PointerEvent) {
    if (!this.name) throw 'router-link muse have a name';
    this.router?.push(this.name);
    evt.preventDefault();
  }

  @property()
  name?: string;

  @state()
  private active = false;

  render() {
    let url = '';
    if (this.name) {
      let route = this.router?.getRoute(this.name);
      url = route?.path || '';
    }
    return html`
    <a ?data-active=${this.active} @click=${this.onClick} href=${url}>
      <slot></slot>
    </a>`;
  }
}

@customElement("j-router-view")
export class RouterView extends RouterAwareElement {
  @property({
    type: Boolean,
  })
  useShadow = true;

  createRenderRoot() {
    if (this.useShadow) {
      return super.createRenderRoot();
    }
    return this;
  }

  onRouterChange = async ([route, oldRoute]: [Route, Route?]) => {
    if (oldRoute) {
      await this.router!.unmountRoute(this.renderRoot, oldRoute);
    }
    if (route) {
      await this.router!.mountRoute(this.renderRoot, route);
    }
  }

  firstUpdated() {
    this.router!.mountRoute(this.renderRoot, this.router!.currentRoute!);
  }
}

@customElement("j-router-app")
export class RouterApp extends LitElement {
  @property({
    attribute: false,
    type: Object,
  })
  router?: Router;

  @property({
    type: Boolean,
  })
  useShadow = true;

  createRenderRoot() {
    if (this.useShadow) {
      return super.createRenderRoot();
    }
    return this;
  }

  navigate(name: string) {
    this.router?.push(name);
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "j-router-app": RouterApp;
    "j-router-view": RouterView;
    "j-router-link": RouterLink;
  }
}

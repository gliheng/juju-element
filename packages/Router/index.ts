import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import Router, { Route } from "./router";

export { Router };

@customElement("j-router-view")
class RouterView extends LitElement {
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

  connectedCallback() {
    super.connectedCallback();
    let routerNode = this.closest('j-router-app');
    if (!routerNode || !routerNode.router) {
      throw 'router-view need a router-app ancestor node';
    }
    this.router = routerNode.router;
    this.router.on('change', this.onRouterChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.router!.off('change', this.onRouterChange);
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
  }
}

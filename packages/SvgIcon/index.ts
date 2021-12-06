import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { camelCase } from '../utils/string';

async function fetchIcons() {
  let icons = await import('ionicons/icons');
  return icons as unknown as Record<string, string>;
}

let loadingIcons: Promise<Record<string, string>>;
let icons: Record<string, string>;

@customElement('j-svg-icon')
export default class SvgIcon extends LitElement {
  constructor() {
    super();
    if (!loadingIcons) {
      let promise = fetchIcons();
      loadingIcons = promise;
      promise.then(_icons => {
        icons = _icons;
      });
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (!icons) {
      loadingIcons.then(() => this.requestUpdate());
    }
  }

  static styles = css`
    :host {
      display: inline-block;
    }
    .j-icon {
      display: inline-block;
      vertical-align: middle;
    }
    .j-icon[data-size="sm"] {
      width: 16px;
      height: 16px;
      min-width: 16px;
      min-height: 16px;
    }
    .j-icon[data-size="md"] {
      width: 24px;
      height: 24px;
      min-width: 24px;
      min-height: 24px;
    }
    .j-icon[data-size="lg"] {
      width: 32px;
      height: 32px;
      min-width: 32px;
      min-height: 32px;
    }
    .j-icon-svg {
      display: block;
      line-height: 0;
      width: 100%;
      height: 100%;
    }
    .j-icon-svg svg {
      width: 100%;
      height: 100%;
    }
    .ionicon {
      fill: currentColor;
      stroke: currentColor;
    }
    .ionicon-fill-none {
      fill: none;
    }
    .ionicon-stroke-width {
      stroke-width: 32px;
    }
  `;

  @property()
  name: string = 'alarm';

  @property()
  svg?: string;

  @property()
  viewBox = '0 0 512 512';

  @property()
  size = 'md';
  
  private getIconSvg(): string {
    if (!this.name || !icons) return '';
    let str = (icons as Record<string, string>)[camelCase(this.name)];
    if (!str) return '';
    let start = str.indexOf('<');
    return str.substring(start).replace(/<title>.*?<\/title>/, '');
  }
  
  render() {
    const svg = this.svg || this.getIconSvg();
    return html`
      <i class="j-icon" data-size=${this.size}>
        <i class="j-icon-svg">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="ionicon"
            viewBox=${this.viewBox}>
            ${unsafeSVG(svg)}
          </svg>
        </i>
      </i>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'j-svg-icon': SvgIcon,
  }
}
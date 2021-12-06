import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import RippleElement from '../Button/ripple';
import '../SvgIcon';

@customElement('j-list-tile')
export default class ListTile extends LitElement {
  static styles = css`
    ul {
      padding: 0;
      margin: 0;
    }
  `;

  @state()
  selectedIdx = -1;

  @property({
    type: Array,
  })
  items: {label?: string, icon?: string, key?: string}[] = [];

  select(i: number) {
    this.selectedIdx = i;
    this.requestUpdate();
  }

  private onClick(evt: PointerEvent) {
    let item: HTMLElement | null = (evt.target as HTMLElement).closest('j-list-tile-item');
    if (item) {
      let i = parseInt(item.dataset.i!);
      this.selectedIdx = i;
      this.dispatchEvent(new CustomEvent('select', {
        detail: this.items[i],
      }));
    }
  }

  render() {
    return html`
      <ul @click=${this.onClick}>
        ${repeat(this.items, (e, i) => e.key || i, ({label, icon}, i) => {
          return html`
            <j-list-tile-item
              ?data-selected=${this.selectedIdx == i}
              data-i=${i}
              .label=${label}
              .icon=${icon}
            ></j-list-tile-item>`;
        })}
      </ul>
    `;
  }
}

@customElement('j-list-tile-item')
export class ListTileItem extends RippleElement {
  static styles = [
    RippleElement.styles,
    css`
      :host {
        display: block;
      }
      .j-list-item {
        display: flex;
        align-items: center;
        height: 24px;
        margin: 1px;
        padding: 8px;
        list-style: none;
        background-color: var(--primary-color-lighter);
      }
      :host([data-selected]) .j-list-item {
        background-color: var(--primary-color);
        color: var(--primary-color-text);
      }
      j-svg-icon {
        margin-right: 4px;
      }
    `
  ];

  @property()
  label?: string;

  @property()
  icon?: string;

  render() {
    let icon;
    if (this.icon) {
      icon = html`<j-svg-icon size="md" name=${this.icon} />`;
    }
    return html`<li class="j-list-item">
      ${icon}
      ${this.label}
    </li>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'j-list-tile': ListTile,
    'j-list-tile-item': ListTileItem,
  }
}

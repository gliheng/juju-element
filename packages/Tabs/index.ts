import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js';
import '../Button';

@customElement('j-tabs')
export class Tabs extends LitElement {
  static styles = css`
    .bar {
      border-bottom: 2px solid var(--foreground-color-2);
      position: relative;
      display: flex;
      white-space: nowrap;
    }
    .bar-inner {
      display: flex;
    }
    .close {
      display: inline-block;
      line-height: 0;
    }
    .close:hover {
      background-color: var(--foreground-color-1);
    }
    .spacer {
      flex: 1;
    }
    .active-bar {
      transition: left .2s cubic-bezier(.645,.045,.355,1), width .2s;
      height: 2px;
      background-color: var(--primary-color);
      position: absolute;
      bottom: -2px;
    }
  `;
  
  @state()
  private _current: number = 0;

  @state()
  private _activeBarWidth = 0;
  
  @state()
  private _activeBarLeft = 0;

  @property({ type: Boolean })
  card = false;

  _setActive(i: number) {
    if (this._current != i) {
      if (typeof this._current == 'number') {
        (this.children[this._current] as TabPane).visible = false;
      }
    }
    this._current = i;
    (this.children[this._current] as TabPane).visible = true;

    
    this._setActiveBarStyle();
  }

  _setActiveBarStyle() {
    // change this to nextTick?
    setTimeout(() => {
      let btn = this.shadowRoot?.querySelector(`j-button:nth-child(${this._current + 1})`) as HTMLElement;
      if (btn) {
        this._activeBarWidth = btn.clientWidth;
        this._activeBarLeft = btn.offsetLeft;
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this._setActive(0);
  }

  render() {
    return html`
      <div class="tabs" ?data-card=${this.card}>
        <header class="bar">
          <div class="bar-inner">
            ${Array.from(this.children).map((tab, i) => html`
              <j-button outlined @click="${
                this._setActive.bind(this, i)
              }">
                ${tab.getAttribute('name')}
              </j-button>
            `)}
          </div>
          <div class="spacer"></div>
          <div class="active-bar" style=${styleMap({
            left: `${this._activeBarLeft}px`,
            width: `${this._activeBarWidth}px`,
          })}></div>
        </header>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

@customElement('j-tab-pane')
export class TabPane extends LitElement {
  @property({type: Boolean})
  visible = false;

  render() {
    let content;
    if (this.visible) {
      content = html`<slot></slot>`;
    }
    return html`
      <div>${content}</div>`
    ;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'j-tabs': Tabs,
    'j-tab-pane': TabPane,
  }
}

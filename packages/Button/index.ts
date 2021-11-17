import { html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import themeVars from '../utils/directives/theme-vars-directive';
import RippleElement from './ripple';

@customElement('j-button')
export default class Button extends RippleElement {
  static styles = [
    RippleElement.styles,
    css`
    :host {
      display: inline-block;
    }

    button {
      border: none;
      outline: none;
      padding: 0 0.7rem;
      height: 32px;
      border-radius: 3px;
      box-sizing: border-box;
      user-select: none;
      direction: ltr;
      transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s, opacity 0.2s;
      vertical-align: middle;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
      cursor: pointer;

      background-color: var(--primary-color);
      border: 1px solid var(--primary-color);
      color: var(--primary-color-text);
    }
    button:focus {
      box-shadow: var(--outline);
      z-index: 1;
    }
    button:hover {
      opacity: 0.75;
    }
    button[disabled] {
      opacity: 0.5;
    }
    button[data-flat] {
      background-color: transparent;
      color: var(--primary-color);
      border-color: transparent;
    }
    button[data-raised] {
      box-shadow: var(--shadow);
    }
    button[data-raised]:focus {
      box-shadow: var(--shadow), var(--outline);
    }
    button[data-outlined] {
      background-color: transparent;
      color: var(--primary-color);
      border: 1px solid var(--primary-color);
      box-sizing: border-box;
    }
    button[data-round] {
      border-radius: 10rem;
    }
    button[data-size="sm"] {
      font-size: 0.75rem;
      padding: 0 0.5rem;
      height: 24px;
    }
    button[data-size="sm"] {
      font-size: 0.75rem;
      padding: 0 0.5rem;
      height: 24px;
    }
    button[data-size="lg"] {
      font-size: 1.2rem;
      padding: 0 1.25rem;
      height: 42px;
    }
  `];
  
  @property({ type: Boolean })
  raised = false;

  @property({ type: Boolean })
  flat = false;

  @property({ type: Boolean })
  round = false;

  @property({ type: Boolean })
  outlined = false;

  @property({ type: String })
  size = 'md';

  @property({ type: String })
  theme = 'primary';

  render() {
    return html`
      <style>
        ${themeVars(this.theme)}
      </style>
      <button
        ?data-raised=${this.raised}
        ?data-flat=${this.flat}
        ?data-outlined=${this.outlined}
        ?data-round=${this.round}
        data-size=${this.size}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'j-button': Button,
  }
}

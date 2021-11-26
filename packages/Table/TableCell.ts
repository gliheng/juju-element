import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js';

@customElement('table-cell')
export class TableCellElement extends LitElement {
  static styles = css`
  :host {
    position: absolute;
  }
  :host(.last-row) .j-cell {
    border-bottom: none;
  }
  :host(.last-col) .j-cell {
    border-right: none;
  }
  .j-cell {
    padding: 10px;
    width: 100%;
    height: 100%;
    border-bottom: var(--table-border);
    border-right: var(--table-border);
    position: relative;
    box-sizing: border-box;
  }
  `; 

  @property({ attribute: false })
  x = 0;

  @property({ attribute: false })
  y = 0;

  @property({ attribute: false })
  height = 40;

  @property({ attribute: false })
  width = 120;

  render() {
    return html`
    <style>
      :host {
        top: ${this.y}px;
        left: ${this.x}px;
        width: ${this.width}px;
        height: ${this.height}px;
      }
    </style>
    <div class="j-cell"><slot></slot></div>`;
  }
}
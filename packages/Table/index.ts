import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import './TableCell';

interface Config {
  width: number;
  height: number;
  color: string;
  fixed: 'left' | 'right' | 'top' | 'bottom';
}

interface Cell {
  x: number;
  y: number;
  w: number;
  h: number;
  i: number;
  j: number;
}

/**
 * A table element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('j-table')
export class Table extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      --table-border: 1px solid silver;
    }
    .j-table-view {
      border: var(--table-border);
      position: relative;
      width: 100%;
      overflow: hidden;
    }
  `

  // use content width
  @property({
    type: Boolean,
    attribute: 'h-virtual',
  })
  hVirutal = false;

  // use content height
  @property({
    type: Boolean,
    attribute: 'v-virtual',
  })
  vVirutal = false;

  @property({
    type: Number,
  })
  width?: number;

  @property({
    type: Number
  })
  height?: number;

  @state()
  private mappedData: Record<string, unknown> = {};

  @state()
  private rowCount = 0;

  @state()
  private colCount = 0;

  @state()
  private cells: Cell[] = []

  @state()
  totalWidth: number = 0;

  @state()
  totalHeight: number = 0;

  @state()
  rootWidth: number = 0;

  @state()
  rootHeight: number = 0;

  private _layout({
    clientWidth,
    clientHeight,
  }: {
    clientWidth: number,
    clientHeight: number,
  }) {
    const cellSize = [120, 40];
    let { cells } = this;
    cells.length = 0;

    let x = 0, y = 0;
    for (let i = 0; i < this.rowCount; i++) {
      x = 0;
      for (let j = 0; j < this.colCount; j++) {
        cells.push({
          x, y,
          w: cellSize[0],
          h: cellSize[1],
          i, j,
        });
        x += cellSize[0];
      }
      y += cellSize[1];
      this.totalWidth = x;
    }
    this.totalHeight = y;
  }

  set data(arr: unknown[][]) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        this.mappedData[`${i}:${j}`] = arr[i][j];
      }
      this.colCount = Math.max(this.colCount, arr[i].length);
    }
    this.rowCount = arr.length;
  };

  setData(data: unknown[][] | Record<string, Record<string, unknown>>, i: number = 0, j: number = 0) {

  }

  config(c: Config) {
    
  }

  configRow(c: Config, i: number) {

  }

  configColumn(c: Config, i: number) {

  }

  configCell(c: Config, i: number, j: number) {

  }

  firstUpdated() {
  }
  
  connectedCallback() {
    super.connectedCallback();
    let host = this.shadowRoot?.host!;
    let { clientWidth, clientHeight } = host;

    // user set width, then use user set css, then fallback to element height
    if (this.hVirutal) {
      let width = this.width;
      let cssWidth = getComputedStyle(this.renderRoot.host)['max-width'];
      if (cssWidth) {
        width = parseInt(cssWidth);
      } else if (!width) {
        width = clientWidth;
      }
      clientWidth = width;
    } else {
      clientWidth = Infinity;
    }

    if (this.vVirutal) {
      let height = this.height;
      let cssHeight = getComputedStyle(this.renderRoot.host)['max-height'];
      if (cssHeight) {
        height = parseInt(cssHeight);
      } else if (!height) {
        height = clientWidth;
      }
      clientHeight = height;
    } else {
      clientHeight = Infinity;
    }
    
    this.rootWidth = clientWidth;
    this.rootHeight = clientHeight;
    
    this._layout({
      clientWidth,
      clientHeight,
    });
  }

  render() {
    let tableCells = this.cells.map(cell => {
      let pos = `${cell.i}:${cell.j}`;
      let lastRow = cell.i == this.rowCount - 1;
      let lastCol = cell.j == this.colCount - 1;
      return html`<table-cell
        class=${classMap({
          'last-col': lastCol,
          'last-row': lastRow,
        })}
        .x=${cell.x}
        .y=${cell.y}
        .i=${cell.i}
        .j=${cell.j}
        ?last-row=${lastRow}
        ?last-col=${lastCol}
        .width=${cell.w}
        .height=${cell.h}>${this.mappedData[pos]}</table-cell>`;
    });

    let rootWidth = Math.min(this.rootWidth, this.totalWidth);
    let rootHeight = Math.min(this.rootHeight, this.totalHeight);
    return html`
      <div class="j-table">
        <div class="j-table-view" style=${styleMap({
          width: `${rootWidth}px`,
          height: `${rootHeight}px`,
        })}>${tableCells}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'j-table': Table,
  }
}

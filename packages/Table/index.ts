import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
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
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('j-table')
export class Table extends LitElement {
  static styles = css`
    :host {
      --default-border: 1px solid silver;
      display: block;
      border: var(--default-border);
      position: relative;
      overflow: scroll;
    }
  `

  @state()
  private mappedData: Record<string, unknown> = {};

  @state()
  private cells: Cell[] = []

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
    let i = 0, j = 0;
    while (y < clientHeight) {
      x = 0;
      j = 0;
      while (x < clientWidth) {
        cells.push({
          x, y,
          w: cellSize[0],
          h: cellSize[1],
          i, j, 
        });
        x += cellSize[0];
        j++;
      }
      y += cellSize[1];
      i++;
    }
  }

  set data(arr: unknown[][]) {
    for (let j = 0; j < arr.length; j++) {
      for (let i = 0; i < arr[j].length; i++) {
        this.mappedData[`${i}:${j}`] = arr[i][j];
      }
    }
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
    this._layout({
      clientWidth,
      clientHeight,
    });
  }

  render() {
    console.log('rr', this.cells);
    let tableCells = this.cells.map(cell => {
      let pos = `${cell.i}:${cell.j}`;
      return html`<table-cell
        .x=${cell.x}
        .y=${cell.y}
        .i=${cell.i}
        .j=${cell.j}
        .width=${cell.w}
        .height=${cell.h}>${this.mappedData[pos]}</table-cell>`;
    });
    return html`${tableCells}`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'j-table': Table,
  }
}

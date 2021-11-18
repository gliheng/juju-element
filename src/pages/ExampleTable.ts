import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@/Table';

@customElement('example-table')
export default class ExampleTable extends LitElement {
  static data1 = [
    ['header1', 'header2', 'header3'],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  static styles = css`
    data-sheet {
      height: 600px
    }
  `;

  render() {
    return html`<j-table .data=${ExampleTable.data1}>`;
  }
}

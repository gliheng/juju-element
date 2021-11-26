import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@/Table';


@customElement('example-table-simple')
class ExampleTableSimple extends LitElement {
  static data1 = generateTable(4, 3);

  render() {
    return html`<j-table .data=${ExampleTableSimple.data1}></j-table>`;
  }
}

@customElement('example-table-virtual')
class ExampleTableVirtual extends LitElement {
  static styles = css`
    j-table {
      max-height: 500px;
    }
  `;

  static data1 = generateTable(40, 40);

  render() {
    return html`
      <j-table
        h-virtual="true"
        v-virtual="true"
        .data=${ExampleTableVirtual.data1}></j-table>
    `;
  }
}


@customElement('example-table')
export default class ExampleTable extends LitElement {
  render() {
    return html`
      <h1>Simple table</h1>
      <example-table-simple></example-table-simple>
      <h1>Virtual table</h1>
      <example-table-virtual></example-table-virtual>
    `;
  }
}

function generateTable(r: number, c: number, withHeader = true) {
  let data = [];
  if (withHeader) {
    let row = [];
    for (let i = 0; i < c; i++) {
      row.push(`Header ${i + 1}`);
    }
    data.push(row);
    r--;
  }

  for (let i = 0; i < r; i++) {
    let row = [];
    for (let j = 0; j < c; j++) {
      row.push(`${i * c + j + 1}`);
    }
    data.push(row);
  }
  return data;
}
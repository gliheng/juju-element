import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import '@/Button';
import '@/Tabs';
import '@/Table';
import '@/ListTile';
import '@/SvgIcon';

@customElement('example-tab')
class ExampleTab extends LitElement {
  render() {
    return html`
      <j-tabs>
        <j-tab-pane name="Tab 1">
          <h1>Tab 1</h1>
        </j-tab-pane>
        <j-tab-pane name="Tab 2">
          <h1>Tab 2</h1>
        </j-tab-pane>
        <j-tab-pane name="Tab 3">
          <h1>Tab 3</h1>
        </j-tab-pane>
      </j-tabs>
    `;
  }
}

@customElement('example-table')
export class ExampleTable extends LitElement {
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

@customElement('example-button')
class ExampleButton extends LitElement {
  render() {
    return html`
      <div>
        <j-button theme="primary">Button</j-button>
        <j-button theme="secondary">Button</j-button>
        <j-button theme="success">Button</j-button>
        <j-button theme="info">Button</j-button>
        <j-button theme="warning">Button</j-button>
        <j-button theme="danger">Button</j-button>
        <j-button theme="help">Button</j-button>
      </div>
      <div>
        <j-button>Button</j-button>
        <j-button outlined>Button</j-button>
        <j-button flat>Button</j-button>
        <j-button raised>Button</j-button>
        <j-button round>Button</j-button>
      </div>
      <div>
        <j-button size="sm">Button</j-button>
        <j-button size="md">Button</j-button>
        <j-button size="lg">Button</j-button>
      </div>
    `;
  }
}

@customElement('example-svg-icon')
class ExampleSvgIcon extends LitElement {
  render() {
    return html`
      <div>
        <j-svg-icon name="alarm"></j-svg-icon>
        <j-svg-icon name="albums"></j-svg-icon>
        <j-svg-icon name="airplane"></j-svg-icon>
      </div>
    `;
  }
}

@customElement('example-app')
export class ExampleApp extends LitElement {
  static styles = css`
  .example-app {
    display: flex;
  }
  aside {
    width: 200px;
    margin-right: 8px;
  }
  main {
    flex: 1;
  }
  `;

  examples = [
    {label: 'Table', icon: 'airplane', component: html`<example-table></example-table>`},
    {label: 'Tabs', icon: 'albums', component: html`<example-tab></example-tab>`},
    {label: 'Button', icon: 'battery-full-outline', component: html`<example-button></example-button>`},
    {label: 'SvgIcon', icon: 'checkmark-circle-outline', component: html`<example-svg-icon></example-svg-icon>`},
  ];

  @state()
  currentTab?: string;

  private onSelect(evt: CustomEvent) {
    this.currentTab = evt.detail.label;
  }

  render() {
    let main;
    if (this.currentTab) {
      let curr = this.examples.find(e => e.label == this.currentTab);
      if (curr) {
        main = curr.component;
      }
    }

    return html`
      <div class="example-app">
        <aside>
          <j-list-tile
            .items=${this.examples}
            @select=${this.onSelect}
          ></j-list-tile>
        </aside>
        <main>${main}</main>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'example-app': ExampleApp,
    'example-table': ExampleTable,
    'example-button': ExampleButton,
    'example-tab': ExampleTab,
    'example-svg-icon': ExampleSvgIcon,
  }
}

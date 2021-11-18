import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@/Tabs';

@customElement('example-tab')
export default class ExampleTab extends LitElement {
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

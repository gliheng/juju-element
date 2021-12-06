import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@/ListTile';

@customElement('example-list-tile')
export default class ExampleListTile extends LitElement {
  examples = [
    {label: 'airplane', icon: 'airplane', route: 'table'},
    {label: 'albums', icon: 'albums', route: 'tabs'},
    {label: 'battery', icon: 'battery-full-outline', route: 'button'},
    {label: 'checkmark', icon: 'checkmark-circle-outline', route: 'svg-icon'},
  ];
  
  onSelect(evt: CustomEvent) {
    console.log("select:", evt.detail);
  }

  render() {
    return html`
      <div>
        <j-list-tile .items=${this.examples} @select=${this.onSelect}></j-list-tile>
      </div>
    `;
  }
}

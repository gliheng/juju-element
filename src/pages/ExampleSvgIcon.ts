import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@/SvgIcon';

@customElement('example-svg-icon')
export default class ExampleSvgIcon extends LitElement {
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

import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('example-index')
export default class ExampleIndex extends LitElement {
  render() {
    return html`
      Hello, lit-element
    `
  }
}
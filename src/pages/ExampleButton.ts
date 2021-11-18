import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@/Button';

@customElement('example-button')
export default class ExampleButton extends LitElement {
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

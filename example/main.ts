import { LitElement, html, css } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import ListTile from '@/ListTile';
import router from './router';

@customElement('example-app')
export class ExampleApp extends LitElement {
  static styles = css`
    j-router-app {
      display: flex;
    }
    aside {
      width: 200px;
      margin-right: 8px;
    }
    aside j-router-link {
      display: block;
    }
    main {
      flex: 1;
    }
  `;


  render() {
    return html`
      <div class="example-app">
        <j-router-app .router=${router}>
          <aside>
            <j-router-link name="table">Table</j-router-link>
            <j-router-link name="button">Button</j-router-link>
            <j-router-link name="tabs">Tabs</j-router-link>
            <j-router-link name="list-tile">ListTile</j-router-link>
          </aside>
          <main>
            <j-router-view></j-router-view>
          </main>
        </j-router-app>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'example-app': ExampleApp,
  }
}

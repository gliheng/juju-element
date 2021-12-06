import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
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
    j-router-link {
      margin: 10px 0;
      display: block;
    }
    j-router-link i {
      display: block;
      line-height: 30px;
      font-style: normal;
      text-decoration: none;
      border-left: 4px solid var(--router-link-active-color);
      padding-left: 10px;
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
            <j-router-link name="table">
              <i>Table</i>
            </j-router-link>
            <j-router-link name="button">
              <i>Button</i>
            </j-router-link>
            <j-router-link name="tabs">
              <i>Tabs</i>
            </j-router-link>
            <j-router-link name="list-tile">
              <i>ListTile</i>
            </j-router-link>
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

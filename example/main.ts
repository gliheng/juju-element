import { LitElement, html, css } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import '@/ListTile';
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
    main {
      flex: 1;
    }
  `;

  examples = [
    {label: 'Table', icon: 'airplane', route: 'table'},
    {label: 'Tabs', icon: 'albums', route: 'tabs'},
    {label: 'Button', icon: 'battery-full-outline', route: 'button'},
    {label: 'SvgIcon', icon: 'checkmark-circle-outline', route: 'svg-icon'},
  ];

  private onSelect(evt: CustomEvent) {
    router.push(evt.detail.route);
  }

  render() {
    return html`
      <div class="example-app">
        <j-router-app .router=${router}>
          <aside>
            <j-list-tile
              .items=${this.examples}
              @select=${this.onSelect}
            ></j-list-tile>
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

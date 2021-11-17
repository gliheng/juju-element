import {Directive, directive} from 'lit/directive.js';
import {unsafeCSS, css} from 'lit';
import { TinyColor } from '@ctrl/tinycolor';

class ThemeVarsDirective extends Directive {
  static colorMap = {
    primary: ['#2196f3', 'white'],
    secondary: ['#f82c69', 'white'],
    success: ['#70b137', 'white'],
    info: ['#19c1df', 'white'],
    warning: ['#ffa149', 'black'],
    danger: ['#da2a2a', 'white'],
    help: ['#9c27b0', 'white'],
  }

  render(theme: string) {
    let colors = ThemeVarsDirective.colorMap[theme as keyof typeof ThemeVarsDirective.colorMap] || ThemeVarsDirective.colorMap['primary'];
    let [color, text] = colors;
    let bgColor = new TinyColor(color);
    let color2 = bgColor.lighten(10).toHexString();
    let color3 = bgColor.lighten(20).toHexString();
    return css`
      :host {
        --primary-color: ${unsafeCSS(color)};
        --primary-color-light: ${unsafeCSS(color2)};
        --primary-color-lighter: ${unsafeCSS(color3)};
        --primary-color-text: ${unsafeCSS(text)};
      }
    `;
  }
}

const themeVars = directive(ThemeVarsDirective);

export default themeVars;
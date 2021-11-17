import { LitElement, css, CSSResultGroup } from "lit";
import { property } from 'lit/decorators.js'

const CLASSNAME = 'j-ink-active';

class RippleHandler {
  center: boolean;
  color: string;

  constructor(center: boolean = false, color: string = '') {
    this.center = center;
    this.color = color;
  }

  getInk(node: ShadowRoot): HTMLElement {
    let ink = node.querySelector(':host > .j-ink');
    if (!ink) {
      ink = document.createElement('div');
      if (this.color) {
        (ink as HTMLElement).style.backgroundColor = this.color;
      }
      ink.addEventListener('animationend', this.onAnimationEnd);
    }
    return ink as HTMLElement;
  }
  
  handleEvent(evt: MouseEvent) {
    let root = evt.currentTarget as ShadowRoot;
    let target = root.host;
    let ink = this.getInk(root);
    let rect = target.getBoundingClientRect();
    let { clientX, clientY } = evt;
    let offsetX, offsetY;
    if (this.center) {
      offsetX = rect.width / 2;
      offsetY = rect.height / 2;
    } else {
      offsetX = clientX - rect.left;
      offsetY = clientY - rect.top;
    }
    let size = Math.max(rect.width, rect.height);
    ink.className = 'j-ink';
    ink.style.left = `${offsetX - size/2}px`;
    ink.style.top = `${offsetY - size/2}px`;
    ink.style.width = `${size}px`;
    ink.style.height = `${size}px`;
    root.appendChild(ink);
    ink.classList.add(CLASSNAME);
  }
  onAnimationEnd(evt: Event) {
    (evt.currentTarget! as Element).classList.remove(CLASSNAME);
  }
}

const RippleEventHandlerSymbol = Symbol('RippleEventHandlerSymbol');

export default class RippleElement extends LitElement {
  static styles: CSSResultGroup = css`
    :host {
      position: relative;
      overflow: hidden;
    }
    .j-ink {
      position: absolute;
      top: 0;
      left: 0;
      background: white;
      width: 100%;
      height: 100%;
      border-radius: 100%;
      transform: scale(0);
      pointer-events: none;
      opacity: 0.5;
      z-index: 1;
    }

    .j-ink-active {
      animation: j-ripple 0.4s linear;
    }

    @keyframes j-ripple {  
      100% {
        opacity: 0;
        transform: scale(2.5);
      }
    }
  `;

  @property({ type: String })
  color = 'white';

  @property({ type: Boolean })
  center = false;

  connectedCallback() {
    super.connectedCallback();
    let handler = new RippleHandler(this.center, this.color);
    (this.shadowRoot as any)[RippleEventHandlerSymbol] = handler;
    this.shadowRoot!.addEventListener('mousedown', handler);
  }

  disconnectedCallback() {
    let handler = (this.shadowRoot as any)[RippleEventHandlerSymbol];
    if (handler) {
      this.shadowRoot!.removeEventListener('mousedown', handler);
    }
  }
}
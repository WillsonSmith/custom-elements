import {LitElement, css, html} from 'lit-element';

import {SplitViewPane} from './split-view-pane/split-view-pane.js';

class SplitView extends LitElement {
  static get styles() {
    return css`
    :host {
      display: flex;
      justify-content: space-evenly;
    }
    `;
  }

  static get properties() {
    return {
      numberOfChildren: {type: Number},
      paneWidth: {type: Number},
    }
  }


  constructor() {
    super();
    this.resizeTimeout = null;
  }

  

  connectedCallback() {
    super.connectedCallback();
    this.numberOfChildren = this.childElementCount;
    this.setCSSVariable(calculatePaneWidth(this, this.numberOfChildren));
    window.addEventListener('resize', this.handleResize);
    
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.numberOfChildren = 0;
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return html`
      <slot></slot>
    `
  }

  handleResize = () => {
    if (this.resizeTimeout) window.cancelAnimationFrame(this.resizeTimeout);
    this.resizeTimeout = window.requestAnimationFrame(() => {
      this.setCSSVariable(calculatePaneWidth(this, this.numberOfChildren));
    });
  }

  setCSSVariable(width) {
    this.setAttribute('style', `--pane-child-width: ${width}px; --pane-width: ${width}px;`)
  }
}

function calculatePaneWidth(node, divisibleBy) {
  const totalWidth = node.offsetWidth;
  return totalWidth / divisibleBy;
}


customElements.define('split-view', SplitView);
customElements.define('split-view-pane', SplitViewPane);
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
    this.mutationObserver = new MutationObserver(this.handleMutation);
    this.mutationObserver.observe(this, {childList: true});
    this.resizeTimeout = null;
  }

  render() {
    return html`
      <slot></slot>
    `
  }

  /** lifecycle */
  connectedCallback() {
    super.connectedCallback();
    this.numberOfChildren = this.childElementCount;
    window.addEventListener('resize', this.handleResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.handleResize);
    this.mutationObserver.disconnect();
    this.mutationObserver = null;
  }

  update(changedProperties) {
    super.update(changedProperties);
    // this needs to handle children attributes changing
    // maybe an event
    if (changedProperties.has('numberOfChildren')) this.handleResize();
  }

  /** events */
  handleMutation = (mutationList, _) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {this.numberOfChildren = this.childElementCount};
    }
  }

  handleResize = () => {
    if (this.resizeTimeout) window.cancelAnimationFrame(this.resizeTimeout);
    this.resizeTimeout = window.requestAnimationFrame(() => {
      this.setCSSVariable(calculatePaneWidth(this, this.numberOfChildren));
    });
  }

  /** utility */
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
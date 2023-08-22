import {LitElement, css, html} from 'lit-element';

export class SplitViewPane extends LitElement {
  static get properties() {
    return {
      animated: {type: Boolean}
    }
  }

  static get styles() {
    return css`
    :host {
      flex: 1;
      min-width: 0;
      overflow-x: hidden;
      will-change: max-width;
    }

    :host([animated=true]) {
      transition: max-width 0.2s ease-in-out;
      max-width: var(--pane-width);
    }

    :host([is-hidden=true]) {
      max-width: 0;
    }

    .Child {
      min-width: var(--pane-child-width);
    }
    `;
  }

  static get properties() {
    return {
      animated: {type: Boolean},
      isHidden: {attribute: 'is-hidden', type: Boolean},
    }
  }


  constructor() {
    super();
  }

  render() {
    return html`
      <div class="Child">
        <slot></slot>
      </div>
    `
  }
}


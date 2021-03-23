import {LitElement, html} from 'lit-element';

class XDropzone extends LitElement {
  events = {
    'drop': (event) => {
      stopEvent(event);
      // if defined onDrop, use onDrop
      this.onDrop && this.onDrop(event);

      // always emit drop event (?)
      const dropEvent = new CustomEvent(this.eventName || 'x-drop', {
        detail: {
          event,
        }
      });
      this.dispatchEvent(dropEvent);
      this.handleAttrs([], ['drag-over', 'drag-leave', 'drag-enter']);
    },
    'dragover': (event) => {
      stopEvent(event);
      this.handleAttrs(['drag-over']);
    },
    'dragenter': (event) => {
      stopEvent(event);
      this.handleAttrs(['drag-enter'], ['drag-leave']);
      // timed callback to remove?
    },
    'dragleave': (event) => {
      stopEvent(event);
      this.handleAttrs(['drag-leave'], ['drag-over', 'drag-enter']);
    },
  }

  static get properties() {
    return {
      eventName: {attribute: 'event-name', type: String}
    }
  }

  constructor() {
    super();
    for (const [event, callback] of Object.entries(this.events)) {
      this.addEventListener(event, callback);
    }
  }

  disconnectedCallback() {
    for (const [event, callback] of Object.entries(this.events)) {
      this.removeEventListener(event, callback);
    }
  }

  render() {
    return html`
    <slot></slot>
    `
  }

  handleAttrs(added = [], removed = []) {
    // handle string case, handle null case
    for (const attr of added) this.setAttribute(attr, attr);
    for (const attr of removed) this.removeAttribute(attr);
  }
}

customElements.define('x-dropzone', XDropzone);


function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}
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

      ['drag-over', 'drag-leave', 'drag-enter'].forEach(a => this.removeAttribute(a));
    },
    'dragover': (event) => {
      stopEvent(event);
      this.setAttribute('drag-over', 'drag-over');
    },
    'dragenter': (event) => {
      stopEvent(event);
      this.removeAttribute('drag-leave');
      this.setAttribute('drag-enter', 'drag-enter');
      // timed callback to remove?
    },
    'dragleave': (event) => {
      stopEvent(event);
      this.removeAttribute('drag-over');
      this.removeAttribute('drag-enter');
      this.setAttribute('drag-leave', 'drag-leave');
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
}

customElements.define('x-dropzone', XDropzone);


function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}
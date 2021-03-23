import {LitElement, html} from 'lit-element';

class XDropzone extends LitElement {
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

  /** Events */
  events = {
    'drop': this.handleDrop,
    'dragover': this.handleDragOver,
    'dragenter': this.handleDragEnter,
    'dragleave': this.handleDragLeave,
  }

  handleDrop(event) {
    stopEvent(event);
    // if defined onDrop, use onDrop
    this.onDrop && this.onDrop(event);

    const dropEvent = new CustomEvent(this.eventName || 'x-drop', {
      detail: {
        event,
      }
    });
    this.dispatchEvent(dropEvent);
    this.handleAttrs([], ['drag-over', 'drag-leave', 'drag-enter']);
  }
  handleDragOver(event) {
    stopEvent(event);
    this.handleAttrs(['drag-over']);
  }
  handleDragEnter(event) {
    stopEvent(event);
    this.handleAttrs(['drag-enter'], ['drag-leave']);
    // timed callback to remove?
  }
  handleDragLeave(event) {
    stopEvent(event);
    this.handleAttrs(['drag-leave'], ['drag-over', 'drag-enter']);
  }

  /** Utilities */
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
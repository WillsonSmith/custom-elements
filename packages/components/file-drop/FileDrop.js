/**
 * @typedef {'drag-enter' | 'drag-over' | 'drag-leave'} DragEventName
 */

/**
 * A custom element to help with file drag and drop and styling.
 *
 * @element file-drop
 * @attribute {DragEventName} [drag-enter]
 * - Indicates that a file is being dragged into the element.
 * @attribute {DragEventName} [drag-over]
 * - Indicates that a file is being dragged over the element.
 * @attribute {DragEventName} [drag-leave]
 * - Indicates that a file is being dragged out of the element.
 *
 * @fires {CustomEvent} file-drop
 * - detail: { type: DragEventName, files: File[] }
 *
 * @slot - The content of the element.
 */
export class FileDrop extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = '<slot></slot>';

    this.dragEnterHandler = this.dragEnterHandler.bind(this);
    this.dragOverHandler = this.dragOverHandler.bind(this);
    this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
  }

  connectedCallback() {
    this.addEventListener('dragenter', this.dragEnterHandler);
    this.addEventListener('dragover', this.dragOverHandler);
    this.addEventListener('dragleave', this.dragLeaveHandler);
    this.addEventListener('drop', this.dropHandler);
  }

  disconnectedCallback() {
    this.removeEventListener('dragenter', this.dragEnterHandler);
    this.removeEventListener('dragover', this.dragOverHandler);
    this.removeEventListener('dragleave', this.dragLeaveHandler);
    this.removeEventListener('drop', this.dropHandler);
  }

  /**
   * @param {DragEvent} event
   * @returns {void}
   * @private
   * @memberof FileDrop
   */
  dragEnterHandler(event) {
    event.preventDefault();
    this.setAttribute('drag-enter', 'drag-enter');
    this.emitEvent('drag-enter', event.dataTransfer?.files);
  }

  /**
   * @param {DragEvent} event
   * @returns {void}
   * @private
   * @memberof FileDrop
   */
  dragOverHandler(event) {
    event.preventDefault();
    this.setAttribute('drag-over', 'drag-over');
    this.emitEvent('drag-over', event.dataTransfer?.files);
  }

  /**
   * @param {DragEvent} event
   * @returns {void}
   * @private
   * @memberof FileDrop
   */
  dragLeaveHandler(event) {
    event.preventDefault();
    this.setAttribute('drag-leave', 'drag-leave');
    this.removeAttribute('drag-enter', 'drag-over');
    this.emitEvent('drag-leave', event.dataTransfer?.files);
  }

  dropHandler(event) {
    event.preventDefault();
    this.cleanupAttributes();
    this.emitEvent('drop', event.dataTransfer?.files);
  }

  /**
   * @private
   * @memberof FileDrop
   */
  cleanupAttributes() {
    this.removeAttribute('drag-enter');
    this.removeAttribute('drag-over');
    this.removeAttribute('drag-leave');
  }

  /**
   * @param {DragEventName} type
   * @param {FileList} fileList
   * @returns {void}
   * @private
   * @memberof FileDrop
   */
  emitEvent(type, fileList) {
    const files = Array.from(fileList || []);
    this.dispatchEvent(
      new CustomEvent('file-drop', {
        bubbles: true,
        detail: {
          type,
          files,
        },
      }),
    );
  }
}

/**
 * Registers the custom element with a custom tag name.
 * @param {string} tagName
 * @returns {void}
 */
export function register(tagName) {
  customElements.define(tagName, FileDrop);
}

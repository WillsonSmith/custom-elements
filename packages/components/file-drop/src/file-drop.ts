import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type EventType = 'drag-enter' | 'drag-over' | 'drag-leave';

@customElement('file-drop')
export class FileDrop extends LitElement {
  @property({ type: String, attribute: 'drag-enter', reflect: true })
  public dragEnter: 'drag-enter' | undefined = undefined;

  @property({ type: String, attribute: 'drag-over', reflect: true })
  public dragOver: 'drag-over' | undefined = undefined;

  @property({ type: String, attribute: 'drag-leave', reflect: true })
  public dragLeave: 'drag-leave' | undefined = undefined;

  firstUpdated() {
    this.addEventListener('dragenter', this.dragEnterHandler);
    this.addEventListener('dragover', this.dragOverHandler);
    this.addEventListener('drop', this.dropHandler);
  }

  disconnectedCallback() {
    this.removeEventListener('dragenter', this.dragEnterHandler);
    this.removeEventListener('dragover', this.dragOverHandler);
    this.removeEventListener('drop', this.dropHandler);
  }

  render() {
    return html`<slot></slot>`;
  }

  public dragEnterHandler(event: DragEvent) {
    event.preventDefault();
    this.dragEnter = 'drag-enter';
    this.emitEvent('drag-enter', event.dataTransfer?.files);
  }

  public dragOverHandler(event: DragEvent) {
    event.preventDefault();
    this.dragOver = 'drag-over';
  }

  public dropHandler(event: DragEvent) {
    event.preventDefault();
    this.dragLeave = 'drag-leave';
  }

  emitEvent(type: EventType, fileList: FileList) {
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

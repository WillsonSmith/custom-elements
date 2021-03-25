import {html} from 'lit-element';
import '../components/x-dropzone';

export default {
  title: 'x-dropzone',
  component: 'x-dropzone'
}

const Template = (args) => {
  return html`
  <style>
    .DropArea {
      border: 2px dashed black;
      border-radius: 6px;

      height: 200px;
      width: 500px;

      display: flex;
      justify-content: center;
      align-items: center;

      font-family: sans-serif;
    }

    x-dropzone[drag-over] .DropArea {
      border: 2px dashed rgba(155,155,155,1);
    }
  </style>
  <x-dropzone>
    <div class="DropArea">
      <h2>Drag and drop</h2>
    </div>
  </x-dropzone>
  </div>
`
  }

export const Basic = Template.bind({})
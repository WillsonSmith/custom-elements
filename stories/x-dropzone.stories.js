import {html} from 'lit-element';
import '../components/x-dropzone';

export default {
  title: 'x-dropzone',
  component: 'x-dropzone'
}

const Template = (args) => html`
  <style>
    .DropArea {
      border: 1px solid black;

      height: 200px;
      width: 500px;
    }

    x-dropzone[drag-over] .DropArea {
      border: 1px dashed black;
    }
  </style>
  <x-dropzone>
    <div class="DropArea">
      <button>Hello</button>
    </div>
  </x-dropzone>
`

export const Basic = Template.bind({})
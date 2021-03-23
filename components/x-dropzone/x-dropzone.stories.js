import {html} from 'lit-element';
import './x-dropzone.js';

export default {
  title: 'x-dropzone',
  component: 'x-dropzone'
}

const Template = (args) => html`
<x-dropzone><button>Hello</button></x-dropzone>
`

export const Basic = Template.bind({})
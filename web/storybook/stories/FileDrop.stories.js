/* eslint-disable */

import '@willson/components/file-drop/file-drop.js';

export default {
  title: 'components/FileDrop',
  argTypes: {
    dragOverColor: { control: 'color' },
  },
};

const FileDrop = ({ dragOverColor }) => `
    <style>
      file-drop {
        display: block;
        border: 1px solid black;
        padding: 10px;
        width: 400px;
        min-height: 200px;
      }

      file-drop[drag-enter] {
        background-color: #aaa;
      }

      file-drop[drag-over] {
        background-color: ${dragOverColor};
      }

      
    </style>

    <file-drop>
    </file-drop>
  `;

export const FileDropA = FileDrop.bind({});

FileDropA.args = {
  dragOverColor: '#ccc',
};

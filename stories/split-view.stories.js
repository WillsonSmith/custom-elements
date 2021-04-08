import {html} from 'lit-element';
import '../components/split-view';

export default {
  title: 'split-view',
  component: 'split-view'
}

const Template = (args) => {
  return html`
    <split-view>
      <split-view-pane>
          Hello (:
      </split-view-pane>
      <split-view-pane animated=${args.animated} is-hidden=${args.hidden}>
          goodbye :)
      </split-view-pane>
    </split-view>
  `
}

export const Basic = Template.bind({})

Basic.args = {
  hidden: false,
  animated: true,
}
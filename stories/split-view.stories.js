import {html} from 'lit-element';
import '../components/split-view';

export default {
  title: 'split-view',
  component: 'split-view'
}

function wackyDiv(color, text) {
  return html`
  <div style="display: flex; height: 100px; justify-content: center; background: #ececec; padding: 1.6rem;">
    <div style="width: 100px; height: 100px; background: ${color}; padding: 1rem; box-sizing: border-box;">${text}</div>
  </div>
`
}

const Template = (args) => {
  return html`
    <split-view>
      <split-view-pane>
        ${wackyDiv('#00ff99', 'Hello (:')}
      </split-view-pane>
      <split-view-pane animated=${args.animated} is-hidden=${args.hidden}>
          ${wackyDiv('#ff9900', 'Goodbye :)')}
      </split-view-pane>
    </split-view>
  `
}

export const Basic = Template.bind({})

Basic.args = {
  hidden: false,
  animated: true,
}

const MultiTemplate = (args) => {
  const {firstAnimated, firstHidden, secondAnimated, secondHidden, thirdAnimated, thirdHidden} = args;
  return html`
    <split-view>
      <split-view-pane animated=${firstAnimated} is-hidden=${firstHidden}>
          ${wackyDiv('#00ff99', 'first')}
      </split-view-pane>
      <split-view-pane animated=${secondAnimated} is-hidden=${secondHidden}>
        ${wackyDiv('#ff9900', 'second')}
      </split-view-pane>
      <split-view-pane animated=${thirdAnimated} is-hidden=${thirdHidden}>
        ${wackyDiv('#9900ff', 'third')}
      </split-view-pane>
    </split-view>
  `
}

export const MultiplePanes = MultiTemplate.bind({});
MultiplePanes.args = {
  firstHidden: false,
  firstAnimated: false,
  secondHidden: false,
  secondAnimated: false,
  thirdHidden: false,
  thirdAnimated: false,
}
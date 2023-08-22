import { storybookPlugin } from '@web/dev-server-storybook';

export default {
  nodeResolve: true,
  plugins: [storybookPlugin({ type: 'web-components' })],
};

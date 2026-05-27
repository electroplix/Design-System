import type { Preview } from '@storybook/react';
import { ElectroplixProvider } from '../src/core/provider';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ElectroplixProvider>
        <Story />
      </ElectroplixProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const CustomColors: Story = {
  args: {
    children: 'Action Button',
    bgColor: '#e94560',
    textColor: '#ffffff',
    radius: 8,
  },
};

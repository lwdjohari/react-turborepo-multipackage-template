import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../lib/main';

const meta: Meta<typeof Button> = {
  title: 'Treta-Identity/Button/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {

    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    label: '😄👍😍💯',
  },
};

export const Tertiary: Story = {
  args: {
    ...Primary.args,
    label: '📚📕📈🤓',
  },
};
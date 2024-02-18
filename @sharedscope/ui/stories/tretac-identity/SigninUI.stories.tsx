import type { Meta, StoryObj } from '@storybook/react';
import { SigninUI } from '../../lib/main';
import { action } from '@storybook/addon-actions';



const meta: Meta<typeof SigninUI> = {
  title: 'Treta-Identity/Auth/SigninUI',
  component: SigninUI,
  tags: ['autodocs'],
  argTypes: {
    showScope: { control: 'boolean' },
    showPersistent: { control: 'boolean' },
    username: { control: 'text' },
    password: { control: 'text' },
    scope: { control: 'text' },
    scopeLabel: { control: 'text' },
    onSubmit: { action: 'submit' },
    persistent: { control: 'boolean' },
  }
};

export default meta;
type Story = StoryObj<typeof SigninUI>;



export const Primary: Story = {
  args: {

    username: "",
    password: "",
    onSubmit: (username: string, password: string) => {
      action(`Username: ${username}, Password: ${password}`, { clearOnStoryChange:true  })();
    },
    showScope:false,
    showPersistent:true,
    scope:"Account"
  },
};


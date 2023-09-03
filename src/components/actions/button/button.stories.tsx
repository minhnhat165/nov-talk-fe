import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/actions';
import { CheckIcon } from '@heroicons/react/24/solid';

const meta: Meta<typeof Button> = {
  tags: ['autodocs'],

  component: Button,
  title: 'Actions/Button',
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Button',
    startIcon: <CheckIcon />,
  },
};

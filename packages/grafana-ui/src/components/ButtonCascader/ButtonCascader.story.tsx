import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ButtonCascader } from 'packages/grafana-ui/src';
import React from 'react';


import { withCenteredStory } from '../../utils/storybook/withCenteredStory';

const meta: ComponentMeta<typeof ButtonCascader> = {
  title: 'Forms/Cascader/ButtonCascader',
  component: ButtonCascader,
  decorators: [withCenteredStory],
  parameters: {
    controls: {
      exclude: ['className', 'value', 'fieldNames', 'loadData', 'onChange', 'onPopupVisibleChange'],
    },
  },
  args: {
    disabled: false,
    children: 'Click me!',
    options: [
      {
        label: 'A',
        value: 'A',
        children: [
          { label: 'B', value: 'B' },
          { label: 'C', value: 'C' },
        ],
      },
      { label: 'D', value: 'D' },
    ],
  },
  argTypes: {
    icon: { control: { type: 'select', options: ['plus', 'minus', 'table'] } },
    options: { control: 'object' },
  },
};

const Template: ComponentStory<typeof ButtonCascader> = ({ children, ...args }) => {
  return <ButtonCascader {...args}>{children}</ButtonCascader>;
};

export const simple = Template.bind({});

export const withIcon = Template.bind({});
withIcon.args = {
  icon: 'plus',
};

export default meta;
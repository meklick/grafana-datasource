import { ComponentMeta } from '@storybook/react';
import React from 'react';

import { withCenteredStory } from '@grafana/ui/utils/storybook/withCenteredStory';

import { EmptySearchResult } from './EmptySearchResult';
import mdx from './EmptySearchResult.mdx';

const meta: ComponentMeta<typeof EmptySearchResult> = {
  title: 'Visualizations/EmptySearchResult',
  component: EmptySearchResult,
  decorators: [withCenteredStory],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Basic = () => {
  return <EmptySearchResult>Could not find anything matching your query</EmptySearchResult>;
};

export default meta;

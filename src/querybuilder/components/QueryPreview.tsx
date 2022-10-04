import { EditorRow, EditorFieldGroup, EditorField } from 'packages/grafana-ui/src';
import React from 'react';


import promqlGrammar from '../../promql';
import { RawQuery } from '../shared/RawQuery';

export interface Props {
  query: string;
}

export function QueryPreview({ query }: Props) {
  return (
    <EditorRow>
      <EditorFieldGroup>
        <EditorField label="Raw query">
          <RawQuery query={query} lang={{ grammar: promqlGrammar, name: 'promql' }} />
        </EditorField>
      </EditorFieldGroup>
    </EditorRow>
  );
}

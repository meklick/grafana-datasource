import { css } from '@emotion/css';
import { Page } from 'app/core/components/Page/Page';
import { useStyles2 } from 'packages/grafana-ui/src';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';

export default function FeatureTogglePage() {
  const styles = useStyles2(
    (theme: GrafanaTheme2) =>
      css`
        margin-top: ${theme.spacing(2)};
      `
  );

  return (
    <Page className={styles}>
      <Page.Contents>
        <h1>Explore is disabled</h1>
        To enable Explore, enable it in the Grafana config:
        <div>
          <pre>
            {`[explore]
enable = true
`}
          </pre>
        </div>
      </Page.Contents>
    </Page>
  );
}

import { css } from '@emotion/css';
import { PromAlertingRuleState } from 'app/types/unified-alerting-dto';
import { useStyles2 } from 'packages/grafana-ui/src';
import React, { FC } from 'react';

import { GrafanaTheme2 } from '@grafana/data';

type Props = {
  status: PromAlertingRuleState | 'neutral';
};

export const StateColoredText: FC<Props> = ({ children, status }) => {
  const styles = useStyles2(getStyles);

  return <span className={styles[status]}>{children || status}</span>;
};

const getStyles = (theme: GrafanaTheme2) => ({
  [PromAlertingRuleState.Inactive]: css`
    color: ${theme.colors.success.text};
  `,
  [PromAlertingRuleState.Pending]: css`
    color: ${theme.colors.warning.text};
  `,
  [PromAlertingRuleState.Firing]: css`
    color: ${theme.colors.error.text};
  `,
  neutral: css`
    color: ${theme.colors.text.secondary};
  `,
});

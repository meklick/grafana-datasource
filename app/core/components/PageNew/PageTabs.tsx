import { css } from '@emotion/css';
import { useStyles2, TabsBar, Tab, toIconName } from 'packages/grafana-ui/src';
import React from 'react';

import { NavModelItem, GrafanaTheme2 } from '@grafana/data';

export interface Props {
  navItem: NavModelItem;
}

export function PageTabs({ navItem }: Props) {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.tabsWrapper}>
      <TabsBar>
        {navItem.children!.map((child, index) => {
          const icon = child.icon ? toIconName(child.icon) : undefined;
          return (
            !child.hideFromTabs && (
              <Tab
                label={child.text}
                active={child.active}
                key={`${child.url}-${index}`}
                icon={icon}
                href={child.url}
                suffix={child.tabSuffix}
              />
            )
          );
        })}
      </TabsBar>
    </div>
  );
}

const getStyles = (theme: GrafanaTheme2) => {
  return {
    tabsWrapper: css({
      paddingBottom: theme.spacing(3),
    }),
  };
};

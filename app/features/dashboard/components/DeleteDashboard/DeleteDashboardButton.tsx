import { Button, ModalsController } from 'packages/grafana-ui/src';
import React from 'react';


import { DashboardModel } from '../../state';

import { DeleteDashboardModal } from './DeleteDashboardModal';

type Props = {
  dashboard: DashboardModel;
};

export const DeleteDashboardButton = ({ dashboard }: Props) => (
  <ModalsController>
    {({ showModal, hideModal }) => (
      <Button
        variant="destructive"
        onClick={() => {
          showModal(DeleteDashboardModal, {
            dashboard,
            hideModal,
          });
        }}
        aria-label="Dashboard settings page delete dashboard button"
      >
        Delete Dashboard
      </Button>
    )}
  </ModalsController>
);

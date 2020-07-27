import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Payments from './payments';
import PaymentsDetail from './payments-detail';
import PaymentsUpdate from './payments-update';
import PaymentsDeleteDialog from './payments-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PaymentsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PaymentsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PaymentsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Payments} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PaymentsDeleteDialog} />
  </>
);

export default Routes;

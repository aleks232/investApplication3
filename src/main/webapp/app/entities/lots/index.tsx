import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Lots from './lots';
import LotsDetail from './lots-detail';
import LotsUpdate from './lots-update';
import LotsDeleteDialog from './lots-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LotsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LotsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LotsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Lots} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LotsDeleteDialog} />
  </>
);

export default Routes;

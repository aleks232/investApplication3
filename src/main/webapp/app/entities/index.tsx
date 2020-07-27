import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Messages from './messages';
import Lots from './lots';
import Orders from './orders';
import Payments from './payments';
import Packages from './packages';
import Documents from './documents';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}messages`} component={Messages} />
      <ErrorBoundaryRoute path={`${match.url}lots`} component={Lots} />
      <ErrorBoundaryRoute path={`${match.url}orders`} component={Orders} />
      <ErrorBoundaryRoute path={`${match.url}payments`} component={Payments} />
      <ErrorBoundaryRoute path={`${match.url}packages`} component={Packages} />
      <ErrorBoundaryRoute path={`${match.url}documents`} component={Documents} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;

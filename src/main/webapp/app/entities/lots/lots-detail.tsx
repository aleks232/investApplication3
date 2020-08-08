import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './lots.reducer';
import { getFilteredOrders } from 'app/entities/orders/orders.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Roles } from 'app/shared/auth/constants';

const checkAdmin = (roles: Roles[]) => roles.includes(Roles.ROLE_ADMIN);

export interface ILotsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LotsDetail = (props: ILotsDetailProps) => {
  const { 
    lotsEntity, 
    user, 
    getEntity: getEntityData, 
    getFilteredOrders: getFilteredOrdersList,
    filteredOrders,
   } = props;

  const isAdmin = React.useMemo(() => user.authorities && checkAdmin(user.authorities as Roles[]), [user]);

  useEffect(() => {
    getEntityData(props.match.params.id);
    getFilteredOrdersList({
      lotId: props.match.params.id,
    });
  }, []);

  return (
    <Row>
      <Col>
        <h2>
          <Translate contentKey="investApplication3App.lots.detail.title">Lots</Translate> [<b>{lotsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="description">
              <Translate contentKey="investApplication3App.lots.description">Description</Translate>
            </span>
          </dt>
          <dd>{lotsEntity.description}</dd>
          <dt>
            <span id="minPrice">
              <Translate contentKey="investApplication3App.lots.minPrice">Min Price</Translate>
            </span>
          </dt>
          <dd>{lotsEntity.minPrice}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="investApplication3App.lots.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>{lotsEntity.startDate ? <TextFormat value={lotsEntity.startDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="investApplication3App.lots.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>{lotsEntity.endDate ? <TextFormat value={lotsEntity.endDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
        </dl>
        <h4>
          {
            Boolean(filteredOrders.length) &&  <Translate contentKey="investApplication3App.orders.home.title">Orders</Translate>
          }
        </h4>
        <div className="orders-container">
          {
            filteredOrders?.map((item) => (
              <div className="card order-card" >
                <div className="card-body">
                  <Link to={`/orders/${item.id}`}>{item.id}</Link>
                  <br/>
                  <Translate contentKey={`investApplication3App.OrderStatus.${item.orderStatus}`} />
                  <br/>
                  {item.price}
                  <br/>
                  {item.payments}
                  <br/>
                  <TextFormat value={item.startDate} type="date" format={APP_DATE_FORMAT} />
                </div>
              </div>
            ))
          }
        </div>
        <br/>
        <Button tag={Link} to="/lots" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/lots/${lotsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/orders/new/${lotsEntity.id}`} replace color="primary">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <span className="d-none d-md-inline">
          <Translate contentKey="investApplication3App.orders.home.createLabel">Create new Orders</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ lots, authentication, orders }: IRootState) => ({
  lotsEntity: lots.entity,
  user: authentication.account,
  filteredOrders: orders.filteredOrders,
});

const mapDispatchToProps = { getEntity, getFilteredOrders };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LotsDetail);

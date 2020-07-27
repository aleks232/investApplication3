import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './orders.reducer';
import { IOrders } from 'app/shared/model/orders.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrdersDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrdersDetail = (props: IOrdersDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { ordersEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="investApplication3App.orders.detail.title">Orders</Translate> [<b>{ordersEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="startDate">
              <Translate contentKey="investApplication3App.orders.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>{ordersEntity.startDate ? <TextFormat value={ordersEntity.startDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="investApplication3App.orders.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>{ordersEntity.endDate ? <TextFormat value={ordersEntity.endDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="investApplication3App.orders.price">Price</Translate>
            </span>
          </dt>
          <dd>{ordersEntity.price}</dd>
          <dt>
            <span id="paymentType">
              <Translate contentKey="investApplication3App.orders.paymentType">Payment Type</Translate>
            </span>
          </dt>
          <dd>{ordersEntity.paymentType}</dd>
          <dt>
            <span id="orderStatus">
              <Translate contentKey="investApplication3App.orders.orderStatus">Order Status</Translate>
            </span>
          </dt>
          <dd>{ordersEntity.orderStatus}</dd>
          <dt>
            <span id="employeeId">
              <Translate contentKey="investApplication3App.orders.employeeId">Employee Id</Translate>
            </span>
          </dt>
          <dd>{ordersEntity.employeeId}</dd>
          <dt>
            <Translate contentKey="investApplication3App.orders.lot">Lot</Translate>
          </dt>
          <dd>{ordersEntity.lotId ? ordersEntity.lotId : ''}</dd>
        </dl>
        <Button tag={Link} to="/orders" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/orders/${ordersEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ orders }: IRootState) => ({
  ordersEntity: orders.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrdersDetail);

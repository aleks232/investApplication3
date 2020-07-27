import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './orders.reducer';
import { IOrders } from 'app/shared/model/orders.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrdersProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Orders = (props: IOrdersProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { ordersList, match, loading } = props;
  return (
    <div>
      <h2 id="orders-heading">
        <Translate contentKey="investApplication3App.orders.home.title">Orders</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="investApplication3App.orders.home.createLabel">Create new Orders</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {ordersList && ordersList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.orders.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.orders.endDate">End Date</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.orders.price">Price</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.orders.paymentType">Payment Type</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.orders.orderStatus">Order Status</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.orders.employeeId">Employee Id</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.orders.lot">Lot</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ordersList.map((orders, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${orders.id}`} color="link" size="sm">
                      {orders.id}
                    </Button>
                  </td>
                  <td>{orders.startDate ? <TextFormat type="date" value={orders.startDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{orders.endDate ? <TextFormat type="date" value={orders.endDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{orders.price}</td>
                  <td>
                    <Translate contentKey={`investApplication3App.PaymentType.${orders.paymentType}`} />
                  </td>
                  <td>
                    <Translate contentKey={`investApplication3App.OrderStatus.${orders.orderStatus}`} />
                  </td>
                  <td>{orders.employeeId}</td>
                  <td>{orders.lotId ? <Link to={`lots/${orders.lotId}`}>{orders.lotId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${orders.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${orders.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${orders.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="investApplication3App.orders.home.notFound">No Orders found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ orders }: IRootState) => ({
  ordersList: orders.entities,
  loading: orders.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './payments.reducer';
import { IPayments } from 'app/shared/model/payments.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaymentsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Payments = (props: IPaymentsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { paymentsList, match, loading } = props;
  return (
    <div>
      <h2 id="payments-heading">
        <Translate contentKey="investApplication3App.payments.home.title">Payments</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="investApplication3App.payments.home.createLabel">Create new Payments</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {paymentsList && paymentsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.payments.sendDate">Send Date</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.payments.paymentDate">Payment Date</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.payments.price">Price</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.payments.employeeId">Employee Id</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.payments.order">Order</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {paymentsList.map((payments, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${payments.id}`} color="link" size="sm">
                      {payments.id}
                    </Button>
                  </td>
                  <td>{payments.sendDate ? <TextFormat type="date" value={payments.sendDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{payments.paymentDate ? <TextFormat type="date" value={payments.paymentDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{payments.price}</td>
                  <td>{payments.employeeId}</td>
                  <td>{payments.orderId ? <Link to={`orders/${payments.orderId}`}>{payments.orderId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${payments.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${payments.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${payments.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="investApplication3App.payments.home.notFound">No Payments found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ payments }: IRootState) => ({
  paymentsList: payments.entities,
  loading: payments.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Payments);

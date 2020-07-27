import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IOrders } from 'app/shared/model/orders.model';
import { getEntities as getOrders } from 'app/entities/orders/orders.reducer';
import { getEntity, updateEntity, createEntity, reset } from './payments.reducer';
import { IPayments } from 'app/shared/model/payments.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPaymentsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaymentsUpdate = (props: IPaymentsUpdateProps) => {
  const [orderId, setOrderId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { paymentsEntity, orders, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/payments');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getOrders();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.sendDate = convertDateTimeToServer(values.sendDate);
    values.paymentDate = convertDateTimeToServer(values.paymentDate);

    if (errors.length === 0) {
      const entity = {
        ...paymentsEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="investApplication3App.payments.home.createOrEditLabel">
            <Translate contentKey="investApplication3App.payments.home.createOrEditLabel">Create or edit a Payments</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : paymentsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="payments-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="payments-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="sendDateLabel" for="payments-sendDate">
                  <Translate contentKey="investApplication3App.payments.sendDate">Send Date</Translate>
                </Label>
                <AvInput
                  id="payments-sendDate"
                  type="datetime-local"
                  className="form-control"
                  name="sendDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.paymentsEntity.sendDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="paymentDateLabel" for="payments-paymentDate">
                  <Translate contentKey="investApplication3App.payments.paymentDate">Payment Date</Translate>
                </Label>
                <AvInput
                  id="payments-paymentDate"
                  type="datetime-local"
                  className="form-control"
                  name="paymentDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.paymentsEntity.paymentDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="priceLabel" for="payments-price">
                  <Translate contentKey="investApplication3App.payments.price">Price</Translate>
                </Label>
                <AvField id="payments-price" type="string" className="form-control" name="price" />
              </AvGroup>
              <AvGroup>
                <Label id="employeeIdLabel" for="payments-employeeId">
                  <Translate contentKey="investApplication3App.payments.employeeId">Employee Id</Translate>
                </Label>
                <AvField id="payments-employeeId" type="string" className="form-control" name="employeeId" />
              </AvGroup>
              <AvGroup>
                <Label for="payments-order">
                  <Translate contentKey="investApplication3App.payments.order">Order</Translate>
                </Label>
                <AvInput id="payments-order" type="select" className="form-control" name="orderId">
                  <option value="" key="0" />
                  {orders
                    ? orders.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/payments" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  orders: storeState.orders.entities,
  paymentsEntity: storeState.payments.entity,
  loading: storeState.payments.loading,
  updating: storeState.payments.updating,
  updateSuccess: storeState.payments.updateSuccess,
});

const mapDispatchToProps = {
  getOrders,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsUpdate);

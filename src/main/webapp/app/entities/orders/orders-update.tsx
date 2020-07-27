import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILots } from 'app/shared/model/lots.model';
import { getEntities as getLots } from 'app/entities/lots/lots.reducer';
import { getEntity, updateEntity, createEntity, reset } from './orders.reducer';
import { IOrders } from 'app/shared/model/orders.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOrdersUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrdersUpdate = (props: IOrdersUpdateProps) => {
  const [lotId, setLotId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { ordersEntity, lots, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/orders');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getLots();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const entity = {
        ...ordersEntity,
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
          <h2 id="investApplication3App.orders.home.createOrEditLabel">
            <Translate contentKey="investApplication3App.orders.home.createOrEditLabel">Create or edit a Orders</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ordersEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="orders-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="orders-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="startDateLabel" for="orders-startDate">
                  <Translate contentKey="investApplication3App.orders.startDate">Start Date</Translate>
                </Label>
                <AvInput
                  id="orders-startDate"
                  type="datetime-local"
                  className="form-control"
                  name="startDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.ordersEntity.startDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endDateLabel" for="orders-endDate">
                  <Translate contentKey="investApplication3App.orders.endDate">End Date</Translate>
                </Label>
                <AvInput
                  id="orders-endDate"
                  type="datetime-local"
                  className="form-control"
                  name="endDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.ordersEntity.endDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="priceLabel" for="orders-price">
                  <Translate contentKey="investApplication3App.orders.price">Price</Translate>
                </Label>
                <AvField id="orders-price" type="string" className="form-control" name="price" />
              </AvGroup>
              <AvGroup>
                <Label id="paymentTypeLabel" for="orders-paymentType">
                  <Translate contentKey="investApplication3App.orders.paymentType">Payment Type</Translate>
                </Label>
                <AvInput
                  id="orders-paymentType"
                  type="select"
                  className="form-control"
                  name="paymentType"
                  value={(!isNew && ordersEntity.paymentType) || 'CACHE'}
                >
                  <option value="CACHE">{translate('investApplication3App.PaymentType.CACHE')}</option>
                  <option value="CARD">{translate('investApplication3App.PaymentType.CARD')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="orderStatusLabel" for="orders-orderStatus">
                  <Translate contentKey="investApplication3App.orders.orderStatus">Order Status</Translate>
                </Label>
                <AvInput
                  id="orders-orderStatus"
                  type="select"
                  className="form-control"
                  name="orderStatus"
                  value={(!isNew && ordersEntity.orderStatus) || 'CREATED'}
                >
                  <option value="CREATED">{translate('investApplication3App.OrderStatus.CREATED')}</option>
                  <option value="SIGN_ONLINE">{translate('investApplication3App.OrderStatus.SIGN_ONLINE')}</option>
                  <option value="PAYMENT_CREATED">{translate('investApplication3App.OrderStatus.PAYMENT_CREATED')}</option>
                  <option value="CREATED_PACKAGE">{translate('investApplication3App.OrderStatus.CREATED_PACKAGE')}</option>
                  <option value="SIGN_PERSON">{translate('investApplication3App.OrderStatus.SIGN_PERSON')}</option>
                  <option value="EDIT_BUDGET">{translate('investApplication3App.OrderStatus.EDIT_BUDGET')}</option>
                  <option value="PAYMENT_CREATED_DECISION">
                    {translate('investApplication3App.OrderStatus.PAYMENT_CREATED_DECISION')}
                  </option>
                  <option value="PAY_DIVIDENTS">{translate('investApplication3App.OrderStatus.PAY_DIVIDENTS')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="employeeIdLabel" for="orders-employeeId">
                  <Translate contentKey="investApplication3App.orders.employeeId">Employee Id</Translate>
                </Label>
                <AvField id="orders-employeeId" type="string" className="form-control" name="employeeId" />
              </AvGroup>
              <AvGroup>
                <Label for="orders-lot">
                  <Translate contentKey="investApplication3App.orders.lot">Lot</Translate>
                </Label>
                <AvInput id="orders-lot" type="select" className="form-control" name="lotId">
                  <option value="" key="0" />
                  {lots
                    ? lots.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/orders" replace color="info">
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
  lots: storeState.lots.entities,
  ordersEntity: storeState.orders.entity,
  loading: storeState.orders.loading,
  updating: storeState.orders.updating,
  updateSuccess: storeState.orders.updateSuccess,
});

const mapDispatchToProps = {
  getLots,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrdersUpdate);

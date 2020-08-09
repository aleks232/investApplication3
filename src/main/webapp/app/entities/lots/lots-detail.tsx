import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './lots.reducer';
import { getFilteredOrders, createEntity } from 'app/entities/orders/orders.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Roles } from 'app/shared/auth/constants';
import { checkAdmin } from 'app/shared/util';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { displayDefaultDateTime, convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';

export interface ILotsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LotsDetail = (props: ILotsDetailProps) => {
  const [modal, setModal] = useState(false);
  const { 
    lotsEntity, 
    user, 
    getEntity: getEntityData, 
    getFilteredOrders: getFilteredOrdersList,
    filteredOrders,
   } = props;

   const toggle = React.useCallback(() => {
     setModal(!modal);
    }, [modal]);

  const isAdmin = React.useMemo(() => user.authorities && checkAdmin(user.authorities as Roles[]), [user]);

  const ordersForm = React.useMemo(
    () => {
        return {
          lotId: Number(lotsEntity.id),
          employeeId: user.id
        }
    }, [lotsEntity]
  );

  const saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const entity = {
        ...ordersForm,
        ...values,
      };

      props.createEntity(entity);
      setTimeout(
        () => {
          getFilteredOrdersList({
            lotId: props.match.params.id,
          });
          toggle();
        }, 700
      )
    }
  };

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
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}><Translate contentKey="investApplication3App.orders.home.createLabel">Create new Orders</Translate></ModalHeader>
          <ModalBody>
            <AvForm model={ordersForm} onSubmit={saveEntity}>
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
                  value={displayDefaultDateTime()}
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
                  value={displayDefaultDateTime()}
                />
              </AvGroup>
              <AvGroup>
                <Label id="priceLabel" for="orders-price">
                  <Translate contentKey="investApplication3App.orders.price">Price</Translate>
                </Label>
                <AvField id="orders-price" type="string" className="form-control" name="price" required />
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
                  value={'CACHE'}
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
                  value={'CREATED'}
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
              <Button color="primary" id="save-entity" type="submit">
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          </ModalBody>
        </Modal>
        <Button tag={Link} to="/lots" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button color="primary" onClick={toggle}>
          <FontAwesomeIcon icon="plus" />
          <span className="d-none d-md-inline">
            &nbsp;
            <Translate contentKey="investApplication3App.orders.home.createLabel">Create new Orders</Translate>
          </span>
        </Button>
        &nbsp;
        {
          isAdmin && (
            <Button tag={Link} to={`/orders/new/${lotsEntity.id}`} replace color="primary">
              <FontAwesomeIcon icon="plus" />
              &nbsp;
              <span className="d-none d-md-inline">
              <Translate contentKey="investApplication3App.orders.home.createLabel">Create new Orders</Translate>
              </span>
            </Button>
          )
        }
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ lots, authentication, orders }: IRootState) => ({
  lotsEntity: lots.entity,
  user: authentication.account,
  filteredOrders: orders.filteredOrders,
});

const mapDispatchToProps = { getEntity, getFilteredOrders, createEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LotsDetail);

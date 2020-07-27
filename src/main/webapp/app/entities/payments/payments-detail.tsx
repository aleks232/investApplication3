import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './payments.reducer';
import { IPayments } from 'app/shared/model/payments.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaymentsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaymentsDetail = (props: IPaymentsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { paymentsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="investApplication3App.payments.detail.title">Payments</Translate> [<b>{paymentsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="sendDate">
              <Translate contentKey="investApplication3App.payments.sendDate">Send Date</Translate>
            </span>
          </dt>
          <dd>{paymentsEntity.sendDate ? <TextFormat value={paymentsEntity.sendDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="paymentDate">
              <Translate contentKey="investApplication3App.payments.paymentDate">Payment Date</Translate>
            </span>
          </dt>
          <dd>
            {paymentsEntity.paymentDate ? <TextFormat value={paymentsEntity.paymentDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="price">
              <Translate contentKey="investApplication3App.payments.price">Price</Translate>
            </span>
          </dt>
          <dd>{paymentsEntity.price}</dd>
          <dt>
            <span id="employeeId">
              <Translate contentKey="investApplication3App.payments.employeeId">Employee Id</Translate>
            </span>
          </dt>
          <dd>{paymentsEntity.employeeId}</dd>
          <dt>
            <Translate contentKey="investApplication3App.payments.order">Order</Translate>
          </dt>
          <dd>{paymentsEntity.orderId ? paymentsEntity.orderId : ''}</dd>
        </dl>
        <Button tag={Link} to="/payments" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payments/${paymentsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ payments }: IRootState) => ({
  paymentsEntity: payments.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsDetail);

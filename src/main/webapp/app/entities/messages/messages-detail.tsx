import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './messages.reducer';
import { IMessages } from 'app/shared/model/messages.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMessagesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MessagesDetail = (props: IMessagesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { messagesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="investApplication3App.messages.detail.title">Messages</Translate> [<b>{messagesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="message">
              <Translate contentKey="investApplication3App.messages.message">Message</Translate>
            </span>
          </dt>
          <dd>{messagesEntity.message}</dd>
          <dt>
            <span id="notificationType">
              <Translate contentKey="investApplication3App.messages.notificationType">Notification Type</Translate>
            </span>
          </dt>
          <dd>{messagesEntity.notificationType}</dd>
          <dt>
            <span id="createDate">
              <Translate contentKey="investApplication3App.messages.createDate">Create Date</Translate>
            </span>
          </dt>
          <dd>
            {messagesEntity.createDate ? <TextFormat value={messagesEntity.createDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="confirmDate">
              <Translate contentKey="investApplication3App.messages.confirmDate">Confirm Date</Translate>
            </span>
          </dt>
          <dd>
            {messagesEntity.confirmDate ? <TextFormat value={messagesEntity.confirmDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="employeeId">
              <Translate contentKey="investApplication3App.messages.employeeId">Employee Id</Translate>
            </span>
          </dt>
          <dd>{messagesEntity.employeeId}</dd>
          <dt>
            <Translate contentKey="investApplication3App.messages.lot">Lot</Translate>
          </dt>
          <dd>{messagesEntity.lotId ? messagesEntity.lotId : ''}</dd>
        </dl>
        <Button tag={Link} to="/messages" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/messages/${messagesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ messages }: IRootState) => ({
  messagesEntity: messages.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MessagesDetail);

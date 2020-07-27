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
import { getEntity, updateEntity, createEntity, reset } from './messages.reducer';
import { IMessages } from 'app/shared/model/messages.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMessagesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MessagesUpdate = (props: IMessagesUpdateProps) => {
  const [lotId, setLotId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { messagesEntity, lots, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/messages' + props.location.search);
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
    values.createDate = convertDateTimeToServer(values.createDate);
    values.confirmDate = convertDateTimeToServer(values.confirmDate);

    if (errors.length === 0) {
      const entity = {
        ...messagesEntity,
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
          <h2 id="investApplication3App.messages.home.createOrEditLabel">
            <Translate contentKey="investApplication3App.messages.home.createOrEditLabel">Create or edit a Messages</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : messagesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="messages-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="messages-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="messageLabel" for="messages-message">
                  <Translate contentKey="investApplication3App.messages.message">Message</Translate>
                </Label>
                <AvField id="messages-message" type="text" name="message" />
              </AvGroup>
              <AvGroup>
                <Label id="notificationTypeLabel" for="messages-notificationType">
                  <Translate contentKey="investApplication3App.messages.notificationType">Notification Type</Translate>
                </Label>
                <AvInput
                  id="messages-notificationType"
                  type="select"
                  className="form-control"
                  name="notificationType"
                  value={(!isNew && messagesEntity.notificationType) || 'EMAIL'}
                >
                  <option value="EMAIL">{translate('investApplication3App.NotificationType.EMAIL')}</option>
                  <option value="TELEGRAM">{translate('investApplication3App.NotificationType.TELEGRAM')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="createDateLabel" for="messages-createDate">
                  <Translate contentKey="investApplication3App.messages.createDate">Create Date</Translate>
                </Label>
                <AvInput
                  id="messages-createDate"
                  type="datetime-local"
                  className="form-control"
                  name="createDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.messagesEntity.createDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="confirmDateLabel" for="messages-confirmDate">
                  <Translate contentKey="investApplication3App.messages.confirmDate">Confirm Date</Translate>
                </Label>
                <AvInput
                  id="messages-confirmDate"
                  type="datetime-local"
                  className="form-control"
                  name="confirmDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.messagesEntity.confirmDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="employeeIdLabel" for="messages-employeeId">
                  <Translate contentKey="investApplication3App.messages.employeeId">Employee Id</Translate>
                </Label>
                <AvField id="messages-employeeId" type="string" className="form-control" name="employeeId" />
              </AvGroup>
              <AvGroup>
                <Label for="messages-lot">
                  <Translate contentKey="investApplication3App.messages.lot">Lot</Translate>
                </Label>
                <AvInput id="messages-lot" type="select" className="form-control" name="lotId">
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
              <Button tag={Link} id="cancel-save" to="/messages" replace color="info">
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
  messagesEntity: storeState.messages.entity,
  loading: storeState.messages.loading,
  updating: storeState.messages.updating,
  updateSuccess: storeState.messages.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(MessagesUpdate);

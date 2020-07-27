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
import { getEntity, updateEntity, createEntity, reset } from './packages.reducer';
import { IPackages } from 'app/shared/model/packages.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPackagesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PackagesUpdate = (props: IPackagesUpdateProps) => {
  const [lotId, setLotId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { packagesEntity, lots, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/packages');
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
    if (errors.length === 0) {
      const entity = {
        ...packagesEntity,
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
          <h2 id="investApplication3App.packages.home.createOrEditLabel">
            <Translate contentKey="investApplication3App.packages.home.createOrEditLabel">Create or edit a Packages</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : packagesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="packages-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="packages-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="packages-title">
                  <Translate contentKey="investApplication3App.packages.title">Title</Translate>
                </Label>
                <AvField id="packages-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="packages-description">
                  <Translate contentKey="investApplication3App.packages.description">Description</Translate>
                </Label>
                <AvField id="packages-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label for="packages-lot">
                  <Translate contentKey="investApplication3App.packages.lot">Lot</Translate>
                </Label>
                <AvInput id="packages-lot" type="select" className="form-control" name="lotId">
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
              <Button tag={Link} id="cancel-save" to="/packages" replace color="info">
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
  packagesEntity: storeState.packages.entity,
  loading: storeState.packages.loading,
  updating: storeState.packages.updating,
  updateSuccess: storeState.packages.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(PackagesUpdate);

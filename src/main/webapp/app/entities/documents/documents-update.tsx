import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, CustomFileInput } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getPackages } from 'app/entities/packages/packages.reducer';
import { getEntity, updateEntity, createEntity, reset, uploadFile } from './documents.reducer';
import { getFormData, initUploadFile } from 'app/entities/documents/utils';

export interface IDocumentsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DocumentsUpdate = (props: IDocumentsUpdateProps) => {
  const [packageDocumentId, setPackageDocumentId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { documentsEntity, packages, loading, updating, fileInfo } = props;

  const handleClose = () => {
    props.history.push('/documents');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPackages();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...documentsEntity,
        ...values,
        ...(fileInfo ? {fileId: fileInfo.id} : null)
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  const onFileChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const nativeFiles = Array.from(event.target.files || []);
    const files = nativeFiles.map((file) => initUploadFile(file));
    const formData = getFormData(files, 'application/pdf');
    props.uploadFile(formData);
  }, [props.uploadFile])



  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="investApplication3App.documents.home.createOrEditLabel">
            <Translate contentKey="investApplication3App.documents.home.createOrEditLabel">Create or edit a Documents</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : documentsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="documents-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="documents-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="documents-title">
                  <Translate contentKey="investApplication3App.documents.title">Title</Translate>
                </Label>
                <AvField id="documents-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="documents-description">
                  <Translate contentKey="investApplication3App.documents.description">Description</Translate>
                </Label>
                <AvField id="documents-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="documents-type">
                  <Translate contentKey="investApplication3App.documents.type">Type</Translate>
                </Label>
                <AvField id="documents-type" type="text" name="type" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="documents-description">
                  <Translate contentKey="investApplication3App.documents.upload">Load file</Translate>
                </Label>
                <CustomFileInput id="document-file" onChange={onFileChange} />
              </AvGroup>
              <AvGroup>
                <Label for="documents-packageDocument">
                  <Translate contentKey="investApplication3App.documents.packageDocument">Package Document</Translate>
                </Label>
                <AvInput id="documents-packageDocument" type="select" className="form-control" name="packageDocumentId">
                  <option value="" key="0" />
                  {packages
                    ? packages.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/documents" replace color="info">
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
  packages: storeState.packages.entities,
  documentsEntity: storeState.documents.entity,
  loading: storeState.documents.loading,
  updating: storeState.documents.updating,
  updateSuccess: storeState.documents.updateSuccess,
  fileInfo: storeState.documents.fileInfo,
});

const mapDispatchToProps = {
  getPackages,
  getEntity,
  updateEntity,
  createEntity,
  reset,
  uploadFile,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsUpdate);

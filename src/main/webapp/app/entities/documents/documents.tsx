import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './documents.reducer';
import { IDocuments } from 'app/shared/model/documents.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDocumentsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Documents = (props: IDocumentsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { documentsList, match, loading } = props;
  return (
    <div>
      <h2 id="documents-heading">
        <Translate contentKey="investApplication3App.documents.home.title">Documents</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="investApplication3App.documents.home.createLabel">Create new Documents</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {documentsList && documentsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.documents.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.documents.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.documents.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.documents.packageDocument">Package Document</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {documentsList.map((documents, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${documents.id}`} color="link" size="sm">
                      {documents.id}
                    </Button>
                  </td>
                  <td>{documents.title}</td>
                  <td>{documents.description}</td>
                  <td>{documents.type}</td>
                  <td>
                    {documents.packageDocumentId ? (
                      <Link to={`packages/${documents.packageDocumentId}`}>{documents.packageDocumentId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${documents.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${documents.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${documents.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="investApplication3App.documents.home.notFound">No Documents found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ documents }: IRootState) => ({
  documentsList: documents.entities,
  loading: documents.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Documents);

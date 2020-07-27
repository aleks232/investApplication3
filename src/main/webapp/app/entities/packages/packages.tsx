import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './packages.reducer';
import { IPackages } from 'app/shared/model/packages.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPackagesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Packages = (props: IPackagesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { packagesList, match, loading } = props;
  return (
    <div>
      <h2 id="packages-heading">
        <Translate contentKey="investApplication3App.packages.home.title">Packages</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="investApplication3App.packages.home.createLabel">Create new Packages</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {packagesList && packagesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.packages.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.packages.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="investApplication3App.packages.lot">Lot</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {packagesList.map((packages, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${packages.id}`} color="link" size="sm">
                      {packages.id}
                    </Button>
                  </td>
                  <td>{packages.title}</td>
                  <td>{packages.description}</td>
                  <td>{packages.lotId ? <Link to={`lots/${packages.lotId}`}>{packages.lotId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${packages.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${packages.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${packages.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="investApplication3App.packages.home.notFound">No Packages found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ packages }: IRootState) => ({
  packagesList: packages.entities,
  loading: packages.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Packages);

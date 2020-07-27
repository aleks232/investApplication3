import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './packages.reducer';
import { IPackages } from 'app/shared/model/packages.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPackagesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PackagesDetail = (props: IPackagesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { packagesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="investApplication3App.packages.detail.title">Packages</Translate> [<b>{packagesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="investApplication3App.packages.title">Title</Translate>
            </span>
          </dt>
          <dd>{packagesEntity.title}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="investApplication3App.packages.description">Description</Translate>
            </span>
          </dt>
          <dd>{packagesEntity.description}</dd>
          <dt>
            <Translate contentKey="investApplication3App.packages.lot">Lot</Translate>
          </dt>
          <dd>{packagesEntity.lotId ? packagesEntity.lotId : ''}</dd>
        </dl>
        <Button tag={Link} to="/packages" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/packages/${packagesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ packages }: IRootState) => ({
  packagesEntity: packages.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PackagesDetail);

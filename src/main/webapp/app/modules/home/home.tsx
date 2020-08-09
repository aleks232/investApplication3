import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate, TextFormat } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';

import { getEntities } from 'app/entities/lots/lots.reducer';
import { APP_DATE_FORMAT } from 'app/config/constants';

export interface IHomeProp extends StateProps, DispatchProps {}

export const Home = (props: IHomeProp) => {
  const { account, lots, getLots } = props;

  const lastThreeLots = React.useMemo(() => lots.slice(-3), [lots]);

  React.useEffect(() => {
    getLots();
  }, [])

  return (
    <Row>
      <Col md="9">
        <h2>
          <Translate contentKey="home.title">Welcome to invest application!</Translate>
        </h2>
        <p className="lead">
        </p>
        {account && account.login ? (
          <div>
            <Alert color="success">
              <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                You are logged in as user {account.login}.
              </Translate>
            </Alert>
            <p>Последние открытые лоты:</p>
            <ul>
              {
                lastThreeLots.map((lot) => (
                  <li key={lot.id}>
                    <Link to={`/lots/${lot.id}`}>
                      Лот {lot.id}: {lot.description} {Number(lot.minPrice).toLocaleString("ru-RU", {
                        style: 'currency',
                        currency: 'RUB'
                      })} &nbsp;
                      <TextFormat type="date" value={lot.startDate} format={APP_DATE_FORMAT}/>
                    </Link>
                  </li>
                ))
              }
            </ul>
            <p>
              Последние 5 пользователей получившие выплаты:
            </p>
            <ul>
              <li>
                Тобянин Сергей Семёнович
              </li>
              <li>
                Сяббарова Елена Юрьевна
              </li>
              <li>
                Бенькова Гульнара Валерьевна
              </li>
              <li>
                Танчиков Евгений Александрович
              </li>
              <li>
                Корбенко Александр Николаевич
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
              <Link to="/login" className="alert-link">
                <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
              </Link>
              <Translate contentKey="global.messages.info.authenticated.suffix">
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </Translate>
            </Alert>

            <Alert color="warning">
              <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
              <Link to="/account/register" className="alert-link">
                <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
              </Link>
            </Alert>
          </div>
        )}

      </Col>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
    </Row>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  lots: storeState.lots.entities,
});

const mapDispatchToProps = { getLots: getEntities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);

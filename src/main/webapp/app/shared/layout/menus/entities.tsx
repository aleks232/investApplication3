import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/messages">
      <Translate contentKey="global.menu.entities.messages" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/lots">
      <Translate contentKey="global.menu.entities.lots" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/orders">
      <Translate contentKey="global.menu.entities.orders" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/payments">
      <Translate contentKey="global.menu.entities.payments" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/packages">
      <Translate contentKey="global.menu.entities.packages" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/documents">
      <Translate contentKey="global.menu.entities.documents" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);

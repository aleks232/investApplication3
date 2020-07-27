import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import messages, {
  MessagesState
} from 'app/entities/messages/messages.reducer';
// prettier-ignore
import lots, {
  LotsState
} from 'app/entities/lots/lots.reducer';
// prettier-ignore
import orders, {
  OrdersState
} from 'app/entities/orders/orders.reducer';
// prettier-ignore
import payments, {
  PaymentsState
} from 'app/entities/payments/payments.reducer';
// prettier-ignore
import packages, {
  PackagesState
} from 'app/entities/packages/packages.reducer';
// prettier-ignore
import documents, {
  DocumentsState
} from 'app/entities/documents/documents.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly messages: MessagesState;
  readonly lots: LotsState;
  readonly orders: OrdersState;
  readonly payments: PaymentsState;
  readonly packages: PackagesState;
  readonly documents: DocumentsState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  messages,
  lots,
  orders,
  payments,
  packages,
  documents,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;

import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPayments, defaultValue } from 'app/shared/model/payments.model';

export const ACTION_TYPES = {
  FETCH_PAYMENTS_LIST: 'payments/FETCH_PAYMENTS_LIST',
  FETCH_PAYMENTS: 'payments/FETCH_PAYMENTS',
  CREATE_PAYMENTS: 'payments/CREATE_PAYMENTS',
  UPDATE_PAYMENTS: 'payments/UPDATE_PAYMENTS',
  DELETE_PAYMENTS: 'payments/DELETE_PAYMENTS',
  RESET: 'payments/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPayments>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PaymentsState = Readonly<typeof initialState>;

// Reducer

export default (state: PaymentsState = initialState, action): PaymentsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAYMENTS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAYMENTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PAYMENTS):
    case REQUEST(ACTION_TYPES.UPDATE_PAYMENTS):
    case REQUEST(ACTION_TYPES.DELETE_PAYMENTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PAYMENTS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAYMENTS):
    case FAILURE(ACTION_TYPES.CREATE_PAYMENTS):
    case FAILURE(ACTION_TYPES.UPDATE_PAYMENTS):
    case FAILURE(ACTION_TYPES.DELETE_PAYMENTS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYMENTS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYMENTS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAYMENTS):
    case SUCCESS(ACTION_TYPES.UPDATE_PAYMENTS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAYMENTS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/payments';

// Actions

export const getEntities: ICrudGetAllAction<IPayments> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PAYMENTS_LIST,
  payload: axios.get<IPayments>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPayments> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAYMENTS,
    payload: axios.get<IPayments>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPayments> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAYMENTS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPayments> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAYMENTS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPayments> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAYMENTS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

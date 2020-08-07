import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, IPayload } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOrders, defaultValue } from 'app/shared/model/orders.model';
import { checkObj } from 'app/shared/util';

export const ACTION_TYPES = {
  FETCH_ORDERS_LIST: 'orders/FETCH_ORDERS_LIST',
  FETCH_ORDERS: 'orders/FETCH_ORDERS',
  CREATE_ORDERS: 'orders/CREATE_ORDERS',
  UPDATE_ORDERS: 'orders/UPDATE_ORDERS',
  DELETE_ORDERS: 'orders/DELETE_ORDERS',
  RESET: 'orders/RESET',
  FETCH_FILTERED_ORDERS_LIST: 'orders/FETCH_FILTERED_ORDERS_LIST',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOrders>,
  filteredOrders: [] as ReadonlyArray<IOrders>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type OrdersState = Readonly<typeof initialState>;

// Reducer

export default (state: OrdersState = initialState, action): OrdersState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ORDERS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FILTERED_ORDERS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ORDERS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ORDERS):
    case REQUEST(ACTION_TYPES.UPDATE_ORDERS):
    case REQUEST(ACTION_TYPES.DELETE_ORDERS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ORDERS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ORDERS):
    case FAILURE(ACTION_TYPES.FETCH_FILTERED_ORDERS_LIST):
    case FAILURE(ACTION_TYPES.CREATE_ORDERS):
    case FAILURE(ACTION_TYPES.UPDATE_ORDERS):
    case FAILURE(ACTION_TYPES.DELETE_ORDERS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ORDERS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILTERED_ORDERS_LIST):
      return {
        ...state,
        loading: false,
        filteredOrders: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ORDERS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ORDERS):
    case SUCCESS(ACTION_TYPES.UPDATE_ORDERS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ORDERS):
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

const apiUrl = 'api/orders';
const apiFilteredOrders = '/api/find/orders';

// Actions

export const getEntities: ICrudGetAllAction<IOrders> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ORDERS_LIST,
  payload: axios.get<IOrders>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IOrders> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ORDERS,
    payload: axios.get<IOrders>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IOrders> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ORDERS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOrders> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ORDERS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOrders> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ORDERS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

export const getFilteredOrders: any = (params: { lotId: number; orderStatus?: string }) => async dispatch => {
  const result: IPayload<IOrders> = await dispatch({
    type: ACTION_TYPES.FETCH_FILTERED_ORDERS_LIST,
    payload: axios.get(apiFilteredOrders, { params: checkObj(params) }),
  });
  return result;
};

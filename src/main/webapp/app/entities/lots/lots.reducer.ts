import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILots, defaultValue } from 'app/shared/model/lots.model';

export const ACTION_TYPES = {
  FETCH_LOTS_LIST: 'lots/FETCH_LOTS_LIST',
  FETCH_LOTS: 'lots/FETCH_LOTS',
  CREATE_LOTS: 'lots/CREATE_LOTS',
  UPDATE_LOTS: 'lots/UPDATE_LOTS',
  DELETE_LOTS: 'lots/DELETE_LOTS',
  RESET: 'lots/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILots>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type LotsState = Readonly<typeof initialState>;

// Reducer

export default (state: LotsState = initialState, action): LotsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LOTS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LOTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_LOTS):
    case REQUEST(ACTION_TYPES.UPDATE_LOTS):
    case REQUEST(ACTION_TYPES.DELETE_LOTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_LOTS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LOTS):
    case FAILURE(ACTION_TYPES.CREATE_LOTS):
    case FAILURE(ACTION_TYPES.UPDATE_LOTS):
    case FAILURE(ACTION_TYPES.DELETE_LOTS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOTS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOTS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_LOTS):
    case SUCCESS(ACTION_TYPES.UPDATE_LOTS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_LOTS):
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

const apiUrl = 'api/lots';

// Actions

export const getEntities: ICrudGetAllAction<ILots> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_LOTS_LIST,
    payload: axios.get<ILots>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ILots> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LOTS,
    payload: axios.get<ILots>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ILots> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LOTS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILots> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LOTS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILots> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LOTS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPackages, defaultValue } from 'app/shared/model/packages.model';

export const ACTION_TYPES = {
  FETCH_PACKAGES_LIST: 'packages/FETCH_PACKAGES_LIST',
  FETCH_PACKAGES: 'packages/FETCH_PACKAGES',
  CREATE_PACKAGES: 'packages/CREATE_PACKAGES',
  UPDATE_PACKAGES: 'packages/UPDATE_PACKAGES',
  DELETE_PACKAGES: 'packages/DELETE_PACKAGES',
  RESET: 'packages/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPackages>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PackagesState = Readonly<typeof initialState>;

// Reducer

export default (state: PackagesState = initialState, action): PackagesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACKAGES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACKAGES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PACKAGES):
    case REQUEST(ACTION_TYPES.UPDATE_PACKAGES):
    case REQUEST(ACTION_TYPES.DELETE_PACKAGES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PACKAGES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACKAGES):
    case FAILURE(ACTION_TYPES.CREATE_PACKAGES):
    case FAILURE(ACTION_TYPES.UPDATE_PACKAGES):
    case FAILURE(ACTION_TYPES.DELETE_PACKAGES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACKAGES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACKAGES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACKAGES):
    case SUCCESS(ACTION_TYPES.UPDATE_PACKAGES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACKAGES):
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

const apiUrl = 'api/packages';

// Actions

export const getEntities: ICrudGetAllAction<IPackages> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PACKAGES_LIST,
  payload: axios.get<IPackages>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPackages> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACKAGES,
    payload: axios.get<IPackages>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPackages> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACKAGES,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPackages> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACKAGES,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPackages> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACKAGES,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

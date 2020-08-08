import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { defaultValue } from 'app/shared/model/documents.model';
import { FileInfo } from 'app/swagger/model/fileInfo';
import { DocumentsDTO } from 'app/swagger/model/documentsDTO';
import { checkObj } from 'app/shared/util';

export const ACTION_TYPES = {
  FETCH_DOCUMENTS_LIST: 'documents/FETCH_DOCUMENTS_LIST',
  FETCH_DOCUMENTS: 'documents/FETCH_DOCUMENTS',
  FETCH_FILTERED_DOCUMENTS_LIST: 'documents/FETCH_FILTERED_DOCUMENTS_LIST',
  CREATE_DOCUMENTS: 'documents/CREATE_DOCUMENTS',
  UPDATE_DOCUMENTS: 'documents/UPDATE_DOCUMENTS',
  DELETE_DOCUMENTS: 'documents/DELETE_DOCUMENTS',
  RESET: 'documents/RESET',
  UPLOAD_FILE: 'documents/UPLOAD_FILE',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<DocumentsDTO>,
  entity: defaultValue,
  filteredDocuments: [] as ReadonlyArray<DocumentsDTO>,
  updating: false,
  updateSuccess: false,
  fileInfo: null as FileInfo,
};

export type DocumentsState = Readonly<typeof initialState>;

// Reducer

export default (state: DocumentsState = initialState, action): DocumentsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DOCUMENTS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FILTERED_DOCUMENTS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DOCUMENTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DOCUMENTS):
    case REQUEST(ACTION_TYPES.UPDATE_DOCUMENTS):
    case REQUEST(ACTION_TYPES.DELETE_DOCUMENTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DOCUMENTS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DOCUMENTS):
    case FAILURE(ACTION_TYPES.FETCH_FILTERED_DOCUMENTS_LIST):
    case FAILURE(ACTION_TYPES.CREATE_DOCUMENTS):
    case FAILURE(ACTION_TYPES.UPDATE_DOCUMENTS):
    case FAILURE(ACTION_TYPES.DELETE_DOCUMENTS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOCUMENTS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILTERED_DOCUMENTS_LIST):
      return {
        ...state,
        loading: false,
        filteredDocuments: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOCUMENTS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DOCUMENTS):
    case SUCCESS(ACTION_TYPES.UPDATE_DOCUMENTS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DOCUMENTS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case SUCCESS(ACTION_TYPES.UPLOAD_FILE):
      return {
        ...state,
        fileInfo: action.payload.data,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/documents';
const apiFilteredDocuments = '/api/find/documents';

// Actions

export const getEntities: ICrudGetAllAction<DocumentsDTO> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DOCUMENTS_LIST,
  payload: axios.get<DocumentsDTO>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<DocumentsDTO> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DOCUMENTS,
    payload: axios.get<DocumentsDTO>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<DocumentsDTO> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DOCUMENTS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<DocumentsDTO> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DOCUMENTS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<DocumentsDTO> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DOCUMENTS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

export const uploadFile: ICrudPutAction<FormData> = (formData: FormData) => async dispatch => {
  const uploadFileApi = '/api/rest/files/upload';
  const result = await dispatch({
    type: ACTION_TYPES.UPLOAD_FILE,
    payload: axios.post(uploadFileApi, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  });
  return result;
};

export const getFilteredDocuments: any = orderId => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.FETCH_FILTERED_DOCUMENTS_LIST,
    payload: axios.get(apiFilteredDocuments, { params: { orderId } }),
  });
  return result;
};

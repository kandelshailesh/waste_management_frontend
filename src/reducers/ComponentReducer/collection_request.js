import { CollectionRequestState } from '../ComponentState/collection_request';
import { message } from 'antd';

/**
 * @param state
 * @param action
 */

export const CollectionRequestReducer = (
  state = CollectionRequestState,
  action,
) => {
  switch (action.type) {
    case 'CREATE_COLLECTION_REQUEST':
      message.success('COLLECTION REQUEST ADDED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal: false,
        message: action.message,
        changed: true,
      };
    case 'FETCH_COLLECTION_REQUEST':
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };
    case 'EDIT_COLLECTION_REQUEST':
      message.success('COLLECTION REQUEST EDITED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal1: false,
        changed: true,
        message: action.message,
      };
    case 'DELETE_COLLECTION_REQUEST':
      message.success('COLLECTION REQUEST DELETED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        message: action.message,
        changed: true,
      };
    default:
      return state;
  }
};

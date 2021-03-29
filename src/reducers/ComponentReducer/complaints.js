import { ComplaintState } from '../ComponentState/complaints';
import { message } from 'antd';
import moment from 'moment';
/**
 * @param state
 * @param action
 */

export const ComplaintReducer = (state = ComplaintState, action) => {
  switch (action.type) {
    case 'CREATE_COMPLAINT':
      message.success('COMPLAINT ADDED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal: false,
        message: action.message,
        changed: true,
      };
    case 'FETCH_COMPLAINT':
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };
    case 'EDIT_COMPLAINT':
      message.success('COMPLAINT EDITED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal1: false,
        changed: true,
        message: action.message,
      };

    case 'DELETE_COMPLAINT':
      message.success('COMPLAINT DELETED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        payload: [],
        message: action.message,
        changed: true,
      };
    default:
      return state;
  }
};

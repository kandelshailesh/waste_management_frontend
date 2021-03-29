import { EventState } from '../ComponentState/events';
import { message } from 'antd';
import moment from 'moment';
/**
 * @param state
 * @param action
 */

export const EventReducer = (state = EventState, action) => {
  switch (action.type) {
    case 'CREATE_EVENT':
      message.success('EVENT ADDED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal: false,
        message: action.message,
        changed: true,
      };
    case 'FETCH_EVENT':
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };
    case 'EDIT_EVENT':
      message.success('EVENT EDITED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal1: false,
        changed: true,
        message: action.message,
      };

    case 'DELETE_EVENT':
      message.success('EVENT DELETED SUCCESSFULLY');
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

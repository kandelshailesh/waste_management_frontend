import { ScheduleState } from '../ComponentState/schedules';
import { message } from 'antd';
import moment from 'moment';
/**
 * @param state
 * @param action
 */

export const ScheduleReducer = (state = ScheduleState, action) => {
  switch (action.type) {
    case 'CREATE_SCHEDULE':
      message.success('SCHEDULE ADDED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal: false,
        message: action.message,
        changed: true,
      };
    case 'FETCH_SCHEDULE':
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };
    case 'EDIT_SCHEDULE':
      message.success('SCHEDULE EDITED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal1: false,
        changed: true,
        message: action.message,
      };
    case 'DELETE_SCHEDULE':
      message.success('SCHEDULE DELETED SUCCESSFULLY');
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

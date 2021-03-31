import { EmployeeState } from '../ComponentState/employees';
import { message } from 'antd';
import moment from 'moment';
/**
 * @param state
 * @param action
 */

export const EmployeeReducer = (state = EmployeeState, action) => {
  switch (action.type) {
    case 'CREATE_EMPLOYEE':
      message.success('EMPLOYEE ADDED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal: false,
        message: action.message,
        changed: true,
      };
    case 'FETCH_EMPLOYEE':
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };
    case 'EDIT_EMPLOYEE':
      message.success('EMPLOYEE EDITED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal1: false,
        changed: true,
        message: action.message,
      };

    case 'DELETE_EMPLOYEE':
      message.success('EMPLOYEE DELETED SUCCESSFULLY');
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

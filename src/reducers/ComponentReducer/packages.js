import { PackageState } from '../ComponentState/packages';
import { message } from 'antd';
import moment from 'moment';
/**
 * @param state
 * @param action
 */

export const PackageReducer = (state = PackageState, action) => {
  switch (action.type) {
    case 'CREATE_PACKAGE':
      message.success('PACKAGE ADDED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal: false,
        message: action.message,
        changed: true,
      };
    case 'FETCH_PACKAGE':
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };
    case 'EDIT_PACKAGE':
      message.success('PACKAGE EDITED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal1: false,
        changed: true,
        message: action.message,
      };

    case 'DELETE_PACKAGE':
      message.success('PACKAGE DELETED SUCCESSFULLY');
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

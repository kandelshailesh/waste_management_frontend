import { UserState } from '../ComponentState/users';
import { message } from 'antd';
/**
 * @param state
 * @param action
 */

export const UsersReducer = (state = UserState, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      message.success('USER CREATED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        message: action.message,
        modal: false,
        changed: true,
      };
    case 'FETCH_USERS':
      return {
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };
    case 'EDIT_USER':
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: true,
      };
    case 'DELETE_USER':
      message.success('USER DELETED SUCCESSFULLY');
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

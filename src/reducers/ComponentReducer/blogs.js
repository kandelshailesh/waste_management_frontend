import { BlogState } from '../ComponentState/blogs';
import { message } from 'antd';
import moment from 'moment';
/**
 * @param state
 * @param action
 */

export const BlogReducer = (state = BlogState, action) => {
  switch (action.type) {
    case 'CREATE_BLOG':
      message.success('BLOG ADDED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal: false,
        message: action.message,
        changed: true,
      };
    case 'FETCH_BLOG':
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };
    case 'EDIT_BLOG':
      message.success('BLOG EDITED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal1: false,
        changed: true,
        message: action.message,
      };

    case 'DELETE_BLOG':
      message.success('BLOG DELETED SUCCESSFULLY');
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

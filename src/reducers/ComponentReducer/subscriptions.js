import { SubscriptionState } from '../ComponentState/subscriptions';
import { message } from 'antd';
import moment from 'moment';
/**
 * @param state
 * @param action
 */

export const SubscriptionReducer = (state = SubscriptionState, action) => {
  switch (action.type) {
    case 'CREATE_SUBSCRIPTION':
      message.success('SUBSCRIPTION ADDED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal: false,
        message: action.message,
        changed: true,
      };
    case 'FETCH_SUBSCRIPTION':
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };
    case 'EDIT_SUBSCRIPTION':
      message.success('SUBSCRIPTION EDITED SUCCESSFULLY');
      return {
        ...state,
        error: action.error,
        modal1: false,
        changed: true,
        message: action.message,
      };

    case 'DELETE_SUBSCRIPTION':
      message.success('SUBSCRIPTION DELETED SUCCESSFULLY');
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

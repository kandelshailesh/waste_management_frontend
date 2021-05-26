import { TransactionState } from '../ComponentState/transactions';
import { message } from 'antd';
import moment from 'moment';
/**
 * @param state
 * @param action
 */

export const TransactionReducer = (state = TransactionState, action) => {
  switch (action.type) {
    case 'FETCH_TRANSACTION':
      return {
        ...state,
        error: action.error,
        payload: action.payload,
        message: action.message,
        changed: false,
      };

    default:
      return state;
  }
};

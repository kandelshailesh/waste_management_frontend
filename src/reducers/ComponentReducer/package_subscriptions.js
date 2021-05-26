import { PackageSubscriptionState } from '../ComponentState/package_subscriptions';
import { message } from 'antd';
import moment from 'moment';
/**
 * @param state
 * @param action
 */

export const PackageSubscriptionReducer = (
  state = PackageSubscriptionState,
  action,
) => {
  switch (action.type) {
    case 'FETCH_SUBSCRIPTION_BY_PACKAGE':
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

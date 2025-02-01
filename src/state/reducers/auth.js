import omit from 'lodash/omit';
import ActionTypes from '../actions/action-types';

/**
 * authReducer
 */
export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_AUTHENTICATION_REQUEST:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          isFetching: true,
          profile: action.profile,
          windowId: action.windowId,
        },
      };
    case ActionTypes.RESOLVE_AUTHENTICATION_REQUEST:
      return {
        ...state,
        [action.id]: {
          id: action.id, // external services skip ADD_AUTHENTICATION_REQUEST and need id
          ...state[action.id],
          isFetching: false,
          ok: action.ok,
        },
      };
    case ActionTypes.RECEIVE_ACCESS_TOKEN:
      if (!action.authId) return state;

      return {
        ...state,
        [action.authId]: {
          ...state[action.authId],
          ok: true,
        },
      };
    case ActionTypes.RECEIVE_ACCESS_TOKEN_FAILURE:
      if (!action.authId || action.authId !== 'external') return state;
      // mark external service failed
      return {
        ...state,
        [action.authId]: {
          ...state[action.authId],
          ok: false,
        },
      };
    case ActionTypes.RESET_AUTHENTICATION_STATE:
      return omit(state, action.id);
    default: return state;
  }
};

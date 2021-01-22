import { signConstants } from 'redux/constants';

const initialState = document.cookie.replace(
  /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
  '$1'
)
  ? { loggedIn: true }
  : { loggedIn: false };

export default function userAuth(state = initialState, action) {
  switch (action.type) {
    case signConstants.LOGIN_REQUEST:
      return {
        loggingin: true,
        user: action.payload,
      };
    case signConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        verified: action.payload.data.is_verified,
      };
    case signConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        error:
          action.error[0].error_code === 21
            ? `Error in ${action.error[0].error_fields[0].error_field}: ${action.error[0].error_fields[0].error_message}`
            : action.error[0].error_message,
      };
    case signConstants.VERIFYEMAIL_REQUEST:
      return { ...state, verifying: true };
    case signConstants.VERIFYEMAIL_SUCCESS:
      return {
        ...state,
        verified: action.payload.OK,
      };
    case signConstants.VERIFYEMAIL_FAILURE:
      return { verified: false };
    case signConstants.LOGOUT_REQUEST:
      return {
        loggedIn: action.payload,
      };
    case 'UPDATE_STATE':
      return initialState;
    default:
      return state;
  }
}

import { signConstants } from 'redux/constants';
const initialState = {};

export default function userRegistration(state = initialState, action) {
  switch (action.type) {
    case signConstants.VERIFY_REQUEST:
      return { verifying: true };
    case signConstants.VERIFY_SUCCESS:
      return {
        verified: true,
      };
    case signConstants.VERIFY_FAILURE:
      return { verified: false };
    // case signConstants.VERIFYEMAIL_REQUEST:
    //   return { registering: true };
    // case signConstants.VERIFYEMAIL_SUCCESS:
    //   return {
    //     verified: true,
    //   };
    // case signConstants.VERIFYEMAIL_FAILURE:
    //   return { verified: false };
    default:
      return state;
  }
}

import { signConstants } from 'redux/constants';

const initialState = {};

export default function recover(state = initialState, action) {
  switch (action.type) {
    case signConstants.RECOVER_REQUEST:
      return {
        recovering: true,
      };
    case signConstants.RECOVER_SUCCESS:
      return {
        recovered: true,
      };
    case signConstants.RECOVER_FAILURE:
      return {
        recovered: false,
        error: action.error,
      };
    default:
      return state;
  }
}

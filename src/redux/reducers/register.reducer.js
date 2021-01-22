import { signConstants } from 'redux/constants';
const initialState = {};

export default function userRegistration(state = initialState, action) {
  switch (action.type) {
    case signConstants.REGISTER_REQUEST:
      return { registering: true };
    case signConstants.REGISTER_SUCCESS:
      return {
        registered: true,
      };
    case signConstants.REGISTER_FAILURE:
      return { registered: false };
    default:
      return state;
  }
}

import { userConstants } from '../constants';

const initialState = {
  old_password: '',
  newpassword: '',
  repeatedPassword: '',
};

function resetForm(state = initialState, action) {
  switch (action.type) {
    case userConstants.EDIT_RESET_FORM:
      return {
        ...state,
        ...action.payload,
      };
    case userConstants.EMPTY_FORM:
      return {
        old_password: '',
        newpassword: '',
        repeatedPassword: '',
      };
    case userConstants.UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        address: action.payload,
      };

    default:
      return state;
  }
}

export default resetForm;

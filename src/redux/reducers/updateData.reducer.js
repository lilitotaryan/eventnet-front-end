import { userConstants } from '../constants';

const initialState = {
  first_name: '',
  last_name: '',
  phone_number: '',
};

function updateData(state = initialState, action) {
  switch (action.type) {
    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case userConstants.EMPTY_FORM:
      console.log(action.payload);

      return {
        first_name: '',
        last_name: '',
        phone_number: '',
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

export default updateData;

import { paymentConstants } from '../constants';
const initialState = {
  public_id: '',
  is_vip: false,
  fee: '',
};

export default function ticket(state = initialState, action) {
  switch (action.type) {
    case paymentConstants.SELECT:
      return { ...state, ...action.data };
    case paymentConstants.GET_TICKET_SUCCESS:
      return {
        ...state,
        success: true,
        msg: action.payload.OK ? 'Ticket Purchased!' : action.payload.errors[0].error_message,
      };
    case 'EMPTY_FORM':
      return {
        public_id: '',
        is_vip: false,
        fee: '',
      };
    default:
      return state;
  }
}

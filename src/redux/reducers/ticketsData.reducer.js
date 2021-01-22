import { ticketConstants } from 'redux/constants';

const initialState = {
  tickets: [],
  ticketsGotResponse: false,
  pageNumber: 1,
  error: '',
  useSuccess: false,
};
function ticketsData(state = initialState, action) {
  switch (action.type) {
    case ticketConstants.GET_COMPANY_TICKET:
      return {
        ...state,
        tickets: action.companyTickets.data.tickets,
        pageNumber: action.companyTickets.data.last_page,
        ticketsGotResponse: true,
      };

    case ticketConstants.GET_USER_TICKET:
      return {
        ...state,
        tickets: action.userTickets.data.tickets,
        pageNumber: action.userTickets.data.last_page,
        ticketsGotResponse: true,
      };

    case ticketConstants.USE_TICKET:
      return {
        ...state,
        tickets: action.error
          ? [...state.tickets]
          : state.tickets.map(ticket =>
              ticket.public_id === action.id
                ? {
                    ...ticket,
                    is_used: true,
                  }
                : ticket
            ),
        error: action.error ? action.error : '',
        useSuccess: action.error ? false : true,
      };

    case ticketConstants.HANDLE_CLOSE:
      return initialState;

    default:
      return state;
  }
}

export default ticketsData;

import { ticketConstants } from 'redux/constants';
import { fetchCompanyTickets, fetchUserTickets, usingTicket } from 'data/providers';

const getCompanyTickets = id => (dispatch, getState) => {
  const { token } = getState().userData;

  const { companySearch, userPage, isAllCompany, isUsed } = getState().sortingData;

  fetchCompanyTickets(id, userPage, isUsed, isAllCompany, companySearch, token)
    .then(companyTickets => dispatch({ type: ticketConstants.GET_COMPANY_TICKET, companyTickets }))
    .catch(e => console.error(e));
};

const getUserTickets = () => (dispatch, getState) => {
  const { token } = getState().userData;
  const { userSearch, companyPage, isOrdering, isAllUser, isUsed } = getState().sortingData;

  fetchUserTickets(companyPage, isUsed, isAllUser, isOrdering, userSearch, token)
    .then(userTickets => dispatch({ type: ticketConstants.GET_USER_TICKET, userTickets }))
    .catch(e => console.error(e));
};

const useTicketAction = id => (dispatch, getState) => {
  const { token } = getState().userData;
  return usingTicket(id, token)
    .then(ticket => {
      if (!ticket.OK) {
        console.log('use ticket error message', ticket.errors[0].error_message);
        const message = ticket.errors[0].error_message;
        dispatch({
          type: ticketConstants.USE_TICKET,
          error: message,
        });
      } else {
        dispatch({
          type: ticketConstants.USE_TICKET,
          id,
        });
      }
    })
    .catch(e => console.error(e));
};

const handleClose = () => dispatch => dispatch({ type: ticketConstants.HANDLE_CLOSE });

export default { getCompanyTickets, getUserTickets, handleClose, useTicketAction };

import { sortingConstants } from 'redux/constants';

const changeCategories = (category, isChecked) => dispatch =>
  dispatch({ type: sortingConstants.CATEGORY_CHANGE, category, isChecked });

const changeStates = (state, isChecked) => dispatch =>
  dispatch({ type: sortingConstants.STATE_CHANGE, state, isChecked });

const changeCities = (city, isChecked) => dispatch =>
  dispatch({ type: sortingConstants.CITY_CHANGE, city, isChecked });

const changeIsAll = () => dispatch => dispatch({ type: sortingConstants.IS_ALL_CHANGE });

const changePage = pageNo => dispatch => dispatch({ type: sortingConstants.PAGE_CHANGE, pageNo });

const changePageCompany = pageNo => dispatch =>
  dispatch({ type: sortingConstants.PAGE_CHANGE_COMPANY, pageNo });

const changePageUser = pageNo => dispatch =>
  dispatch({ type: sortingConstants.PAGE_CHANGE_USER, pageNo });

const searchEvents = search => dispatch =>
  dispatch({ type: sortingConstants.SEARCH_CHANGE, search });

const searchCompanyTickets = search => dispatch =>
  dispatch({ type: sortingConstants.SEARCH_COMPANY_TICKET, search });

const searchUserTickets = search => dispatch =>
  dispatch({ type: sortingConstants.SEARCH_USER_TICKET, search });

const changeIsFree = isFree => dispatch =>
  dispatch({ type: sortingConstants.IS_FREE_CHANGE, isFree });

const changeIsAllCompanyTickets = () => dispatch =>
  dispatch({ type: sortingConstants.IS_ALL_COMPANY });

const changeIsAllUserTickets = () => dispatch => dispatch({ type: sortingConstants.IS_ALL_USER });

const changeIsOrdering = isOrdering => dispatch =>
  dispatch({ type: sortingConstants.IS_ORDERING, isOrdering });

const changeOrdering = ordering => dispatch =>
  dispatch({ type: sortingConstants.ORDERING, ordering });

const chanegeIsUsed = () => dispatch => dispatch({ type: sortingConstants.IS_USED });

export default {
  changeCategories,
  changeStates,
  changeCities,
  changeIsAll,
  changeIsFree,
  changePage,
  changePageCompany,
  changePageUser,
  searchEvents,
  searchCompanyTickets,
  searchUserTickets,
  chanegeIsUsed,
  changeIsOrdering,
  changeIsAllCompanyTickets,
  changeIsAllUserTickets,
  changeOrdering,
};

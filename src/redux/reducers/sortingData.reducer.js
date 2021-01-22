import { sortingConstants } from 'redux/constants';

const initialState = {
  categories: [],
  states: [],
  cities: [],
  search: '',
  isAll: true,
  isAllCompany: true,
  isAllUser: true,
  isOrdering: null,
  ordering: null,
  isUsed: false,
  companySearch: '',
  userSearch: '',
  isFree: false,
  companyPage: 1,
  userPage: 1,
  page: 1,
};
function sortingData(state = initialState, action) {
  switch (action.type) {
    case sortingConstants.CATEGORY_CHANGE:
      return {
        ...state,
        isAll: false,
        categories: action.isChecked
          ? state.categories.filter(category => category !== action.category)
          : [...state.categories, action.category],
      };

    case sortingConstants.STATE_CHANGE:
      return {
        ...state,
        isAll: false,
        states: action.isChecked
          ? state.states.filter(state => state !== action.state)
          : [...state.states, action.state],
      };

    case sortingConstants.CITY_CHANGE:
      return {
        ...state,
        isAll: false,
        cities: action.isChecked
          ? state.cities.filter(city => city !== action.city)
          : [...state.cities, action.city],
      };

    case sortingConstants.SEARCH_CHANGE:
      return {
        ...state,
        isAll: false,
        search: action.search,
      };

    case sortingConstants.SEARCH_COMPANY_TICKET:
      return {
        ...state,
        isAllCompany: false,
        companySearch: action.search,
      };

    case sortingConstants.SEARCH_USER_TICKET:
      return {
        ...state,
        isAllUser: false,
        userSearch: action.search,
      };

    case sortingConstants.IS_FREE_CHANGE:
      return {
        ...state,
        isFree: action.isFree,
      };

    case sortingConstants.IS_ORDERING:
      return {
        ...state,
        isOrdering: action.isOrdering,
        isAllUser: false,
        isAllCompany: false,
      };

    case sortingConstants.ORDERING:
      return {
        ...state,
        ordering: action.ordering,
        isAll: false,
      };

    case sortingConstants.IS_USED:
      return {
        ...state,
        isUsed: true,
        isAllUser: false,
        isAllCompany: false,
      };

    case sortingConstants.PAGE_CHANGE:
      return {
        ...state,
        page: action.pageNo,
      };

    case sortingConstants.PAGE_CHANGE_COMPANY:
      return {
        ...state,
        companyPage: action.pageNo,
      };

    case sortingConstants.PAGE_CHANGE_USER:
      return {
        ...state,
        userPage: action.pageNo,
      };

    case sortingConstants.IS_ALL_CHANGE:
      return {
        ...state,
        categories: [],
        states: [],
        cities: [],
        search: '',
        isAll: true,
      };

    case sortingConstants.IS_ALL_COMPANY:
      return {
        ...state,
        isAllCompany: true,
        isUsed: false,
        companySerarch: '',
        companyPage: 1,
      };

    case sortingConstants.IS_ALL_USER:
      return {
        ...state,
        isAllUser: true,
        isOrdering: null,
        isUsed: false,
        userSearch: '',
        userPage: 1,
      };

    default:
      return state;
  }
}

export default sortingData;

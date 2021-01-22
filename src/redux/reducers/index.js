import { combineReducers } from 'redux';

import userRegistration from './register.reducer';
import userAuth from './userAuth.reducer';
import userData from './userData.reducer';
import recover from './recover.reducer';
import payment from './payment.reducer';
import eventsData from './eventsData.reducer';
import updateData from './updateData.reducer';
import resetForm from './resetForm.reducer';
import sortingData from './sortingData.reducer';
import stripeData from './stripeData.reducer';
import ticketsData from './ticketsData.reducer';
import ticket from './ticket.reducer';
import userFavorite from './userFavorite.reducer';

const rootReducer = combineReducers({
  userData,
  userAuth,
  userRegistration,
  recover,
  payment,
  eventsData,
  updateData,
  resetForm,
  sortingData,
  stripeData,
  ticketsData,
  ticket,
  userFavorite,
});

export default rootReducer;

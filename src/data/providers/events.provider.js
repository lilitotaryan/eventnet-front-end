// import { eventsData } from 'mockData';
import fetchWithHeaders from './helpers';

const baseUrl = 'https://eventnet-api-staging.ml';

export async function fetchEvents(
  pageNo,
  categories,
  states,
  cities,
  priceOrdering,
  isAll,
  serach
) {
  const priceVal = priceOrdering === 'asc' ? 'ticket_fee' : '-ticket_fee';
  let categoriesValues = '';
  let stateValues = '';
  let cityValues = '';

  if (categories && categories.length !== 0) {
    categories.map(category => (categoriesValues = categoriesValues + ',' + category));
  }

  if (states && states.length !== 0) {
    states.map(state => (stateValues = stateValues + ',' + state));
  }

  if (cities && cities.length !== 0) {
    cities.map(city => (cityValues = cityValues + ',' + city));
  }

  let fetchUrl = !isAll
    ? `${baseUrl}/event/all/?categories=${categoriesValues}&ordering=${priceVal}&address__state=${stateValues}&address__city=${cityValues}&page=${pageNo}`
    : `${baseUrl}/event/all/?page=${pageNo}`;

  if (serach && serach.length > 0) {
    fetchUrl = !isAll
      ? `${baseUrl}/event/all/?categories=${categoriesValues}&ordering=${priceVal}&address__state=${stateValues}&address__city=${cityValues}&search=${serach}&page=${pageNo}`
      : `${baseUrl}/event/all/?search=${serach}&page=${pageNo}`;
  }

  console.log('url', fetchUrl);
  const eventsResponse = await fetchWithHeaders(fetchUrl, null).then(res => res.json());
  console.log('events response is: ', eventsResponse);
  return eventsResponse;
}

export async function fetchCompanyEvents(
  pageNo,
  token,
  categories,
  states,
  cities,
  priceOrdering,
  isAll,
  serach
) {
  const priceVal = priceOrdering === 'asc' ? 'ticket_fee' : '-ticket_fee';
  let categoriesValues = '';
  let stateValues = '';
  let cityValues = '';

  if (categories && categories.length !== 0) {
    categories.map(category => (categoriesValues = categoriesValues + ',' + category));
  }

  if (states && states.length !== 0) {
    states.map(state => (stateValues = stateValues + ',' + state));
  }

  if (cities && cities.length !== 0) {
    cities.map(city => (cityValues = cityValues + ',' + city));
  }

  let fetchUrl = !isAll
    ? `${baseUrl}/event/?categories=${categoriesValues}&address__state=${stateValues}&ordering=${priceVal}&address__city=${cityValues}&page=${pageNo}`
    : `${baseUrl}/event/?page=${pageNo}`;

  if (serach && serach.length > 0) {
    fetchUrl = !isAll
      ? `${baseUrl}/event/?categories=${categoriesValues}&ordering=${priceVal}&address__state=${stateValues}&address__city=${cityValues}&search=${serach}&page=${pageNo}`
      : `${baseUrl}/event/?search=${serach}&page=${pageNo}`;
  }

  console.log('events company fetch URL', fetchUrl);
  const eventsResponse = await fetchWithHeaders(fetchUrl, token).then(res => res.json());
  console.log(' company events response is: ', eventsResponse);
  return eventsResponse;
}

export async function postEvent(
  title,
  description,
  start_date,
  end_date,
  contactPhone,
  address1,
  address2,
  city,
  state,
  categories,
  ticket_fee,
  vip_ticket_fee,
  ticket_amount,
  is_responsible,
  username,
  token
) {
  const fetchUrl = `${baseUrl}/event/`;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      title,
      description,
      start_date,
      end_date,
      contact_phone_number: contactPhone,
      categories,
      address: {
        address1,
        address2,
        city,
        state,
        country: 'Armenia',
      },
      ticket_fee,
      vip_ticket_fee,
      ticket_amount,
      is_responsible,
      users: [{ name: username }],
    }),
  };
  const addedEvent = await fetchWithHeaders(fetchUrl, token, options).then(res => res.json());
  console.log('post event data', addedEvent);
  return addedEvent;
}

export async function deleteEvent(eventId, token) {
  const eventUrl = `${baseUrl}/event/${eventId}/`;
  const options = { method: 'DELETE' };
  const deleteEvenetResponse = await fetchWithHeaders(eventUrl, token, options).then(res =>
    res.json()
  );
  console.log('deleted event response is: ', eventId);
  return deleteEvenetResponse;
}

export async function editEvent(
  eventId,
  title,
  description,
  start_date,
  end_date,
  contactPhone,
  token
) {
  const eventUrl = `${baseUrl}/event/${eventId}/`;
  const options = {
    method: 'PATCH',
    body: JSON.stringify({
      title,
      description,
      start_date,
      end_date,
      contact_phone_number: contactPhone,
    }),
  };

  const editEventRes = await fetchWithHeaders(eventUrl, token, options).then(res => res.json());
  console.log('edit event data', editEventRes);
  return editEventRes;
}

export async function authStripe(state, code) {
  const fetchUrl = `${baseUrl}/auth/stripe/?state=${state}&code=${code}`;

  console.log('url', fetchUrl);
  const response = await fetchWithHeaders(fetchUrl, state).then(res => res.json());
  console.log('events response is: ', response);
  return response;
}

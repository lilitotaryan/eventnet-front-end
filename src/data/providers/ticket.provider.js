import fetchWithHeaders from './helpers';

const baseUrl = 'https://eventnet-api-staging.ml';

export async function fetchCompanyTickets(id, pageNo, isUsed, isAll, serach, token) {
  const isUsedValue = isUsed ? 'True' : '';

  let fetchUrl = !isAll
    ? `${baseUrl}/event/${id}/ticket/?page=${pageNo}&is_used=${isUsedValue}`
    : `${baseUrl}/event/${id}/ticket/?page=${pageNo}`;

  if (serach && serach.length > 0) {
    fetchUrl = !isAll
      ? `${baseUrl}/event/${id}/ticket/?search=${serach}&is_used=${isUsedValue}`
      : `${baseUrl}/event/${id}/ticket/?search=${serach}&page=${pageNo}`;
  }
  const ticketResponse = await fetchWithHeaders(fetchUrl, token).then(res => res.json());
  console.log(' company ticket response is: ', ticketResponse, fetchUrl);
  return ticketResponse;
}

export async function fetchUserTickets(pageNo, isUsed, isAll, isOrdering, serach, token) {
  const isUsedValue = isUsed ? 'True' : '';
  const isOrderingValue = isOrdering === 'asc' ? 'event__end_date' : '-event__end_date';

  let fetchUrl = !isAll
    ? `${baseUrl}/payment/ticket/?page=${pageNo}&is_used=${isUsedValue}&ordering=${isOrderingValue}`
    : `${baseUrl}/payment/ticket/?page=${pageNo}`;

  if (serach && serach.length > 0) {
    fetchUrl = !isAll
      ? `${baseUrl}/payment/ticket/?page=${pageNo}&is_used=${isUsedValue}&ordering=${isOrderingValue}&search=${serach}`
      : `${baseUrl}/payment/ticket/?search=${serach}&page=${pageNo}`;
  }
  const ticketResponse = await fetchWithHeaders(fetchUrl, token).then(res => res.json());
  console.log(' company ticket response is: ', ticketResponse, fetchUrl);
  return ticketResponse;
}

export async function usingTicket(id, token) {
  const fetchUrl = `${baseUrl}/payment/ticket/`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({
      public_id: id,
    }),
  };
  const useTicketRes = await fetchWithHeaders(fetchUrl, token, options).then(res => res.json());
  console.log('use ticket', useTicketRes, fetchUrl);
  return useTicketRes;
}

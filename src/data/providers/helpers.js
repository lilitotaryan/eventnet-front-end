// This seems like a good idea for now.
const fetchWithHeaders = (fetchUrl, accessToken, options = {}) => {
  const optionsWithAuth = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'JWT-TOKEN': accessToken ? accessToken : '',
      'API-KEY': '12bf8fffa86840aee50aeb408621f0ba9c131d8e0edca457ec68a48674f1d4a5',
    },
  };
  console.log('headers', optionsWithAuth);
  return fetch(fetchUrl, optionsWithAuth);
};

export default fetchWithHeaders;

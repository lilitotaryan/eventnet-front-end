function logout() {
  document.cookie = 'authToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  // window.location.reload();
}

// const baseUrl = 'http://127.0.0.1:8000/';
const baseUrl = 'https://www.eventnet-api-staging.ml/';

function getHeaders() {
  const auth = getAuthToken();
  if (auth !== undefined && auth) {
    console.log(auth);
    return {
      'Content-Type': 'application/json',
      'JWT-TOKEN': auth,
      'API-KEY': '12bf8fffa86840aee50aeb408621f0ba9c131d8e0edca457ec68a48674f1d4a5',
    };
  }
  return {
    'Content-Type': 'application/json',
    'API-KEY': '12bf8fffa86840aee50aeb408621f0ba9c131d8e0edca457ec68a48674f1d4a5',
  };
}

async function request(url, headers = {}, method, body = {}, useToken = false) {
  const options = {
    method,
    headers: {
      ...getHeaders(),
      ...headers,
    },
    body: JSON.stringify(body),
  };
  console.log(options);
  const response = await fetch(baseUrl + url, options);
  const data = response.json();

  data
    .then(json => {
      console.log(json);
      if (useToken) {
        setAuthToken(json.data.auth_token);
      }
    })
    .catch(e => console.log(e));

  return data;
}

async function getRequest(url, headers = {}, method, body = {}, useToken = false) {
  const getOptions = {
    method,
    headers: {
      ...getHeaders(),
      ...headers,
    },
  };
  console.log(getOptions);
  const response = await fetch(baseUrl + url, getOptions);
  const data = response.json();
  data
    .then(json => {
      console.log(json);
      if (useToken && json.token) {
        setAuthToken(json.token);
      }
      // console.log(json);
    })
    .catch(e => console.log(e));

  return data;
}

function setAuthToken(cookie) {
  if (cookie !== undefined && cookie) {
    document.cookie = 'authToken=' + cookie;
  }
}

function getAuthToken() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
}

export const makeGet = async (url, headers, body, useToken) =>
  getRequest(url, headers, 'GET', body, useToken);
export const makePost = async (url, headers, body, useToken) =>
  request(url, headers, 'POST', body, useToken);
export const makeDelete = async (url, headers, body) => request(url, headers, 'DELETE', body);
export const makePut = async (url, headers, body, useToken) =>
  request(url, headers, 'PUT', body, useToken);
export const makePatch = async (url, headers, body, useToken) =>
  request(url, headers, 'PATCH', body, useToken);
export { logout };

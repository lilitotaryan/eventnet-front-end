import Axios from 'axios';
const baseUrl = 'https://www.eventnet-api-staging.ml/';

// const headers = {
//   'Content-Type': 'application/json',
//   'JWT-TOKEN': document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, '$1'),
//   'API-KEY': '12bf8fffa86840aee50aeb408621f0ba9c131d8e0edca457ec68a48674f1d4a5',
// };
export const clientSecretPull = (data, headers) => {
  console.log(data);
  console.log(headers);
  const url = baseUrl + 'payment/';
  return new Promise(async (resolve, reject) => {
    const response = await Axios.post(
      url,
      { ...data },
      {
        headers: headers,
      }
    );
    console.log(response.data);
    response.data.OK
      ? resolve({ data: response.data.data, OK: true })
      : resolve({ err: response.data.errors[0].error_message, OK: false });
  });
};

export const clientSecretDataObjectConverter = ({ fee, is_vip, public_id, amount }) => ({
  quant: amount,
  amount: fee,
  is_vip,
  public_id,
});

export const stripeDataObjectConverter = (
  { firstname, lastname, email, line1, line2, postal_code, city, country },
  cardElement
) => ({
  payment_method: {
    card: cardElement,
    billing_details: {
      address: {
        city,
        country,
        line1,
        line2,
        postal_code,
        state: null,
      },
      email,
      name: `${firstname} ${lastname}`,
      phone: null,
    },
  },
});

export const setCookie = (name, value, days) => {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

export const getCookie = name => {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const eraseCookie = name => {
  document.cookie = name + '=; Max-Age=-99999999;';
};

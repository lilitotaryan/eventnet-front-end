export const userData = {
  userName: 'usermock',
  firstName: 'Anna',
  lastName: 'Aramyan',
  email: 'anna@mock.am',
  phoneNumber: '098113355',
  age: '99',
  gender: 'femail',
  region: 'Yerevan',
  isCompany: false,
};

export const eventsData = [
  {
    id: 1,
    title: 'DemoTitle',
    description:
      'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
    date: Date.now(),
    isreasonabe: true,
    contactPhone: '09992222',
    category: [
      {
        name: 'name1',
        description: 'description',
      },
      {
        name: 'name2',
        description: 'description1',
      },
    ],
    address: {
      address1: 'DemoAddress1',
      address2: 'Demo2',
      city: 'Yerevan',
      state: 'State',
      zipCode: 'zipCode',
    },
    users: {
      firstName: 'Anna',
    },
    companyName: 'DemoCompany',
  },
  {
    public_id: 2,
    title: 'DemoAddress2',
    description:
      'Demo Descripstion2 This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
    date: Date.now(),
    isreasonabe: true,
    contactPhone: '09992222',
    category: [
      {
        name: 'name1',
        description: 'description',
      },
      {
        name: 'name2',
        description: 'description1',
      },
    ],
    address: {
      address1: 'Demo12',
      address2: 'Demo22',
      city: 'Yerevan',
      state: 'State',
      zipCode: 'zipCode',
    },
    users: {
      firstName: 'Anna',
    },
    companyName: 'DemoCompany',
  },
];

import Home from 'views/HomePage/Home/Home';
import SignUp from 'views/Register/SignUp/components/SignUp';
import SignIn from 'views/Register/Signin';
import Forgot from 'views/Register/Signin/Forgot';
import About from 'views/HomePage/About/About';
import Confirm from 'views/Register/Confirm/Confirm';
import Wrong from 'views/Wrong/Wrong';

const homeRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About Us',
    component: About,
  },
  {
    path: '/signup',
    name: 'SihmUp',
    component: SignUp,
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/verify',
    name: 'Verify',
    component: Confirm,
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot,
  },
  ,
  {
    path: '/error',
    name: 'Wrong',
    component: Wrong,
  },
];

export { homeRoutes };

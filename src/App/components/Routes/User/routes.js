import Person from '@material-ui/icons/Person';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import HistoryIcon from '@material-ui/icons/History';
import AddEvent from 'views/AddEvent/AddEvent';
import EventIcon from '@material-ui/icons/Event';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import MyProfile from 'views/MyProfile';
import CompanyEvents from 'views/CompanyEvents';
import Events from 'views/Events';
import Reset from 'views/Reset';
import Projects from 'views/Projects';
import AboutUs from 'views/AboutUs';
import Help from 'views/Help';

const companyRoutes = [
  {
    path: '/events',
    name: 'My Events',
    icon: EventIcon,
    component: CompanyEvents,
  },
  {
    path: '/myProfile',
    name: 'My Profile',
    icon: Person,
    component: MyProfile,
  },
  {
    path: '/addevent',
    name: 'Add Event',
    icon: PlaylistAddIcon,
    component: AddEvent,
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: SettingsIcon,
    component: Reset,
  },
  {
    path: '/aboutus',
    name: 'About Us',
    icon: InfoIcon,
    component: AboutUs,
  },
  {
    path: '/help',
    name: 'Help',
    icon: LiveHelpIcon,
    component: Help,
  },
];

const userRoutes = [
  {
    path: '/events',
    name: 'Events',
    icon: EventIcon,
    component: Events,
  },
  {
    path: '/myProfile',
    name: 'My Profile',
    icon: Person,
    component: MyProfile,
  },
  {
    path: '/eventHistory',
    name: 'Your Event History',
    icon: HistoryIcon,
    component: Projects,
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: SettingsIcon,
    component: Reset,
  },
  { path: '/aboutus', name: 'About Us', icon: InfoIcon, component: AboutUs },
  {
    path: '/help',
    name: 'Help',
    icon: LiveHelpIcon,
    component: Help,
  },
];

export { companyRoutes, userRoutes };

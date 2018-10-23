import Login from '../components/Login';
import NotFound from '../components/NotFound';
import Home from '../components/Home';
import ListSource from '../components/sources/ListSource';
import CreateSource from '../components/sources/CreateSource';
import DetailSource from '../components/sources/DetailSource';
import Config from '../components/Config';
import Register from '../components/Register';

export const publicRoutes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
];

export const privateRoutes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/sources/create',
    component: CreateSource
  },
  {
    path: '/sources/detail/:id',
    component: DetailSource
  },
  {
    path: '/sources',
    component: ListSource
  },
  {
    path: '/config',
    component: Config
  },
  {
    component: NotFound
  }
];

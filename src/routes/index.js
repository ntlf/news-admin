import Login from '../components/Login';
import NotFound from '../components/NotFound';
import Home from '../components/Home';
import ListSource from '../components/sources/ListSource';
import CreateSource from '../components/sources/CreateSource';
import DetailSource from '../components/sources/DetailSource';
import Config from '../components/Config';

export const publicRoutes = [
  {
    path: '/login',
    component: Login
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

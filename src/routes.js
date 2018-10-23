import Login from './components/Login';
import NotFound from './components/NotFound';
import Home from './components/Home';
import ListSource from './components/sources/ListSource';
import CreateSource from './components/sources/CreateSource';
import DetailSource from './components/sources/DetailSource';
import Register from './components/Register';
import ConfigEditor from './components/configs/ConfigEditor';
import ConfigList from './components/configs/ConfigList';

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
    path: '/configs/:id',
    component: ConfigEditor
  },
  {
    path: '/configs',
    component: ConfigList
  },
  {
    component: NotFound
  }
];

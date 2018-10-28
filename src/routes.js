import Login from './components/Login';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Register from './components/Register';
import ConfigEditor from './components/configs/ConfigEditor';
import ConfigList from './components/configs/ConfigList';
import ConfigForm from './components/configs/ConfigForm';

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

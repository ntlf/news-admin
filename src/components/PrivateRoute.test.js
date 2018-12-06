import { shallow } from 'enzyme';
import React from 'react';
import PrivateRoute from './PrivateRoute';

it('renders without crashing', () => {
  shallow(<PrivateRoute />);
});

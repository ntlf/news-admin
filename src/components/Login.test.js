import { shallow } from 'enzyme';
import React from 'react';
import Login from './Login';

it('renders without crashing', () => {
  shallow(<Login history={{}} location={{}} />);
});

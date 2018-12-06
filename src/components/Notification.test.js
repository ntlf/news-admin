import { shallow } from 'enzyme';
import React from 'react';
import NotFound from './NotFound';

it('renders without crashing', () => {
  shallow(<NotFound />);
});

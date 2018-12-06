import React from 'react';
import { shallow } from 'enzyme';
import MiniDrawer from './MiniDrawer';

it('renders without crashing', () => {
  shallow(<MiniDrawer />);
});

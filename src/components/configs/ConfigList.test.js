import { shallow } from 'enzyme';
import React from 'react';
import ConfigList from './ConfigList';

it('renders without crashing', () => {
  shallow(<ConfigList history={{}} />);
});

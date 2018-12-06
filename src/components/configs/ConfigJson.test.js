import { shallow } from 'enzyme';
import React from 'react';
import ConfigJson from './ConfigJson';

it('renders without crashing', () => {
  shallow(<ConfigJson data={{}} onChange={() => {}} />);
});

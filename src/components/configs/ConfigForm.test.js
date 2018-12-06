import { shallow } from 'enzyme';
import React from 'react';
import ConfigForm from './ConfigForm';

it('renders without crashing', () => {
  shallow(<ConfigForm data={{}} onChange={() => {}} />);
});

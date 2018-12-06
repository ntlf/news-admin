import { shallow } from 'enzyme';
import React from 'react';
import Loading from './Loading';

it('renders without crashing', () => {
  shallow(<Loading />);
});

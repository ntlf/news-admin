import { shallow } from 'enzyme';
import React from 'react';
import Register from './Register';

it('renders without crashing', () => {
  shallow(<Register history={{}} location={{}} />);
});

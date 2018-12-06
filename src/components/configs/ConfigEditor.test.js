import { shallow } from 'enzyme';
import React from 'react';
import ConfigEditor from './ConfigEditor';

it('renders without crashing', () => {
  shallow(<ConfigEditor history={{}} match={{}} />);
});

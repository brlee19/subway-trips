
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MapPin from './MapPin.js';

Enzyme.configure({ adapter: new Adapter() }) //move to some different file?

describe('MapPin', () => {
  describe('...', () => {
    it('should render YO', () => {
      const wrapper = mount(
        <MapPin />
      );
      expect(wrapper.html()).toContain('YO');
      wrapper.unmount();
    });
  });
});
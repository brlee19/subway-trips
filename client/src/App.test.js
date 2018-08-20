import React from 'react';
import { App } from './App';

import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('app component',() => {
  let wrapper;

  beforeEach(() => {
      wrapper = shallow(<App tripStatus={{isLoading: true}}
                             fetchTrips={jest.fn()}
                             fetchFavoriteTrips={jest.fn()}
                             fetchFavoriteLines={jest.fn()}
                        />)
      
  })

  it('renders without crashing', () => {
     expect(wrapper.length).toEqual(1)
  });
});
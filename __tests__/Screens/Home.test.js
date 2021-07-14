import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import Home from '../../app/Screens/Home'
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';

jest.useFakeTimers();


const mockStore = configureMockStore([]);
 
describe('Connected to Home Component', () => {
  let store;
  let component;

 
  beforeEach(() => {
    store = mockStore({
    });
  store.dispatch = jest.fn();
 
  component = renderer.create(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  });
 
  it('should render from Redux store', () => {
    renderer.act(() => {
        expect(component.toJSON()).toMatchSnapshot();
    });
  });
 
});

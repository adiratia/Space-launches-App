
import thunk from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './reducers';


  //Create store
export default () => {
    let store = createStore(
      rootReducer,
        applyMiddleware(thunk)
        );
    return store
    
}
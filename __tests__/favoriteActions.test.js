import * as Actions from '../app/store/actions/favoriteAction'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

/*
* Favorites action tests
* refference : https://stackoverflow.com/questions/48306319/getting-then-of-undefined-when-trying-to-test-a-dispatch-action-function-in-rea
*/

 describe('favorite actions',()=>{
        let store;
        beforeEach(() => {
          store = mockStore();
        });
    it('Add to favorites ',()=>{

        const expectedActions = [
                {
                  type: 'ADD_TO_FAVORITES',
                  payload : {
                        name: 'test',
                        image: 'test',
                        date : 'test',
                        status:'test',
                        country: 'test',
                        wiki:'test' 
                    }
                }
        ]
            store.dispatch(Actions.addToFavorites("test","test","test","test","test","test"));

            expect(store.getActions()).toEqual(expectedActions);
    });

    it('Remove from fevorites ',()=>{

        const expectedActions = [
                {
                  type: 'REMOVE_FROM_FAVORITES',
                  payload : {
                        name: 'test',

                    }
                }
        ]
            store.dispatch(Actions.removeFromFavorites("test"));

            expect(store.getActions()).toEqual(expectedActions);
    });

})

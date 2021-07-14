import * as Actions from '../app/store/actions/wikiAction'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

/*
* Wiki actions tests
* refference : https://stackoverflow.com/questions/48306319/getting-then-of-undefined-when-trying-to-test-a-dispatch-action-function-in-rea
*/

 describe('wiki actions',()=>{
        let store;
        beforeEach(() => {
          store = mockStore();
        });
    it('is loading action test',()=>{

        const expectedActions = [
                {
                    type: 'IS_LOADING',
                    payload : {
                        isLoading: true,
    
                    },
                }
        ]
            store.dispatch(Actions.is_Loading(true));

            expect(store.getActions()).toEqual(expectedActions);
    });

    it('Show wiki page action test ',()=>{

        const expectedActions = [
                {
                    type: 'SHOW_WIKI_PAGE',
                    payload : {
                        showWebView: true,
                        wikiURL: "http://test.com",
    
                    }
                }
        ]
            store.dispatch(Actions.showWiki(true,"http://test.com"));

            expect(store.getActions()).toEqual(expectedActions);
    });

})

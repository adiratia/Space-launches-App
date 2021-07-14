import wiki from "../app/store/reducers/wikiReducer";

const defaultState = {
    showWebView: false,
    wikiURL:"",
    isLoading:false
}

describe('favorite reducer',()=>{
    it('Show wiki page',()=>{
        const wikiTest =wiki(defaultState,{
                type: 'SHOW_WIKI_PAGE',
                payload : {
                    showWebView: true,
                    wikiURL: 'http://test.com',

                }
            })
            expect(wikiTest.showWebView).toEqual(true);
            expect(wikiTest.wikiURL).toEqual('http://test.com');

        });

        it('isloading test',()=>{
            const wikiTest =wiki(defaultState,{
                    type: 'IS_LOADING',
                    payload : {
                        isLoading: true,
    
                    },
                })
                expect(wikiTest.isLoading).toEqual(true);
    
            });


})
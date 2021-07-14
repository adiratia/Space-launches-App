
//Show wiki page action
export const showWiki=(showWebView,wikiURL) =>{
    return (dispatch)=> {
        
            dispatch( {
                type: 'SHOW_WIKI_PAGE',
                payload : {
                    showWebView: showWebView,
                    wikiURL: wikiURL,

                },
                
            })
        }
    }
//isLoading action
export const is_Loading=(isloading) =>{
    return (dispatch)=> {
        
            dispatch( {
                type: 'IS_LOADING',
                payload : {
                    isLoading: isloading,

                },
                
            })
        }
    }

  
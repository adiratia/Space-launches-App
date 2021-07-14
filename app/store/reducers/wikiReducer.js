
//initial state
const defaultState = {
    showWebView: false,
    wikiURL:"",
    isLoading:true
}

const wiki = (state=defaultState, action)=>{
    switch(action.type){
        //Set the wiki URL state 
        case 'SHOW_WIKI_PAGE':
            return {
                ...state,
                showWebView:action.payload.showWebView,
                wikiURL:action.payload.wikiURL
            }
            //Set the isLoading state
            case 'IS_LOADING':
            return {
                ...state,
                isLoading:action.payload.isLoading
            }
        
        default:
            return state
    }


}

export default wiki;
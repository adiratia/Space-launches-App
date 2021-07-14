
//initial state
const defaultState = {
    favorites: [],
}

const favorites = (state=defaultState, action)=>{
    switch(action.type){
        //Add launch to favorites
        case 'ADD_TO_FAVORITES':
            return {
                ...state,
                favorites: [...state.favorites,action.payload],// append to end of the favorite list
            }
        //Remove launch from favorites
        case 'REMOVE_FROM_FAVORITES':
             return {
                ...state,
                favorites: [
                    // Checks if the launch name is on the favorites list and remove it
                    ...state.favorites.filter(favorite => favorite.name!==action.payload.name) 
                ],
                }
        default:
            return state
    }


}

export default favorites;
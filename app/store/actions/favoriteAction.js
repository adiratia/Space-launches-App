

export const addToFavorites = (name,image,date,status,country,wiki) =>{
    return (dispatch)=> {
        
            dispatch( {
                type: 'ADD_TO_FAVORITES',
                //The new favorite launch
                payload : {
                    name: name,
                    image: image,
                    date : date,
                    status:status,
                    country: country,
                    wiki:wiki 
                }
            })
        }
    }

    export const removeFromFavorites =(name) =>{
        return (dispatch)=> {
            
                dispatch( {
                    type: 'REMOVE_FROM_FAVORITES',
                    payload : {
                        name: name,
                    }
                })
            }
        }
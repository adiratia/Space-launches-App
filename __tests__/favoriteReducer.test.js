import favorites from "../app/store/reducers/favoriteReducer";

describe('favorite reducer',()=>{
    it('Add to favorites',()=>{
        const fav =favorites({favorites:[]},{
                type: 'ADD_TO_FAVORITES',
                payload : {
                    name: 'test',
                    image: 'test',
                    date : 'test',
                    status:'test',
                    country: 'test',
                    wiki:'test' 
                }
            })
            expect(fav.favorites?.length).toEqual(1);
        });

        it('Remove from favorites',()=>{
            const fav =favorites({favorites:[]},{
                    type: 'REMOVE_FROM_FAVORITES',
                    payload : {
                        name: 'test',
                    }
                })
                expect(fav.favorites?.length).toEqual(0);
            });
})
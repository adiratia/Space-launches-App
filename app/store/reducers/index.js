
import favorites from "./favoriteReducer";
import wiki from "./wikiReducer";

import {combineReducers} from 'redux'

export default combineReducers({
    favorites,
    wiki
});
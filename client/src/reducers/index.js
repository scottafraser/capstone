import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, user, isLoggedIn, currentSong} from './items';

export default combineReducers({
    user,
    isLoggedIn,
    currentSong,
    items,
    itemsHasErrored,
    itemsIsLoading
});
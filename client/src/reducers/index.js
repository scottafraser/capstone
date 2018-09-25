import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, user, isLoggedIn, nowPlaying, userPlaylists} from './items';

export default combineReducers({
    user,
    isLoggedIn,
    nowPlaying,
    userPlaylists,
    items,
    itemsHasErrored,
    itemsIsLoading
});
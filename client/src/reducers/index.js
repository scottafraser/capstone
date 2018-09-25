import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, user, isLoggedIn, nowPlaying} from './items';

export default combineReducers({
    user,
    isLoggedIn,
    nowPlaying,
    items,
    itemsHasErrored,
    itemsIsLoading
});
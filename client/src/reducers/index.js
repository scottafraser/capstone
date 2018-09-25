import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, user, isLoggedIn} from './items';

export default combineReducers({
    user,
    isLoggedIn,
    items,
    itemsHasErrored,
    itemsIsLoading
});
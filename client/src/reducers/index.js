import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, user } from './items';

export default combineReducers({
    user,
    items,
    itemsHasErrored,
    itemsIsLoading
});
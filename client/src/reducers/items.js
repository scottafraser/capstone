
export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEM_HAS_ERRORED':
        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEM_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function loggedIn(state = false, action) {
    switch (action.type) {
        case 'LOG_IN':
            return action.loggedIn;

            default:
            return state
    }
}

export function items(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':

            return action.items

        case 'DELETE_ITEM':
            return [
                ...state.slice(0, action.index),
                ...state.slice(action.index + 1)
            ];

        default:
            return state;
    }
}

export function user(state = {}, action) { 
    switch (action.type) {
        case 'SET_USER':
         return action.user
        default:
            return state;
            

    }
}

//To re-iterate, every reducer will return a discrete property of the state, 
// regardless of how many conditions are inside that reducer.

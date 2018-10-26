export function itemsHasErrored(state = false, action) {
  switch (action.type) {
    case "ITEM_HAS_ERRORED":
    default:
      return state;
  }
}

export function itemsIsLoading(state = false, action) {
  switch (action.type) {
    case "ITEM_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function isLoggedIn(state = false, action) {
  switch (action.type) {
    case "LOGGED_IN":
      return action.isLoggedIn;
    default:
      return state;
  }
}

export function items(state = [], action) {
  switch (action.type) {
    case "ITEMS_FETCH_DATA_SUCCESS":
      return action.items;

    case "DELETE_ITEM":
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
    case "SET_USER":
      return action.user;
    default:
      return state;
  }
}

export function nowPlaying(state = {}, action) {
  switch (action.type) {
    case "GET_NOW_PLAYING":
      console.log("reducer fired" + action);
      return action.nowPlaying;
    default:
      return state;
  }
}

export function userPlaylists(state = [], action) {
  switch (action.type) {
    case "GET_PLAYLISTS":
      return action.userPlaylists.items;
    default:
      return state;
  }
}

// export function toggleSnacks(state = false, action) {
//   switch (action.type) {
//     case 'TOGGLE_SNACKS':
//         return !action.state
//       default:
//         return state;
//   }
// }

// export function getGenre(state = "", action) {
//   switch (action.type) {
//     case "GET_GENRE":
//       return action.user;
//     default:
//       return state;
//   }
// }

//To re-iterate, every reducer will return a discrete property of the state,
// regardless of how many conditions are inside that reducer.

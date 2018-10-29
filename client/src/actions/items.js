export function itemsHasErrored(bool) {
  return {
    type: "ITEMS_HAS_ERRORED",
    hasErrored: bool
  };
}

export function itemsIsLoading(bool) {
  return {
    type: "ITEMS_IS_LOADING",
    isLoading: bool
  };
}

export function itemsFetchDataSuccess(items) {
  return {
    type: "ITEMS_FETCH_DATA_SUCCESS",
    items
  };
}

export function setUser(user) {
  return {
    type: "SET_USER",
    user
  };
}

export function userIsLoggedIn(bool) {
  return {
    type: "LOGGED_IN",
    isLoggedIn: bool
  };
}

export function getUserCurrentSong(response) {
  console.log("action fired");
  return {
    type: "GET_NOW_PLAYING",
    nowPlaying: response
  };
}

export function getUserPlaylists(response) {
  return {
    type: "GET_PLAYLISTS",
    userPlaylists: response
  };
}

export function userCreatePlaylist(response) {
  return {
    type: "CREATE_PLAYLIST",
    createPlaylistTracks: response
  };
}

export function GetGenre(string) {
  return {
    type: "GET_GENRE",
    setGenre: string
  };
}

// export function openSnackBar(bool) {
//   return {
//     type: 'TOGGLE_SNACKBAR',
//     toggleSnacks: bool
//   }
// }

// export function itemsFetchData(response) {
//     return (dispatch) => {
//         dispatch(itemsIsLoading(true));
//         response.json()
//         .then((response) => {
//             if(!response.ok) {
//             throw Error(response.statusText);
//         }
//         dispatch(itemsIsLoading(false));
//         return response;
//     })
//     .then((response) => response.json())
//     .then((items) => dispatch(itemsFetchDataSuccess(items)))
//     .catch(() => dispatch(itemsHasErrored(true)));

//     }
// }

// export function deleteItem(index) {
//     return{
//         type: 'DELETE_ITEM',
//         index
//     }
// }

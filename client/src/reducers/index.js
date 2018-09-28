import { combineReducers } from "redux";
import {
  items,
  itemsHasErrored,
  itemsIsLoading,
  user,
  isLoggedIn,
  nowPlaying,
  userPlaylists
} from "./items";

import { createPlaylistTracks } from "./createPlaylist";

export default combineReducers({
  user,
  isLoggedIn,
  nowPlaying,
  userPlaylists,
  items,
  itemsHasErrored,
  itemsIsLoading,
  createPlaylistTracks
});

import { combineReducers } from "redux";
import { setGenre, setArtist } from "./genreReducer";
import { createPlaylistTracks } from "./createPlaylist";
import {
  items,
  itemsHasErrored,
  itemsIsLoading,
  user,
  isLoggedIn,
  nowPlaying,
  userPlaylists
} from "./items";

export default combineReducers({
  user,
  isLoggedIn,
  nowPlaying,
  userPlaylists,
  items,
  itemsHasErrored,
  itemsIsLoading,
  createPlaylistTracks,
  setGenre,
  setArtist
});

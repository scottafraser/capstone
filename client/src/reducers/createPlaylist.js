export function createPlaylistTracks(state = [], action) {
  switch (action.type) {
    case "CREATE_PLAYLIST":
      console.log("reducer " + action.createPlaylistTracks.tracks);
      return action.createPlaylistTracks.tracks;
    default:
      return state;
  }
}

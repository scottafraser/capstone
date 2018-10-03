
export function createPlaylistTracks(state = [], action) {
  switch (action.type) {
    case "CREATE_PLAYLIST":
      return action.createPlaylistTracks.tracks;
    default:
      return state;
  }
}

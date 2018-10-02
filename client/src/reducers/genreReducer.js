export function setGenre(state = {}, action) {
  switch (action.type) {
    case "SET_GENRE":
      return action.setGenre;
    default:
      return state;
  }
}

export function setArtist(state = {}, action) {
  switch (action.type) {
    case "SET_ARTIST":
      console.log('reducer log ' + action.setArtist);
      return action.setArtist;
    default:
      return state;
  }
}

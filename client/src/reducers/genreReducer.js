export function setGenre(state = {}, action) {
  switch (action.type) {
    case "SET_GENRE":
      console.log(action.setGenre);
      return action.setGenre;
    default:
      return state;
  }
}

export function setArtist(state = {}, action) {
  switch (action.type) {
    case "SET_ARTIST":
      console.log(action.setArtist);
      return action.setArtist;
    default:
      return state;
  }
}

export function setGenre(state = "", action) {
  switch (action.type) {
    case "SET_GENRE":
      console.log(action.setGenre);
      return action.setGenre;

    case "GET_GENRE":
      return action.setGenre;

    default:
      return state;
  }
}

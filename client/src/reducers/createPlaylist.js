export function setGenre(state = "", action) {
  console.log(action.setGenre);
  switch (action.type) {
    case "SET_GENRE":
      return action.setGenre;
    default:
      return state;
  }
}

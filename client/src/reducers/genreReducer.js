export function genre(state = { genre: "" }, action) {
  switch (action.type) {
    case "SET_GENRE":
      console.log(action.genre);
      return action.genre;
    default:
      return state;
  }
}

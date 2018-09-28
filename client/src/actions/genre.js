export function setGenreState(string) {
  console.log(string);
  return {
    type: "SET_GENRE",
    setGenre: string
  };
}

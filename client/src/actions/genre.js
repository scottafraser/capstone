export function setGenreState(string) {
  console.log(string);
  return {
    type: "SET_GENRE",
    setGenre: string
  };
}

export function setArtistState(string) {
  console.log(string);
  return {
    type: "SET_Artist",
    setGenre: string
  };
}



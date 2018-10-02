export function setGenreState(string) {
  return {
    type: "SET_GENRE",
    setGenre: string
  };
}

export function setArtistState(string) {
  console.log(string);
  return {
    type: "SET_ARTIST",
    setArtist: string
  };
}



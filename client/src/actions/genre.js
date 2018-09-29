export function setGenreState(string) {
  console.log(string);
  return {
    type: "SET_GENRE",
    setGenre: string
  };
}

// export function getGenreState(string) {
//   console.log(string);
//   return {
//     type: "GET_GENRE",
//     getGenre: string
//   };
// }

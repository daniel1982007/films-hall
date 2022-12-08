const initialState = {
  films: [],
  message: "",
};

export const films = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FILMS":
      const allFilms = action.payload;
      allFilms.sort((a, b) =>
        a.Title.toUpperCase() > b.Title.toUpperCase() ? 1 : -1
      );

      console.log(action.payload);
      localStorage.setItem("films", JSON.stringify(action.payload));

      return { ...state, films: allFilms };

    case "ADD_FILM":
      console.log(action.payload);
      //console.log([...films, action.payload])
      console.log(state); //after refresh, state will be undefined

      if (!action.payload.error) {
        localStorage.setItem("films", JSON.stringify([action.payload]));

        return { ...state, films: [action.payload] };
      } else {
        console.log({ ...state, message: action.payload.error });
        return { ...state, message: action.payload.error };
      }
    case "IMPORT_FILMS":
      console.log(action.payload);
      return action.payload;
    case "DELETE_FILM":
      console.log(action.payload);
      return state.films.filter((film) => film._id !== action.payload);
    case "SEARCH_FILM":
      return { ...state, films: action.payload };

    default:
      return films;
  }
};

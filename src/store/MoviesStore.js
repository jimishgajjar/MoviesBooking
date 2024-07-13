import { create } from "zustand";

const MoviesStore = create((set) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
}));

export default MoviesStore;

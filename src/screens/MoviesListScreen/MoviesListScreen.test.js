import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Provider } from "zustand";
import { MoviesStore } from "../store";
import MoviesListScreen from "./MoviesListScreen";

// Mock Zustand store
const mockMovies = [
  { id: "1", title: "Movie 1", image_uri: "http://example.com/movie1.jpg" },
  { id: "2", title: "Movie 2", image_uri: "http://example.com/movie2.jpg" },
];

// Mock the Zustand store
const MockStoreProvider = ({ children }) => {
  const store = MoviesStore.getState();
  store.setMovies(mockMovies);
  return <Provider store={MoviesStore}>{children}</Provider>;
};

describe("MoviesListScreen", () => {
  it("should render movies correctly", () => {
    render(
      <MockStoreProvider>
        <MoviesListScreen />
      </MockStoreProvider>
    );

    // Check if the movies are rendered
    expect(screen.getByText("Movie 1")).toBeTruthy();
    expect(screen.getByText("Movie 2")).toBeTruthy();

    // Optionally check for specific elements within the DisplayMovieItem
    // Adjust this based on what DisplayMovieItem renders
  });

  it("should display the correct number of movie items", () => {
    render(
      <MockStoreProvider>
        <MoviesListScreen />
      </MockStoreProvider>
    );

    // Check the number of movie items rendered
    const movieItems = screen.getAllByTestId("movie-item"); // Assuming you have a test ID on DisplayMovieItem
    expect(movieItems).toHaveLength(mockMovies.length);
  });
});

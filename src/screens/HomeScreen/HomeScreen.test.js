import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "zustand";
import HomeScreen from "./index";
import DisplayMovieItem from "../../components/DisplayMovieItem/DisplayMovieItem";
import { getAllMovies } from "../../services/api";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock("zustand", () => ({
  useStore: () => ({
    movies: [],
    setMovies: jest.fn(),
  }),
}));

jest.mock(
  "../../components/DisplayMovieItem/DisplayMovieItem",
  () => "DisplayMovieItem"
);

jest.mock("../../services/api", () => ({
  getAllMovies: jest.fn().mockResolvedValue([
    { id: 1, title: "Movie 1" },
    { id: 2, title: "Movie 2" },
  ]),
}));

describe("HomeScreen", () => {
  it("renders the HomeScreen component", async () => {
    const { findByText, getByText } = render(<HomeScreen />);

    // Assert the presence of the header text
    expect(getByText("Recommended Movies")).toBeTruthy();

    // Assert the "See All" button is present
    const seeAllButton = getByText("See All");
    expect(seeAllButton).toBeTruthy();

    // Simulate a press on the "See All" button
    fireEvent.press(seeAllButton);

    // Verify the navigation was called
    expect(useNavigation().navigate).toHaveBeenCalledWith("Movies");
  });

  it("renders the movie items", async () => {
    const { findByText } = render(<HomeScreen />);

    // Assert the movie titles are rendered
    expect(await findByText("Movie 1")).toBeTruthy();
    expect(await findByText("Movie 2")).toBeTruthy();
  });
});

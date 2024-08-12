import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import MovieDetailsScreen from "./MovieDetailsScreen"; // Adjust the path as needed

describe("MovieDetailsScreen", () => {
  const movieMock = {
    title: "Test Movie",
    image_uri: "https://example.com/movie.jpg",
    type: "Action",
    duration: "2h 30m",
    language: "English",
    releaseDate: "2024-08-10",
    description: "This is a test movie description.",
  };

  const renderComponent = () =>
    render(
      <NavigationContainer>
        <MovieDetailsScreen route={{ params: { movie: movieMock } }} />
      </NavigationContainer>
    );

  test("renders movie title", () => {
    const { getByText } = renderComponent();
    expect(getByText(movieMock.title)).toBeTruthy();
  });

  test("renders movie image", () => {
    const { getByRole } = renderComponent();
    const image = getByRole("image");
    expect(image.props.source.uri).toBe(movieMock.image_uri);
  });

  test("renders movie details", () => {
    const { getByText } = renderComponent();
    expect(getByText(movieMock.type)).toBeTruthy();
    expect(getByText(movieMock.duration)).toBeTruthy();
    expect(getByText(movieMock.language)).toBeTruthy();
    expect(getByText(movieMock.releaseDate)).toBeTruthy();
  });

  test("navigates to TicketBookingScreen on button press", () => {
    const { getByText } = renderComponent();
    const bookButton = getByText("Book tickets");
    fireEvent.press(bookButton);
    // Add navigation assertions if needed
  });
});

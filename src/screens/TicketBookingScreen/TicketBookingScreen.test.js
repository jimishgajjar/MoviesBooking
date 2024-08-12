import React from "react";
import { render, screen } from "@testing-library/react-native";
import TicketBookingScreen from "./TicketBookingScreen";

// Mock the Zustand store and navigation props
const mockSetUser = jest.fn();
const mockUseStore = jest.fn(() => ({
  user: { bookings: [] },
  setUser: mockSetUser,
}));
jest.mock("zustand", () => ({
  useStore: mockUseStore,
}));

// Mock the navigation prop
const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
};

describe("TicketBookingScreen", () => {
  it("should render the TicketBookingScreen component correctly", () => {
    const mockRoute = {
      params: {
        movie: {
          image_uri: "https://example.com/movie.jpg",
          title: "Test Movie",
          type: "Action",
          duration: "120 min",
          language: "English",
          releaseDate: "2024-08-10",
        },
      },
    };

    render(
      <TicketBookingScreen route={mockRoute} navigation={mockNavigation} />
    );

    // Check if the movie information is rendered
    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("Type: Action")).toBeTruthy();
    expect(screen.getByText("Duration: 120 min")).toBeTruthy();
    expect(screen.getByText("Language: English")).toBeTruthy();
    expect(screen.getByText("Release Date: 2024-08-10")).toBeTruthy();

    // Check if the input fields are rendered
    expect(screen.getByPlaceholderText("Number of People")).toBeTruthy();
    expect(screen.getByPlaceholderText("Number of Children")).toBeTruthy();

    // Check if the Confirm Booking button is rendered
    expect(screen.getByText("Confirm Booking")).toBeTruthy();
  });
});

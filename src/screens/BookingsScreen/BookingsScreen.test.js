import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import BookingsScreen from "./index"; // Update this to the correct path
import { useStore } from "zustand";
import { LoginStore } from "../../store";
import { getBookingsByUserId } from "../../services/api";

// Mocking the Zustand store and API call
jest.mock("zustand", () => ({
  useStore: jest.fn(),
}));

jest.mock("../../services/api", () => ({
  getBookingsByUserId: jest.fn(),
}));

describe("BookingsScreen", () => {
  const mockUser = { id: "user1" };

  beforeEach(() => {
    useStore.mockReturnValue({ user: mockUser });
    getBookingsByUserId.mockResolvedValue([]); // Mock empty bookings
  });

  it('renders correctly and shows "No bookings found" when there are no bookings', async () => {
    const { getByText, getByTestId } = render(<BookingsScreen />);

    // Check if loading indicator is not present
    expect(() => getByTestId("loader-container")).toThrow();

    // Check if error message is not present
    expect(() => getByText("Error loading bookings")).toThrow();

    // Check if "No bookings found" text is present
    await waitFor(() => {
      expect(getByText("No bookings found.")).toBeTruthy();
    });
  });
});

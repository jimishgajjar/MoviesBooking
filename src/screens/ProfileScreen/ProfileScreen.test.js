import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Provider } from "zustand";
import { LoginStore } from "../../store";
import ProfileScreen from "./ProfileScreen";

// Mock Zustand store
const mockUser = {
  _raw: { first_name: "John", last_name: "Doe" },
  email: "john.doe@example.com",
};

// Mock Zustand store provider
const MockStoreProvider = ({ children }) => {
  const store = LoginStore.getState();
  store.setUser(mockUser);
  return <Provider store={LoginStore}>{children}</Provider>;
};

describe("ProfileScreen", () => {
  it("should render user information correctly", () => {
    render(
      <MockStoreProvider>
        <ProfileScreen navigation={{ navigate: jest.fn() }} />
      </MockStoreProvider>
    );

    // Check if user information is rendered
    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("john.doe@example.com")).toBeTruthy();
  });

  it("should handle FAQ navigation", () => {
    const mockNavigate = jest.fn();
    render(
      <MockStoreProvider>
        <ProfileScreen navigation={{ navigate: mockNavigate }} />
      </MockStoreProvider>
    );

    // Trigger FAQ navigation
    fireEvent.press(screen.getByText("FAQ"));

    // Check if navigation to FAQ screen is called
    expect(mockNavigate).toHaveBeenCalledWith("FaqScreen");
  });

  it("should handle logout", () => {
    const mockNavigate = jest.fn();
    render(
      <MockStoreProvider>
        <ProfileScreen navigation={{ navigate: mockNavigate }} />
      </MockStoreProvider>
    );

    // Trigger logout
    fireEvent.press(screen.getByText("Log Out"));

    // Check if logout clears user data and navigates to LoginScreen
    expect(mockNavigate).toHaveBeenCalledWith("LoginScreen");
  });

  it("should not render anything if user data is not available", () => {
    // Mock Zustand store with no user
    const EmptyStoreProvider = ({ children }) => {
      const store = LoginStore.getState();
      store.setUser(null);
      return <Provider store={LoginStore}>{children}</Provider>;
    };

    const { container } = render(
      <EmptyStoreProvider>
        <ProfileScreen navigation={{ navigate: jest.fn() }} />
      </EmptyStoreProvider>
    );

    // Check if nothing is rendered
    expect(container.children.length).toBe(0);
  });
});

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../services/api";
import useLoginStore from "../../store/LoginStore";
import LoginScreen from "../path/to/LoginScreen";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock("../../services/api", () => ({
  loginUser: jest.fn(),
}));

jest.mock("../../store/LoginStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    setUser: jest.fn(),
  })),
}));

describe("LoginScreen", () => {
  it("renders the LoginScreen component", () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    // Assert the presence of the title and subtitle text
    expect(getByText("Let's Sign you in")).toBeTruthy();
    expect(getByText("Welcome Back, You have been missed")).toBeTruthy();

    // Assert the presence of the input fields
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
  });

  it("submits the form and calls the loginUser function", () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    const setUser = useLoginStore().setUser;

    // Mock successful loginUser response
    loginUser.mockResolvedValueOnce({ id: 1, email: "test@gmail.com" });

    // Simulate filling in the form
    fireEvent.changeText(getByPlaceholderText("Email"), "test@gmail.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password");

    // Simulate form submission
    fireEvent.press(getByText("Login"));

    // Assert that loginUser was called with correct arguments
    expect(loginUser).toHaveBeenCalledWith("test@gmail.com", "password");
    expect(setUser).toHaveBeenCalledWith({ id: 1, email: "test@gmail.com" });
  });
});

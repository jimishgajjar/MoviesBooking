import React from "react";
import { render, screen } from "@testing-library/react-native";
import RegisterScreen from "./RegisterScreen";

describe("RegisterScreen", () => {
  it("should render the RegisterScreen component correctly", () => {
    render(<RegisterScreen />);

    // Check if the form fields are rendered
    expect(screen.getByPlaceholderText("First Name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Last Name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Email")).toBeTruthy();
    expect(screen.getByPlaceholderText("Mobile Number")).toBeTruthy();
    expect(screen.getByPlaceholderText("Password")).toBeTruthy();

    // Check if the Register button is rendered
    expect(screen.getByText("Register")).toBeTruthy();

    // Check if social login buttons are rendered
    expect(screen.getByLabelText("Google")).toBeTruthy();
    expect(screen.getByLabelText("Facebook")).toBeTruthy();
    expect(screen.getByLabelText("Apple")).toBeTruthy();

    // Check if the link to the login screen is rendered
    expect(screen.getByText("Already have an account? Sign In")).toBeTruthy();
  });
});

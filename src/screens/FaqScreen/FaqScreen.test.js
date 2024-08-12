import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FAQScreen from "./index";

// Mocking the firestore fetch function
jest.mock("@react-native-firebase/firestore", () => () => ({
  collection: () => ({
    get: () => ({
      then: (callback) =>
        callback({
          docs: [
            {
              data: () => ({
                question: "What is React Native?",
                answer:
                  "React Native is a framework for building native apps using React.",
              }),
            },
          ],
        }),
    }),
  }),
}));

describe("FAQScreen", () => {
  it("renders the FAQScreen component", () => {
    const { getByText } = render(<FAQScreen />);

    // Assert the presence of the FAQ title
    expect(getByText("Your most ask questions")).toBeTruthy();

    // Assert the presence of a FAQ question
    expect(getByText("What is React Native?")).toBeTruthy();
  });

  it("toggles FAQ answers on question press", () => {
    const { getByText, queryByText } = render(<FAQScreen />);

    // Assert that the answer is not displayed initially
    expect(
      queryByText(
        "React Native is a framework for building native apps using React."
      )
    ).toBeNull();

    // Press the FAQ question
    fireEvent.press(getByText("What is React Native?"));

    // Assert that the answer is now displayed
    expect(
      getByText(
        "React Native is a framework for building native apps using React."
      )
    ).toBeTruthy();
  });
});

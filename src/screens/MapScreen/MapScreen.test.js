import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MapAnnotation from "../path/to/MapAnnotation";
import MapboxGL from "@rnmapbox/maps";

// Mock the Mapbox GL components
jest.mock("@rnmapbox/maps", () => ({
  MapView: ({ children }) => <>{children}</>,
  PointAnnotation: ({ children }) => <>{children}</>,
  Camera: () => null,
  Callout: ({ children }) => <>{children}</>,
  setAccessToken: jest.fn(),
  setTelemetryEnabled: jest.fn(),
  StyleURL: {
    Satellite: "mapbox://styles/mapbox/satellite-v9",
  },
}));

describe("MapAnnotation", () => {
  it("renders the MapAnnotation component", () => {
    const { getByText } = render(<MapAnnotation />);

    // Check if the map container is present
    expect(getByText("Location 1")).toBeTruthy();
    expect(getByText("Location 2")).toBeTruthy();
    expect(getByText("Location 3")).toBeTruthy();
  });

  it("handles annotation selection", () => {
    const { getByText } = render(<MapAnnotation />);

    // Simulate selecting an annotation
    fireEvent.press(getByText("Location 1"));

    // Verify that the info box displays the selected annotation
    expect(getByText("Description for Location 1")).toBeTruthy();
  });
});

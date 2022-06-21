import React from "react";
import { render, screen } from "@testing-library/react";
import { WithApp } from "test-utils/WithApp";
import { IWithStoreState } from "test-utils/WithStore";
import { Landing } from "../Landing";
import { mockImplementation } from "test-utils/mockImplementation";
import { LandingContainer, LandingPageTitle } from "../Landing.styles";
import { AnimationWidget } from "visual/components/animation-widget";

jest.mock("visual/components/animation-widget", () => ({
  AnimationWidget: jest.fn(),
}));

jest.mock("../Landing.styles", () => ({
  LandingContainer: jest.fn(),
  LandingPageTitle: jest.fn(),
}));

describe("<Landing />", () => {
  beforeEach(() => {
    mockImplementation(LandingContainer, ({ children }) => <>{children}</>);
    mockImplementation(LandingPageTitle, () => <></>);
    mockImplementation(AnimationWidget, () => <>AnimationWidget</>);
  });

  test("Renders landing by with correct components", () => {
    render(<LandingWithContext />);
    expect(LandingContainer).toBeCalled();
    expect(LandingPageTitle).toBeCalled();
    expect(AnimationWidget).toBeCalled();
  });
});

const LandingWithContext = ({ state }: { state?: IWithStoreState }) => {
  return (
    <WithApp state={{}}>
      <Landing />
    </WithApp>
  );
};

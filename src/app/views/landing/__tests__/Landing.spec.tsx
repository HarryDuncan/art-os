import React from "react";
import { render } from "@testing-library/react";
import { WithApp } from "test-utils/WithApp";
import { Landing } from "../Landing";
import { mockImplementation } from "test-utils/mockImplementation";
import { LandingContainer, LandingPageTitle } from "../Landing.styles";
import { AnimationWidget } from "visual/visual-components/animation-widget";
import { useRunAnimations } from "visual/visual-components/animation-widget/useRunAnimations";

jest.mock("visual/components/animation-widget", () => ({
  AnimationWidget: jest.fn(),
}));

jest.mock("visual/components/animation-widget/useRunAnimations", () => ({
  useRunAnimations: jest.fn(),
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
    mockImplementation(useRunAnimations, () => <>Running Animation</>);
  });

  test("Renders landing by with correct components", () => {
    render(<LandingWithContext />);
    expect(LandingContainer).toBeCalled();
    expect(LandingPageTitle).toBeCalled();
    expect(AnimationWidget).toBeCalled();
  });
});

const LandingWithContext = () => {
  return (
    <WithApp>
      <Landing />
    </WithApp>
  );
};

import { render } from "@testing-library/react";
import { WithApp } from "test-utils/WithApp";
import { mockImplementation } from "test-utils/mockImplementation";
import { LandingContainer, LandingPageTitle } from "../Landing.styles";
import { Landing } from "../Landing";
import { expect, test, describe } from "vitest";

jest.mock("../Landing.styles", () => ({
  LandingContainer: jest.fn(),
  LandingPageTitle: jest.fn(),
}));

describe("<Landing />", () => {
  beforeEach(() => {
    mockImplementation(LandingContainer, ({ children }) => (
      <div>{children}</div>
    ));
    mockImplementation(LandingPageTitle, () => <>Title</>);
  });

  test("Renders landing by with correct components", () => {
    render(<LandingWithContext />);
    expect(LandingContainer).toBeCalled();
    expect(LandingPageTitle).toBeCalled();
  });
});

function LandingWithContext() {
  return (
    <WithApp>
      <Landing />
    </WithApp>
  );
}

import { render } from "@testing-library/react";
import { WithApp } from "test-utils/WithApp";
import { mockImplementation } from "test-utils/mockImplementation";
import { LandingContainer, LandingPageTitle } from "../Landing.styles";
import { Landing } from "../Landing";
import { expect, test, describe, vi } from "vitest";

vi.mock("../Landing.styles", () => ({
  default: () => ({
    LandingContainer: vi.fn(),
    LandingPageTitle: vi.fn(),
  }),
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

import React from "react";
import { render, screen } from "@testing-library/react";

import { Overlay } from "../Overlay";

describe("<Overlay>", () => {
  test("Renders with Overlay", () => {
    render(
      <Overlay>
        <span>1234</span>
      </Overlay>
    );
    expect(screen.getByText("1234")).toBeTruthy();
  });
});

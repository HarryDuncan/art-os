import React from "react";
import { render, screen } from "@testing-library/react";
import { WithApp } from "test-utils/WithApp";
import { IWithStoreState } from "test-utils/WithStore";
import { Navigation } from "../Navigation";
import mockAccessControls from "./mockAccessControls.json";

describe("<NavigationBar />", () => {
  test("Renders default links", () => {
    render(<NavigationBarWithContext />);
  });

  test("Renders links with access controls", () => {
    render(<NavigationBarWithContext />);
  });
});

const NavigationBarWithContext = ({ state }: { state?: IWithStoreState }) => {
  return (
    <WithApp state={{}}>
      <Navigation />
    </WithApp>
  );
};

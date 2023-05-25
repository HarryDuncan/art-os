import { render, waitFor } from "@testing-library/react";
import React from "react";
import { WebGLRenderer } from "three";
import { ContainerNode } from "visual/interfaces";
import { useInitializeNode } from "../useInitializeNode";

const myMockFunction = jest.fn();

describe("useInitializeNode", () => {
  test("initialized node and calls initialization function when correct params are passed", () => {
    const mockWebGLRenderer = ({
      domElement: document.createElement("div"), // create a fake div
      setSize: jest.fn(),
      render: jest.fn(),
    } as unknown) as WebGLRenderer;
    render(
      <InitializeNodeWithContext
        refInitialValue={<div />}
        renderer={mockWebGLRenderer}
      />
    );
    waitFor(() => {
      expect(myMockFunction).toHaveBeenCalled();
    });
  });
  test("doesn't initialize when no ref is passed", () => {
    const mockWebGLRenderer = ({
      domElement: document.createElement("div"), // create a fake div
      setSize: jest.fn(),
      render: jest.fn(),
    } as unknown) as WebGLRenderer;
    render(
      <InitializeNodeWithContext
        refInitialValue={null}
        renderer={mockWebGLRenderer}
      />
    );
    waitFor(() => {
      expect(myMockFunction).toBeCalledTimes(0);
    });
  });
});
function Component({
  ref,
  renderer,
}: {
  ref: ContainerNode;
  renderer: WebGLRenderer;
}) {
  useInitializeNode(ref, renderer, myMockFunction);
  return <div />;
}

function InitializeNodeWithContext({
  refInitialValue,
  renderer,
}: {
  refInitialValue: null | JSX.Element;
  renderer: WebGLRenderer;
}) {
  const ref = React.useRef(refInitialValue);
  return <Component ref={ref} renderer={renderer} />;
}

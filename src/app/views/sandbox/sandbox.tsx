import React from "react";
import { InteractiveWebGL } from "visual/visual-components";
import { interactiveWebGL } from "./interactiveWebGL";

export const Sandbox = () => {
  const {
    threeJsParams,
    interactionEvents,
    assets,
    materialFunctions,
    materialParams,
  } = interactiveWebGL;

  return (
    <InteractiveWebGL
      params={{
        threeJsParams,
        interactionEvents,
        assets,
        materialFunctions,
        materialParams,
      }}
    />
  );
};

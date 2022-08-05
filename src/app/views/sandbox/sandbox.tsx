import React from "react";
import { ImageHover } from "visual/visual-components";
import { imageHoverParams } from "./imageHoverParams";

export function Sandbox() {
  const {
    threeJsParams,
    interactionEvents,
    assets,
    materialFunctions,
    materialParams,
  } = imageHoverParams;

  return (
    <ImageHover
      params={{
        threeJsParams,
        interactionEvents,
        assets,
        materialFunctions,
        materialParams,
      }}
    />
  );
}

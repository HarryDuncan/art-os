import React from "react";
import { AttractionMorphing } from "visual/visual-components";
import { attractionMorphingConfig } from "./attractionMorphingConfig";

export function Sandbox() {
  const {
    threeJsParams,
    interactionEvents,
    assets,
    materialParams,
    materialFunctions,
    sceneFunctions,
    visualComponentConfig,
  } = attractionMorphingConfig;

  return (
    <AttractionMorphing
      params={{
        threeJsParams,
        interactionEvents,
        assets,
        materialParams,
        materialFunctions,
        sceneFunctions,
        visualComponentConfig,
      }}
    />
  );
}

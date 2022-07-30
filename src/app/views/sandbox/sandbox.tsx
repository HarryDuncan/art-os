import React from "react";
import { SurfaceScattering } from "visual/visual-components";
import { surfaceScatteringParams } from "./surfaceScatteringParams";

export function Sandbox() {
  const {
    threeJsParams,
    interactionEvents,
    assets,
    materialFunctions,
    materialParams,
  } = surfaceScatteringParams;

  return (
    <SurfaceScattering
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

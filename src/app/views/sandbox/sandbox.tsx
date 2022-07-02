import React from "react";
import { useInteractiveMaterialParams } from "visual/hooks/use-interactive-material/useInteractiveMaterialParams";
import { InteractiveParticles } from "visual/visual-components";
import { picturePoint } from "./interactiveSceneParams";

export const Sandbox = () => {
  const {
    threeJsParams,
    interactionEvents,
    assets,
    materialParamType,
    materialFunctions,
  } = picturePoint;

  const materialParams = useInteractiveMaterialParams(materialParamType);

  return (
    <InteractiveParticles
      params={{
        threeJsParams,
        interactionEvents,
        assets,
        materialParams,
        materialFunctions,
      }}
    />
  );
};

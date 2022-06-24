import React from "react";
import { useInteractiveMaterialParams } from "visual/hooks/use-interactive-material/useInteractiveMaterialParams";
import { InteractiveObject } from "visual/visual-components";
import { picturePoint, vanishingObject } from "./interactiveSceneParams";

export const Sandbox = () => {
  const {
    threeJSParams,
    interactions,
    assets,
    materialParamType,
    materialFunctions,
  } = vanishingObject;

  const materialParams = useInteractiveMaterialParams(materialParamType);

  return (
    <InteractiveObject
      params={{
        threeJsParams: threeJSParams,
        interactionEvents: interactions,
        assets,
        materialParams,
        materialFunctions,
      }}
    />
  );
};

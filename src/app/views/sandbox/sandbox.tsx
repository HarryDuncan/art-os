import React from "react";
import { useInteractiveMaterialParams } from "visual/hooks/use-interactive-material/useInteractiveMaterialParams";
import { ThreeDGallery } from "visual/visual-components";

import { threeDGallery } from "./interactiveSceneParams";

export const Sandbox = () => {
  const {
    threeJsParams,
    interactionEvents,
    assets,
    materialParamType,
    materialFunctions,
  } = threeDGallery;

  const materialParams = useInteractiveMaterialParams(materialParamType);

  return <ThreeDGallery params={{ threeJsParams, interactionEvents }} />;
};

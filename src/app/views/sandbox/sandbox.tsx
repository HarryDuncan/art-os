import React from "react";
import { ImageDistortion, InteractiveWebGL } from "visual/visual-components";
import { imageDistortion } from "../digital-art/scene-parameters/image-distortion/ImageDistortion";
import { interactiveWebGL } from "./interactiveWebGLParams";

export const Sandbox = () => {
  const {
    threeJsParams,
    interactionEvents,
    assets,
    materialFunctions,
    materialParams,
  } = imageDistortion;

  return (
    <ImageDistortion
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

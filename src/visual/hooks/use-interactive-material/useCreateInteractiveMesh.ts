import { useCallback } from "react";
import { Geometry, Mesh } from "three";
import { InteractionEventObject } from "../use-interactions/types";
import InteractiveMaterial from "./InteractiveMaterial";
import { InteractiveShaders, InteractiveUniform } from "./types";

export const useCreateInteractiveMesh = () => {
  return useCallback(
    (
      interactionEventObjects: InteractionEventObject[],
      geometry: Geometry,
      uniforms: InteractiveUniform,
      shaders: InteractiveShaders
    ) => {
      const interactiveMaterial = new InteractiveMaterial(
        uniforms,
        shaders,
        interactionEventObjects
      );

      const interactiveMesh = new Mesh(geometry, interactiveMaterial);
      return interactiveMesh;
    },
    []
  );
};

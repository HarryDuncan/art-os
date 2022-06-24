import { useCallback } from "react";
import { Geometry, Mesh } from "three";
import { InteractionEventObject } from "../use-interactions/types";
import InteractiveMaterial from "../../components/interactive-material/InteractiveMaterial";
import {
  InteractiveMaterialFunctions,
  InteractiveShaders,
  InteractiveUniform,
} from "../../components/interactive-material/types";

export const useCreateInteractiveMesh = () => {
  return useCallback(
    (
      interactionEventObjects: InteractionEventObject[],
      geometry: Geometry,
      uniforms: InteractiveUniform,
      shaders: InteractiveShaders,
      materialFunctions: InteractiveMaterialFunctions
    ) => {
      const interactiveMaterial = new InteractiveMaterial(
        uniforms,
        shaders,
        interactionEventObjects,
        materialFunctions
      );

      const interactiveMesh = new Mesh(geometry, interactiveMaterial);
      return interactiveMesh;
    },
    []
  );
};

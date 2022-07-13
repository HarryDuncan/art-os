import { useMemo } from "react";
import { InteractionEventObject } from "../use-interactions/types";
import {
  InteractiveMaterialFunctions,
  InteractiveShaderTypes,
} from "../../components/interactive-shaders/types";
import { useCreateInteractiveMesh } from "./useCreateInteractiveMesh";

export const useInteractiveMaterial = (
  interactionEvents: InteractionEventObject[],
  materialFunctions: InteractiveMaterialFunctions,
  geometry,
  uniforms,
  shaders,
  shaderType: InteractiveShaderTypes = InteractiveShaderTypes.RAW_SHADER
) => {
  const createInteractiveMesh = useCreateInteractiveMesh(shaderType);

  // Interactive mesh must be created after assets are loaded - in case we use any geometries/textures
  const interactiveMesh = useMemo(() => {
    if (!geometry) return;
    return createInteractiveMesh(
      interactionEvents,
      geometry,
      uniforms,
      shaders,
      materialFunctions
    );
  }, [
    createInteractiveMesh,
    interactionEvents,
    materialFunctions,
    geometry,
    uniforms,
    shaders,
  ]);

  return interactiveMesh;
};

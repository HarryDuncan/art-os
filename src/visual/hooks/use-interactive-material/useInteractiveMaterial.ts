import { useMemo } from "react";
import { InteractionEventObject } from "../use-interactions/types";
import { InteractiveMaterialFunctions } from "../../components/interactive-material/types";
import { useCreateInteractiveMesh } from "./useCreateInteractiveMesh";

export const useInteractiveMaterial = (
  interactionEvents: InteractionEventObject[],
  materialFunctions: InteractiveMaterialFunctions,
  geometry,
  uniforms,
  shaders
) => {
  const createInteractiveMesh = useCreateInteractiveMesh();

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

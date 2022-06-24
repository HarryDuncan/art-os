import { useMemo } from "react";
import * as Formatters from "./formattingFunctions";
import { Asset } from "../use-assets/types";
import { InteractionEventObject } from "../use-interactions/types";
import {
  InteractiveMaterialFunctions,
  InteractiveParam,
  InteractiveScenes,
} from "../../components/interactive-material/types";
import { useCreateInteractiveMesh } from "./useCreateInteractiveMesh";

export const useInteractiveMaterial = (
  materialParams: InteractiveParam,
  interactionEvents: InteractionEventObject[],
  areAssetsInitialized: boolean,
  assets: Asset[],
  materialFunctions: InteractiveMaterialFunctions
) => {
  const createInteractiveMesh = useCreateInteractiveMesh();

  // Interactive mesh must be created after assets are loaded - in case we use any geometries/textures
  const interactiveMesh = useMemo(() => {
    // TODO - error handling if no assets
    if (!areAssetsInitialized) return;
    if (!assets.length) return;
    const { geometry, uniforms, shaders } = formatAssets(
      assets,
      materialParams
    );

    return createInteractiveMesh(
      interactionEvents,
      geometry,
      uniforms,
      shaders,
      materialFunctions
    );
  }, [
    areAssetsInitialized,
    assets,
    createInteractiveMesh,
    interactionEvents,
    materialParams,
    materialFunctions,
  ]);

  return interactiveMesh;
};

const formatForSceneType = (
  assets,
  uniforms,
  sceneType
): { geometry; uniforms } => {
  switch (sceneType) {
    case InteractiveScenes.INTERACTIVE_PARTICLES:
      return Formatters.interactiveParticlesFormatting(assets, uniforms);
    case InteractiveScenes.VANISHING_OBJECT:
      return Formatters.vanishingObjectFormatting(assets, uniforms);
    default:
      return { geometry: {}, uniforms: {} };
  }
};

const formatAssets = (assets: Asset[], materialParams: InteractiveParam) => {
  const { uniforms: unformattedUniforms, shaders, sceneType } = Object.assign(
    materialParams
  );
  const { geometry, uniforms } = formatForSceneType(
    assets,
    unformattedUniforms,
    sceneType
  );
  return { geometry, uniforms, shaders };
};

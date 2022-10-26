import React, { useCallback, useEffect, useMemo } from "react";
import { useSetUpScene } from "visual/hooks/useSetUpScene";
import { RootContainer } from "../../components/root-container";
import { Asset } from "visual/hooks/use-assets/types";
import { InteractiveNode } from "visual/components/interactive-node/InteractiveNode";
import { useInteractiveScene } from "visual/hooks/use-interactive-scene/useInteractiveScene";
import { SceneData } from "visual/components/interactive-scene/types";
import { useMeshes } from "visual/hooks/useMeshes";
import PostProcessor from "visual/components/post-processor/PostProcessor";

export const InteractiveScene = ({ params }: any) => {
  const {
    threeJsParams,
    interactionEvents,
    assets,
    materialFunctions,
    materialParams,
    sceneFunctions,
    visualComponentConfig,
    formattingFunction,
  } = params;
  const {
    areAssetsInitialized,
    initializedAssets,
    update,
    postProcessor,
    renderer,
    camera,
    container,
  } = useSetUpScene(threeJsParams, assets);

  const { sceneData } = useSceneData(
    initializedAssets,
    areAssetsInitialized,
    materialParams,
    formattingFunction
  );

  const initializedMeshes = useMeshes(sceneData?.geometries);

  const scene = useInteractiveScene(
    interactionEvents,
    sceneFunctions,
    {},
    sceneData?.sceneObjects ?? [],
    sceneData?.isSceneDataInitialized ?? false
  );

  const initializeMeshes = useCallback(() => {
    if (initializedMeshes && initializedMeshes.length && scene) {
      initializedMeshes.forEach((mesh) => scene.add(mesh));
      postProcessor.current = new PostProcessor({
        renderer,
        scene,
        camera,
        passes: [],
      });
      update();
    }
  }, [scene, initializedMeshes, update, postProcessor, renderer, camera]);

  useEffect(() => {
    initializeMeshes();
  }, [initializeMeshes]);

  return (
    <>
      <InteractiveNode interactions={interactionEvents} />
      <RootContainer containerRef={container} config={visualComponentConfig} />
    </>
  );
};

const useSceneData = (
  initializedAssets: Asset[],
  areAssetsInitialized: boolean,
  materialParams,
  formatAssets
): { sceneData: SceneData | null; uniforms; shaders } => {
  return useMemo(() => {
    if (!areAssetsInitialized || !materialParams)
      return { sceneData: null, uniforms: null, shaders: null };

    const { sceneData, uniforms, shaders } = formatAssets(
      initializedAssets,
      materialParams
    );
    return { sceneData, uniforms, shaders };
  }, [areAssetsInitialized]);
};

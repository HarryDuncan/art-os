import React, { useCallback, useEffect, useMemo } from "react";
import { useSetUpScene } from "visual/hooks/useSetUpScene";
import { RootContainer } from "../../components/root-container";
import { Asset } from "visual/hooks/use-assets/types";
import { InteractiveNode } from "visual/components/interactive-node/InteractiveNode";
import { useInteractiveScene } from "visual/hooks/use-interactive-scene/useInteractiveScene";
import { SceneData } from "visual/components/interactive-scene/types";
import { useMeshes } from "visual/hooks/useMeshes";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { EMPTY_SCENE_DATA } from "consts";

export const InteractiveScene = ({ params }: any) => {
  const {
    threeJsParams,
    interactionEvents,
    assets,
    materialFunctions,
    materialParams,
    sceneFunctions,
    visualComponentConfig,
    formatSceneData,
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

  const sceneData = useSceneData(
    initializedAssets,
    areAssetsInitialized,
    materialParams,
    formatSceneData
  );

  const initializedMeshes = useMeshes(sceneData?.geometries, interactionEvents);

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
    <RootContainer containerRef={container} config={visualComponentConfig} />
  );
};

const useSceneData = (
  initializedAssets: Asset[],
  areAssetsInitialized: boolean,
  materialParams,
  formatSceneData: (assets: Asset[], materialParams) => SceneData
): SceneData => {
  return useMemo(() => {
    if (!areAssetsInitialized) return EMPTY_SCENE_DATA;
    const sceneData = formatSceneData(initializedAssets, materialParams);
    return sceneData;
  }, [areAssetsInitialized]);
};

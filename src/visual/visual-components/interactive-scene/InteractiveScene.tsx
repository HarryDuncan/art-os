import React, { useCallback, useEffect, useMemo } from "react";
import { useSetUpScene } from "visual/hooks/useSetUpScene";
import { RootContainer } from "../../components/root-container";
import { Asset } from "visual/hooks/use-assets/types";
import { useInteractiveScene } from "visual/hooks/use-interactive-scene/useInteractiveScene";
import { SceneData } from "visual/components/interactive-scene/types";
import { useMeshes } from "visual/hooks/use-meshes/useMeshes";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { EMPTY_SCENE_DATA } from "consts";
import { useEventsWithMesh } from "visual/hooks/use-events/useEvents";
import { defaultFormatSceneData } from "scenes/default-configs/defaultFormatSceneData";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";
import { InteractionEventObject } from "visual/helpers/interactions/types";

interface InteractiveSceneProps {
  threeJsParams: ThreeJsParams;
  interactions: InteractionEventObject[];
  assets: Asset[];
  materialParams;
  sceneFunctions;
  visualComponentConfig;
  formatSceneData: (assets: Asset[], materialParams) => SceneData;
  events;
}

export const InteractiveScene = ({
  threeJsParams,
  interactions,
  assets,
  materialParams,
  sceneFunctions,
  visualComponentConfig,
  formatSceneData = defaultFormatSceneData,
  events,
}: InteractiveSceneProps) => {
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

  const initializedMeshes = useMeshes(sceneData?.geometries, interactions);

  const scene = useInteractiveScene(
    interactions,
    sceneFunctions,
    {},
    sceneData?.sceneObjects ?? [],
    sceneData?.isSceneDataInitialized ?? false
  );
  useAddEvent(initializedMeshes, events);
  const initializeMeshes = useCallback(() => {
    if (initializedMeshes && initializedMeshes.length && scene) {
      initializedMeshes.forEach((mesh) => scene.add(mesh));
      console.log(scene);
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

const useAddEvent = (initializedMeshes, events) => {
  useEventsWithMesh(initializedMeshes[0], events);
};

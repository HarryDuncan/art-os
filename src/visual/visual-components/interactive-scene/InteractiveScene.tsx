import React, { useCallback, useEffect, useMemo } from "react";
import { useSetUpScene } from "visual/hooks/scene-data/useSetUpScene";
import { RootContainer } from "../../components/container/root-container";
import { Asset } from "visual/hooks/use-assets/types";
import { useInteractiveScene } from "visual/hooks/use-interactive-scene/useInteractiveScene";
import { SceneData } from "visual/components/interactive/scene/types";
import { useMeshes } from "visual/hooks/scene-data/useMeshes";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { EMPTY_SCENE_DATA } from "consts";
import { defaultFormatSceneData } from "scenes/default-configs/defaultFormatSceneData";
import { ThreeJsParams } from "visual/hooks/use-three-js/types";
import { InteractionEventObject } from "visual/helpers/interactions/types";
import { useSceneComponents } from "visual/hooks/scene-data/useSceneComponents";
import { useLights } from "visual/hooks/scene-data/useLights";
import { setSceneProperties } from "visual/helpers/scene/setSceneProperties";
import { useEvents } from "visual/hooks/use-events/useEvents";
import { useThreadWithPostProcessor } from "visual/hooks/use-thread";

interface InteractiveSceneProps {
  threeJsParams: ThreeJsParams;
  interactions: InteractionEventObject[];
  assets: Asset[];
  materialParams;
  sceneFunctions;
  visualComponentConfig;
  formatSceneData: (assets: Asset[], materialParams) => SceneData;
  events;
  animations?;
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
  animations = [],
}: InteractiveSceneProps) => {
  const {
    areAssetsInitialized,
    initializedAssets,
    currentFrameRef,
    clock,
    postProcessor,
    renderer,
    camera,
    orbitControls,
    container,
  } = useSetUpScene(threeJsParams, assets);

  const sceneData = useSceneData(
    initializedAssets,
    areAssetsInitialized,
    materialParams,
    formatSceneData
  );

  const initializedMeshes = useMeshes(sceneData?.meshConfigs, interactions);
  const sceneComponents = useSceneComponents(sceneData.sceneComponents);
  const lights = useLights(sceneData.lights);
  const scene = useInteractiveScene(
    interactions,
    sceneFunctions,
    {},
    sceneData?.sceneObjects ?? [],
    sceneData?.isSceneDataInitialized ?? false
  );
  useEvents(scene, events);
  const { update, pause } = useThreadWithPostProcessor(
    postProcessor,
    currentFrameRef,
    clock,
    scene
  );

  useEffect(() => () => pause(), [pause]);

  const initializeSceneWithData = useCallback(() => {
    if (scene) {
      initializedMeshes.forEach((mesh) => scene.add(mesh));
      lights.forEach((light) => scene.add(light));
      setSceneProperties(sceneData.sceneProperties, scene);
      sceneComponents.forEach((component) => scene.add(component));
      scene.addAnimations(animations);
      postProcessor.current = new PostProcessor({
        renderer,
        scene,
        camera,
        passes: [],
      });
      scene.addOrbitControls(orbitControls);
      update();
    }
  }, [scene, initializedMeshes, update, postProcessor, renderer, camera]);

  useEffect(() => {
    initializeSceneWithData();
  }, [initializeSceneWithData]);

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

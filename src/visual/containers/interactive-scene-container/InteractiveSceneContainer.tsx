import React, { useCallback, useEffect, useMemo } from "react";
import { useSetUpScene } from "visual/hooks/scene-data/useSetUpScene";
import { RootContainer } from "../root/root-container";
import { useInteractiveScene } from "visual/hooks/use-interactive-scene/useInteractiveScene";
import { useMeshes } from "visual/scene-elements/useMeshes";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { useLights } from "visual/scene-elements/lights/useLights";
import { setSceneProperties } from "visual/helpers/scene/setSceneProperties";
import { useEvents } from "visual/hooks/use-events/useEvents";
import { InteractiveSceneProps } from "./interactiveSceneContainer.types";
import { useThreadWithPostProcessor } from "visual/hooks/use-thread";

export const InteractiveSceneContainer = ({
  threeJsParams,
  interactions,
  sceneFunctions,
  animations = [],
  events,
  sceneData,
}: InteractiveSceneProps) => {
  const {
    currentFrameRef,
    clock,
    postProcessor,
    renderer,
    camera,
    container,
    orbitControls,
  } = useSetUpScene(threeJsParams);

  const initializedMeshes = useMeshes(sceneData?.meshConfigs, interactions);
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
    scene,
    camera
  );

  useEffect(() => () => pause(), [pause]);

  const initializeSceneWithData = useCallback(() => {
    if (scene) {
      initializedMeshes.forEach((mesh) => scene.add(mesh));
      lights.forEach((light) => scene.add(light));
      setSceneProperties(sceneData.sceneProperties, scene);
      sceneData?.sceneComponents?.forEach((component) => scene.add(component));
      scene.addAnimations(animations);
      scene.addOrbitControls(orbitControls);
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
    initializeSceneWithData();
  }, [initializeSceneWithData]);

  return <RootContainer containerRef={container} />;
};

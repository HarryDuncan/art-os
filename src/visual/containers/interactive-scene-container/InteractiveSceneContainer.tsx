import React, { useCallback, useEffect } from "react";
import { useSetUpScene } from "visual/hooks/scene-data/useSetUpScene";
import { RootContainer } from "../root/root-container";
import { useInteractiveScene } from "visual/components/interactive/scene/useInteractiveScene";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { useLights } from "visual/scene-elements/lights/useLights";
import { setSceneProperties } from "visual/helpers/scene/setSceneProperties";
import { useEvents } from "visual/hooks/use-events/useEvents";
import { InteractiveSceneProps } from "./interactiveSceneContainer.types";
import { useThreadWithPostProcessor } from "visual/hooks/use-thread";
import { useRunAlgorithm } from "interaction-node/interaction-node-requests/useRunAlgorithm";

export const InteractiveSceneContainer = ({
  threeJsParams,
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

  const lights = useLights(sceneData.lights);
  const scene = useInteractiveScene(sceneFunctions);
  useEvents(scene, events);

  const { update, pause } = useThreadWithPostProcessor(
    postProcessor,
    currentFrameRef,
    clock,
    scene,
    camera
  );

  const run = useRunAlgorithm();

  useEffect(() => {
    run();
  }, [run]);
  useEffect(() => () => pause(), [pause]);

  const initializeSceneWithData = useCallback(() => {
    if (scene) {
      sceneData.meshes?.forEach((mesh) => scene.add(mesh));
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
  }, [scene, update, postProcessor, renderer, camera]);

  useEffect(() => {
    initializeSceneWithData();
  }, [initializeSceneWithData]);

  return <RootContainer containerRef={container} />;
};

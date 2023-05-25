import React, { useCallback, useEffect } from "react";
import { RootContainer } from "../root/root-container";
import { useRunAlgorithm } from "interaction-node/interaction-node-requests/useRunAlgorithm";
import { useInteractiveScene } from "visual/display/components/interactive-scene/useInteractiveScene";
import PostProcessor from "visual/display/components/post-processor/PostProcessor";
import { setSceneProperties } from "visual/display/helpers/scene/setSceneProperties";
import { useEvents } from "visual/display/hooks/use-events/useEvents";
import { useThreadWithPostProcessor } from "visual/display/hooks/use-thread";
import { useLights } from "visual/display/scene-elements/lights/useLights";
import { InteractiveSceneProps } from "./interactiveSceneContainer.types";
import { useSetUpScene } from "visual/display/hooks/scene-data/useSetUpScene";

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

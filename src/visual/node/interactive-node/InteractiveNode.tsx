import React, { useCallback, useEffect } from "react";
import { RootContainer } from "../root/root-container";
import { useInteractiveScene } from "visual/display/components/interactive-scene/useInteractiveScene";
import PostProcessor from "visual/display/components/post-processor/PostProcessor";
import { setSceneProperties } from "visual/display/helpers/scene/setSceneProperties";
import { useEvents } from "visual/display/hooks/use-events/useEvents";
import { useThreadWithPostProcessor } from "visual/display/hooks/use-thread";
import { useLights } from "visual/display/scene-elements/lights/useLights";
import { useSetUpScene } from "visual/display/hooks/scene-data/useSetUpScene";
import { InteractiveNodeProps } from "./interactiveNode.types";

export const InteractiveNode = ({
  sceneFunctions,
  animations = [],
  events,
  sceneData: { threeJs, lights, meshes, sceneComponents, sceneProperties },
}: InteractiveNodeProps) => {
  const {
    currentFrameRef,
    clock,
    postProcessor,
    renderer,
    camera,
    container,
    orbitControls,
  } = useSetUpScene(threeJs);

  const initializedLights = useLights(lights);
  const scene = useInteractiveScene([], sceneFunctions);
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
      meshes?.forEach((mesh) => scene.add(mesh));
      initializedLights.forEach((light) => scene.add(light));
      setSceneProperties(sceneProperties, scene);
      sceneComponents?.forEach((component) => scene.add(component));
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
  }, [
    scene,
    update,
    postProcessor,
    renderer,
    camera,
    animations,
    initializedLights,
    meshes,
    orbitControls,
    sceneComponents,
    sceneProperties,
  ]);

  useEffect(() => {
    initializeSceneWithData();
  }, [initializeSceneWithData]);

  return (
    <RootContainer containerRef={container} sceneProperties={sceneProperties} />
  );
};

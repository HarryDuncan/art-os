import React, { useCallback, useEffect } from "react";
import { RootContainer } from "../root/root-container";
import { useInteractiveScene } from "visual/display/components/interactive-scene/useInteractiveScene";
import { useThreadWithPostProcessor } from "visual/display/hooks/use-thread";
import { useSetUpScene } from "visual/display/hooks/scene-data/useSetUpScene";
import { SceneNodeProps } from "./SceneNode.types";

const SceneNode = ({
  sceneFunctions,
  animations = [],
  events,
  sceneData: { threeJs, lights, meshes, sceneComponents, sceneProperties },
}: SceneNodeProps) => {
  const { currentFrameRef, clock, renderer, camera, container, orbitControls } =
    useSetUpScene(threeJs);

  const scene = useInteractiveScene(
    sceneFunctions,
    events,
    animations,
    meshes,
    lights,
    sceneComponents,
    orbitControls,
    sceneProperties
  );

  const { update, pause, postProcessor } = useThreadWithPostProcessor(
    currentFrameRef,
    clock,
    scene,
    camera,
    renderer
  );

  const initializeSceneWithData = useCallback(() => {
    if (postProcessor.current) {
      update();
    }
  }, [update, postProcessor]);

  useEffect(() => {
    initializeSceneWithData();
    return () => {
      pause();
    };
  }, [initializeSceneWithData, pause]);

  return (
    <RootContainer containerRef={container} sceneProperties={sceneProperties} />
  );
};

export default SceneNode;

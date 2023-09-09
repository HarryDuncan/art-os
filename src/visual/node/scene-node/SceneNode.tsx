import React from "react";
import { RootContainer } from "../root/root-container";
import { useInteractiveScene } from "visual/display/components/interactive-scene/useInteractiveScene";
import { useThreadWithPostProcessor } from "visual/display/hooks/use-thread";
import { SceneNodeProps } from "./SceneNode.types";
import { useThreeJs } from "visual/display/hooks/use-three-js/useThreeJs";

const SceneNode = ({
  sceneFunctions,
  animations = [],
  events,
  sceneData: { threeJs, lights, meshes, sceneComponents, sceneProperties },
}: SceneNodeProps) => {
  const {
    container,
    renderer,
    camera,
    currentFrameRef,
    orbitControls,
  } = useThreeJs(threeJs);

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

  useThreadWithPostProcessor(currentFrameRef, scene, camera, renderer, []);

  return (
    <RootContainer containerRef={container} sceneProperties={sceneProperties} />
  );
};

export default SceneNode;

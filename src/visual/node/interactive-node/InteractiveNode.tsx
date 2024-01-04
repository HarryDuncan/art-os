import { RootContainer } from "../root/root-container";
import { useInteractiveScene } from "visual/display/components/interactive-scene/useInteractiveScene";
import { useThreadWithPostProcessor } from "visual/display/hooks/use-thread";
import { useThreeJs } from "visual/display/hooks/use-three-js/useThreeJs";
import { NodeProps } from "../node.types";
import { useEffect } from "react";
import { useRunAlgorithm } from "interaction/external/interaction-node-requests/useRunAlgorithm";

const InteractiveNode = ({
  sceneFunctions,
  animations = [],
  interactionEvents = [],
  events,
  sceneData: { threeJs, lights, meshes, sceneComponents, sceneProperties },
}: NodeProps) => {
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
    sceneProperties,
    interactionEvents
  );

  useThreadWithPostProcessor(currentFrameRef, scene, camera, renderer, []);
  const runAlgorithm = useRunAlgorithm();
  useEffect(() => {
    runAlgorithm();
  }, []);
  return (
    <RootContainer containerRef={container} sceneProperties={sceneProperties} />
  );
};

export default InteractiveNode;

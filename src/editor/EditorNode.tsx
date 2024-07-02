import { useInteractiveScene } from "visual/display/components/interactive-scene/useInteractiveScene";
import { useThreadWithPostProcessor } from "visual/display/hooks/use-thread";
import { useThreeJs } from "visual/display/hooks/use-three-js/useThreeJs";
import { useEffect } from "react";
import { useRunAlgorithm } from "interaction/external/interaction-node-requests/useRunAlgorithm";
import { NodeProps } from "visual/node/node.types";
import { RootContainer } from "visual/node/root/root-container";
import { EditorProvider } from "./context/editor.context";
import { useSceneEditor } from "./useSceneEditor";

const EditorNode = (props) => {
  return (
    <EditorProvider>
      <EditorNodeContent {...props} />
    </EditorProvider>
  );
};
const EditorNodeContent = ({
  isInteractive,
  sceneFunctions,
  animations = [],
  interactionEvents = [],
  events,
  sceneData: { threeJs, lights, meshes, sceneComponents, sceneProperties },
}: NodeProps & { isInteractive: boolean }) => {
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
  useSceneEditor(scene);
  if (isInteractive) {
    return (
      <Interactive containerRef={container} sceneProperties={sceneProperties} />
    );
  } else {
    return (
      <RootContainer
        containerRef={container}
        sceneProperties={sceneProperties}
      />
    );
  }
};

const Interactive = ({ containerRef, sceneProperties }) => {
  const runAlgorithm = useRunAlgorithm();
  useEffect(() => {
    runAlgorithm();
  }, []);

  return (
    <RootContainer
      containerRef={containerRef}
      sceneProperties={sceneProperties}
    />
  );
};

export default EditorNode;

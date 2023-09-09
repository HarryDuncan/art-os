import React, { useMemo, useRef } from "react";
import { SandboxContainer } from "./sandbox.styles";
import { useSceneParameters } from "scenes/useSceneParameters";
import { WindowStateProvider } from "visual/compat/window-state/windowStateProvider";
import { SceneNodeProps } from "visual/node/scene-node/SceneNode.types";
import { useInteractiveScene } from "visual/display/components/interactive-scene/useInteractiveScene";
import { useWebGLRenderer } from "visual/display/hooks/use-three-js/renderer";
import { RootContainer } from "visual/node/root/root-container";
import { useSetUpCamera } from "visual/set-up/config/three-js/use-camera/useCamera";
import {
  MaskPass,
  ClearMaskPass,
} from "three/examples/jsm//postprocessing/MaskPass.js";
import { Scene } from "three";
import { useThreadWithPostProcessor } from "visual/display/hooks/use-thread";
import { useScene } from "visual/display/hooks/use-three-js/use-scene/useScene";
import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";
import { DEFAULT_SCENE_PROPERTIES } from "visual/set-up/config/config.constants";

export const Sandbox = () => (
  <WindowStateProvider>
    <SandboxContent />
  </WindowStateProvider>
);

const SandboxContent = () => {
  const props1 = useSceneParameters("hjdScene");
  const props2 = useSceneParameters("home");

  return (
    <SandboxContainer>
      {props1 !== null && props2 !== null && (
        <SceneData props1={props1} props2={props2} />
      )}
    </SandboxContainer>
  );
};
const DEFAULT_SCENE_FUNCTIONS = {
  onTimeUpdate: (scene: InteractiveScene) => {
    console.log("test");
  },
};
const EMPTY_EVENT_CONFIG = [];
const EMPTY_ANIMATION_CONFIG = [];
const EMPTY_SCENE_FUNCTIONS = {};
const ORBIT = null;
const SceneData = ({
  props1,
  props2,
}: {
  props1: SceneNodeProps;
  props2: SceneNodeProps;
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const currentFrameRef: React.MutableRefObject<number> = useRef(0);
  const scene1 = useScenes(props1);
  const scene2 = useScenes(props2);
  const renderer = useWebGLRenderer();
  const setUpcamera = useSetUpCamera();
  const camera = useMemo(() => setUpcamera(), [setUpcamera]);
  renderer.setClearColor(0x000000);
  renderer.autoClear = false;

  const passes = useMemo(() => {
    const maskPass1 = new MaskPass(scene1 as Scene, camera);
    const maskPass2 = new MaskPass(scene2 as Scene, camera);
    return [maskPass1, maskPass2];
  }, []);
  const scene = useInteractiveScene(
    DEFAULT_SCENE_FUNCTIONS,
    EMPTY_EVENT_CONFIG,
    EMPTY_EVENT_CONFIG,
    EMPTY_EVENT_CONFIG,
    EMPTY_EVENT_CONFIG,
    EMPTY_ANIMATION_CONFIG,
    ORBIT,
    DEFAULT_SCENE_PROPERTIES
  );
  useThreadWithPostProcessor(currentFrameRef, scene, camera, renderer, passes);
  return (
    <RootContainer
      containerRef={container}
      sceneProperties={{
        ...DEFAULT_SCENE_PROPERTIES,
      }}
    />
  );
};

const useScenes = (props: SceneNodeProps) => {
  const {
    animations = [],
    events,
    sceneData: { lights, meshes, sceneComponents, sceneProperties },
  } = props;
  return useInteractiveScene(
    EMPTY_SCENE_FUNCTIONS,
    events,
    animations,
    meshes,
    lights,
    sceneComponents,
    ORBIT,
    sceneProperties
  );
};

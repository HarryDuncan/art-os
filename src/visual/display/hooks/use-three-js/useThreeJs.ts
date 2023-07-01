import { useRef } from "react";
import { Clock } from "three";
import { useInitializeNode } from "../use-initialize-node/useInitializeNode";
import { useWebGLRenderer } from "./renderer";
import { useCssRenderer } from "./renderer/use-css-renderer";
import { ThreeJsParams } from "./types";
import { useOrbitControls } from "./use-orbit-controls/useOrbitControls";
import { useScene } from "./use-scene/useScene";
import PostProcessor from "visual/display/components/post-processor/PostProcessor";

export const useThreeJs = (threeJsParams: ThreeJsParams) => {
  const { camera } = threeJsParams;

  const container = useRef(null);
  const scene = useScene();
  const currentFrameRef: React.MutableRefObject<number> = useRef(0);
  const postProcessor: React.MutableRefObject<null | PostProcessor> = useRef(
    null
  );

  const clock: Clock = new Clock();
  const renderer = useWebGLRenderer(threeJsParams.renderer);
  const cssRenderer = useCssRenderer(threeJsParams.renderer);
  useInitializeNode(container, cssRenderer || renderer);
  const orbitControls = useOrbitControls(
    camera,
    renderer,
    threeJsParams?.controls?.hasOrbitControls
  );

  return {
    container,
    renderer,
    scene,
    camera,
    currentFrameRef,
    postProcessor,
    clock,
    threeJsInitialized: true,
    cssRenderer,
    orbitControls,
  };
};

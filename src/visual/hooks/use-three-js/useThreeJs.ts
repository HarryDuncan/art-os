import { useRef } from "react";
import { Clock } from "three";
import PostProcessing from "visual/components/post-processing/PostProcessing";
import { useInitializeNode } from "../use-initialize-node/useInitializeNode";
import { useRenderer } from "./renderer";
import { ThreeJsParams } from "./types";
import { useCamera } from "./use-camera/useCamera";
import { useScene } from "./use-scene/useScene";

export const useThreeJs = (threeJsParams: ThreeJsParams = {}) => {
  const container = useRef(null);
  const renderer = useRenderer();
  const scene = useScene();
  const camera = useCamera(threeJsParams.camera);

  const currentFrameRef: React.MutableRefObject<number> = useRef(0);
  const postProcessor: React.MutableRefObject<null | PostProcessing> = useRef(
    null
  );
  const clock: Clock = new Clock();
  useInitializeNode(container, renderer);
  return {
    container,
    renderer,
    scene,
    camera,
    currentFrameRef,
    postProcessor,
    clock,
    threeJsInitialized: true,
  };
};

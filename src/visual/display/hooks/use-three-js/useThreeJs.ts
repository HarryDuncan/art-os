import { useRef } from "react";
import { useInitializeNode } from "../use-initialize-node/useInitializeNode";
import { useWebGLRenderer } from "./renderer";
import { useCssRenderer } from "./renderer/use-css-renderer";
import { ThreeJsParams } from "./types";
import { useOrbitControls } from "./use-orbit-controls/useOrbitControls";

export const useThreeJs = (threeJsParams: ThreeJsParams) => {
  const { camera } = threeJsParams;
  const container = useRef<HTMLDivElement | null>(null);
  const currentFrameRef: React.MutableRefObject<number> = useRef(0);
  const renderer = useWebGLRenderer(threeJsParams.renderer);
  const cssRenderer = useCssRenderer(threeJsParams.renderer);
  useInitializeNode(container, cssRenderer || renderer);
  const orbitControls = useOrbitControls(
    camera,
    renderer,
    threeJsParams?.controls
  );

  return {
    container,
    renderer,
    camera,
    currentFrameRef,
    threeJsInitialized: true,
    cssRenderer,
    orbitControls,
  };
};

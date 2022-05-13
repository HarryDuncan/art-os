import { useEffect } from "react";
import { WebGLRenderer } from "three";
import { ContainerNode } from "visual/interfaces";

export const useInitializeNode = (
  containerRef: ContainerNode,
  renderer: WebGLRenderer,
  initializeFunction: () => void
) =>
  useEffect(() => {
    if (containerRef?.current) {
      //@ts-ignore
      containerRef?.current?.appendChild(renderer.domElement);
      initializeFunction();
    }
  }, [containerRef, renderer, initializeFunction]);

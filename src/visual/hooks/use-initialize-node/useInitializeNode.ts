import { useEffect } from "react";
import { WebGLRenderer } from "three";
import { ContainerNode } from "visual/interfaces";

export const useInitializeNode = (
  containerRef: ContainerNode,
  renderer: WebGLRenderer,
  initializeFunction: () => void
) =>
  useEffect(() => {
    //@ts-ignore
    if (containerRef?.current && !containerRef.current.hasChildNodes()) {
      //@ts-ignore
      containerRef?.current?.appendChild(renderer.domElement);
      initializeFunction();
    }
  }, [containerRef, renderer, initializeFunction]);

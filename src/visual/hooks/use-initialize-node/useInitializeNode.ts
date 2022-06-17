import { useEffect } from "react";
import { WebGLRenderer } from "three";
import { ContainerNode } from "visual/interfaces";

export const useInitializeNode = (
  containerRef: ContainerNode,
  renderer: WebGLRenderer,
  initializeNode: () => void
) =>
  useEffect(() => {
    //@ts-ignore
    if (containerRef?.current && !containerRef.current.hasChildNodes()) {
      //@ts-ignore
      containerRef?.current?.appendChild(renderer.domElement);
      initializeNode();
    }
  }, [containerRef, renderer, initializeNode]);

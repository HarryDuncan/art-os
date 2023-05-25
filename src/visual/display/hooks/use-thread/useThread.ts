import { useCallback, useEffect } from "react";
import { WebGLRenderer } from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { sceneUpdateEvent } from "visual/display/engine/engineEvents";

export const useThread = (
  renderer: WebGLRenderer | CSS3DRenderer | undefined,
  currentFrameRef: React.MutableRefObject<number>,
  scene,
  camera
) => {
  const update = useCallback(() => {
    if (!renderer) {
      console.warn("renderer not defined");
      return;
    }
    sceneUpdateEvent();
    if (scene.orbitControls) {
      scene.orbitControls.update();
    }
    renderer.render(scene, camera);
    currentFrameRef.current = requestAnimationFrame(update);
  }, [currentFrameRef, renderer, scene, camera]);

  const pause = useCallback(() => {
    cancelAnimationFrame(currentFrameRef.current);
  }, [currentFrameRef]);

  useEffect(
    () => () => {
      pause();
    },
    [pause]
  );
  return { update, pause };
};

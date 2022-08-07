import { useMemo } from "react";
import { InteractiveScene } from "visual/components/interactive-scene/InteractiveScene";

export const useInteractiveScene = (
  interactionEvents,
  sceneFunctions,
  sceneParams
) =>
  useMemo(() => {
    const scene = new InteractiveScene(
      interactionEvents,
      sceneFunctions,
      sceneParams
    );

    return scene;
  }, [interactionEvents, sceneFunctions, sceneParams]);

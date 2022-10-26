import { useMemo } from "react";
import { InteractiveThreeScene as InteractiveScene } from "visual/components/interactive-scene/InteractiveScene";

export const useInteractiveSceneOld = (
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

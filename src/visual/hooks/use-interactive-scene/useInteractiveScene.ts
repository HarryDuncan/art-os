import { materialParams } from "app/views/digital-art/scene-parameters/interactive-particles/materialParams";
import { useMemo } from "react";
import { InteractiveScene } from "visual/components/interactive-scene/InteractiveScene";

export const useInteractiveScene = (
  group,
  interactionEvents,
  materialFunctions,
  materialParams
) =>
  useMemo(() => {
    if (!group) return;
    const scene = new InteractiveScene(
      interactionEvents,
      materialFunctions,
      materialParams
    );
    scene.add(group);
    return scene;
  }, [group, interactionEvents, materialFunctions, materialParams]);

import { useEffect } from "react";
import { EventConfig } from "./events.types";
import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";

export const useEvents = (
  scene: InteractiveScene,
  eventConfig: EventConfig[] = []
) => {
  useEffect(() => {
    const sceneEventConfigs = eventConfig.flatMap((eventConfigItem) =>
      eventConfigItem.sceneIdentifer ? eventConfigItem : []
    );
    if (scene?.addEvents) {
      scene.addEvents(sceneEventConfigs);
    }
  }, [scene, eventConfig]);
};

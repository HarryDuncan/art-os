import { useEffect } from "react";
import { EventConfig } from "./events.types";
import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";

export const useEvents = (
  scene: InteractiveScene,
  eventConfig: EventConfig[] = []
) => {
  useEffect(() => {
    if (scene?.addEvents && scene.eventsSet === false) {
      console.log(scene);
      console.log(scene.eventsSet);
      scene.addEvents(eventConfig);
    }
  }, [scene, scene.eventsSet, eventConfig]);
};

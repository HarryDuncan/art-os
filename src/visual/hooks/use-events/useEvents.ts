import { useEffect } from "react";
import { EventConfig } from "./events.types";

export const useEvents = (scene, eventConfig: EventConfig[]) => {
  useEffect(() => {
    const sceneEventConfigs = eventConfig.flatMap((eventConfigItem) =>
      eventConfigItem.sceneIdentifer ? eventConfigItem : []
    );
    if (scene?.addEvents) {
      scene.addEvents(sceneEventConfigs);
    }
  }, [scene, eventConfig]);
};

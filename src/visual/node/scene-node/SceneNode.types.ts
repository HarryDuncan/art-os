import { CustomAnimationConfig } from "visual/display/animation/animation.types";
import { InteractiveSceneFunctions } from "visual/display/components/interactive-scene/InteractiveScene";
import { SceneData } from "visual/display/components/interactive-scene/types";
import { EventConfig } from "visual/display/hooks/use-events/events.types";

export interface SceneNodeProps {
  sceneFunctions: InteractiveSceneFunctions;
  events: EventConfig[];
  animations?: CustomAnimationConfig[];
  sceneData: SceneData;
}

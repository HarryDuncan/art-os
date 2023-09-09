import { EventConfig } from "interaction/interactions.types";
import { AnimationConfig } from "visual/display/animation/animation.types";
import { InteractiveSceneFunctions } from "visual/display/components/interactive-scene/InteractiveScene";
import { SceneData } from "visual/set-up/config/config.types";

export interface SceneNodeProps {
  sceneFunctions: InteractiveSceneFunctions;
  events: EventConfig[];
  animations?: AnimationConfig[];
  sceneData: SceneData;
}

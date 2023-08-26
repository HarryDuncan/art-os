import { EventConfig } from "interaction/interactions.types";
import { CustomAnimationConfig } from "visual/display/animation/animation.types";
import { InteractiveSceneFunctions } from "visual/display/components/interactive-scene/InteractiveScene";
import { SceneData } from "visual/display/components/interactive-scene/types";

export interface InteractiveNodeProps {
  sceneFunctions: InteractiveSceneFunctions;
  events: EventConfig[];
  animations?: CustomAnimationConfig[];
  sceneData: SceneData;
}

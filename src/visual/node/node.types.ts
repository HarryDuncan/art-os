import { EventConfig } from "interaction/interactions.types";
import { AnimationConfig } from "visual/display/animation/animation.types";
import {
  InteractiveSceneFunctions,
  SceneInteraction,
} from "visual/display/components/interactive-scene/InteractiveScene";
import { SceneData } from "visual/set-up/config/config.types";

export interface NodeProps {
  sceneFunctions: InteractiveSceneFunctions;
  events: EventConfig[];
  interactionEvents: SceneInteraction[];
  animations?: AnimationConfig[];
  sceneData: SceneData;
}

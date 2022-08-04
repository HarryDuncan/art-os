import { InteractionEventObject, ModelType } from "../types";

export const getModelType = (
  interactionEventObj: InteractionEventObject[]
): ModelType => {
  console.warn(interactionEventObj);
  // TODO - when we have other models
  return "posenet";
};

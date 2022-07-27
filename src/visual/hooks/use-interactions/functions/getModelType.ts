import { InteractionEventObject, ModelType } from '../types';

export const getModelType = (
  interactionEventObj: InteractionEventObject[],
): ModelType =>
  // TODO - when we have other models
  'posenet';

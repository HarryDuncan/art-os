import { ENGINE_EVENTS } from "./engine.consts";

export const sceneUpdateEvent = () => {
  const e = new CustomEvent(ENGINE_EVENTS.UPDATE_SCENE);
  document.dispatchEvent(e);
};

export const sceneTriggeredUpdateEvent = () => {
  const e = new CustomEvent(ENGINE_EVENTS.TIGGERED_UPDATE);
  document.dispatchEvent(e);
};

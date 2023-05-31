const UPDATE_SCENE = "scene:update";
export const sceneUpdateEvent = () => {
  const e = new CustomEvent(UPDATE_SCENE);
  document.dispatchEvent(e);
};

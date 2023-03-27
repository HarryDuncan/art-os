import { getLightsByIdentifier } from "./object-finding/getLightsByIdentifer";
import { getMeshesByIdentifier } from "./object-finding/getMeshesByIdentifier";

export const getSceneElementByName = (scene, identifier) => {
  if (identifier === "camera") {
    return [scene.camera];
  }
  if (identifier.indexOf("light") !== -1) {
    getLightsByIdentifier(scene, identifier);
  } else {
    return getMeshesByIdentifier(scene, identifier);
  }
};

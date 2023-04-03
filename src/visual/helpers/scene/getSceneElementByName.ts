import { getLightsByIdentifier } from "./object-finding/getLightsByIdentifer";
import { getMeshesByIdentifier } from "./object-finding/getMeshesByIdentifier";

export const getSceneElementByName = (scene, identifier) => {
  if (identifier.indexOf("light") !== -1) {
    return getLightsByIdentifier(scene, identifier);
  }
  return getMeshesByIdentifier(scene, identifier);
};

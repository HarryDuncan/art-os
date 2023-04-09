import { InteractiveScene } from "visual/components/interactive-scene";

export const getMeshesByIdentifier = (scene: InteractiveScene, identifier) => {
  const selectedMeshes = scene.children.flatMap((child) => {
    if (child.name && child.name.indexOf(identifier) !== -1) {
      return child;
    }
    return [];
  });
  return selectedMeshes;
};

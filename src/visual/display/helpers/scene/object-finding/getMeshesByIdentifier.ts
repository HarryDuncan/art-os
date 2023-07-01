import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";
import { ExtendedMesh } from "visual/set-up/config/config.types";

export const getMeshesByIdentifier = (
  scene: InteractiveScene,
  identifier: string
) => {
  const children = scene.children as ExtendedMesh[];
  const selectedMeshes = children.flatMap((child) => {
    if (child.name && child.name.indexOf(identifier) !== -1) {
      return child;
    }
    if (child.groupId && child.groupId === identifier) {
      return child;
    }
    return [];
  });
  return selectedMeshes;
};

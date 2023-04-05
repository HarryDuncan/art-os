import { InteractiveThreeScene } from "visual/components/interactive";

export const getMeshesByIdentifier = (
  scene: InteractiveThreeScene,
  identifier
) => {
  const selectedMeshes = scene.children.flatMap((child) => {
    if (child.name.indexOf(identifier) !== -1) {
      return child;
    }
    return [];
  });
  return selectedMeshes;
};

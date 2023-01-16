export const getMeshesByIdentifier = (scene, identifier) => {
  const selectedMeshes = scene.children.flatMap((child) =>
    child.name.indexOf(identifier) !== -1 ? child : []
  );
  return selectedMeshes;
};

const LIGHTS = "lights";
export const getLightsByIdentifier = (scene, identifier) => {
  console.log(scene);
  const selectedLights = scene.children.filter(
    (child) =>
      child.isLight &&
      !child.isAmbientLight &&
      (identifier === LIGHTS || child.name.indexOf(identifier) !== -1)
  );
  return selectedLights;
};

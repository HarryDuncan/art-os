export const addObjectsToScene = (scene, meshArr) => {
  meshArr.forEach((element) => {
    scene.add(element);
  });
};

import { getMeshByName } from "visual/display/helpers/scene/object-finding/getMeshByName";

export const animateMarchingCube = (scene) => {
  const time = scene.clock.getElapsedTime() * 0.8;
  const marchingCube = getMeshByName(scene, "marching-cubes");
  if (!marchingCube) {
    return;
  }

  updateCubes(marchingCube, time, 50);
};

export const updateCubes = (object, time, numblobs) => {
  object.reset();

  // fill the field with some metaballs
  const subtract = 12;
  const strength = 1.2 / ((Math.sqrt(numblobs) - 1) / 4 + 1);

  for (let i = 0; i < numblobs; i += 1) {
    const ballx =
      Math.sin(i + 1.26 * time * (1.03 + 0.5 * Math.cos(0.21 * i))) * 0.27 +
      0.5;
    const bally =
      Math.abs(Math.tan(i + 1.12 * time * Math.cos(1.22 + 0.1424 * i))) * 0.77; // dip into the floor
    const ballz =
      Math.cos(i + 1.32 * time * 0.1 * Math.sin(0.92 + 0.53 * i)) * 0.27;

    object.addBall(ballx, bally, ballz, strength, subtract);
  }

  object.update();
};

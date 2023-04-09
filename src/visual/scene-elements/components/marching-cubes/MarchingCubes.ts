import { MarchingCubes as ThreeJsMarchingCubes } from "three/examples/jsm/objects/MarchingCubes.js";
import { DEFAULT_RESOLUTION } from "./marchingCubes.constants";
import { MarchingCubesProps } from "../threeJsComponents.types";
import { DEFAULT_MATERIAL } from "visual/materials/materials.defaults";

export const MarchingCubes = ({
  id,
  parameters,
  material = DEFAULT_MATERIAL,
}: MarchingCubesProps & { id: string }) => {
  const resolution = parameters?.resolution ?? DEFAULT_RESOLUTION;
  const marchingCubeEffect = new ThreeJsMarchingCubes(
    resolution,
    material,
    true,
    true,
    100000
  );

  marchingCubeEffect.position.set(0, 0, 0);
  marchingCubeEffect.scale.set(4, 4, 4);
  marchingCubeEffect.isolation = 30;
  marchingCubeEffect.enableUvs = false;
  marchingCubeEffect.enableColors = false;
  marchingCubeEffect.name = `marching-cubes-${id}`;
  return marchingCubeEffect;
};

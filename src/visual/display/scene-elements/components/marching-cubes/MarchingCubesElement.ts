import { MarchingCubes as ThreeJsMarchingCubes } from "three/examples/jsm/objects/MarchingCubes.js";
import {
  DEFAULT_ISOLATION,
  DEFAULT_MARCHING_CUBES_SCALE,
  DEFAULT_RESOLUTION,
} from "./marchingCubes.constants";
import { MarchingCubesProps } from "../threeJsComponents.types";
import { DEFAULT_MATERIAL } from "visual/display/materials/materials.defaults";

export const MarchingCubesElement = ({
  id,
  resolution = DEFAULT_RESOLUTION,
  material = DEFAULT_MATERIAL,
  isolation = DEFAULT_ISOLATION,
  scale = DEFAULT_MARCHING_CUBES_SCALE,
}: MarchingCubesProps & { id: string }) => {
  const marchingCubeEffect = new ThreeJsMarchingCubes(
    resolution,
    material,
    true,
    true,
    100000
  );

  marchingCubeEffect.position.set(0, 0, 0);
  marchingCubeEffect.scale.set(scale, scale, scale);
  marchingCubeEffect.isolation = isolation;
  marchingCubeEffect.enableUvs = false;
  marchingCubeEffect.enableColors = false;
  marchingCubeEffect.name = `marching-cubes-${id}`;
  return marchingCubeEffect;
};

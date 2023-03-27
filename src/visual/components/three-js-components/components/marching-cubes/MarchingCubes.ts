import { MarchingCubes as ThreeJsMarchingCubes } from "three/examples/jsm/objects/MarchingCubes.js";
import { DEFAULT_RESOLUTION } from "./marchingCubes.constants";
import { MarchingCubesProps } from "../threeJsComponents.types";
import { setUpMaterial } from "../../helpers/setUpMaterial";
import { DEFAULT_MATERIAL } from "visual/helpers/materials/materials.constants";

export const MarchingCubes = ({
  name,
  parameters,
  material = DEFAULT_MATERIAL,
}: MarchingCubesProps) => {
  const resolution = parameters?.resolution ?? DEFAULT_RESOLUTION;
  const marchingCubesMaterial = setUpMaterial(material);
  const marchingCubeEffect = new ThreeJsMarchingCubes(
    resolution,
    marchingCubesMaterial,
    true,
    true,
    100000
  );

  marchingCubeEffect.position.set(0, 0, 0);
  marchingCubeEffect.scale.set(4, 4, 4);
  marchingCubeEffect.isolation = 30;
  marchingCubeEffect.enableUvs = false;
  marchingCubeEffect.enableColors = false;
  marchingCubeEffect.name = `marching-cubes-${name}`;
  return marchingCubeEffect;
};

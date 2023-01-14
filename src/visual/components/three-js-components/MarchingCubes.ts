import { MeshPhongMaterial } from "three";
import { MarchingCubes as ThreeJsMarchingCubes } from "three/examples/jsm/objects/MarchingCubes.js";
import { MarchingCubesConfig } from "./three-js-components.types";

export const MarchingCubes = ({ name }: MarchingCubesConfig) => {
  const params = {
    resolution: 150,
    material: new MeshPhongMaterial({ specular: 0x111111, shininess: 250 }),
  };
  const marchingCubeEffect = new ThreeJsMarchingCubes(
    params.resolution,
    params.material,
    true,
    true,
    100000
  );
  marchingCubeEffect.position.set(0, 0, 0);
  marchingCubeEffect.scale.set(7, 7, 7);
  marchingCubeEffect.enableUvs = false;
  marchingCubeEffect.enableColors = false;
  marchingCubeEffect.name = name;
  return marchingCubeEffect;
};

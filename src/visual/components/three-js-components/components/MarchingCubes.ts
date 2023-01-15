import { MeshPhongMaterial } from "three";
import { MarchingCubes as ThreeJsMarchingCubes } from "three/examples/jsm/objects/MarchingCubes.js";
import { MarchingCubesProps } from "./threeJsComponents.types";

export const MarchingCubes = ({ name }: MarchingCubesProps) => {
  const params = {
    resolution: 120,
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
  marchingCubeEffect.isolation = 100;
  marchingCubeEffect.enableUvs = false;
  marchingCubeEffect.enableColors = false;
  marchingCubeEffect.name = name;
  return marchingCubeEffect;
};

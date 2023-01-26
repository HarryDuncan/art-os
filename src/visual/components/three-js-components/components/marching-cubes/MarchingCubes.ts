import { MeshPhongMaterial } from "three";
import { MarchingCubes as ThreeJsMarchingCubes } from "three/examples/jsm/objects/MarchingCubes.js";
import { DEFAULT_RESOLUTION } from "./marchingCubes.constants";
import { MarchingCubesProps } from "../threeJsComponents.types";

export const MarchingCubes = ({ name, parameters }: MarchingCubesProps) => {
  const resolution = parameters?.resolution ?? DEFAULT_RESOLUTION;
  const material =
    parameters?.material ??
    new MeshPhongMaterial({ specular: 0x111111, shininess: 250 });

  const marchingCubeEffect = new ThreeJsMarchingCubes(
    resolution,
    material,
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

import { BoxGeometry, Mesh } from "three";
import { CubeProps } from "./threeJsComponents.types";
import { DEFAULT_MATERIAL } from "visual/helpers/materials/materials.defaults";

export const Cube = ({
  name,
  size,
  position,
  material = DEFAULT_MATERIAL,
}: CubeProps) => {
  const cubeGeometry = new BoxGeometry(
    size?.x ?? 40,
    size?.y ?? 40,
    size?.z ?? 40
  );
  const cube = new Mesh(cubeGeometry, material);
  cube.name = name;
  const { x, y, z } = position;
  cube.position.set(x, y, z);
  return cube;
};

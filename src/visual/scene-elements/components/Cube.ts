import { BoxGeometry, Mesh } from "three";
import { DEFAULT_MATERIAL } from "visual/helpers/materials/materials.constants";
import { CubeProps } from "./threeJsComponents.types";
import { setUpMaterial } from "visual/helpers/materials/setUpMaterial";

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
  const cubeMaterial = setUpMaterial(material);
  const cube = new Mesh(cubeGeometry, cubeMaterial);
  cube.name = name;
  const { x, y, z } = position;
  cube.position.set(x, y, z);
  return cube;
};

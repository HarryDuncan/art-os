import { Mesh, PlaneBufferGeometry } from "three";
import { DEFAULT_MATERIAL } from "visual/helpers/materials/materials.constants";
import { setUpMaterial } from "visual/helpers/materials/setUpMaterial";
import { PlaneProps } from "./threeJsComponents.types";

export const Plane = ({
  name,
  size,
  position,
  material = DEFAULT_MATERIAL,
}: PlaneProps) => {
  const planeGeometry = new PlaneBufferGeometry(size?.x ?? 40, size?.y ?? 40);
  const plane = new Mesh(planeGeometry, material);
  plane.name = name;
  const { x, y, z } = position;
  plane.position.set(x, y, z);
  return plane;
};

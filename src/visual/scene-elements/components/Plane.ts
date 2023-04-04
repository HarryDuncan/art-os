import { Mesh, PlaneBufferGeometry } from "three";
import { PlaneProps } from "./threeJsComponents.types";
import { DEFAULT_MATERIAL } from "visual/helpers/materials/materials.defaults";

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

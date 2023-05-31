import { Mesh, PlaneBufferGeometry } from "three";
import { PlaneProps } from "./threeJsComponents.types";
import { DEFAULT_MATERIAL } from "visual/display/materials/materials.defaults";

export const PlaneElement = ({
  id,
  size,
  position,
  material = DEFAULT_MATERIAL,
}: PlaneProps & { id: string }) => {
  const planeGeometry = new PlaneBufferGeometry(size?.x ?? 40, size?.y ?? 40);
  const plane = new Mesh(planeGeometry, material);
  plane.name = id;
  const { x, y, z } = position;
  plane.position.set(x, y, z);
  return plane;
};

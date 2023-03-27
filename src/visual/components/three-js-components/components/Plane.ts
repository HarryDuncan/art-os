import { Mesh, PlaneBufferGeometry } from "three";
import { setUpMaterial } from "visual/helpers/materials/setUpMaterial";
import { PlaneProps } from "./threeJsComponents.types";

export const Plane = ({ name, size, position, material }: PlaneProps) => {
  const planeGeometry = new PlaneBufferGeometry(size?.x ?? 40, size?.y ?? 40);
  const planeMaterial = setUpMaterial(material);
  const plane = new Mesh(planeGeometry, planeMaterial);
  plane.name = name;
  const { x, y, z } = position;
  plane.position.set(x, y, z);
  return plane;
};

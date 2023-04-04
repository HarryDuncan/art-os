import { Mesh, SphereGeometry } from "three";
import { DEFAULT_ROTATION } from "visual/helpers/three-dimension-space/threeDSpace.constants";
import { SphericalBackgroundProps } from "./threeJsComponents.types";
import { DEFAULT_MATERIAL } from "visual/helpers/materials/materials.defaults";

export const SphericalBackground = ({
  name,
  position,
  radius,
  rotation = DEFAULT_ROTATION,
  material = DEFAULT_MATERIAL,
}: SphericalBackgroundProps) => {
  const sphereGeometry = new SphereGeometry(radius, 32, 16);
  const sphere = new Mesh(sphereGeometry, material);
  sphere.name = name;
  const { x, y, z } = position;
  sphere.position.set(x, y, z);
  setRotation(sphere, rotation);
  return sphere;
};

const setRotation = (object, rotation) => {
  const { x, y, z } = rotation;
  object.rotation.set(x, y, z);
};

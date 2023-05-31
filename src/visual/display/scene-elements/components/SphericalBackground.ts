import { Mesh, SphereGeometry } from "three";
import { SphericalBackgroundProps } from "./threeJsComponents.types";
import { DEFAULT_ROTATION } from "visual/display/helpers/three-dimension-space/threeDSpace.constants";
import { DEFAULT_MATERIAL } from "visual/display/materials/materials.defaults";

export const SphericalBackground = ({
  id,
  position,
  radius,
  rotation = DEFAULT_ROTATION,
  material = DEFAULT_MATERIAL,
}: SphericalBackgroundProps & { id: string }) => {
  const sphereGeometry = new SphereGeometry(radius, 32, 16);
  const sphere = new Mesh(sphereGeometry, material);
  sphere.name = id;
  const { x, y, z } = position;
  sphere.position.set(x, y, z);
  setRotation(sphere, rotation);
  return sphere;
};

const setRotation = (object, rotation) => {
  const { x, y, z } = rotation;
  object.rotation.set(x, y, z);
};

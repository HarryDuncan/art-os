import { BackSide, Mesh, MeshMatcapMaterial, SphereGeometry } from "three";
import { DEFAULT_MATERIAL } from "visual/helpers/materials/materials.constants";
import { DEFAULT_ROTATION } from "visual/helpers/three-dimension-space/threeDSpace.constants";
import { setUpMaterial } from "../helpers/setUpMaterial";
import { SphericalBackgroundProps } from "./threeJsComponents.types";

export const SphericalBackground = ({
  name,
  position,
  radius,
  rotation = DEFAULT_ROTATION,
  material = DEFAULT_MATERIAL,
}: SphericalBackgroundProps) => {
  const sphereGeometry = new SphereGeometry(radius, 32, 16);
  const sphereMaterial = setUpMaterial(material) as MeshMatcapMaterial;
  sphereMaterial.side = BackSide;
  const sphere = new Mesh(sphereGeometry, sphereMaterial);
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

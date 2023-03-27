import { MeshPhongMaterial } from "three";

export const DEFAULT_MATERIAL = new MeshPhongMaterial({
  specular: 0x111111,
  shininess: 250,
});

export const MATERIAL_TYPES = {
  INTERACTIVE_SHADER: "INTERACTIVE_SHADER",
  STANDARD_SHADER: "STANDARD_SHADER",
  MATCAP: "MATCAP",
  STANDARD: "STANDARD",
  MATERIAL: "MATERIAL",
  VIDEO: "VIDEO",
  ENV_MAP: "ENV_MAP",
};

export const ENV_MAP_TYPES = {
  REFLECTION: "REFLECTION",
  REFRACTION: "REFRACTION",
};

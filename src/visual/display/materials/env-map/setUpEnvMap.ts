import { FILE_TYPES } from "visual/consts";
import { ENV_MAP_TYPES } from "../materials.constants";
import { setUpReflectionEnvMap } from "./setUpReflectionEnvMap";

export const setUpEnvMap = (
  imageUrl: string,
  mapType = ENV_MAP_TYPES.REFLECTION
) => {
  switch (mapType) {
    case ENV_MAP_TYPES.REFLECTION:
    default:
      return setUpReflectionEnvMap(imageUrl, FILE_TYPES.IMAGES.JPG);
  }
};

import { FILE_TYPES } from "visual/constants";
import { useGLTFLoader } from "./useGLTFLoader";
import { useObjectLoader } from "./useObjectLoader";

export const useGeometryLoader = (fileType: string = "") => {
  switch (fileType) {
    case FILE_TYPES.MODELS.GLTF:
      return useGLTFLoader();
    case FILE_TYPES.MODELS.OBJ:
      return useObjectLoader();
    case "":
    default:
      return null;
  }
};

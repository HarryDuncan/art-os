import { FILE_TYPES } from "visual/consts";
import { loadGLTF } from "./loadGLTF";
import { loadObject } from "./loadObject";

export const loadGeometry = async (path: string, fileType) => {
  switch (fileType) {
    case FILE_TYPES.MODELS.GLTF: {
      const gltf = loadGLTF(path);
      return gltf;
    }
    case FILE_TYPES.MODELS.OBJ: {
      const object = await loadObject(path);
      return object;
    }
    case "":
    default: {
      return null;
    }
  }
};

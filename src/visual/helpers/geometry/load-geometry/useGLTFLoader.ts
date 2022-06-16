import { useCallback } from "react";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const useGLTFLoader = () => {
  const gltfLoader = new GLTFLoader();

  return useCallback(
    (path: string) => {
      gltfLoader.load(
        path,
        (gltf: GLTF) => {
          const result = gltf.scene;
          return result;
        }, // On Progress
        () => {},
        // On Error
        () => {
          console.error("error loading object");
        }
      );
    },
    [gltfLoader]
  );
};

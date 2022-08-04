import { Group } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const loadGLTF = (path: string) =>
  new Promise((resolve: (value: Group) => void) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      path,
      (gltf: GLTF) => {
        const result = gltf.scene;
        resolve(result);
      }, // On Progress
      () => null,
      // On Error
      () => {
        console.error("error loading object");
      }
    );
  });

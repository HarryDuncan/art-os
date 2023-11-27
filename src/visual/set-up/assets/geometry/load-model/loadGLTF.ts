import { Group } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const loadGLTF = (path: string) =>
  new Promise((resolve: (value: Group) => void) => {
    const gltfLoader = new GLTFLoader();
    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load(
      path,
      (gltf: GLTF) => {
        const result = gltf.scene;
        resolve(result);
      }, // On Progress
      () => null,
      // On Error
      (error) => {
        console.error(error);
      }
    );
  });

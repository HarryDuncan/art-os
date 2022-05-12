// @ts-nocheck
import * as THREE from "three";
import { TWidgetVisual, IFramework } from "../../../../animations/interfaces";
import { loadObjModel } from "../../../helpers/ModelLoader";
import { useWebGLShader } from "visual/hooks/use-webgl-shader";

const init = (sceneData, framework: IFramework) => {
  return new Promise((resolve, reject) => {
    // Camera
    const camera = new THREE.PerspectiveCamera(50, 1.0, 1, 10000);

    camera.position.set(-5, -1, 1500);
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    loadObjModel("../assets/models/nymph1.obj")
      .then((value) => {
        const uniformsPassed = {};

        const { sceneMesh, uniforms } = useWebGLShader(
          "checkerBlobs",
          uniformsPassed
        );
        const sceneParams = { uniforms: uniforms };
        scene.add(sceneMesh);
        value.position.set(-3, -1, 0);
        scene.add(value);
        resolve({ camera: camera, scene: scene, sceneParams: sceneParams });
      })
      .catch(() => {
        reject();
      });
  });
};

const onUpdate = (framework: IFramework, sceneParams: any) => {
  console.log(framework);
  sceneParams.uniforms.iTime.value = performance.now() / 1000;
};
export const NymphAndColors: TWidgetVisual = {
  name: "nymphAndColors",
  scene: null,
  camera: null,
  sceneParams: {},
  tag: "generic",
  sceneLength: 7000,
  init: init,
  onUpdate: onUpdate,
};

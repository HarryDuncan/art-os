import { Color, PerspectiveCamera, Scene } from "three";
import { setUpWebGLShader } from "visual/helpers/setUpWebGLShader";
import { FunctionBasedScene } from "../types";

const init = (sceneData) =>
  new Promise((resolve) => {
    const camera = new PerspectiveCamera(50, 1.0, 1, 10000);
    camera.position.set(-5, -1, 1500);

    const scene = new Scene();
    scene.background = new Color(0xffffff);

    const { sceneMesh, uniforms } = setUpWebGLShader(sceneData.data.shaderName);
    const sceneParams = { uniforms, name: "" };
    sceneParams.name = sceneData.data.shaderName;
    scene.add(sceneMesh);
    resolve({ camera, scene, sceneParams });
  });

const onUpdate = (_, sceneParams: any) => {
  sceneParams.uniforms.uTime.value = performance.now() / 10000;
};
export const GenericShaderScene: FunctionBasedScene = {
  name: "shader-scene",
  scene: null,
  camera: null,
  sceneParams: {},
  tag: "generic",
  sceneLength: 7000,
  init,
  onUpdate,
};

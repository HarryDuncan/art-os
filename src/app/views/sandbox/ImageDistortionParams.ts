import { AssetType } from "visual/hooks/use-assets/types";
import { INTERACTION_EVENTS } from "visual/hooks/use-interactions/const";
import { EventKey, InteractionKey } from "visual/hooks/use-interactions/types";
import { InteractiveScenes } from "visual/components/interactive-shaders/types";
import InteractiveMaterial from "visual/components/interactive-shaders/interactive-raw-shader/InteractiveRawShader";
import { imageDistortionFrag } from "visual/shaders/fragment-shaders";
import { imageDistortionVertex } from "visual/shaders/vertex-shaders/imageDistortionVertex";
import { sRGBEncoding, Vector4 } from "three";
import { RendererTypes } from "visual/hooks/use-three-js/renderer/types";
import { defaultCameraParams } from "visual/hooks/use-three-js/use-camera/useCamera";
import { CameraType } from "visual/hooks/use-three-js/use-camera/types";

export const imageDistortion = {
  threeJsParams: {
    camera: {
      ...defaultCameraParams,
      position: { x: 0, y: 0, z: 2 },
      cameraType: CameraType.ORTHOGRAPHIC_CAMERA,
    },
    renderer: {
      rendererType: RendererTypes.WEBGL,
      outputEncoding: sRGBEncoding,
    },
  },
  interactionEvents: [
    {
      eventKey: EventKey.Scale,
      interactionKey: INTERACTION_EVENTS.POSENET.RIGHT_WRIST as InteractionKey,
      eventFunction: (material: InteractiveMaterial, details) => {
        material.uniforms.uDataTexture.value.needsUpdate = true;
        updateDataTexture(material, details);
      },
    },
  ],
  assets: [
    {
      name: "uTexture",
      url: "../assets/textures/Marsh.jpg",
      assetType: AssetType.Texture,
    },
  ],
  materialParams: {
    sceneType: InteractiveScenes.IMAGE_DISTORTION,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new Vector4() },
      uTexture: { value: null },
      uDataTexture: {
        value: null,
      },
    },
    shaders: {
      fragmentShader: imageDistortionFrag,
      vertexShader: imageDistortionVertex,
    },
  },
  materialFunctions: {
    onTimeUpdate: (material: InteractiveMaterial) => {
      const delta = material.clock.getDelta();
      material.uniforms.uTime.value += delta;
    },
  },
};

const clamp = (number, min, max) => {
  return Math.max(min, Math.min(number, max));
};
const updateDataTexture = (material, details) => {
  let data = material.uniforms.uDataTexture.value.image.data;

  const relaxation = 0.9;
  for (let i = 0; i < data.length; i += 3) {
    data[i] *= relaxation;
    data[i + 1] *= relaxation;
  }

  const size = 15;
  let gridMouseX = size * details.xAsScale;
  let gridMouseY = size * (1 - details.yAsScale);
  let maxDist = size * 0.25;
  let aspect = 1;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let distance = (gridMouseX - i) ** 2 / aspect + (gridMouseY - j) ** 2;
      let maxDistSq = maxDist ** 2;

      if (distance < maxDistSq) {
        let index = 3 * (i + size * j);

        let power = maxDist / Math.sqrt(distance);
        power = clamp(power, 0, 10);
        // if(distance <size/32) power = 1;
        // power = 1;
        data[index] += 1 * 100 * 32 * power;
        data[index + 1] -= 1 * 100 * 12 * power;
      }
    }
  }
  console.log(data);
  material.uniforms.uDataTexture.value.image.data = data;
  material.uniforms.uDataTexture.value.needsUpdate = true;
};

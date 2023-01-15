import { clamp } from "utils/maths";
import { InteractiveShader } from "visual/components/interactive-shaders/interactive-shader";
import { INTERACTION_EVENTS } from "visual/helpers/interactions/const";
import {
  Binding,
  EventKey,
  InteractionKey,
} from "visual/helpers/interactions/types";
import { ASSET_TYPES } from "visual/hooks/use-assets/types";
import { CameraType } from "visual/hooks/use-three-js/use-camera/types";
import { getSceneData } from "./getSceneData";

export const textureDistortion = () => ({
  threeJsParams: {
    camera: {
      cameraType: CameraType.ORTHOGRAPHIC_CAMERA,
    },
  },
  interactions: [
    {
      eventKey: EventKey.Scale,
      binding: Binding.InteractiveMesh,
      interactionKey: INTERACTION_EVENTS.POSENET.LEFT_WRIST as InteractionKey,
      eventFunction: (material: InteractiveShader, details) => {
        material.uniforms.uDataTexture.value.needsUpdate = true;
        updateDataTexture(material, details);
      },
    },
  ],
  assets: [
    {
      name: "uTexture",
      url: "../assets/textures/RGBGood.jpg",
      assetType: ASSET_TYPES.Texture,
    },
  ],
  materialFunctions: {
    onTimeUpdate: (material: InteractiveShader) => {
      const delta = material.clock.getDelta();
      material.uniforms.uTime.value += delta;
      material.uniformsNeedUpdate = true;
    },
  },
  formatSceneData: getSceneData,
});

function updateDataTexture(material: InteractiveShader, details: any) {
  const { data } = material.uniforms.uDataTexture.value.image;
  const relaxation = 0.9;
  for (let i = 0; i < data.length; i += 4) {
    data[i] *= relaxation;
    data[i + 1] *= relaxation;
    data[i + 2] *= relaxation;
  }

  const size = material.uniforms.uGridSize.value;
  const gridMouseX = size * details.xAsScale;
  const gridMouseY = size * details.yAsScale;
  const maxDist = size * 0.15;
  const aspect = 1;

  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      const distance = (gridMouseX - i) ** 2 / aspect + (gridMouseY - j) ** 2;
      const maxDistSq = maxDist ** 2;

      if (distance < maxDistSq) {
        const index = 4 * (i + size * j);

        let power = maxDist / Math.sqrt(distance);
        power = clamp(power, 0, 10);
        // if(distance <size/32) power = 1;
        // power = 1;
        data[index] += 1 * 0.1 * power;
        data[index + 1] -= 1 * 0.1 * power;
        data[index + 2] -= 1 * 0.1 * power;
      }
    }
  }
  material.uniforms.uDataTexture.value.image.data = data;
  material.uniforms.uDataTexture.value.needsUpdate = true;
}

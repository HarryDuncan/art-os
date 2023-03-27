import {
  DoubleSide,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshStandardMaterial,
  ShaderMaterial,
  VideoTexture,
} from "three";
import { InteractionEventObject } from "../interactions/types";
import { setUpEnvMap } from "./env-map/setUpEnvMap";
import { getInteractiveMaterial } from "./interactive-material/getInteractiveMaterial";
import { MATERIAL_TYPES } from "./materials.constants";
import {
  EnvMapMaterialParameters,
  InteractiveMaterialParameters,
  MatcapMaterialParameters,
  MaterialParameterTypes,
  MaterialType,
  StandardShaderMaterialParameters,
  VideoMaterialParameters,
} from "./materials.types";

export const getMaterial = (
  materialParameters: MaterialParameterTypes,
  materialType: MaterialType,
  interactions: InteractionEventObject[] = [],
  materialFunctions = {}
) => {
  switch (materialType) {
    case MATERIAL_TYPES.INTERACTIVE_SHADER: {
      return getInteractiveMaterial(
        materialParameters as InteractiveMaterialParameters,
        interactions,
        materialFunctions
      );
    }
    case MATERIAL_TYPES.STANDARD_SHADER: {
      const {
        shaders,
        uniforms,
      } = materialParameters as StandardShaderMaterialParameters;
      return new ShaderMaterial({
        // @ts-ignore
        uniforms,
        vertexShader: shaders.vertexShader.vert,
        fragmentShader: shaders.fragmentShader.frag,
        depthWrite: true,
        depthTest: true,
      });
    }
    case MATERIAL_TYPES.MATCAP: {
      const { matcap } = materialParameters as MatcapMaterialParameters;
      return new MeshMatcapMaterial({
        matcap,
        side: DoubleSide,
      });
    }
    case MATERIAL_TYPES.ENV_MAP: {
      const {
        // @ts-ignore
        material: { imageUrl, envMapType },
      } = materialParameters as EnvMapMaterialParameters;

      const envMap = setUpEnvMap(imageUrl, envMapType);
      return new MeshStandardMaterial({
        envMap,
        roughness: 0.1,
        metalness: 1.0,
      });
    }
    case MATERIAL_TYPES.STANDARD:
      return new MeshStandardMaterial({});
    case MATERIAL_TYPES.VIDEO: {
      const { videoId } = materialParameters as VideoMaterialParameters;
      const video = document.getElementById(videoId);
      if (video) {
        const texture = new VideoTexture(video as HTMLVideoElement);
        const parameters = { color: 0xffffff, map: texture };
        return new MeshLambertMaterial(parameters);
      }
      console.warn("no video element found");
      return new MeshStandardMaterial({});
    }

    case MATERIAL_TYPES.MATERIAL:
    default:
      // @ts-ignore
      return materialParameters.material;
  }
};

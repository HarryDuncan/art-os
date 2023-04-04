import {
  DoubleSide,
  Material,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  ShaderMaterial,
  VideoTexture,
} from "three";
import { InteractionEventObject } from "../interactions/types";
import { setUpEnvMap } from "./env-map/setUpEnvMap";
import { getInteractiveMaterial } from "./interactive-material/getInteractiveMaterial";
import { MATERIAL_TYPES } from "./materials.constants";
import {
  EnvMapMaterialProps,
  InteractiveMaterialProps,
  MatcapMaterialProps,
  MaterialConfigProps,
  MaterialType,
  PhongMaterialProps,
  StandardShaderMaterialProps,
  VideoMaterialProps,
} from "./materials.types";

export const getMaterial = (
  materialType: MaterialType,
  materialProps: MaterialConfigProps,
  interactions: InteractionEventObject[] = [],
  materialFunctions = {}
): Material => {
  switch (materialType) {
    case MATERIAL_TYPES.INTERACTIVE_SHADER: {
      return getInteractiveMaterial(
        materialProps as InteractiveMaterialProps,
        interactions,
        materialFunctions
      );
    }
    case MATERIAL_TYPES.STANDARD_SHADER: {
      const {
        shaders,
        uniforms,
      } = materialProps as StandardShaderMaterialProps;
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
      const { matcap } = materialProps as MatcapMaterialProps;
      return new MeshMatcapMaterial({
        matcap,
        side: DoubleSide,
      });
    }
    case MATERIAL_TYPES.ENV_MAP: {
      const {
        // @ts-ignore
        material: { imageUrl, envMapType },
      } = materialProps as EnvMapMaterialProps;

      const envMap = setUpEnvMap(imageUrl, envMapType);
      return new MeshStandardMaterial({
        envMap,
        roughness: 0.1,
        metalness: 1.0,
      });
    }

    case MATERIAL_TYPES.VIDEO: {
      const { videoId } = materialProps as VideoMaterialProps;
      const video = document.getElementById(videoId);
      if (video) {
        const texture = new VideoTexture(video as HTMLVideoElement);
        const parameters = { color: 0xffffff, map: texture };
        return new MeshLambertMaterial(parameters);
      }
      console.warn("no video element found");
      return new MeshStandardMaterial({});
    }
    case MATERIAL_TYPES.PHONG: {
      const {
        color,
        specular,
        shininess,
      } = materialProps as PhongMaterialProps;
      return new MeshPhongMaterial({ color, specular, shininess });
    }
    case MATERIAL_TYPES.STANDARD:
    default:
      return new MeshStandardMaterial({});
  }
};

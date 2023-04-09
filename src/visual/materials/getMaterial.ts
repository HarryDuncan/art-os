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
import { setUpEnvMap } from "./env-map/setUpEnvMap";
import { MATERIAL_TYPES } from "./materials.constants";
import {
  EnvMapMaterialProps,
  MatcapMaterialProps,
  MaterialConfigProps,
  MaterialType,
  PhongMaterialProps,
  ShaderMaterialProps,
  VideoMaterialProps,
} from "./materials.types";
import { configureShaders } from "./webgl-shaders/shader-setup/configureShaders";

export const getMaterial = (
  materialType: MaterialType,
  materialProps: MaterialConfigProps
): Material => {
  switch (materialType) {
    case MATERIAL_TYPES.SHADER: {
      const { shaderConfig, uniforms } = materialProps as ShaderMaterialProps;
      const { vertexShader, fragmentShader } = configureShaders(shaderConfig);
      return new ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
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

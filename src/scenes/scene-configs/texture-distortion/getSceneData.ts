import {
  DataTexture,
  FloatType,
  NearestFilter,
  PlaneGeometry,
  RGBAFormat,
  Vector4,
} from "three";
import { SceneData } from "visual/components/interactive-scene/types";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import { MATERIAL_TYPES } from "visual/helpers/geometry/three-geometry/types";
import { formatAssetWithUniforms } from "visual/helpers/uniforms/formatAssetsWithUniforms";
import { Asset } from "visual/hooks/use-assets/types";
import { textureDistortionFrag } from "visual/shaders/fragment-shaders";
import { textureDistortionVertex } from "visual/shaders/vertex-shaders";

export const getSceneData = (assets: Asset[]): SceneData => {
  const uniforms = getUniforms(assets);
  const geometry = new PlaneGeometry(1, 1);
  return {
    isSceneDataInitialized: true,
    meshConfigs: [
      {
        materialType: MATERIAL_TYPES.interactive,
        geometry,
        materialParameters: {
          shaders: {
            vertexShader: textureDistortionVertex,
            fragmentShader: textureDistortionFrag,
          },
          shaderType: InteractiveShaderTypes.SHADER,
          uniforms: uniforms,
        },
      },
    ],
  };
};

const getUniforms = (assets: Asset[]) => {
  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new Vector4() },
    uTexture: { value: null },
    uGridSize: { value: 10 },
    uDataTexture: {
      value: null,
    },
  };
  formatAssetWithUniforms(uniforms, assets);
  updateGrid(uniforms);
  resize(uniforms);
  return uniforms;
};

const resize = (uniforms) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // image cover
  const imageAspect = 1 / 1.5;
  let a1;
  let a2;
  if (height / width > imageAspect) {
    a1 = (width / height) * imageAspect;
    a2 = 1;
  } else {
    a1 = 1;
    a2 = height / width / imageAspect;
  }

  uniforms.uResolution.value.x = width;
  uniforms.uResolution.value.y = height;
  uniforms.uResolution.value.z = a1;
  uniforms.uResolution.value.w = a2;
  updateGrid(uniforms);
};

export const updateGrid = (uniforms) => {
  const size = uniforms.uGridSize.value;

  const width = size;
  const height = size;

  const sizeSquared = width * height;
  const data = new Float32Array(4 * sizeSquared);

  for (let i = 0; i < sizeSquared; i += 1) {
    const r = Math.random() * 255 - 125;
    const r1 = Math.random() * 255 - 125;

    const stride = i * 4;

    data[stride] = r;
    data[stride + 1] = r1;
    data[stride + 2] = r;
    data[stride + 3] = 1;
  }

  // used the buffer to create a DataTexture
  const texture = new DataTexture(data, width, height, RGBAFormat, FloatType);
  texture.magFilter = NearestFilter;
  texture.minFilter = NearestFilter;
  uniforms.uDataTexture.value = texture;
  uniforms.uDataTexture.value.needsUpdate = true;
};

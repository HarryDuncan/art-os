import { DEFAULT_POSITION } from "consts/threejs";
import { Vector2 } from "three";
import { SceneData } from "visual/components/interactive-scene/types";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import { getGeometriesFromAssets } from "visual/helpers/assets/getGeometriesFromAssets";
import { formatMatcapTextureUniforms } from "visual/helpers/assets/texture/formatMatcapTextureUniforms";
import { formatImportedGeometry } from "visual/helpers/geometry/formatImportedGeometry";
import { MATERIAL_TYPES } from "visual/helpers/geometry/three-geometry/types";
import { Asset } from "visual/hooks/use-assets/types";
import { attractionMorphingFrag } from "visual/shaders/fragment-shaders";
import { attractionMorphingVertex } from "visual/shaders/vertex-shaders";

const GEOMETRY_UNIFORMS = {
  uTime: {
    type: "f",
    value: 0.0,
  },
  uFrame: {
    type: "f",
    value: 0.0,
  },
  uResolution: {
    type: "v2",
    value: new Vector2(window.innerWidth, window.innerHeight).multiplyScalar(
      window.devicePixelRatio
    ),
  },
  matcap: { value: null },
  uPosition: {
    type: "v2",
    value: new Vector2(50, 50),
  },
  uMouse: {
    type: "v2",
    value: new Vector2(
      0.7 * window.innerWidth,
      window.innerHeight
    ).multiplyScalar(window.devicePixelRatio),
  },
};

export const formatSceneData = (loadedAssets: Asset[]): SceneData => {
  const geometries = getGeometriesFromAssets(loadedAssets).map((geometry) =>
    formatImportedGeometry(geometry)
  );
  const matcaps = loadedAssets.flatMap((asset) =>
    asset.name.indexOf("matcap") !== -1 ? asset : []
  );
  const sceneData = {
    isSceneDataInitialized: true,
    meshConfigs: geometries.flatMap((geometry, index) => {
      const matcap = matcaps[index];
      if (!matcap) return [];
      const uniforms = formatMatcapTextureUniforms(
        GEOMETRY_UNIFORMS,
        matcap.data
      );
      const position = formatPosition(index);
      const rotation = formatRotation(index);
      return {
        materialType: MATERIAL_TYPES.standardShader,
        geometry,
        position,
        rotation,
        materialParameters: {
          shaderType: InteractiveShaderTypes.SHADER,
          shaders: {
            vertexShader: attractionMorphingVertex,
            fragmentShader: attractionMorphingFrag,
          },
          uniforms,
        },
      };
    }),
  };
  return sceneData;
};

const formatRotation = (index: number) => {
  const rotation = { x: 0, y: 0, z: 0 };
  switch (index) {
    case 1:
    case 2:
      rotation.y = 2 * Math.PI * (-90 / 360);
      break;
    default:
      break;
  }
  return rotation;
};
const formatPosition = (index: number) => {
  const position = { ...DEFAULT_POSITION };
  position.y = 5;
  if (index === 0) {
    position.x = -12;
  } else if (index === 1) {
    position.z = 10;
    position.x = 0;
  } else if (index === 2) {
    position.x = 12;
  }
  return position;
};

import { useMemo } from "react";
import {
  AdditiveBlending,
  DoubleSide,
  Material,
  Mesh,
  Points,
  ShaderMaterial,
} from "three";
import { Geometry } from "types/threeJs.types";
import InteractiveRawShader from "visual/components/interactive-shaders/interactive-raw-shader/InteractiveRawShader";
import { InteractiveShader } from "visual/components/interactive-shaders/interactive-shader";
import { InteractiveShaderTypes } from "visual/components/interactive-shaders/types";
import {
  FormattedGeometry,
  FormattedGeometryType,
  InteractiveMaterialParameters,
  MeshTypes,
} from "visual/helpers/geometry/three-geometry/types";
import { InteractionEventObject } from "../helpers/interactions/types";

export const useMeshes = (
  geometries: FormattedGeometry[] = [],
  interactions: InteractionEventObject[] = []
) =>
  useMemo(() => {
    return geometries.flatMap(
      ({ geometry, geometryType, materialParameters, meshType }) => {
        const material = getMaterial(materialParameters, geometryType);
        return getMesh(geometry, material, meshType);
      }
    );
  }, [geometries]);

const getMesh = (geometry: Geometry, material, meshType?: MeshTypes) => {
  switch (meshType) {
    case MeshTypes.POINTS:
      return new Points(geometry, material);
    case MeshTypes.MESH:
    default:
      return new Mesh(geometry, material);
  }
};

const getMaterial = (materialParameters, geometryType) => {
  switch (geometryType) {
    case FormattedGeometryType.interactive: {
      return getInteractiveMaterial(
        materialParameters as InteractiveMaterialParameters
      );
    }
    case FormattedGeometryType.standard:
    default:
      return materialParameters;
  }
};
const getInteractiveMaterial = (
  materialParams: InteractiveMaterialParameters
) => {
  const {
    shaderType,
    shaders,
    uniforms,
  } = materialParams as InteractiveMaterialParameters;
  switch (shaderType) {
    case InteractiveShaderTypes.RAW_SHADER:
      return new InteractiveRawShader(uniforms, shaders, []);
    case InteractiveShaderTypes.SHADER:
      return new InteractiveShader(uniforms, shaders, []);
    case InteractiveShaderTypes.NON_INTERACTIVE:
      return new ShaderMaterial({
        side: DoubleSide,
        // @ts-ignore
        uniforms,
        // wireframe: true,
        // transparent: true,
        blending: AdditiveBlending,
        vertexShader: shaders.vertexShader.vert,
        fragmentShader: shaders.fragmentShader.frag,
        depthTest: false,
        depthWrite: false,
      });
  }
};
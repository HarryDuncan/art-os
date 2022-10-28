import { useAppSelector } from "app/redux/store";
import { useMemo } from "react";
import {
  AdditiveBlending,
  DoubleSide,
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
import { getBoundInteractions } from "visual/helpers/interactions/getBoundInteractions";
import { Binding, InteractionEventObject } from "../helpers/interactions/types";

export const useMeshes = (
  geometries: FormattedGeometry[] = [],
  interactions: InteractionEventObject[] = []
) => {
  const {
    visualData: { materialFunctions },
  } = useAppSelector((state) => state.visual);
  return useMemo(() => {
    return geometries.flatMap(
      ({ geometry, geometryType, materialParameters, meshType }) => {
        const material = getMaterial(
          materialParameters,
          geometryType,
          interactions,
          materialFunctions
        );
        const mesh = getMesh(geometry, material, meshType);
        // TODO - add events to mesh
        return mesh;
      }
    );
  }, [geometries]);
};

const getMesh = (geometry: Geometry, material, meshType?: MeshTypes) => {
  switch (meshType) {
    case MeshTypes.POINTS:
      return new Points(geometry, material);
    case MeshTypes.MESH:
    default:
      return new Mesh(geometry, material);
  }
};

const getMaterial = (
  materialParameters,
  geometryType,
  interactions,
  materialFunctions
) => {
  switch (geometryType) {
    case FormattedGeometryType.interactive: {
      return getInteractiveMaterial(
        materialParameters as InteractiveMaterialParameters,
        interactions,
        materialFunctions
      );
    }
    case FormattedGeometryType.standard:
    default:
      return materialParameters;
  }
};
const getInteractiveMaterial = (
  materialParams: InteractiveMaterialParameters,
  interactions: InteractionEventObject[],
  materialFunctions
) => {
  const {
    shaderType,
    shaders,
    uniforms,
  } = materialParams as InteractiveMaterialParameters;
  const boundInteractions = getBoundInteractions(
    interactions,
    Binding.InteractiveMesh
  );
  switch (shaderType) {
    case InteractiveShaderTypes.RAW_SHADER:
      return new InteractiveRawShader(
        uniforms,
        shaders,
        boundInteractions,
        materialFunctions
      );
    case InteractiveShaderTypes.SHADER:
      return new InteractiveShader(
        uniforms,
        shaders,
        boundInteractions,
        materialFunctions
      );

    case InteractiveShaderTypes.NON_INTERACTIVE:
    default:
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

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
  MeshConfig,
  MATERIAL_TYPES,
  InteractiveMaterialParameters,
  MeshTypes,
} from "visual/helpers/geometry/three-geometry/types";
import { getBoundInteractions } from "visual/helpers/interactions/getBoundInteractions";
import {
  Binding,
  InteractionEventObject,
} from "../../helpers/interactions/types";

export const useMeshes = (
  meshConfigs: MeshConfig[] = [],
  interactions: InteractionEventObject[] = []
) => {
  const {
    visualData: { materialFunctions },
  } = useAppSelector((state) => state.visual);
  return useMemo(() => {
    return meshConfigs.flatMap(
      (
        {
          geometry,
          name,
          materialType,
          materialParameters,
          meshType,
          position,
          rotation,
        },
        index
      ) => {
        const material = getMaterial(
          materialParameters,
          materialType,
          interactions,
          materialFunctions
        );
        const mesh = getMesh(geometry, material, meshType);
        formatMesh(mesh, position, rotation, name ?? `mesh-${index}`);
        // TODO - add events to mesh
        return mesh;
      }
    );
  }, [meshConfigs]);
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
  materialType,
  interactions,
  materialFunctions
) => {
  switch (materialType) {
    case MATERIAL_TYPES.interactive: {
      return getInteractiveMaterial(
        materialParameters as InteractiveMaterialParameters,
        interactions,
        materialFunctions
      );
    }
    case MATERIAL_TYPES.standardShader: {
      const { shaders, uniforms } = materialParameters;
      return new ShaderMaterial({
        // @ts-ignore
        uniforms,
        vertexShader: shaders.vertexShader.vert,
        fragmentShader: shaders.fragmentShader.frag,
        depthWrite: true,
        depthTest: true,
      });
    }
    case MATERIAL_TYPES.standard:
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
  }
};

const formatMesh = (mesh, position, rotation, name) => {
  mesh.name = name;
  if (position) {
    const { x, y, z } = position;
    mesh.position.set(x, y, z);
  }
  if (rotation) {
    const { x, y, z } = rotation;
    mesh.rotation.set(x, y, z);
  }
};

import { DoubleSide, MeshMatcapMaterial, ShaderMaterial } from "three";
import {
  InteractiveMaterialParameters,
  MATERIAL_TYPES,
} from "../assets/geometry/types";
import { InteractionEventObject } from "../interactions/types";
import { getInteractiveMaterial } from "./getInteractiveMaterial";

export const getMaterial = (
  materialParameters,
  materialType: MATERIAL_TYPES,
  interactions: InteractionEventObject[] = [],
  materialFunctions = {}
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
    case MATERIAL_TYPES.matcap: {
      const { matcap } = materialParameters;
      return new MeshMatcapMaterial({
        matcap,
        side: DoubleSide,
      });
    }
    case MATERIAL_TYPES.standard:
    default:
      return materialParameters;
  }
};

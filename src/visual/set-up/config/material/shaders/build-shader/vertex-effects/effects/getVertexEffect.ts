import { VertexEffectConfig } from "../../buildShader.types";
import { VERTEX_EFFECTS } from "../vertexEffects.consts";
import { VertexEffectData } from "../vertexEffects.types";
import { explode } from "./displacement/explode/explode";
import { vertexFilter } from "./filter-vertex/filterVertex";
import { pointsVertex } from "./points/pointsVertex";

export const getVertexEffect = (
  effect: VertexEffectConfig,
  transformPointName: string
): VertexEffectData => {
  switch (effect.effectType) {
    case VERTEX_EFFECTS.EXPLODE: {
      return explode(transformPointName);
    }
    case VERTEX_EFFECTS.FILTER: {
      return vertexFilter(transformPointName);
    }
    case VERTEX_EFFECTS.POINTS: {
      return pointsVertex();
    }
    default:
      console.warn(
        `no vertex transformations configured for ${effect.effectType}`
      );
      return {
        requiredFunctions: [],
        uniformConfig: { defaultUniforms: [] },
        transformation: "",
        varyingConfig: {},
        pointName: transformPointName,
      };
  }
};

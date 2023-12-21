import {
  RotationEffectProps,
  VertexEffectConfig,
} from "../../buildShader.types";
import { VERTEX_EFFECTS } from "../vertexEffects.consts";
import { VertexEffectData } from "../vertexEffects.types";
import { distort } from "./displacement/distort/distort";
import { explode } from "./displacement/explode/explode";
import { vertexFilter } from "./filter-vertex/filterVertex";
import { interactiveEffect } from "./interactive/interactiveEffect";
import { morphVertex } from "./morph/morphVertex";
import { pointsVertex } from "./points/pointsVertex";
import { rotationVertex } from "./rotation/rotation";

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
      return pointsVertex(transformPointName, effect.effectProps);
    }
    case VERTEX_EFFECTS.MORPH: {
      return morphVertex(transformPointName, effect.effectProps);
    }
    case VERTEX_EFFECTS.DISTORT: {
      return distort(transformPointName);
    }
    case VERTEX_EFFECTS.INTERACTIVE: {
      return interactiveEffect(transformPointName);
    }
    case VERTEX_EFFECTS.ROTATE: {
      return rotationVertex(
        transformPointName,
        effect.effectProps as RotationEffectProps
      );
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

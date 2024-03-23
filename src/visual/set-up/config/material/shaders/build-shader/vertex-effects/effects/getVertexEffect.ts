import {
  ExpandEffectProps,
  ExplodeEffectProps,
  InteractiveEffectProps,
  MorphEffectProps,
  NoiseEffectProps,
  PointsEffectProps,
  RotationEffectProps,
  TriggeredVertexEffectProps,
  VertexEffectConfig,
} from "../../buildShader.types";
import { VERTEX_EFFECTS } from "../vertexEffects.consts";
import { VertexEffectData } from "../vertexEffects.types";
import { cloudEffect } from "./displacement/cloud/cloudTransform";
import { distort } from "./displacement/distort/distort";
import { expand } from "./displacement/expand/expand";
import { explode } from "./displacement/explode/explode";
import { noise } from "./displacement/noise/noise";
import { traverseTransform } from "./displacement/traverse/traverseTransform";
import { vertexFilter } from "./filter-vertex/filterVertex";
import { interactiveEffect } from "./interactive/interactiveEffect";
import { morphVertex } from "./morph/morphVertex";
import { pointsVertex } from "./points/pointsVertex";
import { rotationVertex } from "./rotation/rotation";
import { triggeredEffect } from "./triggered-effect/triggeredEffect";

export const getVertexEffect = (
  effect: VertexEffectConfig,
  transformPointName: string
): VertexEffectData => {
  switch (effect.effectType) {
    case VERTEX_EFFECTS.EXPLODE: {
      return explode(
        transformPointName,
        effect.effectProps as Partial<ExplodeEffectProps>
      );
    }
    case VERTEX_EFFECTS.FILTER: {
      return vertexFilter(transformPointName);
    }
    case VERTEX_EFFECTS.POINTS: {
      return pointsVertex(
        transformPointName,
        effect.effectProps as Partial<PointsEffectProps> | undefined
      );
    }
    case VERTEX_EFFECTS.CLOUD: {
      return cloudEffect(transformPointName);
    }
    case VERTEX_EFFECTS.MORPH: {
      return morphVertex(
        transformPointName,
        effect.effectProps as Partial<MorphEffectProps> | undefined
      );
    }
    case VERTEX_EFFECTS.TRAVERSE: {
      return traverseTransform(transformPointName);
    }
    case VERTEX_EFFECTS.DISTORT: {
      return distort(transformPointName);
    }
    case VERTEX_EFFECTS.INTERACTIVE: {
      return interactiveEffect(
        transformPointName,
        effect.effectProps as InteractiveEffectProps
      );
    }
    case VERTEX_EFFECTS.EXPAND: {
      return expand(
        transformPointName,
        effect.effectProps as ExpandEffectProps
      );
    }
    case VERTEX_EFFECTS.NOISE: {
      return noise(transformPointName, effect.effectProps as NoiseEffectProps);
    }
    case VERTEX_EFFECTS.ROTATE: {
      return rotationVertex(
        transformPointName,
        effect.effectProps as RotationEffectProps
      );
    }
    case VERTEX_EFFECTS.TRIGGERED_EFFECT: {
      return triggeredEffect(
        transformPointName,
        effect.effectProps as TriggeredVertexEffectProps
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
        varyingConfig: [],
        pointName: transformPointName,
      };
  }
};

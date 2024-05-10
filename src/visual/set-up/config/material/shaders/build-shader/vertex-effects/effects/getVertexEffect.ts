import {
  ExpandEffectProps,
  ExplodeEffectProps,
  InteractiveEffectProps,
  MorphEffectProps,
  NoiseEffectProps,
  PointsEffectProps,
  RotationEffectProps,
  TriggeredVertexEffect,
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
import { rotationEffect } from "./rotation/rotation";
import { triggeredEffect } from "./triggered-effect/triggeredEffect";

export const getVertexEffect = (
  effect: VertexEffectConfig,
  previousPointName: string
): VertexEffectData => {
  switch (effect.effectType) {
    case VERTEX_EFFECTS.EXPLODE: {
      return explode(
        previousPointName,
        effect.effectProps as Partial<ExplodeEffectProps>
      );
    }
    case VERTEX_EFFECTS.FILTER: {
      return vertexFilter(previousPointName);
    }
    case VERTEX_EFFECTS.POINTS: {
      return pointsVertex(
        previousPointName,
        effect.effectProps as Partial<PointsEffectProps> | undefined
      );
    }
    case VERTEX_EFFECTS.CLOUD: {
      return cloudEffect(previousPointName);
    }
    case VERTEX_EFFECTS.MORPH: {
      return morphVertex(
        previousPointName,
        effect.effectProps as Partial<MorphEffectProps> | undefined
      );
    }
    case VERTEX_EFFECTS.TRAVERSE: {
      return traverseTransform(previousPointName);
    }
    case VERTEX_EFFECTS.DISTORT: {
      return distort(previousPointName);
    }
    case VERTEX_EFFECTS.INTERACTIVE: {
      return interactiveEffect(
        previousPointName,
        effect.effectProps as InteractiveEffectProps
      );
    }
    case VERTEX_EFFECTS.EXPAND: {
      return expand(previousPointName, effect.effectProps as ExpandEffectProps);
    }
    case VERTEX_EFFECTS.NOISE: {
      return noise(previousPointName, effect.effectProps as NoiseEffectProps);
    }
    case VERTEX_EFFECTS.ROTATE: {
      return rotationEffect(
        previousPointName,
        effect.effectProps as RotationEffectProps
      );
    }
    case VERTEX_EFFECTS.TRIGGERED_EFFECT: {
      return triggeredEffect(
        previousPointName,
        effect.effectProps as TriggeredVertexEffect
      );
    }
    default:
      console.warn(
        `no vertex transformations configured for ${effect.effectType}`
      );
      return {
        attributeConfig: [],
        requiredFunctions: [],
        uniformConfig: { defaultUniforms: [] },
        transformation: "",
        varyingConfig: [],
        pointName: previousPointName,
      };
  }
};

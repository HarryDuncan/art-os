import {
  ColorEffectProps,
  FragmentEffectConfig,
  FragmentEffectData,
  MaterialEffectProps,
  OpacityEffectProps,
  PointMaterialEffectProps,
  TriggeredFragmentEffect,
} from "../../buildShader.types";
import { FRAGMENT_EFFECT } from "../fragmentEffects.consts";
import { color } from "./color/color";
import { defaultFragmentEffect } from "./defaultFragmentEffect/defaultFragmentEffect";
import { getInteractiveEffects } from "./interactive/interactive";
import { matcapMaterial } from "./material/matcap/matcapMaterial";
import { simpleMatcap } from "./material/matcap/simpleMatcap";
import { getFragmentPointMaterial } from "./material/point-material/getFragmentPointMaterial";
import { opacity } from "./opacity/opacity";
import { triggeredEffect } from "./triggered-effect/triggeredEffect";

export const getFragmentEffects = (
  effect: FragmentEffectConfig,
  previousFragName: string
): FragmentEffectData => {
  switch (effect.effectType) {
    case FRAGMENT_EFFECT.OPACITY:
      return opacity(
        previousFragName,
        effect.effectProps as Partial<OpacityEffectProps>
      );
    case FRAGMENT_EFFECT.COLOR:
      return color(
        previousFragName,
        effect.effectProps as Partial<ColorEffectProps>
      );
    case FRAGMENT_EFFECT.MATERIAL:
      return matcapMaterial(
        previousFragName,
        effect.effectProps as Partial<MaterialEffectProps> | undefined
      );
    case FRAGMENT_EFFECT.MATCAP:
      return simpleMatcap(
        previousFragName,
        effect.effectProps as Partial<MaterialEffectProps> | undefined
      );
    case FRAGMENT_EFFECT.POINT_MATERIAL:
      return getFragmentPointMaterial(
        previousFragName,
        effect.effectProps as Partial<PointMaterialEffectProps> | undefined
      );
    case FRAGMENT_EFFECT.INTERACTIVE:
      return getInteractiveEffects(previousFragName, effect.effectProps);
    case FRAGMENT_EFFECT.TRIGGERED: {
      return triggeredEffect(
        previousFragName,
        effect.effectProps as Partial<TriggeredFragmentEffect>
      );
    }

    case FRAGMENT_EFFECT.DEFAULT:
    default:
      return defaultFragmentEffect();
  }
};

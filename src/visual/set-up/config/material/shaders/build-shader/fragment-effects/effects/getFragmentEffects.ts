import {
  ColorEffectProps,
  FragmentEffectConfig,
  FragmentEffectData,
  InteractiveFragmentEffect,
  MaterialEffectProps,
  OpacityEffectProps,
  PointMaterialEffectProps,
  TriggeredFragmentEffect,
  VanishEffectProps,
} from "../../buildShader.types";
import { FRAGMENT_EFFECT } from "../fragmentEffects.consts";
import { color } from "./color/color";
import { defaultFragmentEffect } from "./defaultFragmentEffect/defaultFragmentEffect";
import { getInteractiveEffects } from "./interactive/interactiveEffect";
import { matcapMaterial } from "./material/matcap/matcapMaterial";
import { simpleMatcap } from "./material/matcap/simpleMatcap";
import { getFragmentPointMaterial } from "./material/point-material/getFragmentPointMaterial";
import { opacity } from "./opacity/opacity";
import { triggeredEffect } from "./triggered-effect/triggeredEffect";
import { vanishEffect } from "./vanish/vanish";

export const getFragmentEffects = (
  effect: FragmentEffectConfig,
  previousFragName: string
): FragmentEffectData => {
  const { effectType, effectProps } = effect;
  switch (effectType) {
    case FRAGMENT_EFFECT.OPACITY:
      return opacity(
        previousFragName,
        effectProps as Partial<OpacityEffectProps>
      );
    case FRAGMENT_EFFECT.COLOR:
      return color(previousFragName, effectProps as Partial<ColorEffectProps>);
    case FRAGMENT_EFFECT.MATERIAL:
      return matcapMaterial(
        previousFragName,
        effectProps as Partial<MaterialEffectProps> | undefined
      );
    case FRAGMENT_EFFECT.MATCAP:
      return simpleMatcap(
        previousFragName,
        effectProps as Partial<MaterialEffectProps> | undefined
      );
    case FRAGMENT_EFFECT.POINT_MATERIAL:
      return getFragmentPointMaterial(
        previousFragName,
        effectProps as Partial<PointMaterialEffectProps> | undefined
      );
    case FRAGMENT_EFFECT.INTERACTIVE:
      return getInteractiveEffects(
        previousFragName,
        effectProps as Partial<InteractiveFragmentEffect>
      );
    case FRAGMENT_EFFECT.VANISH:
      return vanishEffect(
        previousFragName,
        effectProps as Partial<VanishEffectProps>
      );
    case FRAGMENT_EFFECT.TRIGGERED: {
      return triggeredEffect(
        previousFragName,
        effectProps as Partial<TriggeredFragmentEffect>
      );
    }

    case FRAGMENT_EFFECT.DEFAULT:
    default:
      return defaultFragmentEffect();
  }
};

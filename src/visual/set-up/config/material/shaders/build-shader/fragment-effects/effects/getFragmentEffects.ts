import {
  BrightnessFragmentEffectProps,
  ColorFragmentEffectProps,
  FragmentEffectConfig,
  FragmentEffectData,
  InteractiveFragmentEffect,
  MaterialEffectProps,
  OpacityFragmentEffectProps,
  TriggeredFragmentEffect,
  VanishFragmentEffectProps,
} from "../../types";
import { FRAGMENT_EFFECT } from "../fragmentEffects.consts";
import { brightness } from "./brightness/brightness";
import { color } from "./color/color";
import { defaultFragmentEffect } from "./defaultFragmentEffect/defaultFragmentEffect";
import { getInteractiveEffects } from "./interactive/interactiveEffect";
import { matcapMaterial } from "./material/matcap/matcapMaterial";
import { simpleMatcap } from "./material/matcap/simpleMatcap";
import { pointMaterial } from "./material/point-material/pointMaterial";
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
        effectProps as Partial<OpacityFragmentEffectProps>
      );
    case FRAGMENT_EFFECT.COLOR:
      return color(
        previousFragName,
        effectProps as Partial<ColorFragmentEffectProps>
      );
    case FRAGMENT_EFFECT.MATERIAL:
      return matcapMaterial(
        previousFragName,
        effectProps as Partial<MaterialEffectProps>
      );
    case FRAGMENT_EFFECT.MATCAP:
      return simpleMatcap(
        previousFragName,
        effectProps as Partial<MaterialEffectProps>
      );
    case FRAGMENT_EFFECT.POINT_MATERIAL:
      return pointMaterial(
        previousFragName,
        effectProps as Partial<MaterialEffectProps>
      );
    case FRAGMENT_EFFECT.INTERACTIVE:
      return getInteractiveEffects(
        previousFragName,
        effectProps as Partial<InteractiveFragmentEffect>
      );
    case FRAGMENT_EFFECT.VANISH:
      return vanishEffect(
        previousFragName,
        effectProps as Partial<VanishFragmentEffectProps>
      );
    case FRAGMENT_EFFECT.TRIGGERED: {
      return triggeredEffect(
        previousFragName,
        effectProps as Partial<TriggeredFragmentEffect>
      );
    }
    case FRAGMENT_EFFECT.BRIGHTNESS: {
      return brightness(
        previousFragName,
        effectProps as Partial<BrightnessFragmentEffectProps>
      );
    }
    case FRAGMENT_EFFECT.DEFAULT:
    default:
      return defaultFragmentEffect();
  }
};

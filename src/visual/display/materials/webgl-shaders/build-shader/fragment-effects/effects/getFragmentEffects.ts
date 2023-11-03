import { FRAGMENT_EFFECT } from "../fragmentEffects.consts";
import { FragmentEffectData } from "../fragmentEffects.types";
import { defaultFragmentEffect } from "./defaultFragmentEffect/defaultFragmentEffect";

export const getFragmentEffects = (
  effect,
  transformColorName
): FragmentEffectData => {
  switch (effect.effectType) {
    case FRAGMENT_EFFECT.COLOR:
    case FRAGMENT_EFFECT.MATERIAL:
    case FRAGMENT_EFFECT.DEFAULT:
    default:
      return defaultFragmentEffect();
  }
};

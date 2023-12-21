import {
  FragmentEffectConfig,
  FragmentEffectData,
} from "../../buildShader.types";
import { FRAGMENT_EFFECT } from "../fragmentEffects.consts";
import { defaultFragmentEffect } from "./defaultFragmentEffect/defaultFragmentEffect";
import { getInteractiveEffects } from "./interactive/interactive";
import { matcapMaterial } from "./material/matcap/matcapMaterial";
import { getFragmentPointMaterial } from "./material/point-material/getFragmentPointMaterial";

export const getFragmentEffects = (
  effect: FragmentEffectConfig,
  transformColorName: string
): FragmentEffectData => {
  switch (effect.effectType) {
    case FRAGMENT_EFFECT.COLOR:
    case FRAGMENT_EFFECT.MATERIAL:
      return matcapMaterial(transformColorName);
    case FRAGMENT_EFFECT.POINT_MATERIAL:
      return getFragmentPointMaterial(effect.effectProps, transformColorName);
    case FRAGMENT_EFFECT.INTERACTIVE:
      return getInteractiveEffects(effect.effectProps, transformColorName);
    case FRAGMENT_EFFECT.DEFAULT:
    default:
      return defaultFragmentEffect();
  }
};

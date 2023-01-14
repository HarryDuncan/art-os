import { useMemo } from "react";
import {
  DirectionalLight,
  PointLight,
} from "visual/components/three-js-components/lights";
import { AmbientLight } from "visual/components/three-js-components/lights/AmbientLight";
import {
  LightConfigs,
  LIGHT_TYPES,
} from "visual/components/three-js-components/lights/lights.types";

export const useLights = (lightConfigs: LightConfigs[] = []) =>
  useMemo(() => {
    return lightConfigs.flatMap(({ name, lightType }) => {
      switch (lightType) {
        case LIGHT_TYPES.AMBIENT:
          return AmbientLight({ name });
        case LIGHT_TYPES.POINT_LIGHT:
          return PointLight({ name });
        case LIGHT_TYPES.DIRECTIONAL_LIGHT:
          return DirectionalLight({ name });
        default:
          console.warn("no light has been configured for this light type");
          return [];
      }
    });
  }, [lightConfigs]);

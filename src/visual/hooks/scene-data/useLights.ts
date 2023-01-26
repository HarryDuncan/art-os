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
    return lightConfigs.flatMap(({ name, lightType, props }) => {
      switch (lightType) {
        case LIGHT_TYPES.AMBIENT: {
          const { color } = props ?? {};
          return AmbientLight({ name, color });
        }

        case LIGHT_TYPES.POINT_LIGHT: {
          const { color } = props ?? {};
          return PointLight({ name, color });
        }

        case LIGHT_TYPES.DIRECTIONAL_LIGHT: {
          const { color } = props ?? {};
          return DirectionalLight({ name, color });
        }

        default:
          console.warn("no light has been configured for this light type");
          return [];
      }
    });
  }, [lightConfigs]);

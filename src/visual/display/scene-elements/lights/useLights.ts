import { useMemo } from "react";
import { LightConfigs, LIGHT_TYPES } from "./lights.types";
import { AmbientLightElement } from "./AmbientLightElement";
import { PointLightElement } from "./PointLightElement";
import { DirectionalLightElement } from "./DirectionalLightElement";

export const useLights = (lightConfigs: LightConfigs[] = []) =>
  useMemo(() => {
    return lightConfigs.flatMap(({ name, lightType, props }) => {
      switch (lightType) {
        case LIGHT_TYPES.AMBIENT: {
          const { color } = props ?? {};
          return AmbientLightElement({ name, color });
        }

        case LIGHT_TYPES.POINT_LIGHT: {
          const { color, position } = props ?? {};
          return PointLightElement({ name, color, position });
        }

        case LIGHT_TYPES.DIRECTIONAL_LIGHT: {
          const { color, position } = props ?? {};
          return DirectionalLightElement({ name, color, position });
        }

        default:
          console.warn("no light has been configured for this light type");
          return [];
      }
    });
  }, [lightConfigs]);

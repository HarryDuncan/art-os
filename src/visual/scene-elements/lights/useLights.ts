import { useMemo } from "react";
import { DirectionalLight, PointLight } from "visual/scene-elements/lights";
import { AmbientLight } from "visual/scene-elements/lights/AmbientLight";
import {
  LightConfigs,
  LIGHT_TYPES,
} from "visual/scene-elements/lights/lights.types";

export const useLights = (lightConfigs: LightConfigs[] = []) =>
  useMemo(() => {
    return lightConfigs.flatMap(({ name, lightType, props }) => {
      switch (lightType) {
        case LIGHT_TYPES.AMBIENT: {
          const { color } = props ?? {};
          return AmbientLight({ name, color });
        }

        case LIGHT_TYPES.POINT_LIGHT: {
          const { color, position } = props ?? {};
          return PointLight({ name, color, position });
        }

        case LIGHT_TYPES.DIRECTIONAL_LIGHT: {
          const { color, position } = props ?? {};
          return DirectionalLight({ name, color, position });
        }

        default:
          console.warn("no light has been configured for this light type");
          return [];
      }
    });
  }, [lightConfigs]);

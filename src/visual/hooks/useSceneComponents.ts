import { useMemo } from "react";
import { SceneComponentConfig } from "visual/components/interactive-scene/types";
import { MarchingCubes } from "visual/components/three-js-components/components";
import { Text } from "visual/components/three-js-components/components/Text";
import {
  COMPONENT_TYPES,
  MarchingCubesProps,
  TextProps,
} from "visual/components/three-js-components/components/threeJsComponents.types";

export const useSceneComponents = (
  componentConfigs: SceneComponentConfig[] = []
) =>
  useMemo(() => {
    return componentConfigs.flatMap(({ componentType, componentProps }) => {
      switch (componentType) {
        case COMPONENT_TYPES.MARCHING_CUBES: {
          const { name } = componentProps as MarchingCubesProps;
          return MarchingCubes({ name });
        }
        case COMPONENT_TYPES.TEXT: {
          const { name, font, text } = componentProps as TextProps;
          return Text({ name, text, font });
        }
        default:
          console.warn("component not set up for this component type");
          return [];
      }
    });
  }, [componentConfigs]);

import { useMemo } from "react";
import { SceneComponentConfig } from "visual/components/interactive-scene/types";
import {
  MarchingCubes,
  Mirror,
} from "visual/components/three-js-components/components";
import { Text } from "visual/components/three-js-components/components/Text";
import {
  COMPONENT_TYPES,
  MarchingCubesProps,
  MirrorProps,
  TextProps,
} from "visual/components/three-js-components/components/threeJsComponents.types";

export const useSceneComponents = (
  componentConfigs: SceneComponentConfig[] = []
) =>
  useMemo(() => {
    return componentConfigs.flatMap(({ componentType, componentProps }) => {
      switch (componentType) {
        case COMPONENT_TYPES.MARCHING_CUBES: {
          const { name, parameters } = componentProps as MarchingCubesProps;
          return MarchingCubes({ name, parameters });
        }
        case COMPONENT_TYPES.TEXT: {
          const {
            name,
            fontUrl,
            text,
            materialProps,
            position,
          } = componentProps as TextProps;
          return Text({ name, text, fontUrl, materialProps, position });
        }
        case COMPONENT_TYPES.MIRROR: {
          const { name, geometry, position } = componentProps as MirrorProps;
          return Mirror({ name, geometry, position });
        }
        default:
          console.warn("component not set up for this component type");
          return [];
      }
    });
  }, [componentConfigs]);

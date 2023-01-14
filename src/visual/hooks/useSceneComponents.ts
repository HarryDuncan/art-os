import { useMemo } from "react";
import { SceneComponentConfig } from "visual/components/interactive-scene/types";
import { MarchingCubes } from "visual/components/three-js-components";
import { COMPONENT_TYPES } from "visual/components/three-js-components/three-js-components.types";

export const useSceneComponents = (
  componentConfigs: SceneComponentConfig[] = []
) =>
  useMemo(() => {
    return componentConfigs.flatMap(({ name, componentType }) => {
      switch (componentType) {
        case COMPONENT_TYPES.MARCHING_CUBES:
          return MarchingCubes({ name });
        default:
          console.warn("component not set up for this component type");
          return [];
      }
    });
  }, [componentConfigs]);

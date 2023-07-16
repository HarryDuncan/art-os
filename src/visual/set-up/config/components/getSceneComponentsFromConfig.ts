import {
  Mirror,
  MarchingCubesElement,
} from "visual/display/scene-elements/components";
import { Cube } from "visual/display/scene-elements/components/Cube";
import {
  COMPONENT_TYPES,
  MarchingCubesProps,
  MirrorProps,
  PlaneProps,
  CubeProps,
} from "visual/display/scene-elements/components/threeJsComponents.types";
import { PlaneElement } from "visual/display/scene-elements/components/PlaneElement";
import { SceneComponentConfig } from "../config.types";

export const getSceneComponents = (
  componentConfigs: SceneComponentConfig[] = []
) =>
  componentConfigs.flatMap(({ id, componentType, componentProps }) => {
    switch (componentType) {
      case COMPONENT_TYPES.MARCHING_CUBES: {
        const { resolution, material, position, isolation, scale } =
          componentProps as MarchingCubesProps;
        return MarchingCubesElement({
          id,
          resolution,
          material,
          position,
          isolation,
          scale,
        });
      }
      // case COMPONENT_TYPES.TEXT: {
      //   const {
      //     fontUrl,
      //     text,
      //     material,
      //     position,
      //   } = componentProps as TextProps;
      //   return TextComponent({
      //     id,
      //     text,
      //     fontUrl,
      //     material,
      //     position,
      //   });
      // }
      case COMPONENT_TYPES.MIRROR: {
        const { geometry, position } = componentProps as MirrorProps;
        return Mirror({ id, geometry, position });
      }
      case COMPONENT_TYPES.PLANE: {
        const { material, position, size } = componentProps as PlaneProps;
        return PlaneElement({ id, position, size, material });
      }
      case COMPONENT_TYPES.CUBE: {
        const { material, position, size } = componentProps as CubeProps;
        return Cube({ id, position, size, material });
      }

      default:
        console.warn("component not set up for this component type");
        return [];
    }
  });

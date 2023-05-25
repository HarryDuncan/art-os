import { Vector3 } from "three";
import { DEFAULT_LIGHTS } from "visual/display/scene-elements/lights/lights.defaults";
import { LightConfigs } from "visual/display/scene-elements/lights/lights.types";

export const getLightsFromConfig = (config): LightConfigs[] => {
  const { lightConfig } = config;
  if (!lightConfig) {
    console.warn("no light config found - return default light config");
    return DEFAULT_LIGHTS;
  }
  return lightConfig.map(({ name, lightType, props }) => {
    const light = { name, lightType, props: {} };
    const lightProps = { ...props };
    if (props.position) {
      const { x, y, z } = props.position;
      lightProps.position = new Vector3(x, y, z);
    }
    light.props = lightProps;
    return light;
  });
};

import { capitalToCamelCase, getKeyCount } from "../../utils";

export const addLightsToScene = (scene: any, lightArray) => {
  lightArray.forEach((light) => {
    scene.add(light);
  });
};

export const addLightsToSceneParams = (sceneParams: any, lightArray) => {
  lightArray.forEach((light) => {
    const keyName = capitalToCamelCase(light.type);
    const count = getKeyCount(capitalToCamelCase(light.type), sceneParams);
    sceneParams[`${keyName}${count}`] = light;
  });
};

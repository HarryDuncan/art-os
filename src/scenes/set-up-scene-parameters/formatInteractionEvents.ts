import { InteractiveScene } from "visual/components/interactive-scene";
import { getMeshByName } from "visual/helpers/scene/object-finding/getMeshByName";

export const formatInteractionEvents = (interactionConfigs) => {
  return interactionConfigs.map((interactionConfig) => {
    const interactionEvent = {
      key: interactionConfig.eventKey,
      onEvent: (scene: InteractiveScene, eventDetails) => {
        const { sceneX, sceneY } = interactionCoordinatesRelativeToScene(
          eventDetails
        );
        const nymphMesh = getMeshByName(scene, "nymph");
        nymphMesh?.position.set(sceneX, sceneY, 0);
      },
    };
    return interactionEvent;
  });
};

const interactionCoordinatesRelativeToScene = (coords) => {
  const sceneWidth = 6;
  const sceneHeight = 4;
  const cameraWidth = 640;
  const cameraHeight = 480;
  const percentageWidth = 1 - coords.x / cameraWidth;
  const percentageHeight = 1 - coords.y / cameraHeight;
  const sceneX = -sceneWidth / 2 + percentageWidth * sceneWidth;
  const sceneY = -sceneHeight / 2 + percentageHeight * sceneHeight;
  return { sceneX, sceneY };
};

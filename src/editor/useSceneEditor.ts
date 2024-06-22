import { useCallback, useEffect } from "react";
import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";

export const useSceneEditor = (interactiveScene: InteractiveScene) => {
  const sceneEditorUpdate = useCallback((updatedSceneData) => {
    console.log(updatedSceneData);
  }, []);
  useEffect(() => {
    if (interactiveScene) {
      interactiveScene.initializeSceneEditor();
    }
  }, [interactiveScene]);

  return { sceneEditorUpdate };
};

import { IAnimationWidgetScene, FunctionBasedScene } from "../types";
import { useEffect, useState } from "react";
import { useInitializeScenes } from "./useInitializeScenes";

export const useScenes = (scenes: IAnimationWidgetScene[]) => {
  const [areScenesInitialized, setAreScenesInitialized] = useState(false);
  const [initializedScenes, setInitializedScenes] = useState<
    FunctionBasedScene[]
  >([]);
  const initializeScenes = useInitializeScenes(scenes);
  useEffect(() => {
    async function getAssets() {
      const loadedScenes = await initializeScenes();
      setAreScenesInitialized(true);
      setInitializedScenes(loadedScenes);
    }
    getAssets();
  }, [scenes, initializeScenes]);

  return { initializedScenes, areScenesInitialized };
};

import { useEffect, useState } from "react";
// import { useResponsive } from "./utils";
import { shouldChangeScene } from "./utils/sceneManager";

export const useRunThread = (
  manager,
  setManager,
  sceneIndex,
  updateSceneIndex,
  sceneArray,
  container: any
) => {
  let currentAnimation = 0;
  const [currentVisual, setCurrentVisual] = useState<any>(null);
  const [runThread, toggleThread] = useState<boolean>(false);

  const [hasResponsiveBeenSet, setHasResponsiveBeenSet] = useState<boolean>(
    true
  );

  const createScene = () => {
    // @ts-ignore
    let node: any = container.current;
    if (node !== null && node !== undefined) {
      node.appendChild(manager.renderer.domElement);
    }
    let currentVisualizer = sceneArray[sceneIndex];
    manager.renderer.render(currentVisualizer.scene, currentVisualizer.camera);

    setManager({
      ...manager,
      scene: currentVisualizer.scene,
      camera: currentVisualizer.camera,
    });
    setCurrentVisual(currentVisualizer);
  };

  // Sets up first scene and triggers running thread
  useEffect(() => {
    if (sceneArray.length > 0) {
      createScene();
      toggleThread(true);
    }
  }, [sceneArray]);

  useEffect(() => {
    if (runThread === true && currentVisual !== null) {
      const currentManager = {
        ...manager,
        scene: currentVisual.scene,
        camera: currentVisual.camera,
      };
      const play = () => {
        currentVisual.onUpdate(currentManager, currentVisual.sceneParams); // perform any requested updates
        currentManager.renderer.render(
          currentVisual.scene,
          currentVisual.camera
        );
        currentAnimation = requestAnimationFrame(play); // register to call this again when the browser renders a new frame
      };

      const pause = () => {
        cancelAnimationFrame(currentAnimation);
      };

      play();
      if (!hasResponsiveBeenSet) {
        //  useResponsive(manager, runThread, setManager);
        setHasResponsiveBeenSet(true);
      }

      if (shouldChangeScene(currentVisual.sceneLength, sceneArray.length)) {
        setTimeout(() => {
          pause();
          changeScene();
        }, currentVisual.sceneLength);
      }
    }
  }, [runThread, currentVisual]);

  const changeScene = () => {
    let currentVisualizer;
    if (sceneIndex >= sceneArray.length - 1) {
      currentVisualizer = sceneArray[0];
      updateSceneIndex(0);
    } else {
      currentVisualizer = sceneArray[sceneIndex + 1];
      updateSceneIndex(sceneIndex + 1);
    }
    setCurrentVisual(currentVisualizer);
    setManager({
      ...manager,
      reInitScene: true,
    });
  };
};

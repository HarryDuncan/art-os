export const getHeightVhToPx = (heightVh: number) =>
  window.innerHeight * (heightVh / 100);

export const getWidthVwToPx = (widthVh: number) =>
  window.innerWidth * (widthVh / 100);

export const useResponsive = (manager, runThread, setManager) => {
  function handleResize() {
    // Set window width/height to state

    if (manager && !!manager.camera && runThread) {
      setManager({
        ...manager,
        camera: {
          ...manager.camera,
          aspect: window.innerWidth / window.innerHeight,
        },
      });
      if (!!manager.camera) {
        manager.camera.updateProjectionMatrix();
      }
      if (manager.renderer) {
        manager.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    }
  }

  window.addEventListener("resize", handleResize);

  // useEffect(() => {
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
};

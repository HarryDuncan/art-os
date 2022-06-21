import { useEffect, useState } from "react";
import { Clock, WebGLRenderer } from "three";
import { INITIAL_FRAMEWORK } from "./consts";
import { IFramework, IVisual } from "./types";
import { useWidgetState } from "./useWidgetState";
import { cloneDeep } from "lodash";

export const useFramework = () => {
  const [framework, updateFramework] = useState<IFramework>();
  const getState = useWidgetState();

  useEffect(() => {
    // Set up the framework
    const initializedFramework: IFramework = cloneDeep(INITIAL_FRAMEWORK);
    const widgetState = getState();
    updateFramework({
      ...initializedFramework,
      isInitialized: true,
      visual: setUpVisual(),
      widgetState,
    });
  }, [getState]);

  return { framework, updateFramework };
};

const setUpVisual = (): IVisual => ({
  clock: new Clock(),
  renderer: setUpRenderer(),
});

const setUpRenderer = () => {
  const renderer = new WebGLRenderer({
    powerPreference: "high-performance",
    antialias: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  return renderer;
};

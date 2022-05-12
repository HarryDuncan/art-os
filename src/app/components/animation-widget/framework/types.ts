import React from "react";
import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { TWidgetVisual } from "../types";
import { TScene } from "../scenes/types";

export interface IWidgetState {
  sceneIndex: number;
  updateSceneIndex: React.Dispatch<React.SetStateAction<number>>;
  sceneArray: TScene[];
  currentVisual: TWidgetVisual;
  setCurrentVisual: React.Dispatch<React.SetStateAction<TWidgetVisual>>;
  isRunning: boolean;
  toggleIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  currentFrame: React.MutableRefObject<number>;
}

export interface IViewport {
  viewportWidth: number;
  viewportHeight: number;
}

export interface IVisual {
  renderer: WebGLRenderer;
  clock: Clock;
  camera?: PerspectiveCamera;
  scene?: Scene;
}

export interface IControlParams {
  automaticSwitchingOn: boolean;
  breakAnimation: boolean;
  changeVisuals: boolean;
  reInitScene: boolean;
}

export interface IFramework {
  widgetState: IWidgetState;
  viewport?: IViewport;
  visual: IVisual;
  controlParams: IControlParams;
  isInitialized: boolean;
}

import { IFramework } from "./interfaces";

export const INITIAL_FRAMEWORK: IFramework = {
  viewportWidth: 0,
  viewportHeight: 0,
  initialized: false,
  automaticSwitchingOn: true,
  breakAnimation: false,

  // Three JS part of the framework
  renderer: null,
  camera: null,
  scene: null,

  clock: null,
  // If background is dark change logo to light version
  bgDark: false,
  sceneIndex: 0,
  changeVisuals: false,

  //Transition
  reInitScene: false,
  transition: false,
  composer: null,
};

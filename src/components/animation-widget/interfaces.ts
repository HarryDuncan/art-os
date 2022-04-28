export interface IFramework {
  // viewport
  viewportWidth: number;
  viewportHeight: number;
  initialized: boolean;
  automaticSwitchingOn: boolean;
  breakAnimation: boolean;

  // Three JS part of the framework
  renderer: any;
  camera: any;
  scene: any;
  clock: any;
  composer: any;

  // If background is dark change logo to light version
  bgDark: boolean;
  sceneIndex: number;
  changeVisuals: boolean;

  reInitScene: boolean;
  transition: boolean;
}

export interface IAnimationWidgetScene {
  name: string;
  assetUrls;
}

export type TWidgetVisual = any;

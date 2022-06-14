import { IControlParams, IFramework } from "./types";

export const DEFAULT_CONTROL_PARAMS: IControlParams = {
  automaticSwitchingOn: true,
  breakAnimation: false,
  changeVisuals: false,
  reInitScene: false,
};

export const INITIAL_FRAMEWORK: Partial<IFramework> = {
  controlParams: DEFAULT_CONTROL_PARAMS,
  isInitialized: false,
};

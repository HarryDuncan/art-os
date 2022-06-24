import { AnyAction } from "@reduxjs/toolkit";
import React, { createContext } from "react";

export interface DigitalPiece {
  title: string;
  sceneId: string;
  componentId: string;
}
export interface DigitalArtState {
  selectedToViewIndex: number | null;
  pieces: DigitalPiece[];
}
export const defaultState: DigitalArtState = {
  selectedToViewIndex: null,
  pieces: [
    {
      title: "Vanishing Object",
      sceneId: "vanishingObject",
      componentId: "InteractiveObject",
    },
  ],
};

const defaultDispatch: React.Dispatch<AnyAction> = () => {};

export const Context = createContext({
  ...defaultState,
  dispatch: defaultDispatch,
});

Context.displayName = "digitalArtContext";

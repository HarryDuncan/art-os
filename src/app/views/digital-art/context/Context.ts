import { AnyAction } from "@reduxjs/toolkit";
import React, { createContext } from "react";
import scenes from "scenes/scenes.json";

export interface DigitalPiece {
  title: string;
  sceneId: string;
  componentId: string;
  cardImageName?: string;
}
export interface DigitalArtState {
  selectedToViewIndex: number | null;
  pieces: DigitalPiece[];
}
export const defaultState: DigitalArtState = {
  selectedToViewIndex: null,
  pieces: scenes,
};

const defaultDispatch: React.Dispatch<AnyAction> = () => null;

export const Context = createContext({
  ...defaultState,
  dispatch: defaultDispatch,
});

Context.displayName = "digitalArtContext";

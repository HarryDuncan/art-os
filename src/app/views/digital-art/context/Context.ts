import { AnyAction } from "@reduxjs/toolkit";
import React, { createContext } from "react";

export interface IPiece {
  title: string;
  sceneName?: string;
  assets?: any;
}
export interface DigitalArtState {
  selectedToViewIndex: number | null;
  pieces: IPiece[];
}
export const defaultState: DigitalArtState = {
  selectedToViewIndex: null,
  pieces: [
    {
      title: "Piece One",
      sceneName: "Swirl",
      assets: { img: "../assets/8Bytes.jpg" },
    },
  ],
};

const defaultDispatch: React.Dispatch<AnyAction> = () => {};

export const Context = createContext({
  ...defaultState,
  dispatch: defaultDispatch,
});

Context.displayName = "digitalArtContext";

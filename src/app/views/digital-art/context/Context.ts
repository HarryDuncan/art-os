import { AnyAction } from "@reduxjs/toolkit";
import React, { createContext } from "react";

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
  pieces: [
    {
      title: "Vanishing Object",
      sceneId: "vanishingObject",
      componentId: "InteractiveObject",
      cardImageName: "vanishingObject.jpg",
    },
    {
      title: "Interactive Particles",
      sceneId: "interactiveParticles",
      componentId: "InteractiveParticles",
      cardImageName: "interactiveParticles.jpg",
    },
    {
      title: "Image Distortion",
      sceneId: "imageDistortion",
      componentId: "ImageDistortion",
      cardImageName: "imageDistortion.jpg",
    },
    {
      title: "Surface Scattering",
      sceneId: "surfaceScattering",
      componentId: "SurfaceScattering",
      cardImageName: "surfaceScattering.jpg",
    },
    {
      title: "Image Hover",
      sceneId: "imageHoverConfig",
      componentId: "ImageHover",
      cardImageName: "imageHover.jpg",
    },
    {
      title: "Iran Piece",
      sceneId: "iranPiece",
      componentId: "ImageHover",
      cardImageName: "imageHover.jpg",
    },
    {
      title: "Deep Waves",
      sceneId: "deepWaves",
      componentId: "InteractiveWebGL",
      cardImageName: "imageHover.jpg",
    },
  ],
};

const defaultDispatch: React.Dispatch<AnyAction> = () => null;

export const Context = createContext({
  ...defaultState,
  dispatch: defaultDispatch,
});

Context.displayName = "digitalArtContext";

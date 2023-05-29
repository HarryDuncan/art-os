import React from "react";
import { LayerImg, LayerOverlay, LayersContainer } from "./Layers.styles";
import { LAYERS } from "app/constants";
import { LAYER_TYPES, Layer } from "./types";

export const Layers = ({ layers }: { layers: Layer[] }) => {
  if (!layers.length) {
    return null;
  }
  return (
    <LayersContainer>
      {layers.map((layer) => {
        switch (layer.layerType) {
          case LAYER_TYPES.IMAGE:
            return (
              <LayerImg
                src={`${LAYERS}${layer.layerProps.src}`}
                key={layer.layerName}
              />
            );
          case LAYER_TYPES.OVERLAY:
          default:
            return <LayerOverlay key={layer.layerName} />;
        }
      })}
    </LayersContainer>
  );
};

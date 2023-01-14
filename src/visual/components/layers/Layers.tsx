import React from "react";
import { useAppSelector } from "app/redux/store";
import { LayerImg, LayerOverlay, LayersContainer } from "./Layers.styles";
import { LAYERS } from "app/constants";
import { LayerTypes } from "./types";

export const Layers = () => {
  const { layers } = useAppSelector((state) => state.visual);
  return (
    <LayersContainer>
      {layers.map((layer) => {
        switch (layer.layerType) {
          case LayerTypes.IMAGE:
            return (
              <LayerImg
                src={`${LAYERS}${layer.layerProps.src}`}
                key={layer.layerName}
              />
            );
          case LayerTypes.OVERLAY:
          default:
            return <LayerOverlay key={layer.layerName} />;
        }
      })}
    </LayersContainer>
  );
};

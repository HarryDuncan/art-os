import React from "react";
import { useAppSelector } from "app/redux/store";
import { LayerImg, LayersContainer } from "./Layers.styles";
import { LAYERS } from "app/constants";

export const Layers = () => {
  const { layers } = useAppSelector((state) => state.visual);
  console.log(layers);
  return (
    <LayersContainer>
      {layers.map((layer) => (
        <LayerImg src={`${LAYERS}${layer.layerProps.src}`} />
      ))}
    </LayersContainer>
  );
};

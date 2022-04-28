import React from "react";
import { selectPiece } from "../context/slice";
import { useDigitalArtContext } from "../context/useDigitalArtContext";
import { GalleryContainer } from "../StyledComponents";
import { Card } from "./../../../components";

export const DigitalArtGallery = () => {
  const { dispatch, pieces } = useDigitalArtContext();

  const onCardClick = (index: number) => {
    dispatch(selectPiece(index));
  };
  return (
    <GalleryContainer>
      {pieces.map((item, index) => (
        <Card
          key={index}
          cardDetails={{ title: item.title }}
          onClick={() => onCardClick(index)}
        />
      ))}
    </GalleryContainer>
  );
};

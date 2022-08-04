import React from "react";
import { selectPiece } from "../context/slice";
import { useDigitalArtContext } from "../context/useDigitalArtContext";
import { GalleryContainer } from "../StyledComponents";
import { Card } from "../../../components";

const DIGITAL_ART_CARD_IMAGE_URL = "../card-images";
export function DigitalArtGallery() {
  const { dispatch, pieces } = useDigitalArtContext();

  const onCardClick = (index: number) => {
    dispatch(selectPiece(index));
  };
  return (
    <GalleryContainer>
      {pieces.map(({ title, cardImageName }, index) => (
        <Card
          key={`${title}`}
          cardDetails={{
            title,
            imageUrl: `${DIGITAL_ART_CARD_IMAGE_URL}/${cardImageName}`,
          }}
          onClick={() => onCardClick(index)}
        />
      ))}
    </GalleryContainer>
  );
}

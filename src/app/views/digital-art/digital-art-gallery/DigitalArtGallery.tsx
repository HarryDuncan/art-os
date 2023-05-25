import React from "react";
import { GalleryContainer } from "../StyledComponents";
import { Card } from "../../../components";
import { useOnCardClick } from "./useOnCardClick";
import { useAppSelector } from "app/redux/store";

const DIGITAL_ART_CARD_IMAGE_URL = "../card-images";

export function DigitalArtGallery() {
  const { configuredScenes } = useAppSelector((state) => state.sceneData);
  const onCardClick = useOnCardClick();
  return (
    <GalleryContainer>
      {configuredScenes.map(({ title, cardImageName }, index) => (
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

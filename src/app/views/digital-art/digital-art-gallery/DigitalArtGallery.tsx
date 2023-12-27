import React from "react";
import { GalleryContainer } from "../StyledComponents";
import { Card } from "../../../components";
import { useOnCardClick } from "./useOnCardClick";
import { useAppSelector } from "app/redux/store";
import { Link } from "react-router-dom";
import { AppContainer } from "app/components/containers/AppContainer";

const DIGITAL_ART_CARD_IMAGE_URL = "../card-images";

export const DigitalArtGallery = () => {
  const { configuredScenes } = useAppSelector((state) => state.sceneData);
  const onCardClick = useOnCardClick();
  return (
    <AppContainer>
      <GalleryContainer>
        {configuredScenes.map(({ title, cardImageName, configId }, index) => (
          <Link to={`/digital-art/${configId}`} key={configId}>
            <Card
              cardDetails={{
                title,
                imageUrl: `${DIGITAL_ART_CARD_IMAGE_URL}/${cardImageName}`,
              }}
              onClick={() => onCardClick(index)}
            />
          </Link>
        ))}
      </GalleryContainer>
    </AppContainer>
  );
};

import React, { useRef, useState } from "react";
import { CardFooter, CardImage, CardTitle, CardWrapper } from "./Card.styles";

interface ICardDetails {
  title: string;
  imageUrl?: string;
}
interface ICardProps {
  cardDetails: ICardDetails;
  onClick?: () => void;
}

export const Card = ({ cardDetails, onClick }: ICardProps) => {
  const imgEl: any = useRef();

  const [isImageLoaded, updateIsImageLoaded] = useState<boolean>(
    !cardDetails.imageUrl
  );
  const [dimensions, updateDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const cardClicked = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <CardWrapper onClick={cardClicked}>
      {cardDetails.imageUrl && (
        <CardImage
          src={cardDetails.imageUrl}
          alt={cardDetails.title}
          ref={imgEl}
          onLoad={() => {
            updateDimensions({
              height: imgEl.current.naturalHeight,
              width: imgEl.current.naturalWidth,
            });
            updateIsImageLoaded(true);
          }}
        />
      )}
      <CardFooter>
        <CardTitle>{cardDetails.title}</CardTitle>
      </CardFooter>
    </CardWrapper>
  );
};

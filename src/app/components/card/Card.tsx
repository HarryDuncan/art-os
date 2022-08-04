import React, { useRef } from "react";
import { CardFooter, CardImage, CardTitle, CardWrapper } from "./Card.styles";

interface ICardDetails {
  title: string;
  imageUrl?: string;
}
interface ICardProps {
  cardDetails: ICardDetails;
  onClick?: () => void;
}

export function Card({ cardDetails, onClick }: ICardProps) {
  const imgElementRef = useRef<HTMLImageElement | null>(null);
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
          ref={imgElementRef}
        />
      )}
      <CardFooter>
        <CardTitle>{cardDetails.title}</CardTitle>
      </CardFooter>
    </CardWrapper>
  );
}

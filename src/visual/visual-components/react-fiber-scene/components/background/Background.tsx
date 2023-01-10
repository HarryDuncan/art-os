import React from "react";
import { BACKGROUND_TYPES } from "../../reactFiberScene.constants";
import { BackgroundProps } from "../../types";
import { MatcapBackground } from "./MatcapBackground";

export const Background = ({ props }: { props: BackgroundProps }) => {
  switch (props.type) {
    case BACKGROUND_TYPES.MATCAPBACKGROUND:
    default:
      const { texture, position, layers } = props;
      return (
        <MatcapBackground
          texture={texture}
          position={position}
          layers={layers}
        />
      );
  }
};

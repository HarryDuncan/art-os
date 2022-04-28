import { IAnimationWidgetScene } from "components/animation-widget/interfaces";
import { IPiece } from "../context/Context";

export const useFormatScene = (
  index: number | null,
  pieces: IPiece[]
): IAnimationWidgetScene[] => {
  if (!index) return [];
  const selectedPiece = pieces[index];
  const { sceneName, assets } = selectedPiece;
  return [
    {
      name: String(sceneName),
      assetUrls: assets,
    },
  ];
};

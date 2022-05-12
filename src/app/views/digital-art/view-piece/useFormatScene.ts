import { IAnimationWidgetScene } from "app/components/animation-widget/types";
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
      data: assets,
    },
  ];
};

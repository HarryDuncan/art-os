import { AnimationLoopProps } from "../animationloop.types";

export const formatLoopPropsWithDefault = (
  defaultLoopProps: AnimationLoopProps,
  parsedLoopProps: Partial<AnimationLoopProps>
) => {
  return { ...defaultLoopProps, ...parsedLoopProps };
};

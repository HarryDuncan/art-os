import { TransitionLoopProps } from "../../animationloop.types";
import { formatLoopPropsWithDefault } from "../../helpers/formatLoopPropsWithDefault";
import { DEFAULT_TRANSITION_LOOP_PROPS } from "./transitionLoop.consts";

export const transitionLoop = (transitionLoopProps: TransitionLoopProps) => {
  const { peak, trough } = formatLoopPropsWithDefault(
    DEFAULT_TRANSITION_LOOP_PROPS as TransitionLoopProps,
    transitionLoopProps
  );

  return (time: number) =>
    Math.max(Math.min(Math.cos(time * 0.2) * 1.0 + 0.5, peak), trough);
};

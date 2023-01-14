import { Binding, InteractionEventObject } from "./types";

export const getBoundInteractions = (
  interactions: InteractionEventObject[],
  bindingType: Binding
) => interactions.filter((interaction) => interaction.binding === bindingType);

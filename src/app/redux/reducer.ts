import { combineReducers, Reducer } from "redux";
import { reducer as visualReducer } from "./visual/slice";
import { reducer as sceneDataReducer } from "./scene-data/slice";
import { reducer as InteractionNodeReducer } from "./interaction-node/slice";

export type IGlobalState = ReturnType<typeof rootReducer>;

const appReducer = combineReducers({
  visual: visualReducer,
  sceneData: sceneDataReducer,
  interactionNode: InteractionNodeReducer,
});

export const rootReducer: Reducer<ReturnType<typeof appReducer>> = (
  state,
  action
) => appReducer(state, action);

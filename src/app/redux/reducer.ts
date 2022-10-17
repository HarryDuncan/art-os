import { combineReducers, Reducer } from "redux";
import { reducer as visualReducer } from "./visual/slice";

export type IGlobalState = ReturnType<typeof rootReducer>;

const appReducer = combineReducers({
  visual: visualReducer,
});

export const rootReducer: Reducer<ReturnType<typeof appReducer>> = (
  state,
  action
) => appReducer(state, action);

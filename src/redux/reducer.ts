import { combineReducers, Reducer } from "redux";
import digitalArtSlice from "./digital-art/digitalArt.slice";

export type IGlobalState = ReturnType<typeof rootReducer>;

const appReducer = combineReducers({
  digitalArtSlice,
});

export const rootReducer: Reducer<ReturnType<typeof appReducer>> = (
  state,
  action
) => {
  return appReducer(state, action);
};

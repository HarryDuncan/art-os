import { combineReducers, Reducer } from 'redux';

export type IGlobalState = ReturnType<typeof rootReducer>;

const appReducer = combineReducers({});

export const rootReducer: Reducer<ReturnType<typeof appReducer>> = (
  state,
  action,
) => appReducer(state, action);

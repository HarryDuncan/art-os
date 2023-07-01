export interface WindowStateContextProps {
  state: WindowState;
  dispatch: React.Dispatch<WindowStateAction>;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  windowSize: WindowSize;
  devicePixelRatio: number;
}

export type WindowStateAction =
  | { type: "SET_WINDOW_SIZE"; payload: WindowSize }
  | { type: "RESET_WINDOW_SIZE" }
  | { type: "SET_PIXEL_RATIO"; payload: number };

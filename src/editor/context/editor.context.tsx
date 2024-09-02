import { createContext, useReducer, useContext, ReactNode } from "react";

export type EditorState = {
  activeTools: string[];
};
const INITIAL_STATE: EditorState = {
  activeTools: [],
};

export type EditorActions =
  | {
      type: "SET_CURSOR";
      payload: { cursorId: string };
    }
  | { type: "SET_ACTIVE_TOOLS"; payload: { activeTools: string[] } };

type EditorContextType = {
  state: EditorState;
  dispatch: React.Dispatch<EditorActions>;
};
const EditorContext = createContext<EditorContextType | undefined>(undefined);

const reducer = (state: EditorState, action: EditorActions) => {
  switch (action.type) {
    case "SET_ACTIVE_TOOLS":
      return {
        ...state,
        activeTools: action.payload.activeTools,
      };
    default:
      return state;
  }
};

const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
};

const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within a Editor Provider");
  }

  return context;
};

export { EditorProvider, useEditorContext };

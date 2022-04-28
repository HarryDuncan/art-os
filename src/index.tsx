import React from "react";
import { App } from "./App";
import { createRoot } from "react-dom/client";

const mainElement = document.createElement("div");
document.body.appendChild(mainElement);

const root = createRoot(mainElement); // createRoot(container!) if you use TypeScript
root.render(<App />);

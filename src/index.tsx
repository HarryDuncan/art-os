import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const root = createRoot(mainElement); // createRoot(container!) if you use TypeScript
root.render(<App />);

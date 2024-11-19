import React from 'react';
import ReactDOM from 'react-dom/client';
import Canvas from './canvas';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Canvas></Canvas>
  </React.StrictMode>
);

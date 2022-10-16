import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { New } from 'components/New';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <New />
  </React.StrictMode>
);

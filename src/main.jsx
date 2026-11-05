// Legacy Vite entry point; the live Next.js app loads src/App.jsx through components/AgreementClient.jsx.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import './styles/editor.css';
import './styles/landing.css';
import './styles/print.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

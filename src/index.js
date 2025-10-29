import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambia aquí
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './Componentes/Temas/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Crear el root
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);


import React from 'react';
import { Routes, Route , useParams} from 'react-router-dom';
import LayoutConEncabezado from './Componentes/Layout/LayoutEncabezado.jsx';
import PaginaPrincipal from './Paginas/PaginaPrincipal';
import PaginaPrincipalAdministrativa from './Paginas/PaginaPrincipalAdministrativo';
import PaginaPrincipalCliente from './Paginas/PaginaPrincipalCliente';
import PaginaPrincipalRepartidor from './Paginas/PaginaPrincipalRepartidor';
import { ThemeProvider } from './Componentes/Temas/ThemeContext';
import { AuthProvider } from './Componentes/Autenticacion/AuthContext';
import Login from './Componentes/Autenticacion/Login';
import Registro from './Componentes/Autenticacion/Registro';
import VerificarCorreo from './Componentes/Autenticacion/VerificarCorreo';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LayoutConEncabezado>
          <Routes>
             {/* Rutas publicos*/}
            <Route path="/" element={<PaginaPrincipal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/verificar-correo" element={<VerificarCorreo />} />

             {/* Rutas administrador */}
            <Route path="/admin" element={<PaginaPrincipalAdministrativa />} />
             {/* Rutas clientes*/}
            <Route path="/cliente" element={<PaginaPrincipalCliente />} />

             {/* Rutas repartidor */}
            <Route path="/repartidor" element={<PaginaPrincipalRepartidor />} />

          </Routes>
        </LayoutConEncabezado>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
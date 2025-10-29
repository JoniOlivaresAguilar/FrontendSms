import React, { useState, useRef, useEffect } from 'react';
import { LogoutOutlined, HomeOutlined, FileTextOutlined, UserOutlined, ApartmentOutlined, TeamOutlined, ShopOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EncabezadoAdministrativo = () => {
  const [active, setActive] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get('https://backendreservas-m2zp.onrender.com/api/perfilF');
        const data = response.data;

        console.log('Datos recibidos del backend:', data); // Depuración

        setNombreEmpresa(data.NombreEmpresa || 'Nombre no disponible');
        setLogoUrl(data.Logo ? `data:image/jpeg;base64,${data.Logo}` : '');
      } catch (error) {
        console.error('Error al obtener datos del perfil:', error);
      }
    };

    fetchPerfil();
  }, []);

  const handleClick = (option) => {
    setActive(option);
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleMenuClick = (key) => {
    switch (key) {
      case "politicas":
        navigate('/admin/politicas');
        break;
      case "home":
        navigate('/admin/');
        break;
      case "terminos":
        navigate('/admin/terminos');
        break;
      case "perfil":
        navigate('/admin/perfil');
        break;
      case "mision":
        navigate('/admin/mision');
        break;
      case "vision":
        navigate('/admin/vision');
        break;
      case "Alojamientos":
        navigate('/admin/gestionhoteles');
        break;
      case "Usuarios":
        navigate('/admin/gestionusuarios');
        break;
      case "Reservas":
        navigate('/admin/gestionreservasad');
        break;
      case "Estadisticas":
        navigate('/admin/estadisticas');
        break;
      case "Promociones":
        navigate('/admin/gestionpromociones');
        break;
      case "MetodoPago":
        navigate('/admin/metodopago');
        break;
      case "PerfilUsuario":
        navigate('/admin/perfilusuario');
        break;
      case "cerrarSesion":
        handleLogout();
        break;
      default:
        console.log("No se reconoce la acción del menú");
    }
  };

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMobileMenuOpen(false);
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Backdrop para mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <header className="flex justify-between items-center px-4 py-5 bg-gradient-to-r from-slate-800 to-blue-900 text-white relative shadow-lg z-50">
        {/* Logo */}
        <div className="flex items-center flex-1">
          {logoUrl && <img src={logoUrl} alt="Logo de la Empresa" className="w-12 h-12 rounded-full mr-3 shadow-md" />}
          <h3 className="text-xl font-bold tracking-wide">{nombreEmpresa}</h3>
        </div>

        {/* Nav Desktop */}
        <nav className="hidden md:flex flex-1 justify-end ml-8" ref={menuRef}>
          <ul className="flex items-center gap-2 list-none m-0 p-0">
            <li 
              className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-2 text-base font-medium hover:bg-emerald-400/20 hover:shadow-md active:bg-blue-600 ${active === 'home' ? 'bg-blue-600 shadow-md' : ''}`}
              onClick={() => handleMenuClick('home')}
            >
              <HomeOutlined style={{ color: '#ec4899' }} />
              Home
            </li>
            
            {/* Dropdown Empresa */}
            <li className="group relative cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-2 text-base font-medium hover:bg-emerald-400/20 hover:shadow-md">
              <span onClick={() => toggleDropdown('empresa')}>
                <FileTextOutlined style={{ color: '#f97316' }} />
                Datos de la Empresa
              </span>
              <ul className="absolute left-0 top-full hidden group-hover:block bg-slate-800 rounded-lg shadow-xl mt-2 min-w-[200px] py-2 z-50 border border-slate-700">
                <li 
                  className="px-4 py-2 cursor-pointer hover:bg-emerald-400/30 transition-colors rounded"
                  onClick={() => { handleClick('perfil'); handleMenuClick('perfil'); }}
                >
                  Perfil
                </li>
                <li 
                  className="px-4 py-2 cursor-pointer hover:bg-emerald-400/30 transition-colors rounded"
                  onClick={() => { handleClick('terminos'); handleMenuClick('terminos'); }}
                >
                  Términos
                </li>
                <li 
                  className="px-4 py-2 cursor-pointer hover:bg-emerald-400/30 transition-colors rounded"
                  onClick={() => { handleClick('politicas'); handleMenuClick('politicas'); }}
                >
                  Políticas
                </li>
                <li 
                  className="px-4 py-2 cursor-pointer hover:bg-emerald-400/30 transition-colors rounded"
                  onClick={() => { handleClick('mision'); handleMenuClick('mision'); }}
                >
                  Misión
                </li>
                <li 
                  className="px-4 py-2 cursor-pointer hover:bg-emerald-400/30 transition-colors rounded"
                  onClick={() => { handleClick('vision'); handleMenuClick('vision'); }}
                >
                  Visión
                </li>
              </ul>
            </li>

            {/* Dropdown Gestión General */}
            <li className="group relative cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-2 text-base font-medium hover:bg-emerald-400/20 hover:shadow-md">
              <span onClick={() => toggleDropdown('gestiongeneral')}>
                <ShopOutlined style={{ color: '#0de222' }} />
                Gestión General
              </span>
              <ul className="absolute left-0 top-full hidden group-hover:block bg-slate-800 rounded-lg shadow-xl mt-2 min-w-[200px] py-2 z-50 border border-slate-700">
                <li 
                  className="px-4 py-2 cursor-pointer hover:bg-emerald-400/30 transition-colors rounded"
                  onClick={() => { handleClick('Alojamientos'); handleMenuClick('Alojamientos'); }}
                >
                  Hoteles
                </li>
                <li 
                  className="px-4 py-2 cursor-pointer hover:bg-emerald-400/30 transition-colors rounded"
                  onClick={() => { handleClick('Reservas'); handleMenuClick('Reservas'); }}
                >
                  Reservas
                </li>
                <li 
                  className="px-4 py-2 cursor-pointer hover:bg-emerald-400/30 transition-colors rounded"
                  onClick={() => { handleClick('Estadisticas'); handleMenuClick('Estadisticas'); }}
                >
                  Estadísticas
                </li>
                <li 
                  className="px-4 py-2 cursor-pointer hover:bg-emerald-400/30 transition-colors rounded"
                  onClick={() => { handleClick('Promociones'); handleMenuClick('Promociones'); }}
                >
                  Promociones
                </li>
                <li 
                  className="px-4 py-2 cursor-pointer hover:bg-emerald-400/30 transition-colors rounded"
                  onClick={() => { handleClick('MetodoPago'); handleMenuClick('MetodoPago'); }}
                >
                  Método de Pago
                </li>
              </ul>
            </li>

            <li 
              className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-2 text-base font-medium hover:bg-emerald-400/20 hover:shadow-md ${active === 'Usuarios' ? 'bg-blue-600 shadow-md' : ''}`}
              onClick={() => handleMenuClick('Usuarios')}
            >
              <TeamOutlined style={{ color: '#afb91e' }} />
              Gestión de Usuarios
            </li>

            <li 
              className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-2 text-base font-medium hover:bg-emerald-400/20 hover:shadow-md ${active === 'PerfilUsuario' ? 'bg-blue-600 shadow-md' : ''}`}
              onClick={() => handleMenuClick('PerfilUsuario')}
            >
              <UserOutlined style={{ color: '#91079d' }} />
              Perfil
            </li>

            <li 
              className="cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-2 text-base font-medium hover:bg-red-500/20 hover:shadow-md"
              onClick={() => handleMenuClick('cerrarSesion')}
            >
              <LogoutOutlined style={{ color: '#ef4444' }} />
              Cerrar Sesión
            </li>
          </ul>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex flex-col gap-1.5 cursor-pointer z-50" onClick={toggleMobileMenu}>
          <div className="w-6 h-0.5 bg-white rounded transition-transform duration-300"></div>
          <div className="w-6 h-0.5 bg-white rounded transition-transform duration-300"></div>
          <div className="w-6 h-0.5 bg-white rounded transition-transform duration-300"></div>
        </div>

        {/* Mobile Nav */}
        <nav 
          className={`md:hidden fixed top-0 left-0 w-3/4 h-full bg-slate-800 p-6 transform transition-transform duration-300 ease-in-out shadow-2xl z-50 overflow-y-auto flex flex-col ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`} 
          ref={menuRef}
        >
          <ul className="flex flex-col gap-2 list-none m-0 p-0 mt-20">
            <li 
              className={`cursor-pointer py-4 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2 text-base font-medium hover:bg-emerald-400/30 ${active === 'home' ? 'bg-blue-600' : ''}`}
              onClick={() => handleMenuClick('home')}
            >
              <HomeOutlined style={{ color: '#ec4899' }} />
              Home
            </li>
            
            {/* Mobile Dropdown Empresa */}
            <li className="relative cursor-pointer py-4 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2 text-base font-medium hover:bg-emerald-400/30">
              <span onClick={() => toggleDropdown('empresa')}>
                <FileTextOutlined style={{ color: '#f97316' }} />
                Datos de la Empresa
              </span>
              {openDropdown === 'empresa' && (
                <ul className="mt-2 ml-4 bg-slate-700 rounded-lg py-2 border-l-2 border-emerald-400">
                  <li 
                    className="px-4 py-2 cursor-pointer hover:bg-emerald-400/50 transition-colors rounded"
                    onClick={() => { handleClick('perfil'); handleMenuClick('perfil'); }}
                  >
                    Perfil
                  </li>
                  <li 
                    className="px-4 py-2 cursor-pointer hover:bg-emerald-400/50 transition-colors rounded"
                    onClick={() => { handleClick('terminos'); handleMenuClick('terminos'); }}
                  >
                    Términos
                  </li>
                  <li 
                    className="px-4 py-2 cursor-pointer hover:bg-emerald-400/50 transition-colors rounded"
                    onClick={() => { handleClick('politicas'); handleMenuClick('politicas'); }}
                  >
                    Políticas
                  </li>
                  <li 
                    className="px-4 py-2 cursor-pointer hover:bg-emerald-400/50 transition-colors rounded"
                    onClick={() => { handleClick('mision'); handleMenuClick('mision'); }}
                  >
                    Misión
                  </li>
                  <li 
                    className="px-4 py-2 cursor-pointer hover:bg-emerald-400/50 transition-colors rounded"
                    onClick={() => { handleClick('vision'); handleMenuClick('vision'); }}
                  >
                    Visión
                  </li>
                </ul>
              )}
            </li>

            {/* Mobile Dropdown Gestión General */}
            <li className="relative cursor-pointer py-4 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2 text-base font-medium hover:bg-emerald-400/30">
              <span onClick={() => toggleDropdown('gestiongeneral')}>
                <ShopOutlined style={{ color: '#0de222' }} />
                Gestión General
              </span>
              {openDropdown === 'gestiongeneral' && (
                <ul className="mt-2 ml-4 bg-slate-700 rounded-lg py-2 border-l-2 border-emerald-400">
                  <li 
                    className="px-4 py-2 cursor-pointer hover:bg-emerald-400/50 transition-colors rounded"
                    onClick={() => { handleClick('Alojamientos'); handleMenuClick('Alojamientos'); }}
                  >
                    Hoteles
                  </li>
                  <li 
                    className="px-4 py-2 cursor-pointer hover:bg-emerald-400/50 transition-colors rounded"
                    onClick={() => { handleClick('Reservas'); handleMenuClick('Reservas'); }}
                  >
                    Reservas
                  </li>
                  <li 
                    className="px-4 py-2 cursor-pointer hover:bg-emerald-400/50 transition-colors rounded"
                    onClick={() => { handleClick('Estadisticas'); handleMenuClick('Estadisticas'); }}
                  >
                    Estadísticas
                  </li>
                  <li 
                    className="px-4 py-2 cursor-pointer hover:bg-emerald-400/50 transition-colors rounded"
                    onClick={() => { handleClick('Promociones'); handleMenuClick('Promociones'); }}
                  >
                    Promociones
                  </li>
                  <li 
                    className="px-4 py-2 cursor-pointer hover:bg-emerald-400/50 transition-colors rounded"
                    onClick={() => { handleClick('MetodoPago'); handleMenuClick('MetodoPago'); }}
                  >
                    Método de Pago
                  </li>
                </ul>
              )}
            </li>

            <li 
              className={`cursor-pointer py-4 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2 text-base font-medium hover:bg-emerald-400/30 ${active === 'Usuarios' ? 'bg-blue-600' : ''}`}
              onClick={() => handleMenuClick('Usuarios')}
            >
              <TeamOutlined style={{ color: '#afb91e' }} />
              Gestión de Usuarios
            </li>

            <li 
              className={`cursor-pointer py-4 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2 text-base font-medium hover:bg-emerald-400/30 ${active === 'PerfilUsuario' ? 'bg-blue-600' : ''}`}
              onClick={() => handleMenuClick('PerfilUsuario')}
            >
              <UserOutlined style={{ color: '#91079d' }} />
              Perfil
            </li>

            <li 
              className="cursor-pointer py-4 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2 text-base font-medium hover:bg-red-500/30"
              onClick={() => handleMenuClick('cerrarSesion')}
            >
              <LogoutOutlined style={{ color: '#ef4444' }} />
              Cerrar Sesión
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default EncabezadoAdministrativo;
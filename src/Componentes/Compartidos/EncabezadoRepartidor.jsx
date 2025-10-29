import React, { useState, useRef, useEffect } from 'react';
import {
  LogoutOutlined,
  HomeOutlined,
  ShopOutlined,
  ApartmentOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EncabezadoRepartidor = () => {
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
      case "home":
        navigate('/propietario');
        break;
      case "altapropiedades":
        navigate('/propietario/hoteles');
        break;
      case "tiposhabitaciones":
        navigate('/propietario/tiposhabitaciones');
        break;
      case "Promociones":
        navigate('/propietario/promociones');
        break;
      case "GestionReservas":
        navigate('/propietario/gestionreservas');
        break;
      case "Reportes":
        navigate('/propietario/reportes');
        break;
      case "MiPerfil":
        navigate('/propietario/perfilusuario');
        break;
      case "ConexionMP":
        navigate('/propietario/conexionmp');
        break;
      case "cerrarSesion":
        handleLogout();
        break;
      default:
        console.log("No se reconoce la acción del menú");
    }
  };

  const handleLogout = () => {
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
      <style>{`
        :root {
          --color-primary: #000000;
          --color-secondary: #FFFFFF;
          --color-highlight: #4682B4;
          --color-hover: #A9DFBF;
          --color-mobile-bg: #000000;
          --color-mobile-text: #FFFFFF;
          --color-icon: #00B300;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 15px;
          background-color: #2d3e57;
          color: var(--color-secondary);
          position: relative;
          flex-wrap: wrap;
        }

        .logo {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .logo img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .logo h3 {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--color-secondary);
        }

        .menu {
          flex: 2;
          display: flex;
          justify-content: flex-end;
        }

        .menu ul {
          display: flex;
          gap: 15px;
          list-style-type: none;
          margin: 0;
          padding: 0;
        }

        .menu ul li {
          font-size: 1rem;
          cursor: pointer;
          padding: 8px 12px;
          color: var(--color-secondary);
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }

        .menu ul li:hover {
          background-color: var(--color-hover);
          border-radius: 5px;
        }

        .menu ul li.active {
          background-color: var(--color-highlight);
          border-radius: 5px;
        }

        .dropdown-menu {
          display: none;
          position: absolute;
          left: 0;
          top: 100%;
          background-color: var(--color-primary);
          list-style: none;
          padding: 12px;
          margin-top: 10px;
          border-radius: 5px;
          z-index: 10;
          min-width: 180px;
        }

        .dropdown:hover .dropdown-menu {
          display: block;
        }

        @media (max-width: 768px) {
          .dropdown:hover .dropdown-menu {
            display: none;
          }
        }

        .dropdown-menu li {
          padding: 8.5px 12px;
          cursor: pointer;
          color: var(--color-secondary);
        }

        .mobile-menu-icon {
          display: none;
          cursor: pointer;
          flex-direction: column;
          gap: 4px;
        }

        .hamburger {
          width: 25px;
          height: 3px;
          background-color: var(--color-secondary);
        }

        @media (max-width: 768px) {
          .menu ul {
            flex-direction: column;
            position: fixed;
            top: 0;
            left: -100%;
            width: 70%;
            height: 100%;
            background-color: var(--color-mobile-bg);
            padding: 20px;
            transition: left 0.3s ease-in-out;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
            z-index: 999;
            overflow-y: auto;
          }

          .menu.menu-open ul {
            left: 0;
          }

          .menu ul li {
            flex-direction: column;
            align-items: flex-start;
            padding: 20px;
            border-bottom: 1px solid var(--color-hover);
            color: var(--color-mobile-text);
          }

          .dropdown-menu {
            display: ${openDropdown ? 'block' : 'none'} !important;
            position: static !important;
            background-color: transparent !important;
            padding: 0 !important;
            margin-top: 10px;
          }

          .dropdown-menu li {
            padding: 10px 20px;
            background-color: var(--color-primary);
            color: var(--color-secondary);
            border-bottom: 1px solid var(--color-hover);
          }

          .mobile-menu-icon {
            display: flex;
          }
        }
      `}</style>

      <header className="header">
        <div className="logo">
          {logoUrl && <img src={logoUrl} alt="Logo de la Empresa" />}
          <h3>{nombreEmpresa}</h3>
        </div>
        <nav className={`menu ${isMobileMenuOpen ? 'menu-open' : ''}`} ref={menuRef}>
          <ul>
            <li onClick={() => handleMenuClick('home')}>
              <HomeOutlined style={{ color: 'pink' }} />
              Home
            </li>

            <li
              className="dropdown"
              onClick={() => toggleDropdown('altapropiedadess')}
            >
              <span>
                <ShopOutlined style={{ color: '#00B300' }} />
                Alta Propiedades
              </span>
              <ul className="dropdown-menu" style={{ display: openDropdown === 'altapropiedadess' ? 'block' : 'none' }}>
                <li onClick={() => { handleClick('altapropiedades'); handleMenuClick('altapropiedades'); }}>Hotel</li>
                <li onClick={() => { handleClick('tiposhabitaciones'); handleMenuClick('tiposhabitaciones'); }}>Tipos de Habitacion</li>
                <li onClick={() => { handleClick('ConexionMP'); handleMenuClick('ConexionMP'); }}>Mercado Pago</li>
              </ul>
            </li>

            <li
              className="dropdown"
              onClick={() => toggleDropdown('GestionReserva')}
            >
              <span>
                <ShopOutlined style={{ color: '#00B300' }} />
                Gestion
              </span>
              <ul className="dropdown-menu" style={{ display: openDropdown === 'GestionReserva' ? 'block' : 'none' }}>
                <li onClick={() => { handleClick('GestionReservas'); handleMenuClick('GestionReservas'); }}>Reservas</li>
                <li onClick={() => { handleClick('Reportes'); handleMenuClick('Reportes'); }}>Generar Reporte</li>
              </ul>
            </li>

            <li onClick={() => handleMenuClick('Promociones')}>
              <ApartmentOutlined style={{ color: 'var(--color-icon)' }} />
              Promociones
            </li>

            <li onClick={() => handleMenuClick('MiPerfil')}>
              <UserOutlined style={{ color: 'var(--color-icon)' }} />
              Perfil
            </li>

            <li onClick={() => handleMenuClick('cerrarSesion')}>
              <LogoutOutlined style={{ color: 'Red' }} />
              Cerrar Sesión
            </li>
          </ul>
        </nav>

        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
        </div>
      </header>
    </>
  );
};

export default EncabezadoRepartidor;

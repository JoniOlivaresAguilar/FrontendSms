import React, { useState, useRef, useEffect } from 'react';
import { HomeOutlined, LogoutOutlined, UserOutlined, ShopOutlined, CalendarOutlined, SecurityScanOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = "https://backendsms-qrg9.onrender.com";

const EncabezadoCliente = () => {
  const [active, setActive] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [showMFAModal, setShowMFAModal] = useState(false);
  const [qrData, setQrData] = useState('');
  const [isActivatingMFA, setIsActivatingMFA] = useState(false);
  const [mfaError, setMfaError] = useState('');
  const [mfaEnabled, setMfaEnabled] = useState(false); // Estado para rastrear si MFA está activado
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Cargar perfil y estado de MFA al montar el componente
  useEffect(() => {
    const fetchPerfilAndMFA = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        // Obtener datos del perfil
        const response = await axios.get(`${API_BASE_URL}/api/login/perfilF`, { // Corrección de ruta
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data;
        setNombreEmpresa(data.NombreEmpresa || 'Mi Dulcería');
        setLogoUrl(data.Logo ? `data:image/jpeg;base64,${data.Logo}` : '');

        // Verificar estado de MFA
        const mfaResponse = await axios.get(`${API_BASE_URL}/api/login/check-mfa`, { // Corrección de ruta
          headers: { Authorization: `Bearer ${token}` }
        });
        setMfaEnabled(mfaResponse.data.mfaEnabled);
      } catch (error) {
        console.error('Error al obtener datos del perfil o MFA:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/');
        }
      }
    };

    fetchPerfilAndMFA();
  }, [navigate]);

  const handleClick = (option) => {
    setActive(option);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClick = async (key) => {
    switch (key) {
      case "home":
        navigate('/cliente/');
        break;
      case "hotelesc":
        navigate('/cliente/hotelesc');
        break;
      case "MisReservas":
        navigate('/cliente/historial-reservas');
        break;
      case "MiPerfil":
        navigate('/cliente/perfilusuario');
        break;
      case "activarMFA":
      case "desactivarMFA": // Manejar ambos casos
        handleToggleMFA();
        break;
      case "cerrarSesion":
        try {
          const token = localStorage.getItem('token');
          if (token) {
            await axios.post(`${API_BASE_URL}/api/logout`, {}, {
              headers: { Authorization: `Bearer ${token}` }
            });
          }
        } catch (error) {
          console.error('Error al cerrar sesión (API):', error);
        } finally {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/');
        }
        break;
      default:
        console.log("Opción no reconocida.");
    }
  };

  const handleToggleMFA = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes estar logueado para gestionar MFA.');
      return;
    }

    setIsActivatingMFA(true);
    setMfaError('');

    try {
      if (mfaEnabled) {
        // Desactivar MFA
        const response = await axios.post(`${API_BASE_URL}/api/login/disable-mfa`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('MFA desactivado:', response.data.message);
        setMfaEnabled(false); // Actualiza el estado inmediatamente
      } else {
        // Activar MFA
        const response = await axios.post(`${API_BASE_URL}/api/login/enable-mfa`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.qrDataUrl) {
          setQrData(response.data.qrDataUrl);
          setShowMFAModal(true);
          setMfaEnabled(true); // Actualiza estado después de activar
        }
      }
    } catch (error) {
      console.error('Error gestionando MFA:', error);
      setMfaError(error.response?.data?.error || 'Error al gestionar MFA. Asegúrate de que el token sea válido.');
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
      }
    } finally {
      setIsActivatingMFA(false);
    }
  };

  const handleConfirmMFA = async () => {
    setShowMFAModal(false);
    // No recargues la página, actualiza el estado directamente
    // window.location.reload(); // Comentado para evitar recarga innecesaria
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMobileMenuOpen(false);
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
          --color-primary: #8B4513;
          --color-secondary: #FFF8F0;
          --color-accent: #FF6B9D;
          --color-gold: #FFD700;
          --color-chocolate: #D2691E;
          --color-cream: #FFF5E1;
          --color-hover: #FFE4E1;
          --shadow-soft: 0 4px 12px rgba(139, 69, 19, 0.1);
          --shadow-deep: 0 8px 25px rgba(139, 69, 19, 0.15);
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 5%;
          background: linear-gradient(135deg, var(--color-primary) 0%, #A0522D 100%);
          color: var(--color-secondary);
          font-family: 'Poppins', 'Segoe UI', sans-serif;
          box-shadow: var(--shadow-soft);
          position: relative;
          z-index: 1000;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .logo img {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          border: 3px solid var(--color-gold);
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
          transition: transform 0.3s ease;
        }

        .logo img:hover {
          transform: scale(1.05);
        }

        .logo h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--color-secondary);
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
          margin: 0;
        }

        .menu ul {
          display: flex;
          gap: 8px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .menu ul li {
          font-size: 0.95rem;
          cursor: pointer;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--color-secondary);
          transition: all 0.3s ease;
          border-radius: 25px;
          font-weight: 500;
          position: relative;
          overflow: hidden;
        }

        .menu ul li::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .menu ul li:hover::before {
          left: 100%;
        }

        .menu ul li:hover {
          background-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .menu ul li.active {
          background-color: var(--color-secondary);
          color: var(--color-primary);
          box-shadow: var(--shadow-soft);
        }

        .mobile-menu-icon {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 4px;
          padding: 8px;
          border-radius: 5px;
          transition: background-color 0.3s;
        }

        .mobile-menu-icon:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .hamburger {
          width: 25px;
          height: 3px;
          background-color: var(--color-secondary);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .mobile-menu-icon.active .hamburger:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .mobile-menu-icon.active .hamburger:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-icon.active .hamburger:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(139, 69, 19, 0.7);
          z-index: 1499;
          backdrop-filter: blur(3px);
          transition: opacity 0.3s;
        }

        /* Modal para QR MFA */
        .mfa-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(139, 69, 19, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          backdrop-filter: blur(5px);
        }

        .mfa-modal-content {
          background: linear-gradient(135deg, var(--color-cream) 0%, #FFFFFF 100%);
          padding: 2.5rem;
          border-radius: 20px;
          max-width: 420px;
          width: 90%;
          text-align: center;
          box-shadow: var(--shadow-deep);
          border: 2px solid var(--color-gold);
        }

        .mfa-modal-content h3 {
          color: var(--color-primary);
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .mfa-qr {
          width: 200px;
          height: 200px;
          margin: 1.5rem auto;
          border: 3px solid var(--color-gold);
          border-radius: 12px;
          padding: 10px;
          background: white;
        }

        .mfa-btn {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-chocolate) 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          cursor: pointer;
          margin: 0.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(139, 69, 19, 0.3);
        }

        .mfa-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(139, 69, 19, 0.4);
        }

        .mfa-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .mfa-error {
          color: #e74c3c;
          font-size: 0.9rem;
          margin-top: 1rem;
          padding: 8px 12px;
          background: rgba(231, 76, 60, 0.1);
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .header {
            padding: 12px 20px;
          }

          .menu ul {
            display: none;
            flex-direction: column;
            position: fixed;
            top: 0;
            right: -100%;
            width: 280px;
            height: 100vh;
            background: linear-gradient(135deg, var(--color-primary) 0%, #8B4513 100%);
            padding: 80px 20px 20px;
            transition: right 0.3s ease-in-out;
            z-index: 2000;
            box-shadow: -5px 0 15px rgba(0,0,0,0.2);
          }

          .menu.menu-open ul {
            display: flex;
            right: 0;
          }

          .menu ul li {
            border-radius: 12px;
            margin-bottom: 8px;
            padding: 14px 16px;
            font-size: 1rem;
          }

          .mobile-menu-icon {
            display: flex;
            z-index: 2001;
          }

          .logo h3 {
            font-size: 1.2rem;
          }
        }

        @media (min-width: 769px) {
          .menu-overlay {
            display: none;
          }
        }
      `}</style>

      {isMobileMenuOpen && (
        <div className="menu-overlay" onClick={toggleMobileMenu}></div>
      )}

      {showMFAModal && (
        <div className="mfa-modal" onClick={(e) => e.target === e.currentTarget && setShowMFAModal(false)}>
          <div className="mfa-modal-content">
            <h3>Activar Autenticación de Dos Factores</h3>
            <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.4', marginBottom: '1rem' }}>
              Escanea este código QR con Google Authenticator o una app similar para activar la autenticación de dos factores.
            </p>
            {qrData && <img src={qrData} alt="QR para MFA" className="mfa-qr" />}
            {mfaError && <p className="mfa-error">{mfaError}</p>}
            <div style={{ marginTop: '1.5rem' }}>
              <button onClick={handleConfirmMFA} className="mfa-btn" disabled={isActivatingMFA}>
                {isActivatingMFA ? 'Activando...' : 'Cerrar y Activar'}
              </button>
              <button onClick={() => setShowMFAModal(false)} className="mfa-btn" style={{ background: 'linear-gradient(135deg, #666 0%, #999 100%)' }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="header">
        <div className="logo">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo de la Dulcería" />
          ) : (
            <div style={{
              width: '55px',
              height: '55px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid var(--color-gold)',
              color: 'var(--color-primary)',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              🍬
            </div>
          )}
          <h3>{nombreEmpresa}</h3>
        </div>
        
        <nav className={`menu ${isMobileMenuOpen ? 'menu-open' : ''}`} ref={menuRef}>
          <ul>
            <li className={active === 'home' ? 'active' : ''} onClick={() => { handleClick('home'); handleMenuClick('home'); }}>
              <HomeOutlined style={{ color: '#FFD700' }} />
              Inicio
            </li>
            <li onClick={() => { handleClick('hotelesc'); handleMenuClick('hotelesc'); }}>
              <ShopOutlined style={{ color: '#FF6B9D' }} />
              Productos
            </li>
            <li onClick={() => { handleClick('MisReservas'); handleMenuClick('MisReservas'); }}>
              <CalendarOutlined style={{ color: '#A9DFBF' }} />
              Mis Pedidos
            </li>
            <li onClick={() => { handleClick('MiPerfil'); handleMenuClick('MiPerfil'); }}>
              <UserOutlined style={{ color: '#85C1E9' }} />
              Perfil
            </li>
            <li className={active === 'cerrarSesion' ? 'active' : ''} onClick={() => { handleClick('cerrarSesion'); handleMenuClick('cerrarSesion'); }}>
              <LogoutOutlined style={{ color: '#F1948A' }} />
              Cerrar Sesión
            </li>
          </ul>
        </nav>
        
        <div className={`mobile-menu-icon ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
        </div>
      </header>
    </>
  );
};

export default EncabezadoCliente;
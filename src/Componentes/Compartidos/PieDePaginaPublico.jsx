import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Layout, Typography } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  LockOutlined,
  FileDoneOutlined,
  EyeOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Text } = Typography;

// URL base del backend
const API_BASE_URL = "https://backendreservas-m2zp.onrender.com"; // Cambia esto a tu URL de backend

const PieDePagina = () => {
  const [datosEmpresa, setDatosEmpresa] = useState({
    redesSociales: {
      facebook: "",
      twitter: "",
      instagram: ""
    },
    telefono: "",
    correo: "",
    direccion: ""
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/perfilF`);
        console.log('Datos del perfil recibidos:', response.data);
        setDatosEmpresa({
          redesSociales: {
            facebook: response.data.facebook || "",
            twitter: response.data.twitter || "",
            instagram: response.data.instagram || ""
          },
          telefono: response.data.Telefono || "",
          correo: response.data.Correo || "",
          direccion: response.data.Direccion || ""
        });
      } catch (err) {
        console.error('Error fetching perfil:', err);
        setError("No se pudieron cargar los datos de la empresa.");
      }
    };

    fetchPerfil();
  }, []);

  if (error) {
    return <Text style={{ color: '#ffffff', textAlign: 'center' }}>{error}</Text>;
  }

  return (
    <Layout>
      <Footer style={{
        backgroundColor: ' #2C3E50',
        textAlign: 'center',
        padding: '40px 20px',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          width: '100%',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div>
            <h2 style={headerStyle}>Síguenos en nuestras redes sociales</h2>
            <a href={datosEmpresa.redesSociales.facebook || '#'} style={linkStyle} target="_blank" rel="noopener noreferrer">
              <FacebookOutlined style={facebookIconStyle} /> Facebook
            </a>
            <a href={datosEmpresa.redesSociales.twitter || '#'} style={linkStyle} target="_blank" rel="noopener noreferrer">
              <TwitterOutlined style={twitterIconStyle} /> Twitter
            </a>
            <a href={datosEmpresa.redesSociales.instagram || '#'} style={linkStyle} target="_blank" rel="noopener noreferrer">
              <InstagramOutlined style={instagramIconStyle} /> Instagram
            </a>
          </div>
          <div>
            <h2 style={headerStyle}>Atención al cliente</h2>
            <p style={textStyle}><PhoneOutlined style={phoneIconStyle} /> Teléfono: {datosEmpresa.telefono || 'No disponible'}</p>
            <p style={textStyle}><MailOutlined style={mailIconStyle} /> Correo electrónico: {datosEmpresa.correo || 'No disponible'}</p>
            <p style={textStyle}><EnvironmentOutlined style={environmentIconStyle} /> Ubicación: {datosEmpresa.direccion || 'No disponible'}</p>
          </div>
          <div>
            <h2 style={headerStyle}>Datos de la empresa</h2>
            <Link to="/politicaspca" style={linkStyle}><LockOutlined style={lockIconStyle} /> Política de Privacidad</Link>
            <Link to="/terminospca" style={linkStyle}><FileDoneOutlined style={fileDoneIconStyle} /> Términos y condiciones</Link>
            <Link to="/misionpca" style={linkStyle}><RocketOutlined style={rocketIconStyle} /> Misión</Link>
            <Link to="/visionpca" style={linkStyle}><EyeOutlined style={eyeIconStyle} /> Visión</Link>
          </div>
        </div>
      </Footer>
      <div style={{
        backgroundColor: '#333333',
        textAlign: 'center',
        padding: '20px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <Text style={{ color: '#ffffff', fontSize: '16px' }}>
          © {new Date().getFullYear()} Reserva de Alojamientos. Todos los derechos reservados.
        </Text>
      </div>
    </Layout>
  );
};

const linkStyle = {
  color: '#ffffff',
  fontSize: '16px',
  display: 'block',
  marginBottom: '10px',
  textDecoration: 'none'
};

const facebookIconStyle = {
  fontSize: '18px',
  marginRight: '5px',
  color: '#3B5998',
};

const twitterIconStyle = {
  fontSize: '18px',
  marginRight: '5px',
  color: '#1DA1F2',
};

const instagramIconStyle = {
  fontSize: '18px',
  marginRight: '5px',
  color: '#E1306C',
};

const phoneIconStyle = {
  fontSize: '18px',
  marginRight: '5px',
  color: '#2E8B57',
};

const mailIconStyle = {
  fontSize: '18px',
  marginRight: '5px',
  color: '#F28C38',
};

const environmentIconStyle = {
  fontSize: '18px',
  marginRight: '5px',
  color: '#6A0DAD',
};

const lockIconStyle = {
  fontSize: '18px',
  marginRight: '5px',
  color: '#FF0000',
};

const fileDoneIconStyle = {
  fontSize: '18px',
  marginRight: '5px',
  color: '#008080',
};

const rocketIconStyle = {
  fontSize: '18px',
  marginRight: '5px',
  color: '#00FFFF',
};

const eyeIconStyle = {
  fontSize: '18px',
  marginRight: '5px',
  color: '#FFFF00',
};

const textStyle = {
  color: '#ffffff',
  fontSize: '16px',
  marginBottom: '10px'
};

const headerStyle = {
  color: '#ffffff',
  fontSize: '18px',
  marginBottom: '10px',
};

export default PieDePagina;
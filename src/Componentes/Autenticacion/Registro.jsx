import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import zxcvbn from "zxcvbn";
import sha1 from "js-sha1";

const MySwal = withReactContent(Swal);

// URL base del backend (ajustada para local; cambia si usas Render)
const API_BASE_URL = "https://backendsms-qrg9.onrender.com";

function RegistroUsuarios() {
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellidopa: "",
    apellidoma: "",
    telefono: "",
    correo: "",
    password: "",
    tipousuario: "",
    preguntaSecreta: "",
    respuestaSecreta: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      const strength = zxcvbn(value);
      setPasswordStrength(strength.score);
      validatePassword(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errors = { ...formErrors };

    if (name === "nombre" || name === "apellidopa" || name === "apellidoma") {
      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{4,16}$/;
      if (!nameRegex.test(value)) {
        errors[name] = "Solo letras entre 4 y 16 caracteres.";
      } else {
        delete errors[name];
      }
    }

    if (name === "telefono") {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value)) {
        errors[name] = "Contener exactamente 10 dígitos.";
      } else {
        delete errors[name];
      }
    }

    if (name === "password") {
      const passwordRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,15}$/;
      if (!passwordRegex.test(value)) {
        errors[name] = "Tener entre 8 y 15 caracteres.";
      } else {
        delete errors[name];
      }
    }

    if (name === "correo") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors[name] = "Introduce un correo electrónico válido.";
      } else {
        delete errors[name];
      }
    }

    if (name === "tipousuario") {
      if (!["Cliente", "Propietario"].includes(value)) {
        errors[name] = "Selecciona un tipo de usuario válido.";
      } else {
        delete errors[name];
      }
    }

    if (name === "preguntaSecreta") {
      if (!value) {
        errors[name] = "Selecciona una pregunta de seguridad.";
      } else {
        delete errors[name];
      }
    }

    if (name === "respuestaSecreta") {
      if (value.length < 3) {
        errors[name] = "Mínimo 3 caracteres.";
      } else {
        delete errors[name];
      }
    }

    setFormErrors(errors);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const commonPatterns = ["12345", "password", "qwerty", "abcdef"];
    let errorMessage = "";

    if (password.length < minLength) {
      errorMessage = `La contraseña debe tener al menos ${minLength} caracteres.`;
    }

    for (const pattern of commonPatterns) {
      if (password.toLowerCase().includes(pattern)) {
        errorMessage = "Evita usar secuencias comunes como '12345' o 'password'.";
        MySwal.fire({
          icon: "error",
          title: "Contraseña no válida",
          text: errorMessage,
        });
        break;
      }
    }

    setPasswordError(errorMessage);
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const checkPasswordCompromised = async (password) => {
    const hash = sha1(password);
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);

    try {
      const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
      const compromised = response.data.includes(suffix.toUpperCase());
      return compromised;
    } catch (error) {
      console.error("Error al verificar la contraseña en HIBP:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Datos enviados al backend:", formData);

    const isValidForm = Object.keys(formErrors).length === 0;

    if (!isValidForm || passwordError) {
      MySwal.fire({
        icon: "error",
        title: "Errores en el formulario",
        text: passwordError || "Por favor, corrige los errores antes de continuar.",
      });
      setIsLoading(false);
      return;
    }

    const isCompromised = await checkPasswordCompromised(formData.password);
    if (isCompromised) {
      MySwal.fire({
        icon: "error",
        title: "Contraseña comprometida",
        text: "Esta contraseña ha sido filtrada en brechas de datos. Por favor, elige otra.",
      });
      setIsLoading(false);
      return;
    }

    const dataToSend = {
      nombre: formData.nombre,
      apellidopa: formData.apellidopa,
      apellidoma: formData.apellidoma,
      correo: formData.correo,
      telefono: formData.telefono,
      password: formData.password,
      tipousuario: formData.tipousuario,
      preguntaSecreta: formData.preguntaSecreta,
      respuestaSecreta: formData.respuestaSecreta,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/registro`, dataToSend);
      console.log("Respuesta del backend:", response.data);
      MySwal.fire({
        title: "¡Registro exitoso!",
        text: "Tu registro se realizó correctamente. Por favor revisa tu correo para verificar tu cuenta.",
        icon: "success",
        confirmButtonText: "Aceptar",
        background: '#f0fdf4',
        iconColor: '#22c55e'
      });
      navigate("/verificar-correo");
    } catch (error) {
      console.error("Error al registrar el usuario:", error.response ? error.response.data : error.message);
      if (error.response && error.response.data.error) {
        MySwal.fire({
          icon: "error",
          title: "Error en el registro",
          text: error.response.data.error,
          background: '#fef2f2',
          iconColor: '#ef4444'
        });
      } else {
        MySwal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "No te pudiste registrar. Por favor, intenta de nuevo.",
          background: '#fef2f2',
          iconColor: '#ef4444'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
        return "Muy Débil";
      case 1:
        return "Débil";
      case 2:
        return "Regular";
      case 3:
        return "Fuerte";
      case 4:
        return "Muy Fuerte";
      default:
        return "";
    }
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 0:
        return "#ef4444";
      case 1:
        return "#f97316";
      case 2:
        return "#eab308";
      case 3:
        return "#3b82f6";
      case 4:
        return "#22c55e";
      default:
        return "#d1d5db";
    }
  };

  const getStrengthTextColor = (strength) => {
    switch (strength) {
      case 0:
        return "#dc2626";
      case 1:
        return "#ea580c";
      case 2:
        return "#ca8a04";
      case 3:
        return "#2563eb";
      case 4:
        return "#16a34a";
      default:
        return "#6b7280";
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="form-wrapper">
          {/* Lado izquierdo - Información */}
          <div className="info-panel">
            <div className="info-content">
              <h1 className="welcome-title">¡Bienvenido!</h1>
              <p className="welcome-text">
                Únete a nuestra comunidad y descubre todas las ventajas de tener una cuenta.
              </p>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span className="feature-text">Registro seguro y rápido</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span className="feature-text">Protección de datos</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span className="feature-text">Soporte 24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lado derecho - Formulario */}
          <div className="form-panel">
            <div className="form-header">
              <h2 className="form-title">Crear Cuenta</h2>
              <p className="form-subtitle">Completa tus datos para registrarte</p>
            </div>

            <form className="registration-form" onSubmit={handleSubmit}>
              <div className="input-grid">
                <div className="input-group">
                  <label className="input-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className={`form-input ${formErrors.nombre ? 'error' : ''}`}
                    required
                  />
                  {formErrors.nombre && <p className="error-message"><span>⚠</span> {formErrors.nombre}</p>}
                </div>

                <div className="input-group">
                  <label className="input-label">Apellido Paterno</label>
                  <input
                    type="text"
                    name="apellidopa"
                    value={formData.apellidopa}
                    onChange={handleChange}
                    placeholder="Apellido paterno"
                    className={`form-input ${formErrors.apellidopa ? 'error' : ''}`}
                    required
                  />
                  {formErrors.apellidopa && <p className="error-message"><span>⚠</span> {formErrors.apellidopa}</p>}
                </div>

                <div className="input-group">
                  <label className="input-label">Apellido Materno</label>
                  <input
                    type="text"
                    name="apellidoma"
                    value={formData.apellidoma}
                    onChange={handleChange}
                    placeholder="Apellido materno"
                    className={`form-input ${formErrors.apellidoma ? 'error' : ''}`}
                    required
                  />
                  {formErrors.apellidoma && <p className="error-message"><span>⚠</span> {formErrors.apellidoma}</p>}
                </div>

                <div className="input-group">
                  <label className="input-label">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="10 dígitos"
                    maxLength={10}
                    className={`form-input ${formErrors.telefono ? 'error' : ''}`}
                    required
                  />
                  {formErrors.telefono && <p className="error-message"><span>⚠</span> {formErrors.telefono}</p>}
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Correo Electrónico</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                  className={`form-input ${formErrors.correo ? 'error' : ''}`}
                  required
                />
                {formErrors.correo && <p className="error-message"><span>⚠</span> {formErrors.correo}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Contraseña</label>
                <div className="password-wrapper">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Crea una contraseña segura"
                    className={`form-input ${formErrors.password ? 'error' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={handlePasswordVisibility}
                    className="password-toggle"
                  >
                    {passwordVisible ? '👁 Ocultar' : '👁 Mostrar'}
                  </button>
                </div>
                {formErrors.password && <p className="error-message"><span>⚠</span> {formErrors.password}</p>}
                
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-header">
                      <span className="strength-label">Seguridad de la contraseña:</span>
                      <span className={`strength-text`} style={{ color: getStrengthTextColor(passwordStrength) }}>
                        {getPasswordStrengthText(passwordStrength)}
                      </span>
                    </div>
                    <div className="strength-bar">
                      <div 
                        className="strength-fill" 
                        style={{ 
                          width: `${((passwordStrength + 1) / 5) * 100}%`,
                          backgroundColor: getStrengthColor(passwordStrength)
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">Pregunta de Seguridad</label>
                <select
                  name="preguntaSecreta"
                  value={formData.preguntaSecreta}
                  onChange={handleChange}
                  className={`form-select ${formErrors.preguntaSecreta ? 'error' : ''}`}
                  required
                >
                  <option value="">Selecciona una pregunta</option>
                  <option value="¿Cuál es el nombre de tu primera mascota?">¿Cuál es el nombre de tu primera mascota?</option>
                  <option value="¿En qué ciudad naciste?">¿En qué ciudad naciste?</option>
                  <option value="¿Cuál es el nombre de tu escuela primaria?">¿Cuál es el nombre de tu escuela primaria?</option>
                </select>
                {formErrors.preguntaSecreta && <p className="error-message"><span>⚠</span> {formErrors.preguntaSecreta}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Respuesta de Seguridad</label>
                <input
                  type="text"
                  name="respuestaSecreta"
                  value={formData.respuestaSecreta}
                  onChange={handleChange}
                  placeholder="Tu respuesta"
                  className={`form-input ${formErrors.respuestaSecreta ? 'error' : ''}`}
                  required
                />
                {formErrors.respuestaSecreta && <p className="error-message"><span>⚠</span> {formErrors.respuestaSecreta}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Tipo de Usuario</label>
                <select
                  name="tipousuario"
                  value={formData.tipousuario}
                  onChange={handleChange}
                  className={`form-select ${formErrors.tipousuario ? 'error' : ''}`}
                  required
                >
                  <option value="">Selecciona tu tipo de usuario</option>
                  <option value="Cliente">Cliente</option>
                </select>
                {formErrors.tipousuario && <p className="error-message"><span>⚠</span> {formErrors.tipousuario}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`submit-btn ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Registrando...
                  </>
                ) : (
                  "Crear Cuenta"
                )}
              </button>
            </form>

            <div className="login-link">
              <p className="login-text">
                ¿Ya tienes una cuenta?{" "}
                <button 
                  onClick={() => navigate("/login")}
                  className="login-btn"
                >
                  Inicia sesión aquí
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .main-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to bottom right, #eff6ff, #ffffff, #f3e8ff);
          padding: 1rem;
        }

        @media (min-width: 768px) {
          .main-container {
            padding: 2rem;
          }
        }

        .form-wrapper {
          width: 100%;
          max-width: 80rem;
          display: flex;
          flex-direction: column;
          border-radius: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          background: white;
        }

        @media (min-width: 768px) {
          .form-wrapper {
            flex-direction: row;
          }
        }

        .info-panel {
          flex: 2;
          background: linear-gradient(to bottom right, #2563eb, #7c3aed);
          color: white;
          padding: 2rem;
        }

        @media (min-width: 768px) {
          .info-panel {
            flex: 2;
            padding: 3rem;
          }
        }

        .info-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }

        @media (min-width: 768px) {
          .info-content {
            text-align: left;
          }
        }

        .welcome-title {
          font-size: 2.25rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        @media (min-width: 768px) {
          .welcome-title {
            font-size: 2.5rem;
          }
        }

        .welcome-text {
          color: #dbeafe;
          font-size: 1.125rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .feature-icon {
          width: 2rem;
          height: 2rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
        }

        .feature-text {
          color: #dbeafe;
        }

        .form-panel {
          flex: 3;
          padding: 2rem;
        }

        @media (min-width: 768px) {
          .form-panel {
            padding: 3rem;
          }
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-title {
          font-size: 1.875rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        @media (min-width: 768px) {
          .form-title {
            font-size: 2.25rem;
          }
        }

        .form-subtitle {
          color: #6b7280;
        }

        .registration-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .input-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .input-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .input-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-input, .form-select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          font-size: 1rem;
          transition: all 0.2s ease;
          background: white;
        }

        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-input.error, .form-select.error {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .password-wrapper {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: color 0.2s ease;
          padding: 0;
        }

        .password-toggle:hover {
          color: #3b82f6;
        }

        .error-message {
          color: #ef4444;
          font-size: 0.75rem;
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .password-strength {
          margin-top: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .strength-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .strength-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: #4b5563;
        }

        .strength-text {
          font-size: 0.75rem;
          font-weight: bold;
        }

        .strength-bar {
          width: 100%;
          height: 0.5rem;
          background: #e5e7eb;
          border-radius: 9999px;
          overflow: hidden;
        }

        .strength-fill {
          height: 100%;
          border-radius: 9999px;
          transition: width 0.3s ease;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem 1.5rem;
          background: linear-gradient(to right, #2563eb, #7c3aed);
          color: white;
          font-weight: bold;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          transform: scale(1);
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(to right, #1d4ed8, #6d28d9);
          transform: scale(1.05);
          box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .login-link {
          text-align: center;
          margin-top: 1.5rem;
        }

        .login-text {
          color: #6b7280;
        }

        .login-btn {
          color: #2563eb;
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease;
          text-decoration: underline;
        }

        .login-btn:hover {
          color: #1d4ed8;
        }
      `}</style>
    </>
  );
}

export default RegistroUsuarios;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useAuth } from '../Autenticacion/AuthContext';

// Material UI Components
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowBack,
  Email,
  Lock,
  Phone as PhoneIcon,
  Login as LoginIcon,
} from '@mui/icons-material';

const MySwal = withReactContent(Swal);
const API_BASE_URL = "https://backendsms-qrg9.onrender.com";

function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
    userId: "",
    otpCode: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const steps = ['Credenciales', 'Verificación SMS'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  // Función para redirigir usuario
  const redirectUser = (tipoUsuario) => {
    console.log('🔀 Redirigiendo usuario tipo:', tipoUsuario);
    
    switch (tipoUsuario) {
      case 'Cliente':
        navigate('/cliente', { replace: true });
        break;
      case 'Administrador':
        navigate('/admin', { replace: true });
        break;
      case 'Repartidor':
        navigate('/repartidor', { replace: true });
        break;
      default:
        navigate('/', { replace: true });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.correo || !formData.password) {
      MySwal.fire({
        icon: "error",
        title: "Campos requeridos",
        text: "Ingresa tu correo y contraseña.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        correo: formData.correo,
        password: formData.password,
      });

      console.log('Respuesta del login:', response.data);

      if (response.data.token) {
        // Login sin MFA
        handleSuccessfulLogin(response.data);
      } else if (response.data.userId) {
        // Requiere MFA
        setFormData((prev) => ({ ...prev, userId: response.data.userId }));
        setStep(1);
        MySwal.fire({
          icon: "info",
          title: "Código enviado por SMS",
          text: "Revisa tu teléfono para el código de 6 dígitos.",
        });
      }
    } catch (error) {
      console.error("Error en login:", error);
      const errorMsg = error.response?.data?.error || "Error al iniciar sesión.";
      setError(errorMsg);
      MySwal.fire({
        icon: "error",
        title: "Error de login",
        text: errorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.otpCode || formData.otpCode.length !== 6) {
      MySwal.fire({
        icon: "error",
        title: "Código inválido",
        text: "Ingresa un código de 6 dígitos recibido por SMS.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login/verify-sms`, {
        userId: formData.userId,
        otpCode: formData.otpCode,
      });

      console.log('Respuesta OTP:', response.data);

      if (response.data.token) {
        handleSuccessfulLogin(response.data);
      }
    } catch (error) {
      console.error("Error verificando OTP:", error);
      const errorMsg = error.response?.data?.error || "Código OTP inválido.";
      setError(errorMsg);
      MySwal.fire({
        icon: "error",
        title: "Error de verificación",
        text: errorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessfulLogin = (data) => {
    console.log('✅ Login exitoso, datos:', data);
    
    // Actualizar contexto de autenticación
    authLogin(data.user, data.token);
    
    // Mostrar alerta de éxito y luego redirigir
    MySwal.fire({
      icon: "success",
      title: "¡Bienvenido!",
      text: "Sesión iniciada correctamente.",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      // Redirección después de que se cierra el alert
      redirectUser(data.user.TipoUsuario);
    });
  };

  const goBack = () => {
    setStep(0);
    setFormData({ correo: "", password: "", userId: "", otpCode: "" });
    setError("");
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Card
        elevation={8}
        sx={{
          width: '100%',
          borderRadius: 3,
          overflow: 'visible'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                width: 80,
                height: 80,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: 3
              }}
            >
              {step === 0 ? <LoginIcon fontSize="large" /> : <PhoneIcon fontSize="large" />}
            </Box>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              {step === 0 ? "Iniciar Sesión" : "Verificación SMS"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {step === 0
                ? "Ingresa tus credenciales para continuar"
                : "Ingresa el código de 6 dígitos recibido por SMS"
              }
            </Typography>
          </Box>

          {/* Stepper */}
          <Stepper activeStep={step} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Forms */}
          {step === 0 ? (
            <form onSubmit={handleLoginSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  name="correo"
                  type="email"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Contraseña"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Tu contraseña"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </Box>
            </form>
          ) : (
            <form onSubmit={handleOTPSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  label="Código OTP (6 dígitos)"
                  name="otpCode"
                  value={formData.otpCode}
                  onChange={handleChange}
                  placeholder="123456"
                  inputProps={{
                    maxLength: 6,
                    style: {
                      textAlign: 'center',
                      fontSize: '1.2rem',
                      letterSpacing: '0.5em'
                    }
                  }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />

                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Revisa tu teléfono para el código OTP enviado.
                </Typography>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading || formData.otpCode.length !== 6}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Confirmar Código"
                  )}
                </Button>

                <Box sx={{ textAlign: 'center', pt: 2 }}>
                  <Button
                    startIcon={<ArrowBack />}
                    onClick={goBack}
                    color="primary"
                  >
                    Volver a credenciales
                  </Button>
                </Box>
              </Box>
            </form>
          )}

          <Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">
              ¿No tienes cuenta?{" "}
              <Button
                onClick={() => navigate("/registro")}
                color="primary"
                sx={{ fontWeight: 'bold' }}
              >
                Regístrate aquí
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
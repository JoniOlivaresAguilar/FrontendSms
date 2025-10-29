import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Stack,
  CircularProgress,
  Alert,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Email,
  VerifiedUser,
  Refresh,
  ArrowBack,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const MySwal = withReactContent(Swal);
const API_BASE_URL = "https://backendsms-qrg9.onrender.com";

const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

function VerificacionCorreo() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) => {
    setVerificationCode(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!verificationCode) {
      MySwal.fire({
        icon: "error",
        title: "Código requerido",
        text: "Por favor introduce el código de verificación.",
      });
      setIsLoading(false);
      return;
    }

    try {
      console.log('Enviando solicitud de verificación para el código:', verificationCode);
      await axios.get(`${API_BASE_URL}/api/registro/verify/${verificationCode}`);
      
      MySwal.fire({
        icon: "success",
        title: "¡Correo verificado!",
        text: "Tu correo electrónico ha sido verificado exitosamente.",
        confirmButtonColor: theme.palette.primary.main,
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error("Error al verificar el código:", error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.error || "Ocurrió un error al verificar el código. Por favor, intenta de nuevo.";
      
      if (errorMessage === "La cuenta ya está verificada. Inicia sesión para continuar.") {
        MySwal.fire({
          icon: "info",
          title: "Cuenta ya verificada",
          text: "Redirigiendo al login.",
          confirmButtonColor: theme.palette.info.main,
        }).then(() => {
          navigate("/login");
        });
      } else {
        setError(errorMessage);
        MySwal.fire({
          icon: "error",
          title: "Error de verificación",
          text: errorMessage,
          confirmButtonColor: theme.palette.error.main,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      // Aquí iría la lógica para reenviar el código
      MySwal.fire({
        icon: "info",
        title: "Código reenviado",
        text: "Se ha enviado un nuevo código a tu correo electrónico.",
        confirmButtonColor: theme.palette.info.main,
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo reenviar el código. Intenta más tarde.",
        confirmButtonColor: theme.palette.error.main,
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.secondary.light, 0.1)} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        px: 2
      }}
    >
      <Container component="main" maxWidth="sm">
        <MotionPaper
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          elevation={8}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            background: 'white',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              py: 6,
              textAlign: 'center',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255,255,255,0.1)',
              }}
            />
            <MotionBox
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              sx={{ position: 'relative', zIndex: 1 }}
            >
              <Email sx={{ fontSize: 80, mb: 2, opacity: 0.9 }} />
              <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                Verificar Correo
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Introduce el código de verificación
              </Typography>
            </MotionBox>
          </Box>

          {/* Form */}
          <Box sx={{ p: 6 }}>
            <Stack spacing={4}>
              {error && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <Box>
                    <Typography variant="h6" gutterBottom fontWeight="600">
                      Código de verificación (6 dígitos)
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="000000"
                      value={verificationCode}
                      onChange={handleChange}
                      inputProps={{
                        maxLength: 6,
                        style: { 
                          textAlign: 'center', 
                          fontSize: '1.5rem',
                          letterSpacing: '0.5em',
                          fontFamily: 'monospace'
                        }
                      }}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          bgcolor: 'grey.50',
                          '&.Mui-focused': {
                            bgcolor: 'white',
                          }
                        }
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                      Revisa tu bandeja de entrada o spam
                    </Typography>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isLoading || verificationCode.length !== 6}
                    sx={{
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 4
                      },
                      '&:disabled': {
                        background: 'grey.400'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isLoading ? (
                      <Stack direction="row" spacing={2} alignItems="center">
                        <CircularProgress size={24} color="inherit" />
                        <Typography>Verificando...</Typography>
                      </Stack>
                    ) : (
                      <Stack direction="row" spacing={2} alignItems="center">
                        <VerifiedUser />
                        <Typography>Verificar Código</Typography>
                      </Stack>
                    )}
                  </Button>
                </Stack>
              </form>

              {/* Additional Actions */}
              <Stack spacing={3} sx={{ pt: 3, borderTop: 1, borderColor: 'divider' }}>
                <Button
                  startIcon={<Refresh />}
                  onClick={handleResendCode}
                  variant="outlined"
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 'bold'
                  }}
                >
                  ¿No recibiste el código? Reenviar
                </Button>
                
                <Button
                  startIcon={<ArrowBack />}
                  onClick={() => navigate("/login")}
                  variant="text"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 'bold'
                  }}
                >
                  Volver al Login
                </Button>
              </Stack>
            </Stack>
          </Box>
        </MotionPaper>

        {/* Decorative Elements */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          sx={{
            textAlign: 'center',
            mt: 4
          }}
        >
          <Typography variant="body2" color="text.secondary">
            ¿Necesitas ayuda?{" "}
            <Button 
              variant="text" 
              size="small" 
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main'
              }}
            >
              Contáctanos
            </Button>
          </Typography>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default VerificacionCorreo;
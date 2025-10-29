import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Cake,
  Icecream,
  Cookie,
  LocalShipping,
  Verified,
  Favorite,
} from '@mui/icons-material';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const PaginaPrincipal = () => {
  const categorias = [
    { nombre: 'Chocolates', icono: <Cookie />, color: '#8B4513' },
    { nombre: 'Gomitas', icono: <Favorite />, color: '#FF69B4' },
    { nombre: 'Pasteles', icono: <Cake />, color: '#FFB6C1' },
    { nombre: 'Helados', icono: <Icecream />, color: '#87CEEB' },
  ];

  const productos = [
    {
      nombre: 'Chocolate Premium',
      precio: '$150',
      imagen: '/placeholder.svg?height=200&width=200',
      categoria: 'Chocolates',
    },
    {
      nombre: 'Gomitas Frutales',
      precio: '$80',
      imagen: '/placeholder.svg?height=200&width=200',
      categoria: 'Gomitas',
    },
    {
      nombre: 'Pastel de Fresa',
      precio: '$350',
      imagen: '/placeholder.svg?height=200&width=200',
      categoria: 'Pasteles',
    },
    {
      nombre: 'Helado Artesanal',
      precio: '$120',
      imagen: '/placeholder.svg?height=200&width=200',
      categoria: 'Helados',
    },
    {
      nombre: 'Trufas de Chocolate',
      precio: '$200',
      imagen: '/placeholder.svg?height=200&width=200',
      categoria: 'Chocolates',
    },
    {
      nombre: 'Paletas Gourmet',
      precio: '$90',
      imagen: '/placeholder.svg?height=200&width=200',
      categoria: 'Helados',
    },
  ];

  const beneficios = [
    {
      icono: <LocalShipping sx={{ fontSize: 50 }} />,
      titulo: 'Envío Gratis',
      descripcion: 'En compras mayores a $500',
    },
    {
      icono: <Verified sx={{ fontSize: 50 }} />,
      titulo: 'Calidad Garantizada',
      descripcion: 'Productos frescos y certificados',
    },
    {
      icono: <Favorite sx={{ fontSize: 50 }} />,
      titulo: 'Hecho con Amor',
      descripcion: 'Recetas tradicionales y artesanales',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Box sx={{ bgcolor: '#FFF5F7', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <MotionBox
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{
            textAlign: 'center',
            mb: 8,
            p: 6,
            background: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)',
            borderRadius: 4,
            color: 'white',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            🍭 Dulcería Angelitos 🍬
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Los mejores dulces y postres para endulzar tu día
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: '#FF69B4',
              '&:hover': { bgcolor: '#FFF5F7' },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            Ver Catálogo
          </Button>
        </MotionBox>

        {/* Categorías */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            textAlign="center"
            gutterBottom
            fontWeight="bold"
            color="#8B4513"
            mb={4}
          >
            Nuestras Categorías
          </Typography>
          <Grid container spacing={3}>
            {categorias.map((categoria, index) => (
              <Grid item xs={6} md={3} key={index}>
                <MotionCard
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    cursor: 'pointer',
                    bgcolor: categoria.color,
                    color: 'white',
                    height: '100%',
                  }}
                >
                  <Box sx={{ fontSize: 60, mb: 2 }}>{categoria.icono}</Box>
                  <Typography variant="h6" fontWeight="bold">
                    {categoria.nombre}
                  </Typography>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Productos Destacados */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            textAlign="center"
            gutterBottom
            fontWeight="bold"
            color="#8B4513"
            mb={4}
          >
            Productos Destacados
          </Typography>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={4}>
              {productos.map((producto, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <MotionCard
                    variants={itemVariants}
                    whileHover={{ y: -10, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={producto.imagen}
                      alt={producto.nombre}
                    />
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <Chip
                        label={producto.categoria}
                        size="small"
                        sx={{ mb: 2, bgcolor: '#FFB6C1', color: 'white' }}
                      />
                      <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                        {producto.nombre}
                      </Typography>
                      <Typography variant="h5" color="#FF69B4" fontWeight="bold" mb={2}>
                        {producto.precio}
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          bgcolor: '#FF69B4',
                          '&:hover': { bgcolor: '#FF1493' },
                        }}
                      >
                        Agregar al Carrito
                      </Button>
                    </CardContent>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Beneficios */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            textAlign="center"
            gutterBottom
            fontWeight="bold"
            color="#8B4513"
            mb={4}
          >
            ¿Por Qué Elegirnos?
          </Typography>
          <Grid container spacing={4}>
            {beneficios.map((beneficio, index) => (
              <Grid item xs={12} md={4} key={index}>
                <MotionBox
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    bgcolor: 'white',
                    borderRadius: 3,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  <Box sx={{ color: '#FF69B4', mb: 2 }}>{beneficio.icono}</Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold" color="#8B4513">
                    {beneficio.titulo}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {beneficio.descripcion}
                  </Typography>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default PaginaPrincipal;
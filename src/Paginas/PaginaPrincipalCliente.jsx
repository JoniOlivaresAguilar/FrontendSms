"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
  Avatar,
} from "@mui/material"
import {
  Cake,
  Cookie,
  Favorite,
  Star,
  LocalShipping,
  Payment,
  Verified,
  TrendingUp,
  ShoppingCart,
  CardGiftcard,
} from "@mui/icons-material"

// Componente para animaciones con scroll
const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false,
    margin: "-100px",
    amount: 0.3,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

const PaginaPrincipalCliente = () => {
  const categorias = [
    {
      nombre: "Chocolates",
      icono: <Cake sx={{ fontSize: 40 }} />,
      color: "#8B4513",
      descripcion: "Deliciosos chocolates artesanales",
      imagen: "/chocolates-artesanales.jpg",
    },
    {
      nombre: "Gomitas",
      icono: <Cookie sx={{ fontSize: 40 }} />,
      color: "#FF1493",
      descripcion: "Gomitas de todos los sabores",
      imagen: "/gomitas-coloridas.jpg",
    },
    {
      nombre: "Paletas",
      icono: <CardGiftcard sx={{ fontSize: 40 }} />,
      color: "#FF6347",
      descripcion: "Paletas y piruletas variadas",
      imagen: "/paletas-dulces.jpg",
    },
    {
      nombre: "Caramelos",
      icono: <Star sx={{ fontSize: 40 }} />,
      color: "#FFD700",
      descripcion: "Caramelos clásicos y modernos",
      imagen: "/caramelos-variados.jpg",
    },
  ]

  const productosDestacados = [
    {
      nombre: "Caja de Chocolates Premium",
      precio: "$299",
      imagen: "/caja-chocolates-premium.jpg",
      rating: 5,
      reviews: 128,
      descuento: "20% OFF",
      nuevo: true,
    },
    {
      nombre: "Mix de Gomitas Importadas",
      precio: "$149",
      imagen: "/gomitas-importadas-mix.jpg",
      rating: 4.5,
      reviews: 95,
      descuento: null,
      nuevo: false,
    },
    {
      nombre: "Paletas Artesanales",
      precio: "$89",
      imagen: "/paletas-artesanales.jpg",
      rating: 4.8,
      reviews: 203,
      descuento: "15% OFF",
      nuevo: true,
    },
    {
      nombre: "Caramelos Vintage",
      precio: "$119",
      imagen: "/caramelos-vintage-retro.jpg",
      rating: 4.7,
      reviews: 156,
      descuento: null,
      nuevo: false,
    },
    {
      nombre: "Trufas de Chocolate",
      precio: "$349",
      imagen: "/trufas-chocolate-gourmet.jpg",
      rating: 5,
      reviews: 89,
      descuento: "10% OFF",
      nuevo: true,
    },
    {
      nombre: "Dulces Mexicanos",
      precio: "$179",
      imagen: "/dulces-mexicanos-tradicionales.jpg",
      rating: 4.9,
      reviews: 234,
      descuento: null,
      nuevo: false,
    },
  ]

  const beneficios = [
    {
      icono: <LocalShipping sx={{ fontSize: 50, color: "#FF69B4" }} />,
      titulo: "Envío Gratis",
      descripcion: "En compras mayores a $500",
    },
    {
      icono: <Payment sx={{ fontSize: 50, color: "#FF69B4" }} />,
      titulo: "Pago Seguro",
      descripcion: "Múltiples métodos de pago",
    },
    {
      icono: <Verified sx={{ fontSize: 50, color: "#FF69B4" }} />,
      titulo: "Calidad Garantizada",
      descripcion: "Productos 100% auténticos",
    },
    {
      icono: <Favorite sx={{ fontSize: 50, color: "#FF69B4" }} />,
      titulo: "Atención Personalizada",
      descripcion: "Servicio al cliente 24/7",
    },
  ]

  const testimonios = [
    {
      nombre: "María González",
      avatar: "/mujer-sonriente.jpg",
      comentario: "¡Los mejores dulces que he probado! La calidad es excepcional y el servicio es increíble.",
      rating: 5,
      fecha: "Hace 2 días",
    },
    {
      nombre: "Carlos Ramírez",
      avatar: "/hombre-feliz.jpg",
      comentario: "Excelente variedad de productos. Mis hijos están encantados con las gomitas importadas.",
      rating: 5,
      fecha: "Hace 1 semana",
    },
    {
      nombre: "Ana Martínez",
      avatar: "/young-woman.png",
      comentario: "Pedí chocolates para un regalo y quedaron fascinados. Definitivamente volveré a comprar.",
      rating: 4.5,
      fecha: "Hace 3 días",
    },
  ]

  const estadisticas = [
    { numero: "10,000+", label: "Clientes Felices", icono: <Favorite /> },
    { numero: "500+", label: "Productos", icono: <ShoppingCart /> },
    { numero: "15", label: "Años de Experiencia", icono: <Star /> },
    { numero: "98%", label: "Satisfacción", icono: <TrendingUp /> },
  ]

  return (
    <Box sx={{ bgcolor: "#FFF5F7", minHeight: "100vh", overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #FF69B4 0%, #FF1493 50%, #C71585 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <ScrollReveal>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  textAlign: "center",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                🍬 Dulcería Deliciosa 🍭
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  mb: 4,
                  fontSize: { xs: "1.2rem", md: "1.8rem" },
                  fontWeight: 300,
                }}
              >
                Los mejores dulces y chocolates para endulzar tu vida
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: "white",
                      color: "#FF1493",
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      "&:hover": { bgcolor: "#FFF5F7" },
                    }}
                  >
                    Ver Productos
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    Ofertas Especiales
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </ScrollReveal>
        </Container>

        {/* Decorative elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            fontSize: "3rem",
          }}
        >
          🍫
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            fontSize: "3rem",
          }}
        >
          🍭
        </motion.div>
      </Box>

      {/* Categorías */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <ScrollReveal>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 6,
              color: "#C71585",
            }}
          >
            Nuestras Categorías
          </Typography>
        </ScrollReveal>

        <Grid container spacing={4}>
          {categorias.map((categoria, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ScrollReveal delay={index * 0.1}>
                <motion.div whileHover={{ scale: 1.05, y: -10 }} whileTap={{ scale: 0.95 }}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 4,
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: categoria.color,
                        color: "white",
                        p: 3,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {categoria.icono}
                    </Box>
                    <CardMedia component="img" height="160" image={categoria.imagen} alt={categoria.nombre} />
                    <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                      <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                        {categoria.nombre}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {categoria.descripcion}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Productos Destacados */}
      <Box sx={{ bgcolor: "white", py: 8 }}>
        <Container maxWidth="lg">
          <ScrollReveal>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                textAlign: "center",
                mb: 2,
                color: "#C71585",
              }}
            >
              Productos Destacados
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                mb: 6,
                color: "text.secondary",
                fontWeight: 300,
              }}
            >
              Los favoritos de nuestros clientes
            </Typography>
          </ScrollReveal>

          <Grid container spacing={4}>
            {productosDestacados.map((producto, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ScrollReveal delay={index * 0.1}>
                  <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 3,
                        overflow: "hidden",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        transition: "all 0.3s ease",
                        position: "relative",
                        "&:hover": {
                          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                        },
                      }}
                    >
                      {producto.nuevo && (
                        <Chip
                          label="NUEVO"
                          color="error"
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            zIndex: 1,
                            fontWeight: 600,
                          }}
                        />
                      )}
                      {producto.descuento && (
                        <Chip
                          label={producto.descuento}
                          sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            zIndex: 1,
                            bgcolor: "#FFD700",
                            color: "#000",
                            fontWeight: 600,
                          }}
                        />
                      )}
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                        <CardMedia component="img" height="250" image={producto.imagen} alt={producto.nombre} />
                      </motion.div>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                          {producto.nombre}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Rating value={producto.rating} precision={0.5} readOnly size="small" />
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({producto.reviews})
                          </Typography>
                        </Box>
                        <Typography variant="h5" color="primary" fontWeight={700} sx={{ mb: 2, color: "#FF1493" }}>
                          {producto.precio}
                        </Typography>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant="contained"
                            fullWidth
                            sx={{
                              bgcolor: "#FF69B4",
                              "&:hover": { bgcolor: "#FF1493" },
                              py: 1,
                              fontWeight: 600,
                            }}
                          >
                            Agregar al Carrito
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScrollReveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Beneficios */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <ScrollReveal>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 6,
              color: "#C71585",
            }}
          >
            ¿Por qué elegirnos?
          </Typography>
        </ScrollReveal>

        <Grid container spacing={4}>
          {beneficios.map((beneficio, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ScrollReveal delay={index * 0.15}>
                <motion.div whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }} transition={{ duration: 0.3 }}>
                  <Card
                    sx={{
                      height: "100%",
                      textAlign: "center",
                      p: 3,
                      borderRadius: 3,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 8px 30px rgba(255,105,180,0.3)",
                        bgcolor: "#FFF5F7",
                      },
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      {beneficio.icono}
                    </motion.div>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={600} sx={{ mt: 2 }}>
                      {beneficio.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {beneficio.descripcion}
                    </Typography>
                  </Card>
                </motion.div>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Estadísticas */}
      <Box sx={{ bgcolor: "linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)", py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {estadisticas.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <ScrollReveal delay={index * 0.1}>
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                    <Box sx={{ textAlign: "center", color: "#C71585" }}>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Box sx={{ fontSize: 40, mb: 1, color: "#FF1493" }}>{stat.icono}</Box>
                      </motion.div>
                      <Typography variant="h3" component="div" fontWeight={700} sx={{ mb: 1 }}>
                        {stat.numero}
                      </Typography>
                      <Typography variant="h6" fontWeight={400}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                </ScrollReveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonios */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <ScrollReveal>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 2,
              color: "#C71585",
            }}
          >
            Lo que dicen nuestros clientes
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mb: 6,
              color: "text.secondary",
              fontWeight: 300,
            }}
          >
            Testimonios reales de personas felices
          </Typography>
        </ScrollReveal>

        <Grid container spacing={4}>
          {testimonios.map((testimonio, index) => (
            <Grid item xs={12} md={4} key={index}>
              <ScrollReveal delay={index * 0.15}>
                <motion.div whileHover={{ y: -10, rotate: [0, 1, -1, 0] }} transition={{ duration: 0.3 }}>
                  <Card
                    sx={{
                      height: "100%",
                      p: 3,
                      borderRadius: 3,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 8px 30px rgba(255,105,180,0.2)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar src={testimonio.avatar} alt={testimonio.nombre} sx={{ width: 60, height: 60, mr: 2 }} />
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {testimonio.nombre}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {testimonio.fecha}
                        </Typography>
                      </Box>
                    </Box>
                    <Rating value={testimonio.rating} precision={0.5} readOnly sx={{ mb: 2 }} />
                    <Typography variant="body1" color="text.secondary" sx={{ fontStyle: "italic" }}>
                      "{testimonio.comentario}"
                    </Typography>
                  </Card>
                </motion.div>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Final */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #C71585 0%, #FF1493 50%, #FF69B4 100%)",
          color: "white",
          py: 10,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <ScrollReveal>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                ¿Listo para endulzar tu día?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, fontWeight: 300 }}>
                Descubre nuestra increíble selección de dulces y chocolates
              </Typography>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "white",
                    color: "#FF1493",
                    px: 6,
                    py: 2,
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    borderRadius: 3,
                    "&:hover": { bgcolor: "#FFF5F7" },
                  }}
                >
                  Comprar Ahora
                </Button>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </Container>
      </Box>
    </Box>
  )
}

export default PaginaPrincipalCliente

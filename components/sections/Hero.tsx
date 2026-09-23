"use client";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import Link from "next/link";
import { alpha, keyframes } from "@mui/material/styles";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { primary, secondary, gray } from "@/theme/tokens";

const AUTOPLAY_MS = 6000;

const SLIDES = [
  {
    id: "areas",
    eyebrow: "Nuestras áreas",
    headline: "Un lugar para servir en cada etapa de tu fe.",
    ctaLabel: "Conocer nuestras áreas",
    ctaHref: "#areas",
    imageUrl:
      "https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=1920&h=1080&fit=crop&q=80",
  },
  {
    id: "proyectos",
    eyebrow: "Proyectos activos",
    headline: "Construimos juntos lo que la comunidad necesita.",
    ctaLabel: "Ver proyectos",
    ctaHref: "/proyectos",
    imageUrl:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920&h=1080&fit=crop&q=80",
  },
  {
    id: "agenda",
    eyebrow: "Agenda y prédicas",
    headline: "Vive cada servicio, en persona o desde donde estés.",
    ctaLabel: "Ver agenda",
    ctaHref: "#agenda",
    imageUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&h=1080&fit=crop&q=80",
  },
] as const;

const progressAnim = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

export function Hero() {
  const total = SLIDES.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Parallax (fase 07, Dirección B elegida en /design): la foto se mueve
  // más lento que el scroll a medida que el Hero sale de vista. Se desactiva
  // con "reducir movimiento" (WCAG 2.3.3).
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallaxTransform = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const parallaxY = reduceMotion ? "0%" : parallaxTransform;

  // Autoplay del slider (WCAG 2.2.2): no corre si el usuario pidió reducir
  // movimiento ni mientras esté pausado con el control de abajo.
  const autoplayActive = !reduceMotion && !paused;

  useEffect(() => {
    if (!autoplayActive) return;
    const timer = setTimeout(() => {
      setIndex((current) => (current + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, total, autoplayActive]);

  const goTo = (next: number) => setIndex(((next % total) + total) % total);
  const slide = SLIDES[index];

  return (
    <Box
      ref={heroRef}
      component="section"
      aria-roledescription="carrusel"
      aria-label="Destacados de la iglesia"
      sx={{
        position: "relative",
        // Ocupa exactamente el resto del viewport bajo el navbar (feedback
        // directo del cliente): `--navbar-height` la publica el propio
        // `Navbar` (medida real vía `ResizeObserver`, no un valor fijo
        // adivinado) — con fallback a 72px por si el navbar no llegó a
        // montarse todavía (ej. primer paint). Es `minHeight`, no `height`,
        // así que en pantallas muy angostas el contenido igual puede
        // empujarlo más alto sin recortarse.
        minHeight: "calc(100vh - var(--navbar-height, 72px))",
        // Feedback de cliente: en pantallas muy altas/anchas (monitores
        // grandes, ultrawide) el Hero a 100vh se sentía excesivo — se limita
        // a 1024px de alto total (navbar + Hero), restando la misma
        // `--navbar-height` que ya usa `minHeight` arriba.
        maxHeight: "calc(1024px - var(--navbar-height, 72px))",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      {/* Foto de fondo — crossfade entre slides + parallax al hacer scroll
          (sobredimensionada ±10% para que el desplazamiento no revele bordes) */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ position: "absolute", top: "-10%", bottom: "-10%", left: 0, right: 0, y: parallaxY }}
        >
          <Image
            src={slide.imageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay navy — degradado horizontal para legibilidad del texto a la izquierda (mismo criterio que PhotoOverlayCard, D012) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(100deg,
            ${alpha(primary[900], 0.95)} 0%,
            ${alpha(primary[900], 0.82)} 35%,
            ${alpha(primary[900], 0.5)} 62%,
            ${alpha(primary[900], 0.22)} 100%)`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to top, ${alpha(primary[900], 0.55)} 0%, ${alpha(primary[900], 0)} 45%)`,
        }}
      />

      {/* Navegación manual — flechas, estilo "text button": sin fondo/borde en reposo, tenue background en hover (mismo criterio que los botones de texto del sistema) */}
      <IconButton
        onClick={() => goTo(index - 1)}
        aria-label="Slide anterior"
        sx={{
          position: "absolute",
          left: { xs: 8, md: 24 },
          top: "50%",
          transform: "translateY(-50%)",
          color: gray[50],
          bgcolor: "transparent",
          width: 40,
          height: 40,
          transition: "background-color 0.2s ease",
          "&:hover": { backgroundColor: alpha(gray[50], 0.14) },
        }}
      >
        <ChevronLeftRoundedIcon />
      </IconButton>
      <IconButton
        onClick={() => goTo(index + 1)}
        aria-label="Siguiente slide"
        sx={{
          position: "absolute",
          right: { xs: 8, md: 24 },
          top: "50%",
          transform: "translateY(-50%)",
          color: gray[50],
          bgcolor: "transparent",
          width: 40,
          height: 40,
          transition: "background-color 0.2s ease",
          "&:hover": { backgroundColor: alpha(gray[50], 0.14) },
        }}
      >
        <ChevronRightRoundedIcon />
      </IconButton>

      <Container maxWidth="lg" sx={{ position: "relative", pt: { xs: 14, md: 10 }, pb: { xs: 8, md: 10 } }}>
        {/* En pantallas grandes el bloque se ensancha para acompañar el
            headline más grande (64px) — antes quedaba encajado en 580px y el
            título se recortaba a 3 líneas apretadas. */}
        <Box sx={{ maxWidth: { xs: 580, xl: 720 }, "@media (min-width:1920px)": { maxWidth: 860 } }}>
          {/* Barras de progreso — indican slide activo y navegan (botones reales).
              + control de pausa/reproducción del autoplay (WCAG 2.2.2). */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 5, maxWidth: 260 }}>
            <Box sx={{ display: "flex", gap: 1, flex: 1 }} role="group" aria-label="Elegir destacado">
              {SLIDES.map((s, i) => (
                <Box
                  key={s.id}
                  component="button"
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ir al destacado ${i + 1} de ${total}: ${s.eyebrow}`}
                  aria-current={i === index ? "true" : undefined}
                  sx={{
                    flex: 1,
                    height: 6,
                    p: 0,
                    border: "none",
                    borderRadius: "999px",
                    bgcolor: alpha(gray[50], 0.22),
                    overflow: "hidden",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      height: 2.5,
                      width: i < index ? "100%" : "0%",
                      bgcolor: i < index ? alpha(gray[50], 0.55) : secondary[400],
                      ...(i === index &&
                        autoplayActive && {
                          animation: `${progressAnim} ${AUTOPLAY_MS}ms linear forwards`,
                        }),
                      ...(i === index && !autoplayActive && { width: "100%" }),
                    }}
                  />
                </Box>
              ))}
            </Box>
            <IconButton
              onClick={() => setPaused((p) => !p)}
              aria-label={autoplayActive ? "Pausar cambio automático de destacados" : "Reanudar cambio automático de destacados"}
              disabled={!!reduceMotion}
              sx={{
                color: gray[50],
                width: 28,
                height: 28,
                bgcolor: "transparent",
                "&:hover": { backgroundColor: alpha(gray[50], 0.14) },
                "&.Mui-disabled": { color: alpha(gray[50], 0.4) },
              }}
            >
              {autoplayActive ? <PauseRoundedIcon sx={{ fontSize: 16 }} /> : <PlayArrowRoundedIcon sx={{ fontSize: 16 }} />}
            </IconButton>
          </Box>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} de ${total}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Typography
                component="span"
                sx={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: 11,
                  "@media (min-width:1920px)": { fontSize: "13px" },
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: secondary[300],
                  mb: 1.5,
                }}
              >
                {slide.eyebrow}
              </Typography>

              <Typography
                component="h1"
                sx={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: { xs: "34px", md: "52px", xl: "58px" },
                  // En pantallas ≥1920px el texto se sentía chico — sube un
                  // peldaño más allá de lo que cubre el breakpoint. El bloque
                  // que lo contiene también se ensancha (ver arriba).
                  "@media (min-width:1920px)": { fontSize: "64px" },
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: gray[50],
                  mb: 4,
                  // Altura reservada para el headline más largo — evita que el
                  // CTA/stats salten de posición al cambiar de slide. Con el
                  // bloque más ancho en pantallas grandes entra en 2 líneas.
                  minHeight: { xs: "3.45em", xl: "2.7em" },
                }}
              >
                {slide.headline}
              </Typography>

              <Button
                component={Link}
                href={slide.ctaHref}
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: "6px",
                  px: 3,
                  color: gray[50],
                  borderColor: alpha(gray[50], 0.4),
                  "&:hover": {
                    borderColor: secondary[500],
                    color: secondary[300],
                    backgroundColor: alpha(secondary[500], 0.08),
                  },
                }}
              >
                {slide.ctaLabel}
              </Button>
            </motion.div>
          </AnimatePresence>

          {/* Stats — línea única minimalista, no cambia entre slides */}
          <Box
            sx={{
              mt: { xs: 5, md: 6 },
              pt: 2,
              borderTop: "1px solid",
              borderColor: alpha(gray[50], 0.15),
            }}
          >
            <Typography
              sx={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                "@media (min-width:1920px)": { fontSize: "14px" },
                letterSpacing: "0.02em",
                color: gray[300],
              }}
            >
              +400 personas · 5 áreas de servicio · 11 años sirviendo
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

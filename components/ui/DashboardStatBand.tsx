"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { keyframes } from "@mui/material/styles";
import { primary } from "@/theme/tokens";

const patternPan = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 160px 160px; }
`;

export interface DashboardStat {
  label: string;
  value: string;
  accent?: boolean;
}

export interface DashboardStatBandProps {
  stats: DashboardStat[];
  /** Fase 09 (D067) — skeleton en vez de las cifras mientras carga. */
  loading?: boolean;
}

/**
 * Banda de KPIs a pantalla completa, inmediatamente debajo de
 * `DashboardTopbar` — pieza central de la Opción B ("Panel Superior") del
 * comparativo de `/design`. Reutiliza el mismo navy sólido + patrón
 * geométrico en pan continuo ya usado en `TitheModal.tsx` (D048/D057) en
 * vez de inventar una textura nueva — mismo lenguaje "wow" de marca.
 */
export function DashboardStatBand({ stats, loading }: DashboardStatBandProps) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: primary[900],
        px: { xs: 3, md: 5 },
        py: { xs: 3.5, md: 4.5 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(245,246,250,0.05) 0px, rgba(245,246,250,0.05) 1px, transparent 1px, transparent 40px)",
          animation: `${patternPan} 24s linear infinite`,
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      />
      <Box sx={{ position: "relative", display: "flex", flexWrap: "wrap", rowGap: 3 }}>
        {stats.map((stat, index) => (
          <Box
            key={stat.label}
            sx={{
              flex: "1 1 200px",
              pl: index > 0 ? { xs: 0, sm: 4 } : 0,
              borderLeft: index > 0 ? { xs: "none", sm: "1px solid rgba(255,255,255,0.15)" } : "none",
            }}
          >
            <Typography
              sx={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                mb: 1.25,
              }}
            >
              {stat.label}
            </Typography>
            {loading ? (
              <Skeleton
                variant="text"
                width={90}
                sx={{ fontSize: { xs: 26, md: 34 }, bgcolor: "rgba(245,246,250,0.12)" }}
              />
            ) : (
              <Typography
                sx={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: { xs: 26, md: 34 },
                  color: stat.accent ? "secondary.main" : "#F5F6FA",
                }}
              >
                {stat.value}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

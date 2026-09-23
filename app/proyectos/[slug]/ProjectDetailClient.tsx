"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import PageNavbar from "@/components/layout/PageNavbar";
import Footer from "@/components/layout/Footer";
import { ProjectDetailContent } from "@/components/ui/ProjectDetailContent";
import { ProjectSidebar } from "@/components/ui/ProjectSidebar";
import { ProjectContributionForm, type ProjectContributionFormValues } from "@/components/ui/ProjectContributionForm";
import type { ProjectRecord } from "@/lib/projectsData";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonLd";
import { gray, semantic } from "@/theme/tokens";

/**
 * Parte interactiva de la página de detalle: botón "Aportar" del sidebar
 * abre un modal con `ProjectContributionForm` (D020) precargado con el
 * contexto del proyecto — mismo patrón que "Aportar" en Home/`/proyectos`
 * navega al detalle, y desde el detalle el aporte se resuelve sin salir de
 * la página.
 *
 * `onSubmit` es un placeholder (mismo criterio que `Tithe.tsx`, D042): no
 * procesa pago, solo confirma con un `Snackbar` — la integración de pago
 * real queda fuera de alcance de esta fase.
 */
export function ProjectDetailClient({ project }: { project: ProjectRecord }) {
  const [contributeOpen, setContributeOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const isCompleted = project.status === "completed";

  function handleContribute(values: ProjectContributionFormValues) {
    // Placeholder — sin proveedor de pago integrado (fuera de alcance, D042).
    console.log("Aporte a proyecto:", { slug: project.slug, ...values });
    setContributeOpen(false);
    setConfirmed(true);
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Proyectos", path: "/proyectos" },
          { name: project.title, path: `/proyectos/${project.slug}` },
        ])}
      />
      <PageNavbar />

      <Box component="main" id="main-content" sx={{ py: { xs: 6, md: 9 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 340px" },
              gap: { xs: 6, md: 8 },
              alignItems: "start",
            }}
          >
            <ProjectDetailContent
              title={project.title}
              description={project.longDescription}
              imageUrl={project.imageUrl}
              budget={project.budget}
            />

            <ProjectSidebar
              status={project.status}
              currentAmount={project.currentAmount}
              goalAmount={project.goalAmount}
              deadlineLabel={project.deadlineLabel}
              encargados={project.encargados}
              onCtaClick={() => (isCompleted ? undefined : setContributeOpen(true))}
            />
          </Box>
        </Container>
      </Box>

      <Footer />

      <Dialog
        open={contributeOpen}
        onClose={() => setContributeOpen(false)}
        maxWidth="xs"
        fullWidth
        aria-label={`Aportar a "${project.title}"`}
        slotProps={{ paper: { sx: { backgroundImage: "none", m: { xs: 2, sm: 4 } } } }}
      >
        <IconButton
          onClick={() => setContributeOpen(false)}
          aria-label="Cerrar"
          sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, color: "text.secondary" }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
        <DialogContent sx={{ p: { xs: 2.5, sm: 4 }, display: "flex", justifyContent: "center" }}>
          <ProjectContributionForm
            projectTitle={project.title}
            projectImageUrl={project.imageUrl}
            currentAmount={project.currentAmount}
            goalAmount={project.goalAmount}
            onSubmit={handleContribute}
          />
        </DialogContent>
      </Dialog>

      <Snackbar open={confirmed} autoHideDuration={5000} onClose={() => setConfirmed(false)}>
        <Alert
          onClose={() => setConfirmed(false)}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            bgcolor: semantic.successFilled,
            color: gray[50],
            "& .MuiAlert-icon, & .MuiAlert-action": { color: gray[50] },
          }}
        >
          ¡Gracias por tu aporte a &quot;{project.title}&quot;!
        </Alert>
      </Snackbar>
    </>
  );
}

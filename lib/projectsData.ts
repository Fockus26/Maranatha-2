import type { ProjectStatus } from "@/components/ui/ProjectCard";

/**
 * Fuente única de datos de proyectos (fase 07) — usada por el listado
 * (`/proyectos`), el detalle (`/proyectos/[slug]`) y el dashboard
 * (`/dashboard`, `/dashboard/proyectos`).
 *
 * Los primeros 3 (`techo-para-el-salon-multiusos`, `equipamiento-para-el-area-de-ninos`,
 * `campana-de-bautismos-2025`) son los mismos que ya se muestran como destacados en
 * Home (`components/sections/Projects.tsx`, D041) — mismos montos y estado, para que
 * el link "Aportar"/"Ver proyecto" de Home lleve a una página de detalle consistente.
 * Se agregan 3 proyectos más para que el listado completo no se sienta idéntico al
 * resumen de Home.
 *
 * Todo el contenido (fotos, montos, presupuesto, encargados) es **placeholder** —
 * pendiente de que el cliente entregue los proyectos reales (mismo criterio que D041).
 * No hay backend: el dashboard opera sobre este mismo array en memoria (estado local
 * de React), se pierde al recargar — placeholder hasta que exista persistencia real.
 */

export interface BudgetLine {
  label: string;
  amount: number;
}

export interface Encargado {
  name: string;
  role: string;
  imageUrl: string;
  instagramUrl?: string;
}

export interface ProjectRecord {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  status: ProjectStatus;
  currentAmount: number;
  goalAmount: number;
  deadline: string;
  deadlineLabel: string;
  budget: BudgetLine[];
  encargados: Encargado[];
}

export const PROJECTS: ProjectRecord[] = [
  {
    slug: "techo-para-el-salon-multiusos",
    title: "Techo para el salón multiusos",
    description:
      "Reemplazamos el techo del salón que usamos para jóvenes, conferencias y eventos comunitarios — hoy tiene filtraciones cada temporada de lluvia.",
    longDescription:
      "El salón multiusos es el espacio donde se reúnen Jóvenes, se dictan talleres y se realizan la mayoría de nuestros eventos comunitarios. Con el paso de los años el techo original comenzó a filtrar agua en la temporada de lluvias, dañando el piso y el equipo de sonido. Este proyecto cubre el reemplazo completo de la estructura del techo, impermeabilización y reparación de las zonas ya afectadas, para que el espacio vuelva a estar disponible todo el año sin riesgos.",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop&q=80",
    status: "active",
    currentAmount: 3200,
    goalAmount: 8000,
    deadline: "2026-12-15",
    deadlineLabel: "15 dic 2026",
    budget: [
      { label: "Estructura y materiales", amount: 4800 },
      { label: "Mano de obra", amount: 2400 },
      { label: "Impermeabilización", amount: 800 },
    ],
    encargados: [
      {
        name: "Carlos Medina",
        role: "Líder de jóvenes",
        imageUrl:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&q=80",
        instagramUrl: "https://instagram.com",
      },
      {
        name: "Daniel Ramírez",
        role: "Pastor principal",
        imageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
        instagramUrl: "https://instagram.com",
      },
    ],
  },
  {
    slug: "equipamiento-para-el-area-de-ninos",
    title: "Equipamiento para el área de niños",
    description:
      "Mobiliario, materiales didácticos y mejoras de seguridad para el espacio donde cuidamos a los más pequeños cada domingo.",
    longDescription:
      "Cada domingo más de 60 niños pasan por nuestra área infantil. Este proyecto renueva el mobiliario (mesas, sillas y estanterías a su medida), suma materiales didácticos para las clases por edades y mejora los puntos de seguridad de la sala: cierres en los enchufes, esquineros y señalización de salida. El objetivo es que el área siga siendo un lugar seguro y estimulante a medida que el grupo crece.",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop&q=80",
    status: "active",
    currentAmount: 1450,
    goalAmount: 3000,
    deadline: "2026-11-01",
    deadlineLabel: "1 nov 2026",
    budget: [
      { label: "Mobiliario infantil", amount: 1600 },
      { label: "Materiales didácticos", amount: 900 },
      { label: "Mejoras de seguridad", amount: 500 },
    ],
    encargados: [
      {
        name: "Valeria Soto",
        role: "Coordinadora de niños",
        imageUrl:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&q=80",
        instagramUrl: "https://instagram.com",
      },
    ],
  },
  {
    slug: "campana-de-bautismos-2025",
    title: "Campaña de bautismos 2025",
    description:
      "Cubrimos los costos de logística y materiales de la jornada de bautismos del año pasado, con más de 40 personas participando.",
    longDescription:
      "En 2025 organizamos una jornada de bautismos que reunió a más de 40 personas de la congregación y sus familias. Este proyecto cubrió el alquiler del predio, transporte, vestimenta, refrigerios y la producción del registro audiovisual del evento, para que cada persona bautizada se llevara un recuerdo de ese día.",
    imageUrl:
      "https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=1200&h=800&fit=crop&q=80",
    status: "completed",
    currentAmount: 2100,
    goalAmount: 2100,
    deadline: "2025-08-20",
    deadlineLabel: "20 ago 2025",
    budget: [
      { label: "Alquiler de predio", amount: 900 },
      { label: "Transporte", amount: 500 },
      { label: "Refrigerios y producción", amount: 700 },
    ],
    encargados: [
      {
        name: "Andrea Torres",
        role: "Líder de alabanza",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80",
        instagramUrl: "https://instagram.com",
      },
    ],
  },
  {
    slug: "sonido-y-video-para-el-templo",
    title: "Sonido y video para el templo",
    description:
      "Renovamos el sistema de audio del templo principal y sumamos transmisión en vivo para quienes no pueden asistir en persona.",
    longDescription:
      "El equipo de sonido actual tiene más de 8 años y ya no alcanza a cubrir el templo con claridad, sobre todo en las bancas del fondo. Este proyecto renueva parlantes, consola y micrófonos, y suma una cámara y equipo de transmisión para que las personas que no pueden asistir en persona —por salud, distancia o trabajo— puedan seguir el servicio en vivo.",
    imageUrl:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1200&h=800&fit=crop&q=80",
    status: "active",
    currentAmount: 5400,
    goalAmount: 12000,
    deadline: "2027-02-28",
    deadlineLabel: "28 feb 2027",
    budget: [
      { label: "Sistema de audio", amount: 7000 },
      { label: "Cámaras y transmisión", amount: 4000 },
      { label: "Instalación", amount: 1000 },
    ],
    encargados: [
      {
        name: "Andrea Torres",
        role: "Líder de alabanza",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80",
        instagramUrl: "https://instagram.com",
      },
      {
        name: "Daniel Ramírez",
        role: "Pastor principal",
        imageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
        instagramUrl: "https://instagram.com",
      },
    ],
  },
  {
    slug: "mision-de-verano-2024",
    title: "Misión de verano 2024",
    description:
      "Financiamos el viaje de un equipo de 12 jóvenes que sirvió durante una semana en una comunidad rural.",
    longDescription:
      "Durante el verano de 2024, un equipo de 12 jóvenes viajó a una comunidad rural para una semana de servicio: reparaciones en la escuela local, jornadas de salud y actividades para niños. Este proyecto cubrió transporte, alojamiento, alimentación y los materiales usados en las jornadas de trabajo.",
    imageUrl:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=800&fit=crop&q=80",
    status: "completed",
    currentAmount: 1800,
    goalAmount: 1800,
    deadline: "2024-07-10",
    deadlineLabel: "10 jul 2024",
    budget: [
      { label: "Transporte y alojamiento", amount: 1100 },
      { label: "Alimentación", amount: 400 },
      { label: "Materiales de las jornadas", amount: 300 },
    ],
    encargados: [
      {
        name: "Carlos Medina",
        role: "Líder de jóvenes",
        imageUrl:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&q=80",
        instagramUrl: "https://instagram.com",
      },
    ],
  },
  {
    slug: "biblioteca-comunitaria",
    title: "Biblioteca comunitaria",
    description:
      "Armamos un pequeño espacio de lectura abierto al barrio, con libros donados y un rincón de estudio para estudiantes.",
    longDescription:
      "Queremos abrir un pequeño espacio de lectura dentro del templo, disponible para todo el barrio y no solo para la congregación: libros donados, un rincón de estudio tranquilo para estudiantes y un club de lectura mensual. Este proyecto cubre el mobiliario del espacio, la primera colección de libros y la señalización.",
    imageUrl:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&h=800&fit=crop&q=80",
    status: "active",
    currentAmount: 600,
    goalAmount: 2500,
    deadline: "2026-10-05",
    deadlineLabel: "5 oct 2026",
    budget: [
      { label: "Mobiliario", amount: 1200 },
      { label: "Colección inicial de libros", amount: 900 },
      { label: "Señalización", amount: 400 },
    ],
    encargados: [
      {
        name: "Valeria Soto",
        role: "Coordinadora de niños",
        imageUrl:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&q=80",
        instagramUrl: "https://instagram.com",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

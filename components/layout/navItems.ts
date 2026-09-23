/**
 * Fuente única de verdad para los ítems de navegación pública (D023).
 *
 * - `HOME_ANCHOR_ITEMS`: secciones de Home a las que se navega por scroll
 *   (ancla). Solo tienen sentido en Home — cada `id` debe existir como
 *   `id` de un elemento en app/page.tsx.
 * - `PAGE_NAV_ITEMS`: páginas propias (no anclas), visibles tanto en el
 *   Navbar de Home como en el PageNavbar del resto de páginas públicas.
 */

export type AnchorNavItem = {
  label: string;
  id: string;
};

export type PageNavItem = {
  label: string;
  href: string;
};

export const HOME_ANCHOR_ITEMS: AnchorNavItem[] = [
  { label: "Áreas", id: "areas" },
  { label: "Liderazgo", id: "liderazgo" },
  { label: "Prédicas", id: "predicas" },
  { label: "Redes", id: "redes" },
  { label: "Agenda", id: "agenda" },
];

export const PAGE_NAV_ITEMS: PageNavItem[] = [
  { label: "Proyectos", href: "/proyectos" },
];

/** Ítem normalizado que consume `MobileMenuOverlay`, ya resuelto con su estado activo. */
export type MobileNavLink =
  | { kind: "anchor"; id: string; label: string; active: boolean }
  | { kind: "page"; href: string; label: string; active: boolean };

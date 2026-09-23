import { redirect } from "next/navigation";

/**
 * Página "Historia" (`/historia`) — removida a pedido del cliente (fase 07):
 * la línea de tiempo completa vuelve a vivir únicamente como el resumen de
 * Home (`components/sections/History.tsx`). Esta ruta queda como redirect a
 * Home en vez de eliminarse del árbol de archivos, para que cualquier link
 * o bookmark externo hacia `/historia` no rompa.
 */
export default function HistoriaPage() {
  redirect("/");
}

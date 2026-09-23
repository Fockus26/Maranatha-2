/**
 * Inserta un bloque JSON-LD (schema.org) en la página (fase QA — SEO).
 *
 * Regla dura (ver skill `seo`): solo se marca lo que está **visible** en la
 * página. Los builders viven en `lib/jsonLd.ts`.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es un objeto propio serializado, no entrada de usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* =====================================================================
   Utilidades compartidas
   ===================================================================== */

/** Base pública de la web ("/" en local, "/iguanacafe/" en GitHub Pages…). */
const BASE = import.meta.env.BASE_URL;

/**
 * Convierte una ruta de /public en una URL válida esté donde esté publicada la web.
 * ruta("assets/img/logo.png") → "/assets/img/logo.png" o "/iguanacafe/assets/img/logo.png"
 */
export function ruta(p) {
  if (!p || /^(https?:|data:|\/\/)/.test(p)) return p;
  return BASE + p.replace(/^\.?\//, "");
}

/* =====================================================================
   PUNTO DE ENTRADA · La Iguana Café
   Vite empaqueta desde aquí todo el JavaScript de la web.
   ===================================================================== */
import { iniciarBase } from "./main.js";
import { iniciarExperiencia } from "./experiencia.js";

// Los módulos se ejecutan con el HTML ya cargado: primero la base
// (cabecera, pie, carta, formularios…) y después las animaciones.
iniciarBase();
iniciarExperiencia();

# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Proyecto: Cartelera de Profesionales CEMM

Este es un proyecto React + TypeScript para mostrar una cartelera de profesionales de la salud organizados por especialidad.

### Tecnologías utilizadas:

- React 19 con TypeScript
- Vite como bundler
- SCSS para estilos
- Framer Motion para animaciones

### Estructura del proyecto:

- `/src/components/` - Componentes React reutilizables
- `/src/data/` - Datos de profesionales
- `/src/utils/` - Funciones utilitarias
- `/src/styles/` - Archivos SCSS globales

### Convenciones de código:

- Usar tipado fuerte de TypeScript
- Componentes funcionales con hooks
- Props interfaces claramente definidas
- Nombres de archivos en PascalCase para componentes
- Uso de SCSS modules cuando sea apropiado

### Reglas específicas:

- Los títulos profesionales deben adaptarse por género (Dr./Dra.)
- Organización alfabética por especialidad y luego por nombre
- Diseño responsive y componentes modulares

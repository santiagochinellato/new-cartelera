import type {
  Professional,
  SpecialtyGroup,
  ProfessionalsBySpecialty,
} from "../types";

/**
 * Genera el título correcto basado en el género y el título original
 */
export const generateCorrectTitle = (professional: Professional): string => {
  if (professional.titulo === "Dr." && professional.genero === "femenino") {
    return "Dra.";
  }
  return professional.titulo;
};

/**
 * Genera el nombre completo con el título corregido
 */
export const getFullNameWithTitle = (professional: Professional): string => {
  const correctTitle = generateCorrectTitle(professional);
  return `${correctTitle} ${professional.nombre}`;
};

/**
 * Agrupa los profesionales por especialidad y los ordena alfabéticamente
 */
export const groupProfessionalsBySpecialty = (
  professionals: Professional[]
): ProfessionalsBySpecialty => {
  // Crear un mapa para agrupar por especialidad
  const specialtyMap = new Map<string, Professional[]>();

  professionals.forEach((professional) => {
    const specialty = professional.especialidad;
    if (!specialtyMap.has(specialty)) {
      specialtyMap.set(specialty, []);
    }
    specialtyMap.get(specialty)!.push(professional);
  });

  // Convertir el mapa a array y ordenar
  const groupedProfessionals: SpecialtyGroup[] = Array.from(
    specialtyMap.entries()
  ).map(([especialidad, profesionales]) => ({
    especialidad,
    profesionales: profesionales.sort((a, b) =>
      a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
    ),
  }));

  // Ordenar las especialidades alfabéticamente
  return groupedProfessionals.sort((a, b) =>
    a.especialidad.localeCompare(b.especialidad, "es", { sensitivity: "base" })
  );
};

/**
 * Filtra profesionales por nombre, especialidad o matrícula
 */
export const filterProfessionals = (
  professionals: Professional[],
  searchTerm: string
): Professional[] => {
  if (!searchTerm.trim()) {
    return professionals;
  }

  const term = searchTerm.toLowerCase();

  return professionals.filter(
    (professional) =>
      professional.nombre.toLowerCase().includes(term) ||
      professional.especialidad.toLowerCase().includes(term) ||
      (professional.matricula &&
        professional.matricula.toLowerCase().includes(term))
  );
};

/**
 * Obtiene todas las especialidades únicas ordenadas alfabéticamente
 */
export const getUniqueSpecialties = (
  professionals: Professional[]
): string[] => {
  const specialties = [...new Set(professionals.map((p) => p.especialidad))];
  return specialties.sort((a, b) =>
    a.localeCompare(b, "es", { sensitivity: "base" })
  );
};

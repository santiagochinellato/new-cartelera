export interface Professional {
  id: number;
  nombre: string;
  especialidad: string;
  genero: "masculino" | "femenino";
  titulo: "Dr." | "Dra." | "Lic.";
  descripcion?: string;
  imagen?: string;
  imageAlt?: string;
  matricula?: string;
  urlTurno?: string;
  centro: "cemm" | "endo" | "ambos";
}

export interface SpecialtyGroup {
  especialidad: string;
  profesionales: Professional[];
}

export type ProfessionalsBySpecialty = SpecialtyGroup[];

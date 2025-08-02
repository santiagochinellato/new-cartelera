export interface Professional {
  id: string;
  nombre: string;
  especialidad: string;
  genero: "masculino" | "femenino";
  titulo: "Dr." | "Dra." | "Lic.";
  descripcion: string;
  imagen: string;
  matricula?: string;
  urlTurno: string;
}

export interface SpecialtyGroup {
  especialidad: string;
  profesionales: Professional[];
}

export type ProfessionalsBySpecialty = SpecialtyGroup[];

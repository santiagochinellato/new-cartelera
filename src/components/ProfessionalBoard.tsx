import React from "react";
import type { Professional } from "../types";
import { cemmProfesionalesData } from "../data/cemmProfesionalesData";
import "./ProfessionalBoard.scss";

// Función para generar el título correcto basado en género
const generateCorrectTitle = (professional: Professional): string => {
  if (professional.titulo === "Dr." && professional.genero === "femenino") {
    return "Dra.";
  }
  return professional.titulo;
};

// Función para formatear el nombre como "Título Apellido, Nombre"
const formatProfessionalName = (professional: Professional): string => {
  const correctTitle = generateCorrectTitle(professional);
  const nameParts = professional.nombre.split(" ");

  if (nameParts.length >= 2) {
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");
    return `${correctTitle} ${lastName}, ${firstName}`;
  }

  return `${correctTitle} ${professional.nombre}`;
};

// Función para agrupar profesionales por especialidad
const groupProfessionalsBySpecialty = (professionals: Professional[]) => {
  const grouped: Record<string, Professional[]> = {};

  professionals.forEach((prof) => {
    const key = prof.especialidad;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(prof);
  });

  const sorted = Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b, "es", { sensitivity: "base" }))
    .map(([especialidad, profesionales]) => ({
      especialidad,
      profesionales: profesionales.sort((a, b) =>
        a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
      ),
    }));

  return sorted;
};

const ProfessionalBoard: React.FC = () => {
  const groupedProfessionals = groupProfessionalsBySpecialty(
    cemmProfesionalesData
  );

  return (
    <div className="professional-board">
      {/* Header */}
      <header className="professional-board__header">
        <div className="professional-board__logo">
          <img
            src="/Cemm.png"
            alt="CEMM - Centro Médico"
            className="professional-board__logo-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "block";
            }}
          />
          <div
            className="professional-board__logo-fallback"
            style={{ display: "none" }}
          >
            CEMM
          </div>
        </div>
        <div className="professional-board__info">
          <div className="professional-board__info-text">
            Morales 645 1° Piso
          </div>
          <div className="professional-board__info-text">
            Tél: +54 294 4890837 / 154235666
          </div>
          <div className="professional-board__info-text">
            turnos@consultoriosmorales.com.ar
          </div>
        </div>
      </header>

      {/* Grid de especialidades */}
      <main className="professional-board__main">
        <div className="professional-board__grid">
          {groupedProfessionals.map((specialtyGroup) => (
            <div
              key={specialtyGroup.especialidad}
              className="specialty-section"
            >
              <h2 className="specialty-section__title">
                {specialtyGroup.especialidad}
              </h2>
              <div className="specialty-section__professionals">
                {specialtyGroup.profesionales.map((professional) => (
                  <div key={professional.id} className="professional-item">
                    <span className="professional-item__name">
                      {formatProfessionalName(professional)}
                    </span>
                    <div className="professional-item__icon">📞</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProfessionalBoard;

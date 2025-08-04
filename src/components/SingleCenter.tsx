import React from "react";
import type { Professional } from "../types";
import "./SingleCenter.scss";

interface SingleCenterProps {
  professionals: Professional[];
  centerName: string;
  centerTitle: string;
}

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
    const lastName = nameParts.slice(1).join(" ");
    return `${correctTitle} ${lastName}`;
  }

  return `${correctTitle} `;
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

const SingleCenter: React.FC<SingleCenterProps> = ({
  professionals,
  centerName,
  centerTitle,
}) => {
  const groupedProfessionals = groupProfessionalsBySpecialty(professionals);

  return (
    <div className={`single-center single-center--${centerName}`}>
      {/* Header */}
      <header className="single-center__header">
        <div className="single-center__logo">
          <img
            src={
              centerName === "cemm"
                ? "/assets/logo-cemm-blanco.png"
                : "/assets/logo-endo-blanco.png"
            }
            alt={`${centerTitle} - Centro Médico`}
            className="single-center__logo-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "block";
            }}
          />
          <div
            className="single-center__logo-fallback"
            style={{ display: "none" }}
          >
            {centerTitle}
          </div>
        </div>
        <div className="single-center__info">
          {centerName === "cemm" ? (
            <>
              <div className="single-center__info-text">
                Morales 645 1° Piso
              </div>
              <div className="single-center__info-text">
                Tél: +54 294 4890837 / 154235666
              </div>
              <div className="single-center__info-text">
                turnos@consultoriosmorales.com.ar
              </div>
            </>
          ) : (
            <>
              <div className="single-center__info-text">
                Morales 645 1° Piso
              </div>
              <div className="single-center__info-text">
                Tél: +54 294 4890837 / 154235666
              </div>
              <div className="single-center__info-text">
                turnos@consultoriosmorales.com.ar
              </div>
            </>
          )}
        </div>
      </header>

      {/* Grid de especialidades */}
      <main className="single-center__main">
        <div className="single-center__grid">
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
                    <div className="professional-item__details">
                      <img
                        src={professional.imagen}
                        alt={professional.imageAlt}
                        className="professional-item__photo"
                      />
                      <div className="professional-item__info">
                        <span className="professional-item__name">
                          {formatProfessionalName(professional)}
                        </span>
                        <p className="professional-item__matricula">
                          Mat. {professional.matricula}
                        </p>
                      </div>
                    </div>
                    <div className="professional-item__icon">
                      <img
                        src={
                          centerName === "cemm"
                            ? "/assets/isologo-cemm.png"
                            : "/assets/isologo-endo.png"
                        }
                        alt={`${centerTitle} isologo`}
                        className="professional-item__isologo"
                      />
                    </div>
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

export default SingleCenter;

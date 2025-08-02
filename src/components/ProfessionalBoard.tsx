import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { Professional } from "../types";
import {
  groupProfessionalsBySpecialty,
  filterProfessionals,
  getUniqueSpecialties,
} from "../utils/groupProfessionals";
import SpecialtySection from "./SpecialtySection";
import "./ProfessionalBoard.scss";

interface ProfessionalBoardProps {
  professionals: Professional[];
}

const ProfessionalBoard: React.FC<ProfessionalBoardProps> = ({
  professionals,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");

  // Obtener especialidades únicas para el filtro
  const specialties = useMemo(
    () => getUniqueSpecialties(professionals),
    [professionals]
  );

  // Filtrar profesionales basado en búsqueda y especialidad seleccionada
  const filteredProfessionals = useMemo(() => {
    let filtered = professionals;

    // Filtrar por especialidad si hay una seleccionada
    if (selectedSpecialty) {
      filtered = filtered.filter((p) => p.especialidad === selectedSpecialty);
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filterProfessionals(filtered, searchTerm);
    }

    return filtered;
  }, [professionals, searchTerm, selectedSpecialty]);

  // Agrupar profesionales filtrados por especialidad
  const groupedProfessionals = useMemo(
    () => groupProfessionalsBySpecialty(filteredProfessionals),
    [filteredProfessionals]
  );

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const filtersVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.4,
        staggerChildren: 0.2,
      },
    },
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialty("");
  };

  return (
    <div className="professional-board">
      <motion.header
        className="professional-board__header"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          <h1 className="professional-board__title">
            Cartelera de Profesionales CEMM
          </h1>
          <p className="professional-board__subtitle">
            Encuentra a nuestros especialistas organizados por área médica
          </p>
        </div>
      </motion.header>

      <motion.div
        className="professional-board__filters"
        variants={filtersVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          <div className="filters">
            <div className="filters__search">
              <input
                type="text"
                placeholder="Buscar por nombre, especialidad o matrícula..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filters__search-input"
              />
            </div>

            <div className="filters__specialty">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="filters__specialty-select"
              >
                <option value="">Todas las especialidades</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            {(searchTerm || selectedSpecialty) && (
              <motion.button
                className="filters__clear"
                onClick={clearFilters}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Limpiar filtros
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      <motion.main
        className="professional-board__content"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          {groupedProfessionals.length === 0 ? (
            <motion.div
              className="professional-board__no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>No se encontraron profesionales</h3>
              <p>Intenta ajustar los filtros de búsqueda</p>
            </motion.div>
          ) : (
            <div className="professional-board__sections">
              {groupedProfessionals.map((specialtyGroup, index) => (
                <SpecialtySection
                  key={specialtyGroup.especialidad}
                  specialtyGroup={specialtyGroup}
                  sectionIndex={index}
                />
              ))}
            </div>
          )}
        </div>
      </motion.main>

      <motion.footer
        className="professional-board__footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="container">
          <p>
            Total de profesionales: {professionals.length} | Mostrando:{" "}
            {filteredProfessionals.length}
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default ProfessionalBoard;

import { motion } from "framer-motion";
import type { Professional } from "../types";
import { getFullNameWithTitle } from "../utils/groupProfessionals";
import "./ProfessionalCard.scss";

interface ProfessionalCardProps {
  professional: Professional;
  index?: number;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  professional,
  index = 0,
}) => {
  const fullNameWithTitle = getFullNameWithTitle(professional);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      className="professional-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="professional-card__image-container">
        <img
          src={professional.imagen}
          alt={`Foto de ${professional.nombre}`}
          className="professional-card__image"
          loading="lazy"
        />
      </div>

      <div className="professional-card__content">
        <h3 className="professional-card__name">{fullNameWithTitle}</h3>

        <p className="professional-card__specialty">
          {professional.especialidad}
        </p>

        {professional.matricula && (
          <p className="professional-card__license">
            Matrícula: {professional.matricula}
          </p>
        )}

        <p className="professional-card__description">
          {professional.descripcion}
        </p>
      </div>
    </motion.div>
  );
};

export default ProfessionalCard;

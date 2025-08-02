import { motion } from 'framer-motion';
import type { SpecialtyGroup } from '../types';
import ProfessionalCard from './ProfessionalCard';
import './SpecialtySection.scss';

interface SpecialtySectionProps {
  specialtyGroup: SpecialtyGroup;
  sectionIndex?: number;
}

const SpecialtySection: React.FC<SpecialtySectionProps> = ({ 
  specialtyGroup, 
  sectionIndex = 0 
}) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: sectionIndex * 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.section
      className="specialty-section"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="specialty-section__header"
        variants={titleVariants}
      >
        <h2 className="specialty-section__title">
          {specialtyGroup.especialidad}
        </h2>
        <div className="specialty-section__divider"></div>
        <p className="specialty-section__count">
          {specialtyGroup.profesionales.length === 1 
            ? '1 profesional' 
            : `${specialtyGroup.profesionales.length} profesionales`
          }
        </p>
      </motion.div>

      <motion.div
        className="specialty-section__grid"
        variants={gridVariants}
      >
        {specialtyGroup.profesionales.map((professional, index) => (
          <ProfessionalCard
            key={professional.id}
            professional={professional}
            index={index}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default SpecialtySection;

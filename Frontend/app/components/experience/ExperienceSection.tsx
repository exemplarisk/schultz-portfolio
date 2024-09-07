import ExperienceCategory from "./ExperienceCategory";
import { Experience } from "./types/experience";

interface ExperienceSectionProps {
  experiences: Experience;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
}) => {
  return (
    <>
      <div className="container experience__container">
        <div className="experience__dev">
          <ExperienceCategory
            title="Frontend Development"
            items={experiences.frontend}
          />
        </div>
        <div className="experience__dev">
          <ExperienceCategory
            title="Backend Development"
            items={experiences.backend}
          />
        </div>
      </div>

      <div className="container essential__experience">
        <div className="experience__dev">
          <ExperienceCategory
            title="Essential Skills"
            items={experiences.essential}
          />
        </div>
      </div>
    </>
  );
};

export default ExperienceSection;

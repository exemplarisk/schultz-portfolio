import SkillCategory from "./SkillCategory";
import { SkillArea } from "./types/skill";

interface SkillContainerProps {
  skills: SkillArea;
}

export const SkillContainer: React.FC<SkillContainerProps> = ({
  skills,
}) => {
  return (
    <>
      <div className="container experience__container">
        <div className="experience__dev">
          <SkillCategory
            title="Frontend Development"
            items={skills.frontend}
          />
        </div>
        <div className="experience__dev">
          <SkillCategory
            title="Backend Development"
            items={skills.backend}
          />
        </div>
      </div>

      <div className="container essential__experience">
        <div className="experience__dev">
          <SkillCategory
            title="Essential Skills"
            items={skills.essential}
          />
        </div>
      </div>
    </>
  );
};

export default SkillContainer;

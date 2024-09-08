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
      <div className="container skill__container">
        <div className="skill__dev">
          <SkillCategory
            title="Frontend Development"
            items={skills.frontend}
          />
        </div>
        <div className="skill__dev">
          <SkillCategory
            title="Backend Development"
            items={skills.backend}
          />
        </div>
      </div>

      <div className="container essential__skill">
        <div className="skill__dev">
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

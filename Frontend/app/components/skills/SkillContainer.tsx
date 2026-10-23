import SkillCategory from "./SkillCategory";
import { SkillArea } from "./types/skill";

interface SkillContainerProps {
  skills: SkillArea;
}

export const SkillContainer: React.FC<SkillContainerProps> = ({ skills }) => {
  return (
    <div className="container skillsBoard">
      <SkillCategory title="Delivery" items={skills.essential} />
      <SkillCategory title="Architecture" items={skills.architecture} />
      <SkillCategory title="Frontend" items={skills.frontend} />
      <SkillCategory title="Backend" items={skills.backend} />
    </div>
  );
};

export default SkillContainer;

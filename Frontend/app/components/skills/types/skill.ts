export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillArea {
  frontend: Skill[];
  backend: Skill[];
  architecture: Skill[];
  essential: Skill[];
}

export type SkillLevel = "Beginner" | "Proficient" | "Advanced" | "Expert";

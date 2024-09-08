export interface Skill {
    name: string;
    level: SkillLevel;
}

export interface SkillArea {
    frontend: Skill[];
    backend: Skill[];
    essential: Skill[];
}

export type SkillLevel = 'Beginner' | 'Proficient' | 'Advanced' | 'Expert';
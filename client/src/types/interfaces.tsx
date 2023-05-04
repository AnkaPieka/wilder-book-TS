export type WilderType = {
  id: number;
  name: string;
  city: string;
  skills: OneSkillType[];
};

export type OneSkillType = {
  title: string;
  votes: number;
};

export type SkillType = {
  skills: OneSkillType[];
};

export type SkillFromDB = { name: string; id: number };

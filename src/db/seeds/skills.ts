import { getConnection } from "typeorm";
import Skills from "../../db/entities/skills.entity";

const FACTORY = [
  {
    name: "JavaScript",
    strength: 95,
    sequence: 1,
  },
  {
    name: "React",
    strength: 95,
    sequence: 2,
  },
  {
    name: "Vuejs",
    strength: 95,
    sequence: 3,
  },
  {
    name: "BrightScript",
    strength: 90,
    sequence: 4,
  },
  {
    name: "CSS",
    strength: 95,
    sequence: 5,
  },
  {
    name: "Database Design",
    strength: 90,
    sequence: 6,
  },
  {
    name: "Webpack",
    strength: 95,
    sequence: 7,
  },
  {
    name: "Object Orientation",
    strength: 95,
    sequence: 8,
  },
  {
    name: "Search Engine Optimization",
    strength: 95,
    sequence: 9,
  },
  {
    name: "NodeJS",
    strength: 85,
    sequence: 10,
  },
  {
    name: "Java",
    strength: 90,
    sequence: 11,
  },
  {
    name: "ES6",
    strength: 95,
    sequence: 12,
  },
];
export const SkillSeed = async () => {
  return await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Skills)
    .values(FACTORY)
    .execute();
};

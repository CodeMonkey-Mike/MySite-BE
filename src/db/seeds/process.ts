import { getConnection } from "typeorm";
import Processes from "../../db/entities/processes.entity";

const FACTORY = [
  {
    name: "Idea",
    icon: "lightbulb-o",
    sequence: 1,
  },
  {
    name: "Concept",
    icon: "cogs",
    sequence: 2,
  },
  {
    name: "Design",
    icon: "tint",
    sequence: 3,
  },
  {
    name: "Develop",
    icon: "code",
    sequence: 4,
  },
  {
    name: "Test",
    icon: "bug",
    sequence: 5,
  },
  {
    name: "Launch",
    icon: "rocket",
    sequence: 6,
  },
  {
    name: "Market",
    icon: "signal",
    sequence: 7,
  },
  {
    name: "Optimize",
    icon: "dollar",
    sequence: 8,
  },
  {
    name: "RIO",
    icon: "reply",
    sequence: 9,
  },
];
export const ProcessSeed = async () => {
  return await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Processes)
    .values(FACTORY)
    .execute();
};

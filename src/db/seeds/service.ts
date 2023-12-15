import { getConnection } from "typeorm";
import Services from "../../db/entities/services.entity";

const FACTORY = [
  {
    name: "Web Application Development",
  },
  {
    name: "Large-scale Project Management",
  },
  {
    name: "Lead Generation/Direct Response",
  },
  {
    name: "Conversion Rate Optimization.",
  },
  {
    name: "Project Success!",
  },
];
export const ServiceSeed = async () => {
  return await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Services)
    .values(FACTORY)
    .execute();
};

import { getConnection } from "typeorm";
import Awards from "../../db/entities/awards.entity";

const FACTORY = [
  {
    title: "Our Hero",
    company: "Private WiFi",
    awardTime: "2012-01-31T17:00:00.000Z",
  },
];
export const AwardSeed = async () => {
  return await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Awards)
    .values(FACTORY)
    .execute();
};

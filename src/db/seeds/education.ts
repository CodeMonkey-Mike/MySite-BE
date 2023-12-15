import { getConnection } from "typeorm";
import Educations from "../../db/entities/educations.entity";

const FACTORY = [
  {
    degree: "Master of Internet Marketing",
    description:
      "Studied a wide range of Internet Marketing strategies and tactics.",
    location: "San Francisco, CA",
    school: "University of San Francisco",
    startMonth: 2,
    startYear: 2008,
    endMonth: 12,
    endYear: 2009,
  },
  {
    degree: "Various Financial Certificate Programs",
    description:
      "At NYU’s School of Continuing and Professional Studies, studied financial courses such as Intro to the Markets, Credit Derivatives and Credit Trading Products.",
    location: "New York, NY",
    school: "New York University",
    startMonth: 2,
    startYear: 2005,
    endMonth: 12,
    endYear: 2006,
  },
  {
    degree: "Bachelor of Computer Science",
    description:
      "Started an intensive program for a B.S. in Computer Science as a full time day student. A year later I began work in the dot com industry and switched to part time night studies at the same school.",
    location: "New Rochelle, NY",
    school: "Iona College",
    startMonth: 12,
    startYear: 1998,
    endMonth: 5,
    endYear: 2004,
  },
];
export const EducationSeed = async () => {
  return await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Educations)
    .values(FACTORY)
    .execute();
};

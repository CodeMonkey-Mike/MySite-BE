import { getConnection } from "typeorm";
import Profile from "../../db/entities/profile.entity";

export const AboutSeed = async () => {
  return await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Profile)
    .values({
      name: "Mike Neder",
      email: "mike@mikeneder.me",
      phone: "(914) 484-0940",
      dob: "2001-12-13T06:00:00.000Z",
      birthPlace: "NEW YORK, NY",
      web: "www.MikeNeder.me",
      hobby: "EXERCISE, MARTIAL ARTS, READING",
      address: "New York, NY",
      address1: "",
      bio: "I started off my career as a Software Engineer in the late 90's. I was one of those kids that thought it would be cool to be a programmer. After only a few years I found myself working for an Affiliate Marketing company in New York. It was then that I realized I that I also had a nack for Management and Internet Marketing in addition to creating software. I liked the idea of developing a vision and then putting in effort to make it grow. Over the years that followed I worked from the standpoint that I had a unique perspective as an Internet Marketer and Manager because I had a wide understanding of the business on multiple levels. I’ve worked on and developed from the ground up some large projects, founded a few successful Internet companies, and worked for some major brands.",
    })
    .execute();
};

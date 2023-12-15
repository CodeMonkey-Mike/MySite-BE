import { AboutSeed } from "./about";
import { AwardSeed } from "./award";
import { ChannelSeed } from "./channels";
import { EducationSeed } from "./education";
import { ExperienceSeed } from "./experience";
import { PortfolioSeed } from "./portfolio";
import { ProcessSeed } from "./process";
import { ServiceSeed } from "./service";
import { SkillSeed } from "./skills";
import { TestimonialSeed } from "./testimonial";

export const Seeds = () => {
  AboutSeed();
  SkillSeed();
  EducationSeed();
  ProcessSeed();
  ExperienceSeed();
  ServiceSeed();
  PortfolioSeed();
  TestimonialSeed();
  AwardSeed();
  ChannelSeed();
};

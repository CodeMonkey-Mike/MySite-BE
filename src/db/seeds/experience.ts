import { getConnection } from "typeorm";
import Experiences from "../../db/entities/experiences.entity";

const FACTORY = [
  {
    company: "Various companies",
    title: "Contract Consultant",
    description: "Contracted for Apple, Mozilla, Genomet, Mercari",
    startMonth: 11,
    startYear: 2015,
    current: true,
    endMonth: 0,
    endYear: 0,
    website: "www.codemonkeymike.me",
    website_url: "https://www.codemonkeymike.me/",
    sequence: 1,
  },
  {
    company: "KARPstack.io",
    title: "Founder",
    description:
      "Driving traffic to landing pages. Optimizing pages for conversions.",
    startMonth: 12,
    startYear: 2020,
    current: true,
    endMonth: 6,
    endYear: 2017,
    website: "www.krapstack.io",
    website_url: "https://www.krapstack.io/",
    sequence: 2,
  },
  {
    company: "PRIVATE WiFi",
    title: "VP, Marketing and Business Development",
    description:
      "A personal VPN and online privacy advocate. I joined the company as its first employee behind the CEO in 2010, watched the company grow from day one to millions of subscribers. Built out a vast web infrastructure from the server topology all the way out to the front-end, SEO and other Internet Marketing such as affiliate marketing, email segmentation, etc..",
    startMonth: 2,
    startYear: 2010,
    current: false,
    endMonth: 12,
    endYear: 2014,
    website: "PrivateWiFi.com",
    website_url: "http://www.PrivateWiFi.com",
    sequence: 3,
  },
  {
    company: "FAO Schwarz",
    title: "Senior Software Engineer",
    description:
      "Brought all web applications in house and away from the responsibility of costly vendors. Cut costs, improved efficiency, and built out an internal web department from the ground up.",
    startMonth: 8,
    startYear: 2005,
    current: false,
    endMonth: 6,
    endYear: 2009,
    website: "FAO.com",
    website_url: "http://fao.com",
    sequence: 4,
  },
  {
    company: "NYC RECRUITER, LLC – NYCREX",
    title: "Software Engineer (Long Term Contract)",
    description:
      "A staffing agency that invested in a site that helped users sign up for courses to become Real Estate agents.",
    startMonth: 4,
    startYear: 2007,
    current: false,
    endMonth: 11,
    endYear: 2008,
    website: "NYCREX.com",
    website_url: "",
    sequence: 5,
  },
  {
    company: "Lockheed Martin",
    title: "JSP Developer",
    description:
      "A staffing agency that invested in a site that helped users sign up for courses to become Real Estate agents.",
    startMonth: 11,
    startYear: 2004,
    current: false,
    endMonth: 3,
    endYear: 2005,
    website: "http://www.lockheedmartin.com/",
    website_url: "http://www.lockheedmartin.com/",
    sequence: 6,
  },
  {
    company: "EComWorks",
    title: "Senior Software Enginer",
    description:
      "Lead Engineer in an affiliate marketing startup. Functioned under leadership highly focused on Agile software development methodologies and rapid turnaround of projects.",
    startMonth: 12,
    startYear: 2001,
    current: false,
    endMonth: 5,
    endYear: 2003,
    website: "",
    website_url: "",
    sequence: 7,
  },
  {
    company: "The Stop HIV Foundation",
    title: "Web Developer",
    description: "Used HTML, CSS, and ASP, and later JSP, in a non-profit",
    startMonth: 11,
    startYear: 1999,
    current: false,
    endMonth: 12,
    endYear: 2001,
    website: "",
    website_url: "",
    sequence: 8,
  },
];
export const ExperienceSeed = async () => {
  return await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Experiences)
    .values(FACTORY)
    .execute();
};

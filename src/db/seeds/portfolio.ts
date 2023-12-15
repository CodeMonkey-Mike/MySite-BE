import { getConnection } from "typeorm";
import Portfolios from "../../db/entities/portfolios.entity";

const FACTORY = [
  {
    type: "tools/services",
    client: "YouTube",
    description: "YouTube!",
    sequence: 1,
  },
  {
    type: "social-platforms",
    client: "Genomet",
    description: "Collaborative Platform for Genetic Scientists",
    sequence: 2,
  },
  {
    type: "brands",
    client: "Lockheed Martin",
    description: "Defense contractor",
    sequence: 3,
  },
  {
    type: "brands",
    client: "EComWorks",
    description: "Affiliate Marketing Network",
    sequence: 4,
  },
  {
    type: "social-platforms",
    client: "The Stop HIV Site",
    description: "Online niche community",
    sequence: 5,
  },
  {
    type: "brands",
    client: "Hertz",
    description: "Global Car Rental Company",
    sequence: 6,
  },
  {
    type: "brands",
    client: "NYCREX",
    description: "Real-estate recruiting engine",
    sequence: 7,
  },
  {
    type: "brands",
    client: "PRIVATE WiFi",
    description: "VPN Provider and Privacy Leader",
    category: "Web, Services",
    url: "http://www.privatewifi.com",
    year: "2014",
    detail: "This is placeholder text from my custom CMS.",
    sequence: 8,
  },
  {
    type: "brands",
    client: "FAO Schwarz",
    description: "Famous 150 year old NY luxury toy store",
    sequence: 9,
  },
  {
    type: "social-platforms",
    client: "United Tech Store",
    description: "Tech and gadget social shopping",
    sequence: 10,
  },
  {
    type: "social-platforms",
    client: "Netishop",
    description: "Shopping Comparison Engine",
    sequence: 11,
  },
  {
    type: "brands",
    client: "Apple",
    description: "Computer Software",
    category: "Computer Software",
    sequence: 12,
  },
  {
    type: "brands",
    client: "Mozilla",
    description: "Software Foundation",
    category: "Software Foundation",
    url: "https://www.mozilla.org/en-US/",
    detail: "Worked as a growth engineer and set up CRO experiments",
    sequence: 13,
  },
];
export const PortfolioSeed = async () => {
  return await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Portfolios)
    .values(FACTORY)
    .execute();
};

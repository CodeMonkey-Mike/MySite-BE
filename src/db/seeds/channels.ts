import { getConnection } from "typeorm";
import Channels from "../../db/entities/channels.entity";

const FACTORY = [
  {
    url: "https://www.linkedin.com/in/mikeneder",
    icon: "fa-linkedin",
    visible: true,
    sequence: 1,
  },
  {
    url: "https://www.youtube.com/channel/UChjJ5lDbCODMTphyDLczarA",
    icon: "fa-youtube",
    visible: true,
    sequence: 2,
  },
];
export const ChannelSeed = async () => {
  return await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Channels)
    .values(FACTORY)
    .execute();
};

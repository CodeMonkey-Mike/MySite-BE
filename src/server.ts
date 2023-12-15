import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();
import processEnv from "./env";

processEnv();

import Koa, { Context } from "koa";
import serve from "koa-static";
import cors from "@koa/cors";
import config from "./utils/ormconfig";
import bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-koa";
import { buildSchema } from "type-graphql";
import { graphqlUploadKoa } from "graphql-upload";
import { UserResolver } from "./resolvers/user/resolver";
import { ProfileResolver } from "./resolvers/profile/resolver";
import { SkillsResolver } from "./resolvers/skills/resolver";
import { TestimonialsResolver } from "./resolvers/testimonials/resolver";
import { ServicesResolver } from "./resolvers/services/resolver";
import { ProcessesResolver } from "./resolvers/processes/resolver";
import { ExperiencesResolver } from "./resolvers/experiences/resolver";
import { EducationsResolver } from "./resolvers/educations/resolver";
import { AwardsResolver } from "./resolvers/awards/resolver";
import { PhotoResolver } from "./resolvers/photo/resolver";
import { PortfoliosResolver } from "./resolvers/portfolio/resolver";
import { ChannelsResolver } from "./resolvers/channels/resolver";
import { VideoResolver } from "./resolvers/video/resolver";
import { ContactResolver } from "./resolvers/contact/resolver";
import { authMiddleware, custom401 } from "./middlewares/auth";
import { NewsletterTopicsResolver } from "./resolvers/topics/resolver";
import { NewsletterResolver } from "./resolvers/newsletter/resolver";
import { YoutubesResolver } from "./resolvers/youtubes/resolver";
import { FileResolver } from "./resolvers/files/resolver";
import { BlogResolver } from "./resolvers/blog/resolver";
import { TagsResolver } from "./resolvers/tags/resolver";
import { PollResolver } from "./resolvers/poll/resolver";
import { CarouselResolver } from "./resolvers/carousel/resolver";
import { CarouselSlidesResolver } from "./resolvers/carouselSlides/resolver";
import { CarouselTopicsResolver } from "./resolvers/carouselTopics/resolver";

const app = new Koa();
const path = "/graphql";
const PORT = process.env.HTTP_PORT || 4000;
app.keys = [process.env.SESSION_SECRET || "qowiueojwojfalksdjoqiwueo"];
app.proxy = true;
const isProd = process.env.NODE_ENV === "production" ? true : false;
const JWT_SECRET = process.env.SESSION_SECRET || "jwt_secret";

const main = async () => {
  try {
    const connection = await createConnection(config);
    if (connection.isConnected) {
      console.log("DB connecting!");
      await connection.runMigrations();
    } else {
      console.log("Error connecting DB!");
    }
    const schema = await buildSchema({
      resolvers: [
        UserResolver,
        ProfileResolver,
        SkillsResolver,
        TestimonialsResolver,
        ServicesResolver,
        ProcessesResolver,
        ExperiencesResolver,
        EducationsResolver,
        AwardsResolver,
        PortfoliosResolver,
        PhotoResolver,
        ChannelsResolver,
        VideoResolver,
        ContactResolver,
        NewsletterTopicsResolver,
        NewsletterResolver,
        YoutubesResolver,
        FileResolver,
        BlogResolver,
        TagsResolver,
        PollResolver,
        CarouselResolver,
        CarouselSlidesResolver,
        CarouselTopicsResolver,
      ],
    });

    // Enable cors with default options
    const corsOptions = {
      credentials: true,
    };
    app.use(cors(corsOptions));
    app.use(custom401());
    app.use(bodyParser());
    app.use(
      authMiddleware({ secret: JWT_SECRET, passthrough: true, debug: true })
    );
    const apolloServer = new ApolloServer({
      schema,
      introspection: true,
      playground: !isProd,
      tracing: true,
      context: ({ ctx }: Context) => ({
        ctx,
        session: ctx.session,
      }),
      uploads: false,
    });
    app.use(graphqlUploadKoa({ maxFileSize: 1024 * 1024 * 5, maxFiles: 10 })); // 5MB
    apolloServer.applyMiddleware({ app, path, bodyParserConfig: true });
    app.use(serve("public"));
    app.listen(PORT, () => {
      console.log(`🚀 started ${PORT}`);
    });
  } catch (error) {
    throw new Error(error);
  }
};

main();

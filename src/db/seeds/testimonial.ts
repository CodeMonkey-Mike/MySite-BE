import { getConnection } from "typeorm";
import Testimonials from "../../db/entities/testimonials.entity";

const FACTORY = [
  {
    name: "Mat",
    company: "Reskiub, Depron RC",
    quote:
      "Mike has done an outstanding job with getting my websites out there. He has increased rankings in SERPs, increased conversion rates, and helped as much as triple my traffic for a few of my sites. His strategies are unique, cunning, and downright powerful.",
  },
  {
    name: "Dolores",
    company: "PrivateWiFi",
    quote:
      "Mike Neder is how I define a professional, I’ve been working with him in different projects since I met him in the early 2000s and the experience is always the same: constantly working really hard to achieve the team goals, excellent team player with really good communication skills. From my experience with him I think his past experience as a developer is the key reason why he is an exceptional leader in every web project he manages.",
  },
  {
    name: "Lee Haijun",
    company: "United Stores",
    quote:
      "I have had the pleasure of working with Mike on many occasions over the last 10 years. He has a very comprehensive understanding of the Internet business and all the services it has to offer. Usually if he thinks of something that doesn’t exist already, he creates it himself.",
  },
  {
    name: "Linda Mitchell",
    company: "Petals n’Pine",
    quote:
      "Mike was thoroughly helpful with SEO and marketing concepts that were needed to set up my company for business. He is highly recommended to help you with your business adventures.",
  },
  {
    name: "Kent Lawson",
    company: "PRIVATE WiFi",
    quote: `I hired Mike to build and promote our web site, via SEO, etc.

    The job expanded into developing an extensive back-end system for collecting and displaying marketing data and other in-house applications.
    
    Mike is able to work understand business requirements, design systems to meet those needs, and to implement them effectively. He self-manages very well and also recruits and manages others to work with him as needed.
    
    He is a strong contributor and I have no hesitation in recommending him highly.`,
  },
  {
    name: "Lane F. Liston",
    company: "PRIVATE WiFi",
    quote: `I have worked closely with Mike for the last 5 years at Private Communications Corporation. To put it succinctly, Mike is a web development powerhouse. 

    He possesses an extraordinary understanding of how the web works, and can multi-task in the development of large-scale systems at the same time. (Give example a little bit) During my time with him I have seen him grow from a PHP/MySQL dev, to one of the most influential JavaScript/Mongo gurus working today. 
    
    In person, Mike is …... He exhibits an unusually determined commitment to his work: he strives to achieve excellence and distinction. 
    
    Mike would brings unusual rigor and intellect; it thus with complete confidence and pleasure that I recommend him.`,
  },
  {
    name: "Alfonso Valdes",
    company: "ClickIT Smart Technologies",
    quote:
      "Mike is leader in his field. His knowledge of management in web development, as well as JavaScript programming skills and real world Internet Marketing experience, give him what it takes to be the driving force behind any large scale project.",
  },
  {
    name: "Tracie Kravitz",
    company: "FAO Schwarz",
    quote:
      "I worked with Mike at FAO Schwarz. He was very skilled in web development and all tech stuff that comes along with writing programs and the backend. We were using one content management system, and the company was not too happy with it. Mike was able to build something very similiar with the same or even more capabilities. In doing this, we were able to keep the website up and running. He also maintained and developed anything we needed for the website. Mike would be an asset to any company with his skills and expertise.",
  },
  {
    name: "Carol Bretzfield Altarescu",
    company: "EComWorks",
    quote:
      "Mike was an excellent engineer. I hired him when he was more than a typical wizkid. He was forward thinking and an exceptionally fast learner. His problem solving ability and technical expertise was unchallenged. I'd recommend him for any software project.",
  },
];
export const TestimonialSeed = async () => {
  return await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Testimonials)
    .values(FACTORY)
    .execute();
};

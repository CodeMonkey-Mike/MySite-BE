import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
} from "typeorm";

@ObjectType()
@Entity({ name: "carousel_topics" })
export default class CarouselTopics extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column()
  topic!: string;

  @Field()
  @Column()
  content!: string;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;
}

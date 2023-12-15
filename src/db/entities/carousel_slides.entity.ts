import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
} from "typeorm";

@ObjectType()
@Entity({ name: "carousel_slides" })
export default class CarouselSlides extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  description!: string;

  @Field({ nullable: true })
  @Column()
  hashtag!: string;

  @Field()
  @Column()
  sequence!: string;

  @Field({ nullable: true })
  @Column()
  carousel_id!: number;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;
}

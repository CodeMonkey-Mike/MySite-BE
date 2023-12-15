import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
} from "typeorm";

@ObjectType()
@Entity({ name: "carousel_slide_images" })
export default class CarouselSlideImages extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  image_url!: string;

  @Field()
  @Column()
  carousel_slide_id!: number;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;
}

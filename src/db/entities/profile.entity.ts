import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity({ name: "profile" })
export default class Profile extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  address!: string;

  @Field()
  @Column()
  address1!: string;

  @Field()
  @Column()
  bio!: string;

  @Field()
  @Column()
  birthPlace!: string;

  @Field()
  @Column()
  dob!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  hobby!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  phone!: string;

  @Field()
  @Column()
  web!: string;

  @Field({ nullable: true })
  @Column()
  cv!: string;

  @Field({ nullable: true })
  @Column()
  sitemap!: string;

  @Field({ nullable: true })
  @Column()
  slider_images!: string;

  @Field({ nullable: true })
  @Column()
  hide_experience!: boolean;

  @Field({ nullable: true })
  @Column()
  media_kit!: string;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}

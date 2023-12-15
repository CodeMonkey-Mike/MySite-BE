import { ObjectType, Field } from "type-graphql";

import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity({ name: "experiences" })
export default class Experiences extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  company!: string;

  @Field()
  @Column()
  current!: boolean;

  @Field({ nullable: true })
  @Column()
  hide!: boolean;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  endMonth!: number;

  @Field()
  @Column()
  endYear!: number;

  @Field()
  @Column()
  sequence!: number;

  @Field()
  @Column()
  startMonth!: number;

  @Field()
  @Column()
  startYear!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  website!: string;

  @Field()
  @Column()
  website_url!: string;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}

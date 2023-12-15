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
@Entity({ name: "educations" })
export default class Educations extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  degree!: string;

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
  location!: string;

  @Field()
  @Column()
  school!: string;

  @Field()
  @Column()
  startMonth!: number;

  @Field()
  @Column()
  startYear!: number;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}

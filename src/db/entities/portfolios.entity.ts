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
@Entity({ name: "portfolios" })
export default class Portfolios extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  type!: string;

  @Field()
  @Column()
  logo!: string;

  @Field()
  @Column()
  client!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  category!: string;

  @Field()
  @Column()
  url!: string;

  @Field()
  @Column()
  year!: string;

  @Field()
  @Column()
  detail!: string;

  @Field()
  @Column()
  facebook!: string;

  @Field()
  @Column()
  twitter!: string;

  @Field()
  @Column()
  pinterest!: string;

  @Field()
  @Column()
  linkedin!: string;

  @Field()
  @Column()
  sequence!: number;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}

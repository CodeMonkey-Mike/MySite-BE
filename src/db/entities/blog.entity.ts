import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { PostTypes } from "../../commonTypes/PostTypes";

@ObjectType()
@Entity({ name: "blog" })
export default class Blog extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;

  @Field({ nullable: true })
  @Column()
  author!: string;

  @Field()
  @Column()
  content!: string;

  @Field({ nullable: true })
  @Column()
  tags!: string;

  @Field({ nullable: true })
  @Column()
  slug!: string;

  @Field({ nullable: true })
  @Column()
  anchor_title!: string;

  @Field({ nullable: true })
  @Column()
  editor_type!: string;

  @Field({ nullable: true })
  @Column()
  category!: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: PostTypes.PUBLIC })
  status!: string;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}

// src/types/post.type.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserType } from './user.type';

@ObjectType()
export class PostType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  content?: string;

  @Field(() => UserType)
  author: UserType;
}

// src/types/user.type.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PostType } from './post.type';

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [PostType])
  posts: PostType[];
}

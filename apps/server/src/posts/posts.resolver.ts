import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostType } from 'src/types/post.type';

@Resolver(() => PostType)
export class PostsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [PostType])
  async getPosts(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: { author: true }, // author 필드를 포함하여 모든 게시물 조회
    });
  }

  @Mutation(() => PostType)
  async createPost(
    @Args('title') title: string,
    @Args('content') content: string,
    @Args('authorId') authorId: number,
  ): Promise<Post> {
    return this.prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id: authorId }, // authorId를 사용하여 User와 관계 연결
        },
      },
    });
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from 'src/types/user.type';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [UserType])
  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: { posts: true }, // posts 필드를 포함하여 모든 사용자 조회
    });
  }

  @Query(() => [UserType])
  async getUsersWithPosts(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: { posts: true }, // posts 필드를 포함하여 모든 사용자 조회
    });
  }

  @Mutation(() => UserType)
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
  ): Promise<User> {
    return this.prisma.user.create({
      data: {
        name,
        email,
      },
    });
  }
}

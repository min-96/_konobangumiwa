import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/auth/user.model';
import { UpdateUserInput } from './dto/update-user.dto';
import { CurrentUser } from 'src/auth/current-user';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/auth.admin.guard';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  @UseGuards(AdminGuard)
  async users(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Query(() => User, { nullable: true })
 @UseGuards(AuthGuard)
  async userRead(
    @CurrentUser() user:User
  ): Promise<User | null> {
    //const user = ctx.req.user;
    console.log(user.pictureUrl);
   return this.userService.findUserById(user.id);
     
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
    return this.userService.updateUser(input);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }

  // @Query(()=> String)
  // async test(): Promise<String> {
  //     return this.crawling.fetchData();
  // }
}

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
   return this.userService.findUserById(user.id);   
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async updateUser(@CurrentUser() user:User, @Args('input') input: UpdateUserInput): Promise<User> {
    return this.userService.updateUser(user.id,input);
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async deleteUser(@CurrentUser() user:User): Promise<User> {
    return this.userService.deleteUser(user.id);
  }

  @Query(()=> User)
  async otherUser(@Args('id') id : number):Promise<User | null> {
    return this.userService.otherUser(id);
  }

  @Query(()=> String)
  async createUserTest(@Args('offset') offset: number, @Args('size') size : number) : Promise<string> {
    return this.userService.createUserTest(offset, size);
  }


}

import { Resolver, Query, Context } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  
  @Query(() => String)
  hello() {
    // const user = context.req.user;
    // console.log(user.id);
    return 'Hello World!';
  }
}

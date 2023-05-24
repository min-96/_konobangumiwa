import { Resolver, Query, Int } from '@nestjs/graphql';
import { Animation } from 'src/animation/animation.model';
import { UserBasedSystemService } from './user_bsd_sys.service';
import { CurrentUser } from 'src/auth/current-user';
import { User } from '@prisma/client';
import { TypeCount } from './dto/response-type.dto';




@Resolver(()=> Animation)
export class UserBasedSystemResolver {
  constructor(private userbasedrecoService : UserBasedSystemService) {}

  @Query(()=> [Animation])
  async userBasedGenre(@CurrentUser() user :User): Promise<Animation[]> {
    return this.userbasedrecoService.userBasedGenreRecommend(user);
  }

  @Query(()=> [Animation])
  async userBasedTag(@CurrentUser() user:User) : Promise<Animation[]> {
    return this.userbasedrecoService.userBasedTagRecommend(user);
  }


  @Query(() => [TypeCount])
  async userBasedlikeTag(@CurrentUser() user: User): Promise<TypeCount[]> {
    return this.userbasedrecoService.userBasedlikeTag(user);
   
  }
  
}
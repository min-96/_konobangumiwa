import { Resolver, Query } from '@nestjs/graphql';
import { Animation } from 'src/animation/animation.model';
import { UserBasedSystemService } from './user_bsd_sys.service';
import { CurrentUser } from 'src/auth/current-user';
import { User } from '@prisma/client';



@Resolver(()=> Animation)
export class UserBasedSystemResolver {
  constructor(private userbasedrecoService : UserBasedSystemService) {}

  @Query(()=> [Animation])
  async userBasedGenre(@CurrentUser() user :User): Promise<Animation[]> {
    console.log("asd");
    return this.userbasedrecoService.userBasedGenreRecommend(user);
  }
  
}
import { Resolver, Query, Int } from '@nestjs/graphql';
import { Animation } from 'src/animation/animation.model';
import { UserBasedSystemService } from './user_bsd_sys.service';
import { CurrentUser } from 'src/auth/current-user';
import { User } from '@prisma/client';
import { TagCount } from './dto/response-tagCount.dto';
import { GenreCount } from './dto/response-genre.dto';




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


  @Query(() => [TagCount])
  async userBasedlikeTag(@CurrentUser() user: User): Promise<TagCount[]> {
    return this.userbasedrecoService.userBasedlikeTag(user);
  }

  @Query(() => [GenreCount])
  async userBasedlikeGenre(@CurrentUser() user: User): Promise<GenreCount[]> {
    return this.userbasedrecoService.userBasedlikeGenre(user);
  }
  
}
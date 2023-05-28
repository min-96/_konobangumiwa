import { Resolver, Query, Int, Args } from '@nestjs/graphql';
import { Animation } from 'src/animation/animation.model';
import { UserBasedSystemService } from './user_bsd_sys.service';
import { CurrentUser } from 'src/auth/current-user';
import { User } from '@prisma/client';
import { TagCount } from './dto/response-tagCount.dto';
import { GenreCount } from './dto/response-genreCount.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';




@Resolver(()=> Animation)
export class UserBasedSystemResolver {
  constructor(private userbasedrecoService : UserBasedSystemService) {}

  @Query(()=> [Animation])
  @UseGuards(AuthGuard)
  async userBasedGenre(@CurrentUser() user :User): Promise<Animation[]> {
    return this.userbasedrecoService.userBasedGenreRecommend(user);
  }

  @Query(()=> [Animation])
  @UseGuards(AuthGuard)
  async userBasedTag(@CurrentUser() user:User) : Promise<Animation[]> {
    return this.userbasedrecoService.userBasedTagRecommend(user);
  }


  @Query(() => [TagCount])
  @UseGuards(AuthGuard)
  async userBasedlikeTag(@CurrentUser() user: User): Promise<TagCount[]> {
    return this.userbasedrecoService.userBasedlikeTag(user);
  }

  @Query(() => [GenreCount])
  @UseGuards(AuthGuard)
  async userBasedlikeGenre(@CurrentUser() user: User): Promise<GenreCount[]> {
    return this.userbasedrecoService.userBasedlikeGenre(user);
  }


  @Query(()=> [Animation])
  @UseGuards(AuthGuard)
  async userBasedCollaborative(@CurrentUser() user: User) : Promise<Animation[]> {
    return this.userbasedrecoService.userBasedCollaborateFiltering(user);
  }
  
}
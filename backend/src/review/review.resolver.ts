import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from './review.model';
import { CreateInputReview } from './dto/create-review.dto';
import { CurrentUser } from 'src/auth/current-user';
import { User } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateInputReview } from './dto/update-review.dto';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private reviewService: ReviewService) { }

  @Mutation(() => Review)
  @UseGuards(AuthGuard)
  async createReview(
    @CurrentUser() user: User,
    @Args('input') input: CreateInputReview): Promise<Review> {
    return this.reviewService.createReview(input, user);
  }

  @Query(() => [Review])
  @UseGuards(AuthGuard)
  async readReivew(
    @CurrentUser() user: User): Promise<Review[]> {
    return this.reviewService.readReivew(user);
  }

  @Mutation(()=> Review)
  @UseGuards(AuthGuard)
  async updateReview(
    @CurrentUser() user: User,
    @Args('input') input: UpdateInputReview): Promise<Review>{
      return this.reviewService.updateReview(input,user);
    }
  

}

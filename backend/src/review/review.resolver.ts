import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from './review.model';
import {CreateInputReview} from './dto/create-review.dto';
import { CurrentUser } from 'src/auth/current-user';
import { User } from '@prisma/client';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}

    @Mutation(()=>Review)
    async createReview(
      @CurrentUser() user:User,
      @Args('input') input : CreateInputReview ): Promise<Review>{
        return this.reviewService.createReview(input,user);
    }

}

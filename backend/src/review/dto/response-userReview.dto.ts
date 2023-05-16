import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { Review } from '../review.model';

@ObjectType()
export class UserReviewResponse {
  @Field(() => Review, { nullable: true })
  userReview?: Review;

  @Field(() => [Review], { nullable: 'itemsAndList' })
  otherReviews: Review[];

}
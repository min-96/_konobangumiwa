import { ObjectType, Field } from '@nestjs/graphql';
import { Review } from '../review.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class OtherReviewResponse {
  @Field(() => [Review], { nullable: 'itemsAndList' })
  reviews: Review[];

}

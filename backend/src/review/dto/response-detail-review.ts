// import { ObjectType, Field, Resolver  } from '@nestjs/graphql';
// import { UserReviewResponse } from './response-userReview.dto';
// import { OtherReviewResponse } from './response-otherReview.dto';

// export type ReviewResponse = UserReviewResponse | OtherReviewResponse;

// @Resolver(() => ReviewResponse)
// export class ReviewResponseResolver {
//   @ResolveUnion(() => ReviewResponse)
//   resolveType(response: ReviewResponse): string {
//     if ('userReview' in response) {
//       return 'UserReviewResponse';
//     }
//     if ('reviews' in response) {
//       return 'OtherReviewResponse';
//     }
//     return null;
//   }
// }



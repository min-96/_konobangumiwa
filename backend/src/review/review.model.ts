import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Review {
  @Field()
  id: number;

  @Field()
  evaluation: number;

  @Field()
  comment: string;

  @Field()
  animationId: number;

  @Field()
  userId: number;
}

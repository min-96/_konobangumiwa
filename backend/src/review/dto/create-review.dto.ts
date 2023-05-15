import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateInputReview {

  @Field()
  evaluation: number;

  @Field({ nullable: true })
  comment?: string | null;

  @Field()
  animationId: number;

  @Field({ nullable: true })
  userId: number | null;
}
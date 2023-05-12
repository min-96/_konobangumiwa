import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateInputReview {

  @Field()
  id : number

  @Field()
  evaluation: number;

  @Field({ nullable: true })
  comment?: string | null;

  @Field()
  animationId: number;

  @Field({ nullable: true })
  userId?: number | null;
}
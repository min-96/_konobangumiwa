import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  googleId: string;

  @Field()
  email: string;

  @Field()
  displayName: string;

  @Field({ nullable: true })
  pictureUrl?: string;
}

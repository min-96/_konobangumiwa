import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TagCount {
  @Field()
  type: string;

  @Field(type => Int)
  count: number;
}
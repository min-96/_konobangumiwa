import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GenreCount {
  @Field()
  type: string;

  @Field(type => Int)
  count: number;
}
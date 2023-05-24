import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TypeCount {
  @Field()
  type: string;

  @Field(type => Int)
  count: number;
}
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Wish {

    @Field()
    id: number;

    @Field()
    animationId: number;

    @Field()
    userId: number;

}
import { Field, ObjectType } from '@nestjs/graphql';
import { Animation } from 'src/animation/animation.model';
@ObjectType()
export class Wish {

    @Field()
    id: number;

    @Field()
    animationId: number;

    @Field()
    userId: number;

    // @Field(()=> Animation)
    // animation: Animation;

}
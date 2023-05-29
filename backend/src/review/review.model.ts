import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.model';
import { Animation } from 'src/animation/animation.model';
@ObjectType()
export class Review {
  @Field()
  id: number;

  @Field()
  evaluation: number;

  @Field({nullable: true})
  comment: string;

  @Field()
  animationId: number;

  @Field()
  userId: number;

  @Field(()=> User, {nullable: true})
  user? : User;

  @Field(()=> Animation,{nullable :true})
  animation? : Animation;
}

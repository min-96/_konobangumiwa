import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/auth/user.model';

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
}

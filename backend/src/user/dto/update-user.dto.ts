import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {

  @Field({ nullable: true })
  displayName?: string | null;

  @Field({ nullable: true })
  introduction?: string | null;


  @Field({ nullable: true })
  pictureUrl?: string | null;
  
}

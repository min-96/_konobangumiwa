import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GenreType {
    @Field()
    type : string;

}

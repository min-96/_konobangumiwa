import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TagType {
    @Field()
    type : string;

}

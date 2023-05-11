import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Wish,Review,Genre } from "@prisma/client";

@ObjectType()
export class Animation {
    @Field(()=> Int)
    id : number;

    @Field()
    title : string;

    @Field()
    release : string;

    @Field()
    introduction : string;

    @Field()
    thumbnail : string;

    @Field()
    grade : number;

    @Field()
    author : string;

    // @Field(()=> [String])
    // genreList: Genre[];

    // @Field(()=>[String])
    // reviewList: Review[];

    // @Field(()=>[String])
    // wishList: Wish[];

    
}

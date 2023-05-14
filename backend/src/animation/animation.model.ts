import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Review,Genre } from "@prisma/client";
import { Wish } from "src/wish/wish.model";

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
    backgroundImg : string;

    @Field()
    grade : number;

    @Field()
    author : string;

    @Field()
    reviewCount : number | null;

    // @Field(()=> [String])
    // genreList: Genre[];

    // @Field(()=>[String])
    // reviewList: Review[];

    // @Field(()=>[Wish])
    // wishList: Wish[];

    
}

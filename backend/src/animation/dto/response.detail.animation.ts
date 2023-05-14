import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Genre } from "@prisma/client";
import { Review } from "src/review/review.model";
import { Wish } from "src/wish/wish.model";

@ObjectType()
export class DetailAnimation {
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

    // @Field(()=> [Genre], { nullable: 'itemsAndList' })
    // genreList: Genre[] | null;

    @Field(()=> [Review], { nullable: 'itemsAndList' })
    reviewList: Review[] | null;

    // @Field(()=> [Wish], { nullable: 'itemsAndList' })
    // wishList: Wish[] | null;

    
}

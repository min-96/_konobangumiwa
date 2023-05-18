import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Genre } from "src/genre/dto/genre.model";
import { Review } from "src/review/review.model";
import { Wish } from "src/wish/wish.model";

@ObjectType()
export class Animation {
    @Field(()=> Int)
    id : number;

    @Field()
    title : string;

    release? : string;

    introduction? : string;

    thumbnail? : string;

    backgroundImg? : string | null;

    crops_ratio? : string | null;

    @Field({nullable:true})
    grade? : number;

    @Field({nullable:true})
    author? : string;

    @Field({nullable:true})
    reviewCount?: number | null;

    @Field(()=> [Genre], { nullable: true })
    genreList?: Genre[];

    @Field(()=> [Review], { nullable: true })
    reviewList?: Review[];

    @Field(()=> [Wish], { nullable: true })
    wishList?: Wish[];
    
}

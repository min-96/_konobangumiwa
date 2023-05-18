import { Resolver,Query, Args } from "@nestjs/graphql";
import { Animation } from "src/animation/animation.model";
import { SearchService } from "./search.service";
import { time } from "console";

@Resolver(()=> Animation)
export class SearchResolver {

    constructor(private searchService : SearchService) {}

    @Query(()=> [Animation])
    async aniType(@Args('type') type: string) : Promise<Animation[]> {
        return this.searchService.filteringGenre(type);
    }

    @Query(()=> [Animation])
    async searchTitle(@Args('title') title: string) : Promise<any> {
        return this.searchService.searchTitle(title);
    }

    @Query(()=> String)
    async Searchtest(@Args('title') title: string) : Promise<any> {
        return this.searchService.testSearchTitle(title);
    }



    @Query(()=> String)
    async elasticTest() : Promise<any> {
        return this.searchService.indexAnimation();
    }


    

}
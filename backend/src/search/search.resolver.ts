import { Resolver,Query, Args } from "@nestjs/graphql";
import { Animation } from "src/animation/animation.model";
import { SearchService } from "./search.service";

@Resolver(()=> Animation)
export class SearchResolver {

    constructor(private searchService : SearchService) {}

    @Query(()=> [Animation])
    async GenreTypeAnimations(@Args('type') type: string) : Promise<Animation[]| null> {
        return this.searchService.filteringGenre(type);
    }

    @Query(()=> [Animation])
    async tagTypeAnimations(@Args('type') type: string) : Promise<Animation[] | null> {
        return this.searchService.filteringTag(type);
    } 

    @Query(()=> [Animation])
    async searchTitle(@Args('title') title: string) : Promise<Animation[]> {
        return this.searchService.searchTitleInElastic(title);
    }
    
}
import { Resolver,Query, Args, Int } from "@nestjs/graphql";
import { Animation } from "src/animation/animation.model";
import { SearchService } from "./search.service";
import { GenreType } from "src/genre_tag/genreType.model";
import { TagType } from "src/genre_tag/tagType.model";

@Resolver(()=> Animation)
export class SearchResolver {

    constructor(private searchService : SearchService) {}

    @Query(() => [Animation])
    async genreTypeAnimations(@Args('type', { type: () => [String]},) type: string[], 
    @Args('page',{type: ()=> Int}) page: number,
    @Args('pageSize', { type: ()=> Int}) pageSize: number): Promise<Animation[] | null> {
      return this.searchService.filteringGenre(type, page, pageSize);
    }

    @Query(()=> [Animation])
    async tagTypeAnimations(@Args('type', { type: () => [String]},) type: string[]) : Promise<Animation[] | null> {
        return this.searchService.filteringTag(type);
    } 

    @Query(()=> [Animation])
    async searchTitle(@Args('title') title: string) : Promise<Animation[]> {
        return this.searchService.searchTitleInElastic(title);
    }

    @Query(()=> [GenreType])
    async genreTypeList() : Promise<GenreType[]> {
        return this.searchService.genreTypeList();
    }

    
    @Query(()=> [TagType])
    async tagTypeList() : Promise<TagType[]> {
        return this.searchService.tagTypeList();
    }
    
}
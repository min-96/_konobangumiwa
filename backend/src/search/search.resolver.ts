import { Resolver,Query, Args } from "@nestjs/graphql";
import { Animation } from "src/animation/animation.model";
import { AnimationService } from "src/animation/animation.service";

@Resolver(()=> Animation)
export class SearchResolver {

    constructor(private animationService: AnimationService) {}

    @Query(()=> [Animation])
    async aniType(@Args('type') type: string) : Promise<Animation[]> {
        return this.animationService.filteringGenre(type);
    }

    @Query(()=> [Animation])
    async searchTitle(@Args('title') title: string) : Promise<Animation[]> {
        return this.animationService.searchTitle(title);
    }

}
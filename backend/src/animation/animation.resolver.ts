import { Resolver,Query, Args,Int } from "@nestjs/graphql";
import { AnimationService } from "./animation.service";
import { Animation } from "./animation.model";


@Resolver(()=> Animation)
export class AnimationResolver {

    constructor(private animationService : AnimationService) {}

    @Query(()=> [Animation])
    async allAnimations() : Promise<Animation[]> {
        return this.animationService.findAllAnimation();
    }
ㄴ
    @Query(()=> [Animation])
    async popularityAnimations() : Promise<Animation[] | null> {
        return this.animationService.popularityAnimation();
    }

    @Query(()=> [Animation])
    async newAnimations() : Promise<Animation[] | null> {
        return this.animationService.newAnimations();
    } 


    @Query(()=> Animation)
    async animationDetail(@Args('id', { type: () => Int }) id: number) : Promise<Animation> {
        return this.animationService.detailAnimation(id);
    }


}

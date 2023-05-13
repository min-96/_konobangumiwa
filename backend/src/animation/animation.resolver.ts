import { Resolver,Query, Args } from "@nestjs/graphql";
import { AnimationService } from "./animation.service";
import { Animation } from "./animation.model";

@Resolver(()=> Animation)
export class AnimationResolver {

    constructor(private animationService : AnimationService) {}

    @Query(()=> [Animation])
    async allAnimation() : Promise<Animation[]> {
        return this.animationService.findAllAnimation();
    }

    // @Query(()=> [Animation])
    // async searchTitle() : Promise<Animation[]> {
    //     return 
    // }

}

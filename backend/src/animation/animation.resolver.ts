import { Resolver,Query, Args,Int } from "@nestjs/graphql";
import { AnimationService } from "./animation.service";
import { Animation } from "./animation.model";
import { CurrentUser } from "src/auth/current-user";
import { User } from "@prisma/client";


@Resolver(()=> Animation)
export class AnimationResolver {

    constructor(private animationService : AnimationService) {}

    @Query(()=> [Animation])
    async allAnimations(@Args('page', { type: () => Int}) page: number,
    @Args('pageSize', { type: () => Int }) pageSize: number,) : Promise<Animation[]> {
        return this.animationService.findAllAnimation(page,pageSize);
    }

    @Query(()=> [Animation])
    async popularityAnimations() : Promise<Animation[] | null> {
        return this.animationService.popularityAnimation();
    }

    @Query(()=> [Animation])
    async newAnimations() : Promise<Animation[] | null> {
        return this.animationService.newAnimations();
    } 

    @Query(()=> Animation)
    async detailAnimation(@Args('id', { type: () => Int }) id: number
    ) : Promise<Animation> {
        return this.animationService.detailAnimation(id);
    }


    @Query(()=> [Animation])
    async similarAnimation(@Args('id', { type: () => Int}) id : number) : Promise<Animation[]> {
        return this.animationService.similarAnimation(id);
    }

}

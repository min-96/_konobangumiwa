import { Args, Query, Resolver } from "@nestjs/graphql";
import { TestSerive } from "./test.service";

@Resolver(() => String)
export class TestResolver {

    constructor(private testService: TestSerive) { }

    @Query(() => String)
    async createAnimationTest(@Args('offset') offset: number, @Args('size') size: number): Promise<string> {
        return this.testService.createAnimationTest(offset, size);
    }

    @Query(() => String)
    async createUserTest(@Args('offset') offset: number, @Args('size') size: number): Promise<string> {
        return this.testService.createUserTest(offset, size);
    }


    @Query(() => String)
    async createReviewTest(@Args('size') size: number): Promise<string> {
        return this.testService.createReviewAndUpdateAnimation(size);
    }

}

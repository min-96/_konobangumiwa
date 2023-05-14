import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { WishService } from "./wish.service";
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from "src/auth/current-user";
import { User } from "@prisma/client";
import { Wish } from "./wish.model";
//import { CreateInputWish } from "./dto/create-wish.dto";

@Resolver(() => Wish)
export class WishResolver {
    constructor(private wishService: WishService) { }

    @Mutation(() => Wish)
    @UseGuards(AuthGuard)
    async createWish(
        @CurrentUser() user: User,
        @Args('animationId') animationId: number): Promise<Wish> {
        return this.wishService.createWish(animationId,user);
    }

}
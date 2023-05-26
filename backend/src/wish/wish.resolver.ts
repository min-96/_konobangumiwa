import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { WishService } from "./wish.service";
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from "src/auth/current-user";
import { User } from "@prisma/client";
import { Wish } from "./wish.model";
import { Animation } from 'src/animation/animation.model';


@Resolver(() => Wish)
export class WishResolver {
    constructor(private wishService: WishService) { }

    @Mutation(() => Wish)
    @UseGuards(AuthGuard)
    async createWish(
        @CurrentUser() user: User,
        @Args('animationId') animationId: number): Promise<Wish> {
        return this.wishService.createWish(animationId, user);
    }

    @Query(() => [Wish])
    async readWishList( @Args('userId') userId: number): Promise<Wish[]> {
        return this.wishService.readWishList(userId);
    }

    @Mutation(() => Wish)
    @UseGuards(AuthGuard)
    async deleteWish(
        @CurrentUser() user: User,
        @Args('animationId') animationId: number): Promise<Wish> {
        return this.wishService.deleteWish(animationId, user);
    }

    @Query(()=> Boolean)
    async wishYN(@CurrentUser() user:User | null, @Args('animationId') animationId: number) : Promise<boolean> {
        return this.wishService.wishYN(animationId,user);
    }

}
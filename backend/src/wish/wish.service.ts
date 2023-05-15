import { Injectable } from "@nestjs/common";
import { User, Wish } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { Animation } from "src/animation/animation.model";

@Injectable()
export class WishService {

    constructor(private prisma: PrismaService) { }

    async createWish(animationId: number, user: User): Promise<Wish> {
        return this.prisma.wish.create({
            data: {
                animationId: animationId,
                userId: user.id,
            },
        })
    }

    async readWishList(user: User): Promise<Animation[]> {
        const wishList = await this.prisma.wish.findMany({
            where: { userId: user.id },
            include: { animation: true },
        });

        return wishList.map(wish => wish.animation);
    }


    async deleteWish(animationId: number, user: User): Promise<Wish> {
        const selectWish = await this.prisma.wish.findFirst({
            where: {
                userId: user.id,
                animationId: animationId
            }
        });

        return this.prisma.wish.delete({
            where: {
                id: selectWish.id
            }
        })

    }

}
import { Injectable } from "@nestjs/common";
import { User, Wish } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class WishService{

    constructor(private prisma: PrismaService) {}

    async createWish(animationId: number , user:User) : Promise<Wish> {
        return this.prisma.wish.create({
            data: {
                animationId: animationId,
                userId: user.id,
            },
        })
    }

}
import { Injectable } from "@nestjs/common";
import { User, Wish } from "@prisma/client";
import { error } from "console";
import { PrismaService } from "prisma/prisma.service";
import { Animation } from "src/animation/animation.model";

@Injectable()
export class WishService {

    constructor(private prisma: PrismaService) { }

    async createWish(animationId: number, user: User): Promise<Wish> {
        //TODO : 에러처리
        if(!user) {
            throw new Error('you must have login');
        }

        return this.prisma.wish.create({
            data: {
                animationId: animationId,
                userId: user.id,
            },
        })
    }

    async readWishList(user: User): Promise<Wish[]> {
        const wishList = await this.prisma.wish.findMany({
            where: { userId: user.id },
            include: { animation: true },
        });

        return wishList;
    }


    async deleteWish(animationId: number, user: User): Promise<Wish> {
        const selectWish = await this.prisma.wish.findFirst({
            where: {
                userId: user.id,
                animationId: animationId
            }
        });
        //TODO : 에러처리
        if(selectWish.userId !== user.id){
            throw new Error('Unauthorized');
        }

        return this.prisma.wish.delete({
            where: {
                id: selectWish.id
            }
        })

    }

    async wishYN(animatioId: number , user?: User) : Promise<boolean> {
        if (!user) {
            return false;
        }
        const result = await this.prisma.wish.findFirst({
            where: {
                animationId : animatioId,
                userId: user.id
            }
        });
        
        return result ? true : false;
    }

}
import { Injectable } from "@nestjs/common";
import { User, Wish } from "@prisma/client";
import { error } from "console";
import { PrismaService } from "prisma/prisma.service";
import { Animation } from "src/animation/animation.model";
import { CustomException } from "src/error/customException";

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

    async readWishList(userId: number): Promise<Wish[]> {

        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if(!user){
          throw new CustomException('사용자를 찾을 수 없습니다.', 409);
        }

        const wishList = await this.prisma.wish.findMany({
            where: { userId: userId },
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
        
        if(selectWish.userId !== user.id){
            throw new CustomException('해당 보고싶어요를 삭제하실수없습니다.', 403);
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
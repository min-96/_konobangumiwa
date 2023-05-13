import { Injectable } from "@nestjs/common";
import { Animation } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class AnimationService{

    constructor(private prisma: PrismaService) {}

    async findAllAnimation(): Promise<Animation[]> {
        return this.prisma.animation.findMany();
      }


    // async popularityAnimation() : Promise<Animation[]> {
    //    const result = this.prisma.animation.findMany(
    //     {where : {
    //         grade : 
    //     }}
    //    )
    // }
}
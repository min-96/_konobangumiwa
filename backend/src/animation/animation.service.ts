import { Injectable } from "@nestjs/common";
import { Animation } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class AnimationService{

    constructor(private prisma: PrismaService) {}

    async findAllAnimation(): Promise<Animation[]> {
        return this.prisma.animation.findMany();
      }

      async popularityAnimation(): Promise<Animation[]> {
        const result = await this.prisma.animation.findMany({
          where: {
            reviewCount: {
              gte: 1000,
            },
          },
          take: 10,
        });
        return result;
      }

      async newAnimations(): Promise<Animation[]> {
        const currentDate = new Date();  
        const currentYear = currentDate.getFullYear();

        return this.prisma.animation.findMany({
            where : {
                release: {
                    contains : currentYear.toString(),
                },
            },
            take: 10,
        });
      }

      async detailAnimation(id: number): Promise<Animation> {
        const result = await this.prisma.animation.findUnique({
            where: { id: id },
            include: {
                reviewList: {
                    include: {
                        user: true, 
                    }
                },
                genreList: true,
            },
        });
        return result;
    }
    
      
}
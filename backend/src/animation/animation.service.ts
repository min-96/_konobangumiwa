import { Injectable } from "@nestjs/common";
import { Animation, User } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class AnimationService {

  constructor(private prisma: PrismaService) { }

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
      where: {
        release: {
          contains: currentYear.toString(),
        },
      },
      take: 10,
    });
  }


  async detailAnimation(id: number): Promise<Animation> {

    const result = await this.prisma.animation.findUnique({
      where: { id: id },
      include: {
        genreList: true
      },
    });

    return result;
  }


  async similarAnimation(id: number): Promise<Animation[]> {
    const animation = await this.prisma.animation.findUnique({
      where: { id: id },
      include: {
        genreList: true,
      },
    });

    const author = animation.author;
    const genreTypeIds = animation.genreList.map((genre) => genre.genretypeId);

    const authorMatchedAnimations = await this.prisma.animation.findMany({
      where: {
        author: { equals: author, not: "" },
        NOT: { id: id },
      },
    });
  
    const genreMatchedAnimations = await this.prisma.animation.findMany({
      where: {
        genreList: { every: { genretypeId: { in: genreTypeIds } } },
        NOT: { id: id, author: author },
      },
      take: 10,
    });
  
    const similarAnimations = [...authorMatchedAnimations, ...genreMatchedAnimations];

    return similarAnimations;
  }


}
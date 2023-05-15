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


  async detailAnimation(id: number, page: number, pageSize: number, user?: User): Promise<Animation> {
    let userReview;
    let otherReviews;

    if (user) {
        userReview = await this.prisma.review.findFirst({
          where: { animationId: id, userId: user.id },
          include: {
            user: true,
          },
        });

        otherReviews = await this.prisma.review.findMany({
          where: { animationId: id },
          skip: userReview ? page * (pageSize - 1) : page * pageSize,
          take: pageSize,
          orderBy: {
            id: 'desc',
          },
          include: {
            user: true,
          },
        });
    } else {
        otherReviews = await this.prisma.review.findMany({
          where: { animationId: id },
          skip: page * pageSize,
          take: pageSize,
          orderBy: {
            id: 'desc',
          },
          include: {
            user: true,
          },
        });
    }

    const result = await this.prisma.animation.findUnique({
      where: { id: id },
      include: {
        genreList: true,
        reviewList : true
      },
    });

    result.reviewList = userReview ? [userReview, ...otherReviews] : otherReviews;
    
    return result;
}

}
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Review } from './review.model';
import { CreateInputReview } from './dto/create-review.dto';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) { }


  async createReview(data: CreateInputReview, user: User): Promise<Review> {

    const reviewCount = await this.prisma.review.count({
      where: { animationId: data.animationId }
    });

    const animation = await this.prisma.animation.findUnique({
      where: { id: data.animationId }
    });

    const grade = (reviewCount * animation.grade + data.evaluation) / (reviewCount + 1);


    const MAX_RETRIES = 5
    let retries = 0

    while (retries < MAX_RETRIES) {
      try {
        const [createReview, updateAnimation] = await this.prisma.$transaction(
          [
            this.prisma.review.create({
              data: {
                ...data,
                userId: user.id,
              }
            }),
            this.prisma.animation.update({
              where: { id: data.animationId },
              data: { grade: grade }
            })
          ],
          {
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
          }
        )
        return createReview;
      } catch (error) {
        retries++;
        if (error.code === 'P2034') {
        }
        throw error
      }
    }

  }

}

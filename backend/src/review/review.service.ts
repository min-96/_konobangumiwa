import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Review } from './review.model';
import { CreateInputReview } from './dto/create-review.dto';
import { Prisma, User } from '@prisma/client';
import { UpdateInputReview } from './dto/update-review.dto';

@Injectable()
export class ReviewService {

  constructor(private prisma: PrismaService) { }

  //평점 구하기
  async countAndAnimation(animationId: number) {
    const count = await this.prisma.review.count({
      where: { animationId: animationId }
    });

    const animation = await this.prisma.animation.findUnique({
      where: { id: animationId }
    });

    return {count,animation};
  }

  async createReview(data: CreateInputReview, user: User): Promise<Review> {

    const {count,animation} = await this.countAndAnimation(data.animationId);

    const grade = (count * animation.grade + data.evaluation) / (count + 1);

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
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
          }
        )
        return createReview;
      } catch (error) {
        if (error.code === 'P2034') {
          retries++
          continue
        }
        throw error
      }
    }

  }

  async readReivew(user: User): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: { userId: user.id }
    });
  }


  //트랜잭션 적용하기
  async updateReview(input: UpdateInputReview, user: User): Promise<Review> {
    const selectAnimation = await this.prisma.animation.findUnique({ where: { id: input.animationId } });

    if (!selectAnimation) {
      throw new NotFoundException(`해당하는 ${input.animationId} 가 없습니다.`);
    }

    const {count,animation} = await this.countAndAnimation(input.animationId);

    const oldReview = await this.prisma.review.findUnique({ where: { id: input.id } });

    const diff = input.evaluation - oldReview.evaluation; 
    const newGrade = (animation.grade * count + diff) / count;

    const MAX_RETRIES = 5
    let retries = 0


    while (retries < MAX_RETRIES) {
      try {
        const [updateReview, updateAnimation] = await this.prisma.$transaction(
          [
            this.prisma.review.update({
              where: { id: input.id }, data: {
                evaluation: input.evaluation,
                comment: input.comment,
                userId: user.id,
              }
            }),
            this.prisma.animation.update({
              where: { id: input.animationId },
              data: { grade: newGrade }
            }),
          ],
          {
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
          }
        )
          return updateReview;
      } catch (error) {
        if (error.code === 'P2034') {
          retries++
          continue
        }
        throw error
      };
    }
  }


}

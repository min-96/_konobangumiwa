import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Review } from './review.model';
import { CreateInputReview } from './dto/create-review.dto';
import { Prisma, User } from '@prisma/client';
import { UpdateInputReview } from './dto/update-review.dto';

@Injectable()
export class ReviewService {

  constructor(private prisma: PrismaService) { }


  private async countAndAnimation(animationId: number) {
    const [count, animation] = await Promise.all([
      this.prisma.review.count({ where: { animationId } }),
      this.prisma.animation.findUnique({ where: { id: animationId } })
    ]);
    return { count, animation };
  }

  private async calculateGrade(count: number, animationGrade: number, evaluation: number): Promise<number> {
    return (count * animationGrade + evaluation) / (count + 1);
  }

  //중복 체크하기
  async createReview(data: CreateInputReview, user: User): Promise<Review> {

    const {count,animation} = await this.countAndAnimation(data.animationId);

    const grade = await this.calculateGrade(count, animation.grade, data.evaluation);
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

    const oldReview = await this.prisma.review.findUnique({ where: { id: input.id } });
    if (oldReview.userId !== user.id) throw new Error('Unauthorized');

    const { count, animation } = await this.countAndAnimation(input.animationId);
    const gradeDifference = input.evaluation - oldReview.evaluation;
    const grade = await this.calculateGrade(count, animation.grade, gradeDifference);

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
              data: { grade: grade }
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

  async deleteReview(reviewId: number, user: User): Promise<Review> {
    const review = await this.prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) throw new NotFoundException(`Review with id ${reviewId} not found`);
    if (review.userId !== user.id) throw new Error('Unauthorized');
  
    const {count, animation} = await this.countAndAnimation(review.animationId);
  
    let grade;
    if (count === 1) {
      grade = null;
    } else {
      grade = (animation.grade * count - review.evaluation) / (count - 1);
    }

  
      const MAX_RETRIES = 5;
      let retries = 0;
  
      while (retries < MAX_RETRIES) {
        try {
          const [deleteReview, updateAnimation] = await this.prisma.$transaction(
            [
              this.prisma.review.delete({
                where: { id: reviewId }
              }),
              this.prisma.animation.update({
                where: { id: review.animationId },
                data: { grade: grade }
              })
            ],
            {
              isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
            }
          );
          return deleteReview;
        } catch (error) {
          if (error.code === 'P2034') {
            retries++;
            continue;
          }
          throw error;
        }
      }
    }
  }
  



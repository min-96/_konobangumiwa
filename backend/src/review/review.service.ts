import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateInputReview } from './dto/create-review.dto';
import { Prisma, Review, User } from '@prisma/client';
import { UpdateInputReview } from './dto/update-review.dto';
import { UserReviewResponse } from './dto/response-userReview.dto';
import { OtherReviewResponse } from './dto/response-otherReview.dto';

@Injectable()
export class ReviewService {

  constructor(private prisma: PrismaService) { }


  private async selectAnimation(animationId: number) {
    const animation = await this.prisma.animation.findUnique({ where: { id: animationId } });
    return animation ;
  }

  //중복 체크하기
  async createReview(data: CreateInputReview, user: User): Promise<Review> {
    if(!user){
      throw new Error('You must have login');
    }
    
    const existingReview = await this.prisma.review.findFirst({
      where: { 
          userId: user.id,
          animationId: data.animationId,
      },
    });
  
    if (existingReview) {
      throw new Error('You have already reviewed this animation.');
    }
    const animation  = await this.selectAnimation(data.animationId);

    const MAX_RETRIES = 5
    let retries = 0

    while (retries < MAX_RETRIES) {
      try {
        const [createReview, deleteWish, updateAnimation] = await this.prisma.$transaction(
          [
            this.prisma.review.create({
              data: {
                ...data,
                userId: user.id,
              }
            }),
            this.prisma.wish.deleteMany({
              where: { 
                userId: user.id, 
                animationId: data.animationId 
              }
            }),
            this.prisma.animation.update({
              where: { id: data.animationId },
              data: { grade: animation.grade + data.evaluation ,
              reviewCount : animation.reviewCount + 1}
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

    const animation = await this.selectAnimation(input.animationId);

    const diff = input.evaluation - oldReview.evaluation;

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
              data: { grade: animation.grade + diff}
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

    const animation = await this.selectAnimation(review.animationId);

    let grade;
    if (animation.reviewCount === 1) {
      grade = 0;
    } else {
     grade =  animation.grade - review.evaluation;
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
              data: { grade: grade,
              reviewCount : animation.reviewCount - 1 }
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

  
  async detailReview(id: number, page:number, pageSize: number,user?:User) : Promise<UserReviewResponse> {
    
    let userReview : UserReviewResponse = {
      userReview: null,
      otherReviews: null,
  };
    

     if(user) {  
       userReview.userReview = await this.prisma.review.findFirst({
        where : {animationId : id , userId : user.id},
        include: {
          user: true,
        }
      });
    }

        userReview.otherReviews = await this.prisma.review.findMany({
        where: { animationId: id, comment: { not: null } },
        skip: page * pageSize,
        take: pageSize,
        orderBy: {
          id: 'desc',
        },
        include: {
          user: true,
        },
      });

      // const result = userReview ? {userReview , ...otherReviews} : otherReviews;
      
      return userReview;
  }
}




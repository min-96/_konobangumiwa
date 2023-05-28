import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class TestSerive {

    constructor(private prisma: PrismaService) { }


    async createAnimationTest(offset: number, size: number): Promise<string> {
        try {
            for (let i = offset; i <= size; i++) {
                const animation = {
                    id: i,
                    title: `title${i}`,
                    introduction: `introduction${i}`,
                    thumbnail: `thumbnail${i}`,
                    author: `author${i}`,

                };

                await this.prisma.animation.create({ data: animation });
            }

            return 'OK';
        } catch (error) {
            console.error('Error creating animation:', error);
        }
    }

    async createUserTest(size: number): Promise<string> {
        try {
            for (let i = 0; i < size; i++) {
                const user = {
                    googleId: `googleId${i}`,
                    email: `email${i}@example.com`,
                    displayName: `User ${i}`,
                };

                await this.prisma.user.create({ data: user });
            }
            return 'OK';
        } catch (error) {
            console.error('Error creating users:', error);
        }
    }



    async createReviewAndUpdateAnimation(size: number): Promise<string> {
        try {
            for (let i = 0; i <= size; i++) {
                const review = {
                    evaluation: Math.floor(Math.random() * 5) + 1,
                    comment: `comment${i}`,
                    userId: Math.floor(Math.random() * 100) + 1,
                    animationId: Math.floor(Math.random() * 1000) + 1, 
                };
    
                const animationId = review.animationId;

                await this.prisma.$transaction([
                    this.prisma.review.create({ data: review }),
                    this.prisma.animation.update({
                        where: { id: animationId },
                        data: {
                            grade: review.evaluation,
                            reviewCount: {
                                increment: 1
                            }
                        },
                    }),
                ]);
            }
    
            return 'OK';
        } catch (error) {
            console.error('Error creating review and updating animation:', error);
        }
    }
    



}

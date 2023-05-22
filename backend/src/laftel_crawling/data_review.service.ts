import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import axios from 'axios';
import { Prisma } from "@prisma/client";

@Injectable()
export class CrawlingReviewService {
    constructor(private prisma: PrismaService) { }

    async createReview(animation, animationDataId: { id: number }): Promise<void> {
      
        const url = `https://laftel.net/api/reviews/v2/list/?item_id=${animationDataId.id}&sorting=created&limit=20`;

        const response = await axios.get(url);

        const reviews = response.data.results;
        const UserNum = [];

        for (let i = 1; i < 201; i++) {
            UserNum.push(i);
        };
        const RandUserNum = UserNum.slice().sort(() => Math.random() - 0.5);
        for (const reviewaaa of reviews) {
            console.log(reviewaaa)
            const numid = RandUserNum.pop();
            await this.transactionReviewCreate(reviewaaa, animation, numid);
        }
    }


    async transactionReviewCreate(data, animation, numid): Promise<void> {
        const MAX_RETRIES = 5
        let retries = 0
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        while (retries < MAX_RETRIES) {

            try {
                const [createReview, updateAnimation] = await this.prisma.$transaction(
                    [
                        this.prisma.review.create({
                            data: {
                                animationId: animation.id,
                                evaluation: Math.floor(data.score),
                                comment: data.content,
                                userId: numid,
                            }
                        }),
                        this.prisma.animation.update({
                            where: { id: animation.id },
                            data: {
                                grade: animation.grade + data.score,
                                reviewCount: animation.reviewCount + 1
                            }
                        })
                    ],
                    {
                        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
                    }
                )
                return ;
            } catch (error) {
                console.log(error);
                if (error.code === 'P2034') {
                    retries++
                }
                throw error
            }
        }
    }
}
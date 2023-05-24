import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import axios from 'axios';
import { Prisma } from "@prisma/client";

@Injectable()
export class CrawlingReviewService {
    constructor(private prisma: PrismaService) { }

    async createReview(animation, animationDataId: { id: number }, userSize: number): Promise<void> {

        const url = `https://laftel.net/api/reviews/v2/list/?item_id=${animationDataId.id}&sorting=created&limit=20`;

        const response = await axios.get(url);

        const reviews = response.data.results;

        await this.transactionReviewCreate(reviews, userSize, animation);


    }

    async transactionReviewCreate(reviews, userSize, animation): Promise<void> {
        const UserNum = [];
        for (let i = 1; i < userSize; i++) {
            UserNum.push(i);
        };
        const RandUserNum = UserNum.slice().sort(() => Math.random() - 0.5);

        const reviewTransaction = async (prisma) => {
            let reviewScore = 0;
            let reviewCnt = 0;
            for (let i = 0; i < reviews.length; i++) {
                const score = Math.floor(reviews[i].score) === 0 ? 1 : Math.floor(reviews[i].score);
                reviewScore += score;
            
                const numid = RandUserNum.pop();
                await prisma.review.create({
                    data: {
                        animationId: animation.id,
                        evaluation: score,
                        comment: reviews[i].content,
                        userId: numid,
                    }
                })
            }
            reviewCnt = reviews.length;
            const ret = await prisma.animation.update({
                where: { id: animation.id },
                data: {
                    grade: animation.grade + reviewScore,
                    reviewCount: animation.reviewCount + reviewCnt
                }
            })
            return ret;
        };


        const MAX_RETRIES = 5
        let retries = 0
        let score, reviewCnt = 0;

        while (retries < MAX_RETRIES) {

            try {
                const ret = await this.prisma.$transaction(
                    reviewTransaction,
                    {
                        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
                    }
                )
                return;
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
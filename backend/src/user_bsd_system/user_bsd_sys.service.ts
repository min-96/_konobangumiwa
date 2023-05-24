import { integer } from "@elastic/elasticsearch/api/types";
import { Injectable } from "@nestjs/common";
import { Animation, Genre, User } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { TypeCount } from "./dto/response-type.dto";


@Injectable()
export class UserBasedSystemService {

    constructor(private prisma: PrismaService) { }

    async userBasedGenreRecommend(user: User): Promise<Animation[]> {

        // 내가 평가한 4점 이상인 애니메이션 가져오기 
        const highRatedAnimations = await this.prisma.review.findMany({
            where: {
                userId: user.id,
                evaluation: {
                    gte: 4,
                },
            },
            select: {
                animationId: true,
            },
        });

        const highRatedAnimationIds = highRatedAnimations.map(animation => animation.animationId);

        // 그 아이디로 genretype 가져오기 
        const genreCount = await this.prisma.genre.findMany({
            where: {
                animationId: {
                    in: highRatedAnimationIds,
                },
            },
            select: {
                genretypeId: true,
            },
        });

        const genreCountMap: Record<string, number> = {};
        genreCount.forEach(genre => {
            if (genre.genretypeId in genreCountMap) {
                genreCountMap[genre.genretypeId]++;
            } else {
                genreCountMap[genre.genretypeId] = 1;
            }
        });

        const top10Genres = Object.entries(genreCountMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(entry => entry[0]);

       const watchedAnimationIds =  await this.watchedAnimation(user);

        const recommendedAnimations = await this.prisma.animation.findMany({
            where: {
                AND: [
                    {
                        genreList: {
                            some: {
                                genretypeId: {
                                    in: top10Genres,
                                },
                            },
                        },
                    },
                    {
                        NOT: {
                            id: {
                                in: watchedAnimationIds,
                            },
                        },
                    },
                ],
            },
            take: 50,
        });


        const resultAnimation = recommendedAnimations.filter((animation) => {
            return (animation.grade / (animation.reviewCount || 1)) >= 3;
        });


        return resultAnimation;

    }


    async userBasedTagRecommend(user: User) : Promise<Animation[]>{
        const highRatedAnimations = await this.prisma.review.findMany({
            where: {
                userId: user.id,
                evaluation: {
                    gte: 4,
                },
            },
            select: {
                animationId: true,
            },
        });

        const highRatedAnimationIds = highRatedAnimations.map(animation => animation.animationId);

        const tagCount = await this.prisma.tag.findMany({
            where: {
                animationId: {
                    in: highRatedAnimationIds,
                },
            },
            select: {
                tagtypeId: true,
            },
        });

        const tagCountMap: Record<string, number> = {};
        tagCount.forEach(tag => {
            if (tag.tagtypeId in tagCountMap) {
                tagCountMap[tag.tagtypeId]++;
            } else {
                tagCountMap[tag.tagtypeId] = 1;
            }
        });

        const top10Tags = Object.entries(tagCountMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(entry => entry[0]);

        const watchedAnimationIds =  await this.watchedAnimation(user);

        const recommendedAnimations = await this.prisma.animation.findMany({
            where: {
                AND: [
                    {
                        tagList: {
                            some: {
                                tagtypeId: {
                                    in: top10Tags,
                                },
                            },
                        },
                    },
                    {
                        NOT: {
                            id: {
                                in: watchedAnimationIds,
                            },
                        },
                    },
                ],
            },
            take: 50,
        });


        const resultAnimation = recommendedAnimations.filter((animation) => {
            return (animation.grade / (animation.reviewCount || 1)) >= 3;
        });

        return resultAnimation;
    }
    


   private async watchedAnimation(user: User) : Promise<integer[]> {

        const watchedAnimations = await this.prisma.review.findMany({
            where: {
                userId: user.id, 
            },
            select: {
                animationId: true,
            },
        });

        const watchedAnimationIds = watchedAnimations.map(animation => animation.animationId);

        return watchedAnimationIds;
    } 


    async userBasedlikeTag(user:User) : Promise<TypeCount[]> {
        const highRatedAnimations = await this.prisma.review.findMany({
            where: {
                userId: user.id,
                evaluation: {
                    gte: 4,
                },
            },
            select: {
                animationId: true,
            },
        });


        const highRatedAnimationIds = highRatedAnimations.map(animation => animation.animationId);

        const tagCount = await this.prisma.tag.findMany({
            where: {
                animationId: {
                    in: highRatedAnimationIds,
                },
            },
            select: {
                tagtypeId: true,
            },
        });

        const tagCountMap: Map<string, number> = new Map(); 
        tagCount.forEach((tag) => {
          const tagtypeId = tag.tagtypeId.toString(); 
          if (tagCountMap.has(tagtypeId)) {
            tagCountMap.set(tagtypeId, tagCountMap.get(tagtypeId) + 1);
          } else {
            tagCountMap.set(tagtypeId, 1);
          }
        });

        console.log(tagCountMap);
      
        const top10TagCountArray = Array.from(tagCountMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(entry => ({ type: entry[0], count: entry[1] }));
        
        console.log(top10TagCountArray);

     

        return top10TagCountArray;
    }





}
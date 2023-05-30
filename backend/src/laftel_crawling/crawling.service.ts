import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import axios from 'axios';
import { CrawlingGenreTypeService } from "./data_genreType.service";
import { AnimationDataService } from "./data_animation.service";
import { CrawlingReviewService } from "./data_review.service";


@Injectable()
export class CrawlingService{
    constructor(private prisma: PrismaService, private genreTypeService: CrawlingGenreTypeService,
        private animationService: AnimationDataService,
        private crawlingReviewSerivce :CrawlingReviewService) {} 

    async fetchDataAllProcess(offset: number, size: number) : Promise<string> {
        const response = await axios.get(`https://laftel.net/api/search/v1/discover/?sort=rank&viewable=true&offset=${offset}&size=${size}`, {headers: { 'laftel': 'TeJava' }});

        await this.genreTypeService.fetchAllGenreTypes(response);
        await this.animationService.fetchAndProcessData(response);


        return 'OK';
    }


    async fetchAllDataReview(userSize: number , reviewSize: number) : Promise<any> {

        const animationData = await this.prisma.animation.findMany();

        for (let i = 0; i < animationData.length ;i++)
            await this.crawlingReviewSerivce.createReview(animationData[i], userSize, reviewSize);

        return 'OK';
    
    }


    async fetchDataReview(animationId: number, reviewSize:number , userSize: number) : Promise<any> {
      const animationData =  await this.prisma.animation.findUnique({ where: { id: animationId }});

        await this.crawlingReviewSerivce.createReview(animationData, userSize, reviewSize);
    }


}
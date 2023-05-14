import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import axios from 'axios';
import { CrawlingGenreTypeService } from "./data_genreType.service";
import { CrawlongAnimationService } from "./data_animation.service";


@Injectable()
export class CrawlingService{
    constructor(private prisma: PrismaService, private genreTypeService: CrawlingGenreTypeService,private animationService: CrawlongAnimationService) {} 

    async fetchData() : Promise<string> {


        const response = await axios.get('https://laftel.net/api/search/v1/discover/?sort=rank&viewable=true&offset=1&size=100', {headers: { 'laftel': 'TeJava' }});
        


        await this.genreTypeService.fetchData(response);
        await this.animationService.fetchData(response);


        return 'OK';
        
        //https://laftel.net/api/items/v2/16075/ <- id
    }
}
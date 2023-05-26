import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import axios from 'axios';
import { CrawlingTagTypeService } from "./data_tagType.servie";
import { MyElasticSearchService } from "src/elasticSearch/elasticSearch.service";
import { CrawlingReviewService } from "./data_review.service";
import { Animation } from "@prisma/client";

interface AnimationData {
  id: number;
  title: string;
  thumbnail: string;
  backgroundImg?: string | null;
  crops_ratio?: string | null;
  introduction: string;
  genreList: string[];
  tagList: string[];
  author?: string[] | null;
  release?: string |null;
}


@Injectable()
export class AnimationDataService {
  constructor(private prisma: PrismaService, private typeSerive: CrawlingTagTypeService, private myElasticSearchService: MyElasticSearchService
    , private crawlingReviewService: CrawlingReviewService) { }

  async fetchAndProcessData(response): Promise<void> {

    const data = response.data.results.map((item) => {
      return {
        id: item.id,
      };
    });

    await this.processAllItems(data);
  }

  async processAllItems(data): Promise<void> {
    try {
      const promises = data.map((id) => this.processItem(id));
      const data_res = await Promise.all(promises);
      await this.createAnimation(data_res);

    } catch (error) {
      throw new Error(
        error
      )
    }

  }

  async processItem(item: { id: number }): Promise<AnimationData> {
    const url = `https://laftel.net/api/items/v2/${item.id}/`;
    const response = await axios.get(url, {
      headers: { laftel: 'TeJava' },
    });

    const imgIdx = response.data.images.length > 1 ? 1 : 0;
    return {
      id: response.data.id,
      title: response.data.name,
      thumbnail: response.data.img,
      backgroundImg: response.data.images[imgIdx].img_url,
      crops_ratio: response.data.images[imgIdx].crop_ratio,
      introduction: response.data.content,
      genreList: response.data.genres,
      tagList: response.data.tags,
      author: response.data.author,
      release: response.data.air_year_quarter ? response.data.air_year_quarter : null,
    };
  }

  async createAnimation(animationDataList: AnimationData[]): Promise<void> {
    for (const animationData of animationDataList) {
      const { id, title, thumbnail, backgroundImg, crops_ratio, introduction, genreList, tagList, author, release } = animationData;


      const existAnimation = await this.prisma.animation.findUnique({where: {id}});
      if(existAnimation){
        throw new Error('Animation already exists');
      }

      const animation = await this.prisma.$transaction(async (prisma) => {
        const animation: Animation = await prisma.animation.create({
          data: {
            id,
            title,
            thumbnail,
            backgroundImg,
            crops_ratio,
            introduction,
            author: author.join(', '),
            release,
          },
        });

        const genrePromises = genreList.map(async (genre) => {

          await prisma.genre.create({
            data: {
              animationId: animation.id,
              genretypeId: genre,
            },
          });
        });
        await Promise.all(genrePromises);


        await this.typeSerive.createTagType(tagList);
        await this.typeSerive.createTag(animation.id, tagList, prisma);
        await this.myElasticSearchService.indexAnimation(animation);

      });
    }
  }
}



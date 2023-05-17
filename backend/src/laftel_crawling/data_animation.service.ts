import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import axios from 'axios';
import { CrawlingTagTypeService } from "./data_tagType.servie";

interface AnimationData {
  id: number;
  title: string;
  thumbnail: string;
  backgroundImg?: string | null;
  crops_ratio?: string | null;
  introduction: string;
  genreList: string[];
  tagList: string[];
  author: string[];
  release: string;
}


@Injectable()
export class CrawlongAnimationService {
  constructor(private prisma: PrismaService, private typeSerive: CrawlingTagTypeService) { }

  async fetchData(response): Promise<any> {

    const data = response.data.results.map((item) => {
      return {
        id: item.id,
      };
    });

    await this.processAllItems(data);
    return "OK";
  }

  async processAllItems(data): Promise<void> {
    try {
      const promises = data.map((id) => this.processItem(id));
      const data_res = await Promise.all(promises);
      await this.createAnimation(data_res);
    } catch (error) {
      throw new Error(
        "애니메이션 저장시 오류"
      )
    }

  }

  async processItem(item: { id: number }): Promise<AnimationData> {
    const url = `https://laftel.net/api/items/v2/${item.id}/`;
    const response = await axios.get(url, {
      headers: { laftel: 'TeJava' },
    });

    return {
      id: response.data.id,
      title: response.data.name,
      thumbnail: response.data.img,
      backgroundImg: response.data.images[1].img_url,
      crops_ratio: response.data.images[1].crop_ratio,
      introduction: response.data.content,
      genreList: response.data.genres,
      tagList: response.data.tags,
      author: response.data.author,
      release: response.data.air_year_quarter,
    };
  }

  async createAnimation(animationDataList: AnimationData[]): Promise<void> {
    for (const animationData of animationDataList) {
      const { title, thumbnail, backgroundImg, crops_ratio, introduction, genreList, tagList, author, release } = animationData;


      await this.prisma.$transaction(async (prisma) => {
        const animation = await prisma.animation.create({
          data: {
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
          await this.typeSerive.createTag(animation.id, tagList,prisma);
    
      });
    }
  }
}



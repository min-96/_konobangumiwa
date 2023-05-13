import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import axios from 'axios';

interface AnimationData {
  id: number;
  title: string;
  thumbnail: string;
  backgroundImg: string;
  introduction: string;
  genreList: string[];
  author: string[];
  release: string;
}


@Injectable()
export class CrawlongAnimationService{
    constructor(private prisma: PrismaService) {} 

    async fetchData(response) : Promise<any> {

        const data = response.data.results.map((item)=> {
            return{
                id : item.id,
            };
        });
       
       await this.processAllItems(data);
       return "OK";
    }

      async processAllItems(data): Promise<void> {
        try{
          const promises = data.map((id) => this.processItem(id));
          const data_res = await Promise.all(promises);
          await this.createAnimation(data_res);
        }catch (error) {
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
          backgroundImg : response.data.imges[1].img_url,
          introduction: response.data.content,
          genreList: response.data.genres,
          author: response.data.author,
          release: response.data.air_year_quarter,
        };
      }

      async createAnimation(animationDataList: AnimationData[]) : Promise<void> {
        for (const animationData of animationDataList) {
            const { title, thumbnail, backgroundImg, introduction, genreList, author, release } = animationData;
                await this.prisma.$transaction(async (prisma) => {
            const animation = await prisma.animation.create({
                   data: {
                        title,
                        thumbnail,
                        backgroundImg,
                        introduction,
                        author: author.join(', '),
                        release,
            },
           });

        const genrePromises = genreList.map(async (genre) => {

          // Genre 테이블에 데이터를 저장합니다.
          await prisma.genre.create({
            data: {
              animationId: animation.id,
              genretypeId: genre,
            },
          });
        });

        await Promise.all(genrePromises);
      });
    }
  }
}



import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

interface Genre {
    genres: string[];
  }

@Injectable()
export class CrawlingGenreTypeService{
    constructor(private prisma: PrismaService) {} 

    async fetchData(response) : Promise<any> {


        const data : Genre[] = response.data.results.map((item)=> {
            return{
                genres : item.genres,
            };
        });

        console.log(response.data);

        const genreList = data.map(item => ({ genres: item.genres }));

        //장르 타입 저장하기
        await this.createGenreType(genreList);

        return 'OK';
        
        //https://laftel.net/api/items/v2/16075/ <- id
    }
  
    async createGenreType(genreList: Genre[]): Promise<void> {

        const selectGenreType = await this.prisma.genreType.findMany({
            select: {
                type: true,
              },
        });
     //   console.log(selectGenreType);

        let befGenreArray : Array<string> = selectGenreType.map((ele) => (ele.type));  // 장르를 셀렉트 해와서 어레이로 담기 
        let addGenreArray : Array<string> = []; 
        
        genreList.forEach(({ genres }) => {
            genres.forEach(genre => {
              if (!befGenreArray.includes(genre) && !addGenreArray.includes(genre)) {
                addGenreArray.push(genre);
              }
            });
          });
      
          for (const genreType of addGenreArray) {
            await this.prisma.genreType.create({
              data: {
                type: genreType,
              },
            });
          }
        }
      }
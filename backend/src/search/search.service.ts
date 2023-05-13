import { Injectable } from "@nestjs/common";
import { Animation ,Genre } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { SourceTextModule } from "vm";


@Injectable()
export class SearchService{

    constructor(private prisma: PrismaService) {}

    async filteringGenre(type: string):  Promise<Animation[]>{
        const animationsWithGenres = await this.prisma.animation.findMany({
          where: {
            genreList: {
              some: {
                genretypeId: type,
              },
            },
          },
        });
        return animationsWithGenres;
    }

    async searchTitle(name: string) : Promise<Animation[]>{
        const searchTitleAnimation = await this.prisma.animation.findMany({
          where: {
            title: {
              contains : name,
            },
          },
        });


      return  searchTitleAnimation;
    }
}
import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Animation, Genre, GenreType, TagType } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { MyElasticSearchService } from "src/elasticSearch/elasticSearch.service";

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService
    , private readonly elasticsearchService: ElasticsearchService,
    private myelasticSearchService: MyElasticSearchService
  ) { }



  async filteringGenre(type: string[],page:number , pageSize:number ): Promise<Animation[]> {
    const animationsWithGenres = await this.prisma.animation.findMany({
      where: {
        AND: type.map(genre => ({
          genreList: {
            some: {
              genretypeId: {
                equals: genre,
              },
            },
          },
        })),
      },
      skip: page * pageSize,
      take : pageSize,
    });
    return animationsWithGenres;
  }


  async searchTitleInElastic(title: string): Promise<Animation[]> {

    const decomposedTitle = await this.myelasticSearchService.divideHangul(title);
    const chosungTitle = await this.myelasticSearchService.extractChosung(title);
    const { body } = await this.elasticsearchService.search({
      index: 'animations',
      body: {
        query: {
          multi_match: {
              query: decomposedTitle,
              fields: ['decomposedTitle', 'chosungTitle']  
          }

        },
        size: 10

      },
    });

    const results: Animation[] = body.hits.hits.map(hit => ({ title: hit._source.title, id: hit._id }));

    return results;
  }

  async filteringTag(type: string[]): Promise<Animation[]> {
    const animationsWithTag = await this.prisma.animation.findMany({
      where: {
        AND: type.map(tag => ({
          tagList: {
            some: {
              tagtypeId: {
                equals: tag,
              },
            },
          },
        })),
        reviewCount: {
          gte: 50,
        },
      },
      orderBy: {
        reviewCount: 'desc',
      },
      take: 10
    });
    return animationsWithTag;
  }

  async genreTypeList() : Promise<GenreType[]> {
      return this.prisma.genreType.findMany();
  }

  async tagTypeList() : Promise<TagType[]> {
    return this.prisma.tagType.findMany();
  }
}
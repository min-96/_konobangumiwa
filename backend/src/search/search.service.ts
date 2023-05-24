import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Animation, Genre } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { MyElasticSearchService } from "src/elasticSearch/elasticSearch.service";

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService
    , private readonly elasticsearchService: ElasticsearchService,
    private myelasticSearchService : MyElasticSearchService
  ) { }



  async filteringGenre(type: string): Promise<Animation[]> {
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

 
  async searchTitleInElastic(title: string): Promise<Animation[]> {

    const decomposedTitle = await this.myelasticSearchService.divideHangul(title);

    const { body } = await this.elasticsearchService.search({
      index: 'animations',
      body: {
        query: {
          fuzzy: {
            decomposedTitle: {
              value: decomposedTitle,
              fuzziness: 2
            }
          }

        },
        size: 10 
        
      },
    });

    const results: Animation[] = body.hits.hits.map(hit => ({ title: hit._source.title, id: hit._id }));

    return results;
  }
 
}
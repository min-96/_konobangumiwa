import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Animation, Genre } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { SourceTextModule } from "vm";



@Injectable()
export class SearchService {
  CHO_HANGUL = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
    'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
    'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
    'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
  ];
  // 중성(21개)
  JUNG_HANGUL = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ',
    'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ',
    'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ',
    'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ',
  ];
  // 종성(28개)
  JONG_HANGUL = [
    '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
    'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
    'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
    'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
  ];

  CHO_PERIOD = Math.floor("까".charCodeAt(0) - "가".charCodeAt(0)); // 588 ( 28 * 21 )
  JUNG_PERIOD = Math.floor("개".charCodeAt(0) - "가".charCodeAt(0)); // 28

  HANGUL_START_CHARCODE = "가".charCodeAt(0);
  HANGUL_END_CHARCODE = "힣".charCodeAt(0);

  constructor(private prisma: PrismaService
    , private readonly elasticsearchService: ElasticsearchService
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

  async searchTitle(name: string): Promise<Animation[]> {

    const searchTitleAnimation = await this.prisma.animation.findMany({
      where: {
        title: {
          contains: name,
        },
      },
    });


    return searchTitleAnimation;
  }


  async searchTitleInElastic(title: string): Promise<Animation[]> {

    const decomposedTitle = await this.divideHangul(title);
    // console.log(decomposedTitle);

    const { body } = await this.elasticsearchService.search({
      index: 'animations',
      body: {
        query: {
          match: {
            decomposedTitle: decomposedTitle
          }
        }
      },
    });

    //console.log(body);
    const results: Animation[] = body.hits.hits.map(hit => ({ title: hit._source.title, id: hit._id }));

    return results;
  }


  async divideHangul(title) {
    const letter = Object.assign([], title);
    let result = '';
    letter.map((ele) => {

      const letterCode = ele.charCodeAt(0);

      if (!(this.HANGUL_START_CHARCODE <= letterCode && letterCode <= this.HANGUL_END_CHARCODE)) {
        result += ele;
        return ele;
      }

      const charCode = letterCode - this.HANGUL_START_CHARCODE;

      const choIndex = Math.floor(charCode / this.CHO_PERIOD);
      const jungIndex = Math.floor((charCode % this.CHO_PERIOD) / this.JUNG_PERIOD);
      const jongIndex = charCode % this.JUNG_PERIOD;

      result += this.CHO_HANGUL[choIndex];
      result += this.JUNG_HANGUL[jungIndex];
      result += this.JONG_HANGUL[jongIndex];

    })

    return result;
  }

  async settingAnalyzer() {
    try {

      await this.deleteIndex('animations');
      await this.createIndex('animations');
      await this.elasticsearchService.indices.close({ index: 'animations' });

      await this.elasticsearchService.indices.putSettings({
        index: 'animations',
        body: {
          analysis: {
            analyzer: {
              default: {
                tokenizer: 'ngram_tokenizer',
                filter: ['lowercase'],
              },
            },
            tokenizer: {
              ngram_tokenizer: {
                type: 'ngram',
                min_gram: 2,
                max_gram: 3,
              },
            },
          },
        },
      });

      await this.elasticsearchService.indices.open({ index: 'animations' });

    } catch (error) {
      throw new Error(error);
    }
    return "OK";
  }


  async indexAnimation() {
    try {
      await this.settingAnalyzer();

      const animations = await this.prisma.animation.findMany();
      animations.forEach(async (animation) => {
        const decomposedTitle = await this.divideHangul(animation.title);
        await this.elasticsearchService.index({
          index: 'animations',
          id: String(animation.id),
          body: {
            title: animation.title,
            decomposedTitle: decomposedTitle,
          },
        });
      });


    } catch (error) {
      throw new Error(error);
    }
    return "OK";
  }
  async createIndex(index: string) {
    try {
      await this.elasticsearchService.indices.create({ index: index });
      return 'Index created successfully.';
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteIndex(index: string) {
    try {
      await this.elasticsearchService.indices.delete({ index: index });
    } catch (error) {
      throw new Error(error);
    }
    return "OK";
  }

}
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class MyElasticSearchService implements OnModuleInit{
  CHO_HANGUL = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
    'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
    'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
    'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
  ];

  JUNG_HANGUL = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ',
    'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ',
    'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ',
    'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ',
  ];

  JONG_HANGUL = [
    '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
    'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
    'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
    'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
  ];

  CHO_PERIOD = Math.floor("까".charCodeAt(0) - "가".charCodeAt(0));
  JUNG_PERIOD = Math.floor("개".charCodeAt(0) - "가".charCodeAt(0));

  HANGUL_START_CHARCODE = "가".charCodeAt(0);
  HANGUL_END_CHARCODE = "힣".charCodeAt(0);

  constructor(private prisma: PrismaService
    , private readonly elasticsearchService: ElasticsearchService
  ) { }


  async onModuleInit() {
    await this.settingAnalyzer();
    await this.indexAnimationList();
  }


  async divideHangul(title: string): Promise<string> {
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


  async extractChosung(title: string): Promise<string> {
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

      result += this.CHO_HANGUL[choIndex];
    })

    return result;
  }


  async settingAnalyzer(): Promise<string> {
    try {
      const existIndex = await this.elasticsearchService.indices.exists({ index: 'animations' });
    
      if (existIndex.body) {

        await this.deleteIndex('animations');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

     
      await this.elasticsearchService.indices.create({

        index: 'animations',
        body: {
          settings: {
            index: {
              max_ngram_diff: 1
            },
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
                  min_gram: 1,
                  max_gram: 2,
                },
              },
            },
          },
        },
      });

      return "OK";
    

    } catch (error) {
      throw new Error(error);
    }
  }


  async indexAnimation(animation): Promise<any> {
    const decomposedTitle = await this.divideHangul(animation.title);
    const chosungTitle = await this.extractChosung(animation.title);
    await this.elasticsearchService.index({
      index: 'animations',
      id: String(animation.id),
      body: {
        title: animation.title,
        decomposedTitle: decomposedTitle,
        chosungTitle: chosungTitle,
      },
    });

    return "OK";

  }



   async indexAnimationList(): Promise<any> {
    try {
      const animations = await this.prisma.animation.findMany();
      animations.forEach(async (animation) => {
        const decomposedTitle = await this.divideHangul(animation.title);
        const chosungTitle = await this.extractChosung(animation.title);
        await this.elasticsearchService.index({
          index: 'animations',
          id: String(animation.id),
          body: {
            title: animation.title,
            decomposedTitle: decomposedTitle,
            chosungTitle: chosungTitle,
          },
        });
      });
      return "OK";

    } catch (error) {
      throw new Error(error);
    }

  }

   async createIndex(index: string): Promise<any> {
    try {
      await this.elasticsearchService.indices.create({ index: index });
      return 'Index created successfully.';
    } catch (error) {
      throw new Error(error);
    }
  }

  private async deleteIndex(index: string): Promise<any> {
    try {
      await this.elasticsearchService.indices.delete({ index: index });
      return "OK";
    } catch (error) {
      throw new Error(error);
    }
  }

}
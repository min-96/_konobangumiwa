import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AdminGuard } from 'src/auth/auth.admin.guard';
import { CrawlingResolver } from './crawling.resolver';
import { CrawlingService } from './crawling.service';
import { CrawlingGenreTypeService } from './data_genreType.service';
import { CrawlongAnimationService } from './data_animation.service';
import { CrawlingTagTypeService } from './data_tagType.servie';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { MyElasticSearchService } from 'src/elasticSearch/elasticSearch.service';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [ 
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'), 
      }),
      inject: [ConfigService], 
    }),

 ],
  providers: [PrismaService, AdminGuard, CrawlingResolver,CrawlingService,CrawlingGenreTypeService,CrawlongAnimationService,CrawlingTagTypeService, MyElasticSearchService],
})
export class CrawlingModule {}
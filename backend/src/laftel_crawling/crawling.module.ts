import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AdminGuard } from 'src/auth/auth.admin.guard';
import { CrawlingResolver } from './crawling.resolver';
import { CrawlingService } from './crawling.service';
import { CrawlingGenreTypeService } from './data_genreType.service';
import { AnimationDataService } from './data_animation.service';
import { CrawlingTagTypeService } from './data_tagType.servie';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CrawlingReviewService } from './data_review.service';
import { MyElasticSearchModule } from 'src/elasticSearch/elasticSearch.module';


@Module({
  imports: [ 
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'), 
      }),
      inject: [ConfigService], 
    }),
    MyElasticSearchModule
 ],
  providers: [PrismaService, AdminGuard, CrawlingResolver,CrawlingService,CrawlingGenreTypeService,AnimationDataService
    ,CrawlingTagTypeService, CrawlingReviewService],
})
export class CrawlingModule {}